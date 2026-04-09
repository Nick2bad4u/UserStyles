// Jest configuration (CommonJS — must be .cjs since package.json has "type": "module")
// @ts-check

'use strict';

/** @type {import('jest').Config} */
const config = {
	// Run tests in a Node environment (pure utility functions, no DOM needed)
	testEnvironment: 'node',

	// Discover test files only inside the __tests__/ directory.
	// This intentionally excludes root-level *.test.cjs files that use
	// Mocha/Chai and are not Jest tests (e.g. KudoAll-Strava-Garmin.user.test.cjs).
	testMatch: ['**/__tests__/**/*.test.cjs'],

	// Collect coverage from the utility modules only (the files tests actually exercise)
	collectCoverageFrom: ['src/utils/**/*.cjs'],

	// Emit multiple reporter formats:
	//   - text: terminal summary
	//   - lcov: LCOV file consumed by Codecov and coverage badges
	//   - html: local browsable report
	//   - json-summary: machine-readable summary
	coverageReporters: ['text', 'lcov', 'html', 'json-summary'],

	// Output directory for coverage artefacts
	coverageDirectory: 'coverage',

	// Enforce minimum thresholds so CI fails on regression
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 90,
			lines: 90,
			statements: 90,
		},
	},

	// Pretty test output
	verbose: true,
};

module.exports = config;
