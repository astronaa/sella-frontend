'use client'

import NextLink from "next/link";
import { cn } from "~/shared/lib/cn";
import { usePathname } from "next/navigation";
import { HTMLAttributes, MouseEvent, useLayoutEffect, useRef } from "react";

const scrollOptions: ScrollIntoViewOptions = { behavior: 'smooth', block: 'nearest' }

const tabs = [
	{ id: '1', label: 'Social tasks', link: '/dashboard/quests/social-tasks' },
	{ id: '2', label: 'Milestones', link: '/dashboard/quests/test' },
	{ id: '3', label: 'Decentralized management', link: '/dashboard/quests/management' },
]

export function Links({ className }: HTMLAttributes<HTMLDivElement>) {
	const pathname = usePathname()
	const linksContainerRef = useRef<HTMLDivElement>(null);

	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		if(e.target instanceof Element) {
			e.target.scrollIntoView(scrollOptions)
		}
	}

	useLayoutEffect(() => {
		if(!linksContainerRef.current) return
		//@ts-expect-error TS2802: Type HTMLCollection can only be iterated through when using
		// the --downlevelIteration flag or with a --target of es2015 or higher.
		const children = [...linksContainerRef.current.children]
		const activeLink = children.find((el) => el.dataset.link === pathname)

		activeLink.scrollIntoView(scrollOptions)
	}, []);

	return (
		<div ref={linksContainerRef} className={cn('flex border-0 p-0 h-fit', className)}>
			{tabs.map((tab) => (
				<NextLink
					data-link={tab.link}
					onClick={handleClick}
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
