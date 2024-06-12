import { apiClient } from "~/shared/api/client";
import { ProductId } from "~/shared/api/model";
import { INITIAL_PAGE, INITIAL_SORT, ITEMS_PER_PAGE } from "../config";

export async function fetchProductPage(productId: ProductId) {
	const product = await apiClient.products.for(productId).get();

	if(product.error)
		throw product.error

	return product.data;
}

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