import { Order, Product, Store } from "~/shared/api/model";

const store: Store = {
	id: 1,
	name: "First Store",
	shortName: "@storename",
	isVerified: true,
	description: "Market, Limit, Stop Limit, and Auction Mode orders.",
	previewImage: null,
	rating: {
		likes: 45,
		dislikes: 16,
		reviewsCount: 673,
	}
}

const product: Product = {
	id: '1',
	name: 'Product Name',
	description: 'Market, Limit, Stop Limit, and Auction Mode orders.',
	shortDescription: 'Market, Limit, Stop Limit, and Auction Mode orders.',
	previewImage: null,
	galleryImages: [],
	category: 'Category',
	price: 2.99
}

export interface OrdersResponse {
	data: Order[],
	total: number
}

export async function fetchOrders(): Promise<OrdersResponse> {
	return {
		data: [
			{
				id: 1,
				store,
				product,
				transaction: {
					status: 'new',
					fulfillmentStatus: '-',
					totalPaid: 328,
					transactionUrl: '',
					createdAt: new Date('May 3, 4:27 PM 2024').toISOString(),
				}
			},
			{
				id: 2,
				store,
				product,
				transaction: {
					status: 'new',
					fulfillmentStatus: '-',
					totalPaid: 279,
					transactionUrl: '',
					createdAt: new Date('May 2, 4:11 PM 2024').toISOString(),
				}
			},
			{
				id: 3,
				store,
				product,
				transaction: {
					status: 'paid',
					fulfillmentStatus: 'fulfilled',
					totalPaid: 328,
					transactionUrl: '',
					createdAt: new Date('May 2, 4:10 PM 2024').toISOString(),
				}
			},
			{
				id: 4,
				store,
				product,
				transaction: {
					status: 'paid',
					fulfillmentStatus: 'fulfilled',
					totalPaid: 279,
					transactionUrl: '',
					createdAt: new Date('May 2, 1:42 PM 2024').toISOString(),
				}
			},
			{
				id: 5,
				store,
				product,
				transaction: {
					status: 'paid',
					fulfillmentStatus: 'fulfilled',
					totalPaid: 328,
					transactionUrl: '',
					createdAt: new Date('May 2, 3:42 PM 2024').toISOString(),
				}
			},
			{
				id: 6,
				store,
				product,
				transaction: {
					status: 'paid',
					fulfillmentStatus: 'fulfilled',
					totalPaid: 279,
					transactionUrl: '',
					createdAt: new Date('May 2, 3:42 PM 2024').toISOString(),
				}
			},
			{
				id: 7,
				store,
				product,
				transaction: {
					status: 'paid',
					fulfillmentStatus: 'fulfilled',
					totalPaid: 328,
					transactionUrl: '',
					createdAt: new Date('May 2, 3:42 PM 2024').toISOString(),
				}
			},
			{
				id: 8,
				store,
				product,
				transaction: {
					status: 'paid',
					fulfillmentStatus: 'fulfilled',
					totalPaid: 279,
					transactionUrl: '',
					createdAt: new Date('May 2, 3:42 PM 2024').toISOString(),
				}
			},
			{
				id: 9,
				store,
				product,
				transaction: {
					status: 'paid',
					fulfillmentStatus: 'fulfilled',
					totalPaid: 328,
					transactionUrl: '',
					createdAt: new Date('May 2, 3:42 PM 2024').toISOString(),
				}
			},
			{
				id: 10,
				store,
				product,
				transaction: {
					status: 'paid',
					fulfillmentStatus: 'fulfilled',
					totalPaid: 279,
					transactionUrl: '',
					createdAt: new Date('May 2, 3:42 PM 2024').toISOString(),
				}
			}
		],
		total: 20
	}
} 