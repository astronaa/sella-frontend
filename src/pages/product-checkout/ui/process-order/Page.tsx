import { ChatFrame } from "../chat/Frame";
import { PageLayout, PossibleTabs } from "../PageLayout";
import { OrderFlowCard } from "./OrderFlowCard";
import { OrderId, ProductId } from "~/shared/api/client";
import { fetchProduct } from "../../api/product";

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
			<ChatFrame
				product={product}
				className='w-full'
			/>
			<OrderFlowCard 
				orderId={orderId} 
			/>
		</PageLayout>
	)
}