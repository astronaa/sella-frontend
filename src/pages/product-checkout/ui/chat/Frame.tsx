import { HTMLAttributes } from "react";
import { ProductProp } from "~/entities/product";
import { cn } from "~/shared/lib/cn";
import { Button } from "~/shared/ui/kit/button";
import { Input } from "~/shared/ui/kit/input";
import { ChatMessagesStream } from "./MessagesStream";
import { PageProductCard } from "../PageProductCard";

export function ChatFrame({ product, className, ...props }: HTMLAttributes<HTMLDivElement> & ProductProp) {
	return (
		<div
			{...props}
			className={cn(
				'flex flex-col justify-between border border-secondary bg-white/[.04]',
				'rounded-[1.25rem] p-[1rem] pt-0 gap-[1rem] h-[44.875rem]',
				className
			)}
		>
			<PageProductCard
				product={product}
				className='w-full max-w-full max-lg:hidden mt-[1rem] flex-shrink-0'
			/>

			<ChatMessagesStream
				product={product}
				className='flex-grow overflow-y-auto pt-[1rem]'
			/>

			<div className='flex gap-[1rem] w-full'>
				<Input
					className='w-full min-h-full rounded-[1.25rem]'
					placeholder='Your Message'
				/>

				<Button className='rounded-[1.25rem] px-[1.5rem]'>
					Send
				</Button>
			</div>
		</div>
	);
}