import { z } from "zod";
import { apiClient } from "~/shared/api/client";

export const schema = z.object({
	username: apiClient.auth.schemaUsername,
	avatar: apiClient.users.schemaAvatarFile.optional()
});

export type SchemaType = z.infer<typeof schema>
