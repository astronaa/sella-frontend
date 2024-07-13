'use client';

import { HTMLAttributes, PropsWithChildren, useMemo, useState } from "react";
import { SearchPanelConsumer, SearchPanelProvider, useSearchPanelStrictContext } from "../model/context";
import { SearchBar as BaseSearchBar } from "~/shared/ui/search-bar";
import { useDebounce } from "../../../shared/lib/use-debounce";
import { useControllableState } from "~/shared/lib/use-controllable-state";
import { cn } from "~/shared/lib/cn";
import { Heading } from "~/shared/ui/kit/heading";
import { ProductCard, ProductLink, ProductProp, productQueries } from "~/entities/product";
import { Input as BaseInput, InputProps } from "~/shared/ui/kit/input";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Category, productMock } from "~/shared/api/client";
import { Skeleton } from "~/shared/ui/kit/skeleton";
import { Button } from "~/shared/ui/kit/button";
import { useTwBreakpoint } from "~/shared/lib/responsive";
import { Scrollable } from "~/shared/ui/scrollable";
import { objToSearchParams } from "~/shared/lib/search-params";
import Link from "next/link";

export function Root({ children }: PropsWithChildren) {
	const [open, setOpen] = useState(false);
	const [category, setCategory] = useState<Category | null>(null);
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
		setOpen,
		category,
		setCategory
	}), [searchText, setSearchText, open, setOpen, category, setCategory])

	return (
		<SearchPanelProvider value={value}>
			{children}
		</SearchPanelProvider>
	);
}

export function Input(props: InputProps) {
	const { setSearchText, setOpen } = useSearchPanelStrictContext();
	const { debounceFn } = useDebounce(setSearchText, 300);

	return (
		<BaseInput
			{...props}
			onClick={e => {
				setOpen(true);
				props?.onClick?.(e);
			}}
			onChange={event => {
				const value = event.target.value;
				value.length ? debounceFn(value) : setSearchText(value);

				props?.onChange?.(event);
			}}
		/>
	);
}

export function SearchBarRoot(props: BaseSearchBar.RootProps) {
	const { setSearchText, setOpen } = useSearchPanelStrictContext();
	const { debounceFn } = useDebounce(setSearchText, 300);

	return (
		<BaseSearchBar.Root
			{...props}
			onClick={e => {
				setOpen(true);
				props?.onClick?.(e);
			}}
			onChange={value => {
				value.length ? debounceFn(value) : setSearchText(value);
				props?.onChange?.(value);
			}}
		/>
	);
}

export const SearchBarInput = BaseSearchBar.Input;

export function Content({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const isMobile = !useTwBreakpoint('md');
	const { searchText, open, category } = useSearchPanelStrictContext();
	const resultsToShow = isMobile ? 2 : 4;

	const { data: products, isLoading } = useQuery({
		...productQueries.getSearchOptions({
			page: 1, limit: 12,
			sort: 'rating',
			query: searchText,
			tagNames: category ? [category.name] : undefined
		}),
		enabled: open,
		placeholderData: keepPreviousData
	})

	const items = products?.items.slice(0, resultsToShow);
	const total = products?.total;
	const showMore = !!total && total > 2;
	const showMoreSearchParams = objToSearchParams({ 
		query: searchText, 
		tagNames: category 
	});
	const showMoreHref = `/products/search?${showMoreSearchParams}`;

	return (
		<div
			{...props}
			className={cn('flex flex-col gap-[3rem] w-full max-w-content mx-auto mb-[3rem]', className)}
		>
			<div className='flex flex-col gap-[1rem] w-full'>
				<div className='flex gap-[1rem] justify-between items-center w-full'>
					<Heading size='sm' className='max-md:text-[1.25rem]'>
						Products {total !== undefined && (
							<span className='text-black-40'>{total}</span>
						)}
					</Heading>
				</div>

				{items && items.length == 0 && (
					<div className='flex flex-col items-center gap-[0.75rem]'>
						<Heading size='sm' className='text-[1.5rem] text-black-60'>
							No results for “{searchText}” {category ? `in ${category.name}` : null}
						</Heading>
					</div>
				)}

				{isMobile ? (
					<>
						{isLoading && Array(resultsToShow).fill(productMock).map((p, index) => (
							<Skeleton
								key={index}
								loading asChild
							>
								<MobileProductCard
									product={p}
								/>
							</Skeleton>
						))}

						{items?.map((p, index) => (
							<MobileProductCard
								key={index} product={p}
							/>
						))}

					</>
				) : (
					<Scrollable.Root
						scrollOptions={{ dragFree: false }}
					>
						<Scrollable.Container className='gap-[2.4rem]'>
							{isLoading && Array(resultsToShow).fill(productMock).map((p, index) => (
								<Skeleton
									key={index}
									loading asChild
								>
									<ProductCard.Composed
										product={p}
										className='flex-shrink-0' 
									/>
								</Skeleton>
							))}

							{items?.map((p, index) => (
								<ProductCard.Root
									key={index} product={p}
									className='flex-shrink-0' asChild
								>
									<ProductLink>
										<ProductCard.Composition />
									</ProductLink>
								</ProductCard.Root>
							))}
						</Scrollable.Container>
					</Scrollable.Root>
				)}

				{showMore && (
					<Button 
						asChild
						colorPalette='gray' size='xl'
					>
						<Link href={showMoreHref}>
							Show More Results
						</Link>
					</Button>
				)}
			</div>

			{/* <div className='flex flex-col gap-[1rem] w-full'>
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
			</div> */}
		</div>
	);
}

function MobileProductCard({ product }: ProductProp) {
	return (
		<ProductCard.Root
			product={product} asChild
			className='flex-row flex-shrink-0 max-w-full w-full p-[0.75rem] pb-[0.75rem] items-center'
		>
			<ProductLink product={product}>
				<ProductCard.Image className='size-[6.25rem]' />
				<ProductCard.Content className='gap-[0.5rem] px-0 max-w-full'>
					<ProductCard.Title />
					<ProductCard.Description
						className='whitespace-normal line-clamp-2'
					/>
					<ProductCard.Price />
				</ProductCard.Content>
			</ProductLink>
		</ProductCard.Root>
	);
}

export const ContextConsumer = SearchPanelConsumer