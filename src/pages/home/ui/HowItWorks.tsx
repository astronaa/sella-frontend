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

/**
 * Connector between two medallions. The line is stretched with negative
 * margins so it physically touches both circle edges (extendLeft/Right
 * cover the flex gap plus the empty half of each node column), and the
 * whole column is padded so the line sits exactly on the circle-center
 * axis (2.25rem from the top of the row).
 */
function FlowLine({
	label,
	sublabel,
	dotClass,
	stepClass,
	extendLeft,
	extendRight,
}: {
	label: string;
	sublabel: string;
	dotClass: string;
	stepClass: string;
	extendLeft: string;
	extendRight: string;
}) {
	return (
		<div className={`relative flex flex-col items-center gap-[0.625rem] flex-1 min-w-[5rem] pt-[0.625rem] max-lg:hidden ${stepClass}`}>
			<span className="text-accent-100/90 text-[0.75rem] leading-[1rem] font-semibold uppercase tracking-[0.14em] whitespace-nowrap">
				{label}
			</span>
			<div
				className="relative self-stretch h-px bg-gradient-to-r from-accent-100/[0.15] via-accent-100/50 to-accent-100/[0.15]"
				style={{ marginLeft: extendLeft, marginRight: extendRight }}
			>
				<span className={`lp-dot ${dotClass}`} />
				{/* arrowhead into the receiving side */}
				<span className="absolute right-0 top-1/2 -translate-y-1/2 size-0 border-y-[0.25rem] border-y-transparent border-l-[0.4rem] border-l-accent-100/70" />
			</div>
			<span className="text-black-40 text-[0.75rem] leading-[1rem] whitespace-nowrap">{sublabel}</span>
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
			{/* ambient: glow + faint grid straight on the page background.
			    The glow is the dithered texture, not a CSS gradient — the
			    gradient quantized into visible rings on this dark a bg */}
			<div className="absolute inset-x-0 top-[36%] bottom-0 lp-grid-texture [mask-image:radial-gradient(55%_65%_at_50%_45%,black,transparent)] pointer-events-none" />
			<div className="lp-glow absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 w-[92%] h-[86%] opacity-70" />

			<div className="relative flex flex-col gap-[5.5rem] max-md:gap-[3.5rem] w-full max-w-content m-auto">
				<Reveal className="flex flex-col gap-[1.5rem] items-center text-center">
					<Eyebrow>What is Sella</Eyebrow>

					<Heading size="lg" className="tracking-[-0.02em] max-w-[46rem] text-balance">
						Sell anything to anyone.
						<br />
						<span className="bg-gradient-to-r from-[#FFE865] via-accent-100 to-[#FFC933] bg-clip-text text-transparent">
							The contract makes it safe.
						</span>
					</Heading>

					<p className="text-black-60 text-[1.0625rem] leading-[1.65] max-w-[38rem]">
						Freelance platform, storefront, and marketplace in one. If you
						can deliver it, you can sell it. Every payment sits in an
						on-chain escrow that nobody can run away with, so scams simply
						stop working.
					</p>

					<div className="flex flex-wrap justify-center gap-[0.5rem]">
						{chips.map((chip) => (
							<span
								key={chip}
								className="rounded-full bg-white/[0.05] px-[0.875rem] py-[0.4375rem] text-[0.8125rem] text-black-74"
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
					{/* delivery path, desktop only: a square route from the
					    seller circle up, across, and down to the buyer circle.
					    Labels sit ABOVE the route so the space between the
					    route and the medallions stays clear. One signal dot
					    rides all three segments in sequence. */}
					<div className="relative hidden lg:block h-[6rem] mb-[0.5rem]">
						<span className="lp-step-2 absolute left-1/2 -translate-x-1/2 top-0 text-[0.75rem] leading-[1rem] font-semibold uppercase tracking-[0.14em] text-accent-100/90 whitespace-nowrap">
							2 · Delivery
						</span>
						<span className="lp-step-2 absolute left-1/2 -translate-x-1/2 top-[1.25rem] text-[0.75rem] leading-[1rem] text-black-40 whitespace-nowrap">
							goes direct, the order chat keeps the record
						</span>

						{/* up from seller */}
						<span className="lp-step-2 absolute right-[6.5rem] top-[2.875rem] bottom-0 w-px border-l border-dashed border-white/[0.22]">
							<span className="lp-dot-v lp-dot-deliver-up" />
						</span>
						{/* across, right to left */}
						<div className="lp-step-2 absolute left-[6.5rem] right-[6.5rem] top-[2.875rem] h-px border-t border-dashed border-white/[0.22]">
							<span className="lp-dot lp-dot-deliver" />
						</div>
						{/* down to buyer, with the arrowhead landing on it */}
						<span className="lp-step-2 absolute left-[6.5rem] top-[2.875rem] bottom-0 w-px border-l border-dashed border-white/[0.22]">
							<span className="lp-dot-v lp-dot-deliver-down" />
						</span>
						<span className="lp-step-2 absolute left-[6.5rem] -translate-x-1/2 bottom-[-0.25rem] size-0 border-x-[0.3rem] border-x-transparent border-t-[0.45rem] border-t-accent-100/80" />
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

						<FlowLine
							label="1 · Payment"
							sublabel="funds locked · USDC, USDT or ETH"
							dotClass="lp-dot-pay"
							stepClass="lp-step-1"
							extendLeft="-5rem"
							extendRight="-4.5rem"
						/>

						{/* escrow vault: medallion, no card. Shifted up 0.75rem so
						    its 6rem circle centers on the same axis as the 4.5rem
						    buyer/seller circles */}
						<div className="flex flex-col items-center gap-[0.875rem] w-[16rem] max-lg:w-full max-lg:max-w-[18rem] text-center lg:-mt-[0.75rem]">
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

						<FlowLine
							label="3 · Release"
							sublabel="buyer confirms · or auto-release at window end"
							dotClass="lp-dot-release"
							stepClass="lp-step-3"
							extendLeft="-4.5rem"
							extendRight="-5rem"
						/>

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

					{/* dispute branch: dashed drop into a labeled jury vote.
					    The label pill and voter icons keep the five circles
					    from reading as slide-indicator dots. */}
					<div className="relative flex flex-col items-center mt-[2rem] max-lg:mt-[1.5rem]">
						<span className="h-[2rem] w-px border-l border-dashed border-white/[0.18]" />

						<span className="mt-[0.75rem] rounded-full bg-white/[0.05] px-[0.875rem] py-[0.375rem] text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-black-60">
							If something goes wrong
						</span>

						<div className="flex items-center gap-[0.5rem] mt-[1rem]">
							{[0, 1, 2, 3, 4].map((juror) => {
								const voted = juror < 3;

								return (
									<span
										key={juror}
										className={
											voted
												? "flex items-center justify-center size-[1.75rem] rounded-full bg-accent-100 text-black-100"
												: "flex items-center justify-center size-[1.75rem] rounded-full border border-white/[0.22] text-white/40"
										}
									>
										{voted ? (
											<svg viewBox="0 0 16 16" className="size-[0.75rem] fill-current">
												<path d="M6.1 11.6L2.5 8l1.1-1.1 2.5 2.5 6.3-6.3L13.5 4.2z" />
											</svg>
										) : (
											<svg viewBox="0 0 16 16" className="size-[0.75rem] fill-current">
												<path d="M8 2a2.6 2.6 0 110 5.2A2.6 2.6 0 018 2zm0 6.4c2.9 0 5.2 1.5 5.2 3.4V13H2.8v-1.2c0-1.9 2.3-3.4 5.2-3.4z" />
											</svg>
										)}
									</span>
								);
							})}

							<span className="ms-[0.375rem] text-[0.8125rem] font-semibold text-accent-100 whitespace-nowrap">
								3 of 5 decides
							</span>
						</div>

						<p className="mt-[0.875rem] text-black-60 text-[0.875rem] leading-[1.5] text-center max-w-[26rem]">
							Five random community jurors review the order chat and vote.
							Majority wins, and the contract executes the outcome on its own.
						</p>

						{/* the two possible verdicts, executed by the contract.
						    Equal-width pills so the "or" sits dead center. */}
						<div className="flex items-center gap-[0.625rem] mt-[0.875rem] text-[0.8125rem]">
							<span className="w-[9.5rem] text-center rounded-full bg-white/[0.05] py-[0.375rem] text-black-74">
								Refund the buyer
							</span>
							<span className="text-black-40">or</span>
							<span className="w-[9.5rem] text-center rounded-full bg-accent-100/[0.08] py-[0.375rem] text-accent-100">
								Pay the seller
							</span>
						</div>
					</div>
				</Reveal>
			</div>
		</div>
	);
}
