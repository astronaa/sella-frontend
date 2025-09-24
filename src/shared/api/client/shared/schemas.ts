import { z } from "zod";
import { formatFileSize } from "~/shared/lib/format-file-size";
import { blockchainTypes } from "./models";

// Browser-safe File validation
const createFileSchema = (maxSize = Infinity) => {
	const fileSchema = typeof File !== 'undefined'
		? z.instanceof(File)
		: z.any().refine(val => val && typeof val.name === 'string' && typeof val.size === 'number', {
			message: "Expected a File object"
		});

	return fileSchema
		.refine((v) => v.size <= maxSize, {
			message: `The file size should not exceed ${formatFileSize(maxSize)}`
		})
		.nullable();
};

export const schemaFile = (maxSize = Infinity) => createFileSchema(maxSize);

// Export browser-safe File schema for reuse
export const browserSafeFileSchema = typeof File !== 'undefined'
	? z.instanceof(File)
	: z.any().refine(val => val && typeof val.name === 'string' && typeof val.size === 'number', {
		message: "Expected a File object"
	});

export const schemaPaginationPayload = z.object({
	page: z.coerce.number(),
	limit: z.coerce.number()
})

export type PayloadPagination = z.infer<typeof schemaPaginationPayload>;

export const schemaCursorPaginationPayload = z.object({
	offset: z.coerce.number().optional(),
	limit: z.coerce.number()
})

export type PayloadCursorPagination = z.infer<typeof schemaCursorPaginationPayload>;

export const schemaPaymentMethods = z.enum(blockchainTypes)

export const schemaPaymentToken = z.object({
	block: schemaPaymentMethods,
	token: z.string()
})

export type PayloadPaymentToken = z.infer<typeof schemaPaymentToken>;

export const ANOTHER_REASON_ID = 'SomethingElse' as const;

export const reportReasons = [
	"Spam",
	"Nudity",
	"Scam",
	"Illegal",
	"Violence",
	"HateSpeech",
	ANOTHER_REASON_ID
] as const;

export const schemaReport = z.object({
	description: z.string().optional(),
	reasons: z.array(z.enum(reportReasons)).nonempty({ message: 'Reason required' })
}).superRefine(({ description, reasons }, ctx) => {
	if (reasons.includes(ANOTHER_REASON_ID) && !description) {
		return ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Description required',
			path: ['description'],
		});
	}
});

export type PayloadReport = z.infer<typeof schemaReport>
