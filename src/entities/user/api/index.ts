import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";
import { queryClient } from "~/shared/config/query-client";

const options = queryOptions({
	queryKey: ['user'],
	queryFn: async () => {
		const { data, error, response } = await apiClient.users.getProfile()

		if(response.status != 200)
			return null;

		if(error)
			throw error;

		return data;
	}
})

export function useGetQuery() {
	return useQuery(options)
}

export function invalidateGetQuery() {
	return queryClient.invalidateQueries(options)
}