'use client';

import { PropsWithChildren, createContext, useContext } from "react";
import { Product } from "~/shared/api/model";
import { invariant } from "~/shared/lib/asserts";
import { ProductProp } from "./Prop";

const context = createContext<Product | null>(null);

export function useProductContext() {
	return useContext(context);
}

export function useProductStrictContext() {
	const value = useProductContext();
	invariant(value, 'Usage useProductContext outside context');

	return value;
}

export function useProductContextOrProp(p?: Product) {
	const product = useProductContext() ?? p;
	invariant(!!product, 'Usage of product component outside context or without passed product prop');

	return product;
}

export function ProductProvider({ product, children }: PropsWithChildren<ProductProp>) {
	return (
		<context.Provider value={product}>
			{children}
		</context.Provider>
	)
}
