import { Product, ProductId, apiClient } from "~/shared/api/client"

export async function fetchProduct(productId: ProductId): Promise<Product> {
	const product = await apiClient.products.for(productId).get();

	if(product.error)
		throw product.error

	return product.data;
}