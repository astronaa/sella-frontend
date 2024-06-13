import { Sale } from "~/shared/api/model";
import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";
import { queryClient } from "~/shared/config/query-client";

const QUERY_KEY = 'sales'

interface GetSalesQueryOptions {
	page: number,
	limit: number,
	initialData?: { items: Sale[], total: number, totalPrice: number } | undefined
}

const getSalesQueryOptions = ({ page, limit, initialData }: GetSalesQueryOptions) =>
	queryOptions({
		queryKey: [QUERY_KEY, page, { limit }],
		queryFn: async () => {
			const { data, error } = await apiClient.sales.getAll({ page, limit });

			if (error)
				throw error;

			return data;
		},
		initialData: initialData ?? { items: [], total: 0, totalPrice: 0 },
		staleTime: 5000,
		initialDataUpdatedAt: 0,
		placeholderData: keepPreviousData
	})

export function useGetSales(args: GetSalesQueryOptions) {
	return useQuery({
		...getSalesQueryOptions(args)
	})
}

export function invalidateAll() {
	return queryClient.invalidateQueries({
		predicate: q => q.queryKey.includes(QUERY_KEY)
	})
}