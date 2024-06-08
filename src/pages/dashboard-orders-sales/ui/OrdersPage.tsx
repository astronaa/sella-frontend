'use client'

import { Heading } from "~/shared/ui/kit/heading";
import { OrdersTable } from "./OrdersTable";
import { NavSelect } from "./NavSelect";
import { apiClient } from "~/shared/api/client";
import { useQuery } from "@tanstack/react-query";

export function OrdersPage() {
	const { data } = useQuery({
		queryKey: ['sales'],
		queryFn: async () => {
			const { data } = await apiClient.orders.getAll()
			return data
		},
	})

	return (
		<div className='flex flex-col gap-[3rem] w-full max-w-content mx-auto px-[1rem]'>
			<div className='flex gap-[1rem] items-center w-full justify-between max-lg:flex-col max-lg:items-start'>
				<Heading>
					My Orders <span className='text-black-40'>
						{data?.total ?? 0}
					</span>
				</Heading>

				<div className='flex gap-[1.5rem] items-center \
					max-sm:flex-col max-sm:items-start max-sm:w-full max-sm:gap-[0.25rem]'>
					<p className='text-black-40'>
						Total Orders: <span className='text-white'>
							{data?.total ?? 0}
						</span>
					</p>
					<p className='text-black-40 me-[1.5rem]'>
						Total Sales: <span className='text-white'>
							{data?.totalPrice ?? 0} USDT
						</span>
					</p>
					<NavSelect />
				</div>
			</div>

			<OrdersTable data={data} />
		</div>
	);
}
