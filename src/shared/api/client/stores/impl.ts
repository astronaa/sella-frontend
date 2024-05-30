import { authFetchClient } from "../fetch-client";
import { PayloadPagination, mapPaginationPayloadToDto } from "../pagination";
import { mapDtoToProduct } from "../products/mappers";
import { mapDtoToStore } from "./mappers";

import {
	PayloadCreate,
	PayloadReport,
	PayloadUpdate,
	reportReasons,
	schemaCreate,
	schemaReport,
	schemaUpdate
} from "./schemas";

export function createStoresClient() {
	return {
		async getAll(pagination: PayloadPagination = { page: 1, limit: 10 }) {
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
			async get() {
				const { data, error } = await authFetchClient.GET('/api/stores/{url}', {
					params: { path: { url: storeUrl } }
				});

				return data ? {
					data: mapDtoToStore(data), error
				} : {
					data, error
				}
			},

			async getProducts(pagination: PayloadPagination = { page: 1, limit: 10 }) {
				const { data, error } = await authFetchClient.GET('/api/stores/{url}/products', {
					params: {
						path: { url: storeUrl },
						query: mapPaginationPayloadToDto(pagination)
					},
				});

				return data ? {
					data: {
						items: data.data.map(mapDtoToProduct),
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
						name: payload.name,
						description: payload.description,
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
