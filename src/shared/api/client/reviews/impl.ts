import { OrderId, ProductId } from "../../model";
import { authFetchClient } from "../fetch-client";
import { PayloadPagination, mapPaginationPayloadToDto } from "../pagination";
import { mapDtoToReview } from "./mappers";
import { PayloadGetAll, schemaGetAll, sortTypes } from "./schemas";

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
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		forOrder: (orderId: OrderId) => ({

		}),

		schemaGetAll,
		sortTypes
	}
}