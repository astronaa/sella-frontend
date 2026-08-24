import { Heading } from "~/shared/ui/kit/heading";
import { Eyebrow, Reveal } from "./shared";

/**
 * Global-access story: talented people get locked out of Fiverr,
 * PayPal, and banking rails by geography they never chose. Sella runs
 * on wallets, so the market is open from anywhere.
 */

const trades = [
	{ from: "Karachi", to: "Berlin", what: "brand kit delivered" },
	{ from: "Buenos Aires", to: "London", what: "dev sprint completed" },
	{ from: "Lagos", to: "Seoul", what: "beat pack sold" },
	{ from: "Minsk", to: "Amsterdam", what: "translation delivered" },
	{ from: "Caracas", to: "Toronto", what: "audit report shipped" },
	{ from: "Yerevan", to: "Austin", what: "dashboard built" },
];

const points = [
	{
		title: "A wallet is the only account",
		description:
			"No bank account, no card processor, no payout provider deciding if your country qualifies. Connect a wallet and you're a global seller.",
	},
	{
		title: "Paid in USDC, anywhere",
		description:
			"Stablecoin payments clear the same way in Karachi as they do in California. No frozen payouts, no 60-day holds, no conversion haircuts.",
	},
	{
		title: "The market stays open",
		description:
			"Freelance platforms and payment rails exclude entire countries overnight. An open marketplace on-chain doesn't have that switch.",
	},
];

export function Borderless() {
	return (
		<div className="py-[7rem] max-md:py-[4rem] px-4">
			<div className="flex flex-col lg:flex-row gap-[4rem] w-full max-w-content m-auto items-start">
				<Reveal className="flex flex-col gap-[1.5rem] lg:max-w-[32rem] flex-shrink-0">
					<Eyebrow>Borderless by default</Eyebrow>

					<Heading size="lg" className="tracking-[-0.02em]">
						Talent has no borders.
						<br />
						<span className="bg-gradient-to-r from-accent-100 to-accent-hover bg-clip-text text-transparent">
							Now selling doesn&apos;t either.
						</span>
					</Heading>

					<p className="text-black-60 text-[1.0625rem] leading-[1.65]">
						Some of the best sellers on the internet can&apos;t open a PayPal
						account, can&apos;t get a Fiverr payout, or live where the banking
						rails simply stopped working. None of that says anything about
						their work. Sella runs on wallets, not banks: if you can deliver,
						you can sell, and buyers anywhere can reach you.
					</p>

					<div className="flex flex-col gap-[1.25rem] mt-[0.5rem]">
						{points.map((point) => (
							<div key={point.title} className="flex gap-[0.875rem]">
								<span className="mt-[0.4375rem] size-[0.5rem] flex-shrink-0 rounded-full bg-accent-100 shadow-[0_0_10px_2px_rgba(255,221,0,0.4)]" />
								<div className="flex flex-col gap-[0.25rem]">
									<span className="text-white font-semibold">{point.title}</span>
									<span className="text-black-60 text-[0.9375rem] leading-[1.55]">
										{point.description}
									</span>
								</div>
							</div>
						))}
					</div>
				</Reveal>

				{/* city-pair activity: the story told as trades */}
				<Reveal delay={120} className="flex flex-col gap-[0.75rem] w-full">
					<span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-black-40 pb-[0.25rem]">
						Trades that rails would have blocked
					</span>

					{trades.map((trade, index) => (
						<div
							key={`${trade.from}-${trade.to}`}
							className="flex items-center gap-[1rem] rounded-[1rem] border border-white/[0.06] bg-white/[0.02] px-[1.25rem] py-[1rem]"
							style={{ opacity: 1 - index * 0.08 }}
						>
							<span className="text-white font-semibold whitespace-nowrap">{trade.from}</span>
							<span className="relative flex-1 h-px bg-gradient-to-r from-accent-100/10 via-accent-100/50 to-accent-100/10 min-w-[2rem]">
								<span className="absolute right-0 top-1/2 -translate-y-1/2 size-0 border-y-[0.25rem] border-y-transparent border-l-[0.375rem] border-l-accent-100/70" />
							</span>
							<span className="text-white font-semibold whitespace-nowrap">{trade.to}</span>
							<span className="text-black-60 text-[0.875rem] whitespace-nowrap max-md:hidden">
								{trade.what}
							</span>
							<span className="ml-auto flex items-center gap-[0.375rem] text-[0.78125rem] text-green-100 whitespace-nowrap">
								<svg viewBox="0 0 16 16" className="size-[0.8125rem] fill-current">
									<path d="M6.1 11.6L2.5 8l1.1-1.1 2.5 2.5 6.3-6.3L13.5 4.2z" />
								</svg>
								escrow released
							</span>
						</div>
					))}

					<p className="text-black-40 text-[0.8125rem] pt-[0.5rem]">
						Illustrative trades. Same rules everywhere: legal goods and
						services, protected by the same escrow.
					</p>
				</Reveal>
			</div>
		</div>
	);
}
