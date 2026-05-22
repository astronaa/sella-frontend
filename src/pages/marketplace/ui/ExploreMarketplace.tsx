'use client';

import { cn } from "~/shared/lib/cn";
import { HTMLAttributes } from "react";
import { resolvedTwConfig } from "~/shared/lib/resolved-tw-config";
import { Heading } from "~/shared/ui/kit/heading";
import type { StoresInitialData } from "../api/stores";
import { Scrollable } from "~/shared/ui/scrollable";
import { StoreCard, StoreLink } from "~/entities/store";

interface ExploreMarketplaceProps extends HTMLAttributes<HTMLDivElement> {
	initialData: StoresInitialData;
}

export function ExploreMarketplace({ className, children, initialData, ...props }: ExploreMarketplaceProps) {
	const stores = initialData.items;

	return (
		<div
			className={cn(
				`mx-auto space-y-24 flex flex-col flex-grow justify-between gap-[1rem] relative w-full`,
				className
			)}
			{...props}
		>
			<div className="flex flex-col w-full gap-[3rem]">
				{stores.length > 0 && (
					<>
						<div className="space-y-4 max-w-content m-auto w-full">
							<Heading>
								Explore marketplace
							</Heading>
							<div className="text-black-60 text-balance w-1/2 max-md:w-full max-md:text-wrap">
								Discover a diverse range of one-of-a-kind shops you won&apos;t find anywhere else.
								From digital items to physical goods and unique services!
							</div>
						</div>

						<Scrollable.Root
							className="mx-[-1rem] w-[calc(100%+1rem*2)]"
							style={{
								padding: `0 max(1rem, calc((100% - ${resolvedTwConfig.theme.maxWidth.content} + 2rem) / 2))`
							}}
						>
							<Scrollable.Container className='gap-[1rem]'>
								{stores.map(s => (
									<StoreCard.Root
										key={s.id} store={s}
										className='w-full mx-auto flex-shrink-0' asChild
									>
										<StoreLink>
											<StoreCard.Composition />
										</StoreLink>
									</StoreCard.Root>
								))}
							</Scrollable.Container >
						</Scrollable.Root>
					</>
				)}

				{children}
			</div>
		</div>
	);
}
