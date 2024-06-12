import { Store } from "../../model";

export const storeMock: Store = {
	id: '1',
	name: 'Store Name',
	shortName: '@storename',
	description: 'Market, Limit, Stop Limit, and Auction Mode orders.',
	isVerified: true,
	previewImage: null,
	rating: {
		likes: 10,
		dislikes: 2,
		reviewsCount: 575
	},
	ownerUsername: 'store owner'
}