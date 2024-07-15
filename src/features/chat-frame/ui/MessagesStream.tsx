"use client";

import React, { Fragment, HTMLAttributes, RefObject, useRef } from "react";
import { cn } from "~/shared/lib/cn";
import { ChatMessageBubble } from "./MessageBubble";
import { useUserGetQuery } from "~/entities/user";
import { useScrollPagination } from "~/shared/lib/use-scroll-pagination";
import { useMergeRefs } from "~/shared/lib/use-merge-refs";
import { Chat } from "~/shared/api/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { chatQueries } from "~/entities/chat";
import { Skeleton } from "~/shared/ui/kit/skeleton";
import { NotFoundScreen } from "~/shared/ui/not-found-screen";
import { Icons } from "~/shared/ui/icons";

const chatSkeleton = [
	{
		title: '',
		body: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
		createdAt: '2024-07-13T22:39:11.836Z',
		isSystem: false,
		local: false
	},
	{
		title: '',
		body: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
		createdAt: '2024-07-13T22:39:11.836Z',
		isSystem: false,
		local: false
	},
	{
		title: '',
		body: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
		createdAt: '2024-07-13T22:39:11.836Z',
		isSystem: false,
		local: true
	},
	{
		title: '',
		body: 'Lorem Ipsum',
		createdAt: '2024-07-13T22:39:11.836Z',
		isSystem: false,
		local: false
	},
	{
		title: '',
		body: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500',
		createdAt: '2024-07-13T22:39:11.836Z',
		isSystem: false,
		local: true
	},
]

type ChatMessagesStreamProps = HTMLAttributes<HTMLDivElement> & {
	chat: Chat | null,
	containerRef?: RefObject<HTMLDivElement>;
};

export function ChatMessagesStream({
	chat,
	containerRef,
	className,
	...props
}: ChatMessagesStreamProps) {
	const { data: user } = useUserGetQuery();

	const {
		data: messages,
		fetchNextPage,
		isFetchingNextPage,
		isLoading,
		hasNextPage,
	} = useInfiniteQuery({
		...chatQueries.getChatMessagesOptions({
			chatId: chat?.id ?? null
		})
	});

	const ref = useRef<HTMLDivElement>(null);
	const mergedRef = useMergeRefs(ref, containerRef);

	useScrollPagination(ref, {
		shouldObserve: !isFetchingNextPage && hasNextPage,
		onLoadMore: fetchNextPage,
		threshold: 0.8,
	});

	const chatIsEmpty = messages && messages.pages[0]?.items.length === 0;

	return (
		<div
			{...props}
			ref={mergedRef}
			className={cn("relative flex flex-col-reverse w-full", className)}
			style={{
				"--scrollbar-track-mt": "0rem",
				"--scrollbar-track-mb": "6rem",
			} as React.CSSProperties}
		>
			{chatIsEmpty && (
				<NotFoundScreen className='h-full border-none pb-[10rem]'>
					<Icons.Chat />
					There are no messages here yet. send the first chat message
				</NotFoundScreen>
			)}
			
			<div className="flex flex-col gap-[1rem] pb-[6rem]">
				<div className="flex flex-col w-full gap-[1rem] mt-auto px-[4px]">
					{(!chat || isLoading) && (
						chatSkeleton.map((m, index) => (
							<Skeleton
								key={index}
								loading asChild
							>
								<ChatMessageBubble
									message={m}
									className={cn(
										m.local
											? "self-end bg-white/[.06] rounded-br-none"
											: "rounded-bl-none"
									)}
								/>
							</Skeleton>
						))
					)}

					{messages?.pages.map((page) => (
						<Fragment key={page.items[0]?.id}>
							{page.items.map((m) => {
								const isLocalMsg = m.sender.username == user?.username;

								return (
									<ChatMessageBubble
										key={m.id}
										message={{
											title: isLocalMsg ? undefined : m.sender.username ?? undefined,
											imageUrl: isLocalMsg ? undefined : m.sender.avatarImage,
											body: m.content,
											createdAt: m.createdAt,
											isSystem: false,
										}}
										className={cn(
											isLocalMsg
												? "self-end bg-white/[.06] rounded-br-none"
												: "rounded-bl-none"
										)}
									/>
								);
							})}
						</Fragment>
					))}
				</div>
			</div>
		</div>
	);
}
