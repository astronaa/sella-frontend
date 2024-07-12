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

export function Content(props: Scrollable.RootProps) {
	const { data: categories } = categoryQueries.useGetAll();
	const { category, setCategory, setOpen } = useCategoriesRouletteStrictContext();

	return (
		<Scrollable.Root {...props}>
			<Scrollable.Container className='gap-[1.5rem]'>
				{categories?.map(c => (
					<CategoryBox
						key={c.id}
						category={c} active={category?.id === c.id}
						onClick={() => {
							setCategory(category => category?.id == c.id ? null : c);
							setOpen(false);
						}}
					/>
				))}
			</Scrollable.Container>
		</Scrollable.Root>
	);
}

export const ContextConsumer = CategoriesRouletteConsumer