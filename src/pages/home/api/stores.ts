import { apiClient } from "~/shared/api/client";

export async function fetchMarketplaceStores() {
	return await apiClient.stores.getAll(
		{ sort: 'featured_rating' }, 
		{ page: 1, limit: 6 }
	);
}	