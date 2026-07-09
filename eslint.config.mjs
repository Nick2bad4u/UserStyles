import nick2bad4u from "eslint-config-nick2bad4u";
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
    ...nick2bad4u.configs.all,
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
                violentmonkey: "*",
                tampermonkey: "*",
                greasemonkey: "*",
            },
        },
    },
];

export default config;
