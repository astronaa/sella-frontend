import { StoreId } from "~/shared/api/client"
import { fetchProduct } from "../../api/product";
import { ChatFrame } from "../chat/Frame";
import { PageLayout, schemaPossibleTabs } from "../PageLayout";
import { OrderFlowCard } from "./OrderFlowCard";
import { schemaOrderCreate } from "~/features/order/create";

interface PageCreateOrderProps {
	storeId: StoreId,
	initialTab?: string,
	token?: string,
	block?: string
}

export async function PageCreateOrder({ storeId, initialTab = 'chat', token, block }: PageCreateOrderProps) {
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
				method={schemaOrderCreate.parse({ token, block })}
			/>
		</PageLayout>
	)
}