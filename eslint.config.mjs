import eslint from "@eslint/js";
import { createConfig } from "eslint-config-nick2bad4u";
import userscripts from "eslint-plugin-userscripts";
import globals from "globals";

/** @type {import("eslint").Linter.Config[]} */
const sharedConfig = createConfig({
    allowDefaultProjectFilePatterns: [],
    tsconfigPaths: ["./tsconfig.json"],
});

/** @type {import("eslint").Linter.RulesRecord} */
const sharedRules = {};
for (const { rules } of sharedConfig) {
    Object.assign(sharedRules, rules);
}
/** @type {import("eslint").Linter.RulesRecord} */
const disabledSharedRules = Object.fromEntries(
    Object.keys(sharedRules).map((ruleId) => [ruleId, "off"])
);
/** @type {import("eslint").Linter.RulesRecord} */
const retainedUserscriptRules = Object.fromEntries(
    Object.entries(sharedRules).filter(
        ([ruleId]) =>
            ["no-unsanitized/", "security/"].some((prefix) =>
                ruleId.startsWith(prefix)
            ) || ruleId === "@typescript-eslint/no-unused-vars"
    )
);
/** @type {import("eslint").Linter.RulesRecord} */
const disabledRepositoryComplianceRules = Object.fromEntries(
    Object.keys(sharedRules)
        .filter((ruleId) => ruleId.startsWith("repo-compliance/"))
        .map((ruleId) => [ruleId, "off"])
);

/** @type {import("eslint").Linter.Config[]} */
const config = [
    {
        ignores: [
            ".codex/skills/**",
            ".vscode/**",
            "**/*.css",
            "**/*.html",
            "**/*.htm",
            "stylelint-output.json",
            "**/strava-balance/**",
        ],
    },
    ...sharedConfig,
    {
        rules: {
            ...disabledRepositoryComplianceRules,
            "github-actions/action-name-casing": "off",
            "json/sort-keys": "off",
            "perfectionist/sort-modules": "off",
            "perfectionist/sort-objects": "off",
            "regexp/require-unicode-regexp": "off",
            "regexp/require-unicode-sets-regexp": "off",
            "unicorn/prefer-temporal": "off",
            "yml/sort-keys": "off",
        },
    },
    {
        files: ["**/*.cjs"],
        languageOptions: {
            sourceType: "commonjs",
        },
        rules: {
            "@typescript-eslint/no-require-imports": "off",
            "import-x/no-commonjs": "off",
            "import-x/unambiguous": "off",
            "prefer-template": "off",
            "regexp/use-ignore-case": "off",
            strict: "off",
            "unicorn/comment-content": "off",
            "unicorn/prefer-number-properties": "off",
            "unicorn/prefer-module": "off",
            "unicorn/prefer-string-replace-all": "off",
            "unicorn/prefer-ternary": "off",
        },
    },
    {
        files: ["**/*.test.cjs", "**/__tests__/**/*.cjs"],
        languageOptions: {
            globals: {
                ...globals.jest,
                ...globals.node,
            },
            sourceType: "commonjs",
        },
        rules: {
            ...disabledSharedRules,
            ...eslint.configs.recommended.rules,
            "no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
        },
    },
    {
        files: ["SteamCookieExtractor2/**/*.js"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.webextensions,
            },
            sourceType: "script",
        },
        rules: {
            ...disabledSharedRules,
            ...eslint.configs.recommended.rules,
            ...retainedUserscriptRules,
            "no-eval": "error",
            "no-implied-eval": "error",
            "no-new-func": "error",
            "no-script-url": "error",
            "security/detect-non-literal-regexp": "off",
        },
    },
    {
        files: ["SteamCookieExtractor2/manifest.json"],
        rules: {
            // The generic schema is not Chrome's Manifest V3 schema and
            // incorrectly requires the valid `icons` object to be an array.
            "json-schema-validator-2/no-invalid": "off",
        },
    },
    {
        files: ["**/*.user.js"],
        ignores: ["**/*.html"],
        linterOptions: {
            // Legacy userscripts contain inline directives that overlap with
            // the repository's bulk suppression baseline.
            reportUnusedDisableDirectives: "off",
        },
        plugins: {
            userscripts: {
                rules: userscripts.rules,
            },
        },
        rules: {
            // Standalone userscripts are untyped browser programs, often with
            // generated lookup data. Apply correctness and security rules here
            // without the shared preset's application/library style policy.
            ...disabledSharedRules,
            ...eslint.configs.recommended.rules,
            ...retainedUserscriptRules,
            ...userscripts.configs.recommended.rules,
            // Userscript managers and matched pages inject globals at runtime.
            "no-eval": "error",
            "no-implied-eval": "error",
            "no-new-func": "error",
            "no-script-url": "error",
            "no-undef": "off",
            "no-unused-expressions": "off",
            "no-unused-vars": "off",
            // Runtime patterns are common when parsing matched pages. Static
            // unsafe regular expressions remain covered by the security rules.
            "security/detect-non-literal-regexp": "off",
            // Metadata validity matters; column alignment does not.
            "userscripts/align-attributes": "off",
        },
        settings: {
            userscriptVersions: {
                greasemonkey: "*",
                tampermonkey: "*",
                violentmonkey: "*",
            },
        },
    },
];

export default config;
