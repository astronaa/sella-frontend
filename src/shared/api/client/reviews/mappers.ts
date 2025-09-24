import { components } from "~/shared/api/openapi";
import { Review } from "./model";
import { mapCommentUserDtoToUser } from "../users/mappers";

export const mapDtoToReview = (obj: components['schemas']['ReviewDto']): Review => ({
	id: obj.id,
	body: obj.text,
	createdAt: obj.createdAt,
	isPositive: obj.isPositive,
	user: obj.user ? mapCommentUserDtoToUser(obj.user) : null
})

export const mapPayloadToCreateReviewDto = (payload: { rating: number; comment: string }): components['schemas']['CreateReviewDto'] => ({
	text: payload.comment,
	isPositive: payload.rating >= 3
})