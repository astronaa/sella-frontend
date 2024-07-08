import { z } from "zod";

export const schemaCreate = z.object({
	productId: z.string(),
	paymentType: z.string()
});

export type PayloadCreate = z.infer<typeof schemaCreate>