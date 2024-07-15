import { ChatId, ChatMessage } from "~/shared/api/client";
import { queryClient } from "~/shared/config/query-client";
import { getByIdOptions, getChatMessagesOptions, getChatsOptions } from "./queries";
import { produce } from "immer";
import { useChatSocket } from "./socket";
import { InferQueryOptionsFnData } from "~/shared/lib/utility-types";

export const onNewMessage = (message: ChatMessage) => {
	const queryOptions = getChatMessagesOptions({
		chatId: message.chatId,
	});

	queryClient.setQueriesData<InferQueryOptionsFnData<typeof queryOptions>>(
		{ queryKey: queryOptions.queryKey },
		(data) => {
			if (!data) return;

			return produce(data, draft => {
				draft.pages[0]?.items.push(message);
			});
		}
	);

	const chatsListQueryOptions = getChatsOptions();

	queryClient.setQueriesData<InferQueryOptionsFnData<typeof chatsListQueryOptions>>(
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

export function onChatFreeze(chatId: ChatId) {
	const queryOptions = getByIdOptions(chatId);

	queryClient.setQueriesData<InferQueryOptionsFnData<typeof queryOptions>>(
		{ queryKey: queryOptions.queryKey },
		(data) => {
			if (!data) return;

			return produce(data, draft => {
				draft.isFrozen = true;
			})
		}
	);
}

export function useGlobalListener() {
	return useChatSocket({ onNewMessage })
}