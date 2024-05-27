'use client';

import { HTMLArkProps, ark } from "@ark-ui/react";
import { useProductContext } from "./context";
import { Icons } from "~/shared/ui/icons";
import { cn } from "~/shared/lib/cn";
import { ProductProp } from "./Prop";
import { invariant } from "~/shared/lib/asserts";

const currencyMap = new Map([
	['usdt', Icons.CurrencyUsdt]
])

export function Price({ className, product: p, ...props }: HTMLArkProps<'div'> & Partial<ProductProp>) {
	const product = useProductContext() ?? p;
	invariant(!!product, 'Usage of products price outside context or without passed product prop');

	const Icon = currencyMap.get('usdt');

	return (
		<ark.div className={cn('flex items-center gap-[0.375rem] text-accent-100', className)} {...props}>
			<span>{product.price.toFixed(2)}</span>
			{Icon && <Icon className='size-[1rem]' />}
		</ark.div>
	);
}