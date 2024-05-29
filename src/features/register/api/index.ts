import { z } from "zod";

const MAX_AVATAR_FILE_SIZE = 2_000_000

export const schema = z.object({
	userName: z.string().min(3, 'Min length is 3'),
	avatar: z.instanceof(File)
		.refine((v) => v.size <= MAX_AVATAR_FILE_SIZE, {
			message: 'Еhe file size should not exceed 2mb'
		})
});

export type SchemaType = z.infer<typeof schema>
