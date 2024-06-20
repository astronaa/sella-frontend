'use client';

import { Product } from "~/shared/api/client"
import { createContextFactory } from "~/shared/lib/create-context-factory";

const create = createContextFactory('product');

export const {
	ProductProvider,
	useProductContext,
	useProductContextOrProp,
	useProductStrictContext
} = create<Product>();
