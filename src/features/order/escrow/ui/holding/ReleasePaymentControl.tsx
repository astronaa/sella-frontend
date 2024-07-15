'use client';

import { OrderProp } from "~/entities/order";
import { Button, ButtonProps } from "~/shared/ui/kit/button";
import { useReleaseEscrowAction } from "../../model/release/action";
import { ActionCallbacks, RetryFn } from "../FlowCard";
import { EscrowError } from "../../model/error";
import { Stopwatch } from "../Stopwatch";
import { useInterval } from "usehooks-ts";

interface ReleasePaymentControlProps extends ButtonProps, OrderProp, ActionCallbacks {
	onRequestRefetch?: () => void
};

export function ReleasePaymentControl({
	order, onActionFulfilled, onActionRejected, onRequestRefetch, ...props
}: ReleasePaymentControlProps) {
	const action = useReleaseEscrowAction(order);

	const handleError = (error: unknown, retryFn: RetryFn) => {
		if (error instanceof EscrowError)
			onActionRejected?.(error, retryFn);
		else if (error instanceof Error)
			onActionRejected?.(new EscrowError('generic', error.message), retryFn);
	};

	const onButtonClick = async () => {
		if (!action.execute)
			return;

		const tryExecute = async () => {
			try {
				await action.execute();
				onActionFulfilled?.();
			}
			catch (error) {
				handleError(error, tryExecute);
			}
		};

		tryExecute();
	}

	useInterval(
		() => onRequestRefetch?.(),
		action.status == 'done' ? 1000 : null
	);

	return (
		<div className='flex flex-col gap-[1rem] w-full'>
			{action.status == 'error' && (
				<div className='flex flex-col gap-[0.5rem] w-full'>
					<span className='text-error-100'>
						An error has occurred
					</span>
					<span className='break-words text-black-40 max-h-[9rem] overflow-y-auto'>
						{action.errorMessage}
					</span>
				</div>
			)}

			<Button
				size='xl'
				{...props} onClick={onButtonClick}
				disabled={(action.status != 'idle' && action.status != 'error') || !!props?.disabled}
			>
				{action.status == 'submitting' || action.status == 'done' ? (
					<>
						Releasing <Stopwatch />
					</>
				) : (
					'Release payment to seller'
				)}
			</Button>
		</div>
	);
}
