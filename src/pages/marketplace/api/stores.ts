import { apiClient } from "~/shared/api/client";
import { ITEMS_PER_PAGE } from "~/pages/marketplace/config";

export async function fetchMarketplaceStores(page = 1) {
	const { data, error } = await apiClient.stores.getForExplore({ page, limit: ITEMS_PER_PAGE });

	if(error)
		throw error;

	return data;
}