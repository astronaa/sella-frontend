import { produce } from "immer";
import { useEffect } from "react";
import { chatQueries } from "~/entities/chat";
import { ChatId, apiClient } from "~/shared/api/client";
import { queryClient } from "~/shared/config/query-client";
import { InferQueryOptionsFnData } from "~/shared/lib/utility-types";

export async function actionReadChat(chatId: ChatId) {
	await apiClient.chats.for(chatId).read();
	chatQueries.invalidateOverallReadCount();

	const queryOptions = chatQueries.getChatsOptions();

	queryClient.setQueriesData<InferQueryOptionsFnData<typeof queryOptions>>(
		{ queryKey: queryOptions.queryKey },
		data => {

			return produce(data, draft => {
				if(!draft?.pages)
					return;

				for(const page of draft.pages) {
					const chat = page.items.find(c => c.id == chatId);
					if(chat)
						chat.unreadMessagesCount = 0;
				}
			})
		}
	)
}

export function useReadMessagesOnMount(chatId: ChatId | undefined) {
	useEffect(() => {
		if (!chatId)
			return;

		actionReadChat(chatId);
	}, [chatId])
}