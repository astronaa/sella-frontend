import { User } from "../users/model";

export interface Review {
	id: string;
	body: string;
	isPositive: boolean;
	createdAt: string;
	user: User | null;
}