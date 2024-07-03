'use client';

import {
	OrderCreateCard,
	OrderCreatePayload
} from "~/features/order/create";

import { useTabsContext } from "@ark-ui/react";
import { useRouter } from "next/navigation";
import { ProductProp } from "~/entities/product";
import { toaster } from "~/shared/ui/toaster";
import { useRegisterFlow } from "~/widgets/register-flow";
import { useConfig } from "wagmi";
import { watchAccount } from '@wagmi/core'

interface Props extends ProductProp {
	method?: OrderCreatePayload
}

export function OrderFlowCard({ product, method }: Props) {
	const router = useRouter();
	const context = useTabsContext();
	const startFlow = useRegisterFlow(s => s.startFlow);
	const config = useConfig();

	return (
		<OrderCreateCard
			className='w-full'
			product={product}
			defaultValue={method}
			onActionFulfilled={orderId => (
				router.push(`/products/${product.id}/checkout/${orderId}?tab=${context.value}`)
			)}
			onActionRejected={async (error, retry) => {
				switch (error.cause) {
					case "eth-not-found":
						startFlow();

						const unsub = watchAccount(config, {
							onChange(account, prevAccount) {
								if (account.status === 'connected' && (
									prevAccount.status === 'reconnecting'
									|| (prevAccount.status === 'connecting' && prevAccount.address === undefined)
								)) {
									unsub(); 
									retry();
								}
							},
						});
						break;

					default:
						toaster.create({
							type: 'error',
							title: 'Payment error',
							description: error.message
						})
				}
			}}
		/>
	);
}