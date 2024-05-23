import { cn } from "~/shared/lib/cn";
import { dayJs } from "~/shared/lib/dayjs";
import { PreviewImage } from "~/shared/ui/image";

export interface Message {
	title: string,
	body: string,
	imageUrl: string | null,
	isSystem: boolean,
	createdAt: string
}

export function ChatBubble({ message }: { message: Message }) {
	return (
		<div className='flex gap-[1rem] p-[1rem] rounded-[1.25rem] rounded-bl-[0] border border-secondary relative max-w-[31.25rem]'>
			<PreviewImage
				src={message.imageUrl}
				className='size-[2rem] rounded-full shadow-md'
				alt=''
			/>

			<div className={cn(
				'flex flex-col gap-[0.5rem] w-full',
				message.isSystem ? 'text-accent-100' : 'text-black-74'
			)}>
				<h3 className='text-accent-100'>
					{message.title}
				</h3>
				<p>{message.body}</p>
			</div>

			<span className='absolute right-[10px] bottom-[10px] text-black-40 text-[0.875rem] italic'>
				{dayJs(message.createdAt).format('HH:mm')}
			</span>
		</div>
	);
}