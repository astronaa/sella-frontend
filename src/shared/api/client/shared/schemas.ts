import { z } from "zod";
import { formatFileSize } from "~/shared/lib/format-file-size";

export const schemaFile = (maxSize = Infinity) => (
	z.instanceof(File)
		.refine((v) => v.size <= maxSize, {
			message: `The file size should not exceed ${formatFileSize(maxSize)}`
		})
		.nullable()
)

export const schemaPaginationPayload = z.object({
	page: z.coerce.number(),
	limit: z.coerce.number()
})

export type PayloadPagination = z.infer<typeof schemaPaginationPayload>;