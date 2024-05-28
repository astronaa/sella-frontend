import { z } from "zod";

export const schema = z.object({
	userName: z.string().min(3, 'Min length is 3'),
	avatar: z.instanceof(File).refine((v) => {
		v.size//todo
	})
});

export type SchemaType = z.infer<typeof schema>
