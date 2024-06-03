'use client'

import { cn } from "~/shared/lib/cn";
import { Carousel } from "~/pages/marketplace/ui/Carousel";
import { HTMLAttributes, useCallback, useState } from "react";
import { Store } from "~/shared/api/model";
import { StoreCard, StoreLink } from "~/entities/store";
import { Pagination } from "~/shared/ui/kit/pagination";
import { resolvedTwConfig } from "~/shared/lib/resolved-tw-config";
import { Heading } from "~/shared/ui/kit/heading";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";
import { PageChangeDetails } from "@zag-js/pagination";
import { Skeleton } from "~/shared/ui/kit/skeleton";
import { STORE_ITEMS_PER_PAGE } from "~/pages/marketplace/config";

type ExploreMarketplaceProps = HTMLAttributes<HTMLDivElement> & {
	initialData?: { items: Store[], total: number }
}

const INITIAL_PAGE = 1

export function ExploreMarketplace({ initialData, className, ...props }: ExploreMarketplaceProps) {
	const [page, setPage] = useState(INITIAL_PAGE)

	const { data, isFetching } = useQuery({
		initialData: { data: initialData, error: undefined },
		queryKey: ['stores', page],
		queryFn: async () => apiClient.stores.getAll({ page: page, limit: STORE_ITEMS_PER_PAGE }),
		// refetchOnMount: false//TODO
	})

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
					<div className="grid grid-cols-2 gap-10 max-w-content max-md:grid-cols-1">
						{data.data?.items.map((store) => (
							<Skeleton className="rounded-[1.25rem]" loading={isFetching} key={store.id}>
								<div className="w-full">
									<StoreLink key={store.id} store={store}>
										<StoreCard.Composed
											store={store}
											className='mx-auto'
										/>
									</StoreLink>
								</div>
							</Skeleton>
						))}
					</div>

					<Pagination
						onPageChange={handlePageChange}
						className='w-min'
						count={data.data?.total ?? 0}
						pageSize={STORE_ITEMS_PER_PAGE}
						defaultPage={INITIAL_PAGE}
						siblingCount={1}
					/>
				</div>
			</div>
		</div>
	);
}
