import { PageLayout, PossibleTabs } from "../PageLayout";
import { LeaveReviewFlowCard } from "./LeaveReviewFlowCard";
import { OrderId, ProductId } from "~/shared/api/client";
import { fetchProduct } from "../../api/product";
import { ChatFrameByOrder } from "../ChatFrameByOrder";

interface PageLeaveReviewForOrderProps {
	productId: ProductId,
	orderId: OrderId,
	initialTab?: PossibleTabs,
}

export async function PageLeaveReviewForOrder({ orderId, productId, initialTab = 'chat' }: PageLeaveReviewForOrderProps) {
	const product = await fetchProduct(productId);
 
	return (
		<PageLayout
			initialTab={initialTab}
			product={product}
		>
			<ChatFrameByOrder
				orderId={orderId}
			/>
			<LeaveReviewFlowCard 
				orderId={orderId} 
			/>
		</PageLayout>
	)
}