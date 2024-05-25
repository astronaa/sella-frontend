'use client';

import { useTabsContext } from "@ark-ui/react";
import { useRouter } from "next/navigation";
import { ProductProp } from "~/entities/product";
import { OrderCreateCard } from "~/features/order/create";

export function OrderFlowCard({ product }: ProductProp) {
	const router = useRouter();
	const context = useTabsContext();

	return (
		<OrderCreateCard
			product={product}
			onActionFulfilled={() => router.push(`/orders/1?tab=${context.value}`)}
			className='w-full'
		/>
	);
}