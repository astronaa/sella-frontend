import { apiClient } from "~/shared/api/client";
import { STORE_ITEMS_PER_PAGE } from "~/pages/marketplace/config";

export async function fetchMarketplaceStores() {
	return await apiClient.stores.getForExplore({ page: 1, limit: STORE_ITEMS_PER_PAGE });
}