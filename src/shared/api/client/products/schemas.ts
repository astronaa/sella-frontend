import { z } from "zod";

const schemaHoldPeriod = z.coerce
	.number({ required_error: 'Escrow value is required' })
	.min(1, 'Min value is 1')
	.max(60, 'Max value is 60')

export const schemaCreate = z.object({
	name: z.string({ required_error: 'Name is required' }).min(3, 'Min length is 3'),
	price: z.coerce.number({ message: 'Price is required' }).min(1, 'Min price is 1 USDT'),
	shortDescription: z.string({ required_error: 'Description is required' }),
	holdPeriod: schemaHoldPeriod,
	description: z.string().optional().nullable(),
	tagNames: z.array(z.string()),
})

export type PayloadCreate = z.infer<typeof schemaCreate>

export const schemaUpdate = schemaCreate.partial().merge(
	z.object({
		imageIds: z.array(z.string()).optional(),
		hasPreview: z.coerce.boolean().optional(),
		isFrozen: z.coerce.boolean().optional(),
	})
)

export type PayloadUpdate = z.infer<typeof schemaUpdate>

export const schemaUploadImages = z.object({
	previewImage: z.instanceof(File).optional().nullable(),
	galleryImages: z.array(z.instanceof(File).or(z.string())).optional()
})

export type PayloadUploadImages = z.infer<typeof schemaUploadImages>

export const schemaSearch = z.object({
	query: z.string().optional(),
	sort: z.enum(["new", "old", "price_asc", "price_desc", "rating"]).optional(),
	minPrice: z.coerce.number().optional(),
	maxPrice: z.coerce.number().optional(),
	tagNames: z.array(z.string()).optional()
})

export type PayloadSearch = z.infer<typeof schemaSearch>