import Image from "next/image";
import { Heading } from "~/shared/ui/kit/heading";
import { Eyebrow, Reveal } from "./shared";

import ImageNoKyc from "../assets/features/no-kyc.png";
import ImageSellAnything from "../assets/features/sell-anything.png";

const tiles = [
	{
		title: "Memorable store link",
		description:
			"Stand out with a short, easy-to-remember storefront link. Pick something sweet while it's early.",
		icon: (
			<svg viewBox="0 0 20 20" className="size-[1.25rem] fill-current">
				<path d="M8.6 11.4a1 1 0 001.4 1.4l4-4A3.5 3.5 0 009 3.9L7.3 5.6A1 1 0 108.7 7l1.7-1.7a1.5 1.5 0 012.1 2.1l-3.9 4zm2.8-2.8a1 1 0 00-1.4-1.4l-4 4A3.5 3.5 0 0011 16.1l1.7-1.7a1 1 0 10-1.4-1.4l-1.7 1.7a1.5 1.5 0 01-2.1-2.1l3.9-4z" />
			</svg>
		),
	},
	{
		title: "Built-in order chat",
		description:
			"Every order gets its own chat. Agree on details, share files, keep the record the escrow can rely on.",
		icon: (
			<svg viewBox="0 0 20 20" className="size-[1.25rem] fill-current">
				<path d="M10 2c4.4 0 8 2.9 8 6.5S14.4 15 10 15c-.8 0-1.6-.1-2.3-.3L4 17v-3.3C2.2 12.5 2 10.6 2 8.5 2 4.9 5.6 2 10 2z" />
			</svg>
		),
	},
	{
		title: "Secure at its core",
		description:
			"Escrow and the dispute system keep every trade fair, for buyers and sellers alike.",
		icon: (
			<svg viewBox="0 0 20 20" className="size-[1.25rem] fill-current">
				<path d="M10 1l7 3v5c0 4.4-3 8.4-7 10-4-1.6-7-5.6-7-10V4l7-3zm-1 12.4l5-5-1.4-1.4-3.6 3.6-1.6-1.6L6 10.4l3 3z" />
			</svg>
		),
	},
	{
		title: "Fees only on success",
		description:
			"No subscription, no listing fees. A small cut of a completed sale, and that's it.",
		icon: (
			<svg viewBox="0 0 20 20" className="size-[1.25rem] fill-current">
				<path d="M10 2a8 8 0 110 16 8 8 0 010-16zm.75 3h-1.5v1.1c-1.3.2-2.25 1-2.25 2.2 0 1.4 1.2 1.9 2.5 2.3 1.2.3 1.5.6 1.5 1.1 0 .6-.6.9-1.4.9-.9 0-1.6-.4-1.9-1.2l-1.4.6c.4 1.1 1.4 1.8 2.7 2v1h1.5v-1c1.4-.2 2.4-1 2.4-2.3 0-1.5-1.3-2-2.6-2.4-1.1-.3-1.5-.5-1.5-1 0-.5.5-.8 1.2-.8.8 0 1.3.3 1.6 1l1.4-.6c-.4-1-1.3-1.6-2.4-1.8V5z" />
			</svg>
		),
	},
];

export function SellaFeautes() {
	return (
		<div className="py-[7rem] max-md:py-[4rem] px-4">
			<div className="flex flex-col gap-[3.5rem] w-full max-w-content m-auto">
				<Reveal className="flex flex-col gap-[1.25rem]">
					<Eyebrow>Why sellers stay</Eyebrow>

					<Heading size="lg" className="tracking-[-0.02em]">
						Selling, minus the friction.
					</Heading>

					<p className="text-black-60 text-[1.0625rem] leading-[1.6] max-w-[34rem] text-balance">
						We strip away the complexity other platforms pile on, and keep what
						actually matters when you trade with strangers on the internet.
					</p>
				</Reveal>

				<div className="flex flex-col gap-[1.25rem]">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-[1.25rem]">
						{/* two illustrated flagship tiles */}
						<Reveal className="relative flex flex-col rounded-[1.5rem] border border-white/[0.07] bg-white/[0.03] overflow-hidden lp-card-highlight">
							<div
								className="flex justify-center items-center h-[15rem]"
								style={{
									background:
										"radial-gradient(80% 110% at 100% 0%, rgba(254,200,5,0.14) 0%, rgba(254,200,5,0.02) 100%)",
								}}
							>
								<Image src={ImageNoKyc} alt="" className="w-[min(100%,13rem)]" />
							</div>
							<div className="flex flex-col gap-[0.5rem] p-[1.5rem] pt-[1.25rem]">
								<h3 className="text-white font-semibold text-[1.125rem]">No KYC</h3>
								<p className="text-black-60 leading-[1.55]">
									Who likes it anyway? Connect your wallet, reserve your handle,
									open your storefront and start selling.
								</p>
							</div>
						</Reveal>

						<Reveal delay={90} className="relative flex flex-col rounded-[1.5rem] border border-white/[0.07] bg-white/[0.03] overflow-hidden lp-card-highlight">
							<div
								className="flex justify-center items-center h-[15rem]"
								style={{
									background:
										"radial-gradient(80% 110% at 0% 0%, rgba(254,200,5,0.14) 0%, rgba(254,200,5,0.02) 100%)",
								}}
							>
								<Image src={ImageSellAnything} alt="" className="w-[min(100%,13rem)]" />
							</div>
							<div className="flex flex-col gap-[0.5rem] p-[1.5rem] pt-[1.25rem]">
								<h3 className="text-white font-semibold text-[1.125rem]">Sell anything*</h3>
								<p className="text-black-60 leading-[1.55]">
									Digital or physical, goods or services. Freedom of commerce,
									minus anything illegal or harmful.
								</p>
							</div>
						</Reveal>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[1.25rem]">
						{tiles.map((tile, index) => (
							<Reveal
								key={tile.title}
								delay={index * 70}
								className="flex flex-col gap-[0.875rem] rounded-[1.25rem] border border-white/[0.07] bg-white/[0.02] p-[1.5rem]"
							>
								<span className="flex items-center justify-center size-[2.5rem] rounded-[0.625rem] bg-accent-100/[0.1] border border-accent-100/25 text-accent-100">
									{tile.icon}
								</span>
								<h3 className="text-white font-semibold">{tile.title}</h3>
								<p className="text-black-60 text-[0.9375rem] leading-[1.55]">
									{tile.description}
								</p>
							</Reveal>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
