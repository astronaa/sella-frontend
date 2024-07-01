import { apiClient } from "~/shared/api/client";
import { ProductId } from "~/shared/api/client"
import { INITIAL_PAGE, INITIAL_SORT, ITEMS_PER_PAGE } from "../config";

export async function fetchProduct(productId: ProductId) {
	const product = await apiClient.products.for(productId).get();

	if(product.error)
		throw product.error

	return product.data;
}

export type ProductInitialData = Awaited<ReturnType<typeof fetchProduct>>;

export async function fetchProductReviews(productId: ProductId) {
	const reviews = await apiClient.reviews
		.forProduct(productId)
		.getAll({ sort: INITIAL_SORT }, {
			page: INITIAL_PAGE, limit: ITEMS_PER_PAGE
		});

	if(reviews.error)
		throw reviews.error

	return reviews.data;
}