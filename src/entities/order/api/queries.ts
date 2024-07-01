import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";
import { queryClient } from "~/shared/config/query-client";

const QUERY_KEY = 'orders'

interface GetOrdersOptions {
	page: number,
	limit: number
}

export const getOrdersOptions = ({ page, limit }: GetOrdersOptions) =>
	queryOptions({
		queryKey: [QUERY_KEY, page, { limit }],
		queryFn: async () => {
			const { data, error } = await apiClient.orders.getAll({ page, limit });

			if (error)
				throw error;

			return data;
		}
	})

export function useGetOrders(args: GetOrdersOptions) {
	return useQuery(getOrdersOptions(args))
}

export function invalidateAll() {
	return queryClient.invalidateQueries({
		predicate: q => q.queryKey.includes(QUERY_KEY)
	})
}