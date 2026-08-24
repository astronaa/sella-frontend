'use client';

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "~/shared/lib/cn";

const X_URL = "https://x.com/joinsella";

/**
 * Pre-launch modal shown instead of the storefront-create flow while
 * the platform is in preview. Remove once storefront creation is live.
 */
export function LaunchSoonDialog({
	open,
	onClose,
	storeUrl,
}: {
	open: boolean;
	onClose: () => void;
	storeUrl?: string;
}) {
	// portal target only exists client-side
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	useEffect(() => {
		if (!open) return;

		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};

		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	if (!open || !mounted) return null;

	// portal to <body>: ancestors with backdrop-filter (the nav header)
	// become containing blocks for position:fixed, which pinned this
	// dialog to the header instead of the viewport center
	return createPortal(
		<div
			className="fixed inset-0 z-dialog flex items-center justify-center p-[1rem]"
			role="dialog"
			aria-modal="true"
			aria-label="Launching soon"
		>
			<div
				className="absolute inset-0 bg-black/70 backdrop-blur-[6px]"
				onClick={onClose}
			/>

			<div
				className={cn(
					"relative w-full max-w-[26rem] rounded-[1.5rem]",
					"bg-[#161616] p-[2rem] flex flex-col items-center gap-[1.25rem] text-center",
					"shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
				)}
			>
				<button
					onClick={onClose}
					aria-label="Close"
					className="absolute top-[1rem] right-[1rem] flex items-center justify-center size-[2rem] rounded-full border border-white/[0.1] text-black-60 hover:text-white transition"
				>
					<svg viewBox="0 0 16 16" className="size-[0.75rem] fill-current">
						<path d="M8 6.6L12.6 2 14 3.4 9.4 8 14 12.6 12.6 14 8 9.4 3.4 14 2 12.6 6.6 8 2 3.4 3.4 2 8 6.6z" />
					</svg>
				</button>

				<span className="text-[3rem] leading-none">🤝</span>

				<h3 className="text-white font-semibold font-manrope text-[1.5rem] tracking-[-0.01em]">
					Easy there, fren.
				</h3>

				<p className="text-black-60 leading-[1.6]">
					{storeUrl ? (
						<>
							<span className="text-white">sella.to/{storeUrl}</span> is a great
							pick, and it&apos;s not taken yet.{" "}
						</>
					) : null}
					Storefronts open soon, we&apos;re putting the final touches on the
					escrow. Stay tuned, and sub to Sella on X so you don&apos;t miss the
					launch.
				</p>

				<a
					href={X_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center justify-center gap-[0.625rem] w-full rounded-[0.875rem] bg-accent-100 hover:bg-accent-hover transition text-black-100 font-semibold py-[0.875rem]"
				>
					<svg viewBox="0 0 24 24" className="size-[1.125rem] fill-current">
						<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
					</svg>
					Follow @joinsella
				</a>

				<button
					onClick={onClose}
					className="text-black-60 hover:text-white transition text-[0.9375rem]"
				>
					Back to browsing
				</button>
			</div>
		</div>,
		document.body
	);
}
