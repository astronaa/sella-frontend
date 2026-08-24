import { Heading } from "~/shared/ui/kit/heading";
import { Eyebrow, Reveal } from "./shared";

/**
 * Zero-barrier story: no incorporation, no business banking, no
 * processor approval before the first sale. Full-width rhythm: short
 * intro, four points in one grid row, and the global trades as a
 * slow ticker instead of a static board.
 */

const points = [
	{
		title: "Test before you incorporate",
		description:
			"Open a storefront, list the offer, see if people pay. Validation first, paperwork later.",
	},
	{
		title: "A wallet is the only account",
		description:
			"No business banking, no card processor, no payout onboarding. Connect and sell.",
	},
	{
		title: "Paid in stablecoins, instantly",
		description:
			"USDC clears the same way everywhere. No frozen payouts, no chargebacks.",
	},
	{
		title: "Buyers reach you anywhere",
		description:
			"On-chain rails don't care about your postcode. If you can deliver, you can sell.",
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
		<div className="py-[7rem] max-md:py-[4rem] overflow-hidden">
			<div className="flex flex-col gap-[4rem] max-md:gap-[3rem] w-full">
				<Reveal className="flex flex-col items-center text-center gap-[1.5rem] px-4 w-full max-w-content mx-auto">
					<Eyebrow>Zero barrier to entry</Eyebrow>

					<Heading size="lg" className="tracking-[-0.02em]">
						No bank. No LLC.
						<br />
						<span className="bg-gradient-to-r from-accent-100 to-accent-hover bg-clip-text text-transparent">
							Just your first sale.
						</span>
					</Heading>

					<p className="text-black-60 text-[1.0625rem] leading-[1.65] max-w-[38rem]">
						Plenty of great sellers live where banking is slow, expensive,
						or out of reach. Sella runs on wallets, not banks: open a
						storefront and find out the same day whether people pay.
						Talent has no borders. Now selling doesn&apos;t either.
					</p>
				</Reveal>

				<Reveal delay={80} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-[2.5rem] gap-y-[2rem] px-4 w-full max-w-content mx-auto">
					{points.map((point) => (
						<div key={point.title} className="flex flex-col gap-[0.5rem]">
							<span className="size-[0.5rem] rounded-full bg-accent-100 shadow-[0_0_10px_2px_rgba(255,221,0,0.4)] mb-[0.375rem]" />
							<span className="text-white font-semibold">{point.title}</span>
							<span className="text-black-60 text-[0.9375rem] leading-[1.55]">
								{point.description}
							</span>
						</div>
					))}
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
