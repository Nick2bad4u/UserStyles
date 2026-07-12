import { createConfig } from "eslint-config-nick2bad4u";
import userscripts from "eslint-plugin-userscripts";

/** @type {import("eslint").Linter.Config[]} */
const config = [
    {
        ignores: [
            ".codex/skills/**",
            "**/*.html",
            "**/*.htm",
        ],
    },
    ...createConfig({
        allowDefaultProjectFilePatterns: [],
        tsconfigPaths: ["./tsconfig.json"],
    }),
    {
        files: ["**/*.user.css"],
        rules: {
            "css/no-important": "off",
        },
    },
    {
        files: ["*.user.js"],
        ignores: ["**/*.html"],
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
                greasemonkey: "*",
                tampermonkey: "*",
                violentmonkey: "*",
            },
        },
    },
];

export default config;
