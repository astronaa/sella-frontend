import { queryOptions, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { apiClient } from "~/shared/api/client";
import { ProductId } from "~/shared/api/client"
import { queryClient } from "~/shared/config/query-client";

const QUERY_KEY = 'products'

export interface GetProductsQueryParams extends z.infer<typeof apiClient.stores.schemaGetProducts>{
	page: number,
	limit: number,
}
interface GetFromStoreOptions {
	storeUrl: string,
	query: GetProductsQueryParams,
}

export const getFromStoreOptions = ({ storeUrl, query }: GetFromStoreOptions) => {
	const {page, limit, ...rest} = query
	return queryOptions({
		queryKey: [QUERY_KEY, query],
		queryFn: async () => {
			const { data, error } = await apiClient.stores.for(storeUrl).getProducts({page, limit }, rest);

			if (error)
				throw error;

			return data;
		},
		placeholderData: (prev) => prev
	})
}


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

interface SearchOptions extends z.infer<typeof apiClient.products.schemaSearch> {
	page?: number,
	limit?: number,
}

export const getSearchOptions = ({ page = 1, limit = 10, ...payload }: SearchOptions) =>
	queryOptions({
		queryKey: [QUERY_KEY, { page, limit, ...payload }],
		queryFn: async () => {
			const { data, error } = await apiClient.products.search(payload, { page, limit });

			if (error)
				throw error;

			return data;
		},
	})

export function useSearch(args: SearchOptions) {
	return useQuery(getSearchOptions(args));
}

export function invalidateAll() {
	return queryClient.invalidateQueries({
		predicate: q => q.queryKey.includes(QUERY_KEY)
	})
}