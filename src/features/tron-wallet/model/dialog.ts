'use client';

import { create } from 'zustand'

interface StoreType {
	open: boolean,
	setOpen: (open: boolean) => void,
}

export const useWalletConnectDialog = create<StoreType>(set => ({
	open: false,
	setOpen: open => set({ open })
}));