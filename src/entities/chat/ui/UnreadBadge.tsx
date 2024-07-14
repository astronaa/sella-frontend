import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn"

export interface UnreadBadgeProps extends HTMLAttributes<HTMLSpanElement> {
	count: number
}

export function UnreadBadge({ count, className, ...props }: UnreadBadgeProps) {
	return (
		<span
			{...props}
			className={cn(
				"flex items-center justify-center text-[0.75em] min-w-[1.5rem] h-[1.5rem] px-[0.25rem]",
				"rounded-full bg-red-100 text-white font-inter",
				"transform transition-transform scale-0",
				count > 0 && "scale-100",
				className
			)}
		>
			{count > 0 ? count : null}
		</span>
	);
}

export function OverallUnreadBadge(props: Omit<UnreadBadgeProps, 'count'>) {
	return <UnreadBadge {...props} count={3} />
}