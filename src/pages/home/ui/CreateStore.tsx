import { Heading } from "~/shared/ui/kit/heading";
import { StorefrontOpenControls } from "~/widgets/storefront-open";
import { Reveal } from "./shared";

const points = ["About 30 seconds to launch", "Sell anything*", "Fees only on successful trades"];

export function CreateStore() {
	return (
		<div className="px-4 pb-[2rem] md:px-[1.25rem]">
			<div className="relative overflow-hidden rounded-[3rem] bg-black-100 px-[1rem] py-[7rem] max-md:py-[4.5rem]">
				<div className="absolute inset-0 lp-grid-texture [mask-image:radial-gradient(60%_80%_at_50%_100%,black,transparent)]" />
				<div
					className="absolute inset-0"
					style={{
						background:
							"radial-gradient(55% 70% at 50% 115%, rgba(255,221,0,0.16) 0%, rgba(236,149,21,0.05) 55%, transparent 100%)",
					}}
				/>

				<Reveal className="relative flex flex-col items-center gap-[2.25rem] text-center max-w-[46rem] m-auto">
					<Heading size="lg" className="tracking-[-0.02em] text-balance">
						Open your storefront.
						<br />
						<span className="bg-gradient-to-r from-accent-100 via-[#FFE865] to-accent-hover bg-clip-text text-transparent">
							The escrow is already waiting.
						</span>
					</Heading>

					<p className="text-black-60 text-[1.0625rem] leading-[1.6] max-w-[32rem]">
						Become a globally accessible seller and start your digital business
						today.
					</p>

					<div className="flex flex-wrap justify-center gap-[0.5rem]">
						{points.map((point) => (
							<span
								key={point}
								className="rounded-full border border-white/[0.09] bg-white/[0.03] px-[0.875rem] py-[0.4375rem] text-[0.8125rem] text-black-74"
							>
								{point}
							</span>
						))}
					</div>

					<div className="w-full max-w-[30rem] [&>*]:justify-center">
						<StorefrontOpenControls />
					</div>
				</Reveal>
			</div>
		</div>
	);
}
