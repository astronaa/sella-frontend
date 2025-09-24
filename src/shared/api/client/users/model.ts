import { ImageEntry } from "../shared/models";
import { Quest } from "../quests/model";

export type UserId = number;

export interface User {
	id: UserId;
	avatarImage: ImageEntry | null;
	address: string;
	username: string;
	email?: string | null;
	twitterId?: string | null;
	twitterUsername?: string | null;
	telegramId?: string | null;
	refCode: string;
	invitedBy?: number;
	points: number;
	tronAddress?: string | null;
	lastOnline: string;
	completedQuests: Quest[];
	createdAt: string;
}