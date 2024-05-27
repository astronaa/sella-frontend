import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";
import { ChatMessageBubble, Message } from "./MessageBubble";

interface ChatMessagesStreamProps extends HTMLAttributes<HTMLDivElement> {
	initialMessages?: Message[];
}

export function ChatMessagesStream({ className, initialMessages = [], ...props }: ChatMessagesStreamProps) {
	return (
		<div {...props} className={cn('relative flex flex-col-reverse w-full', className)}>
			<div className='flex flex-col gap-[1rem]'>
				<div className='flex flex-col w-full gap-[1rem] mt-auto px-[0.25rem]'>
					{initialMessages.map((m, index) => (
						<ChatMessageBubble
							key={index} message={m}
							className={cn(m.title ? 'rounded-bl-none' : 'self-end bg-white/[.06] rounded-br-none')}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
