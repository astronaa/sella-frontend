'use client';

import { create } from 'zustand'

interface StoreType {
	open: boolean,
	setOpen: (open: boolean) => void,
}

export const useUserProfileSettingsDialog = create<StoreType>(set => ({
	open: false,
	setOpen: open => set({ open })
}));