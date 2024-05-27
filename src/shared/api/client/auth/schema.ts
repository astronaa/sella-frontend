import { z } from "zod";

export const schemaGenerateNonce = z.object({
	address: z.string()
})

export type PayloadGenerateNonce = z.infer<typeof schemaGenerateNonce>;

export const schemaLogin = z.object({
	address: z.string(),
	signature: z.string()
})

export type PayloadLogin = z.infer<typeof schemaLogin>;