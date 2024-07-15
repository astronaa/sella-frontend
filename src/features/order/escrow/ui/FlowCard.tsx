'use client';

import { EscrowError } from "../model/error";
import { useUserGetQuery } from "~/entities/user";
import { Order, OrderId } from "~/shared/api/client";
import { Skeleton } from "~/shared/ui/kit/skeleton";
import { ordersQueries } from "~/entities/order";
import { useQuery } from "@tanstack/react-query";
import { CreateCard } from "./create/Card";
import { BuyerHoldCard } from "./holding/BuyerCard";
import { EscrowCard } from "./Card";
import { CreateStatusCard } from "./create/StatusCard";
import { SellerHoldCard } from "./holding/SellerCard";

export type RetryFn = () => Promise<void>;

export interface ActionCallbacks {
	onActionFulfilled?: () => void;
	onActionRejected?: (error: EscrowError, retry: RetryFn) => void;
}

export interface FlowCardProps extends EscrowCard.RootProps, Omit<ActionCallbacks, 'onActionFulfilled'> {
	onActionFulfilled?: (order: Order) => void,
	orderId: OrderId
}

export function FlowCard({
	orderId, onActionFulfilled, ...props
}: FlowCardProps) {
	const { data: user } = useUserGetQuery();
	const { data: order, refetch } = useQuery({
		...ordersQueries.getByIdOptions(orderId),
		staleTime: Infinity
	})

	if (!order || !user) {
		return (
			<Skeleton
				loading={true}
				className='w-full h-[22.5rem] rounded-[1.25rem]'
			/>
		);
	}

	const propaginate = () => onActionFulfilled?.(order);

	if (order.seller.username != user.username) {
		switch (order.transaction.status) {
			case 'Unpaid': return (
				<CreateCard
					order={order}
					{...props}
					onActionFulfilled={refetch}
				/>
			)
			case 'Hold': return (
				<BuyerHoldCard
					order={order}
					onActionFulfilled={propaginate}
					{...props}
				/>
			)
		}
	}
	else {
		switch (order.transaction.status) {
			case 'Unpaid': return (
				<CreateStatusCard
					order={order}
					onRequestRefetch={refetch}
					{...props}
				/>
			)
			case 'Hold': return (
				<SellerHoldCard
					order={order}
					onActionFulfilled={propaginate}
					{...props}
				/>
			)
		}
	}

	return null;
}