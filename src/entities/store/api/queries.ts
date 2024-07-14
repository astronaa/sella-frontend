import { queryOptions, useQuery } from "@tanstack/react-query"
import { z } from "zod";
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

interface GetAllQueryOptions extends PayloadPagination, z.infer<typeof apiClient.stores.schemaSearch> {
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
	...filters
}: GetAllQueryOptions) {
	return useQuery({
		queryKey: [QUERY_KEY, { page, limit, ...filters }],
		queryFn: async () => {
			const { data, error } = await apiClient.stores.getAll(filters, { page, limit })

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

export const getReportOptions = (storeUrl: string) =>
	queryOptions({
		queryKey: ['store-report', storeUrl],
		queryFn: async () => {
			const { data, error } = await apiClient.stores.for(storeUrl).getReport();

			if (error)
				throw error;

			return data;
		}
	})

export function invalidateReport(storeUrl: string) {
	return queryClient.invalidateQueries(getReportOptions(storeUrl));
}

export function useGetStoreReport(storeUrl: string) {
	return useQuery(getReportOptions(storeUrl))
}

export function invalidateAll() {
	return queryClient.invalidateQueries({
		predicate: q => q.queryKey.includes(QUERY_KEY)
	})
}
