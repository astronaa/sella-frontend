'use client';

import { cn } from "~/shared/lib/cn";
import { HTMLAttributes } from "react";
import { SlotUnauthorizedButtons } from "../slots";

export function UnauthorizedBar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div {...props} className={cn('flex items-center gap-[1rem]', className)}>
			<SlotUnauthorizedButtons.Renderer />
		</div>
	);
}
