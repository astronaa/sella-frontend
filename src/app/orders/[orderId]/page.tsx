import { PageProductProcessOrder } from "~/pages/product-checkout";

interface PageProps {
	params: { orderId: string },
	searchParams: { tab?: string }
}

export default function Page({ params, searchParams }: PageProps) {
	const { tab } = searchParams;

	return (
		<PageProductProcessOrder
			orderId={params.orderId}
			initialTab={tab == 'chat' || tab == 'order-actions' ? tab : undefined}
		/>
	);
}
