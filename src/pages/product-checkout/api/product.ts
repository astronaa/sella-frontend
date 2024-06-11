import { Product, ProductId } from "~/shared/api/model";

export async function fetchProduct(productId: ProductId): Promise<Product> {
	return {
		id: productId,
		name: 'Product Name',
		description: 'Market, Limit, Stop Limit, and Auction Mode orders.',
		shortDescription: 'Market, Limit, Stop Limit, and Auction Mode orders.',
		previewImage: null,
		galleryImages: [],
		category: 'Category',
		price: 2.99,
		imageIds: [],
		storeUrl: '@teststore',
		hasPreview: false
	}
}