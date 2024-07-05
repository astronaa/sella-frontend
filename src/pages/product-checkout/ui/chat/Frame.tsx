'use client'

import { HTMLAttributes, UIEventHandler, useRef } from "react";
import { ProductProp } from "~/entities/product";
import { cn } from "~/shared/lib/cn";
import { Input } from "~/shared/ui/kit/input";
import { ChatMessagesStream } from "./MessagesStream";
import { PageProductCard } from "../PageProductCard";
import { useChatSocketForProduct } from "../../api/chat/socket";
import { Field, Form } from "react-final-form";
import { zodValidate } from "~/shared/lib/zod-final-form";
import { z } from "zod";
import { VSubmitButton } from "~/shared/ui/validation-inputs";
import { FormApi } from "final-form";

const schema = z.object({
	message: z.string().min(1)
});

type SchemaType = z.infer<typeof schema>;

const validator = zodValidate(schema);

export function ChatFrame({ product, className, ...props }: HTMLAttributes<HTMLDivElement> & ProductProp) {
	const autoscrollEnabledRef = useRef(true);
	const containerRef = useRef<HTMLDivElement>(null);

	const { sendMessage } = useChatSocketForProduct(product.id, {
		onNewMessage: () => {
			setTimeout(() => {
				const container = containerRef.current;
				if (!container || !autoscrollEnabledRef.current)
					return;

				container.scrollTo({
					behavior: 'smooth',
					top: container.scrollHeight
				})
			}, 100);
		}
	});

	const onMessagesStreamScroll: UIEventHandler<HTMLDivElement> = event => {
		const container = event.currentTarget;
		autoscrollEnabledRef.current = container.scrollTop > -300;
	}

	const onSubmit = (values: SchemaType, form: FormApi<SchemaType>) => {
		sendMessage(values.message);
		form.reset();
	}

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
				containerRef={containerRef}
				className='flex-grow overflow-y-auto pt-[1rem]'
				onScroll={onMessagesStreamScroll}
				style={{ scrollbarWidth: 'thin' }}
			/>

			<Form
				validate={validator}
				onSubmit={onSubmit}
				subscription={{}}
			>
				{({ handleSubmit }) => (
					<form className='flex gap-[1rem] w-full' onSubmit={handleSubmit}>
						<Field name='message'>
							{props => (
								<Input
									className='w-full min-h-full rounded-[1.25rem]'
									placeholder='Your Message'
									{...props.input}
								/>
							)}
						</Field>

						<VSubmitButton className='rounded-[1.25rem] px-[1.5rem]'>
							Send
						</VSubmitButton>
					</form>
				)}
			</Form>
		</div>
	);
}