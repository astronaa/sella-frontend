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

export const ANOTHER_REASON_ID = 'SomethingElse' as const;

export const reportReasons = [
	"Spam",
	"Nudity",
	"Scam",
	"Illegal",
	"Violence",
	"HateSpeech",
	ANOTHER_REASON_ID
] as const;

export const schemaReport = z.object({
	description: z.string().optional(),
	reasons: z.array(z.enum(reportReasons)).nonempty({ message: 'Reason required' })
}).superRefine(({ description, reasons }, ctx) => {
	if (reasons.includes(ANOTHER_REASON_ID) && !description) {
		return ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Description required',
			path: ['description'],
		});
	}
});

export type PayloadReport = z.infer<typeof schemaReport>

export const schemaGetProducts = z.object({
	query: z.string().optional(),
	sort: z.enum(["new" , "old" , "price_asc" , "price_desc" , "rating"]).optional(),
	minPrice: z.coerce.number().optional(),
	maxPrice: z.coerce.number().optional()
})

export type PayloadGetProducts = z.infer<typeof schemaGetProducts>;
