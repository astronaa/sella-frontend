import { components } from "~/shared/api/openapi";
import { mapMediaIdToUrl } from "~/shared/api/client/shared/mappers";
import { Sale } from "~/shared/api/model";

export const mapDtoToSale = (obj: components['schemas']['Order']): Sale => {
	const mappedImages = obj.product.imageIds.map(mapMediaIdToUrl);
	const [previewImage, ...galleryImages] = mappedImages;

	return {
		id: obj.id,
		transaction: {
			status: obj.status,
			fulfillmentStatus: obj.fulfillmentStatus,
			createdAt: obj.createdAt,
			transactionUrl: '',
			totalPaid: obj.price,
		},
		user: {
			// name: obj.buyer.username ?? '',
			name: 'testName',
		},
		// sellerId: obj.sellerId,
		// productId: obj.productId,
		// buyerId: obj.buyerId,
		// buyer: obj.buyer,
		// status: obj.status,
		// fulfillmentStatus: obj.fulfillmentStatus,
		// createdAt: obj.createdAt,
		// price: obj.price,
		// store: obj.product.store,
		// storeId: obj.product.storeId,
		product: {
			id: obj.product.id,
			category: 'category',
			name: obj.product.name,
			price: obj.product.price,
			description: obj.product.description ?? null,
			shortDescription: obj.product.shortDescription,
			previewImage: obj.product.hasPreview ? previewImage : null,
			galleryImages: obj.product.hasPreview ? galleryImages : mappedImages,
			hasPreview: obj.product.hasPreview,
			imageIds: obj.product.imageIds
		},
	}
}
