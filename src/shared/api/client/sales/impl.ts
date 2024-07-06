import { authFetchClient } from "../fetch-client";
import { mapPaginationPayloadToDto } from "../shared/mappers";
import { PayloadPagination } from "../shared/schemas";
import { mapDtoToSale } from "./mappers";

export function createSalesClient() {
	return {
		async getAll(pagination: PayloadPagination = { page: 1, limit: 2 }) {
			const { data, error } = await authFetchClient.GET('/api/my-sales', {
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
