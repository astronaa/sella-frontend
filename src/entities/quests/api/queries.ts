import { useQuery } from "@tanstack/react-query";
import { api } from "~/shared/api";

export function useQuests() {
  return useQuery({
    queryKey: ["quests"],
    queryFn: () => api.quests.getAll(),
  });
}
