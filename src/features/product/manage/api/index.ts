import { z } from "zod";
import { ProductId } from "~/shared/api/client"
import { apiClient } from "~/shared/api/client";
import { mapMediaUrlToId } from "~/shared/api/client"
import { productQueries } from "~/entities/product";
import {FormError} from "~/shared/lib/errors";

export const schema = z.object({
	name: z.string({ required_error: 'Name is required' }).min(3, 'Min length is 3'),
	price: z.coerce.number({ message: 'Price is required' }).min(1, 'Min price is 1 USDT'),
	shortDescription: z.string({ required_error: 'Description is required' }),
	description: z.string().optional().nullable(),
	previewImage: z.instanceof(File).optional().nullable(),
	galleryImages: z.array(z.instanceof(File)).optional(),
	galleryImagesUrls: z.array(z.string()),
	hasPreview: z.boolean()
});

export type SchemaType = z.infer<typeof schema>

export async function manageProduct(productId: ProductId, values: SchemaType) {
	const { data, error } = await apiClient.products.for(productId).update({
		name: values.name,
		description: values.description ?? undefined,
		price: Number(values.price),
		shortDescription: values.shortDescription
	})

	if(error){
		if (error.statusCode == 400) {
			throw new FormError(error.message as Record<string, string>);
		}
		throw new Error(error.message as unknown as string);
	}

	await apiClient.products.for(productId).uploadImages(data, {
		previewImage: values.previewImage,
		galleryImages: [
			...values.galleryImagesUrls.map(mapMediaUrlToId),
			...values.galleryImages ?? []
		]
	});

	productQueries.invalidateAll();

	return data
}