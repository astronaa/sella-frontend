'use client';

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ordersQueries } from "~/entities/order";
import { OrderEscrowCard } from "~/features/order/escrow";
import { OrderLeaveReviewCard } from "~/features/order/leave-review";
import { OrderId } from "~/shared/api/client";
import { Skeleton } from "~/shared/ui/kit/skeleton";

export function OrderFlowCard({ orderId }: { orderId: OrderId }) {
	const { data: order } = useQuery({
		...ordersQueries.getByIdOptions(orderId),
		staleTime: Infinity
	})

	const [showLeaveReview, setShowLeaveReview] = useState(false);

	if(!order) {
		return (
			<Skeleton 
				loading={true}
				className='w-full h-[33.25rem] rounded-[1.25rem]'
			/>
		);
	}

	return showLeaveReview ? (
		<OrderLeaveReviewCard
			order={order}
			onActionFulfilled={() => setShowLeaveReview(false)}
			className='w-full'
		/>
	) : (
		<OrderEscrowCard
			order={order}
			onActionFulfilled={() => setShowLeaveReview(true)}
			className='w-full'
		/>
	);
}