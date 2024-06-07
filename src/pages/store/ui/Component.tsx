import { fetchStore, fetchStoreProducts } from "../api";
import { ProductsStream } from "./ProductsStream";
import { EditModeProvider } from "../model/edit-mode";
import { StorefrontOpenBanner } from "~/widgets/storefront-open";
import { SimilarStoreFronts } from "~/pages/store/ui/SimilarStoreFronts";
import { Heading } from "./Heading";

export async function Component({ storeUrl }: { storeUrl: string }) {
	const store = await fetchStore(storeUrl);
	const products = await fetchStoreProducts(storeUrl);

	return (
		<div className='flex flex-col w-full max-w-content mx-auto max-xl:px-4'>
			<EditModeProvider>
				<Heading
					storeUrl={storeUrl}
					storeInitialData={store}
					productsInitialData={products}
				/>

				<ProductsStream
					className='mb-[6rem] max-md:mb-[5rem]'
					initialData={products}
					storeUrl={storeUrl}
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