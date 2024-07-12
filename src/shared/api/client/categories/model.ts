import { ImageEntry } from "../shared/models";

export type CategoryId = string;

export interface Category {
	id: CategoryId,
	name: string,
	image: ImageEntry
}