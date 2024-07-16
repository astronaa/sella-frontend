'use client';

import { HTMLArkProps, ark } from "@ark-ui/react";
import { RatingProp } from "./Prop";
import { RatingProvider, useRatingStrictContext } from "./context";
import { cn } from "~/shared/lib/cn";
import { PropsWithMaybeRenderProp, transformRenderProps } from "~/shared/lib/render-props";
import { Icons } from "~/shared/ui/icons";

export type RootProps = HTMLArkProps<'div'> & RatingProp;

export function Root({ rating, className, ...props }: RootProps) {
	return (
		<RatingProvider value={rating}>
			<ark.div
				className={cn("flex items-center gap-[0.75rem]", className)}
				{...props}
			/>
		</RatingProvider>
	);
}

type ReviewsCountProps = PropsWithMaybeRenderProp<
	HTMLArkProps<'span'>, number
>

export function ReviewsCount({ className, children, ...props }: ReviewsCountProps) {
	const { reviewsCount } = useRatingStrictContext();

	return (
		<ark.span
			{...props}
			className={cn("text-black-60 font-semibold", className)}
		>
			{children ? (
				transformRenderProps(children)
			) : (
				`${reviewsCount} Reviews`
			)}
		</ark.span>
	);
}

export function Thumbs({ className, ...props }: HTMLArkProps<'div'>) {
	return (
		<div
			{...props}
			className={cn("flex items-center gap-[0.75rem]", className)}
		/>
	)
}

export function Likes({ className, ...props }: HTMLArkProps<'div'>) {
	const { likes } = useRatingStrictContext();

	return (
		<div
			{...props}
			className={cn("flex gap-[0.25rem] text-green-100 items-center font-semibold", className)}
		>
			<Icons.Likes className="size-[1em]" />
			<span>{likes}</span>
		</div>
	);
}

export function Dislikes({ className, ...props }: HTMLArkProps<'div'>) {
	const { dislikes } = useRatingStrictContext();

	return (
		<div
			{...props}
			className={cn("flex gap-[0.25rem] text-red-100 items-center font-semibold", className)}
		>
			<Icons.Dislikes className="size-[1em]" />
			<span>{dislikes}</span>
		</div>
	);
}

export function Composition() {
	return (
		<>
			<ReviewsCount />
			<Thumbs>
				<Likes />
				<Dislikes />
			</Thumbs>
		</>
	);
}

export function Composed(props: RootProps) {
	return (
		<Root {...props}>
			<Composition />
		</Root>
	);
}