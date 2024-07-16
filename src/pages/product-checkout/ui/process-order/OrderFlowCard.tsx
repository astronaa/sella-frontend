'use client';

import { OrderEscrowFlowCard } from "~/features/order/escrow";
import { OrderId } from "~/shared/api/client";
import { toaster } from "~/shared/ui/toaster";
import { useRegisterFlow } from "~/features/register";
import { useWatchAccount } from "~/shared/lib/wagmi";
import { useTronWalletConnectDialog } from "~/features/tron-wallet";
import { useRef } from "react";
import { useWatchTronAdapter } from "~/shared/lib/tronweb";
import { useRouter } from "next/navigation";
import { useUserGetQuery } from "~/entities/user";
import { PATH_DASHBOARD_SALES_PAGE, PATH_ORDER_REVIEW_PAGE } from "~/shared/config/urls";

interface Props {
	orderId: OrderId,
}

export function OrderFlowCard({ orderId }: Props) {
	const watchAccount = useWatchAccount();
	const openEthWalletDialog = useRegisterFlow(s => s.startFlow);
	const openTronWalletDialog = useTronWalletConnectDialog(s => s.setOpen);

	const router = useRouter();
	const tronRetryRef = useRef<(() => void) | null>(null);
	const { data: user } = useUserGetQuery();

	useWatchTronAdapter({
		onConnect: () => {
			tronRetryRef.current?.();
			tronRetryRef.current = null;
		}
	})

	return (
		<OrderEscrowFlowCard
			className='w-full'
			orderId={orderId}
			onActionFulfilled={order => {
				if(order.seller.username === user?.username)
					router.push(PATH_DASHBOARD_SALES_PAGE)
				else
					router.push(PATH_ORDER_REVIEW_PAGE(order))
			}}
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