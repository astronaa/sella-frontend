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
		<div className="relative overflow-hidden bg-black-100 rounded-b-[3rem] px-[1rem]">
			{/* restrained backdrop: dot grid + single gold radial */}
			<div className="absolute inset-0 lp-grid-texture [mask-image:radial-gradient(70%_70%_at_50%_30%,black,transparent)]" />
			<div
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(48% 42% at 78% 18%, rgba(255,221,0,0.10) 0%, transparent 100%), radial-gradient(60% 50% at 12% 92%, rgba(236,149,21,0.06) 0%, transparent 100%)",
				}}
			/>

			<div className="relative flex items-center justify-between gap-[2rem] w-full max-w-content m-auto max-lg:justify-center">
				<div className="flex flex-col gap-[2.25rem] max-w-[38.5rem] w-full flex-shrink-0 pt-[4.5rem] pb-[6rem] max-md:py-[3.5rem]">
					<div className="flex flex-col gap-[1.5rem]">
						<Eyebrow>Escrow-secured marketplace</Eyebrow>

						<Heading
							size="xl"
							className="tracking-[-0.02em] text-[3.25rem]/[1.1] max-md:text-[2.5rem]/[1.12] whitespace-nowrap max-md:whitespace-normal"
						>
							Sell anything.
							<br />
							<span className="bg-gradient-to-r from-accent-100 via-[#FFE865] to-accent-hover bg-clip-text text-transparent">
								Escrow does the rest.
							</span>
						</Heading>

						<p className="text-black-60 text-[1.125rem] leading-[1.55] max-w-[30rem]">
							Open your web3 storefront in 30 seconds and sell to anyone,
							anywhere. Funds sit in an on-chain escrow until both sides are
							happy. No KYC, no subscription.
						</p>
					</div>

					<div className="flex flex-col gap-[0.5rem] items-start">
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

					<StorefrontOpenControls />

					<EscrowTicker className="max-w-[30rem]" />
				</div>

				{/* artist 3D render, kept clean */}
				<div className="hidden lg:block flex-shrink-0 self-end">
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
