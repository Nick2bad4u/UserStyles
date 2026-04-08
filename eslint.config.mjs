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
			// Legacy ESLint config file (not source code)
			'.eslintrc.js',
			// Third-party / vendored library files (not authored code)
			'beautify-css-mod.js',
			'beautify.js',
			'css.js',
			'strava-balance/binary.js',
			'strava-balance/buffer-5.6.1/**',
			'strava-balance/Strava-AddBalance.js',
			// Previously ignored
			'SuperchargedLocalDirectoryWebUI.user.js',
			'codemirror.js',
			'SteamDB-Dark-Mode.user.css',
			'WahooFitnessDarkMode.user.css',
			'codemirror.min.js',
			'ESPN-DarkMode.user.css',
			'Skial-CustomTheme.user.css',
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
	// Chrome / WebExtension files
	{
		files: ['YouTubeVolumeControl/**/*.js', 'YouTubeTVVolumeControl/**/*.js'],
		languageOptions: {
			globals: {
				chrome: 'readonly',
			},
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	// Global rule overrides (applied after tseslint to ensure precedence)
	{
		files: ['**/*.{js,mjs,cjs,ts}'],
		rules: {
			// Treat _ prefix as intentionally unused (standard convention)
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
				},
			],
		},
	},
	// CommonJS files — must come after tseslint to properly override its rules
	{
		files: ['**/*.cjs', '**/*.test.cjs'],
		languageOptions: {
			globals: {
				...globals.node,
			},
			sourceType: 'commonjs',
		},
		rules: {
			'@typescript-eslint/no-require-imports': 'off',
		},
	},
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
