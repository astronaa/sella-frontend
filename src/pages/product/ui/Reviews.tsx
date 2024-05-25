import { ProductRate } from "~/entities/product";
import { Icons } from "~/shared/ui/icons";
import { PreviewImage } from "~/shared/ui/image";
import { Select } from "~/shared/ui/kit";
import { Button } from "~/shared/ui/kit/button";

const totalRates = {
	total: 537,
	likes: 421,
	dislikes: 16,
};

const options = [
	{ label: "Show Recent", value: "recent" },
	{ label: "Show Recent 1", value: "recent1" },
];

const reviews = [
	{
		user: "Mohammad Haroon",
		avatar: null,
		quote:
      "This product is amazing!!! I use it every day and I can't imagine my life without it. It's the best product I've ever used and I highly recommend it to everyone.",
		rate: "like",
		date: "3 days ago",
	},
	{
		user: "Andrew Lawton",
		avatar: null,
		quote:
      "The car is great, customer service is the worst. They are robots machines , who think everyone is stupid and we must have a phd in Tesla. Very rude people.",
		rate: "dislike",
		date: "1 week ago",
	},
	{
		user: "Mehmet Ogul",
		avatar: null,
		quote:
      "I recently purchased a [product] from [Store Name], and I couldn’t be happier with my online shopping experience. Their website was user-friendly, making it easy to find the perfect item. The checkout process was smooth, and I received my order promptly. The [product] arrived in excellent condition, exactly as described on their website. I’m thrilled with the quality and will definitely shop at [Store Name] again in the future. Highly recommended!",
		rate: "like",
		date: "5 months ago",
	},
];

export function Reviews() {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex justify-between items-end">
				<div className="flex flex-col gap-2">
					<div className="text-[32px]/[35.2px] font-semibold">
            Buyers Reviews
					</div>
					<ProductRate.Root rates={totalRates}>
						<ProductRate.Total />
						<ProductRate.Likes />
						<ProductRate.DisLikes />
					</ProductRate.Root>
				</div>
				<Select.Root items={options} defaultValue={["recent"]}>
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
			</div>
			{reviews.map((review, index) => (
				<div className="flex flex-col px-4 py-6 gap-6 rounded-[20px] border border-white-04" key={index}>
					<div className="flex gap-2 items-center">
						<PreviewImage
							alt={`Image of ${review.user}`}
							src={review.avatar}
							className="size-8 rounded-full flex-shrink-0 shadow-sm"
						/>
						<div className="text-white-100 text-[18px]/[23.4px] font-semibold">
							{review.user}
						</div>
					</div>
					<div className="text-black-74 text-[16px]/[20.8px] font-normal">
						{review.quote}
					</div>
					<div className="flex items-center gap-2">
						{review.rate === "like" ? (
							<Button variant="subtle" className="pointer-events-none size-[38px] min-w-[38px] px-0 text-green-100 border border-green-100 bg-green-100/[.06]">
								<Icons.Likes className="size-[16px]" />
							</Button>
						) :
							review.rate === "dislike" ? (
								<Button variant="subtle" className="pointer-events-none size-[38px] min-w-[38px] px-0 text-red-100 border border-red-100 bg-red-100/[.08]">
									<Icons.Dislikes className="size-[16px]" />
								</Button>
							) : null}
						<div className="text-[16px]/[20.8px] font-normal text-black-60">
							{review.date}
						</div>
					</div>
				</div>
			))}
			<Button colorPalette="gray">
				Show More
			</Button>
		</div>
	);
}
