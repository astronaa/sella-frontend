import Link from "next/link";
import { HTMLAttributes } from "react";
import type { StoreReview } from "~/shared/static-data/reviews";
import { cn } from "~/shared/lib/cn";
import { dayJs } from "~/shared/lib/dayjs";
import { Icons } from "~/shared/ui/icons";
import { Heading } from "~/shared/ui/kit/heading";
import { IconButton } from "~/shared/ui/kit/button";
import { Avatar } from "~/shared/ui/kit/avatar";

interface StoreReviewsProps extends HTMLAttributes<HTMLDivElement> {
	reviews: StoreReview[];
	total: number;
}

/**
 * Reviews rolled up across the whole shop. Card markup matches the
 * product page's ReviewsStream so the two read as one component, with
 * the product name added since a shop feed mixes listings.
 */
export function StoreReviews({ reviews, total, className, ...props }: StoreReviewsProps) {
	if (!reviews.length) return null;

	return (
		<div {...props} className={cn("flex flex-col gap-6", className)}>
			<div className="flex flex-col gap-2">
				<Heading size="sm">What buyers said</Heading>
				<div className="text-[1rem]/[1.3rem] font-normal text-black-60">
					{total} {total === 1 ? "review" : "reviews"} across this shop
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{reviews.map((review) => (
					<div
						key={review.id}
						className="flex flex-col px-4 py-6 gap-4 rounded-[1.25rem] border border-white/[.04]"
					>
						<div className="flex gap-2 items-center justify-between">
							{review.user && (
								<div className="flex gap-2 items-center min-w-0">
									<Avatar
										className="size-[2rem] flex-shrink-0 shadow-sm"
										name={review.user.username ?? undefined}
										src={review.user.avatarImage ?? undefined}
									/>
									<div className="text-white text-[1.125rem]/[1.4625rem] font-semibold truncate">
										{review.user.username}
									</div>
								</div>
							)}
							{review.isPositive ? (
								<IconButton
									variant="subtle"
									colorPalette="green"
									size="sm"
									className="pointer-events-none border-green-100/[.06] flex-shrink-0"
								>
									<Icons.Likes />
								</IconButton>
							) : (
								<IconButton
									variant="subtle"
									colorPalette="red"
									size="sm"
									className="pointer-events-none border-red-100/[.06] flex-shrink-0"
								>
									<Icons.Dislikes />
								</IconButton>
							)}
						</div>

						<div className="text-black-74 text-[1rem]/[1.3rem] font-normal">
							{review.body}
						</div>

						<div className="flex items-center gap-2 flex-wrap">
							<Link
								href={`/products/${review.productId}`}
								className="text-[0.875rem]/[1.1375rem] font-medium text-accent-100 hover:underline"
							>
								{review.productName}
							</Link>
							<span className="text-black-60">·</span>
							<div className="text-[0.875rem]/[1.1375rem] font-normal text-black-60">
								{dayJs(review.createdAt).fromNow()}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
