import {
	PayloadGenerateNonce, PayloadLogin,
	schemaGenerateNonce, schemaLogin
} from "./schema";

import { authFetchClient } from "../fetch-client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
		getTwitterAuthUrl() {
			const redirectUrl = `${BASE_URL}auth-twitter-result`
			return new URL(`api/twitter/auth?successUrl=${redirectUrl}&failureUrl=${redirectUrl}`, BASE_URL)
		},

		schemaGenerateNonce,
		schemaLogin
	}
}
