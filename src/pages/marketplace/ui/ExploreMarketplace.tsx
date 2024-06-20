import { cn } from "~/shared/lib/cn";
import { Carousel } from "~/pages/marketplace/ui/Carousel";
import { HTMLAttributes } from "react";
import { resolvedTwConfig } from "~/shared/lib/resolved-tw-config";
import { Heading } from "~/shared/ui/kit/heading";

export function ExploreMarketplace({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				`mx-auto space-y-24 flex flex-col flex-grow justify-between gap-[1rem] relative w-full`,
				className
			)}
			{...props}
		>
			<div className="flex flex-col w-full gap-[3rem]">
				<div className="space-y-4 max-w-content m-auto w-full">
					<Heading>
						Explore marketplace
					</Heading>
					<div className="text-black-60 text-balance w-1/2 max-md:w-full max-md:text-wrap">
						Discover a diverse range of one-of-a-kind shops you won&apos;t find anywhere else.
						From digital items to physical goods and unique services!
					</div>
				</div>

				<Carousel
					className="mx-[-1rem] w-[calc(100%+1rem*2)]"
					style={{
						padding: `0 max(1rem, calc((100% - ${resolvedTwConfig.theme.maxWidth.content} + 2rem) / 2))`
					}}
				/>

				{children}
			</div>
		</div>
	);
}