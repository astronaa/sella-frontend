import {
	ANOTHER_REASON_ID,
	PayloadCreate,
	PayloadReport,
	PayloadUpdate,
	reportReasons,
	schemaCreate,
	schemaReport,
	schemaUpdate,
	schemaGetProducts, PayloadGetProducts
} from "./schemas";

import { authFetchClient } from "../fetch-client";
import { PayloadPagination } from "../shared/schemas";
import { mapDtoToProduct } from "../products/mappers";
import { mapDtoToStore } from "./mappers";
import { mapPaginationPayloadToDto } from "../shared/mappers";

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

		async getForExplore(pagination: PayloadPagination = { page: 1, limit: 10 }) {
			const { data, error } = await authFetchClient.GET('/api/explore', {
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

		async getForCurrentUser() {
			const { data, error } = await authFetchClient.GET('/api/users/stores');

			return data ? {
				data: data.map(mapDtoToStore), error
			} : {
				data, error
			}
		},

		async create(payload: PayloadCreate) {
			const { data, error, response } = await authFetchClient.POST('/api/stores', {
				body: {
					name: payload.name,
					url: payload.url,
					description: payload.description ?? undefined,
					tagNames: payload.tagNames
				}
			});

			return data ? {
				data: mapDtoToStore(data), 
				error, response
			} : {
				data, error,
				response
			}
		},

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

			async getProducts(pagination: PayloadPagination, payload: PayloadGetProducts) {
				const { data, error } = await authFetchClient.GET('/api/stores/{url}/products', {
					params: {
						path: { url: storeUrl },
						query: {...mapPaginationPayloadToDto(pagination), ...payload}
					},
				});

				return data ? {
					data: {
						items: data.data.map(mapDtoToProduct),
						total: data.total
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
						description: payload.description ?? undefined,
						url: payload.url,
						// @ts-expect-error expecting openapi changes
						tagNames: payload.tagNames
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
		}),

		schemaCreate,
		schemaUpdate,
		schemaReport,
		schemaGetProducts,
		reportReasons,
		ANOTHER_REASON_ID
	}
}
