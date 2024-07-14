import { Order, isTronBlock } from "~/shared/api/client";
import { useCreateEscrowState } from './state';
import { useCreateEscrowEth } from './eth';
import { useCreateEscrowTron } from './tron';
import { useMutation } from "@tanstack/react-query";
import { usePaymentMethods } from "../payment-methods";

export function useCreateEscrowAction(order: Order) {
	const { prepare: prepareCreateEscrowEth } = useCreateEscrowEth({ order });
	const { prepare: prepareCreateEscrowTron } = useCreateEscrowTron(order);
	const { state, setState, stateRef, reset } = useCreateEscrowState(order.id);
	const { 
		getOrThrow: getPaymentMethodsOrThrow,
		loading: paymentMethodsLoading
	} = usePaymentMethods(order);

	const execute = async () => {
		if (!getPaymentMethodsOrThrow)
			return;

		const { chain, token } = getPaymentMethodsOrThrow();
		const prepare = isTronBlock(order.transaction.block) ? prepareCreateEscrowTron : prepareCreateEscrowEth;

		if (state.status == 'error') {
			if (state.approveTransactionId)
				setState(s => ({ ...s, status: 'escrow-write' }));
			else
				reset();
		}

		const isNativeCoin = Number(token.address) === 0;
		const methods = await prepare({ chain, token, isNativeCoin });

		do {
			const state = stateRef.current;

			switch (state.status) {
				case 'idle':
					if (isNativeCoin) {
						setState(s => ({ ...s, status: 'escrow-write' }));
						break;
					}
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

	if (paymentMethodsLoading) {
		return {
			status: 'loading',
			execute: undefined,
			continue: undefined,
			errorMessage: state.errorMessage
		} as const;
	}

	if (state.status == 'done') {
		return {
			status: state.status,
			execute: undefined,
			continue: undefined,
			errorMessage: state.errorMessage
		} as const;
	}

	if (state.status != 'idle') {
		return {
			status: state.status,
			execute: undefined,
			continue: actionFn,
			errorMessage: state.errorMessage
		} as const;
	}

	return {
		status: state.status,
		execute: actionFn,
		continue: undefined,
		errorMessage: state.errorMessage
	} as const;
}