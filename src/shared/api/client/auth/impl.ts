import {
	PayloadEmail,
	PayloadGenerateNonce,
	PayloadLogin,
	PayloadUsername,
	PayloadVerifyEmailCode,
	schemaEmail,
	schemaGenerateNonce,
	schemaLogin,
	schemaUsername,
	schemaVerifyEmailCode
} from "./schema";

import { authFetchClient } from "../fetch-client";
import { API_BASE_URL } from "~/shared/config/api-base-url";

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

			return new URL(
				`api/twitter/auth?successUrl=${encodedRedirectUrl}&failureUrl=${encodedRedirectUrl}`,
				API_BASE_URL
			)
		},
		telegramCallback(data: unknown) {
			return authFetchClient.GET('/api/auth/telegram', {
				params: {
					// @ts-expect-error params for the callback not listed on the swagger
					query: data
				},
				redirect: 'manual'
			});
		},
		setUsername(username: PayloadUsername) {
			return authFetchClient.PATCH('/api/auth/username', {
				body: { username },
			})
		},
		async sendEmailCode(email: PayloadEmail) {
			return authFetchClient.POST('/api/auth/email/send-code', {
				body: { email },
			})
		},
		async verifyEmailCode(payload: PayloadVerifyEmailCode) {
			return authFetchClient.POST('/api/auth/email/verify-code', {
				body: payload,
			})
		},

		schemaGenerateNonce,
		schemaLogin,
		schemaUsername,
		schemaEmail,
		schemaVerifyEmailCode
	}
}
