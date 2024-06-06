import { FlexTable } from "~/shared/ui/kit";
import { OrdersResponse } from "../api/orders";
import { ProductRow } from "~/entities/product";
import { Badge } from "~/shared/ui/kit/badge";
import { Icons } from "~/shared/ui/icons";
import { Pagination } from "~/shared/ui/kit/pagination";
import { NotFoundScreen } from "../../../shared/ui/not-found-screen";

import {
	TransactionStatusBadge,
	TransactionActionButton
} from "./TransactionElements";
import { BleedingContainer } from "./BleedingContainer";
import { dayJs } from "~/shared/lib/dayjs";
import { apiClient } from "~/shared/api/client";
import { useQuery } from "@tanstack/react-query";

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

export function OrdersTable({ initialData }: { initialData?: OrdersResponse }) {
	const { data } = useQuery({
		queryKey: ['sales'],
		queryFn: async () => {
			const { data } = await apiClient.orders.getAll()
			return data
		},
		initialData,
		staleTime: 10 * 60 * 1000
	})

	if (!data?.items.length) {
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
						{data.items.map((o, index) => (
							<FlexTable.Row key={o.id}>
								<span>{index + 1}</span>
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

			<Pagination
				className='px-[1rem]'
				count={data.total} pageSize={10}
			/>
		</BleedingContainer>
	);
}
