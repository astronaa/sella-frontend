export function objToSearchParams(obj: Record<string, unknown>) {
	return new URLSearchParams(Object.entries(obj).filter(([, v]) => !!v).map(([k, v]) => [k, String(v)]));
}

export function extractSearchParamsFromUrl(url: string) {
	return Object.fromEntries(new URL(url).searchParams.entries())
}