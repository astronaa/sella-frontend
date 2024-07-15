'use client';

import { OrderProp } from "~/entities/order";
import { Price } from "~/shared/ui/price";
import { EscrowCard } from "../Card";
import { ActionCallbacks } from "../FlowCard";
import { AutomaticEscrowTimer } from "./AutomaticEscrowTimer";
import { ClaimPaymentButton } from "./ClaimPaymentButton";

interface SellerHoldCardProps extends ActionCallbacks, OrderProp, EscrowCard.RootProps { }

export function SellerHoldCard({ order, ...props }: SellerHoldCardProps) {
	const { holdEndingAt } = order.transaction;
	const holdHours = order.transaction.holdPeriod * 24;

	return (
		<EscrowCard.Root {...props}>
			<EscrowCard.Title>Escrow</EscrowCard.Title>
			<EscrowCard.Wafer>
				<EscrowCard.WaferHeading>
					<span>Order has been paid</span>
					<Price price={order.price} />
				</EscrowCard.WaferHeading>

				<EscrowCard.WaferContent>
					The seller has been notified of your payment. Once they confirm fulfilment of your order, you will be notified.
					Please review and release the funds within {holdHours} hours of receiving the item or service. If you do not release
					the funds, they will be automatically released unless you initiate a dispute.
				</EscrowCard.WaferContent>
			</EscrowCard.Wafer>

			{holdEndingAt && (
				<AutomaticEscrowTimer
					holdEndingAt={holdEndingAt}
				/>
			)}

			<ClaimPaymentButton order={order}>
				Claim payment
			</ClaimPaymentButton>

			{/* <Button variant='subtle' colorPalette='red' size='xl'>
				Open Dispute
			</Button> */}
		</EscrowCard.Root>
	);
}