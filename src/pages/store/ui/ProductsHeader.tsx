'use client'

import { SearchBar } from "~/shared/ui/search-bar";
import { Button, IconButton } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";
import { useState } from "react";
import { Collapsible, Select } from "~/shared/ui/kit";
import { Input, InputGroup } from "~/shared/ui/kit/input";
import { cn } from "~/shared/lib/cn";
import { useDebounce } from "~/shared/lib/use-debounce";
import { UseFiltersStateArgs, useFiltersState } from "../model/filters";

type ValueType = NonNullable<UseFiltersStateArgs['value']>;

const options: { label: string, value: NonNullable<ValueType>['sort'] }[] = [
	{ label: "Newest first", value: "new" },
	{ label: "Oldest first", value: "old" },
	{ label: "Lowest price", value: "price_asc" },
	{ label: "Highest price", value: "price_desc" },
	{ label: "Best rating", value: "rating" }
];

interface ProductsHeaderProps extends UseFiltersStateArgs {
	productsCount: number | undefined
}

const DEBOUNCE_TIME = 300;

export function ProductsHeader({
	productsCount, defaultValue = { sort: 'new' }, ...props
}: ProductsHeaderProps) {
	const [isExpanded, setIsExpanded] = useState(false)
	const {
		state: filters,
		setState: setFilters,
		hasFilters
	} = useFiltersState({ ...props, defaultValue })

	const useDebounceMutation = <T extends keyof ValueType>(key: T) => {
		const { debounceFn, clearDebounce } = useDebounce(
			(value: ValueType[T]) => setFilters(f => ({ ...f, [key]: value })),
			DEBOUNCE_TIME
		)

		return (value: ValueType[T]) => {
			if (value !== undefined && value !== '')
				debounceFn(value)
			else {
				clearDebounce();
				setFilters(f => ({ ...f, [key]: value }));
			}
		}
	}

	const setMinPrice = useDebounceMutation('minPrice');
	const setMaxPrice = useDebounceMutation('maxPrice');
	const setQuery = useDebounceMutation('query');
	const setSort = useDebounceMutation('sort');

	return (
		<>
			<div className="flex mt-[1.5rem] justify-between">
				<div className="flex gap-x-[0.5rem] items-center">
					<h2 className="font-inter text-white text-2xl font-semibold">Products</h2>
					<span className="font-inter text-black-40 text-2xl font-semibold">{productsCount}</span>
				</div>
				<div className="flex gap-x-[1rem]">
					<div className="relative">
						<IconButton
							variant="ghost" size="sm"
							className={isExpanded ? 'bg-white hocus:bg-white' : ''}
							onClick={() => setIsExpanded(!isExpanded)}
						>
							<Icons.FilterLines className={isExpanded ? "text-black-100 hocus:text-black-100" : ''} />
						</IconButton>
						<div
							className={cn(
								"absolute -top-0.5 -right-0.5 size-3 rounded-full bg-accent-100",
								'transform scale-0 transition-transform',
								hasFilters && 'scale-100'
							)}
						/>
					</div>
					<SearchBar.Root
						defaultValue={filters.query}
						onChange={setQuery}
					>
						<SearchBar.Input placeholder='Search products' />
					</SearchBar.Root>
				</div>
			</div>
			<Collapsible.Root
				open={isExpanded}
				className='mb-[2rem]'
			>
				<Collapsible.Content className="h-[148px] flex">
					<div className="bg-white/[.04] p-[1.5rem] pb-[2rem] rounded-2xl mt-6 flex-1 border border-white/[.04] flex gap-x-6">
						<Select.Root
							variant="border"
							defaultValue={[filters.sort ?? 'new']}
							items={options}
							onValueChange={({ value }) => setSort(value[0] as typeof filters.sort)}
							className='w-[13rem]'
						>
							<Select.Label>Sort by</Select.Label>
							<Select.Control>
								<Select.Trigger asChild>
									<Button colorPalette="gray">
										<Select.ValueText />
										<Icons.ChevronDown />
									</Button>
								</Select.Trigger>
							</Select.Control>
							<Select.Positioner>
								<Select.Content>
									<Select.ItemGroup id="options">
										{options.map((item) => (
											<Select.Item key={item.value} item={item}>
												<Select.ItemText>{item.label}</Select.ItemText>
											</Select.Item>
										))}
									</Select.ItemGroup>
								</Select.Content>
							</Select.Positioner>
						</Select.Root>
						<InputGroup>
							<label className="text-black-60 font-inter font-semibold text-[1rem]">
								Price
							</label>
							<div className="flex mt-[0.4rem] w-[18rem]">
								<Input
									size="sm" placeholder="From $1"
									type="number"
									defaultValue={filters.minPrice}
									onChange={(e) => setMinPrice(Number(e.target.value) || undefined)}
									className={cn(
										'border rounded-r-none border-r-0',
										'border-secondary bg-white/[.04] placeholder:text-black-60',
										'focus:bg-white/[.06] filled:bg-white/[.06]',
									)}
								/>
								<Input
									size="sm" placeholder="To $2575"
									type="number"
									defaultValue={filters.maxPrice}
									onChange={(e) => setMaxPrice(Number(e.target.value) || undefined)}
									className={cn(
										'border rounded-l-none',
										'border-secondary bg-white/[.04] placeholder:text-black-60',
										'focus:bg-white/[.06] filled:bg-white/[.06]',
									)}
								/>
							</div>
						</InputGroup>
					</div>
				</Collapsible.Content>
			</Collapsible.Root>
		</>

	)
}