import { Button, ButtonProps } from "~/shared/ui/kit/button";
import { ChatProp } from "./Prop";
import { ProductImage } from "~/entities/product";
import { cn } from "~/shared/lib/cn";
import Link from "next/link";
import { Avatar } from "~/shared/ui/kit/avatar";
import { dayJs } from "~/shared/lib/dayjs";
import { UnreadBadge } from "./UnreadBadge";

export function ItemWithLink({ chat, className, ...props }: ButtonProps & ChatProp) {
	const { lastMessage, unreadMessagesCount } = chat;

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
					{lastMessage && (
						<div className="flex justify-between gap-[0.75rem]">
							<div className="flex items-center gap-[0.375rem]">
								<Avatar
									className='text-[1.25rem]'
									name={lastMessage.sender.username ?? undefined}
									src={lastMessage.sender.avatarImage ?? undefined}
								/>

								<p className="font-semibold text-[0.9375rem] font-manrope leading-[1.2188rem]">
									{lastMessage.sender.username}
								</p>
							</div>

							<p className="font-normal text-[0.875rem] font-manrope leading-[1.1375rem] text-black-60">
								{dayJs(lastMessage.createdAt).calendar(null, {
									sameDay: 'HH:mm',
									lastDay: 'ddd',
									lastWeek: 'ddd',
									sameElse: 'MM.DD.YYYY',
								})}
							</p>
						</div>
					)}

					<div className="relative flex gap-[0.75rem] text-black-60">
						<p
							className="font-normal text-[0.9375rem] font-manrope leading-[1.2188rem] 
								line-clamp-2 whitespace-normal text-start"
						>
							{lastMessage?.content}
						</p>

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