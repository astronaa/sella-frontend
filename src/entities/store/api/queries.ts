import { queryOptions, useQuery } from "@tanstack/react-query"
import { apiClient } from "~/shared/api/client";
import { Store } from "~/shared/api/model"
import { queryClient } from "~/shared/config/query-client";

const QUERY_KEY = 'stores'

interface GetOneQueryOptions {
	storeUrl: string,
	initialData: Store,
	staleTime?: number
}

interface GetAllQueryOptions {
	initialData?: { items: Store[], total: number },
	staleTime?: number
	page: number
	limit: number
}

const getOneQueryOptions = ({ initialData, storeUrl, staleTime }: GetOneQueryOptions) =>
	queryOptions({
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

export function useGetOne(args: GetOneQueryOptions) {
	return useQuery(getOneQueryOptions(args))
}

const getAllQueryOptions = ({ initialData = { items: [], total: 0 }, page, limit, staleTime }: GetAllQueryOptions) =>
	queryOptions({
		queryKey: [QUERY_KEY, page],
		queryFn: async () => {
			const { data, error } = await apiClient.stores.getAll({ page, limit })

			if (error)
				throw error;

			return data;
		},
		initialData,
		staleTime
	})

export function useGetAll(args: GetAllQueryOptions) {
	return useQuery(getAllQueryOptions(args))
}

const getForUserQueryOptions = () =>
	queryOptions({
		queryKey: [QUERY_KEY],
		queryFn: async () => {
			const { data, error } = await apiClient.stores.getForCurrentUser();

			if (error)
				throw error;

			return data;
		},
	})

export function useGetForUser() {
	return useQuery(getForUserQueryOptions())
}

export function invalidateAll() {
	return queryClient.invalidateQueries({
		predicate: q => q.queryKey.includes(QUERY_KEY)
	})
}