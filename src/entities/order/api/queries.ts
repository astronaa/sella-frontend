import { queryOptions, useQuery } from "@tanstack/react-query";
import { OrderId, apiClient } from "~/shared/api/client";
import { queryClient } from "~/shared/config/query-client";

const QUERY_KEY = 'orders'

interface GetOrdersOptions {
	page: number,
	limit: number
}

export const getOrdersOptions = ({ page, limit }: GetOrdersOptions) =>
	queryOptions({
		queryKey: [QUERY_KEY, { page, limit }],
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

export const getByIdOptions = (orderId: OrderId) =>
	queryOptions({
		queryKey: [QUERY_KEY, orderId],
		queryFn: async () => {
			const { data, error } = await apiClient.orders.for(orderId).get();

			if (error)
				throw error;

			return data;
		}
	})

export function useGetById(orderId: OrderId) {
	return useQuery(getByIdOptions(orderId))
}

export const getReviewOptions = (orderId: OrderId) =>
	queryOptions({
		queryKey: [`${QUERY_KEY}-review`, orderId],
		queryFn: async () => {
			const { data, error } = await apiClient.orders.for(orderId).getReview();

			if (error)
				throw error;

			return data;
		}
	})

export function invalidateAll() {
	return queryClient.invalidateQueries({
		predicate: q => q.queryKey.includes(QUERY_KEY)
	})
}