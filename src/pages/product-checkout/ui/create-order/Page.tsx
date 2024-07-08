import { PayloadPaymentToken, StoreId } from "~/shared/api/client"
import { fetchProduct } from "../../api/product";
import { ChatFrame } from "../chat/Frame";
import { PageLayout, schemaPossibleTabs } from "../PageLayout";
import { OrderFlowCard } from "./OrderFlowCard";

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
			<ChatFrame
				product={product}
				className='w-full'
			/>
			<OrderFlowCard
				product={product}
				method={method}
			/>
		</PageLayout>
	)
}