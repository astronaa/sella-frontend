type EscrowCause = 'generic' | 'eth-not-found';

export class EscrowError extends Error {
	cause: EscrowCause;

	constructor(cause: EscrowCause, message: string) {
		super(message);

		this.cause = cause;
		this.name = 'EscrowError';
	}
};