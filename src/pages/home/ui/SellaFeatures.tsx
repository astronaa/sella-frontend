import Image from "next/image";
import { Heading } from "~/shared/ui/kit/heading";
import { Aura, Eyebrow, Reveal } from "./shared";

import ImageNoKyc from "../assets/features/no-kyc.png";
import ImageSellAnything from "../assets/features/sell-anything.png";

/**
 * Feature section in three beats: two flagship tiles, an us-vs-them
 * comparison against the platforms sellers actually come from, and
 * the complete feature list from the whitepaper. Feature set sourced
 * from sellastore.gitbook.io/whitepaper (Solution, Competitive
 * Analysis, Business Model) plus storefront customization / custom
 * domains.
 */

const comparison = [
	{
		label: "Start selling",
		sella: "30 seconds, no KYC",
		them: "Days of onboarding and ID checks",
	},
	{
		label: "Fees",
		sella: "2% on success, 1% in $SELLA. No listing fees",
		them: "5-20% cuts plus listing and payout fees",
	},
	{
		label: "Payouts",
		sella: "Instant, straight to your wallet",
		them: "Weekly cycles, 7-14 day holds",
	},
	{
		label: "Chargebacks",
		sella: "None. Escrow release is final",
		them: "Reversals months after delivery",
	},
	{
		label: "Disputes",
		sella: "Jury of five community members, AI-assisted",
		them: "A support ticket the platform decides",
	},
	{
		label: "Your brand",
		sella: "Custom domain and design. Sella stays invisible",
		them: "Their marketplace, their look, their rules",
	},
	{
		label: "Who can sell",
		sella: "Anyone with a wallet, anywhere",
		them: "Supported countries only",
	},
];

const allFeatures = [
	{
		title: "Escrow on every trade",
		description: "Money locked on-chain until both sides are happy. Nobody can run away with it.",
	},
	{
		title: "Community dispute jury",
		description: "Five random members review the case with AI-assisted evidence. Three of five decides.",
	},
	{
		title: "Make it yours",
		description: "Custom domain, your colors, your layout. Buyers never feel they left your brand.",
	},
	{
		title: "Memorable store link",
		description: "sella.to/you. Short, clean, and yours from day one.",
	},
	{
		title: "Reviews that can't be faked",
		description: "Immutable on-chain history. Negative reviews weigh heavier, so trouble surfaces early.",
	},
	{
		title: "One reputation, many shops",
		description: "Pool your track record across every storefront you run.",
	},
	{
		title: "Escrow on your terms",
		description: "You set the release window per listing. Both sides see it before money locks.",
	},
	{
		title: "AI minds your chats",
		description: "Your storefront assistant answers buyers from your FAQ around the clock.",
	},
	{
		title: "Built-in order chat",
		description: "Every order gets its own chat: the record the escrow and jury can rely on.",
	},
	{
		title: "Crypto-native payments",
		description: "USDT, USDC and ETH on Ethereum with L2 support for low fees.",
	},
	{
		title: "Digital, physical, RWA",
		description: "Services, files, goods, tokenized real-world assets. Beyond NFTs.",
	},
	{
		title: "Quests and referrals",
		description: "Earn points for selling, voting and referring. Redeem for $SELLA and perks.",
	},
	{
		title: "Storefront analytics",
		description: "See what sells, where buyers come from, and what converts.",
	},
	{
		title: "Moderation that scales",
		description: "AI catches prohibited items and fraud; the community keeps it honest.",
	},
	{
		title: "Fees only on success",
		description: "No subscription, no listing fees. You pay when you get paid.",
	},
];

export function SellaFeautes() {
	return (
		<div className="relative overflow-hidden py-[7rem] max-md:py-[4rem] px-4">
			<Aura className="top-[16rem] right-[-14rem] size-[50rem]" />
			<div className="flex flex-col gap-[3.5rem] w-full max-w-content m-auto">
				<Reveal className="flex flex-col gap-[1.25rem]">
					<Eyebrow>Why sellers stay</Eyebrow>

					<Heading size="lg" className="tracking-[-0.02em]">
						Selling, minus the friction.
					</Heading>

					<p className="text-black-60 text-[1.0625rem] leading-[1.6] max-w-[34rem] text-balance">
						Most sellers come here from somewhere else. Here&apos;s what
						changes when they do.
					</p>
				</Reveal>

				{/* two illustrated flagship tiles */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-[1.25rem]">
					<Reveal className="lp-hover-card lp-spot relative flex flex-col rounded-[1.5rem] bg-white/[0.03] hover:bg-white/[0.05] overflow-hidden">
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

					<Reveal delay={90} className="lp-hover-card lp-spot relative flex flex-col rounded-[1.5rem] bg-white/[0.03] hover:bg-white/[0.05] overflow-hidden">
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

				{/* us vs them: the Sella column carries one continuous accent
				    tint so "us" reads at a glance */}
				<Reveal className="max-md:overflow-x-auto">
					<div className="grid grid-cols-[9.5rem_1fr_1fr] gap-x-[1rem] min-w-[44rem]">
						<span />
						<span className="px-[1.25rem] pb-[0.75rem] text-accent-100 font-semibold text-[0.9375rem]">
							On Sella
						</span>
						<span className="px-[1.25rem] pb-[0.75rem] text-black-40 font-semibold text-[0.9375rem]">
							Fiverr · Etsy · Gumroad
						</span>

						{comparison.map((row, index) => {
							const first = index === 0;
							const last = index === comparison.length - 1;

							return [
								<span
									key={`${row.label}-l`}
									className="py-[0.9375rem] text-black-74 text-[0.875rem] font-semibold"
								>
									{row.label}
								</span>,
								<span
									key={`${row.label}-s`}
									className={`px-[1.25rem] py-[0.9375rem] bg-accent-100/[0.06] text-white text-[0.9375rem] leading-[1.45] ${
										first ? "rounded-t-[1rem]" : ""
									} ${last ? "rounded-b-[1rem]" : ""}`}
								>
									{row.sella}
								</span>,
								<span
									key={`${row.label}-t`}
									className={`px-[1.25rem] py-[0.9375rem] bg-white/[0.02] text-black-60 text-[0.9375rem] leading-[1.45] ${
										first ? "rounded-t-[1rem]" : ""
									} ${last ? "rounded-b-[1rem]" : ""}`}
								>
									{row.them}
								</span>,
							];
						})}
					</div>
				</Reveal>

				{/* the complete feature list, whitepaper-sourced */}
				<div className="flex flex-col gap-[2rem]">
					<Reveal className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-black-40">
						Everything in the box
					</Reveal>

					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-[2.5rem] gap-y-[1.75rem]">
						{allFeatures.map((feature, index) => (
							<Reveal key={feature.title} delay={(index % 3) * 60} className="flex gap-[0.875rem]">
								<span className="mt-[0.4375rem] size-[0.5rem] flex-shrink-0 rounded-full bg-accent-100 shadow-[0_0_10px_2px_rgba(255,221,0,0.4)]" />
								<div className="flex flex-col gap-[0.25rem]">
									<span className="text-white font-semibold">{feature.title}</span>
									<span className="text-black-60 text-[0.9375rem] leading-[1.55]">
										{feature.description}
									</span>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
