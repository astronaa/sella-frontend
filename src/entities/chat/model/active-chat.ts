'use client';

import { useEffect } from "react";
import { ChatId } from "~/shared/api/client";

const activeChats: ChatId[] = []

export function useSetActive(chatId: ChatId | undefined) {
	useEffect(() => {
		if (!chatId)
			return;

		activeChats.push(chatId);
		
		return () => {
			activeChats.pop();
		}
	}, [chatId]);
}

export const isActiveChat = (chatId: ChatId) => activeChats.includes(chatId);