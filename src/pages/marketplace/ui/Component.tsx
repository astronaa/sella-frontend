import { ExploreMarketplace } from "./ExploreMarketplace";
import { StorefrontOpenBanner } from "~/widgets/storefront-open";
import { fetchMarketplaceStores } from "~/pages/marketplace/api/stores";

export async function Component() {
	const stores = await fetchMarketplaceStores();

	return (
		<div className='px-4'>
			<ExploreMarketplace
				className='mb-[3rem]'
				initialData={stores}
			/>

			<StorefrontOpenBanner
				className='max-w-content m-auto'
			/>
		</div>
	);
}
