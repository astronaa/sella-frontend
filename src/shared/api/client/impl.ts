import { createAuthClient } from "./auth/impl";
import { createUsersClient } from "./users/impl";

export function createApiClient() {
	return {
		auth: createAuthClient(),
		users: createUsersClient()
	}
}