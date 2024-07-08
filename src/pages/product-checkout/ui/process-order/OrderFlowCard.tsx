'use client';

import { useQuery } from "@tanstack/react-query";
import { ordersQueries } from "~/entities/order";
import { OrderEscrowCreateCard, OrderEscrowHoldingCard } from "~/features/order/escrow";
import { OrderId } from "~/shared/api/client";
import { Skeleton } from "~/shared/ui/kit/skeleton";
import { toaster } from "~/shared/ui/toaster";
import { useRegisterFlow } from "~/widgets/register-flow";
import { useWatchAccount } from "~/shared/lib/wagmi";

interface Props {
	orderId: OrderId,
}

export function OrderFlowCard({ orderId }: Props) {
	const { data: order, refetch, isFetching } = useQuery({
		...ordersQueries.getByIdOptions(orderId),
		staleTime: Infinity
	})

	const watchAccount = useWatchAccount();
	const startFlow = useRegisterFlow(s => s.startFlow);

	if (isFetching || !order) {
		return (
			<Skeleton
				loading={true}
				className='w-full h-[22.5rem] rounded-[1.25rem]'
			/>
		);
	}

	if (order.transaction.status == 'Unpaid') {
		return (
			<OrderEscrowCreateCard
				className='w-full'
				order={order}
				onActionFulfilled={refetch}
				onActionRejected={(error, retry) => {
					switch (error.cause) {
						case "eth-not-found":
							startFlow();

							watchAccount({
								once: true,
								onConnected: retry
							})

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

	return (
		<OrderEscrowHoldingCard
			className='w-full'
			order={order}
		/>
	);
}