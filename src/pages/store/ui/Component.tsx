import { fetchStore } from "../api";
import { ProductsStream } from "./products-stream/Component";
import { StorefrontOpenBanner } from "~/widgets/storefront-open";
import { SimilarStoreFronts } from "~/pages/store/ui/SimilarStoreFronts";
import { Heading } from "./Heading";
import { StoreOnPageProvider } from "./StoreOnPageProvider";
import { EditMode } from "./edit-mode";

export async function Component({ storeUrl }: { storeUrl: string }) {
	const store = await fetchStore(storeUrl);

	return (
		<StoreOnPageProvider initialData={store}>
			<div className='flex flex-col w-full max-w-content mx-auto max-xl:px-4'>
				<EditMode.Root>
					<Heading />
					<ProductsStream
						className='mb-[6rem] max-md:mb-[5rem]'
					/>
				</EditMode.Root>

				<SimilarStoreFronts
					className='mb-[6rem] max-md:mb-[3rem]'
					storeUrl={storeUrl}
				/>

				<StorefrontOpenBanner />
			</div>
		</StoreOnPageProvider>
	);
}