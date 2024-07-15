"use client";

import React, { HTMLAttributes, UIEventHandler, useRef } from "react";
import { cn } from "~/shared/lib/cn";
import { Input } from "~/shared/ui/kit/input";
import { ChatMessagesStream } from "./MessagesStream";
import { Field, Form } from "react-final-form";
import { zodValidate } from "~/shared/lib/zod-final-form";
import { z } from "zod";
import { VSubmitButton } from "~/shared/ui/validation-inputs";
import { FormApi } from "final-form";
import { ChatProductCard } from "./ChatProductCard";
import { Chat, productMock } from "~/shared/api/client";
import { useChatSocket } from "~/entities/chat";
import { Skeleton } from "~/shared/ui/kit/skeleton";

const schema = z.object({
	message: z.string().min(1),
});

type SchemaType = z.infer<typeof schema>;

const validator = zodValidate(schema);

export interface ChatFrameProps extends HTMLAttributes<HTMLDivElement> {
	chat: Chat | null
}

export function ChatFrame({ chat, className, ...props }: ChatFrameProps) {
	const autoscrollEnabledRef = useRef(true);
	const containerRef = useRef<HTMLDivElement>(null);

	const tryScrollToBottom = () => {
		const container = containerRef.current;
		if (!container)
			return;

		container.scrollTo({
			behavior: 'smooth',
			top: container.scrollHeight
		});
	}

	const { sendMessage } = useChatSocket({
		chatId: chat?.id ?? null,
		onNewMessage: () => {
			setTimeout(() => {
				if (!autoscrollEnabledRef.current)
					return;

				tryScrollToBottom();
			}, 100);
		}
	})

	const onMessagesStreamScroll: UIEventHandler<HTMLDivElement> = event => {
		const container = event.currentTarget;
		autoscrollEnabledRef.current = container.scrollTop > -300;
	}

	const onSubmit = (values: SchemaType, form: FormApi<SchemaType>) => {
		sendMessage(values.message);
		form.reset();
		tryScrollToBottom();
	}

	return (
		<div
			{...props}
			className={cn(
				"flex flex-col bg-white/[.04] pt-[1rem] px-[1rem] rounded-[1.25rem] gap-[1.25rem] h-[44.6875rem]",
				"border border-white/[.04] overflow-hidden",
				className
			)}
		>
			<Skeleton 
				asChild loading={!chat?.product}
			>
				<ChatProductCard
					product={chat?.product ?? productMock}
					className="w-full max-w-full flex-shrink-0"
				/>
			</Skeleton>

			<div
				className={cn(
					"flex flex-col justify-between relative",
					"rounded-[1.25rem] gap-[1rem] flex-grow min-h-0",
					className
				)}
			>
				<ChatMessagesStream
					chat={chat}
					containerRef={containerRef}
					className="flex-grow overflow-y-auto"
					onScroll={onMessagesStreamScroll}
				/>

				<Form validate={validator} onSubmit={onSubmit} subscription={{}}>
					{({ handleSubmit }) => (
						<form
							className={cn(
								"flex gap-[1rem] w-full py-[1rem] absolute bottom-0 right-0 left-0",
								"bg-transparent backdrop-blur-sm"
							)}
							onSubmit={handleSubmit}
						>
							<Field name="message">
								{(props) => (
									<Input
										className="w-full min-h-full rounded-[1.25rem] border border-secondary"
										placeholder="Your Message"
										{...props.input}
									/>
								)}
							</Field>

							<VSubmitButton className="rounded-[1.25rem] px-[1.5rem]">
								Send
							</VSubmitButton>
						</form>
					)}
				</Form>
			</div>
		</div>
	);
}
