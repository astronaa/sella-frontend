'use client';

import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { z } from "zod";
import { ProductCard, ProductLink, productQueries } from "~/entities/product"
import { apiClient, productMock } from "~/shared/api/client";
import { cn } from "~/shared/lib/cn";
import { usePagination } from "~/shared/lib/use-pagination";
import { Heading } from "~/shared/ui/kit/heading";
import { Pagination } from "~/shared/ui/kit/pagination";
import { Skeleton } from "~/shared/ui/kit/skeleton";

type Props = z.infer<typeof apiClient.products.schemaSearch>

const limit = 12;

export function ProductResults({ query, tagNames, sort = 'rating' }: Props) {
	const { page, onPageChange } = usePagination(1);

	const { data, isLoading } = useQuery({
		...productQueries.getSearchOptions({
			page, limit,
			sort, query, tagNames
		}),
		placeholderData: keepPreviousData
	})

	const products = data?.items;
	const total = data?.total;

	return (
		<div className="flex flex-col w-full gap-[3rem] max-w-content mx-auto px-[1rem]">
			<Heading>Search results “{query}”</Heading>

			<div className='flex flex-col w-full gap-[1rem]'>
				<div className={cn(
					'grid grid-cols-4 gap-[2.5rem] w-full transition-opacity duration-300',
					'max-md:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3',
					isLoading && 'opacity-50'
				)}>
					{isLoading && !products && (
						Array.from({ length: limit }).map((_, index) => (
							<Skeleton
								key={index} loading={true}
								className='rounded-[1.25rem]'
							>
								<ProductCard.Composed
									product={productMock}
								/>
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
			</div>

			{!!total && total > limit && (
				<Pagination
					defaultPage={page}
					onPageChange={onPageChange}
					className='w-min'
					count={total}
					pageSize={limit}
					siblingCount={1}
				/>
			)}
		</div>
	)
}