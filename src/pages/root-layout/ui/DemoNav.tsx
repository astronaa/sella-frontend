'use client';

import Link from "next/link";
import { Icons } from "~/shared/ui/icons";
import { IconButton } from "~/shared/ui/kit/button";
import { cn } from "~/shared/lib/cn";
import { demoChatsUnreadTotal } from "~/shared/static-data/demo-activity";

/**
 * Pre-launch nav icons for signed-out visitors: the real product
 * surface (Stores / Quests / Chats / Orders), every destination live
 * as a demo preview. Remove when auth goes live.
 */

function DemoIconButton({
	children,
	badge,
}: {
	children: React.ReactNode;
	badge?: number;
}) {
	return (
		<IconButton
			className={cn(
				'relative border-none flex-col gap-[0.25rem] text-[0.875rem] [&_svg]:size-[1.25rem] py-[0.25rem] px-[0.5rem] h-full',
			)}
			colorPalette='gray' variant='ghost' size='sm'
		>
			{children}
			{typeof badge === "number" && badge > 0 && (
				<span className="absolute top-0 right-[0.4375rem] min-w-[1rem] h-[1rem] rounded-full bg-red-100 text-white text-[0.6875rem] font-semibold flex items-center justify-center px-[0.25rem]">
					{badge}
				</span>
			)}
		</IconButton>
	);
}

export function DemoNav() {
	return (
		<div className="flex gap-[0.5rem] items-center max-lg:hidden">
			<Link href="/marketplace">
				<DemoIconButton>
					<Icons.Building /> Stores
				</DemoIconButton>
			</Link>

			<Link href="/quests">
				<DemoIconButton>
					<Icons.Coins /> Quests
				</DemoIconButton>
			</Link>

			<Link href="/chats">
				<DemoIconButton badge={demoChatsUnreadTotal}>
					<Icons.Chat /> Chats
				</DemoIconButton>
			</Link>

			<Link href="/orders">
				<DemoIconButton>
					<Icons.Package /> Orders
				</DemoIconButton>
			</Link>
		</div>
	);
}
