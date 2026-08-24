'use client';

import { useState } from "react";
import Link from "next/link";
import { Product } from "~/shared/api/client";
import { cn } from "~/shared/lib/cn";
import { PageLayout } from "~/pages/product-checkout/ui/PageLayout";
import { Button } from "~/shared/ui/kit/button";
import { Heading } from "~/shared/ui/kit/heading";
import { Input } from "~/shared/ui/kit/input";
import { LaunchSoonDialog } from "~/widgets/storefront-open/ui/LaunchSoonDialog";

/**
 * 1:1 replica of the real checkout screen (chat with the seller on the
 * left, payment card on the right) fed with scripted demo content.
 * Container/bubble classes mirror features/chat-frame exactly.
 */

export interface DemoMessage {
	kind: "system" | "buyer" | "seller";
	body: string;
	time?: string;
}

const script = (product: Product): DemoMessage[] => [
	{ kind: "buyer", body: "gm! Is this available right now? Need it for a launch this week.", time: "13:58" },
	{ kind: "seller", body: `gm, yes. ${product.name} is exactly as listed, delivery well within the deadline. Fund the escrow whenever you're ready and I'll start.`, time: "14:01" },
	{ kind: "system", body: `Order created · ${product.price} USDC locked in escrow` },
	{ kind: "buyer", body: "Done, escrow funded. Sent the brief in the attachment above.", time: "14:07" },
	{ kind: "seller", body: "Received. I'll post progress here so everything stays on the record.", time: "14:09" },
	{ kind: "seller", body: "Delivered ✅ Files and handover notes attached. Check it all and confirm when you're happy.", time: "19:41" },
	{ kind: "buyer", body: "Looks great. Confirming now 🤝", time: "20:12" },
	{ kind: "system", body: "Buyer confirmed · funds released to the seller" },
];

export function DemoChatFrame({
	product,
	messages,
}: {
	product: Product;
	messages?: DemoMessage[];
}) {
	const sellerName = product.store?.name ?? product.storeUrl ?? "Seller";
	const thread = messages ?? script(product);

	return (
		<div
			className={cn(
				"flex flex-col bg-white/[.04] pt-[1rem] px-[1rem] rounded-[1.25rem] gap-[1.25rem] h-[44.6875rem] w-full",
				"border border-white/[.04] overflow-hidden"
			)}
		>
			{/* product mini card, same slot as the real ChatProductCard */}
			<div className="flex flex-row p-[0.5rem] gap-[1rem] items-center w-full max-w-full flex-shrink-0">
				{product.previewImage ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={product.previewImage}
						alt=""
						className="size-[3.875rem] rounded-[1rem] object-cover border border-secondary flex-shrink-0"
					/>
				) : (
					<div className="size-[3.875rem] rounded-[1rem] border border-secondary bg-white/[0.04] flex-shrink-0" />
				)}
				<div className="flex flex-col gap-[0.25rem] min-w-0">
					<span className="text-white font-semibold truncate">{product.name}</span>
					<span className="text-accent-100 font-semibold">{product.price}.00 USDC</span>
				</div>
			</div>

			{/* messages */}
			<div className="flex flex-col justify-between relative rounded-[1.25rem] gap-[1rem] flex-grow min-h-0">
				<div className="flex flex-col gap-[1rem] overflow-y-auto px-[4px] pb-[6rem]">
					{thread.map((message, index) => {
						if (message.kind === "system") {
							return (
								<span
									key={index}
									className="mx-auto my-[0.75rem] rounded-full bg-accent-100/[0.08] px-[1rem] py-[0.4375rem] text-[0.8125rem] text-accent-100 text-center"
								>
									{message.body}
								</span>
							);
						}

						const isLocal = message.kind === "buyer";

						return (
							<div
								key={index}
								className={cn(
									"flex gap-[1rem] p-[1rem] pe-[3.25rem] rounded-[1.25rem] border border-secondary bg-white/[.02] relative max-w-[31.25rem]",
									isLocal ? "self-end bg-white/[.06] rounded-br-none" : "rounded-bl-none"
								)}
							>
								{!isLocal && product.previewImage && (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={product.store?.previewImage ?? product.previewImage}
										alt=""
										className="size-[2rem] rounded-full shadow-md flex-shrink-0 object-cover"
									/>
								)}

								<div className="flex flex-col gap-[0.5rem] w-full text-black-74">
									{!isLocal && <h3 className="text-accent-100">{sellerName}</h3>}
									<p>{message.body}</p>
								</div>

								{message.time && (
									<span className="absolute right-[0.625rem] bottom-[0.625rem] text-black-40 text-[0.875rem]">
										{message.time}
									</span>
								)}
							</div>
						);
					})}
				</div>

				{/* input bar, visually identical, demo-inert */}
				<div className="flex gap-[1rem] w-full py-[1rem] absolute bottom-0 right-0 left-0 bg-transparent backdrop-blur-sm">
					<Input
						className="w-full min-h-full rounded-[1.25rem] border border-secondary"
						placeholder="Your Message"
						disabled
					/>
					<Button variant="solid" disabled>Send</Button>
				</div>
			</div>
		</div>
	);
}

