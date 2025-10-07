"use client";

import { OrderProp } from "~/entities/order";
import { Price } from "~/shared/ui/price";
import { EscrowCard } from "../Card";
import { ActionCallbacks } from "../FlowCard";
import { AutomaticEscrowTimer } from "./AutomaticEscrowTimer";
import { ClaimPaymentControl } from "./ClaimPaymentControl";

interface SellerHoldCardProps
  extends ActionCallbacks,
    OrderProp,
    EscrowCard.RootProps {
  onRequestRefetch?: () => void;
}

export function SellerHoldCard({
  order,
  onActionFulfilled,
  onActionRejected,
  onRequestRefetch,
  ...props
}: SellerHoldCardProps) {
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
          Payment received! The buyer&apos;s funds are secured in escrow.
          Complete the order and you&apos;ll be able to claim your payment.
          Funds automatically release to you in {holdHours} hours unless the
          buyer opens a dispute.
        </EscrowCard.WaferContent>
      </EscrowCard.Wafer>

      {holdEndingAt && <AutomaticEscrowTimer holdEndingAt={holdEndingAt} />}

      <ClaimPaymentControl
        order={order}
        onActionFulfilled={onActionFulfilled}
        onActionRejected={onActionRejected}
        onRequestRefetch={onRequestRefetch}
      />

      {/* <Button variant='subtle' colorPalette='red' size='xl'>
				Open Dispute
			</Button> */}
    </EscrowCard.Root>
  );
}
