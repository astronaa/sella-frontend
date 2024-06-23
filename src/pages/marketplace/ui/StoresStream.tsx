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
import { PreviewImage } from "~/shared/ui/image";
import { Scrollable } from "~/shared/ui/scrollable";

interface StoresStreamProps {
	initialData: { items: Store[]; total: number; };
}

const mockCategories = [
	'Games', 'Accounts', 'Courses', 'Music', 'Phorography', 'Ebooks', 'Graphics', 'Sneakers', 'Magazines'
]

export function StoresStream({ initialData }: StoresStreamProps) {
	const [page, setPage] = useState(1);

	const { data, isFetching } = storeQueries.useGetForExplore({
		page,
		limit: ITEMS_PER_PAGE,
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

					<SearchBar.Root>
						<SearchBar.Input placeholder='Search stores' />
					</SearchBar.Root>
				</div>

				<div className='relative'>
					<Scrollable.Root className='mx-[-1rem] w-[calc(100%+1rem*2)]'>
						<Scrollable.Container className='gap-[1.5rem] relative px-[1rem]'>
							{mockCategories.map(c => (
								<div
									key={c}
									className='flex flex-col items-center justify-center gap-[0.625rem] size-[9.375rem] select-none 
										rounded-[0.75rem] bg-white/[.04] flex-shrink-0 transition hover:bg-white/[.06]'
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
					<div
						className='absolute right-[-1rem] top-0 bottom-0 w-[2rem] 
							bg-gradient-to-r from-transparent to-black-06 to-90% pointer-events-none'
					/>
					<div
						className='absolute left-[-1rem] top-0 bottom-0 w-[2rem] 
							bg-gradient-to-l from-transparent to-black-06 to-90% pointer-events-none'
					/>
				</div>
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
