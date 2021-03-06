import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import sourcemaps from 'rollup-plugin-sourcemaps';
import pkg from './package.json';
import {terser} from 'rollup-plugin-terser';
export default {
	input: 'src/index.ts', // our source file
	output: [
		{
			file: pkg.module,
			format: 'es', // the preferred format
			sourcemap: true,
			sourcemapPathTransform: (relativePath) => {
				return path.relative('../../src', relativePath);
			},
		},
		{
			file: pkg.unpkg,
			format: 'umd',
			name: 'CreditorReference',
			sourcemap: true,
			sourcemapPathTransform: (relativePath) => {
				return path.relative('../../src', relativePath);
			},
		},
	],
	external: [...Object.keys(pkg.dependencies || {})],
	plugins: [
		typescript({
			typescript: require('typescript'),
			tsconfig: 'tsconfig.rollup.json',
			preserveModules: true,
		}),
		sourcemaps(),
		terser(), // minifies generated bundles
	],
};
