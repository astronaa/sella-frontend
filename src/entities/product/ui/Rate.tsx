"use client";

import { HTMLArkProps, ark } from "@ark-ui/react";
import { ProductRateProps } from "./Prop";
import { createContext, useContext } from "react";
import { ProductRate } from "~/shared/api/model";
import { cn } from "~/shared/lib/cn";
import { invariant } from "~/shared/lib/asserts";
import { Icons } from "~/shared/ui/icons";

const context = createContext<ProductRate | null>(null);

function useComponentContext() {
	const value = useContext(context);
	invariant(value, "Usage useComponentContext outside context");

	return value;
}

export type RootProps = HTMLArkProps<"div"> & ProductRateProps;

export function Root({ rates, className, ...props }: RootProps) {
	return (
		<context.Provider value={rates}>
			<ark.div
				{...props}
				className={cn("flex items-center gap-3", className)}
			/>
		</context.Provider>
	);
}

export function Total() {
	const { total } = useComponentContext();
	return (
		<div className="text-[16px]/[20.8px] font-semibold text-black-60">
			{total} Total
		</div>
	);
}

export function Likes() {
	const { likes } = useComponentContext();
	return (
		<div className="flex gap-[0.2rem] text-green-100 items-center font-semibold">
			<Icons.Likes className="size-[1rem]" /> <span>{likes}</span>
		</div>
	);
}

export function DisLikes() {
	const { dislikes } = useComponentContext();
	return (
		<div className="flex items-center gap-[0.4rem] text-red-100 font-semibold">
			<Icons.Dislikes className="size-[1rem]" /> <span>{dislikes}</span>
		</div>
	);
}
