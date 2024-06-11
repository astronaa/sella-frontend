import { Order } from "~/shared/api/model";

export interface OrdersResponse {
	items: Order[],
	total: number
	totalPrice: number
}