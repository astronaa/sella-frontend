import { Product } from "../products/model";
import { User } from "../users/model";

export type ChatId = string;

export interface Chat {
	id: ChatId,
	buyer: User,
	product: Product,
	lastMessage: ChatMessage | null,
	unreadMessagesCount: number
}

export type ChatMessageId = number;

export interface ChatMessage {
	id: ChatMessageId,
	content: string,
	createdAt: string,
	fileIds: string[],
	readAt: string | null,
	sender: User
}