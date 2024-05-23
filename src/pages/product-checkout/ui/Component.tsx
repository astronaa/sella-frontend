import { StoreId } from "~/shared/api/model";
import { fetchProduct } from "../api";
import { ChatFrame } from "./ChatFrame";

export async function Component({ storeId }: { storeId: StoreId }) {
	const product = await fetchProduct(storeId);

	return (
		<div className='flex gap-[2.5rem] w-full h-[44.875rem] max-w-content mx-auto px-[1rem]'>
			<ChatFrame
				product={product}
				className='size-full'
			/>
		</div>
	)
}