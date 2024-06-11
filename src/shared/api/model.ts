import { StaticImageData } from "next/image";

type ImageEntry = string // url for now, but could be an object with different variants of resoultion or quality

export type StoreId = string;

export interface Store {
	id: StoreId,
	name: string,
	shortName: string,
	isVerified: boolean,
	description: string | null,
	previewImage: ImageEntry | null,
	ownerUsername: string,

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
	imageIds: ImageEntry[],
	storeUrl: string,
	hasPreview: boolean,
	previewImage: ImageEntry | null,
	galleryImages: ImageEntry[],
	price: number
}

export interface ProductRate {
	total: number,
	likes: number,
	dislikes: number,
}

export interface ProductCarousel {
	images: StaticImageData[],
	description: string,
}

export interface ProductRate {
	total: number,
	likes: number,
	dislikes: number,
}

export type TransactionStatus = "New" | "Paid" | "Delivered" | "Canceled"
export type TransactionFulfillmentStatus = "Pending" | "Processing" | "Fulfilled" | "Failed"

export interface Transaction {
	status: TransactionStatus,
	fulfillmentStatus: TransactionFulfillmentStatus,
	totalPaid: number,
	transactionUrl: string,
	createdAt: string
}

export type OrderId = string;

export interface Order {
	id: OrderId
	product: Product,
	store: Store,
	transaction: Transaction
}

export type SaleId = string;

export interface Sale {
	id: SaleId
	product: Product,
	user: { name: string },
	transaction: Transaction
}

export interface User {
	id: number,
	avatarImage: ImageEntry | null,
	address: string,
	username: string | null,
	email: string | null,
	twitterId: string | null,
	telegramId: string | null,
	createdAt: string
}

export interface ProductReview {
	user: string,
	avatar?: string,
	quote: string,
	rate: string,
	date: string
}