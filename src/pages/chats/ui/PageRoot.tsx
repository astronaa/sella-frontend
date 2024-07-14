"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PropsWithChildren, useMemo, useState } from "react";
import { cn } from "~/shared/lib/cn";
import { Icons } from "~/shared/ui/icons";
import { Button } from "~/shared/ui/kit/button";
import { NotFoundScreen } from "~/shared/ui/not-found-screen";
import { ChatPanelTabProvider, PossibleTabs } from "../model/tabs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChatItemWithLink, chatQueries } from "~/entities/chat";
import { Skeleton } from "~/shared/ui/kit/skeleton";

export function PageRoot({ children }: PropsWithChildren) {
	const params = useParams();
	const [tab, setTab] = useState<PossibleTabs>(!!params?.chatId ? 'chat' : 'chats-list');
	const contextValue = useMemo(() => ({ tab, setTab }), [tab, setTab]);
	const { data: chats } = useInfiniteQuery(chatQueries.getChats());
	const total = chats?.pages[0]?.total;

	if (total === 0) {
		return (
			<NotFoundScreen className='w-full h-[44.6875rem] max-w-content mx-auto px-[1rem] '>
				<Icons.Chat />
				{"You don't have any chats yet"}

				<Button
					asChild className='mt-[2rem]'
				>
					<Link href='/marketplace'>
						Expore Marketplace
					</Link>
				</Button>
			</NotFoundScreen>
		);
	}

	return (
		<ChatPanelTabProvider value={contextValue}>
			<div className="flex gap-[1.25rem] justify-center w-full max-w-content mx-auto px-[1rem] h-[44.6875rem]">
				<div
					className={cn(
						"flex flex-col gap-[0.5rem] w-full max-w-[22.5rem] px-[0.75rem] py-[1rem]",
						"border border-white/[.04] rounded-[1.25rem]",
						tab == 'chat' && 'max-lg:hidden'
					)}
				>
					<div className="flex gap-[0.375rem] items-center px-[0.5rem]">
						<p className="font-semibold text-[1.125rem] font-manrope leading-[1.3] truncate">
							Chats
						</p>

						{total !== undefined && (
							<p className="font-semibold text-[1.125rem] font-manrope leading-[1.3] truncate text-black-40">
								{total}
							</p>
						)}
					</div>

					{!chats && Array(4).fill(0).map((_, index) => (
						<Skeleton
							key={index} loading
							className='w-full h-[5.625rem] rounded-[0.75rem]'
						/>
					))}

					{chats?.pages.map(page => (
						page.items.map(c => (
							<ChatItemWithLink
								key={c.id} chat={c}
								onClick={() => setTab('chat')}
								active={!!params?.chatId && params.chatId == c.id}
							/>
						))
					))}
				</div>

				<div className={cn("w-full", tab == 'chats-list' && 'max-lg:hidden')}>
					{children}
				</div>
			</div>
		</ChatPanelTabProvider>
	);
}