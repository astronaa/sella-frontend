'use client';

import Link from "next/link";
import { useProductStrictContext } from "~/entities/product";
import { OrderCreateBaseCard } from "~/features/order/create";
import { objToSearchParams } from "~/shared/lib/search-params";
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
						<Link href={`${product.id}/checkout?${objToSearchParams({ tab: 'order-actions', ...value })}`}>
							Checkout
						</Link>
					</Button>
					<Button colorPalette="gray" asChild>
						<Link href={`${product.id}/checkout?${objToSearchParams({ tab: 'chat', ...value })}`}>
							Chat with a seller
						</Link>
					</Button>
				</div>
			)}
		</OrderCreateBaseCard>
	)
}