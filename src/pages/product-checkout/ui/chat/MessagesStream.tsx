'use client';

import { HTMLAttributes, useEffect, useRef } from "react";
import { cn } from "~/shared/lib/cn";
import { ChatMessageBubble } from "./MessageBubble";
import { ProductProp } from "~/entities/product";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";
import { Socket, io } from 'socket.io-client';
import { useUserGetQuery } from "~/entities/user";
import { Button } from "~/shared/ui/kit/button";

type ChatMessagesStreamProps = HTMLAttributes<HTMLDivElement> & ProductProp;

export function ChatMessagesStream({ className, product, ...props }: ChatMessagesStreamProps) {
	const { data: user } = useUserGetQuery();

	const chatQuery = useQuery({
		queryKey: ['chat'],
		queryFn: async () => {
			const { data, error } = await apiClient.chats
				.fromProduct(product.id)
				.get();

			if (error)
				throw error;

			return data;
		}
	})

	if (chatQuery.data)
		console.log('messages', chatQuery.data);

	const chatId = chatQuery?.data?.chat.id;
	const accessToken = chatQuery?.data?.accessToken;

	const messagesQuery = useQuery({
		enabled: !!chatId,
		queryKey: ['chat-messages', chatId],
		queryFn: chatId ? (async () => {
			const { data, error } = await apiClient.chats
				.for(chatId)
				.getMessages()

			if (error)
				throw error;

			return data;
		}) : undefined
	})

	const socketRef = useRef<Socket>();

	useEffect(() => {
		if (!accessToken)
			return;

		const socket = io('ws://localhost:3003', {
			transports: ['websocket'],
			auth: { accessToken }
		});

		socket.on('connect', () => {
			console.log('Connected to WebSocket server');

			socket.emit('joinRoom', { chatId });
		});

		socket.on('disconnect', () => {
			console.log('Disconnected from WebSocket server');
		});

		socketRef.current = socket;

		return () => {
			socket.close();
		}
	}, [chatId, accessToken]);

	if (messagesQuery.data)
		console.log('messages', messagesQuery.data);

	return (
		<div {...props} className={cn('relative flex flex-col-reverse w-full', className)}>
			<div className='flex flex-col gap-[1rem]'>
				<div className='flex flex-col w-full gap-[1rem] mt-auto px-[0.25rem]'>
					{/* @ts-expect-error wtf */}
					{messagesQuery?.data?.items.map(m => {
						const isLocalMsg = m.sender.username == user?.username;

						return (
							<ChatMessageBubble
								key={m.id}
								message={{
									title: isLocalMsg ? undefined : m.sender.username,
									imageUrl: isLocalMsg ? undefined : m.sender.avatarImage,
									body: m.content,
									createdAt: m.createdAt,
									isSystem: false,
								}}
								className={cn(
									isLocalMsg
										? 'self-end bg-white/[.06] rounded-br-none'
										: 'rounded-bl-none'
								)}
							/>
						)
					})}
				</div>

				<Button onClick={() => {
					socketRef.current?.send('newMessage', {
						content: 'hi!'
					});
				}}>
					Send hi!
				</Button>
			</div>
		</div>
	);
}