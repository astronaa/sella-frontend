import { paymentMethodsQueries } from "~/entities/payment-methods";
import { Order, PayloadPaymentToken } from "~/shared/api/client";
import { useCreateEscrowState } from './state';
import { EscrowError } from '../error';
import { useCreateEscrowEth } from './eth';
import { useCreateEscrowTron } from './tron';
import { useMutation } from "@tanstack/react-query";

type CreateEscrowArgs = PayloadPaymentToken;

export function useCreateEscrowAction(order: Order) {
	const { prepare: prepareCreateEscrowEth } = useCreateEscrowEth({ order });
	const { prepare: prepareCreateEscrowTron } = useCreateEscrowTron(order);
	const { state, setState, stateRef, reset } = useCreateEscrowState(order.id);
	const { data: paymentMethods } = paymentMethodsQueries.useGetForProduct(order.product.id);

	const execute = async ({ block, token: tokenName }: CreateEscrowArgs) => {
		if (!paymentMethods)
			return;

		const prepare = block == 'TRX' ? prepareCreateEscrowTron : prepareCreateEscrowEth;

		const chain = paymentMethods.find(m => m.value == block);
		if (!chain)
			throw new EscrowError('generic', "cannot find corresponding chain for input block type");

		const token = chain.tokens.find(t => t.name == tokenName);
		if (!token)
			throw new EscrowError('generic', "cannot find corresponding token for input token type");

		if(state.status == 'error')
			reset();

		const methods = await prepare({ chain, token });

		do {
			const state = stateRef.current;

			switch (state.status) {
				case 'idle':
					setState(s => ({ ...s, status: 'approve-write' }));

				case 'approve-write':
					const approveTransactionId = await methods.approve();
					setState(s => ({ ...s, status: 'approve-wait-receipt', approveTransactionId }));

					break;
				case 'approve-wait-receipt':
					if (state.approveTransactionId)
						await methods.waitApproveTransaction(state.approveTransactionId);

					setState(s => ({ ...s, status: 'escrow-write' }));

					break;
				case 'escrow-write':
					const createEscrowTransactionId = await methods.createEscrow();
					setState(s => ({ ...s, status: 'escrow-wait-receipt', createEscrowTransactionId }));

					break;
				case 'escrow-wait-receipt':
					if (state.createEscrowTransactionId)
						await methods.waitApproveTransaction(state.createEscrowTransactionId);

					setState(s => ({ ...s, status: 'done' }));

				default:
					return;
			}
		}
		while (state.status != 'done');
	}

	const { mutateAsync, isPending } = useMutation({
		mutationFn: execute,
		onError: (error) => setState(s => ({
			...s, status: 'error', errorMessage: error.message
		})),
		retry: false
	})

	const actionFn = isPending ? undefined : mutateAsync;

	if (!paymentMethods) {
		return {
			status: 'loading',
			execute: undefined,
			continue: undefined,
		} as const;
	}

	if (state.status == 'done') {
		return {
			status: state.status,
			execute: undefined,
			continue: undefined,
		} as const;
	}

	if (state.status != 'idle') {
		return {
			status: state.status,
			execute: undefined,
			continue: actionFn,
		} as const;
	}

	return {
		status: state.status,
		execute: actionFn,
		continue: undefined,
	} as const;
}