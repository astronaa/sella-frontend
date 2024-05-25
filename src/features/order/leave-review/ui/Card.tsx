import { HTMLAttributes } from "react";
import { Form } from "react-final-form";
import { z } from "zod";
import { OrderProp } from "~/entities/order";
import { cn } from "~/shared/lib/cn";
import { zodValidate } from "~/shared/lib/zod-final-form";
import { Icons } from "~/shared/ui/icons";
import { Button } from "~/shared/ui/kit/button";
import { Heading } from "~/shared/ui/kit/heading";
import { VTextAreaControl, VToggleGroup } from "~/shared/ui/validation-inputs";

type CardProps = HTMLAttributes<HTMLDivElement> & OrderProp & {
	onActionFulfilled?: (values: SchemaType) => void;
};

const schema = z.object({
	text: z.string().min(3, 'Min length is 3'),
	rating: z.array(
		z.enum(['positive', 'negative']),
		{ required_error: 'Rate the product' }
	).transform(v => v[0])
});

type SchemaType = z.infer<typeof schema>

export function Card({ className, onActionFulfilled, ...props }: CardProps) {
	const onSubmit = (values: SchemaType) => {
		onActionFulfilled?.(values);
	}

	return (
		<div {...props} className={cn('flex flex-col p-[1rem] gap-[1rem] rounded-[1.25rem] border border-secondary', className)}>
			<Heading size='xs'>Leave your review</Heading>

			<Form onSubmit={onSubmit} validate={zodValidate(schema)}>
				{({ handleSubmit }) => (
					<form
						onSubmit={handleSubmit}
						className='flex flex-col w-full gap-[1rem]'
					>
						<VToggleGroup.Root
							variant='unstyled' name='rating'
							className='flex-col'
						>
							<div className='flex gap-[1rem] w-full'>
								<VToggleGroup.Item value='positive' asChild>
									<Button
										variant='subtle' colorPalette='green'
										className='w-full'
									>
										<Icons.ThumbUp /> Positive
									</Button>
								</VToggleGroup.Item>
								<VToggleGroup.Item value='negative' asChild>
									<Button
										variant='subtle' colorPalette='red'
										className='w-full'
									>
										<Icons.ThumbDown />Negavite
									</Button>
								</VToggleGroup.Item>
							</div>

							<VToggleGroup.ErrorText />
						</VToggleGroup.Root>

						<VTextAreaControl.Root name='text'>
							<VTextAreaControl.Label>Your Review</VTextAreaControl.Label>
							<VTextAreaControl.Input placeholder='Keep it short and sweet' />
							<VTextAreaControl.ErrorText />
						</VTextAreaControl.Root>

						<Button size='xl'>
							Leave a review
						</Button>
					</form>
				)}
			</Form>
		</div>
	);
}