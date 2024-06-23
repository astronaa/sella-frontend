export type TransactionStatus = "New" | "Paid" | "Delivered" | "Canceled";
export type TransactionFulfillmentStatus = "Pending" | "Processing" | "Fulfilled" | "Failed";

export interface Transaction {
	status: TransactionStatus;
	fulfillmentStatus: TransactionFulfillmentStatus;
	totalPaid: number;
	transactionUrl: string;
	createdAt: string;
}

export type ImageEntry = string;