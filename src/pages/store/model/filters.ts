import { z } from "zod";
import { apiClient } from "~/shared/api/client";
import { useSearchParams } from "~/shared/lib/search-params";
import { UseControllableStateProps, useControllableState } from "~/shared/lib/use-controllable-state";

const schema = apiClient.stores.schemaGetProducts;

type ValueType = z.infer<typeof schema>;
export type UseFiltersStateArgs = UseControllableStateProps<ValueType>

export function useFiltersState(props: UseFiltersStateArgs) {
	const [state, setState] = useControllableState(props);
	const hasFilters = state.minPrice !== undefined
		|| state.maxPrice !== undefined
		|| state.query?.length
		|| (state.sort !== undefined && state.sort !== 'new');
	 
	return {
		state, 
		setState,
		hasFilters
	}
}	

export function useFiltersStatePersist() {
	const [searchParams, setSearchParams] = useSearchParams();

	return {
		value: schema.parse(searchParams),
		persist: (value: ValueType) => {
			setSearchParams(value)
		}
	}
}