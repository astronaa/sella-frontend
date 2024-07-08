export type TransactionStatus = "Dispute" | "Unpaid" | "Hold" | "Claimed" | "Refunded";
export type TransactionFulfillmentStatus = "Dispute" | "Pending" | "Processing" | "Fulfilled" | "Failed" | "Canceled";

export interface Transaction {
	status: TransactionStatus;
	fulfillmentStatus: TransactionFulfillmentStatus;
	totalPaid: number;
	transactionUrl: string;
	createdAt: string;
	tokenAmount: number;
}

export type ImageEntry = string;

export const paymentMethodTypes = [
	"ETH", "TRX", "MATIC", "SEPOLIA"
] as const;

export type PaymentMethodTypes = typeof paymentMethodTypes[number];

export interface PaymentMethod {
	name: string;
	value: PaymentMethodTypes;
	contractAddress: string;
	chainId: number;

	tokens: {
		name: string;
		address: string;
	}[]
}

export interface Rating {
	likes: number
	dislikes: number
	reviewsCount: number
}
