import { Product, Store, StoreId } from "~/shared/api/model";

export async function fetchStore(storeId: StoreId): Promise<Store> {
	return {
		id: storeId,
		name: "First Store",
		shortName: "@storename",
		isVerified: true,
		description: "Market, Limit, Stop Limit, and Auction Mode orders.",
		previewImage: null,
		rating: {
			likes: 45,
			dislikes: 16,
			reviewsCount: 673,
		},
	}
}

export async function fetchStores(): Promise<Store[]> {
	return (Array
		.from({ length: 8 })
		.fill({
			id: 0,
			name: "First Store",
			shortName: "@storename",
			isVerified: true,
			description: "Market, Limit, Stop Limit, and Auction Mode orders.",
			previewImage: null,
			rating: {
				likes: 45,
				dislikes: 16,
				reviewsCount: 673,
			},
		}) as Store[])
		.map((item, index) => ({ ...item, id: index + 1 }))
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchSimilarStores(storeId: StoreId): Promise<Store[]> {
	return (Array
		.from({ length: 2 })
		.fill({
			id: 0,
			name: "First Store",
			shortName: "@storename",
			isVerified: true,
			description: "Market, Limit, Stop Limit, and Auction Mode orders.",
			previewImage: null,
			rating: {
				likes: 45,
				dislikes: 16,
				reviewsCount: 673,
			},
		}) as Store[])
		.map((item, index) => ({ ...item, id: index + 1 }))
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchStoreProducts(storeId: StoreId): Promise<Product[]> {
	return [
		{
			id: '1',
			name: 'Product Name',
			description: 'Market, Limit, Stop Limit, and Auction Mode orders.',
			shortDescription: 'Market, Limit, Stop Limit, and Auction Mode orders.',
			previewImage: null,
			galleryImages: [],
			category: 'Category',
			price: 2.99
		},
		{
			id: '2',
			name: 'Product Name',
			description: 'Market, Limit, Stop Limit, and Auction Mode orders.',
			shortDescription: 'Market, Limit, Stop Limit, and Auction Mode orders.',
			previewImage: null,
			galleryImages: [],
			category: 'Category',
			price: 2.99
		},
		{
			id: '3',
			name: 'Product Name',
			description: 'Market, Limit, Stop Limit, and Auction Mode orders.',
			shortDescription: 'Market, Limit, Stop Limit, and Auction Mode orders.',
			previewImage: null,
			galleryImages: [],
			category: 'Category',
			price: 2.99
		},
		{
			id: '4',
			name: 'Product Name',
			description: 'Market, Limit, Stop Limit, and Auction Mode orders.',
			shortDescription: 'Market, Limit, Stop Limit, and Auction Mode orders.',
			previewImage: null,
			galleryImages: [],
			category: 'Category',
			price: 2.99
		},
		{
			id: '5',
			name: 'Product Name',
			description: 'Market, Limit, Stop Limit, and Auction Mode orders.',
			shortDescription: 'Market, Limit, Stop Limit, and Auction Mode orders.',
			previewImage: null,
			galleryImages: [],
			category: 'Category',
			price: 2.99
		},
		{
			id: '6',
			name: 'Product Name',
			description: 'Market, Limit, Stop Limit, and Auction Mode orders.',
			shortDescription: 'Market, Limit, Stop Limit, and Auction Mode orders.',
			previewImage: null,
			galleryImages: [],
			category: 'Category',
			price: 2.99
		},
		{
			id: '7',
			name: 'Product Name',
			description: 'Market, Limit, Stop Limit, and Auction Mode orders.',
			shortDescription: 'Market, Limit, Stop Limit, and Auction Mode orders.',
			previewImage: null,
			galleryImages: [],
			category: 'Category',
			price: 2.99
		},
		{
			id: '8',
			name: 'Product Name',
			description: 'Market, Limit, Stop Limit, and Auction Mode orders.',
			shortDescription: 'Market, Limit, Stop Limit, and Auction Mode orders.',
			previewImage: null,
			galleryImages: [],
			category: 'Category',
			price: 2.99
		}
	]
}
