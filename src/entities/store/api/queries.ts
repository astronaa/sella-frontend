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

export function invalidateAll() {
	return queryClient.invalidateQueries({
		predicate: q => q.queryKey.includes(QUERY_KEY)
	})
}