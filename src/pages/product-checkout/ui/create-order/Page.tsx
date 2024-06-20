import { StoreId } from "~/shared/api/client"
import { fetchProduct } from "../../api/product";
import { ChatFrame } from "../chat/Frame";
import { PageLayout, PossibleTabs } from "../PageLayout";
import { OrderFlowCard } from "./OrderFlowCard";

interface PageCreateOrderProps {
	storeId: StoreId,
	initialTab?: PossibleTabs,
	method?: string
}

export async function PageCreateOrder({ storeId, initialTab = 'chat', method = 'eth' }: PageCreateOrderProps) {
	const product = await fetchProduct(String(storeId));

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
				product={product}
				method={method}
			/>
		</PageLayout>
	)
}