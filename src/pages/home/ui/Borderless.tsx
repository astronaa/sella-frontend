import { Heading } from "~/shared/ui/kit/heading";
import { DottedGlobe } from "./DottedGlobe";
import { Eyebrow, Reveal } from "./shared";

/**
 * Financial-inclusion story: markets locked out of global commerce
 * (no processors, no payouts, unreliable banking) can sell to the
 * world through wallets. Full-width rhythm: short intro, four points
 * in one grid row, and the worldwide trades as a slow ticker.
 */

const points = [
	{
		title: "Debanked doesn't mean shut out",
		description:
			"Where payment processors and payout providers don't operate, a wallet still works. That's the whole account.",
	},
	{
		title: "Paid in stablecoins, instantly",
		description:
			"USDC holds its value and clears the same in Lagos, Karachi, or Buenos Aires. No frozen payouts, no conversion haircuts.",
	},
	{
		title: "Buyers from everywhere",
		description:
			"Your storefront is one link, reachable from any country. Escrow makes strangers safe to trade with.",
	},
	{
		title: "Zero paperwork to start",
		description:
			"No company, no business bank account, no onboarding queue. Open a storefront and sell the same day.",
	},
];

const trades = [
	["Karachi", "Berlin", "brand kit delivered"],
	["Buenos Aires", "London", "dev sprint completed"],
	["Lagos", "Seoul", "beat pack sold"],
	["Manila", "Sydney", "translation delivered"],
	["Cairo", "Paris", "audit report shipped"],
	["Hanoi", "Toronto", "dashboard built"],
	["Lima", "Tokyo", "sticker set delivered"],
	["Tbilisi", "Austin", "mint contract deployed"],
] as const;

function TradeChip({ trade }: { trade: readonly [string, string, string] }) {
	const [from, to, what] = trade;

	return (
		<span className="flex items-center gap-[0.75rem] rounded-full bg-white/[0.045] px-[1.25rem] py-[0.6875rem] whitespace-nowrap">
			<span className="text-white font-semibold text-[0.9375rem]">{from}</span>
			<svg viewBox="0 0 16 16" className="size-[0.75rem] fill-accent-100/80">
				<path d="M8.7 2.3L14.4 8l-5.7 5.7-1.1-1.1L11.3 8.8H1.6V7.2h9.7L7.6 3.4z" />
			</svg>
			<span className="text-white font-semibold text-[0.9375rem]">{to}</span>
			<span className="text-black-40 text-[0.875rem]">{what}</span>
			<span className="flex items-center gap-[0.3125rem] text-[0.8125rem] text-green-100">
				<svg viewBox="0 0 16 16" className="size-[0.75rem] fill-current">
					<path d="M6.1 11.6L2.5 8l1.1-1.1 2.5 2.5 6.3-6.3L13.5 4.2z" />
				</svg>
				escrow released
			</span>
		</span>
	);
}

export function Borderless() {
	const doubled = [...trades, ...trades];

	return (
		<div className="relative py-[7rem] max-md:py-[4rem] overflow-hidden">
			<div className="relative flex flex-col gap-[4rem] max-md:gap-[3rem] w-full">
				{/* centered intro up top, then the Earth enthroned in the
				    middle with two points flanking it on each side — the globe
				    gets center stage without ever sitting underneath text */}
				<Reveal className="flex flex-col items-center text-center gap-[1.5rem] px-4 w-full max-w-content mx-auto">
					<Eyebrow>Borderless by default</Eyebrow>

					<Heading size="lg" className="tracking-[-0.02em]">
						Talent has no borders.
						<br />
						<span className="bg-gradient-to-r from-[#FFE865] via-accent-100 to-[#FFC933] bg-clip-text text-transparent">
							Now selling doesn&apos;t either.
						</span>
					</Heading>

					<p className="text-black-60 text-[1.0625rem] leading-[1.65] max-w-[38rem]">
						Billions of people live where payment processors don&apos;t
						operate and banks can&apos;t reach the global market. Their work
						is world-class; their rails aren&apos;t. Sella runs on wallets:
						if you can deliver, you can sell to anyone on Earth.
					</p>
				</Reveal>

				<Reveal delay={80} className="grid lg:grid-cols-[1fr_auto_1fr] items-center gap-x-[3.5rem] gap-y-[2.5rem] px-4 w-full max-w-content mx-auto">
					<div className="flex flex-col gap-[3rem] max-lg:order-2 max-lg:gap-[2rem] lg:items-end lg:text-right">
						{points.slice(0, 2).map((point) => (
							<div key={point.title} className="flex flex-col gap-[0.5rem] lg:items-end max-w-[24rem]">
								<span className="size-[0.5rem] rounded-full bg-accent-100 shadow-[0_0_10px_2px_rgba(255,221,0,0.4)] mb-[0.375rem]" />
								<span className="text-white font-semibold">{point.title}</span>
								<span className="text-black-60 text-[0.9375rem] leading-[1.55]">
									{point.description}
								</span>
							</div>
						))}
					</div>

					<div className="relative size-[36rem] max-xl:size-[30rem] max-lg:size-[24rem] mx-auto max-lg:order-1" aria-hidden>
						{/* soft halo seats the sphere on the page so the canvas
						    edge never reads as a square cut through the glow */}
						<div className="absolute inset-[-14%] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,221,0,0.07)_0%,rgba(255,221,0,0.035)_38%,transparent_68%)]" />
						<DottedGlobe />
					</div>

					<div className="flex flex-col gap-[3rem] max-lg:order-3 max-lg:gap-[2rem]">
						{points.slice(2).map((point) => (
							<div key={point.title} className="flex flex-col gap-[0.5rem] max-w-[24rem]">
								<span className="size-[0.5rem] rounded-full bg-accent-100 shadow-[0_0_10px_2px_rgba(255,221,0,0.4)] mb-[0.375rem]" />
								<span className="text-white font-semibold">{point.title}</span>
								<span className="text-black-60 text-[0.9375rem] leading-[1.55]">
									{point.description}
								</span>
							</div>
						))}
					</div>
				</Reveal>

				{/* worldwide trades as a slow full-bleed ticker */}
				<Reveal delay={140} className="flex flex-col gap-[1rem]">
					<div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]" aria-hidden>
						<div
							className="flex gap-[0.75rem] pr-[0.75rem] w-max"
							style={{ animation: "lp-marquee 70s linear infinite" }}
						>
							{doubled.map((trade, index) => (
								<TradeChip key={`${trade[0]}-${index}`} trade={trade} />
							))}
						</div>
					</div>

					<p className="text-black-40 text-[0.8125rem] text-center px-4">
						Illustrative trades. Same rules everywhere: legal goods and
						services, protected by the same escrow.
					</p>
				</Reveal>
			</div>
		</div>
	);
}
