import { Order } from "~/shared/api/model";
import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";
import { queryClient } from "~/shared/config/query-client";

const QUERY_KEY = 'orders'

interface GetOrdersQueryOptions {
	page: number,
	limit: number,
	initialData?: { items: Order[], total: number, totalPrice: number } | undefined
}

const getOrdersQueryOptions = ({ page, limit, initialData }: GetOrdersQueryOptions) =>
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

export function useGetOrders(args: GetOrdersQueryOptions) {
	return useQuery({
		...getOrdersQueryOptions(args)
	})
}

export function invalidateAll() {
	return queryClient.invalidateQueries({
		predicate: q => q.queryKey.includes(QUERY_KEY)
	})
}