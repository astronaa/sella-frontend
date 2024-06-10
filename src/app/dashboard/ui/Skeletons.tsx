import { ITEMS_PER_PAGE } from "~/app/dashboard/config";
import { Skeleton } from "~/shared/ui/kit/skeleton";

export const Skeletons = () => (
	<div className='space-y-[3.375rem]'>
		{Array.from({ length: Math.ceil(ITEMS_PER_PAGE / 2) }).map((_, i) => (
			<Skeleton className='w-full h-[3.375rem] rounded-[1rem]' key={i} loading/>
		))}
	</div>
)
