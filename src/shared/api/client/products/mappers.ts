import { Product } from "../../model";
import { components } from "../../openapi";
import { mapMediaIdToUrl } from "../shared/mappers";

export const mapDtoToProduct = (obj: components['schemas']['ProductInfoDto']): Product => {
	const mappedImages = obj.imageIds.map(mapMediaIdToUrl);

	const imagesConfig = obj.hasPreview ? {
		previewImage: mappedImages[0],
		galleryImages: mappedImages.slice(1)
	} : {
		previewImage: null,
		galleryImages: mappedImages
	}

	return {
		id: obj.id,
		name: obj.name,
		price: Number(obj.price),
		description: obj.description ?? null,
		shortDescription: obj.shortDescription,
		category: 'category',
		hasPreview: obj.hasPreview,
		imageIds: obj.imageIds,
		...imagesConfig
	};
};
