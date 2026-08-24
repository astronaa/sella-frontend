import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProduct } from "~/pages/product/api";
import { DemoOrderChat } from "~/widgets/demo-order";
import { Heading } from "~/shared/ui/kit/heading";
import { Button } from "~/shared/ui/kit/button";

interface PageProps {
	params: { productId: string };
}

export const metadata: Metadata = {
	title: "Order preview · Sella",
	description: "See how an escrow-protected order runs on Sella, from payment to release.",
};

const steps = [
	{ label: "Funded", done: true },
	{ label: "Delivered", done: true },
	{ label: "Released", done: true },
];

export default async function Page({ params }: PageProps) {
	const product = await fetchProduct(params.productId).catch(() => null);

	if (!product) notFound();

	return (
		<div className="flex flex-col gap-[2.5rem] w-full max-w-[52rem] mx-auto px-[1rem] pb-[4rem]">
			<div className="flex flex-col gap-[1rem]">
				<span className="flex items-center gap-[0.5rem] w-fit rounded-full border border-accent-100/30 bg-accent-100/[0.07] px-[0.875rem] py-[0.375rem] text-[0.8125rem] text-accent-100">
					Order preview
				</span>

				<Heading size="md">This is how your order would run.</Heading>

				<p className="text-black-60 leading-[1.6] max-w-[38rem]">
					A walkthrough of an escrow-protected purchase of{" "}
					<span className="text-white">{product.name}</span>. Real orders work
					exactly like this once you sign in: the contract holds the money, the
					chat holds the record.
				</p>
			</div>

			{/* order summary */}
			<div className="flex items-center gap-[1rem] rounded-[1.25rem] border border-white/[0.07] bg-white/[0.02] p-[1.25rem]">
				<div className="flex flex-col gap-[0.25rem] min-w-0">
					<span className="text-white font-semibold truncate">{product.name}</span>
					<span className="text-black-60 text-[0.875rem] truncate">
						by {product.store?.name ?? product.storeUrl}
					</span>
				</div>
				<span className="ml-auto text-white font-semibold whitespace-nowrap">
					{product.price} USDC
				</span>
			</div>

			{/* escrow progress */}
			<div className="flex items-center gap-[0.5rem]">
				{steps.map((step, index) => (
					<div key={step.label} className="flex items-center gap-[0.5rem] flex-1 last:flex-none">
						<div className="flex flex-col items-center gap-[0.375rem]">
							<span className="flex items-center justify-center size-[1.75rem] rounded-full bg-accent-100 text-black-100">
								<svg viewBox="0 0 16 16" className="size-[0.75rem] fill-current">
									<path d="M6.1 11.6L2.5 8l1.1-1.1 2.5 2.5 6.3-6.3L13.5 4.2z" />
								</svg>
							</span>
							<span className="text-[0.75rem] text-black-60">{step.label}</span>
						</div>
						{index < steps.length - 1 && (
							<span className="flex-1 h-px bg-accent-100/40 mb-[1.25rem]" />
						)}
					</div>
				))}
			</div>

			<DemoOrderChat
				price={product.price}
				productName={product.name}
				sellerName={product.store?.name ?? product.storeUrl}
			/>

			<div className="flex flex-col items-center gap-[1rem] text-center rounded-[1.25rem] border border-white/[0.07] bg-white/[0.02] p-[2rem]">
				<p className="text-black-60 max-w-[30rem]">
					Sign in to place real orders, or open your own storefront and be on
					the receiving end of one of these.
				</p>
				<div className="flex gap-[0.75rem]">
					<Link href={`/products/${params.productId}`}>
						<Button colorPalette="gray">Back to product</Button>
					</Link>
					<Link href="/">
						<Button variant="solid">Open Storefront</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export const revalidate = 0;
