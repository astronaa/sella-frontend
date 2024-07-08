'use client';

import { useConfig } from "wagmi";
import { watchAccount } from '@wagmi/core';
import { useCallback } from "react";

interface WatchArgs {
	once?: boolean,
	onConnected?: () => void
}

export function useWatchAccount() {
	const config = useConfig();

	return useCallback(({ onConnected, once = false }: WatchArgs) => {
		const unsub = watchAccount(config, {
			onChange(account, prevAccount) {
				if (account.status === 'connected' && (
					prevAccount.status === 'reconnecting'
					|| (prevAccount.status === 'connecting' && prevAccount.address === undefined)
				)) {
					onConnected?.();

					if (once)
						unsub();
				}
			},
		});
	}, [config])
}