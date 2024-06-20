'use client';

import { HTMLArkProps, ark } from "@ark-ui/react";
import { useProductContextOrProp } from "./context";
import { Icons } from "~/shared/ui/icons";
import { cn } from "~/shared/lib/cn";
import { ProductProp } from "./Prop";

const currencyMap = new Map([
	['usdt', Icons.CurrencyUsdt]
])

export function Price({ className, product: p, ...props }: HTMLArkProps<'div'> & Partial<ProductProp>) {
	const { price } = useProductContextOrProp(p);
	const Icon = currencyMap.get('usdt');

	if(price === undefined)
		return null;

	return (
		<ark.div className={cn('flex items-center gap-[0.375rem] text-accent-100', className)} {...props}>
			<span>{price.toFixed(2)}</span>
			{Icon && <Icon className='size-[1em] ps-[0.15em]' />}
		</ark.div>
	);
}