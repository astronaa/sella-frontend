import { ProductId } from "~/shared/api/client";
import { fetchProduct } from "../api/product";
import { ChatFrame } from "./chat/Frame";

export async function PageChatFrame({ productId }: { productId: ProductId }) {
	const product = await fetchProduct(productId);

	return (
		<ChatFrame product={product} />
	);
}