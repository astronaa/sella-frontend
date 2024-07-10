import { PaginationPageChangeDetails } from "@ark-ui/react";
import { useSearchParams } from "~/shared/lib/search-params";

export function usePagination() {
	const [searchParams, setSearchParams] = useSearchParams();

	return {
		page: Number(searchParams.page ?? '1'),
		onPageChange: (details: PaginationPageChangeDetails) => {
			setSearchParams({ page: details.page })
		}
	}
}