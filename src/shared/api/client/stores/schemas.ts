import { z } from "zod";
import { schemaSearch as schemaSearchProducts } from "../products/schemas";

export const schemaCreate = z.object({
	name: z.string().min(3, 'Min length is 3'),
	url: z.string()
		.regex(/^[a-zA-Z0-9_]+$/, { message: 'URL can only contain letters, numbers and underscores' })
		.min(3, 'Min length is 3'),
	description: z.string().optional().nullable(),
	tagNames: z.array(z.string()).optional().default([])
})

export type PayloadCreate = z.infer<typeof schemaCreate>;

export const schemaUpdate = schemaCreate.partial();

export type PayloadUpdate = z.infer<typeof schemaUpdate>;

export const schemaGetProducts = schemaSearchProducts;

export type PayloadGetProducts = z.infer<typeof schemaGetProducts>;

export const schemaSearch = z.object({
	query: z.string().optional(),
	sort: z.enum(["rating", "featured_rating"]).optional(),
	tagNames: z.array(z.string()).optional()
})

export type PayloadSearch = z.infer<typeof schemaSearch>