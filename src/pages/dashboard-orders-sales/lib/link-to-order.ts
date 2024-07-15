import { Order, Sale, isCompletedTransactionStatus } from "~/shared/api/client";

export function getLinkToOrder(order: Order | Sale) {
	return isCompletedTransactionStatus(order.transaction.status)
		? `/products/${order.product.id}/checkout/${order.id}/review`
		: `/products/${order.product.id}/checkout/${order.id}`
}		