import { apiClient } from "~/shared/api/client";
import { ITEMS_PER_PAGE } from "~/pages/marketplace/config";
import { staticStores } from "~/shared/static-data/marketplace";

export async function fetchMarketplaceStores(page = 1) {
	try {
		const { data, error } = await apiClient.stores.getAll(
			{ sort: 'featured_rating' },
			{ page, limit: ITEMS_PER_PAGE }
		);

		if (error)
			throw error;

		return data;
	} catch {
		const start = (page - 1) * ITEMS_PER_PAGE;

		return {
			items: staticStores.slice(start, start + ITEMS_PER_PAGE),
			total: staticStores.length,
		};
	}
}

export type StoresInitialData = Awaited<ReturnType<typeof fetchMarketplaceStores>>;
