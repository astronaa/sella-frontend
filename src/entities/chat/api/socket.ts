import { Chat, ChatId, ChatMessage, ChatMessageId, mapDtoToChat, mapDtoToChatMessage } from "~/shared/api/client";
import { useSocketIo } from "../lib/use-socket-io";
import { useCallback } from "react";
import { useCallbackRef } from "~/shared/lib/use-callback-ref";
import { useGetChatsInfo } from "./queries";
import { components } from "~/shared/api/openapi";

interface UseChatSocket {
	chatId?: ChatId | null,
	onNewMessage?: (message: ChatMessage) => void;
	onChatUpdate?: (chat: Chat) => void;
}

export function useChatSocket({ chatId = null, ...args }: UseChatSocket) {
	const { data: chatsInfo } = useGetChatsInfo();

	const onNewMessage = useCallbackRef(
		(payload: components["schemas"]["MessageDto"]) => {
			const message = mapDtoToChatMessage(payload)
			args?.onNewMessage?.(message);
		}
	);

	const onChatUpdate = useCallbackRef(
		(payload: components["schemas"]["ChatDTO"]) => {
			const chat = mapDtoToChat(payload)
			args?.onChatUpdate?.(chat);
		}
	);

	const { socketRef } = useSocketIo({
		accessToken: chatsInfo?.accessToken,
		onConnect: (socket) => socket.emit("listenChats"),
		onCreated: (socket) => {
			socket.on("newMessage", onNewMessage);
			socket.on("chatUpdate", onChatUpdate);
		},
		onDestroyed: (socket) => {
			socket.off("newMessage", onNewMessage);
			socket.off("chatUpdate", onChatUpdate);
		},
	});

	return {
		sendMessage: useCallback(
			(content: string) => {
				socketRef.current?.emit("sendMessage", { chatId, content });
			},
			[socketRef, chatId]
		),
		readMessage: useCallback(
			(messageId: ChatMessageId) => {
				socketRef.current?.emit("readMessage", { messageId });
			},
			[socketRef]
		)
	};
}