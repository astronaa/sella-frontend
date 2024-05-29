"use client";

import { Heading } from "~/shared/ui/kit/heading";
import { StoreCard, StoreLink } from "~/entities/store";
import { StorefrontOpenBanner } from "~/widgets/storefront-open";
import { Store } from "~/shared/api/model";

export const storeData: Store[] = [
	{
		id: 1,
		name: "Store Name",
		shortName: "@storename",
		isVerified: true,
		description: "Market, Limit, Stop Limit, and Auction Mode orders.",
		previewImage: null,
		rating: {
			likes: 45,
			dislikes: 16,
			reviewsCount: 673,
		},
	},
	{
		id: 2,
		name: "Store Name",
		shortName: "@storename",
		isVerified: true,
		description: "Market, Limit, Stop Limit, and Auction Mode orders.",
		previewImage: null,
		rating: {
			likes: 45,
			dislikes: 16,
			reviewsCount: 673,
		},
	},
	{
		id: 3,
		name: "Store Name",
		shortName: "@storename",
		isVerified: true,
		description: "Market, Limit, Stop Limit, and Auction Mode orders.",
		previewImage: null,
		rating: {
			likes: 45,
			dislikes: 16,
			reviewsCount: 673,
		},
	},
	{
		id: 4,
		name: "Store Name",
		shortName: "@storename",
		isVerified: true,
		description: "Market, Limit, Stop Limit, and Auction Mode orders.",
		previewImage: null,
		rating: {
			likes: 45,
			dislikes: 16,
			reviewsCount: 673,
		},
	},
	{
		id: 5,
		name: "Store Name",
		shortName: "@storename",
		isVerified: true,
		description: "Market, Limit, Stop Limit, and Auction Mode orders.",
		previewImage: null,
		rating: {
			likes: 45,
			dislikes: 16,
			reviewsCount: 673,
		},
	},
	{
		id: 6,
		name: "Store Name",
		shortName: "@storename",
		isVerified: true,
		description: "Market, Limit, Stop Limit, and Auction Mode orders.",
		previewImage: null,
		rating: {
			likes: 45,
			dislikes: 16,
			reviewsCount: 673,
		}
	},
];

export function ExploreMarketPlace() {
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
						{storeData.map(store => (
							<StoreLink key={store.id} store={store}>
								<StoreCard.Composed
									store={store}
									className='w-full mx-auto'
								/>
							</StoreLink>
						))}
					</div>
				</div>
				<StorefrontOpenBanner />
			</div>
		</div>
	);
}
