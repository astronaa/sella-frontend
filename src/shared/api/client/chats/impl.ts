import { ProductId } from "../products/model";
import { authFetchClient } from "../fetch-client";
import { mapDtoToChat } from "./mappers";

export function createChatsClient() {
	return {
		fromProduct: (productId: ProductId) => ({
			async get() {
				const { data, error } = await authFetchClient.GET('/api/chats/{id}', {
					params: { path: { id: productId } }
				});	

				return data ? {
					data: mapDtoToChat(data), error
				} : {
					data, error
				}
			}
		})
	}
}