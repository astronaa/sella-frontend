/**
 * Live escrow UI chips floated over the hero 3D render.
 * The render carries the brand; these carry the product story.
 */
export function EscrowStatusCards() {
	return (
		<>
			<div
				className="absolute right-[4.5rem] top-[9%] w-[15.5rem] rounded-[1rem] border border-white/[0.09] bg-[#161616] p-[1rem] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] lp-card-highlight"
				style={{ animation: "lp-float 7s ease-in-out infinite" }}
			>
				<div className="flex items-center gap-[0.625rem]">
					<div className="size-[2rem] rounded-[0.5rem] bg-accent-100/[0.12] border border-accent-100/30 flex items-center justify-center">
						<svg viewBox="0 0 16 16" className="size-[0.9375rem] text-accent-100 fill-current">
							<path d="M8 1a3.5 3.5 0 013.5 3.5V6H12a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h.5V4.5A3.5 3.5 0 018 1zm0 1.5A2 2 0 006 4.5V6h4V4.5a2 2 0 00-2-2z" />
						</svg>
					</div>
					<div className="flex flex-col">
						<span className="text-white text-[0.875rem] font-semibold">Escrow funded</span>
						<span className="text-black-60 text-[0.75rem]">120 USDC held on-chain</span>
					</div>
				</div>
				<div className="mt-[0.875rem] flex items-center gap-[0.375rem]">
					<span className="h-[0.25rem] flex-1 rounded-full bg-accent-100" />
					<span className="h-[0.25rem] flex-1 rounded-full bg-accent-100" />
					<span className="h-[0.25rem] flex-1 rounded-full bg-white/10" />
				</div>
				<div className="mt-[0.5rem] flex justify-between text-[0.6875rem] text-black-40">
					<span>Funded</span>
					<span>Delivered</span>
					<span>Released</span>
				</div>
			</div>

			<div
				className="absolute left-[-2.5rem] bottom-[20%] w-[14.5rem] rounded-[1rem] border border-white/[0.09] bg-[#161616] p-[1rem] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)]"
				style={{ animation: "lp-float-alt 8s ease-in-out infinite" }}
			>
				<div className="flex items-center gap-[0.625rem]">
					<div className="size-[2rem] rounded-full bg-green-100/[0.14] border border-green-100/40 flex items-center justify-center">
						<svg viewBox="0 0 16 16" className="size-[0.875rem] text-green-100 fill-current">
							<path d="M6.1 11.6L2.5 8l1.1-1.1 2.5 2.5 6.3-6.3L13.5 4.2z" />
						</svg>
					</div>
					<div className="flex flex-col">
						<span className="text-white text-[0.875rem] font-semibold">Released to seller</span>
						<span className="text-black-60 text-[0.75rem]">Buyer confirmed delivery</span>
					</div>
				</div>
			</div>
		</>
	);
}
