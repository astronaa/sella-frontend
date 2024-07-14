"use client";

import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";
import { SlotAuthorizedNavButtons } from "../slots";

type Props = HTMLAttributes<HTMLDivElement>;

export function AuthorizedBar({ className, ...props }: Props) {
	return (
		<div
			{...props}
			className={cn(
				"flex gap-[0.75rem] items-center",
				"max-lg:flex-col",
				className
			)}
		>
			<div className="flex gap-[0.5rem] items-center">
				<SlotAuthorizedNavButtons.Renderer />
			</div>
		</div>
	);
}
