import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProduct } from "~/pages/product/api";
import { CheckoutDemo } from "~/widgets/demo-order/ui/CheckoutDemo";

interface PageProps {
	params: { productId: string };
}

export const metadata: Metadata = {
	title: "Order preview · Sella",
	description: "See how an escrow-protected order runs on Sella, from payment to release.",
};

export default async function Page({ params }: PageProps) {
	const product = await fetchProduct(params.productId).catch(() => null);

	if (!product) notFound();

	return <CheckoutDemo product={product} />;
}

export const revalidate = 0;
