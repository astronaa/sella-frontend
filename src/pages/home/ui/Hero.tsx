import { Heading } from "~/shared/ui/kit/heading";
import { VideoAnimationPlayer } from "~/shared/ui/video-anim-player";
import { StorefrontOpenControls } from "~/widgets/storefront-open";
import { EscrowTicker } from "./EscrowStatusCards";
import { Eyebrow } from "./shared";

/* two balanced rows of three, rendered as explicit rows so the
   wrap never lands 4-and-1 */
const chipRows = [
	["30-second setup", "No KYC", "No subscription"],
	["Digital & physical", "On-chain escrow", "Instant payouts"],
];

export function Hero() {
	return (
		// fills the rest of the viewport below the header (~6rem of flow
		// above), so the next section only appears on scroll
		<div className="relative overflow-hidden bg-black-100 rounded-b-[3rem] px-[1rem] flex flex-col min-h-[calc(100svh-6rem)]">
			{/* restrained backdrop: dot grid + two pools of the dithered
			    glow texture (CSS radials band into rings on this bg) */}
			<div className="absolute inset-0 lp-grid-texture [mask-image:radial-gradient(70%_70%_at_50%_30%,black,transparent)]" />
			<div className="lp-glow absolute left-[78%] top-[18%] -translate-x-1/2 -translate-y-1/2 w-[96%] h-[84%] opacity-75" />
			<div className="lp-glow absolute left-[12%] top-[92%] -translate-x-1/2 -translate-y-1/2 w-[120%] h-[100%] opacity-45" />

			<div className="relative flex flex-1 items-center justify-between gap-[2rem] w-full max-w-content m-auto max-lg:justify-center">
				<div className="flex flex-col gap-[2.25rem] max-w-[38.5rem] w-full flex-shrink-0 py-[3rem] max-md:py-[3rem]">
					<div className="flex flex-col gap-[1.5rem]">
						<Eyebrow className="lp-enter lp-enter-1">Escrow-secured marketplace</Eyebrow>

						{/* size lg, no per-use text-[] override: the Heading kit
						    concatenates classes without twMerge, so an override
						    races the variant in stylesheet order (xl was winning
						    at 72px and the nowrap line painted past the column) */}
						{/* each line rises out of its own mask instead of the whole
						    block fading in — the first-paint moment of the page */}
						<Heading size="lg" className="tracking-[-0.02em]">
							<span className="lp-enter-mask">
								<span className="lp-enter-line">Sell anything.</span>
							</span>
							{/* stay inside the gold family: ending on accent-hover
							    orange made the tail of the line read as a second
							    color */}
							<span className="lp-enter-mask">
								<span className="lp-enter-line lp-enter-line-2 lp-shimmer bg-gradient-to-r from-[#FFE865] via-accent-100 to-[#FFC933] bg-clip-text text-transparent">
									Escrow does the rest.
								</span>
							</span>
						</Heading>

						<p className="lp-enter lp-enter-3 text-black-60 text-[1.125rem] leading-[1.55] max-w-[30rem]">
							Open your web3 storefront in 30 seconds and sell to anyone,
							anywhere. Funds sit in an on-chain escrow until both sides are
							happy. No KYC, no subscription.
						</p>
					</div>

					<div className="lp-enter lp-enter-4 flex flex-col gap-[0.5rem] items-start">
						{chipRows.map((row) => (
							<div key={row[0]} className="flex flex-wrap gap-[0.5rem]">
								{row.map((chip) => (
									<span
										key={chip}
										className="rounded-full bg-white/[0.05] px-[0.875rem] py-[0.4375rem] text-[0.8125rem] text-black-74"
									>
										{chip}
									</span>
								))}
							</div>
						))}
					</div>

					<div className="lp-enter lp-enter-5">
						<StorefrontOpenControls />
					</div>

					<EscrowTicker className="lp-enter lp-enter-6 max-w-[30rem]" />
				</div>

				{/* artist 3D render, kept clean. Centered with the copy: with
				    the hero at viewport height, self-end glued it too low */}
				<div className="lp-enter lp-enter-3 relative hidden lg:block flex-shrink-0 self-center mt-[2rem]">
					{/* breathing pool of light behind the shelf so the render
					    sits in the room instead of floating in the void */}
					<div className="lp-aura lp-aura-breathe inset-[-8%]" aria-hidden />
					<VideoAnimationPlayer
						className="w-[30rem] xl:w-[44rem] h-[44rem]"
						src="/videos/hero-anim2.webm"
						srcHevc="/videos/hero-anim2.mov"
					/>
				</div>
			</div>
		</div>
	);
}
