import { Product, Store } from "../../model";
import { components } from "../../openapi";
import { authFetchClient } from "../fetch-client";
import { PayloadPagination, mapPaginationPayloadToDto } from "../pagination";

import {
	PayloadCreate,
	PayloadReport,
	PayloadUpdate,
	reportReasons,
	schemaCreate,
	schemaReport,
	schemaUpdate
} from "./schemas";

const mapDtoToStore = (obj: components['schemas']['Store']): Store => ({
	id: obj.id,
	description: obj.description,
	isVerified: false,
	name: obj.name,
	previewImage: obj.imageId,
	shortName: obj.url,
	rating: {
		dislikes: 0,
		likes: 0,
		reviewsCount: 0
	}
});

const mapDtoToProduct = (obj: components['schemas']['ProductShortInfo']): Product => ({
	id: obj.id,
	name: obj.name,
	shortDescription: obj.shortDescription,
	description: null,
	galleryImages: [],
	previewImage: obj.imageId,
	category: 'category',
	price: obj.price
});

export function createStoresClient() {
	return {
		async getAll(pagination: PayloadPagination) {
			const { data, error } = await authFetchClient.GET('/api/stores', {
				params: {
					query: mapPaginationPayloadToDto(pagination)
				},
			});

			return data ? {
				data: {
					items: data.data.map(mapDtoToStore),
					total: data.total
				},
				error
			} : {
				data, error
			}
		},

		async create(payload: PayloadCreate) {
			const { data, error } = await authFetchClient.POST('/api/stores', {
				body: {
					name: payload.name,
					url: payload.shortName,
					// @ts-expect-error expecting openapi changes
					description: payload.description
				}
			});

			return data ? {
				data: mapDtoToStore(data), error
			} : {
				data, error
			}
		},

		schemaCreate,

		for: (storeUrl: string) => ({
			async getProducts(pagination: PayloadPagination) {
				const { data, error } = await authFetchClient.GET('/api/stores/{url}/products', {
					params: {
						path: { url: storeUrl },
						query: mapPaginationPayloadToDto(pagination)
					},
				});

				return data ? {
					data: {
						items: data.map(mapDtoToProduct),
						total: 0
					},
					error
				} : {
					data, error
				}
			},
			async update(payload: PayloadUpdate) {
				return await authFetchClient.PATCH('/api/stores/{url}', {
					params: { path: { url: storeUrl } },
					body: {
						// @ts-expect-error expecting openapi changes
						name: payload.name,
						// @ts-expect-error expecting openapi changes
						description: payload.description,
						// @ts-expect-error expecting openapi changes
						url: payload.shortName
					},
					parseAs: 'text'
				});
			},
			async delete() {
				return await authFetchClient.DELETE('/api/stores/{url}', {
					params: { path: { url: storeUrl } },
					parseAs: 'text'
				})
			},
			async report(payload: PayloadReport) {
				return await authFetchClient.POST('/api/stores/{url}/report', {
					params: { path: { url: storeUrl } },
					body: {
						tag: payload.reasons,
						message: payload.description
					},
					parseAs: 'text'
				})
			},
			async setImage(image: File) {
				return await authFetchClient.PATCH('/api/stores/{url}/image', {
					params: { path: { url: storeUrl } },
					body: { file: 'placeholder' },
					bodySerializer: () => {
						const formData = new FormData();
						formData.set('file', image);
						return formData;
					},
					parseAs: 'text'
				})
			},

			schemaUpdate,
			schemaReport,
			reportReasons
		})
	}
}
