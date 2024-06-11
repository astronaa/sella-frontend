import { Sale } from "~/shared/api/model";

export interface SalesResponse {
	items: Sale[],
	total: number,
	totalPrice: number
}