import { Order, OrderId, Product, Store } from "~/shared/api/client"

const store: Store = {
	id: '1',
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
	ownerUsername: 'store owner'
}

const product: Product = {
	id: '1',
	name: 'Product Name',
	description: 'Market, Limit, Stop Limit, and Auction Mode orders.',
	shortDescription: 'Market, Limit, Stop Limit, and Auction Mode orders.',
	previewImage: null,
	galleryImages: [],
	category: 'Category',
	price: 2.99,
	imageIds: [],
	storeUrl: '@teststore',
	hasPreview: false
}

export async function fetchOrder(orderId: OrderId): Promise<Order> {
	return {
		id: orderId,
		store,
		product,
		transaction: {
			status: 'New',
			fulfillmentStatus: 'Failed',
			totalPaid: 328,
			transactionUrl: '',
			createdAt: new Date('May 3, 4:27 PM 2024').toISOString(),
		}
	}
}
