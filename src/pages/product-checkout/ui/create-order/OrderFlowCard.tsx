'use client';

import { OrderCreateCard } from "~/features/order/create";
import { useTabsContext } from "@ark-ui/react";
import { useRouter } from "next/navigation";
import { ProductProp } from "~/entities/product";
import { objToSearchParams } from "~/shared/lib/search-params";
import { toaster } from "~/shared/ui/toaster";
import { PayloadPaymentToken } from "~/shared/api/client";

interface Props extends ProductProp {
	method: PayloadPaymentToken
}

export function OrderFlowCard({ product, method }: Props) {
	const router = useRouter();
	const { value: tab } = useTabsContext();

	return (
		<OrderCreateCard
			className='w-full'
			product={product}
			defaultValue={method}
			onActionFulfilled={(orderId, method) => {
				if (method)
					router.push(`/products/${product.id}/checkout/${orderId}?tab=${tab}&${objToSearchParams(method)}`)
			}}
			onActionRejected={async error => {
				toaster.create({
					type: 'error',
					title: 'Payment error',
					description: error.message
				})
			}}
		/>
	);
}