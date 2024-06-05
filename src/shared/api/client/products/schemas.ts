import { z } from "zod";

export const schemaCreate = z.object({
	name: z.string({ required_error: 'Name is required' }).min(3, 'Min length is 3'),
	price: z.coerce.number({ message: 'Price is required' }).min(1, 'Min price is 1 USDT'),
	shortDescription: z.string({ required_error: 'Description is required' }),
	description: z.string().optional()
})

export type PayloadCreate = z.infer<typeof schemaCreate>

export const schemaUpdate = schemaCreate.partial().merge(
	z.object({ 
		imageIds: z.array(z.string()).optional(),
		hasPreview: z.coerce.boolean().optional()
	})
)

export type PayloadUpdate = z.infer<typeof schemaUpdate>

export const schemaUploadImages = z.object({
	previewImage: z.instanceof(File).optional().nullable(),
	galleryImages: z.array(z.instanceof(File).or(z.string())).optional()
})

export type PayloadUploadImages = z.infer<typeof schemaUploadImages>