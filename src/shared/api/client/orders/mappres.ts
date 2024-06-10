import { mapMediaIdToUrl } from "~/shared/api/client/shared/mappers";
import { components } from "~/shared/api/openapi";
import { Order } from "~/shared/api/model";

export const mapDtoToOrder = (obj: components['schemas']['Order']): Order => {
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
		store: {
			id: String(obj.product.store.id),
			name: obj.product.store.name,
			shortName: obj.product.store.url,
			isVerified: true,//TODO no data from response
			description: obj.product.store.description ?? null,
			previewImage: mapMediaIdToUrl(obj.product.store.imageId ?? ''),
			//TODO no data from response
			rating: {
				likes: 0,
				dislikes: 0,
				reviewsCount: 0
			}
		},
		product: {
			id: obj.product.id,
			category: 'category',//TODO no data from response
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
