'use client';

import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";
import { ChatMessageBubble, Message } from "./MessageBubble";

interface ChatMessagesStreamProps extends HTMLAttributes<HTMLDivElement> {
	initialMessages?: Message[];
}

export function ChatMessagesStream({ className, initialMessages = [], ...props }: ChatMessagesStreamProps) {
	// const { data } = useQuery({
	// 	queryKey: ['chat'],
	// 	queryFn: async () => {
	// 		const chatsRes = await apiClient.chats
	// 			.fromProduct('d6067dc4-587a-47b9-b58a-ad9a7f7027f0')
	// 			.get();

	// 		if(chatsRes.error)
	// 			throw chatsRes.error;

	// 		const messagesRes = await apiClient.chats
	// 			.for(chatsRes.data.id)
	// 			.getMessages()

	// 		if(messagesRes.error)
	// 			throw messagesRes.error;

	// 		return messagesRes.data;
	// 	}
	// })
	
	// console.log(data);

	return (
		<div {...props} className={cn('relative flex flex-col-reverse w-full', className)}>
			<div className='flex flex-col gap-[1rem]'>
				<div className='flex flex-col w-full gap-[1rem] mt-auto px-[0.25rem]'>
					{initialMessages.map((m, index) => (
						<ChatMessageBubble
							key={index} message={m}
							className={cn(m.title ? 'rounded-bl-none' : 'self-end bg-white/[.06] rounded-br-none')}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
