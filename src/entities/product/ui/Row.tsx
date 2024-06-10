/* eslint-disable jsx-a11y/alt-text */

'use client';

import { HTMLArkProps, ark } from "@ark-ui/react";
import { ProductProp } from "./Prop";
import { useProductContextOrProp } from "./context";
import { cn } from "~/shared/lib/cn";
import { Image } from "./Image";

export function Row({ className, product: p, ...props }: HTMLArkProps<'div'> & Partial<ProductProp>) {
	const product = useProductContextOrProp(p);

	return (
		<ark.div className={cn('flex items-center gap-[0.5rem]', className)} {...props}>
			<Image
				product={product}
				className='size-[2rem] rounded-[0.75rem]'
			/>
			<span>
				{product.name}
			</span>
		</ark.div>
	);
}
