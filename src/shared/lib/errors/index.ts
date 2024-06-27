export class FormError {
	field: string | undefined;
	message: string;

	constructor({ field, message }: { field?: string; message: string | string[] | Record<string, string | undefined>; }) {
		this.field = field;

		if(Array.isArray(message))
			this.message = message[0];
		else if(typeof message == 'string')
			this.message = message;
		else 
			this.message = Object.values(message)[0] ?? '';
	}
}