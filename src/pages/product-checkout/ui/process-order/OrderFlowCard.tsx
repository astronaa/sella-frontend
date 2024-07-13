'use client';

import { useQuery } from "@tanstack/react-query";
import { ordersQueries } from "~/entities/order";
import { OrderEscrowCreateCard, OrderEscrowHoldingCard } from "~/features/order/escrow";
import { OrderId } from "~/shared/api/client";
import { Skeleton } from "~/shared/ui/kit/skeleton";
import { toaster } from "~/shared/ui/toaster";
import { useRegisterFlow } from "~/features/register";
import { useWatchAccount } from "~/shared/lib/wagmi";
import { useTronWalletConnectDialog } from "~/features/tron-wallet";
import { useRef } from "react";
import { useWatchTronAdapter } from "~/shared/lib/tronweb";

interface Props {
	orderId: OrderId,
}

export function OrderFlowCard({ orderId }: Props) {
	const { data: order, refetch, isFetching } = useQuery({
		...ordersQueries.getByIdOptions(orderId),
		staleTime: Infinity
	})

	const watchAccount = useWatchAccount();
	const openEthWalletDialog = useRegisterFlow(s => s.startFlow);
	const openTronWalletDialog = useTronWalletConnectDialog(s => s.setOpen);

	const tronRetryRef = useRef<(() => void) | null>(null);

	useWatchTronAdapter({
		onConnect: () => {
			tronRetryRef.current?.();
			tronRetryRef.current = null;
		}
	})

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
							openEthWalletDialog();

							watchAccount({
								once: true,
								onConnected: retry
							})

							break;
						case 'tron-not-found':
							openTronWalletDialog(true);
							tronRetryRef.current = retry;

							break;
						default:
							toaster.create({
								type: 'error',
								title: 'Payment error',
								description: error.message.split('\n')[0]
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