import { apiClient } from "~/shared/api/client";
import { ProductId } from "~/shared/api/model";

export async function fetchProductPage(productId: ProductId) {
	const product = await apiClient.products.for(productId).get();

	if(product.error)
		throw product

	return product.data;
}