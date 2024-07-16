'use client';

import { usePathname, useRouter } from "next/navigation";
import { Icons } from "~/shared/ui/icons"
import { Select } from "~/shared/ui/kit"
import { Button } from "~/shared/ui/kit/button"
import { PATH_DASHBOARD_ORDERS_PAGE, PATH_DASHBOARD_SALES_PAGE } from "~/shared/config/urls";
import { useDashboardPreferedOrdersPage } from "~/features/dashboard-prefs";

export function NavSelect() {
	const [, setPage] = useDashboardPreferedOrdersPage()

	const items = [
		{ label: 'My Orders', value: PATH_DASHBOARD_ORDERS_PAGE },
		{ label: 'My Sales', value: PATH_DASHBOARD_SALES_PAGE },
	] as const

	const pathname = usePathname();
	const router = useRouter();

	return (
		<Select.Root
			variant="noBorder"
			items={items}
			defaultValue={pathname ? [pathname] : undefined}
			className='max-sm:w-full max-sm:mt-[1rem]'
			onValueChange={v => {
				const path = v.value[0];
				setPage(path == PATH_DASHBOARD_ORDERS_PAGE ? 'orders' : 'sales');
				router.push(path);
			}}
		>
			<Select.Control>
				<Select.Trigger asChild>
					<Button className='max-sm:w-full' colorPalette='gray'>
						<Select.ValueText />

						<Icons.ChevronDown />
					</Button>
				</Select.Trigger>
			</Select.Control>
			<Select.Positioner>
				<Select.Content>
					<Select.ItemGroup id='options'>
						{items.map((item) => (
							<Select.Item key={item.value} item={item} >
								<Select.ItemText>{item.label}</Select.ItemText>
							</Select.Item>
						))}
					</Select.ItemGroup>
				</Select.Content>
			</Select.Positioner>
		</Select.Root>
	)
}