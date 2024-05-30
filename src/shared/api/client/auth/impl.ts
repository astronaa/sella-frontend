import {
	PayloadEmail,
	PayloadGenerateNonce, PayloadLogin,
	PayloadUsername,
	PayloadVerifyEmailCode,
	schemaEmail,
	schemaGenerateNonce, schemaLogin,
	schemaUsername,
	schemaVerifyEmailCode
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
		setUsername(username: PayloadUsername) {
			return authFetchClient.PATCH('/api/auth/username', {
				body: { username },
				parseAs: 'text'
			})
		},
		async sendEmailCode(email: PayloadEmail) {
			return authFetchClient.POST('/api/auth/email/send-code', {
				body: { email },
				parseAs: 'text'
			})
		},
		async verifyEmailCode(payload: PayloadVerifyEmailCode) {
			return authFetchClient.POST('/api/auth/email/verify-code', {
				body: payload,
				parseAs: 'text'
			})
		},

		schemaGenerateNonce,
		schemaLogin,
		schemaUsername,
		schemaEmail,
		schemaVerifyEmailCode
	}
}
