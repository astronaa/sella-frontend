'use client';

import { Product } from "~/shared/api/model";
import { Pagination } from "~/shared/ui/kit/pagination";
import { FlexTable } from "~/shared/ui/kit";
import { Button, IconButton } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";
import { ProductManageDialog } from "~/features/product/manage";
import { ProductCard, ProductImage, ProductLink, ProductPrice, productQueries } from "~/entities/product";
import { useEditModeStrictContext } from "../model/edit-mode";
import { cn } from "~/shared/lib/cn";
import { BleedingContainer } from "./BleedingContainer";
import { PropsWithChildren, useCallback, useState } from "react";
import { PageChangeDetails } from "@zag-js/pagination";
import { PRODUCT_ITEMS_PER_PAGE } from "~/pages/store/config";
import { NotFoundScreen } from "~/shared/ui/not-found-screen";
import { ProductCreateDialog } from "~/features/product/create";
import { useUserGetQuery } from "~/entities/user";
import { useStoreStrictContext } from "~/entities/store";

interface ProductsStreamProps {
	initialData?: { items: Product[], total: number }
	className?: string
}

export function ProductsStream({ initialData, className }: ProductsStreamProps) {
	const store = useStoreStrictContext();
	const { enabled: editModeEnabled } = useEditModeStrictContext();
	const [page, setPage] = useState(1);

	const { data, isFetching } = productQueries.useGetFromStore({
		storeUrl: store.url, initialData,
		page, limit: PRODUCT_ITEMS_PER_PAGE,
	})

	const { data: user } = useUserGetQuery();
	const products = data?.items ?? []
	const total = data?.total ?? 0;

	const handlePageChange = useCallback((details: PageChangeDetails) => setPage(details.page), [])

	return (
		<div className={cn('flex flex-col gap-[3rem] w-full max-lg:items-center', className)}>
			{!products.length && (
				<NotFoundScreen>
					<Icons.PackageThin />

					{`This store don't have any products yet`}

					{!!user && user.username == store.ownerUsername && (
						<ProductCreateDialog
							storeUrl={store.url}
							triggerElement={
								<Button className='mt-[1rem]' size='lg'>
									Add First Product
								</Button>
							}
						/>
					)}
				</NotFoundScreen>
			)}

			{editModeEnabled ? (
				<BleedingContainer>
					<div className='w-full max-w-full overflow-x-auto'>
						<ProductsEditTable
							products={products}
							loading={isFetching}
						>
							<ProductCreateDialog
								storeUrl={store.url}
								triggerElement={
									<Button colorPalette='gray' size='lg'>
										Add Product
									</Button>
								}
							/>
						</ProductsEditTable>
					</div>
				</BleedingContainer>
			) : (
				<ProductsGrid
					products={products}
					loading={isFetching}
				/>
			)}

			{total > PRODUCT_ITEMS_PER_PAGE && (
				<Pagination
					page={page}
					onPageChange={handlePageChange}
					className='w-min'
					count={total}
					pageSize={PRODUCT_ITEMS_PER_PAGE}
					siblingCount={1}
				/>
			)}
		</div>
	);
}

interface ProductsListProps extends PropsWithChildren {
	products: Product[],
	loading?: boolean
}

function ProductsGrid({ products, loading }: ProductsListProps) {
	return (
		<div className={cn(
			'grid grid-cols-4 gap-[2.5rem] w-full transition-opacity duration-300',
			'max-md:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3',
			loading && 'opacity-50'
		)}>
			{products.map(p => (
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
	);
}

const tableConfig = [
	{ width: '3.75rem' },
	{ width: '100%' },
	{ width: '8.9375rem' },
	{ width: '8.9375rem' },
	{ width: '17.1875rem' },
	{ width: '17.1875rem' },
	{ width: '4.375rem' },
]

function ProductsEditTable({ products, loading, children }: ProductsListProps) {
	if (!products.length)
		return null;

	return (
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
				className={cn('transition-opacity duration-300', loading && 'opacity-80')}
			>
				{products.map((p, index) => (
					<FlexTable.Row key={p.id} >
						<span>{index + 1}</span>
						<span className='text-white flex gap-[0.5rem] items-center'>
							<ProductImage 
								product={p}
								className='size-[2rem]'
							/>
							{p.name}
						</span>
						<span>

						</span>
						<span>
							<ProductPrice product={p} />
						</span>
						<span>165</span>
						<span>27</span>
						<div className='sticky right-0'>
							<ProductManageDialog
								product={p}
								triggerElement={
									<IconButton
										className='backdrop-blur-[1rem]'
										colorPalette='gray' size='sm'
									>
										<Icons.Settings className='size-[1.25rem]' />
									</IconButton>
								}
							/>
						</div>
					</FlexTable.Row>
				))}
			</FlexTable.Body>

			{children}
		</FlexTable.Root>
	);
}
