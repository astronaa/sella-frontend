import { useConfig as useWagmiConfig } from 'wagmi';
import * as wagmi from '@wagmi/core';
import { Order, escrowContractAbi } from "~/shared/api/client";
import { tokenAbi } from "../../api/tokenAbi";
import { isAddressString } from "~/shared/lib/string-tools";
import { EscrowError } from '../error';
import { CreateEscrowController } from './controller';

export function useCreateEscrowEth({ order }: { order: Order; }): CreateEscrowController {
	const wagmiConfig = useWagmiConfig();

	return {
		async prepare({ chain, token }) {
			const {
				chainId, address: currentWalletAddress
			} = wagmi.getAccount(wagmiConfig);

			const tokenAddress = token.address;
			const chainContractAddress = chain.contractAddress;
			const sellerAddress = order.seller.address;
			const tokenAmount = BigInt(order.transaction.tokenAmount);
			const holdPeriod = order.product.holdPeriod;
			
			if (holdPeriod === undefined)
				throw new EscrowError('generic', 'holdPeriod is not defined for product');

			if (!chainId || !currentWalletAddress)
				throw new EscrowError('eth-not-found', 'ethereum chain or wallet is undefined');

			if (!isAddressString(chainContractAddress))
				throw new EscrowError('generic', "contract address of the chain is not valid ethereum address");

			if (!isAddressString(tokenAddress))
				throw new EscrowError('generic', "token address of the chain is not valid ethereum address");

			if (chain.chainId != 1 && chain.chainId != 137 && chain.chainId != 11155111)
				throw new EscrowError('generic', `unsupported identificator for chain ${chain.chainId}`);

			if (chain.chainId != chainId)
				await wagmi.switchChain(wagmiConfig, { chainId: chain.chainId });

			if (!isAddressString(sellerAddress))
				throw new EscrowError('generic', `seller's ethereum address is not valid ethereum address`);

			return {
				approve: () => wagmi.writeContract(wagmiConfig, {
					abi: tokenAbi,
					functionName: 'approve',
					address: tokenAddress,
					args: [chainContractAddress, tokenAmount]
				}),
				waitApproveTransaction: async (approveTransactionId) => {
					if (!isAddressString(approveTransactionId))
						throw new EscrowError('generic', `approve transaction id is not valid ethereum hash`);

					await wagmi.waitForTransactionReceipt(wagmiConfig, {
						hash: approveTransactionId,
						retryCount: Infinity
					});
				},
				createEscrow: () => wagmi.writeContract(wagmiConfig, {
					abi: escrowContractAbi,
					address: chainContractAddress,
					functionName: 'createEscrow',
					args: [
						sellerAddress,
						tokenAddress,
						tokenAmount,
						BigInt(holdPeriod),
						order.id
					]
				}),
				waitCreateEscrowTransaction: async (createEscrowTransactionId) => {
					if (!isAddressString(createEscrowTransactionId))
						throw new EscrowError('generic', `create escrow transaction id is not valid ethereum hash`);

					await wagmi.waitForTransactionReceipt(wagmiConfig, {
						hash: createEscrowTransactionId,
						retryCount: Infinity,
					});
				}
			};
		}
	};
}
