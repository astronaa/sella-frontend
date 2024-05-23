import { PageProductCheckout } from "~/pages/product-checkout";

interface PageProps {
	params: { productId: string }
}

export default function Page({ params }: PageProps) {
	return (
		<PageProductCheckout
			storeId={Number(params.productId)}
		/>
	);
}