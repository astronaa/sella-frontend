import { ExploreMarketplace } from "./ExploreMarketplace";
import { StorefrontOpenBanner } from "~/widgets/storefront-open";
import { fetchMarketplaceStores } from "~/pages/marketplace/api/stores";
import { StoresStream } from "./StoresStream";

export async function Component() {
	const stores = await fetchMarketplaceStores();

	return (
		<div className='px-4'>
			<ExploreMarketplace initialData={stores} className='mb-[3rem]'>
				<StoresStream initialData={stores} />
			</ExploreMarketplace>

			<StorefrontOpenBanner
				className='max-w-content m-auto'
			/>
		</div>
	);
}
