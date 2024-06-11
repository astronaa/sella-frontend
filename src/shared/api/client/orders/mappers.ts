import { components } from "~/shared/api/openapi";
import { Order } from "~/shared/api/model";
import { mapDtoToProduct } from "../products/mappers";
import { mapDtoToStore } from "../stores/mappers";

export const mapDtoToOrder = (obj: components['schemas']['Order']): Order => {
	return {
		id: obj.id,
		transaction: {
			status: obj.status,
			fulfillmentStatus: obj.fulfillmentStatus,
			createdAt: obj.createdAt,
			transactionUrl: '',
			totalPaid: obj.price,
		},
		store: mapDtoToStore(obj.product.store),
		product: mapDtoToProduct(obj.product),
	}
}
