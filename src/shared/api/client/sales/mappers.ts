import { components } from "~/shared/api/openapi";
import { mapDtoToProduct } from "../products/mappers";
import { mapBaseUserDtoToUser } from "../users/mappers";
import { Sale } from "./model";
import { mapDtoToTransaction } from "../shared/mappers";

export const mapDtoToSale = (obj: components['schemas']['SalesInfoDto']): Sale => {
	return {
		id: obj.id,
		price: Number(obj.price),
		transaction: mapDtoToTransaction(obj),
		user: mapBaseUserDtoToUser(obj.buyer),
		product: mapDtoToProduct(obj.product),
	}
}
