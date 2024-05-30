import { Product } from "../../model";
import { components } from "../../openapi";

export const mapDtoToProduct = (obj: components['schemas']['ProductInfoDto']): Product => {
	const [previewImage, ...galleryImages] = obj.imageIds;

	return {
		id: obj.id,
		name: obj.name,
		price: Number(obj.price),
		description: obj.description,
		shortDescription: obj.shortDescription,
		category: 'category',
		previewImage,
		galleryImages,
	};
};
