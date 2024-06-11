'use client';

import NextLink from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "~/shared/lib/cn";
import { useProductContextOrProp } from "./context";
import { ProductProp } from "./Prop";

type LinkProps = Omit<ComponentPropsWithoutRef<typeof NextLink>, 'href'> & Partial<ProductProp>;

export const getPathname = (productId: string) => `/products/${productId}`

export function Link({ product: p, className, ...props }: LinkProps) {
	const product = useProductContextOrProp(p)

	return (
		<NextLink 
			href={getPathname(product.id)} {...props} 
			className={cn('transition hover:bg-white/[.02]', className)}
		/>
	);
}