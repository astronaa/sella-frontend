import { authFetchClient } from "~/shared/api/client/fetch-client";
import { mapPaginationPayloadToDto, PayloadPagination } from "~/shared/api/client/pagination";
import { mapDtoToSale } from "~/shared/api/client/sales/mappers";

export function createSalesClient() {
	return {
		async getAll(pagination: PayloadPagination = { page: 1, limit: 2 }) {
			const { data, error } = await authFetchClient.GET('/api/orders/my-sales', {
				params: {
					query: mapPaginationPayloadToDto(pagination)
				},
			});

			return data ? {
				data: {
					items: data.data.map(mapDtoToSale),
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
