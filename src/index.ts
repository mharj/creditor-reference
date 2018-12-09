import {buildFiReferenceCheckSum} from './finnish';
import {buildIsoReferenceCheckSum} from './iso11649';

const rfReg = new RegExp(/^RF(\d\d)/i);

export enum RefType {
	ISO = 'ISO',
	FI = 'FI',
}

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
 * @param type code type
 * @param options
 */
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

/**
 *
 * @param code reference code
 * @return is code valid or not
 */
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

/**
 * Gets code type with prefix check and verifying
 * @param code reference code
 * @return code type
 */
export const type = (code: string): RefType => {
	const preCode = code.replace(/\s/g, '');
	if ( preCode.match(rfReg) && buildIsoReference(preCode.slice(4)) == preCode) {
		return RefType.ISO;

	} else if ( buildFiReference(preCode.slice(0, preCode.length - 1)) == preCode ) {
		return RefType.FI;
	}
	throw new Error('no type found');
};
