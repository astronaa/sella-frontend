import { ProductId } from "../products/model";
import { authFetchClient } from "../fetch-client";
import { mapDtoToChat } from "./mappers";
import { ChatId } from "./model";
import { PayloadPagination } from "../shared/schemas";
import { mapPaginationPayloadToDto } from "../shared/mappers";

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
			},

		}),
		for: (chatId: ChatId) => ({
			async getMessages(pagination: PayloadPagination = { page: 1, limit: 10 }) {
				return await authFetchClient.GET('/api/chats/messages/{chatId}', {
					params: {
						path: { chatId },
						query: mapPaginationPayloadToDto(pagination)
					}
				});
			}
		})
	}
}