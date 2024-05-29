type ImageEntry = string // url for now, but could be an object with different variants of resoultion or quality

export type StoreId = number;

export interface Store {
	id: StoreId,
	name: string,
	shortName: string,
	isVerified: boolean,
	description: string,
	previewImage: ImageEntry | null,

	rating: {
		likes: number,
		dislikes: number,
		reviewsCount: number,
	}
}

export type ProductId = string;

export interface Product {
	id: ProductId,
	name: string,
	description: string | null,
	shortDescription: string,
	category: string,
	previewImage: ImageEntry | null,
	galleryImages: ImageEntry[],

	price: number
}

export type TransactionStatus = 'new' | 'paid'
export type TransactionFulfillmentStatus = 'new' | 'paid'

export interface Transaction {
	status: 'new' | 'paid',
	fulfillmentStatus: 'fulfilled' | '-',
	totalPaid: number,
	transactionUrl: string,
	createdAt: string
}

export type OrderId = number;

export interface Order {
	id: OrderId
	product: Product,
	store: Store,
	transaction: Transaction
}

export type SaleId = number;

export interface Sale {
	id: SaleId
	product: Product,
	user: { name: string },
	transaction: Transaction
}