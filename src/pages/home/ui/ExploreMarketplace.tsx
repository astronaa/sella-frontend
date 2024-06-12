import { Heading } from "~/shared/ui/kit/heading";
import { StoreCard, StoreLink } from "~/entities/store";
import { StorefrontOpenBanner } from "~/widgets/storefront-open";
import { fetchMarketplaceStores } from "../api/stores";

export async function ExploreMarketPlace() {
	const { data } = await fetchMarketplaceStores();

	return (
		<div id='explore' className="py-32 px-4">
			<div className="mx-auto space-y-24 flex flex-col flex-grow justify-between gap-[1rem] relative w-full max-w-content m-auto">
				<div className="space-y-12">
					<div className="space-y-4">
						<Heading size='lg'>
							Explore marketplace
						</Heading>

						<div className="text-black-60 text-balance w-full md:w-1/2 xl:w-1/3">
							Discover a diverse range of one-of-a-kind shops you
							won&apos;t find anywhere else. From digital items to
							physical goods and unique services!
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
						{data?.items.map(store => (
							<StoreCard.Root
								key={store.id} store={store} asChild
								className='w-full mx-auto'
							>
								<StoreLink>
									<StoreCard.Composition />
								</StoreLink>
							</StoreCard.Root>
						))}
					</div>
				</div>
				<StorefrontOpenBanner />
			</div>
		</div>
	);
}
