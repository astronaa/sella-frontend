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

interface Props {
	orderId: OrderId,
}

export function OrderFlowCard({ orderId }: Props) {
	const watchAccount = useWatchAccount();
	const openEthWalletDialog = useRegisterFlow(s => s.startFlow);
	const openTronWalletDialog = useTronWalletConnectDialog(s => s.setOpen);

	const router = useRouter();
	const tronRetryRef = useRef<(() => void) | null>(null);

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
			onActionFulfilled={o => router.push(`/products/${o.product.id}/checkout/${o.id}/review`)}
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