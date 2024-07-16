'use client';

import { 
	Chat, 
	ChatId, 
	ChatMessage, 
	ChatMessageId, 
	mapDtoToChat, 
	mapDtoToChatMessage 
} from "~/shared/api/client";

import { Socket } from "socket.io-client";
import { createContextFactory } from "~/shared/lib/create-context-factory";
import { useGetChatsInfo } from "../../api/queries";
import { useSocketIo, useSocketIoEvents } from "../../lib/use-socket-io";
import { PropsWithChildren, useCallback } from "react";
import { useCallbackRef } from "~/shared/lib/use-callback-ref";
import { components } from "~/shared/api/openapi";
import { ChatRealtimeUpdates } from "./realtime-updates";

const create = createContextFactory('chatSocket');
const context = create<Socket | null>();

export const {
	useChatSocketStrictContext
} = context;

export function ChatSocketProvider({ children }: PropsWithChildren) {
	const { data: chatsInfo } = useGetChatsInfo();

	const socket = useSocketIo({ accessToken: chatsInfo?.accessToken });

	return (
		<context.ChatSocketProvider value={socket}>
			{children}

			<ChatRealtimeUpdates />
		</context.ChatSocketProvider>
	);
}

interface UseChatSocket {
	chatId?: ChatId | null,
	onNewChat?: (chat: Chat) => void;
	onNewMessage?: (message: ChatMessage) => void;
	onChatUpdate?: (chat: Chat) => void;
}

export function useChatSocket({ chatId = null, ...args }: UseChatSocket) {
	const socket = useChatSocketStrictContext();

	const onNewChat = useCallbackRef(
		(payload: components["schemas"]["ChatDTO"]) => {
			const chat = mapDtoToChat(payload);
			socket?.emit("listenChats");
			args?.onNewChat?.(chat);
		}
	);

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

	useSocketIoEvents(socket, {
		onConnect: (socket) => socket.emit("listenChats"),
		onCreated: (socket) => {
			socket.on("newChat", onNewChat);
			socket.on("newMessage", onNewMessage);
			socket.on("chatUpdate", onChatUpdate);
		},
		onDestroyed: (socket) => {
			socket.off("newChat", onNewChat);
			socket.off("newMessage", onNewMessage);
			socket.off("chatUpdate", onChatUpdate);
		},
	})

	return {
		sendMessage: useCallback(
			(content: string) => {
				socket?.emit("sendMessage", { chatId, content });
			},
			[socket, chatId]
		),
		readMessage: useCallback(
			(messageId: ChatMessageId) => {
				socket?.emit("readMessage", { messageId });
			},
			[socket]
		)
	};
}