import {
	TransactionStatusBadge,
	TransactionActionButton
} from "./TransactionElements";

import { FlexTable } from "~/shared/ui/kit";
import { OrdersResponse } from "../api/orders";
import { ProductRow } from "~/entities/product";
import { Badge } from "~/shared/ui/kit/badge";
import { Icons } from "~/shared/ui/icons";
import { NotFoundScreen } from "~/shared/ui/not-found-screen";
import { BleedingContainer } from "./BleedingContainer";
import { dayJs } from "~/shared/lib/dayjs";
import { TableSkeletons } from "./TableSkeletons";

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
										<ProductRow product={o.product} />
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
										{o.transaction.totalPaid} USDT
									</span>
									<span className='sticky right-0'>
										<TransactionActionButton transaction={o.transaction} />
									</span>
								</FlexTable.Row>
							))}
					</FlexTable.Body>
				</FlexTable.Root>
			</div>
		</BleedingContainer>
	);
}
