import { authFetchClient } from "../fetch-client";

export function createUsersClient() {
	return {
		async getProfile() {
			return authFetchClient.GET('/api/users/profile');
		},

	}
}
