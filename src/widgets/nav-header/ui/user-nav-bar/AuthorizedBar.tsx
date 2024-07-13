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
				"max-lg:flex-col max-lg:pt-[1.5rem] max-lg:px-[1.25rem]",
				className
			)}
		>
			<div className="flex gap-[1rem] items-center">
				<SlotAuthorizedNavButtons.Renderer />
			</div>
		</div>
	);
}
