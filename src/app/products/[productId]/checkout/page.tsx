import { staticProducts } from "~/shared/static-data/marketplace";
import { Heading } from "~/shared/ui/kit/heading";

export default function Page() {
	return (
		<div className="flex flex-col w-full gap-[1.5rem] max-w-content mx-auto px-[1rem]">
			<Heading>Checkout unavailable</Heading>
			<p className="max-w-[42rem] text-black-60">
				Checkout requires the live Sella backend and is disabled in this static GitHub Pages preview.
			</p>
		</div>
	);
}

export function generateStaticParams() {
	return staticProducts.map((product) => ({ productId: product.id }));
}

export const dynamicParams = false;
