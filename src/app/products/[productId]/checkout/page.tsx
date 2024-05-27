import { PageProductCreateOrder } from "~/pages/product-checkout";

interface PageProps {
	params: { productId: string },
	searchParams: { tab?: string }
}

export default function Page({ params, searchParams }: PageProps) {
	const { tab } = searchParams;

	return (
		<PageProductCreateOrder
			storeId={Number(params.productId)}
			initialTab={tab == 'chat' || tab == 'order-actions' ? tab : undefined}
		/>
	);
}