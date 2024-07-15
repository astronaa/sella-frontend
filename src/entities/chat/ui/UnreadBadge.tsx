import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn"
import { useGetChatsInfo } from "../api/queries";

export interface UnreadBadgeProps extends HTMLAttributes<HTMLSpanElement> {
	count: number | undefined
}

export function UnreadBadge({ count, className, ...props }: UnreadBadgeProps) {
	const showBadge = count && count > 0;

	return (
		<span
			{...props}
			className={cn(
				"flex items-center justify-center text-[0.75em] min-w-[1.5rem] h-[1.5rem] px-[0.25rem]",
				"rounded-full bg-red-100 text-white font-inter",
				"transform transition-transform scale-0",
				showBadge && "scale-100",
				className
			)}
		>
			{showBadge ? count : null}
		</span>
	);
}

export function OverallUnreadBadge(props: Omit<UnreadBadgeProps, 'count'>) {
	const { data } = useGetChatsInfo();

	return (
		<UnreadBadge
			{...props}
			count={data?.unreadMessagesCount}
		/>
	)
}