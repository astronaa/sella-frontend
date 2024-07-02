import { components } from "~/shared/api/openapi";

export type TransactionStatus = components['schemas']['SalesInfoDto']['status'];
export type TransactionFulfillmentStatus = "Pending" | "Processing" | "Fulfilled" | "Dispute" | "Failed" | "Canceled";

export interface Transaction {
	status: TransactionStatus;
	fulfillmentStatus: TransactionFulfillmentStatus;
	totalPaid: number;
	transactionUrl: string;
	createdAt: string;
}

export type ImageEntry = string;

export const paymentMethodTypes = [
	"ETH", "TRX", "MATIC", "USDT", "USDC", "DAI", "SELLA", "SEPOLIA"
] as const;

export type PaymentMethodTypes = typeof paymentMethodTypes[number];

export interface PaymentMethod {
	name: string;
	value: PaymentMethodTypes;
	contractAddress: string;

	tokens: {
		name: string;
		address: string;
	}[]
}
