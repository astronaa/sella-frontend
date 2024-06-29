import { Sale } from "~/shared/api/client"

export interface SalesResponse {
	items: Sale[],
	total: number,
	totalPrice: number
}