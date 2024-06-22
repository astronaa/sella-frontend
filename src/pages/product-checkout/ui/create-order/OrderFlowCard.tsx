'use client';

import { useTabsContext } from "@ark-ui/react";
import { useRouter } from "next/navigation";
import { ProductProp } from "~/entities/product";

import { 
	OrderCreateCard, 
	OrderCreatePayload 
} from "~/features/order/create";

interface Props extends ProductProp {
	method?: OrderCreatePayload
}

export function OrderFlowCard({ product, method }: Props) {
	const router = useRouter();
	const context = useTabsContext();

	return (
		<OrderCreateCard
			product={product}
			onActionFulfilled={() => router.push(`/orders/1?tab=${context.value}`)}
			className='w-full'
			defaultValue={method}
		/>
	);
}