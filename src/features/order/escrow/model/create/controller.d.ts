import { PaymentMethod } from "~/shared/api/client";

export interface CreateEscrowController {
	prepare(api: {
		chain: PaymentMethod;
		token: PaymentMethod['tokens'][number];
	}): Promise<{
		approve(): Promise<string>;
		waitApproveTransaction(approveTransactionId: string): Promise<void>;
		createEscrow(): Promise<string>;
		waitCreateEscrowTransaction(createEscrowTransactionId: string): Promise<void>;
	}>;
}
