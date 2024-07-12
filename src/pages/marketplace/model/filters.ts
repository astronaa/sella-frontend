import { z } from "zod";
import { apiClient } from "~/shared/api/client";
import { useSearchParams } from "~/shared/lib/search-params";
import { useControllableState } from "~/shared/lib/use-controllable-state";

const schema = apiClient.stores.schemaGetForExplore;

type ValueType = z.infer<typeof schema>;

export function useFilters() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [filters, setFilters] = useControllableState<ValueType>({
		defaultValue: {
			query: searchParams.query || '',
			tagNames: searchParams.tagNames ? [searchParams.tagNames] : undefined
		},
		onChange: (value) => {
			setSearchParams(value)
		}
	});
	 
	return {
		filters,
		setFilters,
	}
}