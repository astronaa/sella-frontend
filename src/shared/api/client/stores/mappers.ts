import { WithRequired } from "~/shared/lib/utility-types";
import { components } from "../../openapi";
import { mapDtoToRating, mapMediaIdToUrl } from "../shared/mappers";
import { Store } from "./model";

type Schemes = components['schemas'];

export const mapDtoToStore = (obj:
	WithRequired<Partial<Schemes['StoreInfoDto']>, 'url'>
) => ({
	id: obj.url,
	description: obj.description ?? null,
	isVerified: false,
	name: obj.name,
	previewImage: obj.imageId ? mapMediaIdToUrl(obj.imageId) : null,
	shortName: obj.url,
	ownerUsername: obj.ownerUsername,
	tagNames: obj.tagNames,
	rating: obj.rating ? mapDtoToRating(obj.rating) : undefined
}) satisfies Store;