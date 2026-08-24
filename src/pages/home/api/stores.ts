import { apiClient } from "~/shared/api/client";
import { staticStores } from "~/shared/static-data/marketplace";

const fallback = {
	data: {
		items: staticStores.slice(0, 6),
		total: staticStores.length,
	},
	error: undefined,
};

export async function fetchMarketplaceStores() {
	try {
		const result = await apiClient.stores.getAll(
			{ sort: 'featured_rating' },
			{ page: 1, limit: 6 }
		);

		if (result.error || !result.data?.items?.length)
			return fallback;

		return result;
	} catch {
		return fallback;
	}
}
