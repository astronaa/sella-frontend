import { z } from "zod";

export const sortTypes = [
	'newest', 
	'oldest', 
	'highestRating', 
	'lowestRating'
] as const;

export const schemaGetAll = z.object({
	sort: z.enum(sortTypes)
});

export type PayloadGetAll = z.infer<typeof schemaGetAll>