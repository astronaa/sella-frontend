'use client';

import { useEffect, useState } from "react";
import { cn } from "~/shared/lib/cn";

/**
 * Dispute vignette next to the section heading, played as a loop of
 * real scenarios: a case is presented to the jury, five votes land one
 * by one, and the verdict executes. Scenarios alternate so one cycle
 * ends in the seller's favor and the next in the buyer's.
 */

type Side = "buyer" | "seller";

interface Scenario {
	caseTitle: string;
	buyerClaim: string;
	sellerClaim: string;
	votes: Side[];
	tally: string;
	verdict: string;
	winner: Side;
}

const scenarios: Scenario[] = [
	{
		caseTitle: "Case #114 · TG sticker set · 45 USDC",
		buyerClaim: "they're not animated",
		sellerClaim: "listing says static pack",
		votes: ["seller", "buyer", "seller", "seller", "seller"],
		tally: "4 : 1",
		verdict: "escrow released to the seller",
		winner: "seller",
	},
	{
		caseTitle: "Case #127 · WL spot bundle · 90 USDC",
		buyerClaim: "third spot never appeared",
		sellerClaim: "project moved the snapshot",
		votes: ["buyer", "seller", "buyer", "buyer", "seller"],
		tally: "3 : 2",
		verdict: "escrow refunded to the buyer",
		winner: "buyer",
	},
	{
		caseTitle: "Case #131 · logo + brand kit · 199 USDC",
		buyerClaim: "it's a stock template",
		sellerClaim: "all original work",
		votes: ["buyer", "buyer", "buyer", "buyer", "buyer"],
		tally: "5 : 0",
		verdict: "escrow refunded to the buyer",
		winner: "buyer",
	},
	{
		caseTitle: "Case #138 · dev sprint · 800 USDC",
		buyerClaim: "features are missing",
		sellerClaim: "those were never in scope",
		votes: ["seller", "seller", "buyer", "seller", "buyer"],
		tally: "3 : 2",
		verdict: "escrow released to the seller",
		winner: "seller",
	},
];

/* one tick ≈ 0.9s; steps: 0-2 case presented, 3-7 votes land one by
   one, 8-11 verdict revealed, then the next case starts. Scenario and
   step both derive from a single tick counter so the state updater
   stays pure (StrictMode double-invocation kept the old version stuck
   on scenario one). */
const TOTAL_STEPS = 12;
const VOTE_START = 3;

export function JuryVignette() {
	const [tick, setTick] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => setTick((t) => t + 1), 900);
		return () => clearInterval(interval);
	}, []);

	const scenarioIndex = Math.floor(tick / TOTAL_STEPS) % scenarios.length;
	const step = tick % TOTAL_STEPS;

	const scenario = scenarios[scenarioIndex];
	const votesShown = Math.max(0, step - VOTE_START + 1);
	const verdictShown = step >= VOTE_START + 5;

	return (
		<div className="hidden lg:flex flex-col items-center gap-[0.875rem] flex-shrink-0 w-[24rem]" aria-hidden>
			{/* the case, presented to the jury */}
			<div
				key={scenario.caseTitle}
				className={cn(
					"w-full rounded-[0.875rem] bg-white/[0.04] px-[1.125rem] py-[0.875rem] transition-opacity duration-500",
					step === 0 ? "opacity-0" : "opacity-100"
				)}
			>
				<div className="text-white text-[0.875rem] font-semibold">{scenario.caseTitle}</div>
				<div className="mt-[0.375rem] text-[0.8125rem] leading-[1.5] text-black-60">
					<span className="text-black-74">Buyer:</span> &ldquo;{scenario.buyerClaim}&rdquo;
					<br />
					<span className="text-black-74">Seller:</span> &ldquo;{scenario.sellerClaim}&rdquo;
				</div>
			</div>

			<span className="h-[1.125rem] w-px border-l border-dashed border-white/[0.18]" />

			{/* jurors and their votes */}
			<div className="flex gap-[1.125rem]">
				{scenario.votes.map((vote, index) => (
					<div key={`${scenarioIndex}-${index}`} className="flex flex-col items-center gap-[0.5rem]">
						<span className="flex items-center justify-center size-[2.5rem] rounded-full bg-[#111111] shadow-[0_0_30px_-10px_rgba(255,255,255,0.2)]">
							<svg viewBox="0 0 16 16" className="size-[0.9375rem] fill-white/60">
								<path d="M8 2a2.6 2.6 0 110 5.2A2.6 2.6 0 018 2zm0 6.4c2.9 0 5.2 1.5 5.2 3.4V13H2.8v-1.2c0-1.9 2.3-3.4 5.2-3.4z" />
							</svg>
						</span>

						<span
							className={cn(
								"size-[0.75rem] rounded-full transition-all duration-300",
								index < votesShown ? "opacity-100 scale-100" : "opacity-0 scale-50",
								vote === "seller"
									? "bg-accent-100 shadow-[0_0_8px_2px_rgba(255,221,0,0.4)]"
									: "bg-white/80 shadow-[0_0_8px_2px_rgba(255,255,255,0.25)]"
							)}
						/>
					</div>
				))}
			</div>

			{/* verdict, executed by the contract */}
			<div
				className={cn(
					"flex items-center gap-[0.625rem] transition-all duration-500",
					verdictShown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[0.375rem]"
				)}
			>
				<span
					className={cn(
						"font-semibold text-[1rem]",
						scenario.winner === "seller" ? "text-accent-100" : "text-white/90"
					)}
				>
					{scenario.tally}
				</span>
				<span
					className={cn(
						"rounded-full px-[0.875rem] py-[0.375rem] text-[0.8125rem]",
						scenario.winner === "seller"
							? "bg-accent-100/[0.09] text-accent-100"
							: "bg-white/[0.06] text-black-74"
					)}
				>
					{scenario.verdict}
				</span>
			</div>

			<div className="flex items-center gap-[1rem] text-[0.6875rem] text-black-40">
				<span className="flex items-center gap-[0.375rem]">
					<span className="size-[0.4375rem] rounded-full bg-accent-100" /> vote for the seller
				</span>
				<span className="flex items-center gap-[0.375rem]">
					<span className="size-[0.4375rem] rounded-full bg-white/80" /> vote for the buyer
				</span>
			</div>
		</div>
	);
}
