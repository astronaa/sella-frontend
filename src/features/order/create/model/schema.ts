import { z } from "zod";
import { schemaPaymentMethods } from "~/shared/api/client";

export const schema = z.object({
	block: schemaPaymentMethods,
	token: z.string()
})

export type ValueType = z.infer<typeof schema>