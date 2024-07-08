import { z } from "zod";
import { schemaPaymentToken } from "../shared/schemas";

export const schemaCreate = z.object({
	productId: z.string(),
}).merge(schemaPaymentToken);

export type PayloadCreate = z.infer<typeof schemaCreate>