import { components } from "~/shared/api/openapi";
import { Review } from "./model";
import { mapDtoToUserShort } from "../users/mappers";

export const mapDtoToReview = (obj: components['schemas']['ReviewDto']): Review => ({
	id: obj.id,
	body: obj.text,
	createdAt: obj.createdAt,
	isPositive: obj.isPositive,
	user: obj.user ? mapDtoToUserShort(obj.user) : null
})