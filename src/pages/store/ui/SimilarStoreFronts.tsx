import { StoreCard, StoreLink } from "~/entities/store";
import { cn } from "~/shared/lib/cn";
import { StoreId } from "~/shared/api/model";
import { fetchSimilarStores } from "~/pages/store/api";
import { Heading } from "~/shared/ui/kit/heading";

export async function SimilarStoreFronts({ className, storeId }: { className?: string, storeId: StoreId }) {
	const stores = await fetchSimilarStores(storeId)

	return (
		<div className={cn('flex flex-col gap-[3rem]', className)}>
			<Heading size='xl'>Similar Storefronts</Heading>
			<div className='flex gap-10 max-md:flex-col'>
				{stores.map((store) => (
					<StoreLink key={store.id} store={store}>
						<StoreCard.Composed 
							store={store} 
							className='w-full mx-auto'
						/>
					</StoreLink>
				))}
			</div>
		</div>
	)
}
