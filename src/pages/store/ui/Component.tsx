import { fetchStore, fetchStoreProducts } from "../api";
import { ProductsStream } from "./ProductsStream";
import { EditModeProvider } from "../model/edit-mode";
import { StorefrontOpenBanner } from "~/widgets/storefront-open";
import { SimilarStoreFronts } from "~/pages/store/ui/SimilarStoreFronts";
import { Heading } from "./Heading";
import { StoreOnPageProvider } from "./StoreOnPageProvider";

export async function Component({ storeUrl }: { storeUrl: string }) {
	const store = await fetchStore(storeUrl);
	const products = await fetchStoreProducts(storeUrl);

	return (
		<StoreOnPageProvider storeInitialData={store}>
			<div className='flex flex-col w-full max-w-content mx-auto max-xl:px-4'>
				<EditModeProvider>
					<Heading productsInitialData={products} />

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
		</StoreOnPageProvider>
	);
}