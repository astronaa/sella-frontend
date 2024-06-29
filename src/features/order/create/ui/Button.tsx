'use client';

import { Button, ButtonProps } from "~/shared/ui/kit/button";
import { ValueType } from "../model/schema";
import { useMutation } from "@tanstack/react-query";
import { OrderId, apiClient } from "~/shared/api/client";
import { useProductStrictContext } from "~/entities/product";

interface ButtonCreateOrderProps extends ButtonProps {
	method: ValueType,
	onActionFulfilled?: (orderId: OrderId) => void
}

export function ButtonCreateOrder({ method, onActionFulfilled, ...props }: ButtonCreateOrderProps) {
	const product = useProductStrictContext();

	const { mutateAsync: create, isPending } = useMutation({
		mutationFn: async () => {
			const { data, error } = await apiClient.orders.create({
				productId: product.id,
				paymentMethod: method.token
			});

			if(error)
				throw error;

			return data;
		}
	})

	const onClick = async () => {
		const result = await create().catch(() => null);
		if(result)
			onActionFulfilled?.(result.id);
	}

	return (
		<Button
			size='xl' 
			{...props} 
			disabled={isPending || !!props?.disabled}
			onClick={onClick}
		>
			Pay Now
		</Button>
	);
}