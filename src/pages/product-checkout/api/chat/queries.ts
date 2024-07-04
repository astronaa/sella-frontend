import { ChatId, ProductId, apiClient } from "~/shared/api/client";
import { infiniteQueryOptions, queryOptions, skipToken, useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const getChatForProductOptions = (productId: ProductId) =>
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
		queryFn: chatId ? (async () => {
			const { data, error } = await apiClient.chats
				.for(chatId)
				.getMessages()

			if (error)
				throw error;

			return data;
		}) : skipToken,
		initialPageParam: initialPage,
		getNextPageParam: (lastPage, pages, lastPageParam) =>
			(lastPageParam * limit < lastPage.total) ? (lastPageParam + 1) : null,
		staleTime: Infinity
	})

interface UseGetChatMessagesForProductOptions {
	productId: ProductId,
	limit?: number
}

export function useGetChatMessagesForProduct(
	{ productId, limit }: UseGetChatMessagesForProductOptions
) {
	const chatQuery = useQuery({
		...getChatForProductOptions(productId),
		staleTime: Infinity
	});

	return useInfiniteQuery(
		getChatMessagesOptions({
			chatId: chatQuery.data?.chat.id ?? null, 
			limit
		})
	)
}