import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { apiClient } from "~/shared/api/client";
import { Review } from "~/shared/api/client"
import { ProductId } from "~/shared/api/client"
import { queryClient } from "~/shared/config/query-client";

const QUERY_KEY = 'reviews'

interface GetFromStoreQueryOptions {
	productId: ProductId,
	initialPage: number,
	limit: number,
	initialData?: { items: Review[], total: number } | undefined,
	sort: typeof apiClient.reviews.sortTypes[number]
}

const getForProductQueryOptions = ({
	productId, initialPage, limit, initialData, ...params
}: GetFromStoreQueryOptions) =>
	infiniteQueryOptions({
		queryKey: [QUERY_KEY, { productId, limit, ...params }],
		queryFn: async ({ pageParam }) => {
			const { data, error } = await apiClient.reviews
				.forProduct(productId)
				.getAll(params, { page: pageParam, limit });

			if (error)
				throw error;

			return data;
		},
		initialPageParam: initialPage,
		getNextPageParam: (lastPage, pages, lastPageParam) => 
			(lastPageParam * limit < lastPage.total) ? (lastPageParam + 1) : null,
		placeholderData: {
			pages: [initialData ?? { items: [], total: 0 }],
			pageParams: [1]
		},
		staleTime: Infinity
	})

export function useGetForProduct(args: GetFromStoreQueryOptions) {
	return useInfiniteQuery({
		...getForProductQueryOptions(args)
	})
}

export function invalidateAll() {
	return queryClient.invalidateQueries({
		predicate: q => q.queryKey.includes(QUERY_KEY)
	})
}

export const utils = {
	useSortState: useState<GetFromStoreQueryOptions['sort']>
}