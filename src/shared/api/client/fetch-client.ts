import { invariant } from '~/shared/lib/asserts';
import { paths } from '../openapi';
import createClient, { ClientOptions } from "openapi-fetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
invariant(BASE_URL, 'NEXT_PUBLIC_API_URL not defined');

export function createFetchClient(options?: ClientOptions) {
	return createClient<paths>({
		baseUrl: BASE_URL,
		...options
	});
}

export const fetchClient = createFetchClient();

export const authFetchClient = createFetchClient({
	async fetch(request) {
		const options = { credentials: 'include' } as const;
		const response = await fetch(request, options);

		if (response.status != 401)
			return response;

		const refresh = await fetchClient.POST('/api/auth/refresh', options)
		if (refresh.response.ok)
			return fetch(request, options);

		return response;
	}
})