

'use client';

import { Price } from "~/shared/ui/price";
import { EscrowCard } from "../Card";
import { OrderProp } from "~/entities/order";
import { dayJs } from "~/shared/lib/dayjs";
import { useInterval } from "usehooks-ts";

interface CreateStatusCardProps extends EscrowCard.RootProps, OrderProp { 
	onRequestRefetch?: () => void
}

export function CreateStatusCard({ order, onRequestRefetch, ...props }: CreateStatusCardProps) {
	const createdDate = dayJs(order.transaction.createdAt);
	const diff = dayJs().diff(createdDate, 'minutes');
	const shouldRequestRefetch = diff <= 5;

	useInterval(() => onRequestRefetch?.(), shouldRequestRefetch ? 1000 : null);

	return (
		<EscrowCard.Root {...props}>
			<EscrowCard.Title>Escrow</EscrowCard.Title>
			<EscrowCard.Wafer>
				<EscrowCard.WaferHeading>
					<span>Order has been created</span>
					<Price price={order.price} />
				</EscrowCard.WaferHeading>

				<EscrowCard.WaferContent>
					{`Order has been successfully created. We expect payment and 
					execution of the escrow creation procedure by the buyer`}
				</EscrowCard.WaferContent>
			</EscrowCard.Wafer>

			<span className='text-accent-100 text-end'>
				{createdDate.fromNow()}
			</span>
		</EscrowCard.Root>
	);
}