'use client';

import NextLink from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { StoreProp } from "./Prop";
import { cn } from "~/shared/lib/cn";
import { useStoreContextOrProp } from "./context";

type LinkProps = Omit<ComponentPropsWithoutRef<typeof NextLink>, 'href'> & Partial<StoreProp>;

export const getPathname = (storeUrl: string) => `/${storeUrl}`

export function Link({ store: s, className, ...props }: LinkProps) {
	const store = useStoreContextOrProp(s)

	return (
		<NextLink 
			href={getPathname(store.url)} {...props}
			className={cn('transition hover:bg-white/[.02]', className)}
		/>
	);
}