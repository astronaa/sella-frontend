import { cn } from "~/shared/lib/cn";
import { HTMLAttributes } from "react";
import { ActionControls } from "./ActionControls";

export function Banner({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"flex flex-col w-full gap-[1rem] py-14 rounded-[1.25rem] text-center bg-white/[.02]",
				"max-md:px-6 max-md:w-auto",
				className
			)}
			{...props}
		>
			<div className="text-5xl text-white font-semibold max-md:text-3xl">
				No KYC. No nonsense.
			</div>
			<div className="text-black-60 max-w-[33rem] mx-auto text-lg max-md:text-base">
				Open your storefront in less than 30 seconds! Start by reserving your storefront handle
			</div>
			<div className="flex justify-center mt-[2rem]">
				<ActionControls />
			</div>
		</div>
	);
}
