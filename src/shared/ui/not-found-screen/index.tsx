import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";

export function NotFoundScreen({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
			className={cn(
				'flex flex-col items-center justify-center w-full h-[38.5rem] border border-secondary rounded-[1rem]',
				'text-black-40 [&>svg]:size-[5rem] [&>svg]:stroke-[0.5]', className
			)}
		/>
	);
}