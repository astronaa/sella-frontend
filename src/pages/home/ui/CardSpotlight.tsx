'use client';

import { useEffect } from "react";

/**
 * One delegated listener feeds every .lp-spot card the cursor position
 * as CSS vars; the card's ::after paints a gold wash of light that
 * follows the hand (see globals.css). Renders nothing.
 */
export function CardSpotlight() {
	useEffect(() => {
		const onMove = (e: PointerEvent) => {
			const target = e.target as Element | null;
			const card = target?.closest?.(".lp-spot") as HTMLElement | null;
			if (!card) return;
			const rect = card.getBoundingClientRect();
			card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
			card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
		};
		document.addEventListener("pointermove", onMove, { passive: true });
		return () => document.removeEventListener("pointermove", onMove);
	}, []);

	return null;
}
