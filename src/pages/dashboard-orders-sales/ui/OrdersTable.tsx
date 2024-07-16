import { TransactionStatusBadge } from "./TransactionElements";
import { FlexTable, Tooltip } from "~/shared/ui/kit";
import { OrdersResponse } from "../api/orders";
import { ProductLink, ProductRow } from "~/entities/product";
import { Badge } from "~/shared/ui/kit/badge";
import { Icons } from "~/shared/ui/icons";
import { NotFoundScreen } from "~/shared/ui/not-found-screen";
import { BleedingContainer } from "./BleedingContainer";
import { dayJs } from "~/shared/lib/dayjs";
import { TableSkeletons } from "./TableSkeletons";
import { IconButton } from "~/shared/ui/kit/button";
import Link from "next/link";
import { Order, isCompletedTransactionStatus } from "~/shared/api/client";
import { PATH_ORDER_PAGE, PATH_ORDER_REVIEW_PAGE } from "~/shared/config/urls";

const config = [
	{ width: '3.75rem' },
	{ width: '100%' },
	{ width: '13.875rem' },
	{ width: '10.25rem' },
	{ width: '10.25rem' },
	{ width: '10.25rem' },
	{ width: '6.875rem' },
	{ width: '4.375rem' },
]

interface OrdersTableProps {
	data?: OrdersResponse,
	loading?: boolean,
	startIndex: number
}

export function OrdersTable({ data, loading, startIndex }: OrdersTableProps) {
	if (data && !data.items.length) {
		return (
			<NotFoundScreen>
				<Icons.PackageThin />

				{`You don't have any orders yet`}
			</NotFoundScreen>
		);
	}

	return (
		<BleedingContainer className='max-md:items-center'>
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
						{loading
							? <TableSkeletons />
							: data?.items.map((o, index) => (
								<FlexTable.Row key={o.id}>
									<span>{startIndex + index + 1}</span>
									<span>
										{dayJs(o.transaction.createdAt).format('MMM DD, hh:mm A')}
									</span>
									<span className='text-white'>
										<ProductLink product={o.product}>
											<ProductRow product={o.product} />
										</ProductLink>
									</span>
									<span className='text-black-60'>
										{o.store.name}
									</span>
									<span>
										<TransactionStatusBadge
											status={o.transaction.status}
										/>
									</span>
									<span>
										<Badge className='capitalize'>
											{o.transaction.fulfillmentStatus}
										</Badge>
									</span>
									<span className='text-accent-100'>
										{o.price} USDT
									</span>
									<span className='sticky right-0'>
										<Link href={getLinkToOrder(o)}>
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
		</BleedingContainer>
	);
}

export function getLinkToOrder(order: Order) {
	return isCompletedTransactionStatus(order.transaction.status)
		? PATH_ORDER_REVIEW_PAGE(order)
		: PATH_ORDER_PAGE(order)
}		