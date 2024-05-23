"use client";

import { HTMLArkProps, ark } from "@ark-ui/react";
import { ProductReviewProps } from "./Prop";
import { createContext, useContext } from "react";
import { ProductReview } from "~/shared/api/model";
import { cn } from "~/shared/lib/cn";
import { invariant } from "~/shared/lib/asserts";
import { PreviewImage, PreviewImageProps } from "~/shared/ui/image";
import { Icons } from "~/shared/ui/icons";

const context = createContext<ProductReview | null>(null);

function useComponentContext() {
	const value = useContext(context);
	invariant(value, "Usage useComponentContext outside context");

	return value;
}

export type RootProps = HTMLArkProps<"div"> & ProductReviewProps;

export function Root({ review, className, ...props }: RootProps) {
	return (
		<context.Provider value={review}>
			<ark.div
				{...props}
				className={cn(
					"flex flex-col px-4 py-6 gap-6 rounded-[20px] border border-white-04",
					className
				)}
			/>
		</context.Provider>
	);
}

export function Avatar({
	className,
	...props
}: Omit<PreviewImageProps, "src" | "alt">) {
	const { avatar: imageUrl, user: title } = useComponentContext();
	return (
		<PreviewImage
			alt={`Image of ${title}`}
			src={imageUrl!}
			{...props}
			className={cn("rounded-full flex-shrink-0 shadow-sm", className)}
		/>
	);
}

export function Reviewer() {
	const { user } = useComponentContext();
	return (
		<ark.div className="text-white-100 text-[18px]/[23.4px] font-semibold">
			{user}
		</ark.div>
	);
}

export function Quote() {
	const { quote } = useComponentContext();
	return (
		<ark.div className="text-black-74 text-[16px]/[20.8px] font-normal">
			{quote}
		</ark.div>
	);
}

export function Rate() {
	const { rate, date } = useComponentContext();
	return (
		<ark.div className="flex items-center gap-2">
			{rate === "like" ? (
				<ark.div className="size-[38px] rounded-xl flex items-center justify-center text-green-100 border border-green-100 bg-green-100/[.06]">
					<Icons.Likes className="size-[16px]" />
				</ark.div>
			) : rate === "dislike" ? (
				<ark.div className="size-[38px] rounded-xl flex items-center justify-center text-red-100 border border-red-100 bg-red-100/[.08]">
					<Icons.Dislikes className="size-[16px]" />
				</ark.div>
			) : null}
			<ark.div className="text-[16px]/[20.8px] font-normal text-black-60">
				{date}
			</ark.div>
		</ark.div>
	);
}
