import {buildFiReferenceCheckSum} from './finnish';
import {buildIsoReferenceCheckSum} from './iso11649';

const rfReg = new RegExp(/^RF(\d\d)/i);
type RefType = 'ISO' | 'FI';

interface IOptions {
	/**
	 * if true, gives zero padded code
	 */
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

/**
 * Builds creditor reference code
 * @param code base reference code
 * @param refType code type 'ISO' or 'FI'
 * @param options
 */
export const build = (code: string, refType: RefType, options?: IOptions): string => {
	const preCode = code.replace(/\s/g, '');
	switch (refType) {
		case 'FI':
			return buildFiReference(preCode, options);
		case 'ISO':
			return buildIsoReference(preCode, options);
		default:
			throw new TypeError('Unknown Ref Type');
	}
};

/**
 *
 * @param code reference code
 * @return is code valid or not
 */
export const verify = (code: string): boolean => {
	const preCode = code.replace(/\s/g, '');
	if (preCode.match(rfReg)) {
		return buildIsoReference(preCode.slice(4)) === preCode ? true : false;
	} else {
		return buildFiReference(preCode.slice(0, preCode.length - 1)) === preCode ? true : false;
	}
};

/**
 * Gets code type with prefix check and verifying
 * @param code reference code
 * @return code type
 */
export const type = (code: string): RefType => {
	const preCode = code.replace(/\s/g, '');
	if (preCode.match(rfReg) && buildIsoReference(preCode.slice(4)) === preCode) {
		return 'ISO';
	} else if (buildFiReference(preCode.slice(0, preCode.length - 1)) === preCode) {
		return 'FI';
	}
	throw new Error('no type found');
};
