import { useQuery } from "@tanstack/react-query";
import { apiClient } from "~/shared/api/client";
import { staticCategories } from "~/shared/static-data/categories";

export function useGetAll() {
	return useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			try {
				const { data, error } = await apiClient.categories.getAll();

				if (error || !data?.length)
					return staticCategories;

				return data;
			} catch {
				return staticCategories;
			}
		},
		staleTime: Infinity
	})
}
