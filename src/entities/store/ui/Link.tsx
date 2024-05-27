'use client';

import NextLink from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { StoreProp } from "./Prop";
import { useProductContext } from "~/entities/product/ui/context";
import { invariant } from "~/shared/lib/asserts";
import { cn } from "~/shared/lib/cn";

type LinkProps = Omit<ComponentPropsWithoutRef<typeof NextLink>, 'href'> & Partial<StoreProp>;

export function Link({ store: s, className, ...props }: LinkProps) {
	const store = useProductContext() ?? s;
	invariant(!!store, 'Usage of store link outside context or without passed store prop');

	return (
		<NextLink 
			href={`/stores/${store.id}`} 
			{...props} 
			className={cn('transition [&:hover>*]:bg-white/[.02]', className)}
		/>
	);
}