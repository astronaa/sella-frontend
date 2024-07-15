import { ChatMessage } from "~/shared/api/client";
import { queryClient } from "~/shared/config/query-client";
import { getChatMessagesOptions, getChatsOptions } from "./queries";
import { produce } from "immer";
import { useChatSocket } from "./socket";

export const onNewMessage = (message: ChatMessage) => {
	const queryOptions = getChatMessagesOptions({
		chatId: message.chatId,
	});

	queryClient.setQueriesData<Parameters<NonNullable<typeof queryOptions.select>>[0]>(
		{ queryKey: queryOptions.queryKey },
		(data) => {
			if (!data) return;

			return produce(data, draft => {
				draft.pages[0]?.items.push(message);
			});
		}
	);

	const chatsListQueryOptions = getChatsOptions();

	queryClient.setQueriesData<Parameters<NonNullable<typeof chatsListQueryOptions.select>>[0]>(
		{ queryKey: chatsListQueryOptions.queryKey },
		(data) => {
			if (!data) return;

			return produce(data, draft => {
				const chats = draft.pages[0]?.items;
				const index = chats?.findIndex(c => c.id == message.chatId);

				if (index != -1) {
					const chat = chats[index];
					chat.lastMessage = message;
					
					if(index != 0) {
						chats.splice(index, 1);
						chats.unshift(chat);
					}
				}
			});
		}
	);
};

export function useGlobalListener() {
	return useChatSocket({ onNewMessage })
}