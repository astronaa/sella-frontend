import { useQuery } from "@tanstack/react-query"
import { apiClient } from "~/shared/api/client";
import { PayloadPagination } from "~/shared/api/client"
import { Store } from "~/shared/api/client"
import { queryClient } from "~/shared/config/query-client";

const QUERY_KEY = 'stores'

interface GetOneQueryOptions {
	storeUrl: string,
	initialData: Store,
	staleTime?: number
}

interface GetAllQueryOptions extends PayloadPagination {
	initialData?: { items: Store[], total: number }
}

type GetForExploreQueryOptions = GetAllQueryOptions;

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

export function useGetStoreReport({ store }: { store: Store }) {
	return useQuery({
		queryKey: ['store_report', store.url],
		queryFn: async () => {
			const { data, error } = await apiClient.stores.for(store.url).getReport();

			if (error)
				throw error;

			return data;
		},
	})
}

export function useGetForExplore({
	page, limit,
	initialData = { items: [], total: 0 },
}: GetForExploreQueryOptions) {
	return useQuery({
		queryKey: [QUERY_KEY, 'explore', page],
		queryFn: async () => {
			const { data, error } = await apiClient.stores.getForExplore({ page, limit })

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
