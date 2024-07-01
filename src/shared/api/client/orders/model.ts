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