'use client'

import { cn } from "~/shared/lib/cn";
import { Carousel } from "~/pages/marketplace/ui/Carousel";
import { HTMLAttributes, useCallback, useState } from "react";
import { Store } from "~/shared/api/model";
import { StoreCard, StoreLink } from "~/entities/store";
import { Pagination } from "~/shared/ui/kit/pagination";
import { resolvedTwConfig } from "~/shared/lib/resolved-tw-config";
import { Heading } from "~/shared/ui/kit/heading";
import { PageChangeDetails } from "@zag-js/pagination";
import { ITEMS_PER_PAGE } from "~/pages/marketplace/config";
import { storeQueries } from '~/entities/store'

type ExploreMarketplaceProps = HTMLAttributes<HTMLDivElement> & {
	initialData: { items: Store[], total: number }
}

const INITIAL_PAGE = 1

export function ExploreMarketplace({ initialData, className, ...props }: ExploreMarketplaceProps) {
	const [page, setPage] = useState(INITIAL_PAGE)

	const { data, isFetching } = storeQueries.useGetAll({
		page,
		limit: ITEMS_PER_PAGE,
		staleTime: 5_000,
		initialData
	})

	const total = data.total;
	const handlePageChange = useCallback((details: PageChangeDetails) => setPage(details.page), [])

	return (
		<div
			className={cn(
				`mx-auto space-y-24 flex flex-col flex-grow justify-between gap-[1rem] relative w-full`,
				className
			)}
			{...props}
		>
			<div className="flex flex-col w-full gap-[3rem]">
				<div className="space-y-4 max-w-content m-auto w-full">
					<Heading>
						Explore marketplace
					</Heading>
					<div className="text-black-60 text-balance w-1/2 max-md:w-full max-md:text-wrap">
						Discover a diverse range of one-of-a-kind shops you won&apos;t find anywhere else.
						From digital items to physical goods and unique services!
					</div>
				</div>

				<Carousel
					className="mx-[-1rem] w-[calc(100%+1rem*2)]"
					style={{
						padding: `0 max(1rem, calc((100% - ${resolvedTwConfig.theme.maxWidth.content} + 2rem) / 2))`
					}}
				/>

				<div className="flex flex-col gap-[2rem] max-w-content m-auto w-full max-xl:items-center">
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
							defaultPage={INITIAL_PAGE}
							siblingCount={1}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
