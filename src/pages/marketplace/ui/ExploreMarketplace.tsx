import { cn } from "~/shared/lib/cn";
import { Carousel } from "~/pages/marketplace/ui/Carousel";
import { HTMLAttributes } from "react";
import { Store } from "~/shared/api/model";
import { StoreCard, StoreLink } from "~/entities/store";
import { Pagination } from "~/shared/ui/kit/pagination";
import { resolvedTwConfig } from "~/shared/lib/resolved-tw-config";
import { Heading } from "~/shared/ui/kit/heading";

type ExploreMarketplaceProps = HTMLAttributes<HTMLDivElement> & {
	initialData: Store[]
}

export function ExploreMarketplace({ initialData, className, ...props }: ExploreMarketplaceProps) {
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

				<div className="flex flex-col gap-[2rem] max-w-content m-auto w-full max-xl:items-center">
					<div className="grid grid-cols-2 gap-10 max-w-content m-auto max-md:grid-cols-1">
						{initialData.map((store) => (
							<div key={store.id} className="w-full">
								<StoreLink key={store.id} store={store}>
									<StoreCard.Composed
										store={store}
										className='mx-auto'
									/>
								</StoreLink>
							</div>
						))}
					</div>

					<Pagination
						className='w-min'
						count={190}
						pageSize={10}
						siblingCount={1}
						defaultPage={1}
					/>
				</div>
			</div>
		</div>
	);
}
