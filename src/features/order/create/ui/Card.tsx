import { HTMLAttributes } from "react";
import { ProductPrice, ProductProp } from "~/entities/product";
import { cn } from "~/shared/lib/cn";
import { RadioGroup } from "~/shared/ui/kit";
import { Button } from "~/shared/ui/kit/button";
import { Heading } from "~/shared/ui/kit/heading";

type ComponentProps = HTMLAttributes<HTMLDivElement> & ProductProp;

export function Component({ product, className, ...props }: ComponentProps) {

	return (
		<div {...props} className={cn('flex flex-col p-[1rem] gap-[1rem] rounded-[1.25rem] border border-secondary', className)}>
			<Heading size='xs'>Pay for the order</Heading>

			<div className='p-[1rem] rounded-[0.75rem] bg-white/[.06] text-black-60 border border-secondary'>
				Once you make a payment, the funds will be held in escrow until you
				confirm that the item or service has been provided by the seller
				as described.
			</div>

			<RadioGroup.Root defaultValue='sella'>
				<RadioGroup.Item value='sella' >
					<RadioGroup.ItemControl />
					<RadioGroup.ItemText>Pay with $SELLA</RadioGroup.ItemText>
					<RadioGroup.ItemAddon>
						<ProductPrice product={product} />
					</RadioGroup.ItemAddon>
				</RadioGroup.Item>
				<RadioGroup.Item value='usdt'>
					<RadioGroup.ItemControl />
					<RadioGroup.ItemText>Pay with $USDT</RadioGroup.ItemText>
					<RadioGroup.ItemAddon>
						<ProductPrice product={product} />
					</RadioGroup.ItemAddon>
				</RadioGroup.Item>
			</RadioGroup.Root>

			<Button className='w-full' size='xl'>
				Pay Now
			</Button>
		</div>
	);
}