import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";
import { Heading, HeadingProps } from "~/shared/ui/kit/heading";

export type RootProps = HTMLAttributes<HTMLDivElement>

export function Root({ className, ...props }: RootProps) {
	return (
		<div
			{...props}
			className={cn('flex flex-col p-[1rem] gap-[1rem] rounded-[1.25rem] border border-secondary', className)}
		/>
	);
}

export function Title(props: HeadingProps) {
	return (
		<Heading size='xs' {...props} />
	);
}

export function Wafer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
			className={cn('p-[1rem] rounded-[0.75rem] bg-white/[.06] text-black-60 border border-secondary', className)}
		/>
	);
}

export function WaferHeading({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
			className={cn('flex justify-between w-full text-accent-100 mb-[0.75rem] gap-[1rem] text-[1.125rem]', className)}
		>
			{children}
		</div>
	);
}

export const WaferContent = 'p'