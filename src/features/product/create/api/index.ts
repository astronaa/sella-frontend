import { z } from "zod";
import { productQueries } from "~/entities/product";
import { apiClient } from "~/shared/api/client";
import { FormError } from "~/shared/lib/errors";

const { schemaCreate, schemaUploadImages } = apiClient.products
export const schema = schemaCreate.merge(schemaUploadImages);

export type SchemaType = z.infer<typeof schema>;

export async function createProduct(storeUrl: string, values: SchemaType) {
	const {
		galleryImages,
		previewImage,
		...payload
	} = schema.parse(values); // parsing again because of coerce

	const { data, error } = await apiClient.products.create(storeUrl, payload);

	if (error) {
		if (error.statusCode == 400) {
			throw new FormError(error.message as Record<string, string>);
		}
		throw new Error(error.message as unknown as string);
	}

	await apiClient.products.for(data.id)
		.uploadImages(data, { galleryImages, previewImage });

	productQueries.invalidateAll();

	return data;
}