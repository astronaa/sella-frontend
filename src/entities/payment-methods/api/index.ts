import { queryOptions, useQuery } from "@tanstack/react-query";
import { PaymentMethod, ProductId, apiClient } from "~/shared/api/client";
import { staticPaymentMethods } from "~/shared/static-data/payment-methods";

const QUERY_KEY = 'payment-methods';

export const getForProductOptions = (productId: ProductId) =>
	queryOptions<PaymentMethod[]>({
		queryKey: [QUERY_KEY, { productId }],
		queryFn: async () => {
			try {
				const { data, error } = await apiClient.products
					.for(productId)
					.getPaymentMethods();

				if (error)
					throw error;

				return data;
			} catch {
				// API unreachable: demo payment methods so checkout renders
				return staticPaymentMethods;
			}
		},
		staleTime: Infinity
	})

export function useGetForProduct(productId: ProductId) {
	return useQuery(getForProductOptions(productId))
}
