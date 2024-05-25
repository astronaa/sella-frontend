'use client';

import { useState } from "react";
import { OrderProp } from "~/entities/order";
import { OrderEscrowCard } from "~/features/order/escrow";
import { OrderLeaveReviewCard } from "~/features/order/leave-review";

export function OrderFlowCard({ order }: OrderProp) {
	const [showLeaveReview, setShowLeaveReview] = useState(false);

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