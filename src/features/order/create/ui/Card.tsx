import { ButtonCreateOrder } from "./Button";
import { OrderId } from "~/shared/api/client";
import { BaseCardProps, BaseCard } from "./BaseCard";

type CardProps = BaseCardProps & {
	onActionFulfilled?: (orderId: OrderId) => void;
};

export function Card({ onActionFulfilled, ...props }: CardProps) {
	return (
		<BaseCard {...props}>
			{method => (
				<ButtonCreateOrder
					method={method}
					onActionFulfilled={onActionFulfilled}
				>
					Pay Now
				</ButtonCreateOrder>
			)}
		</BaseCard>
	);
}
