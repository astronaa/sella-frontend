'use client';
import { useEffect } from 'react';
import { useRegisterFlow } from '~/shared/model/register-flow';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccountEffect } from 'wagmi';

export function useWalletGuard() {
	// This is just because rainbowkit modal are nailed to the hooks
	const open = useRegisterFlow(s => s.open);
	const setOpen = useRegisterFlow(s => s.setOpen);
	const currentModal = useRegisterFlow(s => s.currentModal);
	const startFlow = useRegisterFlow(s => s.startFlow);
	const { openConnectModal, connectModalOpen } = useConnectModal();

	useAccountEffect({
		onConnect: startFlow
	});

	useEffect(() => {
		if (open && currentModal == 'wallet-connect') {
			if (connectModalOpen)
				setOpen(false);
			else if (openConnectModal)
				openConnectModal();
		}
	}, [open, currentModal, openConnectModal, startFlow, setOpen, connectModalOpen]);
}
