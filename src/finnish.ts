const multi = [7, 3, 1];

const pad = (value: number) => {
	return Math.ceil(value / 10) * 10 - value;
};

export const buildFiReferenceCheckSum = (data: number[]) => {
	if (data.length > 19) {
		throw new Error('data too large');
	}
	return pad(
		data
			.reverse()
			.map((value, idx) => multi[idx % 3] * value)
			.reduce((prev, curr) => prev + curr),
	);
};
