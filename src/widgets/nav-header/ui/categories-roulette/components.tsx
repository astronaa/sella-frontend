'use client';

import {
	WithControllableProps,
	useControllableState
} from "~/shared/lib/use-controllable-state";

import {
	CategoriesRouletteConsumer,
	CategoriesRouletteProvider,
	useCategoriesRouletteStrictContext
} from "./contex";

import { PropsWithChildren, useMemo, useState } from "react";
import { Button as BaseButton, ButtonProps } from "~/shared/ui/kit/button";
import { cn } from "~/shared/lib/cn";
import { Icons } from "~/shared/ui/icons";
import { categoryIcon } from "~/shared/ui/category-icons";
import { Scrollable } from "~/shared/ui/scrollable";
import { CategoryBox, categoryQueries } from "~/entities/category";
import { Category } from "~/shared/api/client";

export type RootProps = WithControllableProps<Category | null, PropsWithChildren>

export function Root({ children, ...rest }: RootProps) {
	const [open, setOpen] = useState(false);
	const [category, setCategory] = useControllableState(rest);

	const value = useMemo(() => ({
		open, setOpen, category, setCategory
	}), [open, setOpen, category, setCategory])

	return (
		<CategoriesRouletteProvider value={value}>
			{children}
		</CategoriesRouletteProvider>
	);
}

export function Button({ className, children, ...props }: ButtonProps) {
	const { setOpen, open } = useCategoriesRouletteStrictContext();
	const active = open || !!props?.active

	return (
		<BaseButton
			colorPalette='gray' size='sm'
			{...props} active={active}
			className={cn('gap-[0.625rem]', className)}
			onClick={e => {
				setOpen(o => !o);
				props?.onClick?.(e);
			}}
		>
			<Icons.Menu
				className={cn('size-[1.25rem] flex-shrink-0 transition', !active && 'text-accent-100')}
			/>
			{children}
		</BaseButton>
	);
}

export interface ContentProps extends Scrollable.RootProps {
	itemsClassName?: string
}

/* Demo mode: aspirational categories shown after the live ones.
   They don't filter to anything yet, so hovering swaps the tile
   label for "coming soon" instead of selecting. Remove at launch. */
const comingSoonCategories = [
	"RWA & Tokenized Assets",
	"AI Agents",
	"DeFi & Yield",
	"NFTs & Collectibles",
	"Gaming & Metaverse",
	"DAO & Governance",
	"Security & Audits",
	"Nodes & Infra",
	"Trading Tools",
	"Domains & Identity",
	"Physical Goods",
	"Content & Media",
];

export function Content({ itemsClassName, ...props }: ContentProps) {
	const { data: categories } = categoryQueries.useGetAll();
	const { category, setCategory, setOpen } = useCategoriesRouletteStrictContext();

	return (
		<Scrollable.Root {...props}>
			<Scrollable.Container className='gap-[1.5rem]'>
				{categories?.map(c => (
					<CategoryBox
						key={c.id}
						category={c} active={category?.id === c.id}
						className={itemsClassName}
						onClick={() => {
							setCategory(category => category?.id == c.id ? null : c);
							setOpen(false);
						}}
					/>
				))}

				{comingSoonCategories.map(name => (
					<div
						key={name}
						className={cn(
							'group relative flex flex-col items-center justify-center gap-[0.625rem] size-[9.375rem] select-none p-[0.5rem]',
							'rounded-[0.75rem] bg-white/[.02] flex-shrink-0 text-center text-black-40 cursor-default',
							itemsClassName
						)}
					>
						<div className='flex flex-col items-center gap-[0.625rem] transition-opacity duration-200 group-hover:opacity-0'>
							<span className='flex items-center justify-center size-[5rem] p-[0.75rem]'>
								{categoryIcon(name)}
							</span>
							<span>{name}</span>
						</div>
						<span className='absolute inset-0 flex items-center justify-center text-accent-100 text-[0.875rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
							coming soon
						</span>
					</div>
				))}
			</Scrollable.Container>
		</Scrollable.Root>
	);
}

export const ContextConsumer = CategoriesRouletteConsumer