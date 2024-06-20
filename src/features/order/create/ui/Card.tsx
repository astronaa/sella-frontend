'use client';

import { HTMLAttributes } from "react";
import { ProductPrice, ProductProp } from "~/entities/product";
import { cn } from "~/shared/lib/cn";
import { MaybeRenderProp, transformRenderProps } from "~/shared/lib/render-props";
import { WithControllableProps, useControllableState } from "~/shared/lib/use-controllable-state";
import { RadioGroup } from "~/shared/ui/kit";
import { Button } from "~/shared/ui/kit/button";
import { Heading } from "~/shared/ui/kit/heading";

type ValueType = 'eth' | 'usdt' | 'usdc' | 'dai' | 'sella';

type BaseCardProps = WithControllableProps<
	ValueType, Omit<HTMLAttributes<HTMLDivElement>, 'children'>
> & {
	children?: MaybeRenderProp<ValueType>
} & ProductProp

export function BaseCard({
	product, className,
	onChange, value: v,
	defaultValue = 'eth',
	children, title = 'Pay for the order',
	...props
}: BaseCardProps) {
	const [value, setValue] = useControllableState({
		onChange, defaultValue, value: v
	});

	return (
		<div
			{...props}
			className={cn(
				'flex flex-col p-[1rem] gap-[1.25rem] rounded-[1.25rem] border border-secondary',
				className
			)}
		>
			<Heading size='xs'>{title}</Heading>

			<ProductPrice
				product={product}
				className='font-semibold text-[2.25rem]'
			/>

			<RadioGroup.Root
				value={value}
				// @ts-expect-error TODO: add zod contract for parsing the value
				onValueChange={change => setValue(change.value)}
			>
				<RadioItem value='eth' />
				<RadioItem value='usdt' />
				<RadioItem value='usdc' />
				<RadioItem value='dai' />
				<RadioItem value='sella' />
			</RadioGroup.Root>

			<div className='flex flex-col w-full gap-[0.75rem]'>
				<div className='flex gap-[1rem] text-[1.125rem] w-full justify-between text-accent-100'>
					<span>Transaction Fee 2%</span>
					{product.price && (
						<ProductPrice
							product={{
								...product,
								price: product.price * 0.02
							}}
						/>
					)}
				</div>
				<p className='text-black-40 mb-[0.5rem]'>
					Once you make a payment, the funds will be held in escrow
					until you confirm that the item or service has been.
				</p>
			</div>

			{transformRenderProps(children, value)}
		</div>
	);
}

function RadioItem(props: RadioGroup.ItemProps) {
	return (
		<RadioGroup.Item {...props}>
			<RadioGroup.ItemControl />
			<RadioGroup.ItemText>
				{`Pay with $${props.value.toUpperCase()}`}
			</RadioGroup.ItemText>
			<RadioGroup.ItemHiddenInput />
		</RadioGroup.Item>
	)
}

type CardProps = BaseCardProps & {
	onActionFulfilled?: () => void;
};

export function Card({ onActionFulfilled, ...props }: CardProps) {
	return (
		<BaseCard {...props}>
			{/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
			{value => (
				<Button
					size='xl'
					onClick={onActionFulfilled}
				>
					Pay Now
				</Button>
			)}
		</BaseCard>
	);
}