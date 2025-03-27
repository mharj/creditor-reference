const multi = [7, 3, 1];

/**
 * Pad number
 * @param {number} value - Number
 * @returns {number} Padded number
 */
function pad(value: number): number {
	return Math.ceil(value / 10) * 10 - value;
}

/**
 * Build Finnish reference check sum
 * @param {number[]} data - Array of numbers
 * @returns {number} Check sum number
 * @throws {Error} data too large
 * @since v0.0.1
 */
export function buildFiReferenceCheckSum(data: number[]): number {
	if (data.length > 19) {
		throw new Error('data too large');
	}
	const reverseData = [...data].reverse();
	return pad(reverseData.map((value, idx) => multi[idx % 3] * value).reduce((prev, curr) => prev + curr, 0));
}
