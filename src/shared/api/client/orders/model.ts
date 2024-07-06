import { Product } from "../products/model";
import { Transaction } from "../shared/models";
import { Store } from "../stores/model";
import { User } from "../users/model";

export type OrderId = string;

export interface Order {
	id: OrderId;
	product: Product;
	store: Store;
	transaction: Transaction;
	seller: User,
}