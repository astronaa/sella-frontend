'use client';

import Link from "next/link";
import { cn } from "~/shared/lib/cn";
import { IconButton, IconButtonProps } from "~/shared/ui/kit/button";
import { usePathnameMatcher } from "~/shared/ui/nav-link";

export function BaseNavIconButton({ className, ...props }: IconButtonProps) {
	return (
		<IconButton
			className={cn('text-accent-100', className)}
			colorPalette='gray' size='sm'
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
				className='h-full' {...props}
				active={active} tabIndex={-1}
			/>
		</Link>
	);
}
