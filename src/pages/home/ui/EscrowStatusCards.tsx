'use client';

import { useEffect, useState } from "react";
import { cn } from "~/shared/lib/cn";

/**
 * Quiet story line for the hero: plays YOUR first day on Sella as a
 * looping sequence. Future promise, not fake live activity, so it
 * never contradicts the demo/coming-soon story elsewhere.
 */

const events = [
	{ tone: "white", text: "Your storefront opens", detail: "30 seconds, no KYC" },
	{ tone: "gold", text: "First buyer locks 120 USDC in escrow", detail: "money secured before you start" },
	{ tone: "white", text: "You deliver", detail: "the order chat keeps the record" },
	{ tone: "green", text: "Buyer confirms", detail: "funds hit your wallet instantly" },
	{ tone: "green", text: "Review lands on-chain", detail: "reputation you keep forever" },
	{ tone: "gold", text: "Second order comes in", detail: "and the loop starts again" },
] as const;

const toneClass = {
	gold: "bg-accent-100 shadow-[0_0_10px_2px_rgba(255,221,0,0.45)]",
	green: "bg-green-100 shadow-[0_0_10px_2px_rgba(96,176,77,0.45)]",
	white: "bg-white/70 shadow-[0_0_10px_2px_rgba(255,255,255,0.25)]",
} as const;

export function EscrowTicker({ className }: { className?: string }) {
	const [index, setIndex] = useState(0);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setVisible(false);

			setTimeout(() => {
				setIndex((i) => (i + 1) % events.length);
				setVisible(true);
			}, 350);
		}, 3400);

		return () => clearInterval(interval);
	}, []);

	const event = events[index];

	return (
		<div
			className={cn(
				"flex items-center gap-[0.75rem] pt-[1.25rem] border-t border-white/[0.06]",
				className
			)}
			aria-hidden
		>
			<span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-black-40 whitespace-nowrap">
				Your first day on Sella
			</span>

			<div
				className={cn(
					"flex items-center gap-[0.625rem] min-w-0 transition-all duration-350",
					visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[0.375rem]"
				)}
			>
				<span className={cn("size-[0.4375rem] flex-shrink-0 rounded-full", toneClass[event.tone])} />
				<span className="text-black-60 text-[0.875rem] truncate">
					{event.text}
					<span className="text-black-40"> · {event.detail}</span>
				</span>
			</div>
		</div>
	);
}
