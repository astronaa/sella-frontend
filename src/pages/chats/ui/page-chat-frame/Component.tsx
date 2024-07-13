import { ProductId } from "~/shared/api/client";
import { fetchProduct } from "../../api/product";
import { MobileHeader } from "./MobileHeader";
import { ChatFrameByProduct } from "./Chat";

export async function PageChatFrame({ productId }: { productId: ProductId }) {
	const product = await fetchProduct(productId);

	return (
		<div className='flex flex-col max-lg:h-[calc(100vh-10rem)]'>
			<div className='flex flex-col gap-[0.75rem] px-[1.25rem] mt-[-3rem] lg:hidden'>
				<MobileHeader />
				<div
					className='bg-white/[.02] w-full h-[1rem] rounded-t-[1.25rem]'
				/>
			</div>
			<ChatFrameByProduct
				productId={product.id}
			/>
		</div>
	);
}