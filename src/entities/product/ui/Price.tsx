'use client';

import { useProductContextOrProp } from "../model/context";
import { ProductProp } from "./Prop";
import { Price as BasePrice, PriceProps } from "~/shared/ui/price";

export function Price({ product: p, ...props }: Omit<PriceProps, 'price'> & Partial<ProductProp>) {
	const { price } = useProductContextOrProp(p);

	if(price === undefined)
		return null;

	return <BasePrice price={price} {...props} />
}