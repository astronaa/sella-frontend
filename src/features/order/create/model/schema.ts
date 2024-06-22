import { z } from "zod";
import { apiClient } from "~/shared/api/client";

export const schema = z.object({
	block: apiClient.orders.schemaPaymentMethod,
	token: z.string()
})

export type ValueType = z.infer<typeof schema>