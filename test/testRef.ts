process.env.NODE_ENV = 'test';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import {verify, build, type, RefType} from '../src';
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
		});
	});
	describe('build()', () => {
		it('should build ref codes', () => {
			expect(build('99999 88888 77777 6666', RefType.FI)).to.be.eq('99999888887777766668');
			expect(build('11111 22222 33333 44444 5', RefType.ISO)).to.be.eq('RF39111112222233333444445');
			expect(build('00000 00008', RefType.ISO)).to.be.eq('RF798'); // should trim leading zeroes
			expect(build('s0MeTe5T', RefType.ISO)).to.be.eq('RF32S0METE5T');
			expect(build('539007547034', RefType.ISO, {leadingZeroes: true}))
				.to.be.eq('RF18000000000539007547034')
				.and.length(25); // header + 21
			expect(build('8', RefType.FI, {leadingZeroes: true}))
				.to.be.eq('00000000000000000084')
				.and.length(20); // 19 + check
		});
		it('should not build ref codes', (done) => {
			try {
				build('90085220010131011828', RefType.FI);
				return done(new Error('should not happen'));
			} catch (err) {}
			try {
				build('900852200101310118281323123', RefType.ISO);
				return done(new Error('should not happen'));
			} catch (err) {}
			done();
		});
	});
	describe('type()', () => {
		it('should return type', () => {
			expect(type('RF32S0METE5T')).to.be.eq(RefType.ISO);
			expect(type('84')).to.be.eq(RefType.FI);
		});
		it('should not return type', (done) => {
			try {
				expect(type('RF00S0METE5T')).to.be.eq(RefType.ISO);
				done(new Error('should not happen'));
			} catch (err) {}
			try {
				expect(type('89')).to.be.eq(RefType.FI);
				done(new Error('should not happen'));
			} catch (err) {}
			done();
		});
	});
});
