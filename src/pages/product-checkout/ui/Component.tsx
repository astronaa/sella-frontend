import { StoreId } from "~/shared/api/model";
import { fetchProduct } from "../api";
import { ChatFrame } from "./ChatFrame";
import { OrderCreateCard } from "~/features/order/create";
import { Tabs } from "~/shared/ui/kit";

interface ComponentProps {
	storeId: StoreId,
	initialTab?: 'chat' | 'order-actions'
}

export async function Component({ storeId, initialTab = 'chat' }: ComponentProps) {
	const product = await fetchProduct(storeId);

	console.log(initialTab);

	return (
		<div className='w-full min-h-[44.875rem] max-w-content mx-auto px-[1rem]'>
			<Tabs.Root 
				defaultValue={initialTab}
				className='flex lg:data-[orientation]:flex-row items-start gap-[2.5rem] w-full'
			>
				<Tabs.List className='lg:hidden max-lg:w-full'>
					<Tabs.Trigger value='order-actions'>
						Pay for the order
					</Tabs.Trigger>
					<Tabs.Trigger value='chat'>
						Chat with the seller
					</Tabs.Trigger>
					<Tabs.Indicator />
				</Tabs.List>

				<Tabs.Content value='chat' className='lg:!flex' asChild>
					<ChatFrame
						product={product}
						className='size-full'
					/>
				</Tabs.Content>

				<Tabs.Content value='order-actions' className='lg:!flex' asChild>
					<OrderCreateCard
						product={product}
						className='flex-shrink-0 w-full max-w-[22.5rem] max-lg:max-w-full'
					/>
				</Tabs.Content>
			</Tabs.Root>
		</div>
	)
}