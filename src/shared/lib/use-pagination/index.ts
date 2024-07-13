import { PaginationPageChangeDetails } from "@ark-ui/react";
import { useSearchParams } from "~/shared/lib/search-params";

export function usePagination(defaultPage: number) {
	const [searchParams, setSearchParams] = useSearchParams();

	return {
		page: Number(searchParams.page ?? defaultPage.toString()),
		onPageChange: (details: PaginationPageChangeDetails) => {
			setSearchParams({ ...searchParams, page: details.page })
		}
	}
}