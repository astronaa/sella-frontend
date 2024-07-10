import {usePathname, useRouter, useSearchParams as useNextSearchParams} from "next/navigation";

export function objToSearchParams(obj: Record<string, unknown>) {
	return new URLSearchParams(Object.entries(obj).filter(([, v]) => !!v).map(([k, v]) => [k, String(v)]));
}

export function extractSearchParamsFromUrl(url: string) {
	return Object.fromEntries(new URL(url).searchParams.entries())
}

export function useSearchParams(){
	const nextSearchParams = useNextSearchParams();
	const pathname = usePathname()
	const router = useRouter()

	//merges old params with new params
	function setSearchParams(values: Record<string, unknown>){
		const params = objToSearchParams(values)
		router.replace(`${pathname}?${params.toString()}`, {scroll: false})
	}
	return {
		searchParams:  nextSearchParams ? Object.fromEntries(nextSearchParams.entries()) : {},
		setSearchParams
	}
}