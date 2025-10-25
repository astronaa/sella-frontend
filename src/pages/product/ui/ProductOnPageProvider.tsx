'use client';

import { PropsWithChildren } from "react";
import { ProductProvider, productQueries } from "~/entities/product";
import { ProductInitialData } from "../api";
import { useQuery } from "@tanstack/react-query";

interface ProductOnPageProviderProps extends PropsWithChildren {
	initialData: ProductInitialData
}

export function ProductOnPageProvider({ initialData, children }: ProductOnPageProviderProps) {
	const { data: product = initialData } = useQuery({
		...productQueries.getGetOneOptions({
			productId: initialData.id,
		}),
		staleTime: 0, // Always stale
		refetchOnMount: true, // Always refetch on mount
		// Don't use initialData to avoid hydration mismatch
		// Use default parameter instead (product = initialData)
	})

	return (
		<ProductProvider value={product}>
			{children}
		</ProductProvider>
	);
}