'use client';

import Link from "next/link";
import { ComponentProps } from "react";
import { IconButton } from "~/shared/ui/kit/button";
import { usePathnameMatcher } from "~/shared/ui/nav-link";

interface NavIconButtonProps extends ComponentProps<typeof IconButton> {
	href: string;
	end?: boolean;
	activeOnHrefs?: string[];
}

export function NavIconButton({ href, end, activeOnHrefs, ...props }: NavIconButtonProps) {
	const isMatch = usePathnameMatcher();
	const active = isMatch({ href, end }) || !!activeOnHrefs?.some(isMatch);

	return (
		<Link href={href}>
			<IconButton
				className='text-accent-100 h-full'
				colorPalette='gray' size='sm'
				{...props}
				active={active} 
			/>
		</Link>
	);
}
