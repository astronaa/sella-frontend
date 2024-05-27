import { 
	PayloadGenerateNonce, PayloadLogin, 
	schemaGenerateNonce, schemaLogin 
} from "./schema";

import { authFetchClient } from "../fetch-client";

export function createAuthClient() {
	return {
		async generateNonce(payload: PayloadGenerateNonce) {
			return authFetchClient.POST('/api/auth/nonce', {
				body: payload
			});
		},
		async login(payload: PayloadLogin) {
			return authFetchClient.POST('/api/auth/login', {
				body: payload
			});
		},

		schemaGenerateNonce,
		schemaLogin
	}
}