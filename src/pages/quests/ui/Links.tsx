'use client'

import NextLink from "next/link";
import { cn } from "~/shared/lib/cn";
import { usePathname } from "next/navigation";

const tabs = [
	{ id: '1', label: 'Social tasks', link: '/dashboard/quests/social-tasks' },
	{ id: '2', label: 'Milestones', link: '/dashboard/quests/test' },
	{ id: '3', label: 'Decentralized management', link: '/dashboard/quests/management' },
]

export function Links() {
	const pathname = usePathname()

	return (
		<div className='border-0 p-0 h-fit'>
			{tabs.map((tab) => (
				<NextLink
					href={tab.link}
					className={cn('px-4 py-2 rounded-[0.75rem] text-black-60', {
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
