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

type ChatMessageTypes = 
	| "NEW_CHAT" | "DISPUTE_RESOLVED" 
	| "DISPUTE_STARTED" | "TRANSACTION_COMPLETED" 
	| "TRANSACTION_FAILED" | "TRANSACTION_PENDING" 
	| "FUNDS_DEPOSITED" | "FUNDS_RELEASED" 
	| "FUNDS_CLAIMED" | "FUNDS_REFUNDED"

export interface ChatMessage {
	id: ChatMessageId,
	chatId: ChatId,
	content: string,
	createdAt: string,
	fileIds: string[],
	readAt: string | null,
	sender: User,
	isSystem: boolean;
	systemType: ChatMessageTypes | null;
	systemData: Record<string, string>;
}