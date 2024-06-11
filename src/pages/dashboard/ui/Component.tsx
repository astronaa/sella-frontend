'use client';

import { Button } from "~/shared/ui/kit/button";
import { StoreCard, StoreLink } from "~/entities/store";
import { Heading } from "~/shared/ui/kit/heading";
import { StoreCreateDialog } from "~/features/store/create";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";
import { storeMock } from "~/shared/api/client/stores/mock";
import { Skeleton } from "~/shared/ui/kit/skeleton";
import { NotFoundScreen } from "~/shared/ui/not-found-screen";
import { Icons } from "~/shared/ui/icons";

export function Component() {
	const { data: stores, isLoading } = useQuery({
		queryKey: ['stores'],
		queryFn: async () => {
			const { data, error } = await apiClient.stores.getForCurrentUser();

			if (error)
				throw error;

			return data;
		}
	});

	return (
		<div className='flex flex-col w-full gap-[3rem] max-w-content mx-auto px-[1rem]'>
			<div className='flex items-start w-full gap-[1rem] justify-between max-md:flex-col'>
				<Heading>
					My Storefronts
				</Heading>

				<StoreCreateDialog
					triggerElement={
						<Button className='max-sm:w-full' size='lg'>
							Add Storefront
						</Button>
					}
				/>
			</div>

			{stores?.length === 0 && (
				<NotFoundScreen>
					<Icons.Building />

					{`You don't have any storefronts yet`}
				</NotFoundScreen>
			)}

			<div className='grid grid-cols-2 max-sm:grid-cols-1 gap-[2.5rem] w-full'>
				{isLoading ? (
					Array(4).fill(storeMock).map((s, index) => (
						<Skeleton key={index} loading={isLoading} asChild>
							<StoreCard.Composed store={s} />
						</Skeleton>
					))
				) : (
					stores?.map(s => (
						<StoreCard.Root 
							asChild key={s.id} store={s} 
						>
							<StoreLink>
								<StoreCard.Composition />
							</StoreLink>	
						</StoreCard.Root>
					))
				)}
			</div>
		</div>
	);
}