import { cn } from "~/shared/lib/cn";
import { HTMLAttributes } from "react";
import { ActionControls } from "./ActionControls";

export function Banner({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"relative overflow-hidden flex flex-col w-full gap-[1rem] py-[4.5rem] rounded-[1.5rem] text-center",
				"border border-white/[0.07] bg-white/[0.02] lp-card-highlight",
				"max-md:px-6 max-md:w-auto max-md:py-[3rem]",
				className
			)}
			{...props}
		>
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background:
						"radial-gradient(60% 120% at 50% 130%, rgba(255,221,0,0.10) 0%, transparent 100%)",
				}}
			/>

			<div className="relative text-5xl text-white font-semibold font-manrope tracking-[-0.02em] max-md:text-3xl">
				No KYC. No nonsense.
			</div>
			<div className="relative text-black-60 max-w-[33rem] mx-auto text-lg max-md:text-base">
				Open your storefront in less than 30 seconds. Start by reserving your
				storefront handle.
			</div>
			<div className="relative flex justify-center mt-[1.5rem]">
				<ActionControls />
			</div>
		</div>
	);
}
