export type TransactionStatus = "Unpaid" | "Hold" | "Claimed" | "Refunded" | "Dispute" | "Resolved" | "Released";
export type TransactionFulfillmentStatus = "Dispute" | "Pending" | "Processing" | "Fulfilled" | "Failed" | "Canceled";

export type ImageEntry = string;

export const blockchainTypes = [
	"ETH", "TRX", "MATIC", "SEPOLIA", "Nile"
] as const;

export type BlockchainTypes = typeof blockchainTypes[number];

export interface PaymentMethod {
	name: string;
	value: BlockchainTypes;
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

export interface Transaction {
	status: TransactionStatus;
	fulfillmentStatus: TransactionFulfillmentStatus;
	totalPaid: number;
	transactionUrl: string;
	createdAt: string;
	tokenAmount: number;
	block: BlockchainTypes,
	token: string
}
