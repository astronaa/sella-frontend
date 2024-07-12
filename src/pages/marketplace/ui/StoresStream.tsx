'use client';

import { cn } from "~/shared/lib/cn";
import { useState } from "react";
import { StoreCard, StoreLink } from "~/entities/store";
import { Pagination } from "~/shared/ui/kit/pagination";
import { PageChangeDetails } from "@zag-js/pagination";
import { ITEMS_PER_PAGE } from "~/pages/marketplace/config";
import { storeQueries } from '~/entities/store';
import { Store } from "~/shared/api/client"
import { Heading } from "~/shared/ui/kit/heading";
import { SearchBar } from "~/shared/ui/search-bar";
import { Scrollable } from "~/shared/ui/scrollable";
import { CategoryBox, categoryQueries } from "~/entities/category";
import {useFilters} from "~/pages/marketplace/model/filters";
import {useDebounce} from "~/shared/lib/use-debounce";

interface StoresStreamProps {
	initialData: { items: Store[]; total: number; };
}

export function StoresStream({ initialData }: StoresStreamProps) {
	const [page, setPage] = useState(1);
	const {filters, setFilters} = useFilters()
	const {debounceFn: setQuery} = useDebounce((query) => setFilters({...filters, query}), 300)
	const { data, isFetching } = storeQueries.useGetForExplore({
		query: {
			page,
			limit: ITEMS_PER_PAGE,
			...filters
		},
		initialData
	});

	const total = data.total;
	const handlePageChange = (details: PageChangeDetails) => setPage(details.page);

	return (
		<div className="flex flex-col gap-[2rem] max-w-content m-auto w-full max-xl:items-center">
			<div className='flex flex-col w-full gap-[1.5rem]'>
				<div className='flex items-center justify-between gap-[1rem] w-full max-md:flex-col'>
					<Heading size='sm'>
						Featured Stores
					</Heading>

					<SearchBar.Root defaultValue={filters.query} onChange={(value) => {
						if(value) {
							setQuery(value)
						}else {
							setFilters({...filters, query: value})
						}
					}}>
						<SearchBar.Input placeholder='Search stores' />
					</SearchBar.Root>
				</div>

				<CategoriesRoulette
					selectedCategory={filters.tagNames?.[0]}
					onSelect={(categoryName) => setFilters({...filters, tagNames: [categoryName]})}
				/>
			</div>

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
					page={page}
					onPageChange={handlePageChange}
					className='w-min'
					count={total}
					pageSize={ITEMS_PER_PAGE}
					siblingCount={1}
				/>
			)}
		</div>
	);
}

function CategoriesRoulette({onSelect, selectedCategory}: {
	onSelect: (categoryName: string) => void,
	selectedCategory: string | undefined
}) {
	const { data: categories } = categoryQueries.useGetAll();

	return (
		<div className='relative'>
			<Scrollable.Root className='mx-[-1rem] w-[calc(100%+1rem*2)]'>
				<Scrollable.Container className='gap-[1.5rem] relative px-[1rem]'>
					{categories?.map(category => (
						<CategoryBox
							key={category.id}
							category={category}
							active={selectedCategory === category.name}
							onClick={() => onSelect(category.name)}
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