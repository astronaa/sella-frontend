import { PageLayout, PossibleTabs } from "../PageLayout";
import { OrderFlowCard } from "./OrderFlowCard";
import { OrderId, ProductId } from "~/shared/api/client";
import { fetchProduct } from "../../api/product";
import { ChatFrameByOrder } from "./Chat";

interface PageProcessOrderProps {
	productId: ProductId,
	orderId: OrderId,
	initialTab?: PossibleTabs,
}

export async function PageProcessOrder({ orderId, productId, initialTab = 'chat' }: PageProcessOrderProps) {
	const product = await fetchProduct(productId);
 
	return (
		<PageLayout
			initialTab={initialTab}
			product={product}
		>
			<ChatFrameByOrder
				orderId={orderId}
			/>
			<OrderFlowCard 
				orderId={orderId} 
			/>
		</PageLayout>
	)
}