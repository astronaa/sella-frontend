import { createAuthClient } from "./auth/impl";
import { createProductsClient } from "./products/impl";
import { createStoresClient } from "./stores/impl";
import { createUsersClient } from "./users/impl";
import { createSalesClient } from "./sales/impl";
import { createOrdersClient } from "./orders/impl";
import { createReviewsClient } from "./reviews/impl";
import { createChatsClient } from "./chats/impl";
import { createCategoriesClient } from "./categories/impl";
import { createQuestsClient } from "./quests/impl";

export function createApiClient() {
	return {
		auth: createAuthClient(),
		users: createUsersClient(),
		stores: createStoresClient(),
		products: createProductsClient(),
		sales: createSalesClient(),
		orders: createOrdersClient(),
		reviews: createReviewsClient(),
		chats: createChatsClient(),
		categories: createCategoriesClient(),
		quests: createQuestsClient()
	}
}
