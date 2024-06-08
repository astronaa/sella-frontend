'use client'

import { FlexTable } from "~/shared/ui/kit";
import { SalesResponse } from "../api/sales";
import { ProductRow } from "~/entities/product";
import { Badge } from "~/shared/ui/kit/badge";
import { Icons } from "~/shared/ui/icons";
import { Pagination } from "~/shared/ui/kit/pagination";
import { NotFoundScreen } from "~/shared/ui/not-found-screen";

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

export function SalesTable({ initialData }: { initialData?: SalesResponse }) {
	const { data } = useQuery({
		queryKey: ['sales'],
		queryFn: async () => {
			const { data } = await apiClient.sales.getAll()
			return data
		},
		initialData,
		staleTime: 10 * 60 * 1000
	})


	if (!data?.items.length) {
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
						{data?.items.map((sale, index) => (
							<FlexTable.Row key={sale.id}>
								<span>{index + 1}</span>
								<span>
									{dayJs(sale.transaction.createdAt).format('MMM DD, hh:mm A')}
								</span>
								<span className='text-white'>
									<ProductRow product={sale.product} />
								</span>
								<span className='text-black-60'>
									{sale.user.name}
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
						))}
					</FlexTable.Body>
				</FlexTable.Root>
			</div>

			<Pagination
				className='px-[1rem]'
				count={data.total}
				pageSize={10}
			/>
		</BleedingContainer>
	);
}
