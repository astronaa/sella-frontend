import { Order } from "~/shared/api/client";
import { paymentMethodsQueries } from "~/entities/payment-methods";
import { EscrowError } from "./error";

export function usePaymentMethods(order: Order) {
	const { data: paymentMethods } = paymentMethodsQueries.useGetForProduct(order.product.id);

	if(!paymentMethods)
		return { loading: true, get: undefined } as const

	return {
		loading: false,
		getOrThrow: () => {
			const { block, token: tokenName } = order.transaction;

			const chain = paymentMethods.find(m => m.value == block);
			if (!chain)
				throw new EscrowError('generic', "cannot find corresponding chain for input block type");
	
			const token = chain.tokens.find(t => t.name == tokenName);
			if (!token)
				throw new EscrowError('generic', "cannot find corresponding token for input token type");

			return { chain, token }
		}
	} as const
}