import { Product } from "../products/model";
import { Transaction } from "../shared/models";
import { Store } from "../stores/model";

export type OrderId = string;

export interface Order {
	id: OrderId;
	product: Product;
	store: Store;
	transaction: Transaction;
}

export const orderPaymentMethodTypes = [
	"ETH", "TRX", "MATIC", "USDT", "USDC", "DAI", "SELLA"
] as const;

export type OrderPaymentMethodTypes = typeof orderPaymentMethodTypes[number];

export interface OrderPaymentMethod {
	name: string;
	value: OrderPaymentMethodTypes;
	contractAddress: string;

	tokens: {
		name: string;
		address: string;
	}[]
}