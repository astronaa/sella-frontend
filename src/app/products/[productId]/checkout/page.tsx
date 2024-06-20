import { PageProductCreateOrder } from "~/pages/product-checkout";
import { RouteProps } from "../route-props";

interface PageProps extends RouteProps {
	searchParams: { tab?: string, method?: string }
}

export default function Page({ params, searchParams }: PageProps) {
	const { tab } = searchParams;

	return (
		<PageProductCreateOrder
			storeId={params.productId}
			initialTab={tab == 'chat' || tab == 'order-actions' ? tab : undefined}
			method={searchParams.method}
		/>
	);
}