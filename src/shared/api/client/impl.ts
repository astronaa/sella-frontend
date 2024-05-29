import { createAuthClient } from "./auth/impl";
import { createProductsClient } from "./products/impl";
import { createStoresClient } from "./stores/impl";
import { createUsersClient } from "./users/impl";

export function createApiClient() {
	return {
		auth: createAuthClient(),
		users: createUsersClient(),
		stores: createStoresClient(),
		products: createProductsClient()
	}
}