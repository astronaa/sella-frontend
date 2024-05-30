import { fetchStore, fetchStoreProducts } from "../api";
import { Button } from "~/shared/ui/kit/button";
import { StoreCard } from "~/entities/store";
import { StoreManageDialog } from "~/features/store/manage";
import { ProductsStream } from "./ProductsStream";
import { EditModeProvider } from "../model/edit-mode";
import { ToggleEditModeButton } from "./ToggleEditModeButton";
import { StorefrontOpenBanner } from "~/widgets/storefront-open";
import { SimilarStoreFronts } from "~/pages/store/ui/SimilarStoreFronts";
import { StoreReportFlow } from "~/features/store/report";

export async function Component({ storeUrl }: { storeUrl: string }) {
	const store = await fetchStore(storeUrl);
	const products = await fetchStoreProducts(storeUrl);

	return (
		<div className='flex flex-col w-full max-w-content mx-auto max-xl:px-4'>
			<EditModeProvider>
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

					<div className='flex gap-[1rem] md:self-end'>
						<StoreManageDialog
							store={store}
							triggerElement={
								<Button colorPalette='gray' size='lg'>
									Settings
								</Button>
							}
						/>
						<ToggleEditModeButton />

						<StoreReportFlow />
					</div>
				</div>

				<ProductsStream
					className='mb-[6rem] max-md:mb-[5rem]'
					initialData={products}
				/>
			</EditModeProvider>

			<SimilarStoreFronts
				className='mb-[6rem] max-md:mb-[3rem]'
				storeUrl={storeUrl}
			/>

			<StorefrontOpenBanner />
		</div>
	);
}
