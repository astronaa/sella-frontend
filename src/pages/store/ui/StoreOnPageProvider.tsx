'use client';

import { PropsWithChildren } from "react";
import { StoreProvider, storeQueries } from "~/entities/store";
import { Store } from "~/shared/api/model";

interface StoreOnPageProviderProps extends PropsWithChildren {
	initialData: Store
}

export function StoreOnPageProvider({ initialData, children }: StoreOnPageProviderProps) {
	const { data: store } = storeQueries.useGetOne({
		storeUrl: initialData.url,
		initialData,
		staleTime: Infinity
	})

	return (
		<StoreProvider value={store}>
			{children}
		</StoreProvider>
	);
}