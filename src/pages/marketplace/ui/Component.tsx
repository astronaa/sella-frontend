import { ExploreMarketplace } from "~/pages/marketplace/ui/ExploreMarketplace";
import { fetchStores } from "~/pages/store/api";
import { StorefrontOpenBanner } from "~/widgets/storefront-open";

export async function Component() {
	const stores = await fetchStores();

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
