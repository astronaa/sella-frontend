'use client';

import { cn } from "~/shared/lib/cn";
import { StoreCard, StoreLink } from "~/entities/store";
import { Pagination } from "~/shared/ui/kit/pagination";
import { ITEMS_PER_PAGE } from "~/pages/marketplace/config";
import { storeQueries } from '~/entities/store';
import { Heading } from "~/shared/ui/kit/heading";
import { SearchBar } from "~/shared/ui/search-bar";
import { useFilters } from "~/pages/marketplace/model/filters";
import { useDebounce } from "~/shared/lib/use-debounce";
import { StoresInitialData } from "../api/stores";
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
		initialData,
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

				{/* categories live in the nav (strip + Categories button);
				    here we only reflect the applied filter */}
				{category && (
					<button
						onClick={() => setFilters(f => ({ ...f, tagNames: [] }))}
						className='flex items-center gap-[0.5rem] w-fit rounded-full bg-accent-100/[0.09] px-[0.875rem] py-[0.4375rem] text-[0.8125rem] text-accent-100 hover:bg-accent-100/[0.14] transition-colors'
					>
						{category}
						<svg viewBox="0 0 16 16" className="size-[0.625rem] fill-current">
							<path d="M8 6.6L12.6 2 14 3.4 9.4 8 14 12.6 12.6 14 8 9.4 3.4 14 2 12.6 6.6 8 2 3.4 3.4 2 8 6.6z" />
						</svg>
					</button>
				)}
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

