import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter, useSearchParams as useNextSearchParams } from "next/navigation";
import { PaginationPageChangeDetails } from "@ark-ui/react";

export function objToSearchParams(obj: Record<string, unknown>) {
	return new URLSearchParams(Object.entries(obj).filter(([, v]) => !!v).map(([k, v]) => [k, String(v)]));
}

export function extractSearchParamsFromUrl(url: string) {
	return Object.fromEntries(new URL(url).searchParams.entries())
}

export function useSearchParams() {
	const router = useRouter()
	const nextSearchParams = useNextSearchParams();
	
	function setSearchParams(values: Record<string, unknown>, options: NavigateOptions = { scroll: false }) {
		const params = objToSearchParams(values)
		router.replace(`${location.pathname}?${params.toString()}`, options)
	}
	
	return [
		nextSearchParams ? Object.fromEntries(nextSearchParams.entries()) : {},
		setSearchParams
	] as const
}

export function useSearchParamsPagination(defaultPage: number) {
	const [searchParams, setSearchParams] = useSearchParams();

	return {
		page: Number(searchParams.page ?? defaultPage.toString()),
		onPageChange: (details: PaginationPageChangeDetails) => {
			setSearchParams({ ...searchParams, page: details.page })
		}
	}
}