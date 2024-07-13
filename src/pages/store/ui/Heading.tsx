'use client';

import { StoreCard, storeQueries, useStoreStrictContext } from "~/entities/store";
import { StoreReportFlow } from "~/features/store/report";
import { ManageDialog } from "./ManageDialog";
import { PRODUCT_ITEMS_PER_PAGE } from "../config";
import { productQueries } from "~/entities/product";
import { useUserGetQuery } from "~/entities/user";
import { EditMode } from "./edit-mode";
import { useQuery } from "@tanstack/react-query";

export function Heading() {
	const store = useStoreStrictContext();

	const { data: products } = useQuery({
		...productQueries.getFromStoreOptions({
			storeUrl: store.url,
			query: {page: 1, limit: PRODUCT_ITEMS_PER_PAGE, sort: 'new'}
		}),
		staleTime: 5000,
		initialDataUpdatedAt: 0
	})

	const { data: report, isLoading: isReportLoading } = useQuery({
		...storeQueries.getReportOptions(store.url),
		retry: false,
		refetchOnWindowFocus: false
	})

	const { data: user } = useUserGetQuery();

	return (
		<div className='flex mb-[4rem] items-end w-full gap-[1rem] justify-between \
			max-lg:mb-[3rem] max-lg:flex-col max-lg:items-start'
		>
			<StoreCard.Root
				store={store}
				className='p-0 border-none flex-grow max-md:flex max-md:flex-col max-md:items-start'
			>
				<StoreCard.Image />

				<StoreCard.Content>
					<StoreCard.Title className='text-[3rem]/[1.1] max-md:text-[2.625rem]' />
					<StoreCard.Description />
					<StoreCard.Rating />
				</StoreCard.Content>
			</StoreCard.Root>

			{!!user && (
				<div className='flex gap-[1rem] md:self-end'>
					{store.ownerUsername == user.username ? (
						<>
							<ManageDialog />
							{products && products.total > 0 && (
								<EditMode.Button />
							)}
						</>
					) : (
						!isReportLoading && !report && (
							<StoreReportFlow storeUrl={store.url} />
						)
					)}
				</div>
			)}
		</div>
	);
}