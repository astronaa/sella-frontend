import { staticProducts } from "~/shared/static-data/marketplace";
import { RedirectTo } from "~/shared/ui/redirect-to";

interface PageProps {
	params: { productId: string };
}

/** Demo mode: reviews are written from a real order, so send visitors back to the product. */
export default function Page({ params }: PageProps) {
	return <RedirectTo href={`/products/${params.productId}`} />;
}

export function generateStaticParams() {
	return staticProducts.map((product) => ({
		productId: product.id,
		orderId: "demo",
	}));
}

export const dynamicParams = false;
