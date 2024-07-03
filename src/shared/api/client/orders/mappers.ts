import { components } from "~/shared/api/openapi";
import { Order } from "./model";
import { mapDtoToProduct } from "../products/mappers";
import { mapDtoToStore } from "../stores/mappers";
import { mapDtoToUser } from "../users/mappers";

type Schemas = components['schemas'];

export const mapDtoToOrder = (obj: Schemas['OrderInfoDto']) => ({
	id: obj.id,
	transaction: {
		status: obj.status,
		fulfillmentStatus: obj.fulfillmentStatus,
		createdAt: obj.createdAt,
		transactionUrl: '',
		totalPaid: obj.price,
		tokenAmount: obj.tokenAmount
	},
	store: mapDtoToStore(obj.store),
	product: mapDtoToProduct(obj.product),
	seller: mapDtoToUser(obj.seller)
}) satisfies Order