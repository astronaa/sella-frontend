'use client';

import { Payment, ProductProp } from "~/entities/product";

export function CheckoutWidget({ product }: ProductProp) {
	return (
		<Payment
			product={product}
			onCheckout={() => { 'use placeholder' }}
		/>
	)
}