interface Params {
	separator?: string,
	frontCharsNumber?: number,
	backCharsNumber?: number,
}

export function truncateStrFromMiddle(
	str: string, maxLength = 10,
	{ separator = '...', frontCharsNumber = 5, backCharsNumber = 5 }: Params = {}
) {
	if (str.length <= maxLength) return str;

	return (
		str.substring(0, frontCharsNumber) +
		separator +
		str.substring(str.length - backCharsNumber)
	);
}

export function isAddressString(str: unknown): str is `0x${string}` {
	return typeof str == 'string' && str.startsWith('0x');
}