'use client';

import Link from "next/link";
import { Heading } from "~/shared/ui/kit/heading";
import { FlexTable, Tooltip } from "~/shared/ui/kit";
import { Badge } from "~/shared/ui/kit/badge";
import { IconButton } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";
import { ProductLink, ProductRow } from "~/entities/product";
import { TransactionStatusBadge } from "~/pages/dashboard-orders-sales/ui/TransactionElements";
import { dayJs } from "~/shared/lib/dayjs";
import { demoOrders, demoOrdersTotal } from "~/shared/static-data/demo-activity";

/**
 * Public preview of the Orders dashboard for signed-out visitors:
 * the real table layout fed with demo orders, every row opening the
 * scripted demo order page. Remove when auth goes live.
 */

const config = [
	{ width: '3.75rem' },
	{ width: '100%' },
	{ width: '13.875rem' },
	{ width: '10.25rem' },
	{ width: '10.25rem' },
	{ width: '10.25rem' },
	{ width: '6.875rem' },
	{ width: '4.375rem' },
];

export function OrdersPreview() {
	return (
		<div className='flex flex-col gap-[3rem] w-full max-w-content mx-auto px-[1rem] py-[2rem]'>
			<div className='flex gap-[1rem] items-center w-full justify-between max-lg:flex-col max-lg:items-start'>
				<div className='flex flex-col gap-[0.75rem]'>
					<span className="flex items-center gap-[0.5rem] rounded-full bg-accent-100/[0.09] px-[0.875rem] py-[0.375rem] text-[0.8125rem] text-accent-100 w-fit">
						<span className="size-[0.375rem] rounded-full bg-accent-100 animate-pulse" />
						Preview · this is how your orders will look
					</span>

					<Heading>
						My Orders <span className='text-black-40'>{demoOrders.length}</span>
					</Heading>
				</div>

				<p className='text-black-40 whitespace-nowrap'>
					Total: <span className='text-white'>{demoOrdersTotal.toLocaleString()} USDC</span>
				</p>
			</div>

			<div className='max-w-full overflow-x-auto'>
				<FlexTable.Root className='w-[max(100%,70rem)] px-[1rem]' config={config}>
					<FlexTable.Head>
						<span>#</span>
						<span>Date</span>
						<span>Product</span>
						<span>Store</span>
						<span>Status</span>
						<span>Fulfillment Status</span>
						<span>Total Paid</span>
						<span />
					</FlexTable.Head>

					<FlexTable.Body className='text-[0.875rem]'>
						{demoOrders.map((order, index) => (
							<FlexTable.Row key={order.id}>
								<span>{index + 1}</span>
								<span>
									{dayJs(order.createdAt).format('MMM DD, hh:mm A')}
								</span>
								<span className='text-white'>
									<ProductLink product={order.product}>
										<ProductRow product={order.product} />
									</ProductLink>
								</span>
								<span className='text-black-60'>
									{order.storeName}
								</span>
								<span>
									<TransactionStatusBadge status={order.status} />
								</span>
								<span>
									<Badge className='capitalize'>
										{order.fulfillmentStatus}
									</Badge>
								</span>
								<span className='text-accent-100'>
									{order.price} USDC
								</span>
								<span className='sticky right-0'>
									<Link href={`/products/${order.product.id}/demo-order`}>
										<Tooltip.Composed
											label='Go to order'
											closeDelay={0} usePortal
										>
											<IconButton
												className='backdrop-blur-[1rem]'
												colorPalette='gray' size='sm'
											>
												<Icons.Package />
											</IconButton>
										</Tooltip.Composed>
									</Link>
								</span>
							</FlexTable.Row>
						))}
					</FlexTable.Body>
				</FlexTable.Root>
			</div>
		</div>
	);
}
