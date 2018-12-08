const textReg = new RegExp(/^[A-Z]$/);

export const buildIsoReferenceCheckSum = (data: string[]) => {
	if (data.length > 21) {
		throw new Error('data too large');
	}
	let preData = data.concat(['R', 'F', '0', '0']);
	const values = preData.map((v) => (v.match(textReg) ? v.charCodeAt(0) - 55 : parseInt(v, 10)));
	const parts = values.join('').match(/.{1,7}/g);
	if (!parts) {
		throw new Error('no parts to calculate');
	}
	return 98 - parseInt(parts.reduce((prev, curr) => '' + (parseInt(prev + curr, 10) % 97), ''), 10);
};