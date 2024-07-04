'use client';

import { HTMLAttributes, RefObject } from "react";
import { cn } from "~/shared/lib/cn";
import { ChatMessageBubble } from "./MessageBubble";
import { ProductProp } from "~/entities/product";
import { useUserGetQuery } from "~/entities/user";
import { chatQueries } from "../../api/chat";

type ChatMessagesStreamProps = HTMLAttributes<HTMLDivElement> & ProductProp & {
	containerRef?: RefObject<HTMLDivElement>
};

export function ChatMessagesStream({ className, product, containerRef, ...props }: ChatMessagesStreamProps) {
	const { data: user } = useUserGetQuery();

	const { data: messages } = chatQueries.useGetChatMessagesForProduct({
		productId: product.id
	});

	return (
		<div
			{...props}
			ref={containerRef}
			className={cn('relative flex flex-col-reverse w-full', className)}
		>
			<div className='flex flex-col gap-[1rem]' >
				<div
					className='flex flex-col w-full gap-[1rem] mt-auto px-[0.25rem]'
				>
					{messages?.pages.map(page => (
						page.items.map(m => {
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
						})
					))}
				</div>
			</div>
		</div>
	);
}