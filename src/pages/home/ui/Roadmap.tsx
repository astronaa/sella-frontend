import { Heading } from "~/shared/ui/kit/heading";
import { Aura, Eyebrow, Reveal } from "./shared";

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

/* node fills are SOLID so the rail line never shows through them */
const nodeClass: Record<PhaseStatus, string> = {
	live: "bg-accent-100 text-black-100 shadow-[0_0_24px_-4px_rgba(255,221,0,0.6)]",
	"in-progress": "bg-[#2a2410] text-accent-100",
	upcoming: "bg-[#1b1b1b] text-black-60",
};

const statusClass: Record<PhaseStatus, string> = {
	live: "bg-green-100/[0.12] text-green-100",
	"in-progress": "bg-accent-100/[0.1] text-accent-100",
	upcoming: "bg-white/[0.05] text-black-60",
};

export function Roadmap() {
	return (
		<div className="relative overflow-hidden py-[7rem] max-md:py-[4rem] px-4">
			<Aura className="top-[-6rem] left-1/2 -translate-x-1/2 w-[60rem] h-[34rem]" />
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

				{/* horizontal timeline: phases march left to right along a
				    dashed rail, same visual language as the escrow diagram.
				    Falls back to a 2-col grid below lg. */}
				<Reveal delay={80} className="relative w-full">
					<span
						className="hidden lg:block absolute left-[1.25rem] right-[1.25rem] top-[1.25rem] h-px border-t border-dashed border-white/[0.14]"
						aria-hidden
					/>
					{/* a trade travelling the waves, phase to phase */}
					<span className="lp-rail-spark hidden lg:block" aria-hidden />

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-[1.5rem] gap-y-[2.5rem]">
						{phases.map((item) => (
							<div key={item.phase} className="relative flex flex-col items-start gap-[0.875rem]">
								<span
									className={`relative z-[1] flex items-center justify-center size-[2.5rem] flex-shrink-0 rounded-full font-semibold text-[0.875rem] ${nodeClass[item.status]}`}
								>
									{item.phase}
								</span>

								<span
									className={`rounded-full px-[0.75rem] py-[0.25rem] text-[0.75rem] font-semibold ${statusClass[item.status]}`}
								>
									{item.statusLabel}
								</span>

								<span className="text-white font-semibold text-[1.0625rem] leading-[1.3]">
									{item.title}
								</span>

								<p className="text-black-60 text-[0.875rem] leading-[1.6]">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</Reveal>
			</div>
		</div>
	);
}
