import { apiClient } from "~/shared/api/client";

export async function fetchMarketplaceStores() {
	return await apiClient.stores.getForExplore({ page: 1, limit: 6 });
}	