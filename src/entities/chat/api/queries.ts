import { ChatId, OrderId, ProductId, apiClient } from "~/shared/api/client";
import { infiniteQueryOptions, queryOptions, skipToken } from "@tanstack/react-query";

export const getByIdOptions = (chatId: ChatId) =>
	queryOptions({
		queryKey: ['chat', { chatId }],
		queryFn: async () => {
			const { data, error } = await apiClient.chats
				.for(chatId)
				.get();

			if (error)
				throw error;

			return data;
		}
	})

export const getFromProductOptions = (productId: ProductId) =>
	queryOptions({
		queryKey: ['chat', { productId }],
		queryFn: async () => {
			const { data, error } = await apiClient.chats
				.fromProduct(productId)
				.get();

			if (error)
				throw error;

			return data;
		}
	})

export const getFromOrderOptions = (orderId: OrderId) =>
	queryOptions({
		queryKey: ['chat', { orderId }],
		queryFn: async () => {
			const { data, error } = await apiClient.chats
				.fromOrder(orderId)
				.get();

			if (error)
				throw error;

			return data;
		}
	})

interface GetChatMessagesOptions {
	chatId: ChatId | null,
	initialPage?: number,
	limit?: number
}

export const getChatMessagesOptions = ({
	chatId,
	initialPage = 1,
	limit = 10
}: GetChatMessagesOptions) =>
	infiniteQueryOptions({
		enabled: !!chatId,
		queryKey: ['chat-messages', chatId, { limit }],
		queryFn: chatId ? (async ({ pageParam }) => {
			const { data, error } = await apiClient.chats
				.for(chatId)
				.getMessages({ limit, page: pageParam })

			if (error)
				throw error;

			return data;
		}) : skipToken,
		initialPageParam: initialPage,
		getNextPageParam: (lastPage, pages, lastPageParam) =>
			(lastPageParam * limit < lastPage.total) ? (lastPageParam + 1) : null,
		staleTime: Infinity,
		select: (data) => ({
			pages: [...data.pages].reverse(),
			pageParams: [...data.pageParams].reverse(),
		}),
	})

interface GetChatsOptions {
	initialPage?: number,
	limit?: number
}

export const getChatsOptions = ({
	initialPage = 1,
	limit = 10
}: GetChatsOptions = {}) =>
	infiniteQueryOptions({
		queryKey: ['chats', { limit }],
		queryFn: (async ({ pageParam }) => {
			const { data, error } = await apiClient.chats
				.getAll({ limit, page: pageParam })

			if (error)
				throw error;

			return data;
		}),
		initialPageParam: initialPage,
		getNextPageParam: (lastPage, pages, lastPageParam) =>
			(lastPageParam * limit < lastPage.total) ? (lastPageParam + 1) : null,
		staleTime: Infinity
	})