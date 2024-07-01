'use client'

import { Heading } from "~/shared/ui/kit/heading";
import { NavSelect } from "./NavSelect";
import { SalesTable } from "./SalesTable";
import { useState } from "react";
import { PageChangeDetails } from "@zag-js/pagination";
import { Pagination } from "~/shared/ui/kit/pagination";
import { ITEMS_PER_PAGE } from "../config";
import { salesQueries } from "~/entities/sale";

export function SalesPage() {
	const [page, setPage] = useState(1)

	const { data } = salesQueries.useGetSales({ page, limit: ITEMS_PER_PAGE })

	const total = data?.total ?? 0;
	const handlePageChange = (details: PageChangeDetails) => setPage(details.page)

	return (
		<div className='flex flex-col gap-[3rem] w-full max-w-content mx-auto px-[1rem]'>
			<div className='flex gap-[1rem] items-center w-full justify-between max-lg:flex-col max-lg:items-start'>
				<Heading>
					My Sales <span className='text-black-40'>{data?.total}</span>
				</Heading>

				<div className='flex gap-[1.5rem] items-center \
					max-sm:flex-col max-sm:items-start max-sm:w-full max-sm:gap-[0.25rem]'
				>
					{data && (
						<p className='text-black-40 me-[1.5rem]'>
							Total: <span className='text-white'>
								{data?.totalPrice ?? 0} USDT
							</span>
						</p>
					)}
					<NavSelect />
				</div>
			</div>

			<SalesTable 
				data={data} 
				loading={!data} 
				startIndex={(page - 1) * ITEMS_PER_PAGE}
			/>

			{total > ITEMS_PER_PAGE && (
				<Pagination
					page={page}
					onPageChange={handlePageChange}
					className='px-[1rem]'
					count={data?.total ?? 0}
					pageSize={ITEMS_PER_PAGE}
				/>
			)}
		</div>
	);
}
