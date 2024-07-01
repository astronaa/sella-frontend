import { authFetchClient } from "../fetch-client";
import { mapPaginationPayloadToDto } from "../shared/mappers";
import { PayloadPagination } from "../shared/schemas";
import { mapDtoToOrder } from "./mappers";
import { OrderId } from "./model";
import { PayloadCreate, schemaCreate } from "./schemas";

export function createOrdersClient() {
	return {
		async getAll(pagination: PayloadPagination = { page: 1, limit: 10 }) {
			const { data, error } = await authFetchClient.GET('/api/orders/my-orders', {
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
			return await authFetchClient.POST('/api/orders', {
				// @ts-expect-error expecting openapi changes
				body: payload
			});
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
			}
		}),

		schemaCreate
	}
}
