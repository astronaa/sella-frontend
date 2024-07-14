'use client';

import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";
import { AppLogo } from "~/shared/ui/logo";
import Link from "next/link";
import { FooterItems } from "./FooterItems";
import { usePathname } from "next/navigation";
import { PAGES_TO_HIDE } from "../config/hide";

export function Component({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	const pathname = usePathname();

	if(pathname && PAGES_TO_HIDE.some(r => r.test(pathname)))
		return null;

	return (
		<div
			{...props}
			className={cn(
				"flex items-center justify-center gap-[1rem] p-[2.5rem] m-3 rounded-[1.25rem] mt-[7.5rem]",
				"border border-white/[.02]",
				className
			)}
		>
			<div className="flex flex-col items-center gap-[2rem]">
				<Link href="/">
					<AppLogo />
				</Link>

				<FooterItems />
			</div>
		</div>
	);
}
