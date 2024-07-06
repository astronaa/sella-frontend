'use client';

import { HTMLAttributes, useEffect } from "react";
import { OrderProp } from "~/entities/order";
import { Button } from "~/shared/ui/kit/button";
import { Price } from "~/shared/ui/price";
import { EscrowCard } from "../Card";
import { useCreateEscrowAction } from "../../model/create/action";
import { PayloadPaymentToken } from "~/shared/api/client";
import { EscrowError } from "../../model/error";
import { useCallbackRef } from "~/shared/lib/use-callback-ref";

interface CardProps extends HTMLAttributes<HTMLDivElement>, OrderProp {
	method: PayloadPaymentToken;
	onActionFulfilled?: () => void;
	onActionRejected?: (error: EscrowError, retry: () => Promise<void>) => void;
	autoRun?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Card({ order, method, onActionFulfilled, onActionRejected, autoRun = true, ...props }: CardProps) {
	const action = useCreateEscrowAction(order);

	const onButtonClick = useCallbackRef(async () => {
		const tryExecute = async () => {
			try {
				if (action.status == 'idle')
					await action.execute(method);
				else if (action.status != 'loading')
					await action.continue?.(method);

				// onActionFulfilled?.(order.id);
			}
			catch (error) {
				if (error instanceof EscrowError)
					onActionRejected?.(error, tryExecute);
				else if (error instanceof Error)
					onActionRejected?.(new EscrowError('generic', error.message), tryExecute);
			}
		};

		tryExecute();
	});

	useEffect(() => {
		if(autoRun && action.status != 'loading' && action.status != 'done')
			onButtonClick();
	}, [autoRun, onButtonClick, action.status])

	return (
		<EscrowCard.Root {...props}>
			<EscrowCard.Title>Escrow</EscrowCard.Title>
			<EscrowCard.Wafer>
				<EscrowCard.WaferHeading>
					<span>Order has been created</span>
					<Price price={order.transaction.tokenAmount} />
				</EscrowCard.WaferHeading>

				<EscrowCard.WaferContent>
					Your order has been successfully created. We are currently awaiting the
					necessary procedures involving your cryptocurrency wallet to establish the
					escrow. If you encounter any issues, contact our support team.
				</EscrowCard.WaferContent>
			</EscrowCard.Wafer>

			<Button
				size='xl' colorPalette='gray'
				onClick={onButtonClick}
				disabled={action.status != 'idle'}
			>
				{({
					'idle': 'Confirm',
					'loading': 'Loading...',
					'approve-write': 'Writing transaction...',
					'approve-wait-receipt': 'Waiting for the transaction...',
					'escrow-write': 'Creating escrow...',
					'escrow-wait-receipt': 'Approving escrow...',
					'done': 'Done'
				})[action.status]}
			</Button>
		</EscrowCard.Root>
	);
}