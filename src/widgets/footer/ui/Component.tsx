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
				"p-[3rem] m-3 rounded-[1.5rem] mt-[5rem]",
				"border border-white/[0.05] bg-black-100",
				className
			)}
		>
			<div className="flex flex-col gap-[2.5rem] w-full max-w-content m-auto">
				<div className="flex items-start justify-between gap-[2rem] max-md:flex-col max-md:items-center">
					<div className="flex flex-col gap-[1rem] max-md:items-center">
						<Link href="/">
							<AppLogo />
						</Link>
						<p className="text-black-60 text-[0.9375rem] max-w-[18rem] max-md:text-center">
							The escrow-secured marketplace. Sell anything, get paid safely.
						</p>
					</div>

					<FooterItems />
				</div>

				<div className="flex items-center justify-between gap-[1rem] pt-[1.5rem] border-t border-white/[0.05] text-black-40 text-[0.8125rem] max-md:flex-col">
					<span>© {new Date().getFullYear()} Sella</span>
					<span className="flex items-center gap-[0.5rem]">
						<span className="size-[0.375rem] rounded-full bg-accent-100" />
						Escrow secured, on-chain
					</span>
				</div>
			</div>
		</div>
	);
}
