import { ProductId } from "../products/model";
import { authFetchClient } from "../fetch-client";
import { mapDtoToChat, mapDtoToChatMessage } from "./mappers";
import { ChatId } from "./model";
import { PayloadPagination } from "../shared/schemas";
import { mapPaginationPayloadToDto } from "../shared/mappers";

export function createChatsClient() {
	return {
		fromProduct: (productId: ProductId) => ({
			async get() {
				const { data, error } = await authFetchClient.GET('/api/products/{id}/chat', {
					params: { path: { id: productId } }
				});

				return data ? {
					data: {
						chat: mapDtoToChat(data.result), 
						accessToken: data.metadata.accessToken as string
					},
					error
				} : {
					data, error
				}
			},

		}),
		for: (chatId: ChatId) => ({
			async getMessages(pagination: PayloadPagination = { page: 1, limit: 10 }) {
				const { data, error } = await authFetchClient.GET('/api/chats/{chatId}/messages', {
					params: {
						path: { chatId },
						query: mapPaginationPayloadToDto(pagination)
					}
				});

				interface PLEASE_REPLACE_AFTER_OPENAPI_UPDATE_ExpectedData {
					data: NonNullable<(typeof data)>[],
					total: number
				}

				const expectedData = data as unknown as PLEASE_REPLACE_AFTER_OPENAPI_UPDATE_ExpectedData;

				return data ? {
					data: {
						items: expectedData.data.map(mapDtoToChatMessage),
						total: expectedData.total,
					}
				} : {	
					data, error 
				}
			}
		})
	}
}