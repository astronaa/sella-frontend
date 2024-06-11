'use client';

import { StoreCard, storeQueries } from "~/entities/store";
import { ToggleEditModeButton } from "./ToggleEditModeButton";
import { StoreReportFlow } from "~/features/store/report";
import { ManageDialog } from "./ManageDialog";
import { Product, Store } from "~/shared/api/model";
import { PRODUCT_ITEMS_PER_PAGE } from "../config";
import { productQueries } from "~/entities/product";
import { useUserGetQuery } from "~/entities/user";

interface HeadingProps { 
	storeUrl: string; 
	storeInitialData: Store,
	productsInitialData?: { items: Product[], total: number }
}

export function Heading({ storeUrl, storeInitialData, productsInitialData }: HeadingProps) {
	const { data: store } = storeQueries.useGetOne({
		storeUrl, 
		initialData: storeInitialData,
		staleTime: Infinity
	})

	const { data: products } = productQueries.useGetFromStore({
		storeUrl,
		page: 1, limit: PRODUCT_ITEMS_PER_PAGE,
		initialData: productsInitialData
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
					<ManageDialog store={store} />
					
					{products.total > 0 && <ToggleEditModeButton />}

					<StoreReportFlow />
				</div>
			)}
		</div>
	);
}
