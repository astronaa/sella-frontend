'use client';

import Link from "next/link";
import { useProductStrictContext } from "~/entities/product";
import { OrderCreateBaseCard } from "~/features/order/create";
import { Button } from "~/shared/ui/kit/button";

export function CheckoutWidget() {
	const product = useProductStrictContext();

	return (
		<OrderCreateBaseCard
			title='Choose Payment Method'
			product={product}
		>
			{value => (
				<div className="flex flex-col gap-4">
					<Button variant="solid" asChild>
						<Link href={`${product.id}/checkout?method=${value}&tab=order-actions`}>
							Checkout
						</Link>
					</Button>
					<Button colorPalette="gray" asChild>
						<Link href={`${product.id}/checkout?method=${value}&tab=chat`}>
							Chat with a seller
						</Link>
					</Button>
				</div>
			)}
		</OrderCreateBaseCard>
	)
}