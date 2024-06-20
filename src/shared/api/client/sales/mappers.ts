import { components } from "~/shared/api/openapi";
import { mapDtoToProduct } from "../products/mappers";
import { mapDtoToUserShort } from "../users/mappers";
import { Sale } from "./model";

export const mapDtoToSale = (obj: components['schemas']['SalesInfoDto']): Sale => {
	return {
		id: obj.id,
		transaction: {
			status: obj.status,
			fulfillmentStatus: obj.fulfillmentStatus,
			createdAt: obj.createdAt,
			transactionUrl: '',
			totalPaid: obj.price,
		},
		user: mapDtoToUserShort(obj.buyer),
		product: mapDtoToProduct(obj.product),
	}
}
