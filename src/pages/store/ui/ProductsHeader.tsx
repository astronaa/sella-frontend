'use client'

import { SearchBar } from "~/shared/ui/search-bar";
import {Button, IconButton} from "~/shared/ui/kit/button";
import {Icons} from "~/shared/ui/icons";
import {useState} from "react";
import {Collapsible, Select} from "~/shared/ui/kit";
import {Input, InputGroup} from "~/shared/ui/kit/input";
import {cn} from "~/shared/lib/cn";
import {useControllableState} from "~/shared/lib/use-controllable-state";
import {useSearchParams} from "~/shared/lib/search-params";
import {useDebounce} from "~/shared/lib/use-debounce";
import {z} from "zod";
import {apiClient} from "~/shared/api/client";

type GetProductsFilters  = z.infer<typeof apiClient.stores.schemaGetProducts>;

const options: {label: string, value: GetProductsFilters['sort']}[] = [
	{ label: "Newest first", value: "new" },
	{ label: "Oldest first", value: "old" },
	{ label: "Lowest price", value: "price_asc" },
	{ label: "Highest price", value: "price_desc" },
	{ label: "Best rating", value: "rating"}
];
export default function ProductsHeader({sort, setSort, productsCount}:
{
	sort: GetProductsFilters['sort'],
	setSort: (sort: GetProductsFilters['sort']) => void,
	productsCount: number
}){
	const [isExpanded, setIsExpanded] = useState(false)
	const {searchParams, setSearchParams} = useSearchParams();
	const debounceFn = useDebounce((key: string, value: string) => setSearchParams({...searchParams, [key]: value}), 300)
	const [filters, setFilters] = useControllableState<{[P in keyof Pick<GetProductsFilters, 'query' | 'minPrice' | 'maxPrice'>]: string}>(
		{
			defaultValue: {
				minPrice: searchParams.minPrice,
				maxPrice: searchParams.maxPrice,
				query: searchParams.query
			}
		}
	)
	function setValue(key: string, value: string){
		setFilters((prevState) => {
			return {...prevState, [key]: value}
		})
		debounceFn(key, value)
	}

	return (
		<>
			<div className="flex mt-[1.5rem] justify-between">
				<div className="flex gap-x-[0.5rem] items-center">
					<h2 className="font-inter text-white text-2xl font-semibold">Products</h2>
					<span className="font-inter text-black-40 text-2xl font-semibold">{productsCount}</span>
				</div>
				<div className="flex gap-x-[1rem]">
					<IconButton variant="ghost" size="sm" className={isExpanded ? 'bg-white hocus:bg-white' : ''} onClick={() => setIsExpanded(!isExpanded)}>
						<Icons.FilterLines className={isExpanded ? "text-black-100 hocus:text-black-100" : ''} />
					</IconButton>
					<SearchBar.Root value={filters.query} onChange={(value) => setValue('query', value)}>
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
							value={[sort]}
							items={options}
							onValueChange={({value}) => setSort(value[0] as GetProductsFilters['sort'])}
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
							<label className="text-black-60 font-inter font-semibold text-[1rem]">Price</label>
							<div className="flex mt-[0.4rem] w-[18rem]">
								<Input size="sm" placeholder="From $1" type="number" value={filters.minPrice} onChange={(e) => setValue('minPrice', e.target.value)} className={cn(
									'border rounded-r-none border-r-0',
									'border-secondary bg-white/[.04] placeholder:text-black-60',
									'focus:bg-white/[.06] filled:bg-white/[.06]',
								)}/>
								<Input size="sm" placeholder="To $2575" type="number" value={filters.maxPrice} onChange={(e) => setValue('maxPrice', e.target.value)} className={cn(
									'border rounded-l-none',
									'border-secondary bg-white/[.04] placeholder:text-black-60',
									'focus:bg-white/[.06] filled:bg-white/[.06]',
								)}/>
							</div>
						</InputGroup>

					</div>
				</Collapsible.Content>
			</Collapsible.Root>
		</>

	)
}