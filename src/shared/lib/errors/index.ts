export class FormError {
	errorMap: Record<string, string | undefined>;

	constructor(errorMap: Record<string, string | undefined>) {
		this.errorMap = errorMap;
	}
}