import { Heading } from "~/shared/ui/kit/heading";
import { OrdersTable } from "./OrdersTable";
import { NavSelect } from "./NavSelect";
import { apiClient } from "~/shared/api/client";

export async function OrdersPage() {
	const { data } = await apiClient.orders.getAll();

	return (
		<div className='flex flex-col gap-[3rem] w-full max-w-content mx-auto px-[1rem]'>
			<div className='flex gap-[1rem] items-center w-full justify-between max-lg:flex-col max-lg:items-start'>
				<Heading>
					My Orders <span className='text-black-40'>
						{data?.total ?? 0}
					</span>
				</Heading>

				<NavSelect />
			</div>

			<OrdersTable initialData={data} />
		</div>
	);
}
