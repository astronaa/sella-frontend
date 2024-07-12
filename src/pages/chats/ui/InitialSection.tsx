import { ComponentProps } from "react";
import { cn } from "~/shared/lib/cn";
import { Icons } from "~/shared/ui/icons";
import { NotFoundScreen } from "~/shared/ui/not-found-screen";

export function InitialSection({ className, ...props }: ComponentProps<typeof NotFoundScreen>) {
	return (
		<NotFoundScreen 
			{...props} className={cn('bg-white/[.02]', className)}
		>
			<Icons.Chat />
			Select a chat to start messaging
		</NotFoundScreen>
	);
}