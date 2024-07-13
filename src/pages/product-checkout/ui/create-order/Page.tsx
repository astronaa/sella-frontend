import { PayloadPaymentToken, StoreId } from "~/shared/api/client"
import { fetchProduct } from "../../api/product";
import { PageLayout, schemaPossibleTabs } from "../PageLayout";
import { OrderFlowCard } from "./OrderFlowCard";
import { ChatFrameByProduct } from "./Chat";

interface PageCreateOrderProps {
	storeId: StoreId,
	initialTab?: string,
	method: PayloadPaymentToken
}

export async function PageCreateOrder({ storeId, initialTab = 'chat', method }: PageCreateOrderProps) {
	const product = await fetchProduct(String(storeId));

	return (
		<PageLayout
			initialTab={schemaPossibleTabs.parse(initialTab)}
			product={product}
		>
			<ChatFrameByProduct
				productId={product.id}
			/>
			<OrderFlowCard
				product={product}
				method={method}
			/>
		</PageLayout>
	)
}