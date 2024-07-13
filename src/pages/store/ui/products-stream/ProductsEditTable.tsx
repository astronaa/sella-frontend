'use client';

import { Pagination } from "~/shared/ui/kit/pagination";
import { FlexTable } from "~/shared/ui/kit";
import { Button, IconButton } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";
import { ProductManageDialog } from "~/features/product/manage";
import { ProductImage, ProductLink, ProductPrice, productQueries } from "~/entities/product";
import { cn } from "~/shared/lib/cn";
import { BleedingContainer } from "../BleedingContainer";
import { ProductCreateDialog } from "~/features/product/create";
import { useStoreStrictContext } from "~/entities/store";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "~/shared/ui/kit/skeleton";
import { RatingRow } from "~/shared/ui/rating";
import { useState } from "react";
import { PRODUCT_ITEMS_PER_PAGE } from "../../config";

const tableConfig = [
	{ width: '3.75rem' },
	{ width: '100%' },
	{ width: '8.9375rem' },
	{ width: '8.9375rem' },
	{ width: '17.1875rem' },
	{ width: '17.1875rem' },
	{ width: '4.375rem' },
];

const limit = PRODUCT_ITEMS_PER_PAGE;

export function ProductsEditTable() {
	const store = useStoreStrictContext();
	const [page, setPage] = useState(1);

	const { data, isFetching } = useQuery({
		...productQueries.getFromStoreForOwnerOptions({
			storeUrl: store.url,
			page: 1, limit
		}),
		staleTime: 5000,
		initialDataUpdatedAt: 0
	});

	const products = data?.items;
	const total = data?.total;

	if (!products) {
		return (
			<Skeleton
				loading
				className='w-full h-[20rem] rounded-[1rem]'
			/>
		);
	}

	return (
		<>
			<BleedingContainer>
				<div className='w-full max-w-full overflow-x-auto'>
					<FlexTable.Root className='w-[max(100%,60rem)] px-[1rem]' config={tableConfig}>
						<FlexTable.Head>
							<span>#</span>
							<span>Product</span>
							<span>Rating</span>
							<span>Price</span>
							<span>Reviews</span>
							<span>Total Sales</span>
							<span />
						</FlexTable.Head>

						<FlexTable.Body
							className={cn('transition-opacity duration-300', isFetching && 'opacity-80')}
						>
							{products.map((p, index) => (
								<FlexTable.Row key={p.id}>
									<span>{index + 1}</span>
									<ProductLink
										product={p}
										className='text-white flex gap-[0.5rem] items-center rounded-[0.5rem]'
									>
										<ProductImage
											product={p}
											className='size-[2rem]' />
										{p.name}
									</ProductLink>
									<span>
										{p.rating && (
											<RatingRow.Root rating={p.rating}>
												<RatingRow.Thumbs>
													<RatingRow.Likes />
													<RatingRow.Dislikes />
												</RatingRow.Thumbs>
											</RatingRow.Root>
										)}
									</span>
									<span>
										<ProductPrice product={p} />
									</span>
									<span>{p.rating?.reviewsCount}</span>
									<span>{p.totalSales}</span>
									<div className='sticky right-0'>
										<ProductManageDialog
											product={p}
											triggerElement={<IconButton
												className='backdrop-blur-[1rem]'
												colorPalette='gray' size='sm'
											>
												<Icons.Settings className='size-[1.25rem]' />
											</IconButton>}
										/>
									</div>
								</FlexTable.Row>
							))}
						</FlexTable.Body>

						<ProductCreateDialog
							storeUrl={store.url}
							triggerElement={
								<Button colorPalette='gray' size='lg'>
									Add Product
								</Button>
							}
						/>
					</FlexTable.Root>
				</div>
			</BleedingContainer>

			{!!total && total > limit && (
				<Pagination
					defaultValue={page}
					onPageChange={d => setPage(d.page)}
					className='w-min'
					count={total}
					pageSize={limit}
					siblingCount={1}
				/>
			)}
		</>
	);
}
