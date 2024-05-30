import { apiClient } from "~/shared/api/client";

export async function fetchMarketplaceStores() {
	return await apiClient.stores.getAll({ page: 1, limit: 6 });
}	