export class FormError {
	fields: Record<string, string>;

	constructor(fields: Record<string, string>) {
		this.fields = fields;
	}
}