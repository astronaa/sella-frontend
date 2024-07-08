import { ChatMessage, ProductId } from "~/shared/api/client";
import { chatQueries } from ".";
import { useQuery } from "@tanstack/react-query";
import { useSocketIo } from "../../lib/use-socket-io";
import { useCallback } from "react";
import { mapDtoToChatMessage } from "~/shared/api/client";
import { components } from "~/shared/api/openapi";
import { queryClient } from "~/shared/config/query-client";
import { useCallbackRef } from "~/shared/lib/use-callback-ref";

const onNewMessage = (payload: components['schemas']['MessageDto']) => {
	const message = mapDtoToChatMessage(payload);
	const queryOptions = chatQueries.getChatMessagesOptions({ chatId: message.chatId });

	type TDataType = Parameters<NonNullable<typeof queryOptions.select>>[0]

	queryClient.setQueriesData<TDataType>(
		{ queryKey: queryOptions.queryKey },
		data => {
			if (!data)
				return;

			return {
				...data,
				pages: data.pages.map((p, index) => index != 0 ? p : ({
					...p,
					items: [...p.items, message]
				}))
			}
		}
	);
}

let onNewMessageListenersCount = 0;

interface UseChatSocketForProductArgs {
	onNewMessage?: (message: ChatMessage) => void
}

export function useChatSocketForProduct(productId: ProductId, args: UseChatSocketForProductArgs = {}) {
	const { data } = useQuery({
		...chatQueries.getChatForProductOptions(productId),
		staleTime: Infinity
	});

	const chatId = data?.chat.id;
	const accessToken = data?.accessToken;

	const onNewMessageCb = useCallbackRef(args?.onNewMessage);

	const { socketRef } = useSocketIo({
		uri: 'ws://localhost:3003', accessToken,
		onConnect: socket => socket.emit('joinRoom', { chatId }),
		onCreated: socket => {
			if (!onNewMessageListenersCount) {
				socket.on('newMessage', onNewMessage)
				onNewMessageListenersCount++
			}

			socket.on('newMessage', onNewMessageCb);
			onNewMessageListenersCount++;
		},
		onDestroyed: socket => {
			socket.off('newMessage', onNewMessageCb);
			onNewMessageListenersCount--;

			if (onNewMessageListenersCount == 1) {
				socket.off('newMessage', onNewMessage);
				onNewMessageListenersCount--
			}
		}
	})

	return {
		sendMessage: useCallback((content: string) => {
			socketRef.current?.emit('sendMessage', { content });
		}, [socketRef])
	}
}	