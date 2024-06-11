import { WithOptional } from "~/shared/lib/utility-types";
import { Store } from "../../model";
import { components } from "../../openapi";
import { mapMediaIdToUrl } from "../shared/mappers";

type Schemes = components['schemas'];

export const mapDtoToStore = (obj:
	Schemes['Store'] | WithOptional<Schemes['StoreInfoDto'], 'ownerUsername'>
): Store => ({
	id: obj.url,
	description: obj.description ?? null,
	isVerified: false,
	name: obj.name,
	previewImage: obj.imageId ? mapMediaIdToUrl(obj.imageId) : null,
	shortName: obj.url,
	ownerUsername: ('ownerUsername' in obj ? obj.ownerUsername : '') ?? '',
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