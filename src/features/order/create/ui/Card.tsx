import { ActionCallbacks, ButtonCreateOrder } from "./Button";
import { BaseCardProps, BaseCard } from "./BaseCard";

type CardProps = BaseCardProps & ActionCallbacks;

export function Card({ onActionFulfilled, onActionRejected, ...props }: CardProps) {
	return (
		<BaseCard {...props}>
			{method => (
				<ButtonCreateOrder
					method={method}
					onActionFulfilled={onActionFulfilled}
					onActionRejected={onActionRejected}
				>
					Pay Now
				</ButtonCreateOrder>
			)}
		</BaseCard>
	);
}
