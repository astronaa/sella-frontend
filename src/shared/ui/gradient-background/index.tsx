import { HTMLAttributes } from "react";
import { cn } from "~/shared/lib/cn";

export function Background({
	                           className
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("absolute top-0 left-0 w-full h-full bg-[#ffffff0f]", className)}>
			<div
				className="absolute size-full opacity-50 max-md:hidden"
				style={{
					background:
						`radial-gradient(87.01% 70.71% at 100% 100%, rgb(254, 200, 5, 0.8) 0%, rgb(223, 39, 39, 0.3) 50%, transparent 100%), 
						radial-gradient(79.06% 66.04% at 0% 100%, rgb(53, 53, 53) 0%, rgb(15, 15, 15) 100%)`
				}}
			/>
			<div
				className="absolute  size-full opacity-50 md:hidden"
				style={{
					background:
						`radial-gradient(102.54% 70.71% at 100% 0%, rgb(254, 200, 5, 0.8) 0%, rgb(223, 39, 39, 0.3) 75%, transparent 100%), 
						radial-gradient(79.06% 66.04% at 0% 100%, rgb(53, 53, 53) 0%, rgb(15, 15, 15) 100%)`
				}}
			/>
		</div>
	);
}
