import { Heading } from "~/shared/ui/kit/heading";
import { Eyebrow, Reveal } from "./shared";

/**
 * Dispute-resolution explainer. Mechanics sourced from the whitepaper
 * (Technology / Solution): disputes are resolved by community voting of
 * randomly selected users, supported by AI; the smart contract automates
 * fund release or withholding based on the outcome.
 */

const pillars = [
	{
		title: "A random jury, not a judge",
		description:
			"Each case gets a jury of five community members selected at random. No fixed moderators, no platform putting a thumb on the scale, no way to know your jurors in advance.",
		icon: (
			<svg viewBox="0 0 20 20" className="size-[1.375rem] fill-current">
				<path d="M10 2a3 3 0 110 6 3 3 0 010-6zM4 7a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm12 0a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm-6 3.5c2.5 0 4.5 1.3 4.5 3V16h-9v-2.5c0-1.7 2-3 4.5-3zM4 13c.5 0 1 .07 1.44.2-.6.66-.94 1.45-.94 2.3V16H1v-1.5C1 13.7 2.3 13 4 13zm12 0c1.7 0 3 .7 3 1.5V16h-3.5v-.5c0-.85-.35-1.64-.94-2.3.44-.13.94-.2 1.44-.2z" />
			</svg>
		),
	},
	{
		title: "AI lays out the evidence",
		description:
			"Jurors vote with the full picture in front of them: the order terms and the complete order chat, with AI surfacing data-backed insights so the human decision is an informed one.",
		icon: (
			<svg viewBox="0 0 20 20" className="size-[1.375rem] fill-current">
				<path d="M10 2l1.8 4.4L16 8l-4.2 1.6L10 14l-1.8-4.4L4 8l4.2-1.6L10 2zm6 8l.9 2.2L19 13l-2.1.8L16 16l-.9-2.2L13 13l2.1-.8L16 10zM4 12l.9 2.2L7 15l-2.1.8L4 18l-.9-2.2L1 15l2.1-.8L4 12z" />
			</svg>
		),
	},
	{
		title: "Majority votes, contract pays",
		description:
			"Three of five votes decides it. The escrow contract executes the verdict on-chain automatically: funds are released or refunded, with no one able to override the outcome.",
		icon: (
			<svg viewBox="0 0 20 20" className="size-[1.375rem] fill-current">
				<path d="M12.6 2l4.9 4.9-1.4 1.4-.7-.7-3.2 3.2.7.7-1.4 1.4-2.1-2.1L4.9 15.3H3v-1.9l4.5-4.5L5.4 6.8 6.8 5.4l.7.7 3.2-3.2-.7-.7L11.4 0l1.2 2zM3 17h14v2H3v-2z" />
			</svg>
		),
	},
];

export function Disputes() {
	return (
		<div className="py-[7rem] max-md:py-[4rem] px-4">
			<div className="flex flex-col gap-[3.5rem] w-full max-w-content m-auto">
				<Reveal className="flex flex-col gap-[1.25rem]">
					<Eyebrow>Dispute resolution</Eyebrow>

					<Heading size="lg" className="tracking-[-0.02em]">
						Disputes are decided by
						<br />
						<span className="bg-gradient-to-r from-accent-100 to-accent-hover bg-clip-text text-transparent">
							the community, not by us.
						</span>
					</Heading>

					<p className="text-black-60 text-[1.0625rem] leading-[1.6] max-w-[36rem] text-balance">
						When a trade goes sideways, no support ticket decides your money.
						A decentralized process does, and the contract enforces whatever it
						concludes.
					</p>
				</Reveal>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-[1.25rem]">
					{pillars.map((pillar, index) => (
						<Reveal
							key={pillar.title}
							delay={index * 90}
							className="relative flex flex-col gap-[1rem] rounded-[1.5rem] border border-white/[0.07] bg-white/[0.03] p-[1.75rem] lp-card-highlight"
						>
							<span className="flex items-center justify-center size-[2.75rem] rounded-[0.75rem] bg-accent-100/[0.1] border border-accent-100/25 text-accent-100">
								{pillar.icon}
							</span>
							<h3 className="text-white font-semibold text-[1.125rem]">
								{pillar.title}
							</h3>
							<p className="text-black-60 leading-[1.6] text-[0.9375rem]">
								{pillar.description}
							</p>
						</Reveal>
					))}
				</div>
			</div>
		</div>
	);
}
