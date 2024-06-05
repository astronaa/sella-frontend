import { Product } from "../../model";
import { components } from "../../openapi";
import { mapMediaIdToUrl } from "../shared/mappers";

export const mapDtoToProduct = (obj: components['schemas']['ProductInfoDto']): Product => {
	const [previewImage, ...galleryImages] = obj.imageIds.map(mapMediaIdToUrl);

	return {
		id: obj.id,
		name: obj.name,
		price: Number(obj.price),
		description: obj.description ?? null,
		shortDescription: obj.shortDescription,
		category: 'category',
		previewImage: previewImage ?? null,
		galleryImages,
	};
};
