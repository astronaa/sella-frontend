'use client';

import { usePathname, useRouter } from "next/navigation";
import { Icons } from "~/shared/ui/icons"
import { Select } from "~/shared/ui/kit"
import { Button } from "~/shared/ui/kit/button"

export function NavSelect() {
	const items = [
		{ label: 'My Orders', value: '/dashboard/orders' },
		{ label: 'My Sales', value: '/dashboard/sales' },
	] as const

	const pathname = usePathname();
	const router = useRouter();

	return (
		<Select.Root
			items={items}
			defaultValue={pathname ? [pathname] : undefined}
			className='max-sm:w-full max-sm:mt-[1rem]'
			onValueChange={v => router.push(v.value[0])}
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