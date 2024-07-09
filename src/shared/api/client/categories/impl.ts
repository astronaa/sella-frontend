import { data } from "./data";

export function createCategoriesClient() {
	return {
		async getAll() {
			return data
		}
	}
}
