import { useQuery } from "@tanstack/react-query";
import { HTMLAttributes, useMemo } from "react";
import { Form } from "react-final-form";
import { z } from "zod";
import { ordersQueries } from "~/entities/order";
import { reviewQueries } from "~/entities/reviews";
import { OrderId, apiClient } from "~/shared/api/client";
import { cn } from "~/shared/lib/cn";
import { zodValidate } from "~/shared/lib/zod-final-form";
import { Icons } from "~/shared/ui/icons";
import { Button } from "~/shared/ui/kit/button";
import { Heading } from "~/shared/ui/kit/heading";
import { Skeleton } from "~/shared/ui/kit/skeleton";
import { VSubmitButton, VTextAreaControl, VToggleGroup } from "~/shared/ui/validation-inputs";

type CardProps = HTMLAttributes<HTMLDivElement> & {
	orderId: OrderId
	onActionFulfilled?: (values: SchemaType) => void;
};

const schema = apiClient.orders.schemaCreateReview

type SchemaType = z.infer<typeof schema>

const validate = zodValidate(schema);

export function Card({ className, onActionFulfilled, orderId, ...props }: CardProps) {
	const { data: review, isLoading } = useQuery({
		...ordersQueries.getReviewOptions(orderId),
		staleTime: Infinity,
		retry: false,
		refetchOnWindowFocus: false
	})

	const onSubmit = async (values: SchemaType) => {
		const { error } = await apiClient.orders.for(orderId).createReview(values);
		reviewQueries.invalidateAll();
		if (!error)
			onActionFulfilled?.(values);
	}

	const initialValues = useMemo(() => ({
		content: review?.content,
		rating: review?.rating
	}), [review?.content, review?.rating])

	const disabled = !!review;

	return (
		<Skeleton
			{...props}
			loading={isLoading}
			className={cn('flex flex-col p-[1rem] gap-[1rem] rounded-[1.25rem] border border-secondary', className)}
		>
			<Heading size='xs'>
				{disabled ? `Your review` : `Leave your review`}
			</Heading>

			<Form
				initialValues={initialValues}
				onSubmit={onSubmit} validate={validate}
			>
				{({ handleSubmit }) => (
					<form
						onSubmit={handleSubmit}
						className='flex flex-col w-full gap-[1rem]'
					>
						<VToggleGroup.Root
							disabled={disabled}
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
										<Icons.ThumbDown /> Negavite
									</Button>
								</VToggleGroup.Item>
							</div>

							<VToggleGroup.ErrorText />
						</VToggleGroup.Root>

						<VTextAreaControl.Root name='content'>
							<VTextAreaControl.Label>Your Review</VTextAreaControl.Label>
							<VTextAreaControl.Input
								className='min-h-[6rem]'
								placeholder='Keep it short and sweet'
								disabled={disabled}
							/>
							<VTextAreaControl.ErrorText />
						</VTextAreaControl.Root>

						{!disabled && (
							<VSubmitButton size='xl'>
								Leave a review
							</VSubmitButton>
						)}
					</form>
				)}
			</Form>
		</Skeleton>
	);
}