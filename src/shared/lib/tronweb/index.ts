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
	toBigNumber(num: number): object,

	trx: {
		sendRawTransaction(transaction: object): Promise<{
			result: boolean,
			transaction: { txID: string }
		}>
	}
}

export const tronWeb = typeof window !== 'undefined' ? (
	window.tronWeb as TronWeb
) : undefined;

tronWeb?.setHeader({ 'TRON-PRO-API-KEY': TRONGRID_API_KEY })