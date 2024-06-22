import { PageProductCreateOrder } from "~/pages/product-checkout";
import { RouteProps } from "../route-props";

interface PageProps extends RouteProps {
	searchParams: { 
		tab?: string, 
		token?: string,
		block?: string
	}
}

export default function Page({ params, searchParams }: PageProps) {
	const { tab, token, block } = searchParams;

	return (
		<PageProductCreateOrder
			storeId={params.productId}
			initialTab={tab == 'chat' || tab == 'order-actions' ? tab : undefined}
			token={token} block={block}
		/>
	);
}