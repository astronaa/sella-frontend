"use client";

import { cn } from "~/shared/lib/cn";
import { UserNavBar } from "../user-nav-bar";
import { NavLink } from "~/shared/ui/nav-link";
import { categoryQueries } from "~/entities/category";
import { Icons } from "~/shared/ui/icons";

export function PhoneNavbarContent() {
	const { data: categories } = categoryQueries.useGetAll();

	return (
		<div
			className={cn(
				"backdrop-blur-[3rem] bg-black-06/50 flex flex-col p-4 justify-between h-screen pt-[6rem] pb-[2rem] w-full",
				"fixed top-0 z-mobile-menu h-screen",
				"lg:hidden"
			)}
		>
			<div
				className='flex flex-col w-full gap-[1rem] px-[1.25rem] max-h-full overflow-y-auto'
			>
				{categories?.map(c => (
					<NavLink
						key={c.id}
						href={`/marketplace/?tagNames=${encodeURIComponent(c.name)}`}
						className='whitespace-nowrap text-black-60 text-[1.125rem] flex justify-between gap-[1rem]'
					>
						{c.name} <Icons.ChevronRight className='size-[1.25rem]' />
					</NavLink>
				))}
			</div>

			<UserNavBar className="flex-col-reverse [&_button]:w-full" />
		</div>
	);
}