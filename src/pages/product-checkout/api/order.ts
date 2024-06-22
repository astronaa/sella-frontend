import { OrderId, apiClient } from "~/shared/api/client"

export async function fetchOrder(orderId: OrderId) {
	const { data, error } = await apiClient.orders.for(orderId).get();

	if(error)
		throw error;

	return data;
}
