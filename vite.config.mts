/// <reference types="vitest" />

import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		reporters: ['github-actions','minimal'],
		coverage: {
			provider: 'v8',
			include: ['src/**/*.ts'],
			reporter: ['text', 'lcovonly'],
		},
		include: ['**/*.test.ts'],
		typecheck: {
			tsconfig: './tsconfig.test.json',
			include: ['**/*.test-d.ts'],
		},
	},
});
