import { components } from "~/shared/api/openapi";
import { mapDtoToProduct } from "../products/mappers";
import { mapDtoToUser } from "../users/mappers";
import { Sale } from "./model";
import { mapDtoToTransaction } from "../shared/mappers";

export const mapDtoToSale = (obj: components['schemas']['SalesInfoDto']): Sale => {
	return {
		id: obj.id,
		price: Number(obj.price),
		transaction: mapDtoToTransaction(obj),
		user: mapDtoToUser(obj.buyer),
		product: mapDtoToProduct(obj.product),
	}
}
