import { z } from "zod";
import { productQueries } from "~/entities/product";
import { apiClient } from "~/shared/api/client";
import {FormError} from "~/shared/lib/errors";

export const schema = z.object({
	name: z.string({ required_error: 'Name is required' }).min(3, 'Min length is 3'),
	price: z.coerce.number({ message: 'Price is required' }).min(1, 'Min price is 1 USDT'),
	shortDescription: z.string({ required_error: 'Description is required' }),
	description: z.string().optional(),
	previewImage: z.instanceof(File).optional(),
	galleryImages: z.array(z.instanceof(File)).optional(),
	tagNames: z.array(z.string()).optional().default([])
});

export type SchemaType = z.infer<typeof schema>;

export async function createProduct(storeUrl: string, values: SchemaType) {
	const { data, error } = await apiClient.products.create(storeUrl, {
		name: values.name,
		price: Number(values.price),
		description: values.description,
		shortDescription: values.shortDescription,
		tagNames: values.tagNames
	})

	if(error){
		if (error.statusCode == 400) {
			throw new FormError(error.message as Record<string, string>);
		}
		throw new Error(error.message as unknown as string);
	}

	await apiClient.products.for(data.id).uploadImages(data, values);

	productQueries.invalidateAll();

	return data;
}