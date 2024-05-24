import { PageProductCheckout } from "~/pages/product-checkout";

interface PageProps {
	params: { productId: string },
	searchParams: { tab?: string }
}

export default function Page({ params, searchParams }: PageProps) {
	const { tab } = searchParams;

	return (
		<PageProductCheckout
			storeId={Number(params.productId)}
			initialTab={tab == 'chat' || tab == 'order-actions' ? tab : null}
		/>
	);
}