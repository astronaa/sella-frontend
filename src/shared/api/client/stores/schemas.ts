import { z } from "zod";

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
