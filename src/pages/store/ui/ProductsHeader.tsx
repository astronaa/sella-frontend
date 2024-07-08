'use client'

import { SearchBar } from "~/shared/ui/search-bar";
import {Button, IconButton} from "~/shared/ui/kit/button";
import {Icons} from "~/shared/ui/icons";
import {useState} from "react";
import {Collapsible, Select} from "~/shared/ui/kit";
import {Input, InputGroup} from "~/shared/ui/kit/input";
import {cn} from "~/shared/lib/cn";

const options = [
	{ label: "Featured", value: "newest" },
	{ label: "", value: "oldest" },
	{ label: "", value: "highestRating" },
	{ label: "", value: "lowestRating" },
];
export default function ProductsHeader({productsCount}: {productsCount: number}){
	const [isExpanded, setIsExpanded] = useState(false)

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
					<SearchBar.Root>
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
							items={options}
							defaultValue={[options[0].value]}
							/*
							onValueChange={v => setSort(v.value[0] as typeof sort)}
*/
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
								<Input size="sm" placeholder="From $1" className={cn(
									'border pe-[2.5rem] rounded-r-none border-r-0',
									'border-secondary bg-white/[.04] placeholder:text-black-60',
									'focus:bg-white/[.06] filled:bg-white/[.06]',
								)}/>
								<Input size="sm" placeholder="To $2575" className={cn(
									'border pe-[2.5rem] rounded-l-none',
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