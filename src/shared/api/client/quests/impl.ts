import { authFetchClient } from "../fetch-client";
import { mapDtoToQuest } from "./mappers";
import { QuestId } from "./model";

export function createQuestsClient() {
  return {
    async getAll() {
      const { data, error } = await authFetchClient.GET("/api/quests");

      return data
        ? {
            data: data.data.map(mapDtoToQuest),
            error,
          }
        : {
            data,
            error,
          };
    },

    for: (questId: QuestId) => ({
      async complete() {
        return await authFetchClient.POST("/api/quests/{id}/complete", {
          params: { path: { id: questId } },
        });
      },
    }),
  };
}
