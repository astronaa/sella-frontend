import { z } from "zod";

export const schemaPaginationPayload = z.object({
	page: z.coerce.number(),
	limit: z.coerce.number()
})

export type PayloadPagination = z.infer<typeof schemaPaginationPayload>;

export const mapPaginationPayloadToDto = (obj: PayloadPagination) => ({
	page: obj.page,
	pageSize: obj.limit
});