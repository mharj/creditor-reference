import {buildFiReferenceCheckSum} from './finnish';
import {buildIsoReferenceCheckSum} from './iso11649';

const rfReg = new RegExp(/^RF(\d\d)/i);

export enum RefType {
	ISO = 'ISO',
	FI = 'FI',
}

interface IOptions {
	leadingZeroes?: boolean;
}

const buildFiReference = (code: string, options?: IOptions) => {
	const values = code.split('').map((v) => parseInt(v, 10));
	let outCode = code;
	if (options && 'leadingZeroes' in options) {
		outCode = ('0000000000000000000' + code).slice(-19);
	}
	return outCode + buildFiReferenceCheckSum(values);
};

const buildIsoReference = (code: string, options?: IOptions) => {
	const preCode = code.replace(/^0+/, '').toUpperCase();
	let outCode = preCode;
	if (options && 'leadingZeroes' in options) {
		outCode = ('000000000000000000000' + preCode).slice(-21);
	}
	return 'RF' + buildIsoReferenceCheckSum(preCode.split('')) + outCode;
};

export const build = (code: string, type: RefType, options?: IOptions): string => {
	const preCode = code.replace(/\s/g, '');
	switch (type) {
		case RefType.FI:
			return buildFiReference(preCode, options);
		case RefType.ISO:
			return buildIsoReference(preCode, options);
		default:
			throw new Error('Unknown Ref Type');
	}
};

export const verify = (code: string): boolean => {
	const preCode = code.replace(/\s/g, '');
	if (preCode.match(rfReg)) {
		if (buildIsoReference(preCode.slice(4)) == preCode) {
			return true;
		}
	} else {
		if (buildFiReference(preCode.slice(0, preCode.length - 1)) == preCode) {
			return true;
		}
	}
	return false;
};
