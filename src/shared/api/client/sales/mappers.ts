import { components } from "~/shared/api/openapi";
import { Sale } from "~/shared/api/model";
import { mapDtoToProduct } from "../products/mappers";

export const mapDtoToSale = (obj: components['schemas']['Order']): Sale => {
	return {
		id: obj.id,
		transaction: {
			status: obj.status,
			fulfillmentStatus: obj.fulfillmentStatus,
			createdAt: obj.createdAt,
			transactionUrl: '',
			totalPaid: obj.price,
		},
		user: {
			// name: obj.buyer.username ?? '',
			name: 'testName',
		},
		product: mapDtoToProduct(obj.product),
	}
}
