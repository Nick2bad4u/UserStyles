// ==UserScript==
// @name         CodeNewRoman Nerd Font Mono for Development Websites
// @namespace    nick2bad4u.github.io
// @version      1.3.1
// @description  Adds configurable code fonts to popular development websites, defaulting to CodeNewRoman Nerd Font Mono with a local-first WOFF2 fallback.
// @author       Nick2bad4u (based on Arylo's Fira Code userscript)
// @license      UnLicense
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @downloadURL  https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/CodeNewRoman-Nerd-Font-Mono-for-Development-Websites.user.js
// @updateURL    https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/CodeNewRoman-Nerd-Font-Mono-for-Development-Websites.user.js
// @source       https://greasyfork.org/scripts/519936
// @icon         https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/assets/codenewroman-nerd-font-mono-icon.png
// @match        https://*.webpack.js.org/*
// @match        https://*.rollupjs.org/*
// @match        https://*.jestjs.io/*
// @match        https://*.turbo.build/*
// @match        https://*.vite.dev/*
// @match        https://*.vitest.dev/*
// @match        https://*.lodash.com/*
// @match        https://*.taro.zone/*
// @match        https://*.ajv.js.org/*
// @match        https://*.yargs.js.org/*
// @match        https://*.tampermonkey.net/*
// @match        https://*.github.io/*
// @match        https://*.github.com/*
// @match        https://*.gitlab.com/*
// @match        https://*.w3schools.com/*
// @match        https://*.typescriptlang.org/*
// @match        https://*.yarnpkg.com/*
// @match        https://*.pnpm.io/*
// @match        https://*.npmjs.com/*
// @match        https://*.nodejs.org/docs/*
// @match        https://*.vuejs.org/api/*
// @match        https://*.vueuse.org/*
// @match        https://*.react.dev/*
// @match        https://*.rxjs.dev/*
// @match        https://*.axios-http.com/*
// @match        https://*.nextjs.org/*
// @match        https://*.nestjs.com/*
// @match        https://*.eslint.org/*
// @match        https://*.mochajs.org/*
// @match        https://*.toml.io/*
// @match        https://*.ls-lint.org/*
// @match        https://*.nodemailer.com/*
// @match        https://*.greasyfork.org/*/code*
// @match        https://*.docker.com/*
// @match        https://*.weixin.qq.com/miniprogram/*
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @noframes
// ==/UserScript==

