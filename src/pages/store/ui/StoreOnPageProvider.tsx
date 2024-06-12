'use client';

import { PropsWithChildren } from "react";
import { StoreProvider, storeQueries } from "~/entities/store";
import { Store } from "~/shared/api/model";

interface StoreOnPageProviderProps extends PropsWithChildren {
	storeInitialData: Store
}

export function StoreOnPageProvider({ storeInitialData, children }: StoreOnPageProviderProps) {
	const { data: store } = storeQueries.useGetOne({
		storeUrl: storeInitialData.shortName,
		initialData: storeInitialData,
		staleTime: Infinity
	})

	return (
		<StoreProvider store={store}>
			{children}
		</StoreProvider>
	);
}