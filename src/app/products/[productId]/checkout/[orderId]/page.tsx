import { PageProductProcessOrder } from "~/pages/product-checkout";
import { RouteProps } from "../../route-props";

type PageProps = RouteProps & {
	params: { orderId: string },
	searchParams: { tab?: string }
}

export default function Page({ params, searchParams }: PageProps) {
	const { tab } = searchParams;
	const { orderId, productId } = params;

	return (
		<PageProductProcessOrder
			orderId={orderId}
			productId={productId}
			initialTab={tab == 'chat' || tab == 'order-actions' ? tab : undefined}
		/>
	);
}

export const revalidate = 0;