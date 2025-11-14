import { default as defaultConfig } from '@epic-web/config/eslint'

/** @type {import("eslint").Linter.Config} */
export default [
	...defaultConfig,
	// add custom config objects here:
	{
		files: ['**/tests/**/*.ts'],
		rules: {
			'react-hooks/rules-of-hooks': 'off',
			'no-unused-vars': ['warn', { argsIgnorePattern: '^app$' }],
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^app$' },
			],
		},
	},
	{
		ignores: ['.react-router/*'],
	},
]
