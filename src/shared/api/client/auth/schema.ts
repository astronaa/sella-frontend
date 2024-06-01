import { z } from "zod";

export const schemaGenerateNonce = z.object({
	address: z.string()
})

export type PayloadGenerateNonce = z.infer<typeof schemaGenerateNonce>;

export const schemaEmail = z
	.string({ required_error: 'Email is required' })
	.email()

export type PayloadEmail = z.infer<typeof schemaEmail>

export const schemaLogin = z.object({
	address: z.string(),
	signature: z.string()
})

export type PayloadLogin = z.infer<typeof schemaLogin>;

export const schemaVerifyEmailCode = z.object({
	email: schemaEmail,
	code: z.string()
})

export type PayloadVerifyEmailCode = z.infer<typeof schemaVerifyEmailCode>;

export const schemaUsername = z
	.string({ required_error: 'Name is required' })
	.min(3, 'Min length is 3')

export type PayloadUsername = z.infer<typeof schemaUsername>