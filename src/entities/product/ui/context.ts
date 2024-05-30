'use client';

import { createContext, useContext } from "react";
import { Product } from "~/shared/api/model";
import { invariant } from "~/shared/lib/asserts";

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

export const ProductProvider = context.Provider;
