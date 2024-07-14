import { useLocalStorage } from "@tronweb3/tronwallet-adapter-react-hooks";
import { Order, escrowContractAbi, isTronBlock } from "~/shared/api/client";
import { usePaymentMethods } from "../payment-methods";
import { useMutation } from "@tanstack/react-query";
import { tronWeb } from "~/shared/lib/tronweb";
import { EscrowError } from "../error";
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import * as wagmi from '@wagmi/core';
import { useConfig as useWagmiConfig } from 'wagmi';
import { isAddressString } from "~/shared/lib/string-tools";

interface ReleaseState {
	transactionId: string | null
	errorMessage: string | null
}

const defaultValue: ReleaseState = {
	transactionId: null,
	errorMessage: null
}

export function useReleaseEscrowAction(order: Order) {
	const [state, setState] = useLocalStorage<ReleaseState>(
		`order-checkout-${order.id}-release`, defaultValue
	);

	const {
		getOrThrow: getPaymentMethodsOrThrow,
		loading: paymentMethodsLoading
	} = usePaymentMethods(order);

	const wagmiConfig = useWagmiConfig();
	const tronWallet = useTronWallet();

	const execute = async () => {
		if (!getPaymentMethodsOrThrow)
			return;

		const tw = tronWeb;
		const { chain } = getPaymentMethodsOrThrow();
		const { contractEscrowId } = order.transaction;
		const isTron = isTronBlock(order.transaction.block);
		const chainContractAddress = chain.contractAddress;

		if (contractEscrowId === null)
			throw new EscrowError('generic', 'contractEscrowId is not defined for the order');

		if (!isAddressString(chainContractAddress))
			throw new EscrowError('generic', "contract address of the chain is not valid ethereum address");

		if (!isTron) {
			const {
				chainId,
				address: currentWalletAddress
			} = wagmi.getAccount(wagmiConfig);

			if (!chainId || !currentWalletAddress)
				throw new EscrowError('eth-not-found', 'ethereum chain or wallet is undefined');

			if (chain.chainId != chainId)
				await wagmi.switchChain(wagmiConfig, { chainId: chain.chainId });

			const transactionId = await wagmi.writeContract(wagmiConfig, {
				abi: escrowContractAbi,
				functionName: 'release',
				address: chainContractAddress,
				args: [BigInt(contractEscrowId)]
			})

			setState(s => ({ ...s, transactionId }))
		}
		else {
			if (!tronWallet.wallet || !tronWallet.wallet?.adapter.address)
				throw new EscrowError('tron-not-found', `tron wallet is not connected`);

			if (!tw)
				throw new EscrowError('generic', `tronWeb instance is not defined`);

			try {
				const transaction = await tw.transactionBuilder.triggerSmartContract(
					tw.address.toHex(chain.contractAddress),
					'release(uint256)',
					{
						feeLimit: 100_000_000,
					},
					[
						{
							type: 'uint256',
							value: contractEscrowId
						}
					]
				);

				if (transaction.result.message)
					throw new EscrowError('generic', 'Release Escrow: ' + tw.toAscii(transaction.result.message));

				const result = await tw.trx.sendRawTransaction(
					await tronWallet.signTransaction(transaction.transaction)
				);

				if (result.message)
					throw new EscrowError('generic', 'Release Escrow: ' + tw.toAscii(result.message));

				setState(s => ({
					...s,
					transactionId: transaction.transaction.txID
				}))
			}
			catch (error) {
				if (typeof error === 'string')
					throw new EscrowError('generic', 'Release Escrow: ' + error);
				else
					throw error;
			}
		}
	}

	const { mutateAsync, isPending } = useMutation({
		mutationFn: execute,
		onError: (error) => setState(s => ({
			...s, errorMessage: error.message
		})),
		retry: false
	})

	const { errorMessage, transactionId } = state;

	if (isPending)
		return { status: 'submitting', execute: undefined, errorMessage } as const;

	if (paymentMethodsLoading)
		return { status: 'loading', execute: undefined, errorMessage } as const;

	if (errorMessage !== null)
		return { status: 'error', execute: mutateAsync, errorMessage } as const;

	if (transactionId !== null)
		return { status: 'done', execute: undefined, errorMessage } as const;

	return { status: 'idle', execute: mutateAsync, errorMessage } as const;
}