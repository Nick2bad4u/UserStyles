import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import userscripts from 'eslint-plugin-userscripts';

export default [
	{
		ignores: [
			'**/node_modules/**',
			'**/dist/**',
			'**/build/**',
			'**/*.min.js',
			'**/*.min.cjs',
			'**/*.min.mjs',
		],
	},
	{
		files: ['**/*.{js,mjs,cjs,ts}'],
		languageOptions: {
			ecmaVersion: 'latest',
			globals: {
				...globals.browser,
				...globals.greasemonkey,
				...globals.jquery,
			},
		},
	},
	{
		files: ['**/*.js'],
		languageOptions: { sourceType: 'script' },
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.user.js'],
		plugins: {
			userscripts: {
				rules: userscripts.rules,
			},
		},
		rules: {
			...userscripts.configs.recommended.rules,
		},
		settings: {
			userscriptVersions: {
				greasemonkey: '*',
				tampermonkey: '*',
				violentmonkey: '*',
			},
		},
	},
];
