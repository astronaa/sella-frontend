import { useQuery } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";

export function useGetAll() {
	return useQuery({
		queryKey: ['categories'],
		queryFn: apiClient.categories.getAll,
		staleTime: Infinity
	})
}