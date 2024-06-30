'use client';

import { cn } from "~/shared/lib/cn";
import { HTMLAttributes } from "react";
import { ProductPrice, ProductProp, ProductProvider } from "~/entities/product"
import { MaybeRenderProp, transformRenderProps } from "~/shared/lib/render-props";
import { WithControllableProps, useControllableState } from "~/shared/lib/use-controllable-state";
import { Icons } from "~/shared/ui/icons";
import { RadioGroup, Select } from "~/shared/ui/kit";
import { Button } from "~/shared/ui/kit/button";
import { Heading } from "~/shared/ui/kit/heading";
import { Skeleton } from "~/shared/ui/kit/skeleton";
import { ValueType, schema } from "../model/schema";
import { paymentMethodsQueries } from "~/entities/payment-methods";

export type BaseCardProps = WithControllableProps<
	ValueType, Omit<HTMLAttributes<HTMLDivElement>, 'children'>
> & {
	children?: MaybeRenderProp<ValueType>
} & ProductProp

export function BaseCard({
	product, className,
	onChange, value: v,
	defaultValue = { block: 'ETH', token: 'ETH' },
	children, title = 'Pay for the order',
	...props
}: BaseCardProps) {
	const { data } = paymentMethodsQueries.useGetForProduct(product.id);

	const [value, setValue] = useControllableState({
		onChange, defaultValue, value: v
	});

	const availableTokens = data?.find(g => g.value == value.block)?.tokens;

	return (
		<div
			{...props}
			className={cn(
				'flex flex-col p-[1rem] gap-[1.25rem] rounded-[1.25rem] border border-secondary',
				className
			)}
		>
			<ProductProvider value={product}>
				<Heading size='xs'>{title}</Heading>

				<ProductPrice
					className='font-semibold text-[2.25rem]'
				/>

				{!data ? (
					<Skeleton asChild loading>
						<Button className='w-full' />
					</Skeleton>
				) : (
					<Select.Root
						items={data}
						value={[value.block]}
						// @ts-expect-error broken CollectionItem types in park-ui
						itemToString={item => item.name}
						// @ts-expect-error broken CollectionItem types in park-ui
						itemToValue={item => item.value}
						onValueChange={change => {
							const newBlock = change.items[0] as typeof data[number];
							const tokenNames = newBlock.tokens.map(t => t.name);

							setValue(v => ({
								block: newBlock.value,
								token: tokenNames.find(n => n == v.token) ?? tokenNames[0]
							}));
						}}
					>
						<Select.Control>
							<Select.Trigger asChild>
								<Button className='w-full' colorPalette='gray'>
									<span>
										Blockchain – <Select.ValueText />
									</span>

									<Icons.ChevronDown />
								</Button>
							</Select.Trigger>
						</Select.Control>
						<Select.Positioner>
							<Select.Content>
								{data.map(g => (
									<Select.Item key={g.value} item={g} >
										<Select.ItemText>{g.name}</Select.ItemText>
									</Select.Item>
								))}
							</Select.Content>
						</Select.Positioner>
					</Select.Root>
				)}

				<Skeleton
					asChild
					loading={!data} className='min-h-[10rem]'
				>
					<RadioGroup.Root
						value={value.token}
						onValueChange={change => {
							setValue(v => schema.parse({ ...v, token: change.value }));
						}}
					>
						{availableTokens?.map(c => (
							<RadioGroup.Item key={c.name} value={c.name}>
								<RadioGroup.ItemControl />
								<RadioGroup.ItemText>
									{`Pay with $${c.name.toUpperCase()}`}
								</RadioGroup.ItemText>
								<RadioGroup.ItemHiddenInput />
							</RadioGroup.Item>
						))}
					</RadioGroup.Root>
				</Skeleton>

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
			</ProductProvider>
		</div>
	);
}