export function CheckoutDemo({ product }: { product: Product }) {
	const [launchOpen, setLaunchOpen] = useState(false);

	return (
		<div className="flex flex-col gap-[1.5rem] w-full">
			<div className="flex items-center justify-between gap-[1rem] max-w-content w-full mx-auto px-[1rem]">
				<span className="flex items-center gap-[0.5rem] rounded-full bg-accent-100/[0.09] px-[0.875rem] py-[0.375rem] text-[0.8125rem] text-accent-100 w-fit">
					<span className="size-[0.375rem] rounded-full bg-accent-100 animate-pulse" />
					Order preview · this is how buying works
				</span>

				<Link
					href={`/products/${product.id}`}
					className="text-black-60 hover:text-white transition text-[0.875rem] whitespace-nowrap"
				>
					← Back to product
				</Link>
			</div>

			<PageLayout product={product} initialTab="chat">
				<DemoChatFrame product={product} />

				{/* order status card, released state (same shell as the real escrow card) */}
				<div className="flex flex-col p-[1rem] gap-[1.25rem] rounded-[1.25rem] border border-secondary w-full">
					<Heading size="xs">Order status</Heading>

					<span className="font-semibold text-[2.25rem]">
						{product.price}.00 <span className="text-accent-100">USDC</span>
					</span>

					{/* escrow timeline, completed */}
					<div className="flex items-center gap-[0.375rem]">
						{["Funded", "Delivered", "Released"].map((step, index) => (
							<div key={step} className="flex items-center gap-[0.375rem] flex-1 last:flex-none">
								<div className="flex flex-col items-center gap-[0.375rem]">
									<span className="flex items-center justify-center size-[1.5rem] rounded-full bg-accent-100 text-black-100">
										<svg viewBox="0 0 16 16" className="size-[0.6875rem] fill-current">
											<path d="M6.1 11.6L2.5 8l1.1-1.1 2.5 2.5 6.3-6.3L13.5 4.2z" />
										</svg>
									</span>
									<span className="text-[0.71875rem] text-black-60">{step}</span>
								</div>
								{index < 2 && <span className="flex-1 h-px bg-accent-100/50 mb-[1.125rem]" />}
							</div>
						))}
					</div>

					<div className="p-[1rem] rounded-[0.75rem] bg-white/[.06] text-black-60 border border-secondary">
						<div className="flex justify-between w-full text-accent-100 mb-[0.75rem] gap-[1rem] text-[1.125rem]">
							<span>Funds released</span>
							<svg viewBox="0 0 16 16" className="size-[1.25rem] fill-green-100">
								<path d="M8 1a7 7 0 110 14A7 7 0 018 1zm-.9 9.6L4.5 8l1.1-1.1 1.5 1.5 3.3-3.3 1.1 1.1-4.4 4.4z" />
							</svg>
						</div>
						<p>
							The buyer confirmed delivery, and the contract paid the seller
							on-chain. Nobody else ever held the money.
						</p>
					</div>

					<span className="text-[0.78125rem] text-black-40">
						Escrow contract · 0xF786…9Fb5 · Ethereum
					</span>

					<Button
						className="w-full"
						variant="solid"
						onClick={() => setLaunchOpen(true)}
					>
						Leave a review
					</Button>
				</div>
			</PageLayout>

			<LaunchSoonDialog
				open={launchOpen}
				onClose={() => setLaunchOpen(false)}
			/>
		</div>
	);
}
