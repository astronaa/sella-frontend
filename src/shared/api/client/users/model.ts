import { ImageEntry } from "../shared/models";

export type UserId = number;

export interface User {
	id?: UserId;
	avatarImage: ImageEntry | null;
	address?: string;
	username: string | null;
	email?: string | null;
	twitterId?: string | null;
	telegramId?: string | null;
	createdAt?: string;
}