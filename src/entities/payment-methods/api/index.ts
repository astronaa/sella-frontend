import { queryOptions, useQuery } from "@tanstack/react-query";
import { PaymentMethod, ProductId, apiClient } from "~/shared/api/client";

const QUERY_KEY = 'payment-methods';

export const getForProductOptions = (productId: ProductId) =>
	queryOptions<PaymentMethod[]>({
		queryKey: [QUERY_KEY, { productId }],
		queryFn: async () => {
			const { data, error } = await apiClient.products
				.for(productId)
				.getPaymentMethods();

			if (error)
				throw error;

			return data;
		},
		staleTime: Infinity
	})

export function useGetForProduct(productId: ProductId) {
	return useQuery(getForProductOptions(productId))
}
