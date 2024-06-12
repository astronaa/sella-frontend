'use client';

import { PropsWithChildren, createContext, useContext } from "react";
import { Store } from "~/shared/api/model";
import { invariant } from "~/shared/lib/asserts";
import { StoreProp } from "./Prop";

const context = createContext<Store | null>(null);

export function useStoreContext() {
	return useContext(context)
}

export function useStoreStrictContext() {
	const value = useStoreContext();
	invariant(value, "Usage useComponentContext outside context");

	return value;
}

export function useStoreContextOrProp(s?: Store) {
	const product = useStoreContext() ?? s;
	invariant(!!product, 'Usage of store component outside context or without passed store prop');

	return product;
}

export function StoreProvider({ store, children }: PropsWithChildren<StoreProp>) {
	return (
		<context.Provider value={store}>
			{children}
		</context.Provider>
	)
}
