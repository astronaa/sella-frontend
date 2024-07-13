'use client';
import { productMock } from "~/shared/api/client";
import { Pagination } from "~/shared/ui/kit/pagination";
import { Button } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";
import { ProductCard, ProductLink, productQueries } from "~/entities/product";
import { cn } from "~/shared/lib/cn";
import { PRODUCT_ITEMS_PER_PAGE } from "~/pages/store/config";
import { NotFoundScreen } from "~/shared/ui/not-found-screen";
import { ProductCreateDialog } from "~/features/product/create";
import { useUserGetQuery } from "~/entities/user";
import { useStoreStrictContext } from "~/entities/store";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "~/shared/ui/kit/skeleton";
import { ProductsHeader } from "~/pages/store/ui/ProductsHeader";
import { Divider } from "~/shared/ui/kit/divider";
import { useFiltersState, useFiltersStatePersist } from "../../model/filters";
import { useSearchParamsPagination } from "~/shared/lib/search-params";

export const limit = PRODUCT_ITEMS_PER_PAGE;
export function ProductsGrid() {
	const store = useStoreStrictContext();

	const { value, persist } = useFiltersStatePersist();
	const {
		state: filters, setState: setFilters, hasFilters
	} = useFiltersState({
		value, onChange: persist
	});

	const { data, isFetching } = useQuery({
		...productQueries.getFromStoreOptions({
			storeUrl: store.url,
			query: {
				...filters,
				page: 1, limit
			}
		}),
		staleTime: 5000,
		initialDataUpdatedAt: 0
	});

	const { page, onPageChange } = useSearchParamsPagination(1);

	const { data: user } = useUserGetQuery();
	const products = data?.items;
	const total = data?.total;

	return (
		<>
			<div className="flex flex-col w-full">
				<Divider />
				<ProductsHeader
					productsCount={total}
					defaultValue={filters}
					onChange={setFilters} />
				{products && !products.length ? (
					<NotFoundScreen>
						<Icons.PackageThin />

						{hasFilters ? 'No products found for selected filters' : `This store doesn't have any products yet`}

						{!!user && user.username == store.ownerUsername && !hasFilters && (
							<ProductCreateDialog
								storeUrl={store.url}
								triggerElement={<Button className='mt-[1rem]' size='lg'>
									Add First Product
								</Button>} />
						)}
					</NotFoundScreen>
				) : (
					<div className={cn(
						'grid grid-cols-4 gap-[2.5rem] w-full transition-opacity duration-300',
						'max-md:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3',
						isFetching && 'opacity-50'
					)}>
						{isFetching && !products && (
							Array.from({ length: 4 }).map((_, index) => (
								<Skeleton
									key={index} loading={true}
									className='rounded-[1.25rem]'
								>
									<ProductCard.Composed
										product={productMock} />
								</Skeleton>
							))
						)}

						{products?.map(p => (
							<ProductCard.Root
								product={p} key={p.id}
								className='w-full mx-auto h-full' asChild
							>
								<ProductLink product={p}>
									<ProductCard.Image className='max-md:h-[15.875rem]' />

									<ProductCard.Content>
										<ProductCard.Title />
										<ProductCard.Description />
										<ProductCard.Price />
									</ProductCard.Content>
								</ProductLink>
							</ProductCard.Root>
						))}
					</div>
				)}
			</div>

			{!!total && total > limit && (
				<Pagination
					defaultValue={page}
					onPageChange={onPageChange}
					className='w-min'
					count={total}
					pageSize={limit}
					siblingCount={1} />
			)}
		</>
	);
}
