import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { Order } from "~/shared/api/client";
import { tronWeb } from "~/shared/lib/tronweb";
import { EscrowError } from '../error';
import { CreateEscrowController } from './controller';

export function useCreateEscrowTron(order: Order): CreateEscrowController {
	const tronWallet = useTronWallet();

	return {
		async prepare({ chain, token }) {
			const tw = tronWeb;
			const sellerTronAddress = order.seller.tronAddress;
			const chainContractAddress = chain.contractAddress;
			const holdPeriod = order.product.holdPeriod;
			const tokenAmount = BigInt(order.transaction.tokenAmount * 10 ** 6);

			if (holdPeriod === undefined)
				throw new EscrowError('generic', 'holdPeriod is not defined for product');

			if (!sellerTronAddress)
				throw new EscrowError('generic', `seller's tron address is not defined`);

			if (!tw)
				throw new EscrowError('generic', `tronWeb instance is not defined`);

			if (!tronWallet.wallet || !tronWallet.wallet?.adapter.address)
				throw new EscrowError('generic', `tron wallet is not connected`);

			return {
				approve: async () => {
					const transactionApprove = await tw.transactionBuilder.triggerSmartContract(
						tw.address.toHex(token.address),
						'approve(address,uint256)',
						{ feeLimit: 100000000 },
						[
							{
								type: 'address',
								value: tw.address.toHex(chainContractAddress)
							},
							{
								type: 'uint256',
								value: tokenAmount
							}
						]
					);

					if (transactionApprove.result.result !== true)
						throw new EscrowError('generic', `failed to build approve transaction`);

					await tw.trx.sendRawTransaction(
						await tronWallet.signTransaction(transactionApprove.transaction)
					);

					return transactionApprove.transaction.txID;
				},
				waitApproveTransaction: async () => {
					'pass';
				},
				createEscrow: async () => {
					const transactionCreateEscrow = await tw.transactionBuilder.triggerSmartContract(
						tw.address.toHex(chain.contractAddress),
						'createEscrow(address,address,uint256,uint256,string)',
						{ feeLimit: 100000000 },
						[
							{
								type: 'address',
								value: tw.address.toHex(sellerTronAddress)
							},
							{
								type: 'address',
								value: tw.address.toHex(token.address)
							},
							{
								type: 'uint256',
								value: tokenAmount
							},
							{
								type: 'uint256',
								value: BigInt(holdPeriod)
							},
							{
								type: 'string',
								value: order.id
							},
						]
					);

					if (transactionCreateEscrow.result.result !== true)
						throw new EscrowError('generic', `failed to build create escrow transaction`);

					await tw.trx.sendRawTransaction(
						await tronWallet.signTransaction(transactionCreateEscrow.transaction)
					);

					return transactionCreateEscrow.transaction.txID;
				},
				waitCreateEscrowTransaction: async () => {
					'pass';
				}
			};
		},
	};
}
