import { Order } from "~/shared/api/client"

export interface OrdersResponse {
	items: Order[],
	total: number
	totalPrice: number
}