import { Heading } from "~/shared/ui/kit/heading";
import { StoreCard, StoreLink } from "~/entities/store";
import { StorefrontOpenBanner } from "~/widgets/storefront-open";
import { fetchMarketplaceStores } from "../api/stores";
import { Aura, Eyebrow, Reveal } from "./shared";

export async function ExploreMarketPlace() {
	const { data } = await fetchMarketplaceStores();

	return (
		<div id="explore" className="relative overflow-hidden py-[7rem] max-md:py-[4rem] px-4">
			<Aura className="top-[-8rem] right-[-12rem] size-[48rem]" />
			<div className="mx-auto flex flex-col gap-[3.5rem] relative w-full max-w-content m-auto">
				<Reveal className="flex flex-col gap-[1.25rem]">
					<Eyebrow>Some ideas to get you going</Eyebrow>

					<Heading size="lg" className="tracking-[-0.02em]">
						Explore the demo shops.
					</Heading>

					<p className="text-black-60 text-[1.0625rem] leading-[1.6] max-w-[34rem] text-balance">
						Six imaginary storefronts showing what a Sella shop can be.
						The sky is the limit: services, files, goods, access, whatever
						you can deliver.
					</p>
				</Reveal>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-[1.25rem]">
					{data?.items.map((store, index) => (
						<Reveal key={store.id} delay={(index % 2) * 90}>
							<StoreCard.Root
								store={store}
								asChild
								className="lp-hover-card w-full mx-auto max-w-none bg-white/[0.02] hover:bg-white/[0.045] hover:border-white/[0.13]"
							>
								<StoreLink>
									<StoreCard.Composition />
								</StoreLink>
							</StoreCard.Root>
						</Reveal>
					))}
				</div>

				<StorefrontOpenBanner />
			</div>
		</div>
	);
}
