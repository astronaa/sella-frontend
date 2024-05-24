import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";
import { dayJs } from "~/shared/lib/dayjs";
import { PreviewImage } from "~/shared/ui/image";

export interface Message {
	title?: string,
	body: string,
	imageUrl?: string | null | undefined,
	isSystem: boolean,
	createdAt: string
}

interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
	message: Message
}

export function ChatBubble({ message, className, ...props }: ChatBubbleProps) {
	return (
		<div
			{...props}
			className={cn(
				'flex gap-[1rem] p-[1rem] pe-[3.25rem] rounded-[1.25rem] border border-secondary relative max-w-[31.25rem]',
				className
			)}
		>
			{message.imageUrl !== undefined && (
				<PreviewImage
					src={message.imageUrl}
					className='size-[2rem] rounded-full shadow-md'
					alt=''
				/>
			)}

			<div className={cn(
				'flex flex-col gap-[0.5rem] w-full',
				message.isSystem ? 'text-accent-100' : 'text-black-74'
			)}>
				{!!message.title && (
					<h3 className='text-accent-100'>
						{message.title}
					</h3>
				)}
				<p>{message.body}</p>
			</div>

			<span className='absolute right-[10px] bottom-[10px] text-black-40 text-[0.875rem] italic'>
				{dayJs(message.createdAt).format('HH:mm')}
			</span>
		</div>
	);
}