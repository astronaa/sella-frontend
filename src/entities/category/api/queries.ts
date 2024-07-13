import { useQuery } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";

export function useGetAll() {
	return useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const { data, error } = await apiClient.categories.getAll();

			if(error)
				throw error

			return data;
		},
		staleTime: Infinity
	})
}