const textReg = new RegExp(/^[A-Z]$/);

/**
 * Build ISO reference check sum
 * @param {string[] } data - Array of strings
 * @returns {number} Check sum number
 * @throws {Error} data too large
 * @since v0.0.1
 */
export function buildIsoReferenceCheckSum(data: string[]): number {
	if (data.length > 21) {
		throw new Error('data too large');
	}
	const preData = data.concat(['R', 'F', '0', '0']);
	const values = preData.map((v) => (textReg.exec(v) ? v.charCodeAt(0) - 55 : parseInt(v, 10)));
	const parts = values.join('').match(/.{1,7}/g);
	/* c8 ignore next 3 */
	if (!parts) {
		throw new Error('no parts to calculate');
	}
	return (
		98 -
		parseInt(
			parts.reduce((prev, curr) => `${parseInt(prev + curr, 10) % 97}`, ''),
			10,
		)
	);
}
