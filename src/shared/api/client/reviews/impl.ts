import { OrderId } from "../orders/model";
import { ProductId } from "../products/model";
import { authFetchClient } from "../fetch-client";
import { PayloadPagination } from "../shared/schemas";
import { mapDtoToReview, mapPayloadToCreateReviewDto } from "./mappers";
import { PayloadGetAll, schemaGetAll, sortTypes } from "./schemas";
import { mapPaginationPayloadToDto } from "../shared/mappers";

export function createReviewsClient() {
	return {
		forProduct: (productId: ProductId) => ({
			async getAll(payload: PayloadGetAll, pagination: PayloadPagination) {
				const { data, error } = await authFetchClient.GET('/api/products/{productId}/reviews', {
					params: {
						query: {
							productId, ...payload,
							...mapPaginationPayloadToDto(pagination)
						}
					}
				})

				return data ? {
					data: {
						items: data.comments.map(mapDtoToReview),
						total: data.total
					},
					error
				} : {
					data, error: new Error
				}
			}
		}),
		forOrder: (orderId: OrderId) => ({
			async get() {
				const { data, error } = await authFetchClient.GET('/api/orders/{orderId}/review', {
					params: { path: { orderId } }
				});

				return data ? {
					data: mapDtoToReview(data),
					error
				} : {
					data, error
				}
			},

			async create(payload: { rating: number; comment: string }) {
				return await authFetchClient.POST('/api/orders/{orderId}/review', {
					params: { path: { orderId } },
					body: mapPayloadToCreateReviewDto(payload)
				});
			}
		}),

		schemaGetAll,
		sortTypes
	}
}