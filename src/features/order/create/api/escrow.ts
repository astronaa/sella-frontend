import { ValueType } from "../model/schema";
import { OrderProp } from "~/entities/order";
import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { useConfig as useWagmiConfig } from 'wagmi';
import * as wagmi from '@wagmi/core'
import { paymentMethodsQueries } from "~/entities/payment-methods";
import { ProductId, escrowContractAbi } from "~/shared/api/client";
import { tokenAbi } from "./tokenAbi";
import { isAddressString } from "~/shared/lib/string-tools";
import { tronWeb } from "~/shared/lib/tronweb";
import { parseEther } from 'viem'
import { useMutation } from "@tanstack/react-query";

interface CreateEscrowAargs extends ValueType, OrderProp { };

type EscrowCause = 'generic' | 'eth-not-found'

export class EscrowError extends Error {
	cause: EscrowCause;

	constructor(cause: EscrowCause, message: string) {
		super(message);

		this.cause = cause;
		this.name = 'EscrowError'
	}
};

export function useCreateEscrowAction(productId: ProductId) {
	const wagmiConfig = useWagmiConfig();
	const tronWallet = useTronWallet();
	const { data: paymentMethods } = paymentMethodsQueries.useGetForProduct(productId);

	const { mutateAsync, isPending } = useMutation({ mutationFn: execute })

	async function execute({ order, block, token: tokenName }: CreateEscrowAargs) {
		if (!order.seller.address)
			throw new EscrowError('generic', "seller's ethereum address is undefined");

		if (order.product.holdPeriod === undefined)
			throw new EscrowError('generic', 'holdPeriod is not defined for product');

		const chain = paymentMethods?.find(m => m.value == block);
		if (!chain)
			throw new EscrowError('generic', "cannot find corresponding chain for input block type");

		const token = chain.tokens.find(t => t.name == tokenName);
		if (!token)
			throw new EscrowError('generic', "cannot find corresponding token for input token type");

		if (block != 'TRX') {
			const { 
				chainId, 
				address: currentWalletAddress 
			} = wagmi.getAccount(wagmiConfig);
	
			if (!chainId || !currentWalletAddress)
				throw new EscrowError('eth-not-found', 'ethereum chain or wallet is undefined');

			if (!isAddressString(chain.contractAddress))
				throw new EscrowError('generic', "contract address of the chain is not valid ethereum address");

			if (!isAddressString(token.address))
				throw new EscrowError('generic', "token address of the chain is not valid ethereum address");

			if (chain.chainId != 1 && chain.chainId != 137 && chain.chainId != 11155111)
				throw new EscrowError('generic', `unsupported identificator for chain ${chain.chainId}`);

			if (chain.chainId != chainId)
				await wagmi.switchChain(wagmiConfig, { chainId: chain.chainId });

			if (!isAddressString(order.seller.address))
				throw new EscrowError('generic', `seller's ethereum address is not valid ethereum address`);

			await wagmi.writeContract(wagmiConfig, {
				abi: tokenAbi,
				functionName: 'approve',
				address: token.address,
				args: [
					currentWalletAddress,
					parseEther(order.transaction.tokenAmount.toString())
				]
			})

			await wagmi.writeContract(wagmiConfig, {
				abi: escrowContractAbi,
				address: chain.contractAddress,
				functionName: 'createEscrow',
				args: [
					order.seller.address,
					currentWalletAddress,
					parseEther(order.transaction.tokenAmount.toString()),
					BigInt(order.product.holdPeriod),
					order.id
				]
			})
		}
		else {
			if (!order.seller.tronAddress)
				throw new EscrowError('generic', `seller's tron address is not defined`);

			if (!tronWeb)
				throw new EscrowError('generic', `tronWeb instance is not defined`);

			if (!tronWallet.wallet || !tronWallet.wallet?.adapter.address)
				throw new EscrowError('generic', `tron wallet is not connected`);

			const transactionApprove = await tronWeb.transactionBuilder.triggerSmartContract(
				tronWeb.address.toHex(chain.contractAddress),
				'approve(address,uint256)',
				{ feeLimit: 100_000_000 },
				[
					{
						type: 'address',
						value: tronWeb.address.toHex(tronWallet.wallet.adapter.address)
					},
					{
						type: 'uint256',
						value: tronWeb.toBigNumber(order.transaction.tokenAmount)
					}
				],
			);

			if (transactionApprove.result !== true)
				throw new EscrowError('generic', `failed to build approve transaction`);

			await tronWeb.trx.sendRawTransaction(
				tronWallet.signTransaction(transactionApprove.transaction)
			);

			const transactionCreateEscrow = await tronWeb.transactionBuilder.triggerSmartContract(
				tronWeb.address.toHex(chain.contractAddress),
				'createEscrow(address,address,uint256,uint256,string)',
				{ feeLimit: 100_000_000 },
				[
					{
						type: 'address',
						value: tronWeb.address.toHex(order.seller.tronAddress)
					},
					{
						type: 'address',
						value: tronWeb.address.toHex(token.address)
					},
					{
						type: 'uint256',
						value: tronWeb.toBigNumber(order.transaction.tokenAmount)
					},
					{
						type: 'uint256',
						value: tronWeb.toBigNumber(order.product.holdPeriod)
					},
					{
						type: 'string',
						value: order.id
					},
				],
			);

			if (transactionCreateEscrow.result !== true)
				throw new EscrowError('generic', `failed to build approve create escrow transaction`);

			await tronWeb.trx.sendRawTransaction(
				tronWallet.signTransaction(transactionCreateEscrow.transaction)
			);
		}

		return true;
	}

	if (!paymentMethods)
		return { loading: true, execute: undefined } as const;

	return {
		loading: isPending,
		execute: mutateAsync
	} as const;
}