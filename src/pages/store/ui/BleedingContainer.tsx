import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";

export function BleedingContainer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
			className={cn(
				'flex flex-col gap-[3rem] w-[calc(100%+1rem*2)] mx-[-1rem]',
				className
			)}
		/>
	);
}