import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";
import { queryClient } from "~/shared/config/query-client";

const QUERY_KEY = 'user'

export const getUserOptions = () =>
	queryOptions({
		queryKey: [QUERY_KEY],
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
	return useQuery(getUserOptions());
}

export function invalidateGetQuery() {
	return queryClient.invalidateQueries(getUserOptions())
}