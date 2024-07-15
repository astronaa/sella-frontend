'use client';

import { useEffect } from "react";
import { Button } from "~/shared/ui/kit/button";
import { Price } from "~/shared/ui/price";
import { EscrowCard } from "../Card";
import { useCreateEscrowAction } from "../../model/create/action";
import { EscrowError } from "../../model/error";
import { useCallbackRef } from "~/shared/lib/use-callback-ref";
import { cn } from "~/shared/lib/cn";
import { ActionCallbacks, RetryFn } from "../FlowCard";
import { Stopwatch } from "../Stopwatch";
import { OrderProp } from "~/entities/order";

interface CreateCardProps extends ActionCallbacks, OrderProp, EscrowCard.RootProps {
	autoRun?: boolean;
}

export function CreateCard({ order, onActionFulfilled, onActionRejected, autoRun = true, ...props }: CreateCardProps) {
	const action = useCreateEscrowAction(order);

	const handleError = useCallbackRef((error: unknown, retryFn: RetryFn) => {
		if (error instanceof EscrowError)
			onActionRejected?.(error, retryFn);
		else if (error instanceof Error)
			onActionRejected?.(new EscrowError('generic', error.message), retryFn);
	});

	const onButtonClick = useCallbackRef(async () => {
		const tryExecute = async () => {
			try {
				if (action.execute)
					await action.execute();
				else if (action.continue)
					await action.continue();

				onActionFulfilled?.();
			}
			catch (error) {
				handleError(error, tryExecute);
			}
		};

		tryExecute();
	});

	useEffect(() => {
		if (autoRun && action.status != 'error' && (action.execute || action.continue))
			onButtonClick();
	}, [autoRun, onButtonClick, action.execute, action.continue, action.status])

	const getLabelTextByStatus = (status: typeof action.status) => {
		switch (status) {
			case 'error': return 'An error has occurred';
			case 'loading': return 'Loading...';
			case 'approve-write': return 'Writing transaction...';
			case 'approve-wait-receipt': return 'Waiting for the transaction...';
			case 'escrow-write': return 'Creating escrow...';
			case 'escrow-wait-receipt': return 'Approving escrow...';
			case 'done': return 'Done'
		}
	}

	const getButtonTextByStatus = (status: typeof action.status) => {
		switch (status) {
			case 'idle': return 'Confirm';
			case 'error': return 'Try Again';
			case 'done': return 'Operation was done';
			default: return 'Processing';
		}
	}

	return (
		<EscrowCard.Root {...props}>
			<EscrowCard.Title>Escrow</EscrowCard.Title>
			<EscrowCard.Wafer>
				<EscrowCard.WaferHeading>
					<span>Order has been created</span>
					<Price price={order.price} />
				</EscrowCard.WaferHeading>

				<EscrowCard.WaferContent>
					Your order has been successfully created. We are currently awaiting the
					necessary procedures involving your cryptocurrency wallet to establish the
					escrow. If you encounter any issues, contact our support team.
				</EscrowCard.WaferContent>
			</EscrowCard.Wafer>

			<div className='flex flex-col gap-[0.5rem]'>
				<div className='flex justify-between w-full pt-[1rem] gap-[1rem] text-black-74'>
					{action.status != 'idle' && (
						<>
							<span className={cn(action.status == 'error' && 'text-error-100')}>
								{getLabelTextByStatus(action.status)}
							</span>

							{!['error', 'done', 'loading'].includes(action.status) && (
								<Stopwatch
									key={action.status}
									className='text-accent-100'
								/>
							)}
						</>
					)}
				</div>

				{action.status == 'error' && (
					<span className='break-words text-black-40 max-h-[9rem] overflow-y-auto'>
						{action.errorMessage}
					</span>
				)}
			</div>

			<Button
				size='xl' colorPalette='gray'
				onClick={onButtonClick}
				disabled={!action.execute && !action.continue}
			>
				{getButtonTextByStatus(action.status)}
			</Button>
		</EscrowCard.Root>
	);
}