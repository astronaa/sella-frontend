/* eslint-disable jsx-a11y/alt-text */
'use client';

import { HTMLArkProps, ark } from "@ark-ui/react";
import { ProductProp } from "./Prop";
import { cn } from "~/shared/lib/cn";
import { ProductProvider, useProductStrictContext } from "../model/context";

import { Price } from './Price';
import { Image } from './Image';
import { ComponentProps } from "react";

export type RootProps = HTMLArkProps<'div'> & ProductProp;

export function Root({ product, className, ...props }: RootProps) {
	return (
		<ProductProvider value={product}>
			<ark.div
				{...props}
				className={cn(
					'flex flex-col gap-[1rem] items-start w-[16.25rem] max-w-[24.375rem] p-[0.5rem] pb-[1rem] overflow-hidden',
					'border border-secondary rounded-[1.25rem]',
					className
				)}
			/>
		</ProductProvider>
	);
}

export function Content({ className, ...props }: HTMLArkProps<'div'>) {
	return (
		<ark.div className={cn('flex flex-col gap-[1rem] px-[0.75rem] max-w-full', className)} {...props} />
	)
}

export function Title({ className, ...props }: HTMLArkProps<'h1'>) {
	const { name: title } = useProductStrictContext();

	return (
		<ark.h1
			{...props}
			className={cn('flex items-center gap-[0.5rem] font-semibold text-[1.125rem] font-manrope leading-[1.3] truncate', className)}
		>
			{title}
		</ark.h1>
	);
}

export function Description({ className, ...props }: HTMLArkProps<'p'>) {
	const { description } = useProductStrictContext();

	return (
		<ark.p className={cn('text-black-60 leading-[1.3] truncate max-w-full', className)} {...props}>
			{description}
		</ark.p>
	);
}

export function Category({ className, ...props }: HTMLArkProps<'p'>) {
	const { category } = useProductStrictContext();

	return (
		<ark.p className={cn('text-black-40 font-semibold leading-[1.3]', className)} {...props}>
			{category}
		</ark.p>
	);
}

export function Composition() {
	return (
		<>
			<Image />
			<Content>
				<Title />
				<Description />
				<Price />
			</Content>
		</>
	)
}

export function Composed(props: ComponentProps<typeof Root>) {
	return (
		<Root {...props}>
			<Composition />
		</Root>
	);
}

export { Image, Price };
export { Rating } from './Rating';