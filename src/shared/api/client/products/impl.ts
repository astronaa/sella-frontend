import { Product, ProductId } from "../../model";
import { authFetchClient } from "../fetch-client";
import { PayloadCreate, PayloadUpdate, schemaCreate, schemaUpdate } from "./schemas";
import { components } from "../../openapi";

const mapDtoToProduct = (obj: components['schemas']['ProductInfoDto']): Product => {
	const [previewImage, ...galleryImages] = obj.imageIds;

	return {
		id: obj.name, // todo obj.id after openapi update
		name: obj.name,
		price: obj.price,
		description: obj.description,
		shortDescription: obj.shortDescription,
		category: 'category',
		previewImage,
		galleryImages,
	}
}

export function createProductsClient() {
	return {
		async create(storeUrl: string, payload: PayloadCreate) {
			return await authFetchClient.POST('/api/products', {
				// @ts-expect-error expecting openapi changes
				body: { storeUrl, ...payload }
			});
		},

		schemaCreate,

		for: (productId: ProductId) => ({
			async get() {
				const { data, error } = await authFetchClient.GET('/api/products/{id}', {
					params: { path: { id: productId } }
				});

				return data ? {
					data: mapDtoToProduct(data), error
				} : {
					data, error
				}
			},
			async update(payload: PayloadUpdate) {
				const { data, error } = await authFetchClient.PATCH('/api/products/{id}', {
					params: { path: { id: productId } },
					// @ts-expect-error expecting openapi changes
					body: payload
				});

				return data ? {
					data: mapDtoToProduct(data), error
				} : {
					data, error
				}
			},
			async uploadImages(payload: File[]) {
				return await authFetchClient.POST('/api/products/{id}/image', {
					params: { path: { id: productId } },
					body: { file: 'placeholder' },
					bodySerializer: () => {
						const formData = new FormData();
						payload.forEach(f => formData.set('file', f));
						return formData;
					}
				});
			},

			schemaUpdate
		})
	}
}