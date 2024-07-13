import { authFetchClient } from "../fetch-client";
import { mapDtoToCategory } from "./mappers";

export function createCategoriesClient() {
	return {
		async getAll() {
			const { data, error } = await authFetchClient.GET('/api/featured-tags');

			return data ? {
				data: data.map(mapDtoToCategory), error
			} : {
				data, error
			}
		}
	}
}
