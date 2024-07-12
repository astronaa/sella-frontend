import { useWallet as useTronWallet } from '@tronweb3/tronwallet-adapter-react-hooks';
import { Order } from "~/shared/api/client";
import { tronWeb } from "~/shared/lib/tronweb";
import { EscrowError } from '../error';
import { CreateEscrowController } from './controller';
import { invariant } from '~/shared/lib/asserts';

const waitForTransaction = async (txId: string, attemps = Infinity) => {
	invariant(tronWeb, 'TronWeb instance is undefined');

	while(attemps-- > 0) {
		try {
			await tronWeb.trx.getConfirmedTransaction(txId);
			break;
		}
		catch {
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
	}
}

export function useCreateEscrowTron(order: Order): CreateEscrowController {
	const tronWallet = useTronWallet();

	return {
		async prepare({ chain, token, isNativeCoin }) {
			console.log(chain, token);
			
			const tw = tronWeb;
			const sellerTronAddress = order.seller.tronAddress;
			const chainContractAddress = chain.contractAddress;
			const holdPeriod = order.transaction.holdPeriod;
			const tokenAmount = BigInt(order.transaction.tokenAmount);

			if (holdPeriod === undefined)
				throw new EscrowError('generic', 'holdPeriod is not defined for product');

			if (!sellerTronAddress)
				throw new EscrowError('generic', `seller's tron address is not defined`);

			if (!tw)
				throw new EscrowError('generic', `tronWeb instance is not defined`);

			if (!tronWallet.wallet || !tronWallet.wallet?.adapter.address)
				throw new EscrowError('tron-not-found', `tron wallet is not connected`);

			return {
				approve: async () => {
					try {
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

						if (transactionApprove.result.message)
							throw new EscrowError('generic', 'Approve: ' + tw.toAscii(transactionApprove.result.message));

						const result = await tw.trx.sendRawTransaction(
							await tronWallet.signTransaction(transactionApprove.transaction)
						);

						if (result.message)
							throw new EscrowError('generic', 'Approve: ' + tw.toAscii(result.message));

						return transactionApprove.transaction.txID;
					}
					catch (error) {
						if (typeof error === 'string')
							throw new EscrowError('generic', 'Approve: ' + error);
						else
							throw error;
					}
				},
				waitApproveTransaction: waitForTransaction,
				createEscrow: async () => {
					try {
						const transactionCreateEscrow = await tw.transactionBuilder.triggerSmartContract(
							tw.address.toHex(chain.contractAddress),
							'createEscrow(address,address,uint256,uint256,string)',
							{ 
								feeLimit: 100_000_000,
								callValue: isNativeCoin ? tw.toSun(tokenAmount) : undefined
							},
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

						if (transactionCreateEscrow.result.message)
							throw new EscrowError('generic', 'Create Escrow: ' + tw.toAscii(transactionCreateEscrow.result.message));

						const result = await tw.trx.sendRawTransaction(
							await tronWallet.signTransaction(transactionCreateEscrow.transaction)
						);

						if (result.message)
							throw new EscrowError('generic', 'Create Escrow: ' + tw.toAscii(result.message));

						return transactionCreateEscrow.transaction.txID;
					}
					catch (error) {
						if (typeof error === 'string')
							throw new EscrowError('generic', 'Create Escrow: ' + error);
						else
							throw error;
					}
				},
				waitCreateEscrowTransaction: waitForTransaction
			};
		},
	};
}
