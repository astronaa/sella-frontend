import { Store } from "../../model";
import { components } from "../../openapi";

export const mapDtoToStore = (obj: components['schemas']['Store']): Store => ({
	id: obj.id,
	description: obj.description,
	isVerified: false,
	name: obj.name,
	previewImage: obj.imageId,
	shortName: obj.url,
	rating: {
		dislikes: 0,
		likes: 0,
		reviewsCount: 0
	}
});