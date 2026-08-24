'use client';

import { useState } from "react";
import { cn } from "~/shared/lib/cn";
import { Avatar } from "~/shared/ui/kit/avatar";
import { Button } from "~/shared/ui/kit/button";
import { ProductImage } from "~/entities/product";
import { ChatUnreadBadge } from "~/entities/chat";
import { DemoChatFrame } from "~/widgets/demo-order";
import { demoChats, type DemoChat } from "~/shared/static-data/demo-activity";

/**
 * Public preview of the chat inbox for signed-out visitors: the real
 * two-pane layout (list left, conversation right) fed with scripted
 * demo conversations. Remove when auth goes live.
 */

function DemoChatListItem({
	chat,
	active,
	onClick,
}: {
	chat: DemoChat;
	active: boolean;
	onClick: () => void;
}) {
	const sellerName = chat.product.store?.owner?.username
		?? chat.product.store?.name
		?? "Seller";

	const lastText = [...chat.messages].reverse().find((m) => m.kind !== "system")?.body
		?? chat.messages[chat.messages.length - 1]?.body
		?? "";

	return (
		<Button
			variant='ghost'
			active={active}
			onClick={onClick}
			className='flex gap-[0.75rem] h-auto items-stretch'
		>
			<ProductImage
				product={chat.product}
				className="size-[3.875rem] my-[0.75rem]"
			/>

			<div className="flex flex-col gap-[0.125rem] w-full min-w-0 max-w-full pt-[0.75rem] h-auto border-b border-secondary">
				<div className="flex justify-between gap-[0.75rem]">
					<div className="flex items-center gap-[0.375rem]">
						<Avatar
							className='text-[1.25rem]'
							name={sellerName}
							src={chat.product.store?.previewImage ?? undefined}
						/>

						<p className="font-semibold text-[0.9375rem] font-manrope leading-[1.2188rem]">
							{sellerName}
						</p>
					</div>

					<p className="font-normal text-[0.875rem] font-manrope leading-[1.1375rem] text-black-60">
						{chat.lastTime}
					</p>
				</div>

				<div className="relative flex gap-[0.75rem] text-black-60 pe-[2rem]">
					<p
						className="font-normal text-[0.9375rem] font-manrope leading-[1.2188rem]
							line-clamp-2 whitespace-normal text-start"
					>
						{lastText}
					</p>

					<ChatUnreadBadge
						count={chat.unread}
						className='absolute right-0'
					/>
				</div>
			</div>
		</Button>
	);
}

export function ChatsPreview() {
	const [activeId, setActiveId] = useState(demoChats[0]?.id);
	const [mobilePane, setMobilePane] = useState<'list' | 'chat'>('list');
	const active = demoChats.find((chat) => chat.id === activeId) ?? demoChats[0];

	return (
		<div className='flex flex-col gap-[1rem] w-full'>
			<div className='flex w-full max-w-content mx-auto px-[1rem]'>
				<span className="flex items-center gap-[0.5rem] rounded-full bg-accent-100/[0.09] px-[0.875rem] py-[0.375rem] text-[0.8125rem] text-accent-100 w-fit">
					<span className="size-[0.375rem] rounded-full bg-accent-100 animate-pulse" />
					Preview · this is how your chats will look
				</span>
			</div>

			<div className="flex gap-[1.25rem] justify-center w-full max-w-content mx-auto px-[1rem] h-[44.6875rem]">
				<div
					className={cn(
						"flex flex-col gap-[0.5rem] w-full max-w-[22.5rem] px-[0.75rem] py-[1rem]",
						"border border-white/[.04] rounded-[1.25rem]",
						mobilePane === 'chat' && 'max-lg:hidden'
					)}
				>
					<div className="flex gap-[0.375rem] items-center px-[0.5rem]">
						<p className="font-semibold text-[1.125rem] font-manrope leading-[1.3] truncate">
							Chats
						</p>

						<p className="font-semibold text-[1.125rem] font-manrope leading-[1.3] truncate text-black-40">
							{demoChats.length}
						</p>
					</div>

					<div className='flex flex-col gap-[0.5rem] flex-grow overflow-y-auto pe-[0.25rem]'>
						{demoChats.map((chat) => (
							<DemoChatListItem
								key={chat.id}
								chat={chat}
								active={chat.id === activeId}
								onClick={() => {
									setActiveId(chat.id);
									setMobilePane('chat');
								}}
							/>
						))}
					</div>
				</div>

				<div className={cn("w-full flex flex-col gap-[0.5rem]", mobilePane === 'list' && 'max-lg:hidden')}>
					<button
						onClick={() => setMobilePane('list')}
						className='lg:hidden flex items-center gap-[0.375rem] text-black-60 hover:text-white transition text-[0.875rem] w-fit'
					>
						<svg viewBox="0 0 16 16" className="size-[0.875rem] fill-current rotate-180">
							<path d="M5.5 2.5L11 8l-5.5 5.5L4.4 12.4 8.8 8 4.4 3.6z" />
						</svg>
						All chats
					</button>

					{active && (
						<DemoChatFrame
							product={active.product}
							messages={active.messages}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
