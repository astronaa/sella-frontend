import { OrderId } from "~/shared/api/model";
import { ChatFrame } from "../chat/Frame";
import { PageLayout, PossibleTabs } from "../PageLayout";
import { fetchOrder } from "../../api/order";
import { OrderFlowCard } from "./OrderFlowCard";

interface PageProcessOrderProps {
	orderId: OrderId,
	initialTab?: PossibleTabs
}

export async function PageProcessOrder({ orderId, initialTab = 'chat' }: PageProcessOrderProps) {
	const order = await fetchOrder(orderId);
 
	return (
		<PageLayout
			initialTab={initialTab}
			product={order.product}
		>
			<ChatFrame
				product={order.product}
				className='w-full'
			/>
			<OrderFlowCard order={order} />
		</PageLayout>
	)
}