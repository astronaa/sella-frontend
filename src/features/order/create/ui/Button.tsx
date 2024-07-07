'use client';

import { Button, ButtonProps } from "~/shared/ui/kit/button";
import { useMutation } from "@tanstack/react-query";
import { OrderId, PayloadPaymentToken, apiClient } from "~/shared/api/client";
import { useProductStrictContext } from "~/entities/product";

export interface ActionCallbacks {
	onActionFulfilled?: (orderId: OrderId, method: PayloadPaymentToken) => void,
	onActionRejected?: (error: Error) => void
}

interface ButtonCreateOrderProps extends ButtonProps, ActionCallbacks {
	method: PayloadPaymentToken,
}

export function ButtonCreateOrder({ method, onActionFulfilled, onActionRejected, ...props }: ButtonCreateOrderProps) {
	const product = useProductStrictContext();

	const { mutateAsync: create, isPending } = useMutation({
		mutationFn: async () => {
			const { data, error } = await apiClient.orders.create({
				productId: product.id,
				paymentType: method.token
			});

			if (error)
				throw error;

			return data;
		},
		onError: onActionRejected,
		onSuccess: order => onActionFulfilled?.(order.id, method)
	})
	
	return (
		<Button
			size='xl'
			{...props}
			onClick={() => create()}
			disabled={isPending}
		>
			Pay Now
		</Button>
	);
}