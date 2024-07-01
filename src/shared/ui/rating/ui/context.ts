'use client';

import { Rating } from "~/shared/api/client"
import { createContextFactory } from "~/shared/lib/create-context-factory";

const create = createContextFactory('rating');

export const {
	RatingProvider,
	useRatingStrictContext
} = create<Rating>();
