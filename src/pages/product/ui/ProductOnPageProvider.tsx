'use client';

import { PropsWithChildren } from "react";
import { Product } from "~/shared/api/model";
import { ProductProvider, productQueries } from "~/entities/product";

interface ProductOnPageProviderProps extends PropsWithChildren {
	initialData: Product
}

export function ProductOnPageProvider({ initialData, children }: ProductOnPageProviderProps) {
	const { data: product } = productQueries.useGetOne({
		productId: initialData.id,
		initialData,
		staleTime: Infinity
	})

	return (
		<ProductProvider value={product}>
			{children}
		</ProductProvider>
	);
}