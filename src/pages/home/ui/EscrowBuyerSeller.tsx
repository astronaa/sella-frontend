import { Heading } from "~/shared/ui/kit/heading";
import { VideoAnimationPlayer } from "~/shared/ui/video-anim-player";
import { StorefrontOpenControls } from "~/widgets/storefront-open";
import { Eyebrow, Reveal } from "./shared";

interface FlowStep {
	step: string;
	title: string;
	description: string;
}

const flowSteps: FlowStep[] = [
	{
		step: "01",
		title: "Buyer pays",
		description: "Payment goes straight into the escrow smart contract, not to the seller.",
	},
	{
		step: "02",
		title: "Funds locked on-chain",
		description: "Neither side can touch the money while the order is in progress.",
	},
	{
		step: "03",
		title: "Seller delivers",
		description: "Goods, files or services change hands. Chat keeps the full record.",
	},
	{
		step: "04",
		title: "Escrow releases",
		description: "Buyer confirms, the contract pays the seller. Instantly, on-chain.",
	},
];

export function EscrowBuyerSeller() {
	return (
		<div
			id="features"
			className="relative overflow-hidden rounded-[3rem] px-4 py-[6.5rem] max-md:py-[4rem] md:m-[1.25rem] bg-black-100"
		>
			<div className="absolute inset-0 lp-grid-texture [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]" />
			<div
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(50% 40% at 85% 8%, rgba(255,221,0,0.09) 0%, transparent 100%)",
				}}
			/>

			<div className="relative w-full max-w-content m-auto flex flex-col gap-[4.5rem]">
				{/* header row: copy left, artist render right */}
				<div className="flex items-center justify-between gap-[2rem] max-lg:justify-center">
					<Reveal className="flex flex-col gap-[1.5rem] max-w-[34rem]">
						<Eyebrow>How escrow works</Eyebrow>

						<Heading size="lg" className="tracking-[-0.02em]">
							Trust, written into
							<br />
							<span className="bg-gradient-to-r from-accent-100 to-accent-hover bg-clip-text text-transparent">
								the contract.
							</span>
						</Heading>

						<p className="text-black-60 text-[1.0625rem] leading-[1.6]">
							Every sale on Sella runs through an escrow smart contract. The
							money only moves when both sides are satisfied, so strangers can
							trade like they have known each other for years. We never hold
							your funds, and we never take sides.
						</p>

						<div className="flex flex-wrap gap-[0.5rem]">
							{["Non-custodial", "Every trade covered", "Neutral dispute resolution"].map((chip) => (
								<span
									key={chip}
									className="rounded-full border border-accent-100/20 bg-accent-100/[0.06] px-[0.875rem] py-[0.4375rem] text-[0.8125rem] text-accent-100"
								>
									{chip}
								</span>
							))}
						</div>
					</Reveal>

					<VideoAnimationPlayer
						src="/videos/ecrow.webm"
						srcHevc="/videos/ecrow.mov"
						className="flex-shrink-0 w-[24rem] xl:w-[30rem] hidden lg:block"
					/>
				</div>

				{/* flow diagram */}
				<div className="relative">
					{/* connector line behind cards */}
					<div className="absolute left-[6%] right-[6%] top-[2.4rem] h-px hidden xl:block bg-gradient-to-r from-transparent via-accent-100/40 to-transparent" />

					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[1.25rem]">
						{flowSteps.map((step, index) => (
							<Reveal
								key={step.step}
								delay={index * 90}
								className="relative flex flex-col gap-[1rem] rounded-[1.25rem] border border-white/[0.07] bg-white/[0.03] p-[1.5rem] lp-card-highlight"
							>
								<div className="flex items-center gap-[0.75rem]">
									<span className="flex items-center justify-center size-[2.75rem] rounded-full border border-accent-100/40 bg-black-100 text-accent-100 font-semibold text-[0.9375rem] shadow-[0_0_20px_-4px_rgba(255,221,0,0.35)]">
										{step.step}
									</span>
									<span className="text-white font-semibold text-[1.0625rem]">
										{step.title}
									</span>
								</div>
								<p className="text-black-60 leading-[1.55] text-[0.9375rem]">
									{step.description}
								</p>
							</Reveal>
						))}
					</div>

					{/* dispute branch */}
					<Reveal
						delay={380}
						className="mt-[1.25rem] flex items-center gap-[1rem] rounded-[1.25rem] border border-white/[0.07] bg-white/[0.02] px-[1.5rem] py-[1.125rem] max-md:flex-col max-md:items-start"
					>
						<span className="flex items-center gap-[0.5rem] text-white font-semibold whitespace-nowrap">
							<svg viewBox="0 0 16 16" className="size-[1.125rem] text-accent-100 fill-current">
								<path d="M8 1.5l6.5 11.3H1.5L8 1.5zm-.75 4.5v3.5h1.5V6h-1.5zm0 4.75v1.5h1.5v-1.5h-1.5z" />
							</svg>
							Something goes wrong?
						</span>
						<p className="text-black-60 text-[0.9375rem] leading-[1.55]">
							Either side can open a dispute. Funds stay locked while a randomly
							selected community jury reviews the order, votes, and the majority
							decides. The contract executes the outcome automatically.
						</p>
					</Reveal>
				</div>

				<div className="max-w-[34rem]">
					<StorefrontOpenControls />
				</div>
			</div>
		</div>
	);
}
