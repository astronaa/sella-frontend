import { staticProducts } from "~/shared/static-data/marketplace";
import { Heading } from "~/shared/ui/kit/heading";

export default function Page() {
	return (
		<div className="flex flex-col w-full gap-[1.5rem] max-w-content mx-auto px-[1rem]">
			<Heading>Review unavailable</Heading>
			<p className="max-w-[42rem] text-black-60">
				Reviews require the live Sella backend and are disabled in this static GitHub Pages preview.
			</p>
		</div>
	);
}

export function generateStaticParams() {
	return staticProducts.map((product) => ({
		productId: product.id,
		orderId: "static-preview",
	}));
}

export const dynamicParams = false;
