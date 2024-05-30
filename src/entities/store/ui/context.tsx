'use client';

import { createContext, useContext } from "react";
import { Store } from "~/shared/api/model";
import { invariant } from "~/shared/lib/asserts";

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

export const StoreProvider = context.Provider;