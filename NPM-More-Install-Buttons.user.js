// ==UserScript==
// @name         NPM - More Install Buttons
// @namespace    nick2bad4u.github.io
// @version      1.4.0
// @description  Adds customizable copyable install commands to npm package pages.
// @author       Nick2bad4u (based on the original script by Kıraç Armağan Önal)
// @license      UnLicense
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @source       https://greasyfork.org/scripts/425544
// @icon         https://www.google.com/s2/favicons?sz=64&domain=npmjs.com
// @match        https://www.npmjs.com/package/*
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// @grant        GM_setValue
// @noframes
// @downloadURL https://update.greasyfork.org/scripts/587470/NPM%20-%20More%20Install%20Buttons.user.js
// @updateURL https://update.greasyfork.org/scripts/587470/NPM%20-%20More%20Install%20Buttons.meta.js
// ==/UserScript==

(function () {
    "use strict";

    const MAIN_INTEGRATION_ATTRIBUTE = "data-npm-enhancer-install-commands";
    if (document.documentElement.hasAttribute(MAIN_INTEGRATION_ATTRIBUTE)) {
        return;
    }

    // Command definitions and defaults. End users can enable or disable these
    // from the userscript-manager menu without editing this source.
    // Available tokens: {{package}}, {{version}}, {{packageSpec}}, and
    // {{typesPackage}}. Commands with requiresTypes only appear when npm links
    // a separate @types package.
    const COMMAND_BUTTONS = [
        {
            id: "npm-dependency",
            label: "NPM dependency",
            manager: "npm",
            icon: "",
            template: "npm install {{packageSpec}}",
            enabled: false, // Disabled by default because the original "Copy install command line" button already provides this command.
        },
        {
            id: "npm-dev-dependency",
            label: "NPM dev dependency",
            manager: "npm",
            icon: "",
            template: "npm i --save-dev {{packageSpec}}",
            enabled: true,
        },
        {
            id: "npm-global-dependency",
            label: "NPM global dependency",
            manager: "npm",
            icon: "",
            template: "npm i -g {{packageSpec}}",
            enabled: false, // Disabled by default because global installs are less common.
        },
        {
            id: "npm-types-dev-dependency",
            label: "NPM @types dev dependency",
            manager: "npm",
            icon: "",
            template: "npm install --save-dev {{typesPackage}}",
            requiresTypes: true,
        },
        {
            id: "yarn-dependency",
            label: "Yarn dependency",
            manager: "yarn",
            icon: "",
            template: "yarn add {{packageSpec}}",
            enabled: true,
        },
        {
            id: "yarn-package-and-types",
            label: "Yarn package and types dependencies",
            manager: "yarn",
            icon: "",
            template:
                "yarn add {{packageSpec}} && yarn add --dev {{typesPackage}}",
            requiresTypes: true,
            enabled: false, // Disabled by default because many users don't use Yarn.
        },
        {
            id: "pnpm-dependency",
            label: "PNPM dependency",
            manager: "pnpm",
            icon: "",
            template: "pnpm add {{packageSpec}}",
            enabled: true,
        },
        {
            id: "bun-dependency",
            label: "Bun dependency",
            manager: "bun",
            icon: "",
            template: "bun add {{packageSpec}}",
            enabled: true,
        },
        {
            id: "deno-dependency",
            label: "Deno dependency",
            manager: "deno",
            icon: "",
            template: "deno add npm:{{packageSpec}}",
            enabled: true,
        },
        {
            id: "vlt-dependency",
            label: "vlt dependency",
            manager: "vlt",
            icon: "",
            template: "vlt install {{packageSpec}}",
            enabled: false, // Disabled by default because vlt is less common.
        },
        {
            id: "aube-dependency",
            label: "Aube dependency",
            manager: "aube",
            icon: "",
            template: "aube add {{packageSpec}}",
            enabled: false, // Disabled by default because Aube is less common.
        },
        {
            id: "nub-dependency",
            label: "Nub dependency",
            manager: "nub",
            icon: "",
            template: "nub add {{packageSpec}}",
            enabled: false, // Disabled by default because Nub is less common.
        },
        {
            id: "cnpm-dependency",
            label: "CNPM dependency",
            manager: "cnpm",
            icon: "",
            template: "cnpm install {{packageSpec}}",
            enabled: false, // Disabled by default because CNPM is less common.
        },
        // {
        //     label: "Yarn development dependency",
        //     template: "yarn add --dev {{packageSpec}}",
        // },
        // {
        //     label: "Yarn Classic global dependency",
        //     template: "yarn global add {{packageSpec}}",
        // },
        // {
        //     label: "Yarn types development dependency",
        //     template: "yarn add --dev {{typesPackage}}",
        //     requiresTypes: true,
        // },
        // {
        //     label: "Yarn package and types dependencies",
        //     template:
        //         "yarn add {{packageSpec}} && yarn add --dev {{typesPackage}}",
        //     requiresTypes: true,
        // },
    ];

    const DISPLAY_OPTION_DEFINITIONS = [
        {
            id: "showInstallHeaderIcon",
            label: "Install heading icon",
            description: "Show the Nerd Font package icon beside Install.",
            enabled: true,
        },
        {
            id: "showListHeading",
            label: "More commands heading",
            description: "Show the command count and quick settings button.",
            enabled: true,
        },
        {
            id: "showCommandIcons",
            label: "Package-manager icons",
            description: "Show the npm, Yarn, pnpm, Bun, and Deno icons.",
            enabled: true,
        },
        {
            id: "showCommandLabels",
            label: "Command labels",
            description: "Show labels such as NPM dev dependency and Yarn.",
            enabled: true,
        },
        {
            id: "useExactVersion",
            label: "Pin the current version",
            description:
                "Include the exact @version in generated commands. Disabled by default so commands install the active release tag.",
            enabled: false,
        },
    ];

    const LIST_ATTRIBUTE = "data-npm-more-install-buttons";
    const STYLE_ID = "npm-more-install-buttons-style";
    const SETTINGS_DIALOG_ID = "npm-more-install-buttons-settings";
    const SETTINGS_KEY = "npmMoreInstallButtonsSettings";
    const SETTINGS_VERSION = 2;
    const COPY_BUTTON_SELECTOR =
        'button[aria-label="Copy install command line"]';

    let renderFrame = 0;
    let settingsRevision = 0;
    let settings = loadSettings();

    function createDefaultSettings() {
        return {
            version: SETTINGS_VERSION,
            commandEnabled: Object.fromEntries(
                COMMAND_BUTTONS.map(({ enabled, id }) => [
                    id,
                    enabled !== false,
                ])
            ),
            display: Object.fromEntries(
                DISPLAY_OPTION_DEFINITIONS.map(({ enabled, id }) => [
                    id,
                    enabled !== false,
                ])
            ),
        };
    }

    function normalizeSettings(value) {
        const defaults = createDefaultSettings();
        if (!value || typeof value !== "object" || Array.isArray(value)) {
            return defaults;
        }

        const savedCommands =
            value.commandEnabled &&
            typeof value.commandEnabled === "object" &&
            !Array.isArray(value.commandEnabled)
                ? value.commandEnabled
                : {};
        const savedDisplay =
            value.display &&
            typeof value.display === "object" &&
            !Array.isArray(value.display)
                ? value.display
                : {};

        for (const { id } of COMMAND_BUTTONS) {
            if (typeof savedCommands[id] === "boolean") {
                defaults.commandEnabled[id] = savedCommands[id];
            }
        }
        for (const { id } of DISPLAY_OPTION_DEFINITIONS) {
            if (typeof savedDisplay[id] === "boolean") {
                defaults.display[id] = savedDisplay[id];
            }
        }

        return defaults;
    }

    function loadSettings() {
        if (typeof GM_getValue !== "function") return createDefaultSettings();

        try {
            return normalizeSettings(GM_getValue(SETTINGS_KEY, null));
        } catch {
            return createDefaultSettings();
        }
    }

    function saveSettings(nextSettings) {
        settings = normalizeSettings(nextSettings);
        settingsRevision += 1;

        if (typeof GM_setValue === "function") {
            try {
                GM_setValue(SETTINGS_KEY, settings);
            } catch {
                // Apply the settings to the current page even if persistence fails.
            }
        }

        const ownedList = document.querySelector(
            `[${LIST_ATTRIBUTE}][data-npm-enhancement-owner="standalone"]`
        );
        ownedList?.remove();
        scheduleRender();
    }

    function addStyles() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = `
            .mib-list {
                display: grid;
                gap: 0.625rem;
                margin: 0.75rem 0 1.5rem;
                min-width: 0;
            }

            .mib-install-heading {
                align-items: center;
                display: flex;
                gap: 0.45rem;
            }

            .mib-list-heading-icon,
            .mib-command-icon,
            .mib-settings-option-icon,
            .mib-settings-title-icon {
                font-family: "Symbols Nerd Font Mono", "Symbols Nerd Font", "CaskaydiaCove Nerd Font", "CaskaydiaMono Nerd Font", "JetBrainsMono Nerd Font", monospace;
                font-style: normal;
                font-variant: normal;
                line-height: 1;
                text-rendering: auto;
            }

            .mib-install-heading::before {
                color: var(--color-fg-brand, #cb3837);
                content: "󰏗";
                font-family: "Symbols Nerd Font Mono", "Symbols Nerd Font", "CaskaydiaCove Nerd Font", "CaskaydiaMono Nerd Font", "JetBrainsMono Nerd Font", monospace;
                font-size: 1.05em;
                font-style: normal;
                font-variant: normal;
                line-height: 1;
                text-rendering: auto;
            }

            .mib-list-heading {
                align-items: center;
                color: var(--color-fg-muted, #666);
                display: flex;
                font-size: 0.72rem;
                font-weight: 700;
                gap: 0.4rem;
                letter-spacing: 0.055em;
                margin: 0 0 0.05rem;
                text-transform: uppercase;
            }

            .mib-list-heading-divider {
                background: linear-gradient(90deg, var(--color-border-default, #d8d8d8), transparent);
                flex: 1 1 auto;
                height: 1px;
                margin-left: 0.15rem;
            }

            .mib-list-heading-icon {
                color: var(--color-fg-brand, #cb3837);
                font-size: 0.95rem;
            }

            .mib-list-heading-count {
                border: 1px solid var(--color-border-default, #d8d8d8);
                border-radius: 999px;
                font-size: 0.62rem;
                letter-spacing: 0;
                padding: 0.1rem 0.35rem;
            }

            .mib-list-settings,
            .mib-list-version-toggle {
                align-items: center;
                background: transparent;
                border: 1px solid transparent;
                border-radius: 5px;
                color: var(--color-fg-muted, #666);
                cursor: pointer;
                display: flex;
                height: 1.75rem;
                justify-content: center;
                padding: 0;
                width: 1.75rem;
            }

            .mib-list-settings:hover,
            .mib-list-settings:focus-visible,
            .mib-list-version-toggle:hover,
            .mib-list-version-toggle:focus-visible,
            .mib-list-version-toggle[aria-pressed="true"] {
                background: color-mix(in srgb, var(--color-fg-brand, #cb3837) 9%, transparent);
                border-color: color-mix(in srgb, var(--color-fg-brand, #cb3837) 32%, transparent);
                color: var(--color-fg-brand, #cb3837);
            }

            .mib-list-version-toggle {
                width: auto;
                min-width: 1.75rem;
                padding: 0 0.4rem;
                font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
                font-size: 0.64rem;
                letter-spacing: 0;
                text-transform: none;
            }

            .mib-gear-icon {
                fill: none;
                height: 14px;
                stroke: currentColor;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 1.5;
                width: 14px;
            }

            .mib-command {
                --mib-accent: var(--color-fg-brand, #cb3837);
                align-items: center;
                background: linear-gradient(105deg, color-mix(in srgb, var(--mib-accent) 7%, transparent), transparent 38%);
                border: 1px solid var(--color-border-default, #dfdfdf);
                border-left: 3px solid var(--mib-accent);
                border-radius: 7px;
                box-shadow: 0 1px 1px rgba(0, 0, 0, 0.035);
                color: var(--color-fg-default, #111);
                cursor: pointer;
                display: grid;
                font-size: 0.875rem;
                gap: 0.625rem;
                grid-template-areas: "icon content status";
                grid-template-columns: 2rem minmax(0, 1fr) 1.75rem;
                min-height: 58px;
                max-width: 100%;
                min-width: 0;
                overflow: hidden;
                padding: 0.5rem 0.625rem;
                position: relative;
                text-align: left;
                transition: border-color 140ms ease, box-shadow 140ms ease, transform 140ms ease;
                width: 100%;
            }

            :is(.mib-command, .mib-settings-option)[data-manager="yarn"] {
                --mib-accent: #2c8ebb;
            }

            :is(.mib-command, .mib-settings-option)[data-manager="pnpm"] {
                --mib-accent: #d88c00;
            }

            :is(.mib-command, .mib-settings-option)[data-manager="bun"] {
                --mib-accent: #9b6c4f;
            }

            :is(.mib-command, .mib-settings-option)[data-manager="deno"] {
                --mib-accent: #5b9279;
            }

            :is(.mib-command, .mib-settings-option)[data-manager="vlt"] {
                --mib-accent: #6f5bd3;
            }

            :is(.mib-command, .mib-settings-option)[data-manager="aube"],
            :is(.mib-command, .mib-settings-option)[data-manager="nub"],
            :is(.mib-command, .mib-settings-option)[data-manager="cnpm"] {
                --mib-accent: #737373;
            }

            .mib-command:hover {
                border-color: color-mix(in srgb, var(--mib-accent) 70%, var(--color-border-default, #999));
                box-shadow: 0 5px 16px color-mix(in srgb, var(--mib-accent) 14%, transparent);
                transform: translateY(-1px);
            }

            .mib-command:focus-visible {
                outline: 2px solid var(--mib-accent);
                outline-offset: 2px;
            }

            .mib-command:active {
                box-shadow: 0 1px 3px color-mix(in srgb, var(--mib-accent) 12%, transparent);
                transform: translateY(0);
            }

            .mib-command-icon {
                align-items: center;
                background: color-mix(in srgb, var(--mib-accent) 13%, transparent);
                border: 1px solid color-mix(in srgb, var(--mib-accent) 25%, transparent);
                border-radius: 6px;
                color: var(--mib-accent);
                display: flex;
                font-size: 1.05rem;
                grid-area: icon;
                height: 2rem;
                justify-content: center;
                width: 2rem;
            }

            .mib-command-content {
                align-self: center;
                display: grid;
                gap: 0.12rem;
                grid-area: content;
                min-width: 0;
            }

            .mib-command-label {
                color: var(--mib-accent);
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                font-size: 0.66rem;
                font-weight: 750;
                letter-spacing: 0.035em;
                line-height: 1.2;
                overflow: hidden;
                text-overflow: ellipsis;
                text-transform: uppercase;
                white-space: nowrap;
            }

            .mib-command code {
                font-family: Consolas, monaco, monospace;
                font-size: 0.82rem;
                line-height: 1.35;
                min-width: 0;
                overflow: hidden;
                padding: 0;
                text-align: left;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .mib-status {
                align-items: center;
                color: #808080;
                display: flex;
                grid-area: status;
                height: 1.75rem;
                justify-content: center;
                padding: 0;
                position: relative;
                transition: color 120ms ease, transform 120ms ease;
                width: 1.75rem;
            }

            .mib-copy-icon {
                fill: none;
                height: 13px;
                overflow: visible;
                stroke: currentColor;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 1.5;
                transition: color 120ms ease, transform 120ms ease;
                width: 13px;
            }

            .mib-status::after {
                display: none;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                font-size: 1rem;
                font-weight: 800;
                line-height: 1;
            }

            .mib-status-text {
                border: 0;
                clip: rect(0 0 0 0);
                clip-path: inset(50%);
                height: 1px;
                margin: -1px;
                overflow: hidden;
                padding: 0;
                position: absolute;
                white-space: nowrap;
                width: 1px;
            }

            .mib-command[data-copy-state="copied"] .mib-status {
                color: var(--color-fg-success, #137752);
            }

            .mib-command[data-copy-state="copied"] .mib-copy-icon {
                display: none;
            }

            .mib-command[data-copy-state="copied"] .mib-status::after {
                content: "✓";
                display: block;
            }

            .mib-command[data-copy-state="failed"] .mib-status {
                color: var(--color-fg-danger, #cb3837);
            }

            .mib-command[data-copy-state="failed"] .mib-copy-icon {
                display: none;
            }

            .mib-command[data-copy-state="failed"] .mib-status::after {
                content: "×";
                display: block;
            }

            .mib-list[data-show-icons="false"] .mib-command {
                grid-template-areas: "content status";
                grid-template-columns: minmax(0, 1fr) 1.75rem;
            }

            .mib-list[data-show-icons="false"] .mib-command-icon,
            .mib-list[data-show-labels="false"] .mib-command-label {
                display: none;
            }

            .mib-list[data-show-labels="false"] .mib-command-content {
                gap: 0;
            }

            .mib-settings-dialog {
                background: var(--color-bg-default, #fff);
                border: 1px solid var(--color-border-default, #d8d8d8);
                border-radius: 10px;
                box-shadow: 0 22px 70px rgba(0, 0, 0, 0.28);
                color: var(--color-fg-default, #171717);
                max-height: min(46rem, calc(100vh - 2rem));
                max-width: calc(100vw - 2rem);
                overflow: hidden;
                padding: 0;
                width: min(40rem, calc(100vw - 2rem));
            }

            .mib-settings-dialog::backdrop {
                background: rgba(0, 0, 0, 0.58);
                backdrop-filter: blur(2px);
            }

            .mib-settings-form {
                display: grid;
                grid-template-rows: auto auto auto minmax(0, 1fr) auto;
                max-height: min(46rem, calc(100vh - 2rem));
            }

            .mib-settings-header,
            .mib-settings-footer,
            .mib-settings-toolbar {
                align-items: center;
                display: flex;
                gap: 0.5rem;
            }

            .mib-settings-header {
                border-bottom: 1px solid var(--color-border-default, #d8d8d8);
                justify-content: space-between;
                padding: 1rem 1.1rem;
            }

            .mib-settings-title-wrap {
                align-items: center;
                display: flex;
                gap: 0.6rem;
            }

            .mib-settings-title-icon {
                color: var(--color-fg-brand, #cb3837);
                font-size: 1.2rem;
            }

            .mib-settings-title {
                font-size: 1.15rem;
                margin: 0;
            }

            .mib-settings-intro {
                color: var(--color-fg-muted, #666);
                margin: 0;
                padding: 0.85rem 1.1rem 0.25rem;
            }

            .mib-settings-toolbar {
                flex-wrap: wrap;
                padding: 0.6rem 1.1rem 0.85rem;
            }

            .mib-settings-button,
            .mib-settings-close {
                background: var(--color-bg-default, #fff);
                border: 1px solid var(--color-border-default, #c8c8c8);
                border-radius: 5px;
                color: var(--color-fg-default, #171717);
                cursor: pointer;
                font: inherit;
            }

            .mib-settings-button {
                min-height: 2rem;
                padding: 0.35rem 0.7rem;
            }

            .mib-settings-button:hover,
            .mib-settings-close:hover {
                background: var(--color-bg-subtle, #f3f3f3);
                border-color: var(--color-border-strong, #8c8c8c);
            }

            .mib-settings-button-primary {
                background: #cb3837;
                border-color: #cb3837;
                color: #fff;
                font-weight: 700;
            }

            .mib-settings-button-primary:hover {
                background: #a92f2e;
                border-color: #a92f2e;
                color: #fff;
            }

            .mib-settings-close {
                font-size: 1.25rem;
                height: 2rem;
                line-height: 1;
                padding: 0;
                width: 2rem;
            }

            .mib-settings-groups {
                border-bottom: 1px solid var(--color-border-default, #d8d8d8);
                border-top: 1px solid var(--color-border-default, #d8d8d8);
                overflow: auto;
                overscroll-behavior: contain;
                padding: 0.75rem 1.1rem 1rem;
            }

            .mib-settings-group {
                border: 0;
                margin: 0;
                padding: 0;
            }

            .mib-settings-group + .mib-settings-group {
                border-top: 1px solid var(--color-border-default, #e2e2e2);
                margin-top: 1rem;
                padding-top: 0.9rem;
            }

            .mib-settings-legend {
                font-size: 0.85rem;
                font-weight: 750;
                padding: 0 0 0.4rem;
            }

            .mib-settings-option {
                --mib-accent: var(--color-fg-brand, #cb3837);
                align-items: center;
                border-radius: 6px;
                cursor: pointer;
                display: grid;
                gap: 0.65rem;
                grid-template-columns: auto 2rem minmax(0, 1fr);
                min-height: 3.45rem;
                padding: 0.4rem 0.5rem;
            }

            .mib-settings-option-display {
                grid-template-columns: auto minmax(0, 1fr);
            }

            .mib-settings-option:hover {
                background: var(--color-bg-subtle, rgba(0, 0, 0, 0.035));
            }

            .mib-settings-option input {
                accent-color: #cb3837;
                height: 1rem;
                margin: 0;
                width: 1rem;
            }

            .mib-settings-option-icon {
                align-items: center;
                background: color-mix(in srgb, var(--mib-accent) 13%, transparent);
                border: 1px solid color-mix(in srgb, var(--mib-accent) 25%, transparent);
                border-radius: 6px;
                color: var(--mib-accent);
                display: flex;
                font-size: 1.05rem;
                height: 2rem;
                justify-content: center;
                width: 2rem;
            }

            .mib-settings-option-text {
                display: grid;
                gap: 0.1rem;
                min-width: 0;
            }

            .mib-settings-option-label {
                font-size: 0.88rem;
                font-weight: 650;
            }

            .mib-settings-option-description {
                color: var(--color-fg-muted, #666);
                font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
                font-size: 0.71rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .mib-settings-option-display .mib-settings-option-description {
                font-family: inherit;
            }

            .mib-settings-footer {
                justify-content: flex-end;
                padding: 0.85rem 1.1rem;
            }

            html[data-color-mode="dark"] .mib-settings-dialog,
            html[data-color-mode="dark"] .mib-settings-button,
            html[data-color-mode="dark"] .mib-settings-close {
                background: #171717;
                color: #f4f4f4;
            }

            @media (prefers-reduced-motion: reduce) {
                .mib-command,
                .mib-copy-icon,
                .mib-status {
                    transition: none;
                }
            }
        `;
        (document.head || document.documentElement).append(style);
    }

    function getPackageNameFromPath(pathname) {
        const pathParts = pathname.split("/").filter(Boolean);
        if (pathParts[0] !== "package") return null;

        const decodePathPart = (part) => {
            if (!part) return "";
            try {
                return decodeURIComponent(part);
            } catch {
                return part;
            }
        };
        const firstPackagePart = decodePathPart(pathParts[1]);
        if (!firstPackagePart) return null;

        // Some links encode a scoped package as one path segment, while the
        // browser's visible URL usually keeps the scope and name separate.
        if (firstPackagePart.includes("/")) return firstPackagePart;
        if (!firstPackagePart.startsWith("@")) return firstPackagePart;

        const scopedPackageName = decodePathPart(pathParts[2]);
        if (!scopedPackageName) return null;

        return `${firstPackagePart}/${scopedPackageName}`;
    }

    function getTypesPackageName(packageHeading) {
        const typeLink = packageHeading?.querySelector(
            'a[href^="/package/@types/"]'
        );
        if (!typeLink) return null;

        try {
            const typeUrl = new URL(typeLink.href, window.location.origin);
            const typePackageName = getPackageNameFromPath(typeUrl.pathname);
            return typePackageName?.startsWith("@types/")
                ? typePackageName
                : null;
        } catch {
            return null;
        }
    }

    function findHeading(root, text) {
        return Array.from(root.querySelectorAll("h3")).find(
            (heading) =>
                heading.dataset.mibHeading === text ||
                heading.textContent?.trim() === text
        );
    }

    function getDirectSidebarChild(sidebar, element) {
        let child = element;
        while (child && child.parentElement !== sidebar) {
            child = child.parentElement;
        }
        return child?.parentElement === sidebar ? child : null;
    }

    function updateInstallHeading(installHeading) {
        installHeading.dataset.mibHeading = "Install";
        installHeading.classList.toggle(
            "mib-install-heading",
            settings.display.showInstallHeaderIcon
        );
    }

    function getPackageDetails(sidebar) {
        const packageName = getPackageNameFromPath(window.location.pathname);
        const packageHeading = document.querySelector("main h1");
        const versionHeading = findHeading(sidebar, "Version");
        const packageVersion = versionHeading?.parentElement
            ?.querySelector("p")
            ?.textContent?.trim();

        if (!packageName || !packageVersion || !packageHeading) return null;

        return {
            packageName,
            packageVersion,
            typesPackageName: getTypesPackageName(packageHeading),
        };
    }

    function fillCommandTemplate(
        template,
        { packageName, packageVersion, typesPackageName }
    ) {
        const packageSpec = settings.display.useExactVersion
            ? `${packageName}@${packageVersion}`
            : packageName;
        return template
            .replaceAll("{{package}}", packageName)
            .replaceAll("{{version}}", packageVersion)
            .replaceAll("{{packageSpec}}", packageSpec)
            .replaceAll("{{typesPackage}}", typesPackageName || "");
    }

    function buildCommands(details) {
        const hasSeparateTypes =
            Boolean(details.typesPackageName) &&
            !details.packageName.startsWith("@types/");

        return COMMAND_BUTTONS.filter(
            (button) =>
                settings.commandEnabled[button.id] !== false &&
                typeof button.id === "string" &&
                button.id.trim().length > 0 &&
                typeof button.label === "string" &&
                button.label.trim().length > 0 &&
                typeof button.template === "string" &&
                button.template.trim().length > 0 &&
                (!button.requiresTypes || hasSeparateTypes)
        ).map((button) => ({
            label: button.label.trim(),
            manager:
                typeof button.manager === "string" && button.manager.trim()
                    ? button.manager.trim().toLowerCase()
                    : "other",
            icon:
                typeof button.icon === "string" && button.icon.trim()
                    ? button.icon.trim()
                    : "󰏗",
            text: fillCommandTemplate(button.template, details).trim(),
        }));
    }

    function copyWithLegacyApi(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("aria-hidden", "true");
        textarea.style.cssText =
            "position:fixed;inset:0 auto auto 0;opacity:0;pointer-events:none";
        document.body.append(textarea);
        textarea.focus({ preventScroll: true });
        textarea.select();

        try {
            return document.execCommand("copy");
        } catch {
            return false;
        } finally {
            textarea.remove();
        }
    }

    async function copyText(text) {
        if (typeof GM_setClipboard === "function") {
            try {
                GM_setClipboard(text, "text");
                return true;
            } catch {
                // Fall through to browser clipboard APIs.
            }
        }

        if (navigator.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch {
                // Fall through for userscript managers without Clipboard API access.
            }
        }

        return copyWithLegacyApi(text);
    }

    function showCopyResult(button, statusText, copied) {
        button.dataset.copyState = copied ? "copied" : "failed";
        statusText.textContent = copied ? "Copied!" : "Copy failed";

        window.setTimeout(() => {
            if (!button.isConnected) return;
            delete button.dataset.copyState;
            statusText.textContent = "Copy";
        }, 1400);
    }

    function createCopyIcon() {
        const svgNamespace = "http://www.w3.org/2000/svg";
        const icon = document.createElementNS(svgNamespace, "svg");
        icon.classList.add("mib-copy-icon");
        icon.setAttribute("aria-hidden", "true");
        icon.setAttribute("focusable", "false");
        icon.setAttribute("viewBox", "0 0 16 16");

        const backPage = document.createElementNS(svgNamespace, "path");
        backPage.setAttribute(
            "d",
            "M4.75 11.25H3.5A1.5 1.5 0 0 1 2 9.75V3.5A1.5 1.5 0 0 1 3.5 2h6.25a1.5 1.5 0 0 1 1.5 1.5v1.25"
        );

        const frontPage = document.createElementNS(svgNamespace, "rect");
        frontPage.setAttribute("x", "5");
        frontPage.setAttribute("y", "5");
        frontPage.setAttribute("width", "9");
        frontPage.setAttribute("height", "9");
        frontPage.setAttribute("rx", "1.5");

        icon.append(backPage, frontPage);
        return icon;
    }

    function createGearIcon() {
        const svgNamespace = "http://www.w3.org/2000/svg";
        const icon = document.createElementNS(svgNamespace, "svg");
        icon.classList.add("mib-gear-icon");
        icon.setAttribute("aria-hidden", "true");
        icon.setAttribute("focusable", "false");
        icon.setAttribute("viewBox", "0 0 16 16");

        const path = document.createElementNS(svgNamespace, "path");
        path.setAttribute(
            "d",
            "M8 5.4a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2ZM8 1.5v1.25M8 13.25v1.25M1.5 8h1.25M13.25 8h1.25M3.4 3.4l.9.9M11.7 11.7l.9.9M12.6 3.4l-.9.9M4.3 11.7l-.9.9"
        );
        icon.append(path);
        return icon;
    }

    function createSettingsButton(label, action, primary = false) {
        const button = document.createElement("button");
        button.type = action === "submit" ? "submit" : "button";
        button.className = "mib-settings-button";
        if (primary) button.classList.add("mib-settings-button-primary");
        button.textContent = label;
        if (typeof action === "function") {
            button.addEventListener("click", action);
        }
        return button;
    }

    function createSettingsOption({
        checked,
        description,
        icon,
        id,
        label,
        manager,
        name,
    }) {
        const option = document.createElement("label");
        option.className = "mib-settings-option";
        if (manager) option.dataset.manager = manager;
        if (!icon) option.classList.add("mib-settings-option-display");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = name;
        checkbox.value = id;
        checkbox.checked = checked;

        const text = document.createElement("span");
        text.className = "mib-settings-option-text";

        const optionLabel = document.createElement("span");
        optionLabel.className = "mib-settings-option-label";
        optionLabel.textContent = label;

        const optionDescription = document.createElement("span");
        optionDescription.className = "mib-settings-option-description";
        optionDescription.textContent = description;

        text.append(optionLabel, optionDescription);
        option.append(checkbox);
        if (icon) {
            const optionIcon = document.createElement("span");
            optionIcon.className = "mib-settings-option-icon";
            optionIcon.setAttribute("aria-hidden", "true");
            optionIcon.textContent = icon;
            option.append(optionIcon);
        }
        option.append(text);
        return option;
    }

    function applySettingsToForm(form, formSettings) {
        for (const checkbox of form.querySelectorAll(
            'input[name="enabledCommand"]'
        )) {
            checkbox.checked = formSettings.commandEnabled[checkbox.value];
        }
        for (const checkbox of form.querySelectorAll(
            'input[name="displayOption"]'
        )) {
            checkbox.checked = formSettings.display[checkbox.value];
        }
    }

    function readSettingsFromForm(form) {
        const nextSettings = createDefaultSettings();
        for (const checkbox of form.querySelectorAll(
            'input[name="enabledCommand"]'
        )) {
            nextSettings.commandEnabled[checkbox.value] = checkbox.checked;
        }
        for (const checkbox of form.querySelectorAll(
            'input[name="displayOption"]'
        )) {
            nextSettings.display[checkbox.value] = checkbox.checked;
        }
        return nextSettings;
    }

    function closeSettingsDialog(dialog) {
        if (typeof dialog.close === "function") {
            dialog.close();
        } else {
            dialog.remove();
        }
    }

    function openSettingsDialog() {
        document.getElementById(SETTINGS_DIALOG_ID)?.remove();
        addStyles();

        const dialog = document.createElement("dialog");
        dialog.id = SETTINGS_DIALOG_ID;
        dialog.className = "mib-settings-dialog";
        dialog.setAttribute("aria-describedby", "mib-settings-description");
        dialog.setAttribute("aria-labelledby", "mib-settings-title");

        const form = document.createElement("form");
        form.className = "mib-settings-form";

        const header = document.createElement("header");
        header.className = "mib-settings-header";

        const titleWrap = document.createElement("div");
        titleWrap.className = "mib-settings-title-wrap";
        const titleIcon = document.createElement("span");
        titleIcon.className = "mib-settings-title-icon";
        titleIcon.setAttribute("aria-hidden", "true");
        titleIcon.textContent = "󰏗";
        const title = document.createElement("h2");
        title.id = "mib-settings-title";
        title.className = "mib-settings-title";
        title.textContent = "Install command settings";
        titleWrap.append(titleIcon, title);

        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.className = "mib-settings-close";
        closeButton.setAttribute(
            "aria-label",
            "Close install command settings"
        );
        closeButton.textContent = "×";
        closeButton.addEventListener("click", () =>
            closeSettingsDialog(dialog)
        );
        header.append(titleWrap, closeButton);

        const intro = document.createElement("p");
        intro.id = "mib-settings-description";
        intro.className = "mib-settings-intro";
        intro.textContent =
            "Choose which commands appear on npm package pages and how each row is presented. Settings are saved by your userscript manager.";

        const toolbar = document.createElement("div");
        toolbar.className = "mib-settings-toolbar";
        toolbar.append(
            createSettingsButton("Enable all commands", () => {
                for (const checkbox of form.querySelectorAll(
                    'input[name="enabledCommand"]'
                )) {
                    checkbox.checked = true;
                }
            }),
            createSettingsButton("Disable all commands", () => {
                for (const checkbox of form.querySelectorAll(
                    'input[name="enabledCommand"]'
                )) {
                    checkbox.checked = false;
                }
            }),
            createSettingsButton("Defaults", () =>
                applySettingsToForm(form, createDefaultSettings())
            )
        );

        const groups = document.createElement("div");
        groups.className = "mib-settings-groups";

        const displayGroup = document.createElement("fieldset");
        displayGroup.className = "mib-settings-group";
        const displayLegend = document.createElement("legend");
        displayLegend.className = "mib-settings-legend";
        displayLegend.textContent = "Appearance";
        displayGroup.append(displayLegend);
        for (const option of DISPLAY_OPTION_DEFINITIONS) {
            displayGroup.append(
                createSettingsOption({
                    checked: settings.display[option.id],
                    description: option.description,
                    id: option.id,
                    label: option.label,
                    name: "displayOption",
                })
            );
        }

        const commandGroup = document.createElement("fieldset");
        commandGroup.className = "mib-settings-group";
        const commandLegend = document.createElement("legend");
        commandLegend.className = "mib-settings-legend";
        commandLegend.textContent = "Install commands";
        commandGroup.append(commandLegend);
        for (const command of COMMAND_BUTTONS) {
            const requirements = command.requiresTypes
                ? " · requires a separate @types package"
                : "";
            commandGroup.append(
                createSettingsOption({
                    checked: settings.commandEnabled[command.id],
                    description: `${command.template}${requirements}`,
                    icon: command.icon,
                    id: command.id,
                    label: command.label,
                    manager: command.manager,
                    name: "enabledCommand",
                })
            );
        }
        groups.append(displayGroup, commandGroup);

        const footer = document.createElement("footer");
        footer.className = "mib-settings-footer";
        footer.append(
            createSettingsButton("Cancel", () => closeSettingsDialog(dialog)),
            createSettingsButton("Save", "submit", true)
        );

        form.append(header, intro, toolbar, groups, footer);
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            saveSettings(readSettingsFromForm(form));
            closeSettingsDialog(dialog);
        });

        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) closeSettingsDialog(dialog);
        });
        dialog.addEventListener("close", () => dialog.remove(), {
            once: true,
        });
        dialog.append(form);
        (document.body || document.documentElement).append(dialog);

        if (typeof dialog.showModal === "function") {
            dialog.showModal();
        } else {
            dialog.setAttribute("open", "");
        }
        form.querySelector('input[name="displayOption"]')?.focus();
    }

    function registerSettingsCommand() {
        if (typeof GM_registerMenuCommand !== "function") return;

        GM_registerMenuCommand(
            "Configure install commands…",
            openSettingsDialog
        );
    }

    function createCommandButton({ icon, label, manager, text }) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "mib-command";
        button.dataset.manager = manager;
        button.title = `${label}: click to copy`;
        button.setAttribute("aria-label", `Copy ${label}: ${text}`);

        const commandIcon = document.createElement("span");
        commandIcon.className = "mib-command-icon";
        commandIcon.setAttribute("aria-hidden", "true");
        commandIcon.textContent = icon;

        const content = document.createElement("span");
        content.className = "mib-command-content";

        const commandLabel = document.createElement("span");
        commandLabel.className = "mib-command-label";
        commandLabel.textContent = label;

        const code = document.createElement("code");
        code.textContent = text;
        content.append(commandLabel, code);

        const status = document.createElement("span");
        status.className = "mib-status";
        status.setAttribute("aria-live", "polite");

        const statusText = document.createElement("span");
        statusText.className = "mib-status-text";
        statusText.textContent = "Copy";
        status.append(createCopyIcon(), statusText);

        button.append(commandIcon, content, status);
        button.addEventListener("click", () => {
            copyText(text).then(
                (copied) => {
                    showCopyResult(button, statusText, copied);
                },
                () => {
                    showCopyResult(button, statusText, false);
                }
            );
        });

        return button;
    }

    function renderButtons() {
        const sidebar = document.querySelector(
            'aside[aria-label="Package sidebar"]'
        );
        const originalCopyButton = sidebar?.querySelector(COPY_BUTTON_SELECTOR);
        const installHeading = sidebar ? findHeading(sidebar, "Install") : null;
        const installSection = sidebar
            ? getDirectSidebarChild(sidebar, originalCopyButton)
            : null;

        if (
            !sidebar ||
            !installHeading ||
            !originalCopyButton ||
            !installSection
        )
            return;

        const details = getPackageDetails(sidebar);
        if (!details) return;

        const pageKey = [
            details.packageName,
            details.packageVersion,
            details.typesPackageName,
            settingsRevision,
        ].join("|");
        const existingList = sidebar.querySelector(`[${LIST_ATTRIBUTE}]`);
        updateInstallHeading(installHeading);
        if (existingList?.dataset.pageKey === pageKey) return;
        if (
            existingList &&
            existingList.dataset.npmEnhancementOwner !== "standalone"
        ) {
            return;
        }
        existingList?.remove();

        addStyles();

        const commands = buildCommands(details);
        if (commands.length === 0) return;

        const list = document.createElement("div");
        list.className = "mib-list";
        list.dataset.pageKey = pageKey;
        list.dataset.npmEnhancementOwner = "standalone";
        list.dataset.showIcons = String(settings.display.showCommandIcons);
        list.dataset.showLabels = String(settings.display.showCommandLabels);
        list.setAttribute(LIST_ATTRIBUTE, "");
        list.setAttribute("aria-label", "Additional install commands");

        if (settings.display.showListHeading && commands.length > 0) {
            const listHeading = document.createElement("div");
            listHeading.className = "mib-list-heading";

            const listHeadingIcon = document.createElement("span");
            listHeadingIcon.className = "mib-list-heading-icon";
            listHeadingIcon.setAttribute("aria-hidden", "true");
            listHeadingIcon.textContent = "";

            const listHeadingText = document.createElement("span");
            listHeadingText.textContent = "More commands";

            const listHeadingCount = document.createElement("span");
            listHeadingCount.className = "mib-list-heading-count";
            listHeadingCount.textContent = String(commands.length);

            const listHeadingDivider = document.createElement("span");
            listHeadingDivider.className = "mib-list-heading-divider";
            listHeadingDivider.setAttribute("aria-hidden", "true");

            const versionToggle = document.createElement("button");
            versionToggle.type = "button";
            versionToggle.className = "mib-list-version-toggle";
            versionToggle.textContent = `@${details.packageVersion}`;
            versionToggle.title = settings.display.useExactVersion
                ? "Use the active release tag in generated commands"
                : `Pin generated commands to ${details.packageVersion}`;
            versionToggle.setAttribute(
                "aria-label",
                settings.display.useExactVersion
                    ? "Stop pinning generated install commands to the current version"
                    : `Pin generated install commands to version ${details.packageVersion}`
            );
            versionToggle.setAttribute(
                "aria-pressed",
                String(settings.display.useExactVersion)
            );
            versionToggle.addEventListener("click", () => {
                saveSettings({
                    ...settings,
                    display: {
                        ...settings.display,
                        useExactVersion: !settings.display.useExactVersion,
                    },
                });
            });

            const settingsButton = document.createElement("button");
            settingsButton.type = "button";
            settingsButton.className = "mib-list-settings";
            settingsButton.title = "Configure install commands";
            settingsButton.setAttribute(
                "aria-label",
                "Configure install commands"
            );
            settingsButton.append(createGearIcon());
            settingsButton.addEventListener("click", openSettingsDialog);

            listHeading.append(
                listHeadingIcon,
                listHeadingText,
                listHeadingCount,
                listHeadingDivider,
                versionToggle,
                settingsButton
            );
            list.append(listHeading);
        }

        for (const command of commands) {
            list.append(createCommandButton(command));
        }

        installSection.insertAdjacentElement("afterend", list);
    }

    function scheduleRender() {
        if (renderFrame) return;

        renderFrame = window.requestAnimationFrame(() => {
            renderFrame = 0;
            renderButtons();
        });
    }

    const observer = new MutationObserver(scheduleRender);
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
    window.addEventListener("popstate", scheduleRender);
    registerSettingsCommand();
    scheduleRender();
})();
