import { createAuthClient } from "./auth/impl";
import { createProductsClient } from "./products/impl";
import { createStoresClient } from "./stores/impl";
import { createUsersClient } from "./users/impl";
import { createSalesClient } from "./sales/impl";
import { createOrdersClient } from "./orders/impl";

export function createApiClient() {
	return {
		auth: createAuthClient(),
		users: createUsersClient(),
		stores: createStoresClient(),
		products: createProductsClient(),
		sales: createSalesClient(),
		orders: createOrdersClient()
	}
}
