import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";
import { Product, ProductId } from "~/shared/api/model";
import { queryClient } from "~/shared/config/query-client";

const QUERY_KEY = 'products'

interface GetFromStoreQueryOptions {
	storeUrl: string,
	page?: number,
	limit?: number,
	initialData?: { items: Product[], total: number } | undefined
}

const getFromStoreQueryOptions = ({ storeUrl, page = 1, limit = 10, initialData }: GetFromStoreQueryOptions) =>
	queryOptions({
		queryKey: [QUERY_KEY, { page, storeUrl, limit }],
		queryFn: async () => {
			const { data, error } = await apiClient.stores.for(storeUrl).getProducts({ page, limit });

			if (error)
				throw error;

			return data;
		},
		initialData: initialData ?? { items: [], total: 0 },
		staleTime: 5000,
		initialDataUpdatedAt: 0
	})

export function useGetFromStore(args: GetFromStoreQueryOptions) {
	return useQuery({
		...getFromStoreQueryOptions(args)
	})
}

interface GetOneQueryOptions {
	productId: ProductId,
	initialData: Product,
	staleTime?: number
}

export function useGetOne({ productId, staleTime, initialData }: GetOneQueryOptions) {
	return useQuery({
		queryKey: [QUERY_KEY, { id: productId }],
		queryFn: async () => {
			const { data, error } = await apiClient.products.for(productId).get();

			if (error)
				throw error;

			return data;
		},
		staleTime,
		initialData,
	})
}

export function invalidateAll() {
	return queryClient.invalidateQueries({
		predicate: q => q.queryKey.includes(QUERY_KEY)
	})
}