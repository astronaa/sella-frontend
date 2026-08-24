'use client';

import Link from "next/link";
import { useState } from "react";
import { Icons } from "~/shared/ui/icons";
import { IconButton } from "~/shared/ui/kit/button";
import { cn } from "~/shared/lib/cn";
import { LaunchSoonDialog } from "~/widgets/storefront-open/ui/LaunchSoonDialog";

/**
 * Pre-launch nav icons for signed-out visitors: shows the real product
 * surface (Stores / Quests / Chats / Orders) with Quests live and the
 * rest answering with the launch dialog. Remove when auth goes live.
 */

function DemoIconButton({
	children,
	onClick,
	badge,
}: {
	children: React.ReactNode;
	onClick?: () => void;
	badge?: number;
}) {
	return (
		<IconButton
			className={cn(
				'relative border-none flex-col gap-[0.25rem] text-[0.875rem] [&_svg]:size-[1.25rem] py-[0.25rem] px-[0.5rem] h-full',
			)}
			colorPalette='gray' variant='ghost' size='sm'
			onClick={onClick}
		>
			{children}
			{typeof badge === "number" && (
				<span className="absolute top-0 right-[0.4375rem] min-w-[1rem] h-[1rem] rounded-full bg-red-100 text-white text-[0.6875rem] font-semibold flex items-center justify-center px-[0.25rem]">
					{badge}
				</span>
			)}
		</IconButton>
	);
}

export function DemoNav() {
	const [launchOpen, setLaunchOpen] = useState(false);
	const comingSoon = () => setLaunchOpen(true);

	return (
		<div className="flex gap-[0.5rem] items-center max-lg:hidden">
			<DemoIconButton onClick={comingSoon}>
				<Icons.Building /> Stores
			</DemoIconButton>

			<Link href="/quests">
				<DemoIconButton>
					<Icons.Coins /> Quests
				</DemoIconButton>
			</Link>

			<DemoIconButton onClick={comingSoon} badge={7}>
				<Icons.Chat /> Chats
			</DemoIconButton>

			<DemoIconButton onClick={comingSoon}>
				<Icons.Package /> Orders
			</DemoIconButton>

			<LaunchSoonDialog
				open={launchOpen}
				onClose={() => setLaunchOpen(false)}
			/>
		</div>
	);
}
