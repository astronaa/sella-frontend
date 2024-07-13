import { ProductId } from "~/shared/api/client";
import { fetchProduct } from "../../api/product";
import { ChatFrame } from "../chat/Frame";
import { MobileHeader } from "./MobileHeader";

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
			<ChatFrame product={product} />
		</div>
	);
}