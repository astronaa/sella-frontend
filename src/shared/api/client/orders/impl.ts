import { mapPaginationPayloadToDto, PayloadPagination } from "~/shared/api/client/pagination";
import { authFetchClient } from "~/shared/api/client/fetch-client";
import { mapDtoToOrder } from "~/shared/api/client/orders/mappres";


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
