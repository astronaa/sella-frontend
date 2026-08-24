import { apiClient } from "~/shared/api/client";
import { staticStoreByUrl, staticStores } from "~/shared/static-data/marketplace";

export async function fetchStore(storeUrl: string) {
	try {
		const { data, error } = await apiClient.stores.for(storeUrl).get();

		if (error)
			throw error;

		return data;
	} catch (err) {
		const fallback = staticStoreByUrl(storeUrl);
		if (fallback) return fallback;

		throw err;
	}
}

export async function fetchSimilarStores(storeUrl: string) {
	try {
		const { data } = await apiClient.stores.getAll({ sort: 'rating' }, { page: 1, limit: 2 });
		const items = data?.items ?? [];

		if (items.length) return items;
	} catch {
		// fall through to demo data
	}

	return staticStores.filter(s => s.url !== storeUrl).slice(0, 2);
}
