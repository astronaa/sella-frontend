import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";
import { ProductId } from "~/shared/api/client"
import { queryClient } from "~/shared/config/query-client";

const QUERY_KEY = 'products'

interface GetFromStoreOptions {
	storeUrl: string,
	query: {
		page: number
		pageSize: number
		sort: "new" | "old" | "price_asc" | "price_desc" | "rating"
		query?: string
		minPrice?: number
		maxPrice?: number;
	},
}

export const getFromStoreOptions = ({ storeUrl, query }: GetFromStoreOptions) =>
	queryOptions({
		queryKey: [QUERY_KEY, query],
		queryFn: async () => {
			const { data, error } = await apiClient.stores.for(storeUrl).getProducts(query);

			if (error)
				throw error;

			return data;
		},
	})

export function useGetFromStore(args: GetFromStoreOptions) {
	return useQuery(getFromStoreOptions(args))
}

interface GetOneOptions {
	productId: ProductId
}

export const getGetOneOptions = ({ productId }: GetOneOptions) =>
	queryOptions({
		queryKey: [QUERY_KEY, { id: productId }],
		queryFn: async () => {
			const { data, error } = await apiClient.products.for(productId).get();

			if (error)
				throw error;

			return data;
		},
	})

export function useGetOne(args: GetOneOptions) {
	return useQuery(getGetOneOptions(args));
}

export function invalidateAll() {
	return queryClient.invalidateQueries({
		predicate: q => q.queryKey.includes(QUERY_KEY)
	})
}