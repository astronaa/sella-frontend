import { UserId } from "../users/model";

export type ChatId = string;

export interface Chat {
	id: ChatId,
	buyerId: UserId,
	sellerId: UserId,
	productName: string
}