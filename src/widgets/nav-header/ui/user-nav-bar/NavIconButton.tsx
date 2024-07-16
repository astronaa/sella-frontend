'use client';

import Link from "next/link";
import { cn } from "~/shared/lib/cn";
import { IconButton, IconButtonProps } from "~/shared/ui/kit/button";
import { usePathnameMatcher } from "~/shared/ui/nav-link";

export function BaseNavIconButton({ className, ...props }: IconButtonProps) {
	return (
		<IconButton
			className={cn(
				'relative border-none flex-col gap-[0.25rem] text-[0.875rem] [&_svg]:size-[1.25rem] py-[0.25rem] px-[0.5rem] h-full', 
				className
			)}
			colorPalette='gray' variant='ghost' size='sm'
			{...props}
		/>
	);
}

interface NavIconButtonProps extends IconButtonProps {
	href: string;
	end?: boolean;
	activeOnHrefs?: string[];
}

export function NavIconButton({ href, end, activeOnHrefs, ...props }: NavIconButtonProps) {
	const isMatch = usePathnameMatcher();
	const active = isMatch({ href, end }) || !!activeOnHrefs?.some(isMatch);

	return (
		<Link href={href}>
			<BaseNavIconButton
				{...props}
				active={active} tabIndex={-1}
			/>
		</Link>
	);
}
