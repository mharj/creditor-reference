const multi = [7, 3, 1];

function pad(value: number): number {
	return Math.ceil(value / 10) * 10 - value;
}

export function buildFiReferenceCheckSum(data: number[]): number {
	if (data.length > 19) {
		throw new Error('data too large');
	}
	return pad(
		data
			.reverse()
			.map((value, idx) => multi[idx % 3] * value)
			.reduce((prev, curr) => prev + curr)
	);
}
