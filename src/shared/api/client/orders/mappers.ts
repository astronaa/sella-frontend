import { components } from "~/shared/api/openapi";
import { Order, OrderReview } from "./model";
import { mapDtoToProduct } from "../products/mappers";
import { mapDtoToStore } from "../stores/mappers";
import { mapDtoToUser } from "../users/mappers";
import { mapDtoToTransaction } from "../shared/mappers";

type Schemas = components['schemas'];

export const mapDtoToOrder = (obj: Schemas['OrderInfoDto']) => ({
	id: obj.id,
	price: Number(obj.price),
	transaction: {
		...mapDtoToTransaction(obj),
		holdPeriod: obj.holdPeriod,
		holdEndingAt: obj.holdEndingAt,
		contractEscrowId: obj.contractEscrowId
	},
	store: mapDtoToStore(obj.store),
	product: mapDtoToProduct(obj.product),
	seller: mapDtoToUser(obj.seller)
}) satisfies Order

export const mapDtoToOrderReview = (obj: Schemas['ReviewDto']) => ({
	id: obj.id,
	content: obj.text,
	rating: obj.isPositive ? 'positive' : 'negative',
	createdAt: obj.createdAt,
	user: mapDtoToUser(obj.user)
}) satisfies OrderReview