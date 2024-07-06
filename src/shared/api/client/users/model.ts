import { ImageEntry } from "../shared/models";

export type UserId = number;

export interface User {
	id?: UserId;
	avatarImage: ImageEntry | null;
	refCode?: string;
	address?: string;
	tronAddress?: string | null;
	username: string | null;
	email?: string | null;
	twitterId?: string | null;
	telegramId?: string | null;
	createdAt?: string;
}