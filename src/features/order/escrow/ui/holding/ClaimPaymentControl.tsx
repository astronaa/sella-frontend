'use client';

import { OrderProp } from "~/entities/order";
import { Button } from "~/shared/ui/kit/button";
import { useClaimEscrowAction } from "../../model/claim/action";
import { ActionCallbacks } from "../FlowCard";
import { EscrowError } from "../../model/error";
import { useInterval } from "usehooks-ts";
import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";
import { Stopwatch } from "../Stopwatch";

interface ClaimPaymentControlProps extends HTMLAttributes<HTMLDivElement>, OrderProp, ActionCallbacks {
	onRequestRefetch?: () => void
};

export function ClaimPaymentControl({
	order, className, onActionFulfilled, onActionRejected, onRequestRefetch, ...props
}: ClaimPaymentControlProps) {
	const action = useClaimEscrowAction(order);

	const onButtonClick = async () => {
		if (!action.execute)
			return;

		const tryExecute = async () => {
			try {
				await action.execute();
				onActionFulfilled?.();
			}
			catch (error) {
				if (error instanceof EscrowError)
					onActionRejected?.(error, tryExecute);
				else if (error instanceof Error)
					onActionRejected?.(new EscrowError('generic', error.message), tryExecute);
			}
		};

		tryExecute();
	}

	useInterval(
		() => onRequestRefetch?.(),
		action.status == 'done' ? 1000 : null
	);

	return (
		<div {...props} className={cn('flex flex-col gap-[1rem] w-full', className)}>
			{action.status == 'error' && (
				<div className='flex flex-col gap-[0.5rem] w-full'>
					<span className='text-error-100'>
						An error has occurred
					</span>
					<span className='break-words text-black-40 max-h-[9rem] overflow-y-auto whitespace-pre-wrap'>
						{action.errorMessage}
					</span>
				</div>
			)}

			<Button
				size='xl'
				disabled={!action.execute}
				onClick={onButtonClick}
			>
				{action.status == 'submitting' || action.status == 'done' ? (
					<>
						Claiming <Stopwatch />
					</>
				) : (
					'Claim payment'
				)}
			</Button>
		</div>
	);
}
