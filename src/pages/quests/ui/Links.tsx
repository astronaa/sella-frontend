'use client'

import NextLink from "next/link";
import { cn } from "~/shared/lib/cn";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

const tabs = [
	{ id: '1', label: 'Social tasks', link: '/dashboard/quests/social-tasks' },
	{ id: '2', label: 'Milestones', link: '/dashboard/quests/test' },
	{ id: '3', label: 'Decentralized management', link: '/dashboard/quests/management' },
]

export function Links({ className }: HTMLAttributes<HTMLDivElement>) {
	const pathname = usePathname()

	return (
		<div className={cn('flex border-0 p-0 h-fit', className)}>
			{tabs.map((tab) => (
				<NextLink
					href={tab.link}
					className={cn('px-4 py-2 rounded-[0.75rem] text-black-60 text-nowrap', {
						'text-white bg-white/[.06] rounded-[0.75rem]': tab.link === pathname
					})}
					key={tab.id}
				>
					{tab.label}
				</NextLink>
			))}
		</div>
	)
}
