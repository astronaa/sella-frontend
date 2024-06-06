import { apiClient } from "~/shared/api/client";
import { STORE_ITEMS_PER_PAGE } from "~/pages/marketplace/config";

export async function fetchMarketplaceStores(page = 1) {
	return await apiClient.stores.getForExplore({ page, limit: STORE_ITEMS_PER_PAGE });
}