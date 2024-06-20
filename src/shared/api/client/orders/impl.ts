import { authFetchClient } from "../fetch-client";
import { mapPaginationPayloadToDto } from "../shared/mappers";
import { PayloadPagination } from "../shared/schemas";
import { mapDtoToOrder } from "./mappers";

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
		}
	}
}
