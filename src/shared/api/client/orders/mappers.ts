import { components } from "~/shared/api/openapi";
import { Order } from "./model";
import { mapDtoToProduct } from "../products/mappers";
import { mapDtoToStore } from "../stores/mappers";

type Schemas = components['schemas'];

export const mapDtoToOrder = (obj: Schemas['OrderInfoDto']): Order => {
	return {
		id: obj.id,
		transaction: {
			status: obj.status,
			fulfillmentStatus: obj.fulfillmentStatus,
			createdAt: obj.createdAt,
			transactionUrl: '',
			totalPaid: obj.price,
		},
		store: mapDtoToStore(obj.store),
		product: mapDtoToProduct(obj.product),
	}
}