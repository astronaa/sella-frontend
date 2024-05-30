import { apiClient } from "~/shared/api/client";
import { PRODUCT_ITEMS_PER_PAGE } from "~/pages/store/config";

export async function fetchStore(storeUrl: string) {
	const { data, error } = await apiClient.stores.for(storeUrl).get();
	if(error)
		throw error;

	return data;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchSimilarStores(storeUrl: string) {
	const { data } = await apiClient.stores.getAll({ page: 1, limit: 2 });
	return data?.items ?? [];
}

export async function fetchStoreProducts(storeUrl: string) {
	const { data } = await apiClient.stores
		.for(storeUrl)
		.getProducts({ page: 1, limit: PRODUCT_ITEMS_PER_PAGE })

	return data;
}
