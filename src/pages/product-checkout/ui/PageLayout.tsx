import { Children, PropsWithChildren } from "react";
import { Tabs } from "~/shared/ui/kit";
import { PageProductCard } from "./PageProductCard";
import { ProductProp } from "~/entities/product";

export type PossibleTabs = 'chat' | 'order-actions'

interface PageLayoutProps extends ProductProp {
	initialTab?: PossibleTabs
}

export function PageLayout({ children, product, initialTab = 'chat' }: PropsWithChildren<PageLayoutProps>) {
	const childrenArr = Children.toArray(children);

	return (
		<div className='flex flex-col w-full gap-[1rem] max-w-content mx-auto px-[1rem]'>
			<PageProductCard
				product={product}
				className='w-full max-w-full lg:hidden'
			/>

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

				{childrenArr[0] && (
					<Tabs.Content
						value='chat'
						className='lg:!flex size-full'
					>
						{childrenArr[0]}
					</Tabs.Content>
				)}

				{childrenArr[1] && (
					<Tabs.Content
						value='order-actions'
						className='lg:!flex flex-shrink-0 w-full max-w-[22.5rem] max-lg:max-w-full'
					>
						{childrenArr[1]}
					</Tabs.Content>
				)}
			</Tabs.Root>
		</div>
	);
}