import { Order } from "~/shared/api/client";
import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";
import { queryClient } from "~/shared/config/query-client";

const QUERY_KEY = 'orders'

interface GetOrdersOptions {
	page: number,
	limit: number,
	initialData?: { items: Order[], total: number, totalPrice: number } | undefined
}

export const getOrdersOptions = ({ page, limit, initialData }: GetOrdersOptions) =>
	queryOptions({
		queryKey: [QUERY_KEY, page, { limit }],
		queryFn: async () => {
			const { data, error } = await apiClient.orders.getAll({ page, limit });

			if (error)
				throw error;

			return data;
		},
		initialData: initialData ?? { items: [], total: 0, totalPrice: 0 },
		staleTime: 5000,
		initialDataUpdatedAt: 0,
		placeholderData: keepPreviousData
	})

export function useGetOrders(args: GetOrdersOptions) {
	return useQuery(getOrdersOptions(args))
}

export function invalidateAll() {
	return queryClient.invalidateQueries({
		predicate: q => q.queryKey.includes(QUERY_KEY)
	})
}