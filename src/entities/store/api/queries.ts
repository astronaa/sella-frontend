import { useQuery } from "@tanstack/react-query"
import { apiClient } from "~/shared/api/client";
import { PayloadPagination } from "~/shared/api/client"
import { Store } from "~/shared/api/client"
import { queryClient } from "~/shared/config/query-client";
import {z} from "zod";

const QUERY_KEY = 'stores'

interface GetOneQueryOptions {
	storeUrl: string,
	initialData: Store,
	staleTime?: number
}

interface GetAllQueryOptions extends PayloadPagination {
	initialData?: { items: Store[], total: number }
}

export interface GetForExploreQueryParams extends z.infer<typeof apiClient.stores.schemaGetProducts>{
	page: number,
	limit: number,
}
interface GetForExploreOptions{
	query: GetForExploreQueryParams
	initialData?: { items: Store[], total: number }
}

export function useGetOne({ initialData, storeUrl, staleTime }: GetOneQueryOptions) {
	return useQuery({
		queryKey: [QUERY_KEY, storeUrl],
		queryFn: async () => {
			const { data, error } = await apiClient.stores.for(storeUrl).get()

			if (error)
				throw error;

			return data;
		},
		initialData,
		staleTime
	})
}

export function useGetAll({ 
	page, limit,
	initialData = { items: [], total: 0 }, 
}: GetAllQueryOptions) {
	return useQuery({
		queryKey: [QUERY_KEY, page],
		queryFn: async () => {
			const { data, error } = await apiClient.stores.getAll({ page, limit })

			if (error)
				throw error;

			return data;
		},
		initialData,
		staleTime: 5000,
		initialDataUpdatedAt: 0
	})
}

export function useGetForUser() {
	return useQuery({
		queryKey: [QUERY_KEY],
		queryFn: async () => {
			const { data, error } = await apiClient.stores.getForCurrentUser();

			if (error)
				throw error;

			return data;
		},
	})
}

export function useGetForExplore({
	initialData = { items: [], total: 0 },
	query
}: GetForExploreOptions) {
	const {page, limit, ...rest} = query
	return useQuery({
		queryKey: [QUERY_KEY, 'explore', query],
		queryFn: async () => {
			const { data, error } = await apiClient.stores.getForExplore({page, limit}, rest)

			if (error)
				throw error;

			return data;
		},
		initialData,
		staleTime: 5000,
		initialDataUpdatedAt: 0
	})
}

export function invalidateAll() {
	return queryClient.invalidateQueries({
		predicate: q => q.queryKey.includes(QUERY_KEY)
	})
}