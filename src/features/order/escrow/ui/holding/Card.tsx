'use client';

import { HTMLAttributes } from "react";
import { OrderProp } from "~/entities/order";
import { Button } from "~/shared/ui/kit/button";
import { Price } from "~/shared/ui/price";
import { EscrowCard } from "../Card";

export function Card({ order, ...props }: HTMLAttributes<HTMLDivElement> & OrderProp) {
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
					Please review and release the funds within 24 hours of receiving the item or service. If you do not release
					the funds, they will be automatically released unless you initiate a dispute.
				</EscrowCard.WaferContent>
			</EscrowCard.Wafer>

			<div className='flex justify-between w-full pt-[1rem] gap-[1rem] text-black-74'>
				<span>Automatic Escrow</span>
				<span className='text-accent-100'>23:59:14</span>
			</div>

			<Button size='xl'>
				Release payment to seller
			</Button>

			<Button variant='subtle' colorPalette='red' size='xl'>
				Open Dispute
			</Button>
		</EscrowCard.Root>
	);
}