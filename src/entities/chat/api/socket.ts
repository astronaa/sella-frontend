import { ChatId, ChatMessage, mapDtoToChatMessage } from "~/shared/api/client";
import { useSocketIo } from "../lib/use-socket-io";
import { useCallback } from "react";
import { useCallbackRef } from "~/shared/lib/use-callback-ref";
import { useGetChatsInfo } from "./queries";
import { components } from "~/shared/api/openapi";

interface UseChatSocket {
	chatId?: ChatId | null,
	onNewMessage?: (message: ChatMessage) => void;
}

export function useChatSocket({ chatId = null, ...args }: UseChatSocket) {
	const { data: chatsInfo } = useGetChatsInfo(); 
	
	const onNewMessageCb = useCallbackRef(
		(payload: components["schemas"]["MessageDto"]) => {
			const message = mapDtoToChatMessage(payload)
			args?.onNewMessage?.(message);
		}
	);

	const { socketRef } = useSocketIo({
		accessToken: chatsInfo?.accessToken,
		onConnect: (socket) => socket.emit("listenChats"),
		onCreated: (socket) => {
			socket.on("newMessage", onNewMessageCb);
		},
		onDestroyed: (socket) => {
			socket.off("newMessage", onNewMessageCb);
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