'use client';

import { HTMLAttributes } from "react";
import { ProductRating, useProductStrictContext } from "~/entities/product";
import { reviewQueries } from "~/entities/reviews";
import { cn } from "~/shared/lib/cn";
import { Icons } from "~/shared/ui/icons";
import { Select } from "~/shared/ui/kit";
import { Button, IconButton } from "~/shared/ui/kit/button";
import { Heading } from "~/shared/ui/kit/heading";
import { INITIAL_PAGE, INITIAL_SORT, ITEMS_PER_PAGE } from "../config";
import { Review } from "~/shared/api/client"
import { dayJs } from "~/shared/lib/dayjs";
import { NotFoundScreen } from "~/shared/ui/not-found-screen";
import { Avatar } from "~/shared/ui/kit/avatar";

const options = [
	{ label: "Show Newest", value: "newest" },
	{ label: "Show Oldest", value: "oldest" },
	{ label: "Show Higest Rating", value: "highestRating" },
	{ label: "Show Lowest Rating", value: "lowestRating" },
];

interface ReviewsStreamProps extends HTMLAttributes<HTMLDivElement> {
	initialData: { items: Review[], total: number }
}

export function ReviewsStream({ className, initialData, ...props }: ReviewsStreamProps) {
	const product = useProductStrictContext();
	const [sort, setSort] = reviewQueries.utils.useSortState(INITIAL_SORT);

	const {
		data,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage
	} = reviewQueries.useGetForProduct({
		productId: product.id,
		initialPage: INITIAL_PAGE,
		limit: ITEMS_PER_PAGE,
		sort,
		initialData
	})

	const reviewsPresent = !!data?.pages[0].items.length;

	return (
		<div {...props} className={cn("flex flex-col gap-6", className)}>
			<div className="flex flex-col lg:flex-row gap-6 lg:gap-0 lg:justify-between items-start lg:items-end">
				<div className="flex flex-col gap-2">
					<Heading size='sm'>
						Buyers Reviews
					</Heading>
					<ProductRating />
				</div>
				{reviewsPresent && (
					<Select.Root
						variant="noBorder"
						items={options} defaultValue={[INITIAL_SORT]}
						onValueChange={v => setSort(v.value[0] as typeof sort)}
						className='w-[13rem]'
					>
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
				)}
			</div>
			{!reviewsPresent && (
				<NotFoundScreen className='h-[20rem]'>
					<Icons.Close />
					<span>No reviews has been left here yet</span>
				</NotFoundScreen>
			)}
			{data?.pages.map(p => (
				p.items.map(r => (
					<div key={r.id} className="flex flex-col px-4 py-6 gap-6 rounded-[1.25rem] border border-white/[.04]">
						{r.user && (
							<div className="flex gap-2 items-center">
								<Avatar
									className='size-[2rem] flex-shrink-0 shadow-sm'
									name={r.user.username ?? undefined}
									src={r.user.avatarImage ?? undefined}
								/>
								<div className="text-white text-[1.125rem]/[1.4625rem] font-semibold">
									{r.user.username}
								</div>
							</div>
						)}
						<div className="text-black-74 text-[1rem]/[1.3rem] font-normal">
							{r.body}
						</div>
						<div className="flex items-center gap-2">
							{r.isPositive ? (
								<IconButton
									variant="subtle" colorPalette="green"
									size='sm' className="pointer-events-none border-green-100/[.06]"
								>
									<Icons.Likes />
								</IconButton>
							) : (
								<IconButton
									variant="subtle" colorPalette="red"
									size='sm' className="pointer-events-none border-red-100/[.06]"
								>
									<Icons.Dislikes />
								</IconButton>
							)}

							<div className="text-[1rem]/[1.3rem] font-normal text-black-60">
								{dayJs(r.createdAt).fromNow()}
							</div>
						</div>
					</div>
				))
			))}

			{hasNextPage && (
				<Button
					colorPalette="gray"
					disabled={isFetchingNextPage}
					onClick={() => fetchNextPage()}
				>
					Show More
				</Button>
			)}
		</div>
	);
}