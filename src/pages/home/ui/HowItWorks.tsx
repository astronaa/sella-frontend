import { Heading } from "~/shared/ui/kit/heading";
import { Eyebrow, Reveal } from "./shared";
import { SellAnythingMarquee } from "./SellAnythingMarquee";

/**
 * "What is Sella" section: plain-words definition + the money-flow
 * diagram drawn directly on the page background (no boxed panel),
 * with animated payment/release dots and a marching delivery arc.
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

function FlowLine({ label, sublabel, dotClass, stepClass }: { label: string; sublabel: string; dotClass: string; stepClass: string }) {
	return (
		<div className={`relative flex flex-col items-center gap-[0.625rem] flex-1 min-w-[5rem] -mt-[3.25rem] max-lg:hidden ${stepClass}`}>
			<span className="text-accent-100/90 text-[0.75rem] font-semibold uppercase tracking-[0.14em]">
				{label}
			</span>
			<div className="relative w-full h-px bg-gradient-to-r from-transparent via-accent-100/50 to-transparent">
				<span className={`lp-dot ${dotClass}`} />
			</div>
			<span className="text-black-40 text-[0.75rem]">{sublabel}</span>
		</div>
	);
}

function Node({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<div className="flex flex-col items-center gap-[0.875rem] w-[13rem] max-lg:w-full max-lg:max-w-[18rem] text-center">
			<span className="flex items-center justify-center size-[4.5rem] rounded-full border border-white/[0.12] bg-[#111111] shadow-[0_0_40px_-12px_rgba(255,255,255,0.15)]">
				{icon}
			</span>
			<span className="text-white font-semibold text-[1.0625rem]">{title}</span>
			<span className="text-black-60 text-[0.875rem] leading-[1.5]">{description}</span>
		</div>
	);
}

export function HowItWorks() {
	return (
		<div className="relative py-[7rem] max-md:py-[4rem] px-4 overflow-hidden">
			{/* ambient: glow + faint grid straight on the page background */}
			<div className="absolute inset-x-0 top-[36%] bottom-0 lp-grid-texture [mask-image:radial-gradient(55%_65%_at_50%_45%,black,transparent)] pointer-events-none" />
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background:
						"radial-gradient(42% 38% at 50% 62%, rgba(255,221,0,0.08) 0%, transparent 100%)",
				}}
			/>

			<div className="relative flex flex-col gap-[5.5rem] max-md:gap-[3.5rem] w-full max-w-content m-auto">
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
						Think freelance platform, digital storefront, and marketplace in
						one. Services, files, goods, access: if you can deliver it, you
						can sell it here. No KYC, no middleman holding your money; every
						payment sits in an on-chain escrow contract that neither side,
						and not even Sella, can touch. Scams stop working when nobody can
						run away with the money.
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

				<Reveal delay={80}>
					<SellAnythingMarquee />
				</Reveal>

				{/* money-flow diagram, etched into the background */}
				<Reveal delay={120} className="relative">
					{/* delivery arc, desktop only */}
					<div className="relative hidden lg:block h-[4.5rem] mb-[1rem]">
						<svg
							className="absolute inset-x-[13%] top-[1rem] w-[74%] h-[3.5rem]"
							viewBox="0 0 100 30"
							preserveAspectRatio="none"
							fill="none"
						>
							<path
								d="M98 30 C 78 0, 22 0, 2 30"
								stroke="rgba(255,255,255,0.22)"
								strokeWidth="0.6"
								strokeDasharray="2 2"
								vectorEffect="non-scaling-stroke"
								className="lp-arc-march"
							/>
						</svg>
						<span className="lp-step-2 absolute left-1/2 -translate-x-1/2 top-[-0.375rem] text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-black-60 whitespace-nowrap">
							2 · Delivery
						</span>
						<span className="lp-step-2 absolute left-1/2 -translate-x-1/2 top-[1.125rem] text-[0.75rem] text-black-40 whitespace-nowrap">
							goes direct, the order chat keeps the record
						</span>
						<span className="absolute left-[12.4%] bottom-[-0.25rem] size-0 border-x-[0.28rem] border-x-transparent border-t-[0.42rem] border-t-white/35" />
					</div>

					<div className="relative flex items-start justify-center gap-[1.25rem] max-lg:flex-col max-lg:items-center max-lg:gap-[2.5rem]">
						<Node
							title="Buyer"
							description="Pays for the order. The money never goes to the seller directly."
							icon={
								<svg viewBox="0 0 20 20" className="size-[1.625rem] fill-white/80">
									<path d="M10 2a4 4 0 110 8 4 4 0 010-8zm0 9.5c4 0 7 2 7 4.5v2H3v-2c0-2.5 3-4.5 7-4.5z" />
								</svg>
							}
						/>

						<FlowLine label="1 · Payment" sublabel="funds locked" dotClass="lp-dot-pay" stepClass="lp-step-1" />

						{/* escrow vault: medallion, no card */}
						<div className="flex flex-col items-center gap-[0.875rem] w-[16rem] max-lg:w-full max-lg:max-w-[18rem] text-center lg:-mt-[1.5rem]">
							<span className="relative flex items-center justify-center size-[6rem] rounded-full bg-accent-100 text-black-100 lp-vault-pulse">
								<span className="absolute inset-[-0.625rem] rounded-full border border-accent-100/30" />
								<span className="absolute inset-[-1.375rem] rounded-full border border-accent-100/[0.12]" />
								<LockIcon className="size-[2.25rem] fill-current" />
							</span>
							<span className="text-white font-semibold text-[1.1875rem] mt-[0.25rem]">
								Escrow smart contract
							</span>
							<span className="text-black-60 text-[0.875rem] leading-[1.5]">
								Holds the money on-chain. Neither side, and not Sella, can move
								it while the order runs.
							</span>
							<span className="text-[0.75rem] text-black-40 uppercase tracking-[0.14em]">
								Ethereum · verified on-chain
							</span>
						</div>

						<FlowLine label="3 · Release" sublabel="buyer confirms" dotClass="lp-dot-release" stepClass="lp-step-3" />

						<Node
							title="Seller"
							description="Delivers the goods, gets paid by the contract the moment the buyer confirms."
							icon={
								<svg viewBox="0 0 20 20" className="size-[1.625rem] fill-white/80">
									<path d="M3 3h2l.4 2H17l-1.5 7h-9L5 5H3V3zm4 12a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm7 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
								</svg>
							}
						/>
					</div>

					{/* dispute branch: dashed drop to the jury, plain text */}
					<div className="relative flex flex-col items-center mt-[2.5rem] max-lg:mt-[2rem]">
						<span className="h-[2.25rem] w-px border-l border-dashed border-white/[0.18]" />

						<div className="flex items-center gap-[0.375rem] mt-[1rem]">
							{[0, 1, 2, 3, 4].map((juror) => (
								<span
									key={juror}
									className={
										juror < 3
											? "size-[0.875rem] rounded-full bg-accent-100/80"
											: "size-[0.875rem] rounded-full border border-white/[0.25]"
									}
								/>
							))}
						</div>

						<p className="mt-[0.875rem] text-black-60 text-[0.875rem] leading-[1.5] text-center max-w-[26rem]">
							<span className="text-white font-semibold">If something goes wrong:</span>{" "}
							five random community jurors review the chat and vote. Three of
							five decides, the contract executes.
						</p>
					</div>
				</Reveal>
			</div>
		</div>
	);
}
