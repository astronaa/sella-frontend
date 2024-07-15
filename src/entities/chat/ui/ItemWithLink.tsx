import { Button, ButtonProps } from "~/shared/ui/kit/button";
import { ChatProp } from "./Prop";
import { ProductImage } from "~/entities/product";
import { cn } from "~/shared/lib/cn";
import Link from "next/link";
import { Avatar } from "~/shared/ui/kit/avatar";
import { dayJs } from "~/shared/lib/dayjs";
import { UnreadBadge } from "./UnreadBadge";
import { SystemMessage } from "./system-message";

export function ItemWithLink({ chat, className, ...props }: ButtonProps & ChatProp) {
	const { lastMessage, unreadMessagesCount, buyer } = chat;
	const user = lastMessage ? lastMessage.sender : buyer;

	return (
		<Button
			variant='ghost'
			{...props} asChild
			className={cn('flex gap-[0.75rem] h-auto items-stretch', className)}
		>
			<Link href={`/chats/${chat.id}`}>
				<ProductImage
					product={chat.product}
					className="size-[3.875rem] my-[0.75rem]"
				/>

				<div className="flex flex-col gap-[0.125rem] w-full min-w-0 max-w-full pt-[0.75rem] h-auto border-b border-secondary">
					{user && (
						<div className="flex justify-between gap-[0.75rem]">
							<div className="flex items-center gap-[0.375rem]">
								<Avatar
									className='text-[1.25rem]'
									name={user.username ?? undefined}
									src={user.avatarImage ?? undefined}
								/>

								<p className="font-semibold text-[0.9375rem] font-manrope leading-[1.2188rem]">
									{user.username}
								</p>
							</div>

							{lastMessage && (
								<p className="font-normal text-[0.875rem] font-manrope leading-[1.1375rem] text-black-60">
									{dayJs(lastMessage.createdAt).calendar(null, {
										sameDay: 'HH:mm',
										lastDay: 'ddd',
										lastWeek: 'ddd',
										sameElse: 'MM.DD.YYYY',
									})}
								</p>
							)}
						</div>
					)}

					<div className="relative flex gap-[0.75rem] text-black-60 pe-[2rem]">
						{!!lastMessage?.systemType ? (
							<SystemMessage.Root 
								className='flex-row items-center gap-[0.25rem] py-[0.5rem]'
								message={lastMessage}
							>
								<SystemMessage.Icon className='size-[1.5rem]' />
								<SystemMessage.TitleOrDescription 
									className='text-[0.9375rem] font-normal truncate max-w-full' 
								/>
							</SystemMessage.Root>
						) : (
							<p
								className="font-normal text-[0.9375rem] font-manrope leading-[1.2188rem] 
									line-clamp-2 whitespace-normal text-start"
							>
								{lastMessage ? (
									lastMessage.content
								) : (
									<span className='text-black-40'>No messages yet</span>
								)}
							</p>
						)}

						<UnreadBadge
							count={unreadMessagesCount}
							className='absolute right-0'
						/>
					</div>
				</div>
			</Link>
		</Button>
	);
}