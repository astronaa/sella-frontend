import { ITEMS_PER_PAGE } from "~/pages/marketplace/config";
import { staticStores } from "~/shared/static-data/marketplace";
import type { Store } from "~/shared/api/client";

export interface StoresInitialData {
	items: Store[];
	total: number;
}

export async function fetchMarketplaceStores(page = 1): Promise<StoresInitialData> {
	if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
		const start = (page - 1) * ITEMS_PER_PAGE;
		const end = start + ITEMS_PER_PAGE;

		return {
			items: staticStores.slice(start, end),
			total: staticStores.length,
		};
	}

	const { apiClient } = await import("~/shared/api/client");
	const { data, error } = await apiClient.stores.getAll(
		{ sort: 'featured_rating' }, 
		{ page, limit: ITEMS_PER_PAGE }
	);

	if (error)
		throw error;

	return data;
}
