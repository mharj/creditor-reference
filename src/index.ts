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

/**
 * Builds a Finnish reference code.
 * @param {string} code - The base reference code.
 * @param {IOptions} [options] - Optional settings for building the reference code.
 * @param {boolean} [options.leadingZeroes] - If true, the output code will be zero-padded to 19 digits.
 * @returns {string} The complete Finnish reference code including the check sum.
 * @since v0.0.1
 */
function buildFiReference(code: string, options?: IOptions): string {
	const values = code.split('').map((v) => parseInt(v, 10));
	let outCode = code;
	if (options && 'leadingZeroes' in options) {
		outCode = ('0000000000000000000' + code).slice(-19);
	}
	return outCode + buildFiReferenceCheckSum(values);
}

/**
 * Builds an ISO 11649 reference code.
 * @param {string} code - The base reference code.
 * @param {IOptions} [options] - Optional settings for building the reference code.
 * @param {boolean} [options.leadingZeroes] - If true, the output code will be zero-padded to 21 digits.
 * @returns {string} The complete ISO 11649 reference code including the check sum.
 * @throws {Error} if no data to build Iso Reference
 * @since v0.0.1
 */
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
 * @param {string} code base reference code
 * @param {RefType} refType code type 'ISO' or 'FI'
 * @param {IOptions} [options] - Optional settings for building the reference code.
 * @param {boolean} [options.leadingZeroes] - If true, the output code will be zero-padded
 * @returns {string} reference code
 * @throws {TypeError} if refType is unknown
 * @since v0.0.1
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

/**
 * Removes all whitespace characters from the input code string.
 * @param {string} code - The reference code to be filtered.
 * @returns {string} The code string without any whitespace characters.
 */
function filterCode(code: string): string {
	return code.replace(/\s/g, '');
}

/**
 * Verifies reference code
 * @param {string} code reference code
 * @returns {boolean} is code valid or not
 * @since v0.0.1
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
 * @param {string} code reference code
 * @returns {RefType} code type
 * @throws {TypeError} if refType is unknown
 * @since v0.0.2
 */
export function type(code: string): RefType {
	const preCode = filterCode(code);
	if (rfReg.exec(preCode) && buildIsoReference(preCode.slice(4)) === preCode) {
		return 'ISO';
	} else if (buildFiReference(preCode.slice(0, preCode.length - 1)) === preCode) {
		return 'FI';
	}
	throw new TypeError('Unknown Ref Type');
}
