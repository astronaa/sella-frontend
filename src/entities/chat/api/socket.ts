import { ChatId, ChatMessage, ProductId } from "~/shared/api/client";
import { useQuery } from "@tanstack/react-query";
import { useSocketIo } from "../lib/use-socket-io";
import { useCallback } from "react";
import { mapDtoToChatMessage } from "~/shared/api/client";
import { components } from "~/shared/api/openapi";
import { queryClient } from "~/shared/config/query-client";
import { useCallbackRef } from "~/shared/lib/use-callback-ref";
import { getChatMessagesOptions, getChatsOptions, getFromProductOptions } from "./queries";
import { produce } from "immer"

const onNewMessage = (payload: components["schemas"]["MessageDto"]) => {
	const message = mapDtoToChatMessage(payload);
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
				const chat = draft.pages[0]?.items.find(c => c.id == message.chatId);
				if(chat)
					chat.lastMessage = message;
			});
		}
	);
};

let onNewMessageListenersCount = 0;

export function useChatSocketForProduct(
	productId: ProductId,
	args: Omit<UseChatSocket, 'chatId' | 'accessToken'> = {}
) {
	const { data } = useQuery({
		...getFromProductOptions(productId),
		staleTime: Infinity,
	});

	const chatId = data?.chat.id;
	const accessToken = data?.accessToken;

	return useChatSocket({
		chatId: chatId ?? null,
		accessToken: accessToken ?? null,
		...args
	})
}

interface UseChatSocket {
	chatId: ChatId | null,
	accessToken: string | null,
	onNewMessage?: (message: ChatMessage) => void;
}

export function useChatSocket({ chatId, accessToken, ...args }: UseChatSocket) {
	const onNewMessageCb = useCallbackRef(args?.onNewMessage);

	const { socketRef } = useSocketIo({
		accessToken: accessToken ?? undefined,
		onConnect: (socket) => socket.emit("listenChats"),
		onCreated: (socket) => {
			if (!onNewMessageListenersCount) {
				socket.on("newMessage", onNewMessage);
				onNewMessageListenersCount++;
			}

			socket.on("newMessage", onNewMessageCb);
			onNewMessageListenersCount++;
		},
		onDestroyed: (socket) => {
			socket.off("newMessage", onNewMessageCb);
			onNewMessageListenersCount--;

			if (onNewMessageListenersCount == 1) {
				socket.off("newMessage", onNewMessage);
				onNewMessageListenersCount--;
			}
		},
	});

	return {
		sendMessage: useCallback(
			(content: string) => {
				socketRef.current?.emit("sendMessage", { chatId, content });
			},
			[socketRef, chatId]
		),
	};
}