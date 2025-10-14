'use client';

import { create } from 'zustand'
import { getAccount, signMessage } from '@wagmi/core'
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccountEffect } from 'wagmi';
import { useEffect } from 'react';
import { wagmiConfig } from '~/shared/config/rainbow-kit';
import { apiClient } from '~/shared/api/client';
import { invalidateUserGetQuery } from '~/entities/user';

type ModalTypes =
	| 'wallet-connect'
	| 'register-twitter'
	| 'register-profile'
	| 'register-success'
	| '2fa'
	| '2fa-success'
	| 'create-store'
	| 'create-store-success'
	| 'create-product'
	| 'all-set'

interface StoreType {
	open: boolean,
	setOpen: (open: boolean) => void,
	currentModal: ModalTypes,
	openModal: (modal: ModalTypes) => () => void,
	startFlow: (skipCreationModals?: boolean) => Promise<void>,
	hasTwitter: boolean,
	hasUsername: boolean,
	storeUrlToCreate: string | null,
	setStoreUrlToCreate: (url: string | null) => void,
	skipCreationModals: boolean
}

export const useRegisterFlow = create<StoreType>(set => ({
	open: false,
	setOpen: open => set({ open }),
	currentModal: 'register-twitter',
	openModal: modal => () => set({ open: true, currentModal: modal }),
	hasTwitter: false,
	hasUsername: false,
	storeUrlToCreate: null,
	setStoreUrlToCreate: url => set({ storeUrlToCreate: url }),
	skipCreationModals: false,

	async startFlow(skipCreationModals = false) {
		set({ skipCreationModals });

		const { address } = getAccount(wagmiConfig);
		if (!address) {
			set({ open: true, currentModal: 'wallet-connect' });
			return;
		}

		const { data: nonceResponse } = await apiClient.auth.generateNonce({ address });
		if (!nonceResponse)
			return;

		let signature: string;

		try {
			signature = await signMessage(wagmiConfig, {
				message: `By signing this message you accept Privacy Policy and Terms of Usage | ${nonceResponse.nonce}`,
			})
		}
		catch (error) {
			// viem sometimes throwing UnauthorizedProviderError despite the fact that the wallet is connected
			// the fast workaround:
			window.location.reload();
			return;
		}

		const { data: loginResponse } = await apiClient.auth.login({
			address, signature: signature
		});

		if (!loginResponse)
			return;

		await invalidateUserGetQuery();

		set({
			hasTwitter: loginResponse.hasTwitter,
			hasUsername: loginResponse.hasUsername
		})

		// Twitter is now optional - skip directly to username setup if needed
		if (!loginResponse.hasUsername)
			set({ open: true, currentModal: 'register-profile' });
	}
}));

export function useRegisterFlowWalletGuard() {
	// This is just because rainbowkit modal are nailed to the hooks
	const open = useRegisterFlow(s => s.open);
	const setOpen = useRegisterFlow(s => s.setOpen);
	const currentModal = useRegisterFlow(s => s.currentModal);
	const startFlow = useRegisterFlow(s => s.startFlow);
	const { openConnectModal, connectModalOpen } = useConnectModal();

	useAccountEffect({
		onConnect: () => {
			if (currentModal == 'wallet-connect')
				startFlow();
		}
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