import { ImageEntry } from "../shared/models";

export type StoreId = string;

export interface Store {
	id: StoreId;
	name?: string;
	url: string;
	isVerified?: boolean;
	description?: string | null;
	previewImage?: ImageEntry | null;
	ownerUsername?: string;
	tagNames?: string[],

	rating?: {
		likes: number;
		dislikes: number;
		reviewsCount: number;
	};
}
