import { ProductId } from "~/shared/api/client";
import { chatQueries } from ".";
import { useQuery } from "@tanstack/react-query";
import { useSocketIo } from "../../lib/use-socket-io";
import { useCallback } from "react";
import { mapDtoToChatMessage } from "~/shared/api/client";
import { components } from "~/shared/api/openapi";

export function useChatSocketForProduct(productId: ProductId) {
	const { data } = useQuery({
		...chatQueries.getChatForProductOptions(productId),
		staleTime: Infinity
	});

	const chatId = data?.chat.id;
	const accessToken = data?.accessToken;

	const onNewMessage = useCallback((payload: components['schemas']['MessageDto']) => {
		const message = mapDtoToChatMessage(payload);
		console.log(message);
	}, []);

	const { socketRef } = useSocketIo({
		uri: 'ws://localhost:3003', accessToken,
		onConnect: socket => socket.emit('joinRoom', { chatId }),
		onCreated: socket => {
			if (!socket.hasListeners('newMessage'))
				socket.on('newMessage', onNewMessage)
		},
		onDisconnect: socket => {
			socket.off('newMessage', onNewMessage);
		}
	})

	return {
		sendMessage: useCallback((content: string) => {
			socketRef.current?.emit('sendMessage', { content });
		}, [socketRef])
	}
}	