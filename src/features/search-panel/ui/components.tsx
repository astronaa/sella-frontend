'use client';

import { HTMLAttributes, PropsWithChildren, useMemo, useState } from "react";
import { SearchPanelConsumer, SearchPanelProvider, useSearchPanelStrictContext } from "../model/context";
import { SearchBar as BaseSearchBar } from "~/shared/ui/search-bar";
import { useDebounce } from "../../../shared/lib/use-debounce";
import { useControllableState } from "~/shared/lib/use-controllable-state";
import { cn } from "~/shared/lib/cn";
import { Heading } from "~/shared/ui/kit/heading";
import { productMock } from "~/shared/api/client"
import { ProductCard } from "~/entities/product";
import { storeMock } from "~/shared/api/client"
import { StoreCard } from "~/entities/store";
import { Input as BaseInput, InputProps } from "~/shared/ui/kit/input";
import { Scrollable } from "~/shared/ui/scrollable";

export function Root({ children }: PropsWithChildren) {
	const [open, setOpen] = useState(false);
	const [searchText, setSearchText] = useControllableState({
		defaultValue: '',
		onChange: v => {
			if (v.length)
				setOpen(true);
		}
	});

	const value = useMemo(() => ({
		searchText,
		setSearchText,
		open: open && searchText.length > 0,
		setOpen
	}), [searchText, setSearchText, open, setOpen])

	return (
		<SearchPanelProvider value={value}>
			{children}
		</SearchPanelProvider>
	);
}

export function Input(props: InputProps) {
	const { setSearchText, setOpen } = useSearchPanelStrictContext();
	const debouncedSetSearchText = useDebounce(setSearchText, 300);

	return (
		<BaseInput
			{...props}
			onClick={e => {
				setOpen(true);
				props?.onClick?.(e);
			}}
			onChange={event => {
				const value = event.target.value;
				value.length ? debouncedSetSearchText(value) : setSearchText(value);

				props?.onChange?.(event);
			}}
		/>
	);
}

export function SearchBarRoot(props: BaseSearchBar.RootProps) {
	const { setSearchText, setOpen } = useSearchPanelStrictContext();
	const debouncedSetSearchText = useDebounce(setSearchText, 300);

	return (
		<BaseSearchBar.Root
			{...props}
			onClick={e => {
				setOpen(true);
				props?.onClick?.(e);
			}}
			onChange={value => {
				value.length ? debouncedSetSearchText(value) : setSearchText(value);
				props?.onChange?.(value);
			}}
		/>
	);
}

export const SearchBarInput = BaseSearchBar.Input;

export function Content({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
			className={cn('flex flex-col gap-[3rem] w-full max-w-content mx-auto mb-[3rem]', className)}
		>
			<div className='flex flex-col gap-[1rem] w-full'>
				<div className='flex gap-[1rem] justify-between items-center w-full'>
					<Heading size='sm'>
						Products <span className='text-black-40'>20</span>
					</Heading>
					<a href='#' className='text-accent-100'>Show all results</a>
				</div>

				<Scrollable.Root
					scrollOptions={{ dragFree: false }}
				>
					<Scrollable.Container className='gap-[1rem] justify-between'>
						{Array(4).fill(productMock).map((p, index) => (
							<ProductCard.Composed
								key={index} product={p}
								className='flex-shrink-0'
							/>
						))}
					</Scrollable.Container>
				</Scrollable.Root>
			</div>

			<div className='flex flex-col gap-[1rem] w-full'>
				<div className='flex gap-[1rem] justify-between items-center w-full'>
					<Heading size='sm'>
						Stores <span className='text-black-40'>12</span>
					</Heading>
					<a href='#' className='text-accent-100'>Show all results</a>
				</div>

				<div className='flex w-full gap-[1rem] justify-between'>
					{Array(2).fill(storeMock).map((s, index) => (
						<StoreCard.Composed
							key={index} store={s}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export const ContextConsumer = SearchPanelConsumer