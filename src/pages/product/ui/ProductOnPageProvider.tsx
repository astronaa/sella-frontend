'use client';

import { PropsWithChildren } from "react";
import { ProductProvider, productQueries } from "~/entities/product";
import { ProductInitialData } from "../api";
import { useQuery } from "@tanstack/react-query";

interface ProductOnPageProviderProps extends PropsWithChildren {
	initialData: ProductInitialData
}

export function ProductOnPageProvider({ initialData, children }: ProductOnPageProviderProps) {
	const { data: product } = useQuery({
		...productQueries.getGetOneOptions({
			productId: initialData.id,
		}),
		initialData,
		staleTime: Infinity
	})

	return (
		<ProductProvider value={product}>
			{children}
		</ProductProvider>
	);
}