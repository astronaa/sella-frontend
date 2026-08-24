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

import { PropsWithChildren, ReactNode, useMemo, useState } from "react";
import { Button as BaseButton, ButtonProps } from "~/shared/ui/kit/button";
import { cn } from "~/shared/lib/cn";
import { Icons } from "~/shared/ui/icons";
import { categoryIcon } from "~/shared/ui/category-icons";
import { PreviewImage } from "~/shared/ui/image";
import { Scrollable } from "~/shared/ui/scrollable";
import { categoryQueries } from "~/entities/category";
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

/* Demo mode: aspirational categories shown after the catalog ones. */
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

function ComingSoonTile({ name, visual, className }: { name: string, visual: ReactNode, className?: string }) {
	return (
		<div
			className={cn(
				'group relative flex flex-col items-center justify-center gap-[0.625rem] size-[9.375rem] select-none p-[0.5rem]',
				'rounded-[0.75rem] bg-white/[.02] flex-shrink-0 text-center text-black-40 cursor-default',
				className
			)}
		>
			<div className='flex flex-col items-center gap-[0.625rem] transition-opacity duration-200 group-hover:opacity-0'>
				{visual}
				<span>{name}</span>
			</div>
			<span className='absolute inset-0 flex items-center justify-center text-accent-100 text-[0.875rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
				coming soon
			</span>
		</div>
	);
}

export function Content({ itemsClassName, ...props }: ContentProps) {
	const { data: categories } = categoryQueries.useGetAll();

	return (
		<Scrollable.Root {...props}>
			<Scrollable.Container className='gap-[1.5rem]'>
				{/* Demo mode: EVERY category is a preview — hovering any tile
				    shows "coming soon" and nothing filters. Restore at launch:
				    render CategoryBox with the setCategory/setOpen onClick from
				    useCategoriesRouletteStrictContext for the catalog ones. */}
				{categories?.map(c => (
					<ComingSoonTile
						key={c.id}
						name={c.name}
						className={itemsClassName}
						visual={
							<PreviewImage
								src={c.image}
								className='size-[5rem] border-none bg-transparent'
								alt={`Category ${c.name} image`}
								width={300} height={300}
								priority={true}
							/>
						}
					/>
				))}

				{comingSoonCategories.map(name => (
					<ComingSoonTile
						key={name}
						name={name}
						className={itemsClassName}
						visual={
							<span className='flex items-center justify-center size-[5rem] p-[0.75rem]'>
								{categoryIcon(name)}
							</span>
						}
					/>
				))}
			</Scrollable.Container>
		</Scrollable.Root>
	);
}

export const ContextConsumer = CategoriesRouletteConsumer