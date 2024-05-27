'use client';

import { Product } from "~/shared/api/model";
import { Pagination } from "~/shared/ui/kit/pagination";
import { FlexTable } from "~/shared/ui/kit";
import { IconButton } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";
import { ProductManageDialog } from "~/features/product/manage";
import { ProductCard, ProductPrice } from "~/entities/product";
import { useEditModeContext } from "../model/edit-mode";
import { cn } from "~/shared/lib/cn";
import { BleedingContainer } from "./BleedingContainer";

interface ProductsStreamProps {
	initialData: Product[]
	className?: string
}

export function ProductsStream({ initialData, className }: ProductsStreamProps) {
	const products = initialData;
	const { enabled: editModeEnabled } = useEditModeContext();

	return (
		<div className={cn('flex flex-col gap-[3rem] w-full max-lg:items-center', className)}>
			{editModeEnabled ? (
				<BleedingContainer>
					<div className='w-full max-w-full overflow-x-auto'>
						<ProductsEditTable products={products} />
					</div>
				</BleedingContainer>
			) : (
				<ProductsGrid products={products} />
			)}

			<Pagination
				className='overflow-auto'
				count={190} pageSize={10}
				siblingCount={1} defaultPage={1}
			/>
		</div>
	);
}

function ProductsGrid({ products }: { products: Product[] }) {
	return (
		<div className={cn(
			'grid grid-cols-4 gap-[2.5rem] w-full',
			'max-md:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3'
		)}>
			{products.map(p => (
				<ProductCard.Root key={p.id} product={p} className='w-full mx-auto'>
					<ProductCard.Image className='max-md:h-[15.875rem]' />

					<ProductCard.Content>
						<ProductCard.Title />
						<ProductCard.Description />
						<ProductCard.Price />
					</ProductCard.Content>
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

function ProductsEditTable({ products }: { products: Product[] }) {
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

			<FlexTable.Body>
				{products.map((p, index) => (
					<FlexTable.Row key={p.id} >
						<span>{index + 1}</span>
						<span className='text-white'>
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
		</FlexTable.Root>
	);
}