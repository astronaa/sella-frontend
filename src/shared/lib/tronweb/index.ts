/* eslint-disable @typescript-eslint/no-explicit-any */

import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { TronWeb as IncompleteTronWeb } from "@tronweb3/tronwallet-adapters";
import { useEffect } from "react";
import { TRONGRID_API_KEY } from "~/shared/config/tron";
import { useCallbackRef } from "../use-callback-ref";

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

export function setupApiHeader() {
	try {
		tronWeb?.setHeader({ 'TRON-PRO-API-KEY': TRONGRID_API_KEY });
		return true;
	}
	catch {
		return false;
	}
}

setupApiHeader();

interface UseAdpaterWatchArgs {
	onConnect?: (address: string) => void;
	onDisconnect?: () => void;
}

export function useWatchTronAdapter(args: UseAdpaterWatchArgs) {
	const { wallet } = useWallet();
	const adapter = wallet?.adapter;

	const onConnect = useCallbackRef(args.onConnect);
	const onDisconnect = useCallbackRef(args.onDisconnect);

	useEffect(() => {
		if (!adapter || (!onConnect && !onDisconnect))
			return;

		adapter.on('connect', onConnect);
		adapter.on('disconnect', onDisconnect);

		return () => {
			adapter.off('connect', onConnect);
			adapter.off('disconnect', onDisconnect);
		}
	}, [adapter, onConnect, onDisconnect])
}