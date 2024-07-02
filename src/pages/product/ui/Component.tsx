import { ProductContent } from "./ProductContent";
import { ReviewsStream } from "./ReviewsStream";
import { PreviewImage } from "~/shared/ui/image";
import { Icons } from "~/shared/ui/icons";
import { ProductId } from "~/shared/api/client"
import { fetchProduct, fetchProductReviews } from "../api";
import { CheckoutWidget } from "./CheckoutWidget";
import { ProductOnPageProvider } from "./ProductOnPageProvider";
import { ReportFlow } from "~/features/product/report/ui/ReportFlow";

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
						<TwitterWidget />
						<ReportFlow productId={productId}/>
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

function TwitterWidget() {
	return (
		<div className="border border-white/[.04] rounded-[1.25rem] p-4 flex flex-col gap-6">
			<div className="flex flex-col gap-4">
				<div className="flex gap-4 items-center">
					<PreviewImage src={null} alt="Twitter User Avatar" className="size-14 rounded-full" />
					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-1 text-[1rem]/[20/0.5rem] font-semibold">
							<div className="text-white">
								Twitter Accounts
							</div>
							<Icons.Verified className='text-accent-100' />
						</div>
						<div className="text-black-40">@twitteraccs</div>
					</div>
				</div>
				<div className="text-[1rem]/[1.3rem] font-normal text-black-60">
					Selling old, premium, crypto twitter accounts with blue ticks and real followers
				</div>
			</div>
			<div className="flex items-center justify-between bg-black-08 text-black-60 rounded-2xl p-2 pr-3">
				<div className="flex items-center gap-2">
					<PreviewImage src={null} alt="Twitter User Avatar" className="size-8 rounded-full" />
					<div>by @redfox</div>
				</div>
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-1 text-green-100">
						<Icons.Likes />
						<span>421</span>
					</div>
					<div className="flex items-center gap-1 text-red-100">
						<Icons.Dislikes />
						<span>16</span>
					</div>
				</div>
			</div>
		</div>
	)
}
