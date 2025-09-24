import { Product } from "../products/model";
import { Transaction } from "../shared/models";
import { User } from "../users/model";

export type SaleId = string;

export interface Sale {
	id: SaleId;
	price: number,
	product: Product;
	user: Pick<User, 'username' | 'avatarImage'>;
	transaction: Transaction;
}
