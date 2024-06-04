import { Store } from "../../model";
import { components } from "../../openapi";
import { mapMediaIdToUrl } from "../shared/mappers";

export const mapDtoToStore = (obj: components['schemas']['Store'] | components['schemas']['StoreInfoDto']): Store => ({
	id: obj.url,
	description: obj.description,
	isVerified: false,
	name: obj.name,
	previewImage: obj.imageId ? mapMediaIdToUrl(obj.imageId) : null,
	shortName: obj.url,
	rating: 'rating' in obj ? {
		likes: obj.rating.positive,
		dislikes: obj.rating.negative,
		reviewsCount: obj.rating.total
	} : {
		likes: 0,
		dislikes: 0,
		reviewsCount: 0
	}
});