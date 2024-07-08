import { PageProductCreateOrder } from "~/pages/product-checkout";
import { RouteProps } from "../route-props";
import { schemaPaymentToken } from "~/shared/api/client";

export interface PageProps extends RouteProps {
	searchParams: { 
		tab?: string, 
		token?: string,
		block?: string
	}
}

export default function Page({ params, searchParams }: PageProps) {
	const { tab, ...method } = searchParams;

	return (
		<PageProductCreateOrder
			storeId={params.productId}
			initialTab={tab == 'chat' || tab == 'order-actions' ? tab : undefined}
			method={schemaPaymentToken.parse(method)}
		/>
	);
}