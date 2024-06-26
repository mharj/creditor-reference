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

function buildFiReference(code: string, options?: IOptions): string {
	const values = code.split('').map((v) => parseInt(v, 10));
	let outCode = code;
	if (options && 'leadingZeroes' in options) {
		outCode = ('0000000000000000000' + code).slice(-19);
	}
	return outCode + buildFiReferenceCheckSum(values);
}

function buildIsoReference(code: string, options?: IOptions): string {
	if (code.length === 0) {
		throw new Error('no data to build Iso Reference');
	}
	const preCode = code.replace(/^0+/, '').toUpperCase();
	let outCode = preCode;
	if (options && 'leadingZeroes' in options) {
		outCode = ('000000000000000000000' + preCode).slice(-21);
	}
	return 'RF' + buildIsoReferenceCheckSum(preCode.split('')) + outCode;
}

/**
 * Builds creditor reference code
 * @param code base reference code
 * @param refType code type 'ISO' or 'FI'
 * @param options
 */
export function build(code: string, refType: RefType, options?: IOptions): string {
	const preCode = filterCode(code);
	switch (refType) {
		case 'FI':
			return buildFiReference(preCode, options);
		case 'ISO':
			return buildIsoReference(preCode, options);
		default:
			throw new TypeError('Unknown Ref Type');
	}
}

function filterCode(code: string): string {
	return code.replace(/\s/g, '');
}

/**
 *
 * @param code reference code
 * @return is code valid or not
 */
export function verify(code: string): boolean {
	const preCode = filterCode(code);
	switch (type(preCode)) {
		case 'ISO':
			return buildIsoReference(preCode.slice(4)) === preCode ? true : false;
		case 'FI':
			return buildFiReference(preCode.slice(0, preCode.length - 1)) === preCode ? true : false;
	}
}

/**
 * Gets code type with prefix check and verifying
 * @param code reference code
 * @return code type
 */
export function type(code: string): RefType {
	const preCode = filterCode(code);
	if (preCode.match(rfReg) && buildIsoReference(preCode.slice(4)) === preCode) {
		return 'ISO';
	} else if (buildFiReference(preCode.slice(0, preCode.length - 1)) === preCode) {
		return 'FI';
	}
	throw new TypeError('Unknown Ref Type');
}
