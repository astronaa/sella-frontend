import { apiClient } from "~/shared/api/client";

export async function fetchStore(storeUrl: string) {
	const { data, error } = await apiClient.stores.for(storeUrl).get();

	if (error)
		throw error;

	return data;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchSimilarStores(storeUrl: string) {
	const { data } = await apiClient.stores.getAll({ page: 1, limit: 2 });
	return data?.items ?? [];
}