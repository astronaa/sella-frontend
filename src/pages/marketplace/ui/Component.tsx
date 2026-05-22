import { ExploreMarketplace } from "./ExploreMarketplace";
import { StorefrontOpenBanner } from "~/widgets/storefront-open";
import { fetchMarketplaceStores } from "~/pages/marketplace/api/stores";
import { Heading } from "~/shared/ui/kit/heading";

export async function Component() {
	const stores = await fetchMarketplaceStores();
	const stream = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true"
		? <StaticMarketplaceSummary />
		: await renderStoresStream(stores);

	return (
		<div className='px-4'>
			<ExploreMarketplace initialData={stores} className='mb-[3rem]'>
				{stream}
			</ExploreMarketplace>

			<StorefrontOpenBanner
				className='max-w-content m-auto'
			/>
		</div>
	);
}

async function renderStoresStream(stores: Awaited<ReturnType<typeof fetchMarketplaceStores>>) {
	const { StoresStream } = await import("./StoresStream");

	return <StoresStream initialData={stores} />;
}

function StaticMarketplaceSummary() {
	return (
		<div className="flex flex-col gap-[1rem] max-w-content m-auto w-full">
			<Heading size="sm">Featured Stores</Heading>
			<p className="max-w-[42rem] text-black-60">
				This static preview shows the public marketplace shell while the live backend is offline.
				Search, categories, checkout, and account actions are disabled in this GitHub Pages build.
			</p>
		</div>
	);
}
