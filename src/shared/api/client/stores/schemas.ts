import { z } from "zod";

export const schemaCreate = z.object({
	name: z.string().min(3, 'Min length is 3'),
	shortName: z.string().min(3, 'Min length is 3'),
	description: z.string().optional()
})

export type PayloadCreate = z.infer<typeof schemaCreate>;

export const schemaUpdate = schemaCreate.partial();

export type PayloadUpdate = z.infer<typeof schemaUpdate>;

export const ANOTHER_REASON_ID = 'SomethingElse';

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