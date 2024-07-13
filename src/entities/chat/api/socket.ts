import { ChatId, ChatMessage, ProductId } from "~/shared/api/client";
import { useQuery } from "@tanstack/react-query";
import { useSocketIo } from "../lib/use-socket-io";
import { useCallback } from "react";
import { mapDtoToChatMessage } from "~/shared/api/client";
import { components } from "~/shared/api/openapi";
import { queryClient } from "~/shared/config/query-client";
import { useCallbackRef } from "~/shared/lib/use-callback-ref";
import { getChatMessagesOptions, getFromProductOptions } from "./queries";

const onNewMessage = (payload: components["schemas"]["MessageDto"]) => {
	const message = mapDtoToChatMessage(payload);
	const queryOptions = getChatMessagesOptions({
		chatId: message.chatId,
	});

	type TDataType = Parameters<NonNullable<typeof queryOptions.select>>[0];

	queryClient.setQueriesData<TDataType>(
		{ queryKey: queryOptions.queryKey },
		(data) => {
			if (!data) return;

			return {
				...data,
				pages: data.pages.map((p, index) =>
					index != 0
						? p
						: {
							...p,
							items: [...p.items, message],
						}
				),
			};
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
		onConnect: (socket) => socket.emit("joinRoom", { chatId }),
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
				socketRef.current?.emit("sendMessage", { content });
			},
			[socketRef]
		),
	};
}