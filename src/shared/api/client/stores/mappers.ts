import { WithRequired } from "~/shared/lib/utility-types";
import { Store } from "../../model";
import { components } from "../../openapi";
import { mapMediaIdToUrl } from "../shared/mappers";

type Schemes = components['schemas'];

export const mapDtoToStore = (obj:
	WithRequired<Partial<Schemes['StoreInfoDto']>, 'url'>
) => ({
	id: obj.url,
	description: obj.description ?? null,
	isVerified: false,
	name: obj.name,
	previewImage: obj.imageId ? mapMediaIdToUrl(obj.imageId) : null,
	url: obj.url,
	ownerUsername: obj.ownerUsername,
	rating: obj.rating ? {
		likes: obj.rating.positive,
		dislikes: obj.rating.negative,
		reviewsCount: obj.rating.total
	} : undefined
}) satisfies Store;