import { ProductId } from "../../model";
import { authFetchClient } from "../fetch-client";
import { PayloadCreate, PayloadUpdate, schemaCreate, schemaUpdate } from "./schemas";
import { mapDtoToProduct } from "./mappers";

export function createProductsClient() {
	return {
		async create(storeUrl: string, payload: PayloadCreate) {
			return await authFetchClient.POST('/api/products', {
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
					body: payload
				});

				return data ? {
					data: mapDtoToProduct(data), error
				} : {
					data, error
				}
			},
			async uploadImages(payload: File[]) {
				console.log('uploadImages',payload)
				return await authFetchClient.POST('/api/products/{id}/images', {
					params: { path: { id: productId } },
					body: { file: [] },
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
