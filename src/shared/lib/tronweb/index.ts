/* eslint-disable @typescript-eslint/no-explicit-any */

import { TronWeb as IncompleteTronWeb } from "@tronweb3/tronwallet-adapters";
import { TRONGRID_API_KEY } from "~/shared/config/tron";

type TronWeb = IncompleteTronWeb & {
	setHeader(headers: Record<string, string>): void,
	transactionBuilder: any,
	contract(abi: object, address: string): Promise<any>,
	address: {
		toHex(str: string): string
	},
	toBigNumber(num: number | bigint): object,
	toAscii(raw: string): string,
	toSun(num: number | bigint): string,

	trx: {
		sendRawTransaction(transaction: object): Promise<{
			code: string,
			message: string,
			txid: string
		}>,
		getConfirmedTransaction(txId: string): Promise<object>
	}
}

export const tronWeb = typeof window !== 'undefined' ? (
	window.tronWeb as TronWeb
) : undefined;

tronWeb?.setHeader({ 'TRON-PRO-API-KEY': TRONGRID_API_KEY })