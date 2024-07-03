'use client';

import { PropsWithChildren, useEffect, useState } from "react";
import { Adapter } from "@tronweb3/tronwallet-abstract-adapter";
import { WalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks';
import { invariant } from "../lib/asserts";

export function TronWalletProvider({ children }: PropsWithChildren) {
	const [adapters, setAdapters] = useState<Adapter<string>[]>([]);

	useEffect(() => {
		const importAdapters = async () => {
			const { 
				TronLinkAdapter, 
				LedgerAdapter, 
				BitKeepAdapter,
				OkxWalletAdapter,
				TokenPocketAdapter
			} = await import('@tronweb3/tronwallet-adapters');

			return [
				new TronLinkAdapter(),
				new LedgerAdapter(),
				new BitKeepAdapter(),
				new OkxWalletAdapter(),
				new TokenPocketAdapter()
			]
		}

		importAdapters().then(setAdapters);
	}, []);

	return (
		<WalletProvider 
			adapters={adapters} 
			disableAutoConnectOnLoad={false}
		>
			{children}
		</WalletProvider>
	);
}

export const TRONGRID_API_KEY = process.env.NEXT_PUBLIC_TRONGRID_API_KEY!;
invariant(TRONGRID_API_KEY, 'NEXT_PUBLIC_TRONGRID_API_KEY not defined');