import { staticStores } from "~/shared/static-data/marketplace";

export async function fetchMarketplaceStores() {
	if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
		return {
			data: {
				items: staticStores.slice(0, 6),
				total: staticStores.length,
			},
			error: undefined,
		};
	}

	const { apiClient } = await import("~/shared/api/client");

	return await apiClient.stores.getAll(
		{ sort: 'featured_rating' }, 
		{ page: 1, limit: 6 }
	);
}	
