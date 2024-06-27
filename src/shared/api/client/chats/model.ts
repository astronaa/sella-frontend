import { User, UserId } from "../users/model";

export type ChatId = string;

export interface Chat {
	id: ChatId,
	buyerId: UserId,
	sellerId: UserId,
	productName: string
}

export type ChatMessageId = string;

export interface ChatMessage {
	id: ChatMessageId,
	content: string,
	createdAt: string,
	fileIds: string[],
	readAt: string | null,
	sender: User
}