import { 
	PayloadCreate, 
	PayloadCreateReview, 
	schemaCreate, 
	schemaCreateReview 
} from "./schemas";

import { authFetchClient } from "../fetch-client";
import { mapPaginationPayloadToDto } from "../shared/mappers";
import { PayloadPagination } from "../shared/schemas";
import { mapDtoToOrder, mapDtoToOrderReview } from "./mappers";
import { OrderId } from "./model";

export function createOrdersClient() {
	return {
		async getAll(pagination: PayloadPagination = { page: 1, limit: 10 }) {
			const { data, error } = await authFetchClient.GET('/api/my-orders', {
				params: {
					query: mapPaginationPayloadToDto(pagination)
				},
			});

			return data ? {
				data: {
					items: data.data.map(mapDtoToOrder),
					total: data.total,
					totalPrice: data.totalPrice
				},
				error
			} : {
				data, error
			}
		},

		async create(payload: PayloadCreate) {
			const { data, error } = await authFetchClient.POST('/api/orders', {
				body: {
					productId: payload.productId,
					token: payload.token,
					blockchain: payload.block
				}
			});

			return data ? {
				data: mapDtoToOrder(data), error
			} : {
				data, error
			}
		},

		for: (orderId: OrderId) => ({
			async get() {
				const { data, error } = await authFetchClient.GET('/api/orders/{id}', {
					params: { path: { id: orderId } }
				});

				return data ? {
					data: mapDtoToOrder(data), error
				} : {
					data, error
				}
			},
			async getReview() {
				const { data, error } = await authFetchClient.GET('/api/orders/{orderId}/review', {
					params: { path: { orderId } }
				});

				return data ? {
					data: mapDtoToOrderReview(data), error
				} : {
					data, error
				}
			},
			async createReview(payload: PayloadCreateReview) {
				return await authFetchClient.POST('/api/orders/{orderId}/review', {
					params: { path: { orderId } },
					body: {
						text: payload.content,
						isPositive: payload.rating == 'positive'
					}
				});
			}
		}),

		schemaCreate,
		schemaCreateReview
	}
}
