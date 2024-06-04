'use client';

import NextLink from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { StoreProp } from "./Prop";
import { cn } from "~/shared/lib/cn";
import { useStoreContextOrProp } from "./context";

type LinkProps = Omit<ComponentPropsWithoutRef<typeof NextLink>, 'href'> & Partial<StoreProp>;

export function Link({ store: s, className, ...props }: LinkProps) {
	const store = useStoreContextOrProp(s)

	return (
		<NextLink 
			href={`/stores/${store.shortName}`} {...props} 
			className={cn('transition [&:hover>*]:bg-white/[.02] max-w-[35rem]', className)}
		/>
	);
}