import { ProductId } from "../products/model";
import { authFetchClient } from "../fetch-client";
import { mapDtoToChat, mapDtoToChatMessage } from "./mappers";
import { ChatId } from "./model";
import { PayloadCursorPagination, PayloadPagination } from "../shared/schemas";
import { mapCursorPaginationPayloadToDto, mapPaginationPayloadToDto } from "../shared/mappers";
import { OrderId } from "../orders/model";

export function createChatsClient() {
	return {
		async getAll(pagination: PayloadPagination = { page: 1, limit: 10 }) {
			const { data, error } = await authFetchClient.GET('/api/chats/all', {
				params: {
					query: mapPaginationPayloadToDto(pagination)
				}
			});

			return data ? {
				data: {
					items: data.data.map(mapDtoToChat),
					total: data.total
				},
				error
			} : {
				data, error
			}
		},

		fromProduct: (productId: ProductId) => ({
			async get() {
				const { data, error } = await authFetchClient.GET('/api/products/{id}/chat', {
					params: { path: { id: productId } }
				});

				return data ? {
					data: {
						chat: mapDtoToChat(data.result),
						accessToken: data.metadata.accessToken
					},
					error
				} : {
					data, error
				}
			}
		}),

		fromOrder: (orderId: OrderId) => ({
			async get() {
				const { data, error } = await authFetchClient.GET('/api/orders/{id}/chat', {
					params: { path: { id: orderId } }
				});

				return data ? {
					data: {
						chat: mapDtoToChat(data.result),
						accessToken: data.metadata.accessToken
					},
					error
				} : {
					data, error
				}
			}
		}),

		for: (chatId: ChatId) => ({
			async get() {
				const { data, error } = await authFetchClient.GET('/api/chats/{chatId}', {
					params: { path: { chatId } }
				});

				return data ? {
					data: {
						chat: mapDtoToChat(data.result),
						accessToken: data.metadata.accessToken
					},
					error
				} : {
					data, error
				}
			},
			async getMessages(pagination: PayloadCursorPagination = { limit: 10 }) {
				const { data, error } = await authFetchClient.GET('/api/chats/{chatId}/messages', {
					params: {
						path: { chatId },
						// @ts-expect-error expecting openapi changes
						query: mapCursorPaginationPayloadToDto(pagination)
					}
				});

				return data ? {
					data: {
						items: data.data.map(mapDtoToChatMessage),
						hasNextPage: data.hasNextPage,
						hasPreviousPage: data.hasPreviousPage
					}
				} : {
					data, error
				}
			}
		})
	}
}