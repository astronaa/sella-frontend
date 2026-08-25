import { staticProducts } from "~/shared/static-data/marketplace";
import { RedirectTo } from "~/shared/ui/redirect-to";

interface PageProps {
	params: { productId: string };
}

/**
 * Demo mode: the real checkout needs a signed-in wallet, so send visitors to the
 * scripted demo order instead. Restore PageProductCreateOrder at launch.
 */
export default function Page({ params }: PageProps) {
	return <RedirectTo href={`/products/${params.productId}/demo-order`} />;
}

export function generateStaticParams() {
	return staticProducts.map((product) => ({ productId: product.id }));
}

export const dynamicParams = false;
