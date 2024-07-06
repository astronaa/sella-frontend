'use client';

import { Button, ButtonProps } from "~/shared/ui/kit/button";
import { ValueType } from "../model/schema";
import { useMutation } from "@tanstack/react-query";
import { OrderId, apiClient } from "~/shared/api/client";
import { useProductStrictContext } from "~/entities/product";
import { EscrowError, useCreateEscrowAction } from "../api/escrow";

export interface ActionCallbacks {
	onActionFulfilled?: (orderId: OrderId) => void,
	onActionRejected?: (error: EscrowError, retry: () => Promise<void>) => void
}
interface ButtonCreateOrderProps extends ButtonProps, ActionCallbacks {
	method: ValueType,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ButtonCreateOrder({ method, onActionFulfilled, onActionRejected, ...props }: ButtonCreateOrderProps) {
	const product = useProductStrictContext();
	const createEscrow = useCreateEscrowAction(product.id);

	const { mutateAsync: create, isPending } = useMutation({
		mutationFn: async () => {
			const { data, error } = await apiClient.orders.create({
				productId: product.id,
				paymentType: method.token
			});

			if (error)
				throw error;

			return data;
		}
	})

	const onClick = async () => {
		if (createEscrow.loading)
			return;

		const order = await create().catch(() => null);
		if (!order)
			return;

		const tryExecuteOrder = async () => {
			try {
				await createEscrow.execute({
					order, ...method
				});

				// onActionFulfilled?.(order.id);
			}
			catch (error) {
				if (error instanceof EscrowError)
					onActionRejected?.(error, tryExecuteOrder);
				else if (error instanceof Error)
					onActionRejected?.(new EscrowError('generic', error.message), tryExecuteOrder);
			}
		}

		tryExecuteOrder();
	}

	return (
		<Button
			size='xl'
			{...props}
			disabled={isPending || !!props?.disabled || createEscrow.loading}
			onClick={onClick}
		>
			Pay Now
		</Button>
	);
}