'use client';

import { OrderId } from "~/shared/api/client";
import { useLocalStorage } from 'usehooks-ts';
import { useRef } from "react";

export interface EscrowState {
	status: 'idle' | 'approve-write' | 'approve-wait-receipt' | 'escrow-write' | 'escrow-wait-receipt' | 'error' | 'done';
	approveTransactionId: string | null;
	createEscrowTransactionId: string | null;
	errorMessage: string | null;
}

const defaultValue: EscrowState = {
	status: 'idle',
	approveTransactionId: null,
	createEscrowTransactionId: null,
	errorMessage: null
}

export function useCreateEscrowState(orderId: OrderId) {
	const [state, setState, reset] = useLocalStorage<EscrowState>(
		`order-checkout-${orderId}`, defaultValue
	);

	const stateRef = useRef<typeof state>(state);

	return {
		state,
		stateRef,
		setState: (dispatch: EscrowState | ((state: EscrowState) => EscrowState)) => {
			setState(dispatch);
			stateRef.current = dispatch instanceof Function ? dispatch(state) : state;
		},
		reset: () => {
			reset();
			stateRef.current = defaultValue;
		}
	}
}
