import { HTMLAttributes } from "react";
import { ProductProp } from "~/entities/product";
import { cn } from "~/shared/lib/cn";
import { Button } from "~/shared/ui/kit/button";
import { Input } from "~/shared/ui/kit/input";
import { Message } from "./MessageBubble";
import { ChatMessagesStream } from "./MessagesStream";
import { PageProductCard } from "../PageProductCard";

const messages: Message[] = [
	{
		title: 'Sellame',
		body: 'Feel free to ask any questions before ordering by messaging the seller. Keep all conversations within this chat window to stay protected from scams.',
		imageUrl: '',
		isSystem: true,
		createdAt: new Date().toISOString()
	},
	{
		title: 'Storefront Name',
		body: `Feel free to ask any questions you have before placing an order by sending a message to the seller.

		Please keep all conversations within this chat window and refrain from using external services like Telegram. 
		
		We won't be able to protect you in case of scams`,
		imageUrl: '',
		isSystem: false,
		createdAt: new Date().toISOString()
	},
	{
		body: `Hi, thank you. I don't have any
		questions. Always wanted a case haha`,
		isSystem: false,
		createdAt: new Date().toISOString()
	}
]

export function ChatFrame({ product, className, ...props }: HTMLAttributes<HTMLDivElement> & ProductProp) {
	return (
		<div
			{...props}
			className={cn(
				'flex flex-col justify-between border border-secondary bg-white/[.04]',
				'rounded-[1.25rem] p-[1rem] gap-[1rem] h-[44.875rem]',
				className
			)}
		>
			<PageProductCard 
				product={product} 
				className='w-full max-w-full max-lg:hidden'
			/>

			<ChatMessagesStream
				initialMessages={messages}
				className='flex-grow overflow-y-auto'
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