import { apiClient } from "~/shared/api/client";
import { ProductId } from "~/shared/api/client"
import { staticProductById } from "~/shared/static-data/marketplace";
import { staticReviewsForProduct } from "~/shared/static-data/reviews";
import { INITIAL_PAGE, INITIAL_SORT, ITEMS_PER_PAGE } from "../config";

export async function fetchProduct(productId: ProductId) {
	try {
		const product = await apiClient.products.for(productId).get();

		if(product.error)
			throw product.error

		return product.data;
	} catch (err) {
		const fallback = staticProductById(productId);
		if (fallback) return fallback;

		throw err;
	}
}

export type ProductInitialData = Awaited<ReturnType<typeof fetchProduct>>;

export async function fetchProductReviews(productId: ProductId) {
	try {
		const reviews = await apiClient.reviews
			.forProduct(productId)
			.getAll({ sort: INITIAL_SORT }, {
				page: INITIAL_PAGE, limit: ITEMS_PER_PAGE
			});

		if(reviews.error)
			throw reviews.error

		return reviews.data;
	} catch {
		return staticReviewsForProduct(productId, INITIAL_SORT, INITIAL_PAGE, ITEMS_PER_PAGE);
	}
}
