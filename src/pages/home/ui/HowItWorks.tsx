import { Heading } from "~/shared/ui/kit/heading";
import { Eyebrow, Reveal } from "./shared";

/**
 * "What is Sella" section: plain-words definition + the money-flow
 * infographic (buyer -> escrow contract -> seller, jury underneath).
 */

const chips = [
	"Sell anything, digital or physical",
	"No KYC, 30-second start",
	"Buyer and seller both covered",
	"Sella never holds your money",
];

function LockIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 16 16" className={className}>
			<path d="M8 1a3.5 3.5 0 013.5 3.5V6H12a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h.5V4.5A3.5 3.5 0 018 1zm0 1.5A2 2 0 006 4.5V6h4V4.5a2 2 0 00-2-2z" />
		</svg>
	);
}

function FlowArrow({ label, sublabel }: { label: string; sublabel: string }) {
	return (
		<div className="flex flex-col items-center gap-[0.5rem] flex-1 min-w-[6rem] max-lg:rotate-90 max-lg:min-w-0 max-lg:flex-none max-lg:h-[4.5rem] max-lg:justify-center">
			<span className="text-accent-100 text-[0.78125rem] font-semibold uppercase tracking-[0.12em] max-lg:hidden">
				{label}
			</span>
			<div className="relative w-full h-px bg-gradient-to-r from-accent-100/10 via-accent-100/70 to-accent-100/10 max-lg:w-[3rem]">
				<span className="absolute right-0 top-1/2 -translate-y-1/2 size-0 border-y-[0.3rem] border-y-transparent border-l-[0.45rem] border-l-accent-100/80" />
			</div>
			<span className="text-black-40 text-[0.75rem] max-lg:hidden">{sublabel}</span>
		</div>
	);
}

