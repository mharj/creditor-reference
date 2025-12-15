/// <reference types="vitest" />

import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		reporters: process.env.GITHUB_ACTIONS ? ['github-actions'] : ['verbose', 'github-actions'],
		outputFile: {
			junit: './test-results.xml',
		},
		coverage: {
			provider: 'v8',
			include: ['src/**/*.ts'],
			reporter: ['text'],
		},
		include: ['**/*.test.ts'],
		typecheck: {
			tsconfig: './tsconfig.test.json',
			include: ['**/*.test-d.ts'],
		},
	},
});
