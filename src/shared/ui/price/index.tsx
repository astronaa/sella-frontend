import { HTMLArkProps, ark } from "@ark-ui/react";
import { Icons } from "~/shared/ui/icons";
import { cn } from "~/shared/lib/cn";

const currencyMap = new Map([
	['usdt', Icons.CurrencyUsdt] as const
])

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type InferMapKey<T> = T extends Map<infer K, infer V> ? K : never;

export interface PriceProps extends HTMLArkProps<'div'> {
	price: number,
	currency?: InferMapKey<typeof currencyMap> 
}

export function Price({ className, price, currency = 'usdt', ...props }: PriceProps) {
	const Icon = currencyMap.get(currency);

	return (
		<ark.div className={cn('flex items-center gap-[0.25rem] text-accent-100', className)} {...props}>
			<span>{price.toFixed(2)}</span>
			{Icon && <Icon className='size-[1em] ps-[0.15em]' />}
		</ark.div>
	);
}