export function HowItWorks() {
	return (
		<div className="py-[7rem] max-md:py-[4rem] px-4">
			<div className="flex flex-col gap-[4rem] w-full max-w-content m-auto">
				<Reveal className="flex flex-col gap-[1.5rem] items-center text-center">
					<Eyebrow>What is Sella</Eyebrow>

					<Heading size="lg" className="tracking-[-0.02em] max-w-[46rem] text-balance">
						Sell anything to anyone.
						<br />
						<span className="bg-gradient-to-r from-accent-100 via-[#FFE865] to-accent-hover bg-clip-text text-transparent">
							The contract makes it safe.
						</span>
					</Heading>

					<p className="text-black-60 text-[1.0625rem] leading-[1.65] max-w-[42rem]">
						Sella is a web3 marketplace for goods and services. No KYC, no
						middleman holding your money: every payment sits in an on-chain
						escrow contract that neither side, and not even Sella, can touch.
						Scams stop working when nobody can run away with the money.
					</p>

					<div className="flex flex-wrap justify-center gap-[0.5rem]">
						{chips.map((chip) => (
							<span
								key={chip}
								className="rounded-full border border-white/[0.09] bg-white/[0.03] px-[0.875rem] py-[0.4375rem] text-[0.8125rem] text-black-74"
							>
								{chip}
							</span>
						))}
					</div>
				</Reveal>

				{/* money-flow infographic */}
				<Reveal delay={120} className="relative rounded-[1.5rem] border border-white/[0.07] bg-black-100 lp-grid-texture p-[3rem] max-md:p-[1.5rem] overflow-hidden">
					<div
						className="absolute inset-0 pointer-events-none"
						style={{
							background:
								"radial-gradient(50% 60% at 50% 30%, rgba(255,221,0,0.07) 0%, transparent 100%)",
						}}
					/>

					{/* delivery arc, desktop only */}
					<div className="relative hidden lg:block h-[3.5rem]">
						<svg
							className="absolute inset-x-[10%] top-0 w-[80%] h-[3.25rem]"
							viewBox="0 0 100 30"
							preserveAspectRatio="none"
							fill="none"
						>
							<path
								d="M97 30 C 80 2, 20 2, 3 30"
								stroke="rgba(255,255,255,0.25)"
								strokeWidth="0.6"
								strokeDasharray="2 2"
								vectorEffect="non-scaling-stroke"
							/>
						</svg>
						<span className="absolute left-1/2 -translate-x-1/2 top-[-0.5rem] rounded-full border border-white/[0.1] bg-[#161616] px-[0.875rem] py-[0.375rem] text-[0.78125rem] text-black-74 whitespace-nowrap">
							2 · Delivery goes direct, the order chat keeps the record
						</span>
						<span className="absolute left-[9%] bottom-0 size-0 border-x-[0.3rem] border-x-transparent border-t-[0.45rem] border-t-white/40" />
					</div>

					<div className="relative flex items-stretch gap-[1.5rem] max-lg:flex-col max-lg:items-center">
						{/* buyer */}
						<div className="flex flex-col items-center justify-center gap-[0.75rem] rounded-[1.25rem] border border-white/[0.08] bg-white/[0.03] p-[1.75rem] w-[15rem] max-lg:w-full max-lg:max-w-[20rem]">
							<span className="flex items-center justify-center size-[3rem] rounded-full bg-white/[0.06] border border-white/[0.1]">
								<svg viewBox="0 0 20 20" className="size-[1.375rem] fill-white/80">
									<path d="M10 2a4 4 0 110 8 4 4 0 010-8zm0 9.5c4 0 7 2 7 4.5v2H3v-2c0-2.5 3-4.5 7-4.5z" />
								</svg>
							</span>
							<span className="text-white font-semibold">Buyer</span>
							<span className="text-black-60 text-[0.875rem] text-center leading-[1.45]">
								Pays for the order. The money never goes to the seller directly.
							</span>
						</div>

						<FlowArrow label="1 · Payment" sublabel="funds locked" />

						{/* escrow contract */}
						<div className="relative flex flex-col items-center justify-center gap-[0.75rem] rounded-[1.25rem] border border-accent-100/40 bg-accent-100/[0.05] p-[2rem] w-[19rem] max-lg:w-full max-lg:max-w-[20rem] shadow-[0_0_60px_-20px_rgba(255,221,0,0.4)] lp-card-highlight">
							<span className="flex items-center justify-center size-[3.5rem] rounded-[1rem] bg-accent-100 text-black-100">
								<LockIcon className="size-[1.625rem] fill-current" />
							</span>
							<span className="text-white font-semibold text-[1.125rem]">Escrow smart contract</span>
							<span className="text-black-60 text-[0.875rem] text-center leading-[1.45]">
								Holds the money on-chain. Neither side, and not Sella, can
								move it while the order runs.
							</span>
							<span className="rounded-full border border-white/[0.1] bg-black-100 px-[0.75rem] py-[0.25rem] text-[0.75rem] text-black-60">
								Ethereum · verified on-chain
							</span>
						</div>

						<FlowArrow label="3 · Release" sublabel="buyer confirms" />

						{/* seller */}
						<div className="flex flex-col items-center justify-center gap-[0.75rem] rounded-[1.25rem] border border-white/[0.08] bg-white/[0.03] p-[1.75rem] w-[15rem] max-lg:w-full max-lg:max-w-[20rem]">
							<span className="flex items-center justify-center size-[3rem] rounded-full bg-white/[0.06] border border-white/[0.1]">
								<svg viewBox="0 0 20 20" className="size-[1.375rem] fill-white/80">
									<path d="M3 3h2l.4 2H17l-1.5 7h-9L5 5H3V3zm4 12a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm7 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
								</svg>
							</span>
							<span className="text-white font-semibold">Seller</span>
							<span className="text-black-60 text-[0.875rem] text-center leading-[1.45]">
								Delivers the goods, gets paid by the contract the moment the
								buyer confirms.
							</span>
						</div>
					</div>

					{/* dispute branch */}
					<div className="relative flex flex-col items-center mt-[1.5rem]">
						<span className="h-[2rem] w-px border-l border-dashed border-white/[0.2]" />
						<div className="flex items-center gap-[1rem] rounded-[1.25rem] border border-white/[0.08] bg-white/[0.02] px-[1.5rem] py-[1rem] max-w-[36rem] max-md:flex-col max-md:text-center">
							<span className="flex items-center justify-center size-[2.5rem] flex-shrink-0 rounded-full bg-white/[0.05] border border-white/[0.1]">
								<svg viewBox="0 0 20 20" className="size-[1.25rem] fill-white/70">
									<path d="M10 2a3 3 0 110 6 3 3 0 010-6zM4 7a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm12 0a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm-6 3.5c2.5 0 4.5 1.3 4.5 3V16h-9v-2.5c0-1.7 2-3 4.5-3z" />
								</svg>
							</span>
							<p className="text-black-60 text-[0.875rem] leading-[1.5]">
								<span className="text-white font-semibold">If something goes wrong:</span>{" "}
								a randomly selected community jury reviews the chat, votes, and
								the contract pays whichever side wins the majority.
							</p>
						</div>
					</div>
				</Reveal>
			</div>
		</div>
	);
}
