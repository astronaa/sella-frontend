'use client';

import { cn } from "~/shared/lib/cn";
import { StoreCard, StoreLink } from "~/entities/store";
import { Pagination } from "~/shared/ui/kit/pagination";
import { ITEMS_PER_PAGE } from "~/pages/marketplace/config";
import { storeQueries } from '~/entities/store';
import { Heading } from "~/shared/ui/kit/heading";
import { SearchBar } from "~/shared/ui/search-bar";
import { Scrollable } from "~/shared/ui/scrollable";
import { CategoryBox, categoryQueries } from "~/entities/category";
import { useFilters } from "~/pages/marketplace/model/filters";
import { useDebounce } from "~/shared/lib/use-debounce";
import type { StoresInitialData } from "../api/stores";
import { WithControllableProps, useControllableState } from "~/shared/lib/use-controllable-state";
import { useSearchParamsPagination } from "~/shared/lib/search-params";
import { useQuery } from "@tanstack/react-query";
import { NotFoundScreen } from "~/shared/ui/not-found-screen";
import { Icons } from "~/shared/ui/icons";

interface StoresStreamProps {
	initialData: StoresInitialData;
}

export function StoresStream({ initialData }: StoresStreamProps) {
	const { filters, setFilters } = useFilters()
	const { page, onPageChange } = useSearchParamsPagination(1);
	const { debounceFn: setQuery } = useDebounce(query => {
		setFilters(f => ({ ...f, query }))
	}, 300)

	const { data, isFetching } = useQuery({
		...storeQueries.getAllOptions({
			page, limit: ITEMS_PER_PAGE,
			...filters
		}),
		initialData: initialData as never,
		initialDataUpdatedAt: 0
	})

	const total = data.total;
	const category = filters.tagNames?.[0] ?? null;

	return (
		<div className="flex flex-col gap-[2rem] max-w-content m-auto w-full max-xl:items-center">
			<div className='flex flex-col w-full gap-[1.5rem]'>
				<div className='flex items-center justify-between gap-[1rem] w-full max-md:flex-col'>
					<Heading size='sm'>
						Featured Stores
					</Heading>

					<SearchBar.Root
						defaultValue={filters.query}
						onChange={(value) => {
							if (value) {
								setQuery(value)
							} else {
								setFilters({ ...filters, query: value })
							}
						}}
					>
						<SearchBar.Input placeholder='Search stores' />
					</SearchBar.Root>
				</div>

				<CategoriesRoulette
					value={category}
					onChange={category => setFilters(f => ({ ...f, tagNames: category ? [category] : [] }))}
				/>
			</div>

			{data && data.items.length === 0 && (
				<NotFoundScreen>
					<Icons.Building />
					{'No stores found by the query'}
				</NotFoundScreen>
			)}

			<div
				className={cn(
					"grid grid-cols-2 gap-10 max-w-content max-md:grid-cols-1 w-full transition-opacity duration-300",
					isFetching && 'opacity-50'
				)}
			>
				{data.items.map((store) => (
					<StoreCard.Root
						asChild key={store.id} store={store}
						className='rounded-[1.25rem] w-full mx-auto'
					>
						<StoreLink>
							<StoreCard.Composition />
						</StoreLink>
					</StoreCard.Root>
				))}
			</div>

			{total > ITEMS_PER_PAGE && (
				<Pagination
					defaultPage={page}
					onPageChange={onPageChange}
					className='w-min'
					count={total}
					pageSize={ITEMS_PER_PAGE}
					siblingCount={1}
				/>
			)}
		</div>
	);
}

type CategoriesRouletteProps = WithControllableProps<string | null, object>

function CategoriesRoulette(props: CategoriesRouletteProps) {
	const [category, setCategory] = useControllableState(props);
	const { data: categories } = categoryQueries.useGetAll();

	return (
		<div className='relative'>
			<Scrollable.Root className='mx-[-1rem] w-[calc(100%+1rem*2)]'>
				<Scrollable.Container className='gap-[1.5rem] relative px-[1rem]'>
					{categories?.map(c => (
						<CategoryBox
							key={c.id} category={c}
							active={c.name === category}
							onClick={() => {
								setCategory(category => c.name != category ? c.name : null)
							}}
						/>
					))}
				</Scrollable.Container>
			</Scrollable.Root>
			<div
				className='absolute right-[-1rem] top-0 bottom-0 w-[2rem] 
				bg-gradient-to-r from-transparent to-black-06 to-90% pointer-events-none'
			/>
			<div
				className='absolute left-[-1rem] top-0 bottom-0 w-[2rem] 
				bg-gradient-to-l from-transparent to-black-06 to-90% pointer-events-none'
			/>
		</div>
	);
}
