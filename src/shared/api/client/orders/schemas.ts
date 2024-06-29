import { z } from "zod";
import { orderPaymentMethodTypes } from "./model";

export const schemaPaymentMethod = z.enum(orderPaymentMethodTypes)

export const schemaCreate = z.object({
	productId: z.string(),
	paymentMethod: z.string()
});

export type PayloadCreate = z.infer<typeof schemaCreate>