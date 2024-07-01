'use client';

import { StoreCard, useStoreStrictContext } from "~/entities/store";
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
			storeUrl: store.shortName,
			limit: PRODUCT_ITEMS_PER_PAGE,
		}),
		staleTime: 5000,
		initialDataUpdatedAt: 0
	})

	const { data: user } = useUserGetQuery();

	return (
		<div className='flex mb-[4.5rem] items-end w-full gap-[1rem] justify-between \
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
						<StoreReportFlow storeUrl={store.shortName} />
					)}
				</div>
			)}
		</div>
	);
}
