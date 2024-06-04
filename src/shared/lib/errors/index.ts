export class FormError {
	field: string | undefined;
	message: string;

	constructor({ field, message }: { field?: string; message: string | string[]; }) {
		this.field = field;
		this.message = Array.isArray(message) ? message[0] : message;
	}
}