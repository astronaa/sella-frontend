import { ProductContent } from "./ProductContent";
import { ReviewsStream } from "./ReviewsStream";
import { PreviewImage } from "~/shared/ui/image";
import { ProductId } from "~/shared/api/client"
import { ProductInitialData, fetchProduct, fetchProductReviews } from "../api";
import { CheckoutWidget } from "./CheckoutWidget";
import { ProductOnPageProvider } from "./ProductOnPageProvider";
import { ProductReportFlow } from "~/features/product/report";
import { StoreCard } from "~/entities/store";
import { RatingRow } from "~/shared/ui/rating";

export async function Component({ productId }: { productId: ProductId }) {
	const product = await fetchProduct(productId);
	const reviews = await fetchProductReviews(productId);

	return (
		<ProductOnPageProvider initialData={product}>
			<div className="flex flex-col items-start gap-16 mx-auto max-w-content px-[1rem]">
				<div className='flex max-xl:flex-col gap-[2.5rem] w-full'>
					<ProductContent
						className='w-full max-w-[47.5rem] max-xl:max-w-full flex-shrink-0'
					/>

					<div className='flex flex-col w-full gap-[1rem]'>
						<CheckoutWidget />
						<StoreWidget initialData={product} />
						<ProductReportFlow productId={productId}/>
					</div>
				</div>

				<ReviewsStream
					className='w-full max-w-[47.5rem] max-xl:max-w-full'
					initialData={reviews}
				/>
			</div>
		</ProductOnPageProvider>
	);
}

function StoreWidget({ initialData: product }: { initialData: ProductInitialData }) {
	const { store } = product;

	return (
		<div className="border border-white/[.04] rounded-[1.25rem] p-4 flex flex-col gap-6">
			{store && (
				<StoreCard.Root
					store={store}
					className='flex-col p-0 border-none gap-[1rem]'
				>
					<div className='flex gap-[1rem] w-full'>
						<StoreCard.ImageDesktop
							className='size-[3.5rem]'
						/>
						<StoreCard.Content>
							<StoreCard.Title
								className='text-[1rem] max-md:text-[1rem]'
							/>
						</StoreCard.Content>
					</div>

					{!!store.description && (
						<StoreCard.Description
							className='text-[1rem]'
						/>
					)}
				</StoreCard.Root>
			)}

			<div className="flex items-center justify-between bg-black-08 text-black-60 rounded-2xl p-2 pr-3">
				<div className="flex items-center gap-2">
					<PreviewImage
						width={32} height={32}
						src={store?.owner.avatarImage ?? null}
						alt="Store owner avatar"
						className="size-8 rounded-full"
					/>
					<div>by {store?.owner.username}</div>
				</div>

				{store?.owner.overallRating && (
					<RatingRow.Root
						asChild
						rating={store.owner.overallRating}
					>
						<RatingRow.Thumbs>
							<RatingRow.Likes />
							<RatingRow.Dislikes />
						</RatingRow.Thumbs>
					</RatingRow.Root>
				)}
			</div>
		</div>
	)
}
