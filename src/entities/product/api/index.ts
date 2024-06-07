import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";
import { Product } from "~/shared/api/model";
import { queryClient } from "~/shared/config/query-client";

interface PagedQueryOptions {
	storeUrl: string,
	page: number,
	limit: number,
	initialData?: { items: Product[], total: number } | undefined
}

const pagedQueryOptions = ({ storeUrl, page, limit, initialData }: PagedQueryOptions) =>
	queryOptions({
		queryKey: ['products', page, { storeUrl, limit }],
		queryFn: async () => {
			const { data, error } = await apiClient.stores.for(storeUrl).getProducts({ page, limit });

			if (error)
				throw error;

			return data;
		},
		initialData: initialData ?? { items: [], total: 0 }
	})

export function usePaged(args: PagedQueryOptions) {
	return useQuery(pagedQueryOptions(args))
}

export function invalidatePaged() {
	queryClient.invalidateQueries({
		predicate: q => q.queryKey.includes('products')
	})
}