export type TransactionStatus = "Unpaid" | "Hold" | "Released" | "Refunded";
export type TransactionFulfillmentStatus = "Pending" | "Processing" | "Fulfilled" | "Dispute" | "Failed" | "Canceled";

export interface Transaction {
	status: TransactionStatus;
	fulfillmentStatus: TransactionFulfillmentStatus;
	totalPaid: number;
	transactionUrl: string;
	createdAt: string;
}

export type ImageEntry = string;