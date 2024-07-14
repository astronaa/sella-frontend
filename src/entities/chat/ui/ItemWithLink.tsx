import { Button, ButtonProps } from "~/shared/ui/kit/button";
import { ChatProp } from "./Prop";
import { ProductImage } from "~/entities/product";
import { cn } from "~/shared/lib/cn";
import Link from "next/link";
import { Avatar } from "~/shared/ui/kit/avatar";
import { dayJs } from "~/shared/lib/dayjs";
import { UnreadBadge } from "./UnreadBadge";

export function ItemWithLink({ chat, className, ...props }: ButtonProps & ChatProp) {
	const username = 'Sharon Bruce';
	const lastMessage = chat.lastMessages.at(-1);
	const unreadCount = 3;

	return (
		<Button
			variant='ghost'
			{...props} asChild
			className={cn('flex gap-[0.75rem] h-auto items-stretch', className)}
		>
			<Link href={`/chats/${chat.product.id}`}>
				<ProductImage
					product={chat.product}
					className="size-[3.875rem] my-[0.75rem]"
				/>

				<div className="flex flex-col gap-[0.125rem] min-w-0 max-w-full pt-[0.75rem] h-auto border-b border-secondary">
					<div className="flex justify-between gap-[0.75rem]">
						<div className="flex items-center gap-[0.375rem]">
							<Avatar
								className='size-[1.25rem]'
								name={username}
							/>

							<p className="font-semibold text-[0.9375rem] font-manrope leading-[1.2188rem]">
								{username}
							</p>
						</div>

						{lastMessage && (
							<p className="font-normal text-[0.875rem] font-manrope leading-[1.1375rem] text-black-60">
								{dayJs(lastMessage.createdAt).calendar(null, {
									sameDay: 'HH:mm',
									lastDay: 'ddd',
									sameElse: 'MM.DD.YYYY'
								})}
							</p>
						)}
					</div>

					<div className="flex gap-[0.75rem] text-black-60">
						<p
							className="font-normal text-[0.9375rem] font-manrope leading-[1.2188rem] 
								line-clamp-2 whitespace-normal text-start"
						>
							{lastMessage?.content}
						</p>

						<UnreadBadge count={unreadCount} />
					</div>
				</div>
			</Link>
		</Button>
	);
}