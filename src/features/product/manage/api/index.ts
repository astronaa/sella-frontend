import { z } from "zod";
import { ProductId } from "~/shared/api/client"
import { apiClient } from "~/shared/api/client";
import { mapMediaUrlToId } from "~/shared/api/client"
import { productQueries } from "~/entities/product";
import { FormError } from "~/shared/lib/errors";

const { schemaUpdate, schemaUploadImages } = apiClient.products
export const schema = schemaUpdate.merge(schemaUploadImages).merge(
	z.object({ galleryImagesUrls: z.array(z.string()) })
);

export type SchemaType = z.infer<typeof schema>

export async function manageProduct(productId: ProductId, values: SchemaType) {
	const {
		galleryImagesUrls,
		galleryImages,
		previewImage,
		...payload
	} = schema.parse({
		...values,
		description: values?.description ?? ''
	}); // parsing again because of coerce

	const { data, error } = await apiClient.products.for(productId).update(payload);

	if (error) {
		if (error.statusCode == 400) {
			throw new FormError(error.message as Record<string, string>);
		}
		throw new Error(error.message as unknown as string);
	}

	await apiClient.products.for(productId).uploadImages(data, {
		previewImage,
		galleryImages: [
			...galleryImagesUrls.map(mapMediaUrlToId),
			...galleryImages ?? []
		]
	});

	productQueries.invalidateAll();

	return data
}