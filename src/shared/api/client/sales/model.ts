import { Product } from "../products/model";
import { Transaction } from "../shared/models";
import { User } from "../users/model";

export type SaleId = string;

export interface Sale {
	id: SaleId;
	product: Product;
	user: User;
	transaction: Transaction;
}
