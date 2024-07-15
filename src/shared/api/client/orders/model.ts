import { Product } from "../products/model";
import { Transaction } from "../shared/models";
import { Store } from "../stores/model";
import { User } from "../users/model";

export type OrderId = string;

export interface Order {
	id: OrderId;
	price: number;
	product: Product;
	store: Store;
	transaction: Transaction & {
		holdPeriod: number
		holdEndingAt: string | null,
		contractEscrowId: number | null
	};
	seller: User,
}

export type OrderReviewId = string;

export const orderReviewRatingTypes = ['positive', 'negative'] as const;

export type OrderReviewType = typeof orderReviewRatingTypes[number];

export interface OrderReview {
	id: OrderReviewId,
	content: string,
	rating: OrderReviewType,
	createdAt: string
	user: User,
}