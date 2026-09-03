import prettierConfig from "prettier-config-nick2bad4u";

/** @type {import("prettier").Config} */
const localConfig = {
    ...prettierConfig,
    overrides: [
        ...(prettierConfig.overrides ?? []),
        {
            files: [
                "**/*.ps1",
                "**/*.psd1",
                "**/*.psm1",
            ],
            options: {
                // Match .gitattributes so a clean Windows checkout remains
                // formatted after Git restores PowerShell files as CRLF.
                endOfLine: "crlf",
            },
        },
    ],
};

export default localConfig;