(function () {
    "use strict";

    const SETTINGS_KEY = "font-settings";
    const STYLE_ID = "codenewroman-nerd-font-mono-for-development-websites";
    const WEBFONT_FAMILY = "CodeNewRoman Nerd Font Mono Web";
    // Version-pinned WOFF2 files from Nick2bad4u/nerd-fonts-woff2.
    const WEBFONT_BASE_URL =
        "https://cdn.jsdelivr.net/gh/Nick2bad4u/nerd-fonts-woff2@v1.0.5/fonts/woff2/CodeNewRoman";
    const DEFAULT_FONT_FAMILY = [
        '"CodeNewRoman Nerd Font Mono"',
        `"${WEBFONT_FAMILY}"`,
        '"CodeNewRoman Nerd Font"',
        '"Code New Roman"',
        "ui-monospace",
        '"Cascadia Mono"',
        '"Cascadia Code"',
        "Consolas",
        "monospace",
    ].join(", ");
    const DEFAULT_SETTINGS = Object.freeze({
        fontFamily: DEFAULT_FONT_FAMILY,
        fontSize: "",
        fontStyle: "",
    });

    const PARENT_SELECTORS = [
        ":not(li) > a",
        ":not(h1):not(h2):not(h3):not(h4):not(h5) >",
    ];
    const CODE_SELECTORS = [
        "code",
        "code *",
        "pre:not(:has(code))",
    ];
    const selectors = CODE_SELECTORS.flatMap((codeSelector) =>
        PARENT_SELECTORS.map(
            (parentSelector) => `${parentSelector} ${codeSelector}`
        )
    );

    const hostname = window.location.hostname;
    if (hostname === "react.dev" || hostname.endsWith(".react.dev")) {
        selectors.push(".sp-code-editor .cm-content");
    }
    if (hostname === "w3schools.com" || hostname.endsWith(".w3schools.com")) {
        selectors.push(".w3-code");
    }
    if (hostname === "github.com" || hostname.endsWith(".github.com")) {
        selectors.push(
            ".react-code-text",
            ".react-line-number",
            ".blob-code",
            ".blob-code-inner",
            ".js-file-line",
            ".diff-text",
            ".diff-text-inner"
        );
    }

    function isValidCssValue(property, value) {
        return (
            typeof value === "string" &&
            value.length > 0 &&
            CSS.supports(property, value)
        );
    }

    function loadSettings() {
        const storedValue = GM_getValue(SETTINGS_KEY, {});
        const storedSettings =
            storedValue &&
            typeof storedValue === "object" &&
            !Array.isArray(storedValue)
                ? storedValue
                : {};

        return {
            fontFamily: isValidCssValue(
                "font-family",
                storedSettings.fontFamily
            )
                ? storedSettings.fontFamily
                : DEFAULT_SETTINGS.fontFamily,
            fontSize:
                storedSettings.fontSize === "" ||
                isValidCssValue("font-size", storedSettings.fontSize)
                    ? storedSettings.fontSize
                    : DEFAULT_SETTINGS.fontSize,
            fontStyle:
                storedSettings.fontStyle === "" ||
                isValidCssValue("font-style", storedSettings.fontStyle)
                    ? storedSettings.fontStyle
                    : DEFAULT_SETTINGS.fontStyle,
        };
    }

    let settings = loadSettings();

    function getStyleElement() {
        const existingStyle = document.getElementById(STYLE_ID);
        if (existingStyle) return existingStyle;

        const style = document.createElement("style");
        style.id = STYLE_ID;
        (document.head || document.documentElement).append(style);
        return style;
    }

    function renderStyles() {
        const optionalDeclarations = [
            settings.fontSize
                ? `font-size: ${settings.fontSize} !important;`
                : "",
            settings.fontStyle
                ? `font-style: ${settings.fontStyle} !important;`
                : "",
        ]
            .filter(Boolean)
            .join("\n            ");
        const style = getStyleElement();
        style.textContent = `
            @font-face {
                font-display: swap;
                font-family: "${WEBFONT_FAMILY}";
                font-style: normal;
                font-weight: 400;
                src: url("${WEBFONT_BASE_URL}/Regular/CodeNewRomanNerdFontMono-Regular.woff2") format("woff2");
            }

            @font-face {
                font-display: swap;
                font-family: "${WEBFONT_FAMILY}";
                font-style: normal;
                font-weight: 700;
                src: url("${WEBFONT_BASE_URL}/Bold/CodeNewRomanNerdFontMono-Bold.woff2") format("woff2");
            }

            @font-face {
                font-display: swap;
                font-family: "${WEBFONT_FAMILY}";
                font-style: italic;
                font-weight: 400;
                src: url("${WEBFONT_BASE_URL}/Italic/CodeNewRomanNerdFontMono-Italic.woff2") format("woff2");
            }

            ${selectors.join(",\n            ")} {
                font-family: ${settings.fontFamily} !important;
                ${optionalDeclarations}
                font-feature-settings: "calt" 1;
                font-variant-ligatures: contextual;
            }
        `;
    }

    function saveSettings(changes) {
        settings = { ...settings, ...changes };
        GM_setValue(SETTINGS_KEY, settings);
        renderStyles();
    }

    function configureCssSetting({
        examples,
        key,
        label,
        property,
        resetValue,
    }) {
        const currentValue =
            settings[key] === resetValue ? "default" : settings[key];
        const input = window.prompt(
            `Enter a CSS ${label} value.\n\nExamples: ${examples}\nEnter "default" to restore the default.`,
            currentValue
        );
        if (input === null) return;

        const value = input.trim();
        if (!value || value.toLowerCase() === "default") {
            saveSettings({ [key]: resetValue });
            return;
        }

        if (!isValidCssValue(property, value)) {
            window.alert(`"${value}" is not a valid CSS ${label} value.`);
            return;
        }

        saveSettings({ [key]: value });
    }

    function registerMenuCommands() {
        GM_registerMenuCommand("Configure code font family…", () => {
            configureCssSetting({
                examples: '"Cascadia Code", monospace or Consolas',
                key: "fontFamily",
                label: "font-family",
                property: "font-family",
                resetValue: DEFAULT_SETTINGS.fontFamily,
            });
        });
        GM_registerMenuCommand("Configure code font size…", () => {
            configureCssSetting({
                examples: "14px, 0.95rem, or 110%",
                key: "fontSize",
                label: "font-size",
                property: "font-size",
                resetValue: DEFAULT_SETTINGS.fontSize,
            });
        });
        GM_registerMenuCommand("Configure code font style…", () => {
            configureCssSetting({
                examples: "normal, italic, or oblique",
                key: "fontStyle",
                label: "font-style",
                property: "font-style",
                resetValue: DEFAULT_SETTINGS.fontStyle,
            });
        });
        GM_registerMenuCommand("Reset all code font settings", () => {
            if (!window.confirm("Reset all code font settings?")) return;
            saveSettings({ ...DEFAULT_SETTINGS });
        });
    }

    renderStyles();
    registerMenuCommands();
})();
