import { invariant } from '~/shared/lib/asserts';
import { paths } from '../openapi';
import createClient, { ClientOptions } from "openapi-fetch";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
invariant(API_BASE_URL, 'NEXT_PUBLIC_API_URL not defined');

export function createFetchClient(options?: ClientOptions) {
	return createClient<paths>({
		baseUrl: API_BASE_URL,
		...options
	});
}

const fetchClient = createFetchClient();

export const authFetchClient = createFetchClient({
	async fetch(request) {
		const options = { credentials: 'include' } as const;
		const response = await fetch(request, options);

		if (response.status != 401)
			return response;

		const body = await response.clone().json();
		if(!body.isAuthorized)
			return response;

		const refresh = await fetchClient.POST('/api/auth/refresh', options)
		if (refresh.response.ok)
			return fetch(request, options);

		return response;
	}
})