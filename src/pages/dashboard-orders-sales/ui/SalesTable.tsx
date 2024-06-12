import {
	TransactionStatusBadge,
	TransactionActionButton
} from "./TransactionElements";

import { FlexTable } from "~/shared/ui/kit";
import { SalesResponse } from "../api/sales";
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

interface SalesTableProps {
	data?: SalesResponse, 
	loading?: boolean,
	startIndex: number
}

export function SalesTable({ data, loading, startIndex }: SalesTableProps) {
	if (data && !data.items.length) {
		return (
			<NotFoundScreen>
				<Icons.PackageThin />

				{`You don't have any sales yet`}
			</NotFoundScreen>
		);
	}

	return (
		<BleedingContainer className='max-md:items-center'>
			<div className='w-full max-w-full overflow-x-auto'>
				<FlexTable.Root className='w-[max(100%,70rem)] px-[1rem]' config={config}>
					<FlexTable.Head>
						<span>#</span>
						<span>Date</span>
						<span>Product</span>
						<span>Username</span>
						<span>Status</span>
						<span>Fulfillment Status</span>
						<span>Total Paid</span>
						<span />
					</FlexTable.Head>

					<FlexTable.Body className='text-[0.875rem]'>
						{loading
							? <TableSkeletons />
							: data?.items.map((sale, index) => (
								<FlexTable.Row key={sale.id}>
									<span>{startIndex + index + 1}</span>
									<span>
										{dayJs(sale.transaction.createdAt).format('MMM DD, hh:mm A')}
									</span>
									<span className='text-white'>
										<ProductRow product={sale.product} />
									</span>
									<span className='text-black-60'>
										{sale.user.username}
									</span>
									<span>
										<TransactionStatusBadge
											status={sale.transaction.status}
										/>
									</span>
									<span>
										<Badge className='capitalize'>
											{sale.transaction.fulfillmentStatus}
										</Badge>
									</span>
									<span className='text-accent-100'>
										{sale.product.price} USDT
									</span>
									<span className='sticky right-0'>
										<TransactionActionButton transaction={sale.transaction} />
									</span>
								</FlexTable.Row>
							))
						}
					</FlexTable.Body>
				</FlexTable.Root>
			</div>
		</BleedingContainer>
	);
}
