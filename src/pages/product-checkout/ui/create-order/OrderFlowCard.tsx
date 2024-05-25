'use client';

import { useRouter } from "next/navigation";
import { ProductProp } from "~/entities/product";
import { OrderCreateCard } from "~/features/order/create";

export function OrderFlowCard({ product }: ProductProp) {
	const router = useRouter();

	return (
		<OrderCreateCard
			product={product}
			onActionFulfilled={() => router.push('/orders/1')}
			className='w-full'
		/>
	);
}