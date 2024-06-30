import { ImageEntry } from "../shared/models";

export type ProductId = string;

export interface Product {
	id: ProductId;
	name?: string;
	description?: string | null;
	shortDescription?: string;
	category?: string;
	imageIds?: ImageEntry[];
	storeUrl?: string;
	hasPreview?: boolean;
	previewImage?: ImageEntry | null;
	galleryImages?: ImageEntry[];
	price?: number;
	isFrozen?: boolean,
	tagNames?: string[],
	holdPeriod?: number,

	rating?: {
		likes: number;
		dislikes: number;
		reviewsCount: number;
	};
}
