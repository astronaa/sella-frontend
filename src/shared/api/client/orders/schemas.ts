import { z } from "zod";

export const schemaCreate = z.object({
	productId: z.string(),
	paymentMethod: z.string()
});

export type PayloadCreate = z.infer<typeof schemaCreate>