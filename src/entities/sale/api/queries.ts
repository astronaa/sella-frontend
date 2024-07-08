import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";
import { queryClient } from "~/shared/config/query-client";

const QUERY_KEY = 'sales'

interface GetSalesOptions {
	page: number,
	limit: number
}

export const getSalesOptions = ({ page, limit }: GetSalesOptions) =>
	queryOptions({
		queryKey: [QUERY_KEY, page, { limit }],
		queryFn: async () => {
			const { data, error } = await apiClient.sales.getAll({ page, limit });

			if (error)
				throw error;

			return data;
		}
	})

export function useGetSales(args: GetSalesOptions) {
	return useQuery(getSalesOptions(args))
}

export function invalidateAll() {
	return queryClient.invalidateQueries({
		predicate: q => q.queryKey.includes(QUERY_KEY)
	})
}