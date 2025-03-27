import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import importPlugin from 'eslint-plugin-import';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';
import tsParser from '@typescript-eslint/parser';
import cspellESLintPluginRecommended from '@cspell/eslint-plugin/recommended';
import jsdoc from 'eslint-plugin-jsdoc';

/**
 * install
 * pnpm i -D @eslint/js typescript-eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-import @stylistic/eslint-plugin @stylistic/eslint-plugin-ts eslint-plugin-prettier eslint-plugin-sonarjs @cspell/eslint-plugin
 *
 */

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.recommendedTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	importPlugin.flatConfigs.recommended,
	importPlugin.flatConfigs.typescript,
	sonarjs.configs.recommended,
	cspellESLintPluginRecommended,
	jsdoc.configs['flat/recommended-typescript'],
	prettierRecommended,
	{
		ignores: ['**/dist', '**/node_modules', '**/.github', '**/.nyc_output', '**/vite.config.mts', 'eslint.config.mjs'],
	},
	{
		plugins: {
			'@stylistic/ts': stylisticTs,
		},
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2020,
			sourceType: 'module',
			parserOptions: {
				project: './tsconfig.test.json',
			},
		},
		settings: {
			'import/resolver': {
				typescript: {
					extensions: ['.ts'],
					moduleDirectory: ['node_modules', 'src/'],
				},
			},
		},
		rules: {
			'sort-imports': 'off',
			'import/order': [
				'warn',
				{
					groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
					named: true,
					'newlines-between': 'never',
				},
			],
			'import/no-useless-path-segments': 'warn',
			'import/no-duplicates': 'error',
			curly: 'error',
			camelcase: 'off',
			'@typescript-eslint/no-this-alias': [
				'warn',
				{
					allowedNames: ['self'],
				},
			],
			'sort-keys': [
				'warn',
				'asc',
				{
					caseSensitive: false,
					natural: true,
					minKeys: 10,
				},
			],
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/no-deprecated': 'warn',
			'lines-between-class-members': 'off',
			'@stylistic/ts/lines-between-class-members': [
				'warn',
				'always',
				{
					exceptAfterOverload: true,
					exceptAfterSingleLine: true,
				},
			],
			'@typescript-eslint/consistent-type-imports': ['warn', {prefer: 'type-imports', fixStyle: 'inline-type-imports'}],
			'@typescript-eslint/member-ordering': [
				'warn',
				{
					classes: [
						'public-abstract-field',
						'protected-abstract-field',
						'static-field',
						'static-method',
						'field',
						'constructor',
						'public-method',
						'protected-method',
						'private-method',
						'#private-method',
						'public-abstract-method',
						'protected-abstract-method',
					],
				},
			],
			'@typescript-eslint/naming-convention': [
				'warn',
				{
					selector: ['variable', 'parameter'],
					modifiers: ['destructured'],
					format: null,
				},
				{
					selector: 'variable',
					modifiers: ['const'],
					format: ['camelCase', 'PascalCase'],
					leadingUnderscore: 'allow',
				},
				{
					selector: 'variableLike',
					format: ['camelCase', 'PascalCase'],
					leadingUnderscore: 'allow',
					filter: {
						// you can expand with "|" this regex to add more allowed names
						regex: '^(__DEV__)$',
						match: false,
					},
				},
				{
					selector: 'typeAlias',
					format: ['PascalCase'],
				},
				{
					selector: 'interface',
					prefix: ['I'],
					format: ['PascalCase'],
				},
			],
			'@typescript-eslint/consistent-type-definitions': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-misused-promises': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/explicit-member-accessibility': 'warn',
			'sonarjs/different-types-comparison': 'off',
			'sonarjs/no-ignored-exceptions': 'off',
			'jsdoc/no-types': 'off',
			'jsdoc/require-param-type': 'warn',
			'jsdoc/require-param': 'warn',
			'jsdoc/require-template': 'warn',
			'jsdoc/require-throws': 'warn',
			'jsdoc/require-returns': 'warn',
			'jsdoc/require-returns-type': 'warn',
			'jsdoc/check-values': 'error',
			'jsdoc/check-types': 'error',
			'jsdoc/no-restricted-syntax': [
				'warn',
				{
					contexts: [
						{
							comment: 'JsdocBlock:not(*:has(JsdocTag[tag=since]))',
							context: 'ExportNamedDeclaration',
							message: '@since required on each block',
						},
					],
				},
			],
		},
	},
	{
		files: ['**/*.test.ts'],
		rules: {
			'import/no-named-as-default-member': 'off',
			'jsdoc/require-jsdoc': 'off',
			'sonarjs/no-unused-vars': 'off',
			'@cspell/spellchecker': 'off',
		},
	},
);
