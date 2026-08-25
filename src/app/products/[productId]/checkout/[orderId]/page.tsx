import { staticProducts } from "~/shared/static-data/marketplace";
import { RedirectTo } from "~/shared/ui/redirect-to";

interface PageProps {
	params: { productId: string };
}

/** Demo mode: no real orders exist yet, so fall back to the demo order. */
export default function Page({ params }: PageProps) {
	return <RedirectTo href={`/products/${params.productId}/demo-order`} />;
}

export function generateStaticParams() {
	return staticProducts.map((product) => ({
		productId: product.id,
		orderId: "demo",
	}));
}

export const dynamicParams = false;
