'use client';

import { useEffect, useState } from "react";
import { cn } from "~/shared/lib/cn";

/**
 * Quiet activity line for the hero: cycles through escrow moments so
 * the product feels alive without UI pasted over the render. Framed as
 * a preview ("A day on Sella"), not live activity, to stay consistent
 * with the demo/coming-soon story everywhere else.
 */

const events = [
	{ tone: "gold", text: "120 USDC locked in escrow", store: "design-market" },
	{ tone: "green", text: "Funds released to seller", store: "code-lab" },
	{ tone: "gold", text: "499 USDC locked in escrow", store: "chain-foundry" },
	{ tone: "white", text: "New storefront opened", store: "meme-forge" },
	{ tone: "green", text: "Dispute resolved 3–2 for the buyer", store: "alpha-desk" },
	{ tone: "green", text: "Buyer confirmed delivery", store: "kol-boost" },
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
				A day on Sella <span className="text-black-40/60 normal-case tracking-normal">· preview</span>
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
					<span className="text-black-40"> · {event.store}</span>
				</span>
			</div>
		</div>
	);
}
