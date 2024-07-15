import { z } from "zod";
import { schemaPaymentToken } from "../shared/schemas";
import { orderReviewRatingTypes } from "./model";

export const schemaCreate = z.object({
	productId: z.string(),
}).merge(schemaPaymentToken);

export type PayloadCreate = z.infer<typeof schemaCreate>

export const schemaCreateReview = z.object({
	content: z
		.string({ required_error: 'You need to write a review to send it' })
		.min(3, 'Min length is 3'),
	rating: z.enum(orderReviewRatingTypes, { required_error: 'Rate the order' })
})

export type PayloadCreateReview = z.infer<typeof schemaCreateReview>