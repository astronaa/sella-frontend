import { Heading } from "~/shared/ui/kit/heading";
import { Eyebrow, Reveal } from "./shared";

/**
 * Launch timeline. Tone matters: the platform is FINISHED and being
 * released in waves, so every phase reads as "opening", never as
 * "building". No calendar dates: phases gate on the previous wave
 * proving solid, which is the honest version of a gradual launch.
 */

type PhaseStatus = "live" | "in-progress" | "upcoming";

interface Phase {
	phase: string;
	title: string;
	status: PhaseStatus;
	statusLabel: string;
	description: string;
}

const phases: Phase[] = [
	{
		phase: "01",
		title: "Sella announced",
		status: "live",
		statusLabel: "live now",
		description:
			"Out of stealth: the site, the whitepaper, the demo shops, and the escrow contract live on Ethereum.",
	},
	{
		phase: "02",
		title: "Quests open",
		status: "upcoming",
		statusLabel: "coming soon",
		description:
			"Points, referrals, and community roles. Start earning before the first trade settles.",
	},
	{
		phase: "03",
		title: "Launch partners onboard",
		status: "in-progress",
		statusLabel: "in progress",
		description:
			"Creators, communities, and web3 brands get seeded storefronts, so opening day has full shelves.",
	},
	{
		phase: "04",
		title: "Storefront creation opens",
		status: "upcoming",
		statusLabel: "next wave",
		description:
			"Reserved handles become real storefronts, wave by wave. Your look, your listings, your domain.",
	},
	{
		phase: "05",
		title: "Escrow trading begins",
		status: "upcoming",
		statusLabel: "then",
		description:
			"The first cohort sells with full escrow, jury disputes, and instant payouts. We open the gates, not the workshop.",
	},
	{
		phase: "06",
		title: "Doors open for everyone",
		status: "upcoming",
		statusLabel: "full launch",
		description:
			"Open registration worldwide and $SELLA utility switched on. The marketplace at full speed.",
	},
];

const nodeClass: Record<PhaseStatus, string> = {
	live: "bg-accent-100 text-black-100 shadow-[0_0_24px_-4px_rgba(255,221,0,0.6)]",
	"in-progress": "bg-accent-100/[0.15] text-accent-100",
	upcoming: "bg-white/[0.05] text-black-60",
};

const statusClass: Record<PhaseStatus, string> = {
	live: "bg-green-100/[0.12] text-green-100",
	"in-progress": "bg-accent-100/[0.1] text-accent-100",
	upcoming: "bg-white/[0.05] text-black-60",
};

export function Roadmap() {
	return (
		<div className="py-[7rem] max-md:py-[4rem] px-4">
			<div className="flex flex-col gap-[4rem] max-md:gap-[3rem] w-full max-w-content m-auto">
				<Reveal className="flex flex-col items-center text-center gap-[1.5rem]">
					<Eyebrow>Launch timeline</Eyebrow>

					<Heading size="lg" className="tracking-[-0.02em]">
						Built. Now shipping
						<br />
						<span className="bg-gradient-to-r from-[#FFE865] via-accent-100 to-[#FFC933] bg-clip-text text-transparent">
							in waves.
						</span>
					</Heading>

					<p className="text-black-60 text-[1.0625rem] leading-[1.65] max-w-[38rem]">
						Sella isn&apos;t a promise on a slide. The platform is finished,
						and we&apos;re opening it in stages: each wave goes live once the
						one before it has proven solid.
					</p>
				</Reveal>

				{/* vertical timeline: dashed rail through medallion nodes,
				    same visual language as the escrow diagram */}
				<Reveal delay={80} className="relative max-w-[46rem] w-full mx-auto">
					<span
						className="absolute left-[1.25rem] top-[1.25rem] bottom-[1.25rem] w-px border-l border-dashed border-white/[0.14]"
						aria-hidden
					/>

					<div className="flex flex-col gap-[2.75rem] max-md:gap-[2.25rem]">
						{phases.map((item) => (
							<div key={item.phase} className="relative flex gap-[1.5rem] max-md:gap-[1.125rem]">
								<span
									className={`relative z-[1] flex items-center justify-center size-[2.5rem] flex-shrink-0 rounded-full font-semibold text-[0.875rem] ${nodeClass[item.status]}`}
								>
									{item.phase}
								</span>

								<div className="flex flex-col gap-[0.375rem] pt-[0.25rem]">
									<div className="flex items-center gap-[0.75rem] flex-wrap">
										<span className="text-white font-semibold text-[1.125rem]">
											{item.title}
										</span>
										<span
											className={`rounded-full px-[0.75rem] py-[0.25rem] text-[0.75rem] font-semibold ${statusClass[item.status]}`}
										>
											{item.statusLabel}
										</span>
									</div>
									<p className="text-black-60 text-[0.9375rem] leading-[1.6] max-w-[36rem]">
										{item.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</Reveal>
			</div>
		</div>
	);
}
