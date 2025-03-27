import {describe, expect, it} from 'vitest';
import {build, type, verify} from '../src';
import {buildFiReferenceCheckSum} from '../src/finnish';
import {buildIsoReferenceCheckSum} from '../src/iso11649';

describe('reference codes', () => {
	describe('buildFiReferenceCheckSum', () => {
		it('should return correct checksum', () => {
			expect(buildFiReferenceCheckSum('9008522001013101182'.split('').map((v) => parseInt(v, 10)))).to.be.eq(8);
		});
	});
	describe('buildIsoReferenceCheckSum', () => {
		it('return correct iso checksum', () => {
			expect(buildIsoReferenceCheckSum('1234512345'.split(''))).to.be.eq(45);
		});
	});
	describe('verify()', () => {
		it('should verify ref codes', () => {
			expect(verify('RF39111112222233333444445')).to.be.eq(true);
			expect(verify('99999888887777766668')).to.be.eq(true);
			expect(verify.bind(null, 'ASDASDASD')).to.throw(TypeError, 'Unknown Ref Type');
			expect(verify.bind(null, 'RF00')).to.throw(Error, 'no data to build Iso Reference');
		});
	});
	describe('build()', () => {
		it('should build ref codes', () => {
			expect(build('99999 88888 77777 6666', 'FI')).to.be.eq('99999888887777766668');
			expect(build('11111 22222 33333 44444 5', 'ISO')).to.be.eq('RF39111112222233333444445');
			expect(build('00000 00008', 'ISO')).to.be.eq('RF798'); // should trim leading zeroes
			expect(build('s0MeTe5T', 'ISO')).to.be.eq('RF32S0METE5T');
			expect(build('539007547034', 'ISO', {leadingZeroes: true}))
				.to.be.eq('RF18000000000539007547034')
				.and.length(25); // header + 21
			expect(build('8', 'FI', {leadingZeroes: true}))
				.to.be.eq('00000000000000000084')
				.and.length(20); // 19 + check
			expect(build.bind(null, '8', 'SV' as any, {leadingZeroes: true})).to.throw(TypeError, 'Unknown Ref Type');
		});
		it('should not build ref codes', () => {
			expect(build.bind(null, '90085220010131011828', 'FI')).to.throw('data too large');
			expect(build.bind(null, '900852200101310118281323123', 'ISO')).to.throw('data too large');
		});
	});
	describe('type()', () => {
		it('should return type', () => {
			expect(type('RF32S0METE5T')).to.be.eq('ISO');
			expect(type('84')).to.be.eq('FI');
		});
		it('should not return type', () => {
			expect(type.bind(null, 'RF00S0METE5T')).to.throw(TypeError, 'Unknown Ref Type');
			expect(type.bind(null, '89')).to.throw(TypeError, 'Unknown Ref Type');
		});
	});
});
