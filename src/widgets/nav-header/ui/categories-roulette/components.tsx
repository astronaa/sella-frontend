'use client';

import { PropsWithChildren, useMemo, useState } from "react";
import { CategoriesRouletteProvider, useCategoriesRouletteStrictContext } from "./contex";
import { Button as BaseButton, ButtonProps } from "~/shared/ui/kit/button";
import { cn } from "~/shared/lib/cn";
import { PreviewImage } from "~/shared/ui/image";
import { Icons } from "~/shared/ui/icons";
import { Scrollable } from "~/shared/ui/scrollable";

export function Root({ children }: PropsWithChildren) {
	const [open, setOpen] = useState(false);

	const value = useMemo(() => ({
		open, setOpen
	}), [open, setOpen])

	return (
		<CategoriesRouletteProvider value={value}>
			{children}
		</CategoriesRouletteProvider>
	);
}

export function Button({ className, ...props }: ButtonProps) {
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
			Categories
		</BaseButton>
	);
}

const mockCategories = [
	'Games', 'Accounts', 'Courses', 'Music', 'Phorography', 'Ebooks', 'Graphics', 'Sneakers', 'Magazines',
	'Phorography', 'Ebooks', 'Graphics', 'Sneakers', 'Magazines'
]

export function Content(props: Scrollable.RootProps) {
	return (
		<Scrollable.Root {...props}>
			<Scrollable.Container className='gap-[1.5rem]'>
				{mockCategories.map(c => (
					<div
						key={c}
						className={cn(
							'flex flex-col items-center justify-center gap-[0.625rem] size-[9.375rem] select-none',
							'rounded-[0.75rem] bg-white/[.04] flex-shrink-0 transition hover:bg-white/[.06]',
						)}
					>
						<PreviewImage
							src={null}
							className='size-[5rem] rounded-full bg-white/[.06] border-none'
							alt={`Category ${c} image`}
						/>

						<span>{c}</span>
					</div>
				))}
			</Scrollable.Container>
		</Scrollable.Root>
	);
}