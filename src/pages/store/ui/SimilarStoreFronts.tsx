import { StoreCard, StoreLink } from "~/entities/store";
import { cn } from "~/shared/lib/cn";
import { fetchSimilarStores } from "~/pages/store/api";
import { Heading } from "~/shared/ui/kit/heading";

interface SimilarStorefrontsProps {
	className?: string,
	storeUrl: string
}

export async function SimilarStoreFronts({ className, storeUrl }: SimilarStorefrontsProps) {
	const stores = await fetchSimilarStores(storeUrl)

	return (
		<div className={cn('flex flex-col gap-[3rem]', className)}>
			<Heading>Similar Storefronts</Heading>
			<div className='flex gap-10 max-md:flex-col'>
				{stores.map((store) => (
					<StoreLink
						key={store.id} store={store}
						className='w-full mx-auto max-w-[35rem]'
					>
						<StoreCard.Composed store={store} />
					</StoreLink>
				))}
			</div>
		</div>
	)
}
