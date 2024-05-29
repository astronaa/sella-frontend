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
			const redirectUrl = new URL('/auth/twitter-callback', window.location.toString());
			const encodedRedirectUrl = encodeURIComponent(redirectUrl.toString());

			return new URL(`api/twitter/auth?successUrl=${encodedRedirectUrl}&failureUrl=${encodedRedirectUrl}`, BASE_URL)
		},
		setUsername(payload: { username: string }) {
			return authFetchClient.PATCH('/api/auth/username', {
				body: payload,
				parseAs: 'text'
			})
		},

		schemaGenerateNonce,
		schemaLogin
	}
}
