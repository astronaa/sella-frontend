'use client';

import { OrderId } from "~/shared/api/client";
import { OrderLeaveReviewCard } from "~/features/order/leave-review";
import { useRouter } from "next/navigation";

interface Props {
	orderId: OrderId
}

export function LeaveReviewFlowCard({ orderId }: Props) {
	const router = useRouter();

	return (
		<OrderLeaveReviewCard
			orderId={orderId}
			className='w-full'
			onActionFulfilled={() => router.push('/dashboard/orders')}
		/>
	);
}