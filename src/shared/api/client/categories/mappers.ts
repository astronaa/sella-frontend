import { components } from "../../openapi";
import { mapMediaIdToUrl } from "../shared/mappers";
import { Category } from "./model";

type Schemes = components['schemas'];

export const mapDtoToCategory = (obj: Schemes['FeaturedTagDto']): Category => ({
	id: obj.name,
	name: obj.name,
	image: mapMediaIdToUrl(obj.imageId)
})