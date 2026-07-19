// ==UserScript==
// @name         NPM - More Install Buttons
// @namespace    nick2bad4u.github.io
// @version      1.2.0
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
// @grant        none
// @noframes
// @downloadURL https://update.greasyfork.org/scripts/587470/NPM%20-%20More%20Install%20Buttons.user.js
// @updateURL https://update.greasyfork.org/scripts/587470/NPM%20-%20More%20Install%20Buttons.meta.js
// ==/UserScript==

(function () {
    "use strict";

    // Display options. Nerd Font icons use locally installed Nerd Font families.
    // Turn either row option off for a simpler command-only layout.
    const DISPLAY_OPTIONS = {
        showInstallHeaderIcon: true,
        showListHeading: true,
        showCommandIcons: true,
        showCommandLabels: true,
    };

    // Add, remove, disable, or reorder buttons here.
    // Available tokens: {{package}}, {{version}}, {{packageSpec}}, and
    // {{typesPackage}}. Set enabled to false to hide a button. The optional
    // manager and icon values control each button's accent and Nerd Font icon.
    // Commands with requiresTypes only appear when npm links a separate @types
    // package.
    const COMMAND_BUTTONS = [
        {
            label: "NPM dependency",
            manager: "npm",
            icon: "",
            template: "npm install {{packageSpec}}",
            enabled: false, // Disabled by default because the original "Copy install command line" button already provides this command.
        },
        {
            label: "NPM dev dependency",
            manager: "npm",
            icon: "",
            template: "npm i --save-dev {{packageSpec}}",
            enabled: true,
        },
        {
            label: "NPM global dependency",
            manager: "npm",
            icon: "",
            template: "npm i -g {{packageSpec}}",
            enabled: false, // Disabled by default because global installs are less common.
        },
        {
            label: "NPM @types dev dependency",
            manager: "npm",
            icon: "",
            template: "npm install --save-dev {{typesPackage}}",
            requiresTypes: true,
        },
        {
            label: "Yarn dependency",
            manager: "yarn",
            icon: "",
            template: "yarn add {{packageSpec}}",
            enabled: true,
        },
        {
            label: "Yarn package and types dependencies",
            manager: "yarn",
            icon: "",
            template:
                "yarn add {{packageSpec}} && yarn add --dev {{typesPackage}}",
            requiresTypes: true,
            enabled: false, // Disabled by default because many users don't use Yarn.
        },
        {
            label: "PNPM dependency",
            manager: "pnpm",
            icon: "",
            template: "pnpm add {{packageSpec}}",
            enabled: true,
        },
        {
            label: "Bun dependency",
            manager: "bun",
            icon: "",
            template: "bun add {{packageSpec}}",
            enabled: true,
        },
        {
            label: "Deno dependency",
            manager: "deno",
            icon: "",
            template: "deno add npm:{{packageSpec}}",
            enabled: true,
        },
        {
            label: "vlt dependency",
            manager: "vlt",
            icon: "",
            template: "vlt install {{packageSpec}}",
            enabled: false, // Disabled by default because vlt is less common.
        },
        {
            label: "Aube dependency",
            manager: "aube",
            icon: "",
            template: "aube add {{packageSpec}}",
            enabled: false, // Disabled by default because Aube is less common.
        },
        {
            label: "Nub dependency",
            manager: "nub",
            icon: "",
            template: "nub add {{packageSpec}}",
            enabled: false, // Disabled by default because Nub is less common.
        },
        {
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
        // Examples:
        // { label: "pnpm dependency", template: "pnpm add {{packageSpec}}" },
        // { label: "Bun dependency", template: "bun add {{packageSpec}}" },
    ];

    const LIST_ATTRIBUTE = "data-npm-more-install-buttons";
    const STYLE_ID = "npm-more-install-buttons-style";
    const COPY_BUTTON_SELECTOR =
        'button[aria-label="Copy install command line"]';

    let renderFrame = 0;

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

            .mib-install-heading-icon,
            .mib-list-heading-icon,
            .mib-command-icon {
                font-family: "Symbols Nerd Font Mono", "Symbols Nerd Font", "CaskaydiaCove Nerd Font", "CaskaydiaMono Nerd Font", "JetBrainsMono Nerd Font", monospace;
                font-style: normal;
                font-variant: normal;
                line-height: 1;
                text-rendering: auto;
            }

            .mib-install-heading-icon {
                color: var(--color-fg-brand, #cb3837);
                font-size: 1.05em;
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

            .mib-list-heading::after {
                background: linear-gradient(90deg, var(--color-border-default, #d8d8d8), transparent);
                content: "";
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

            .mib-command[data-manager="yarn"] {
                --mib-accent: #2c8ebb;
            }

            .mib-command[data-manager="pnpm"] {
                --mib-accent: #d88c00;
            }

            .mib-command[data-manager="bun"] {
                --mib-accent: #9b6c4f;
            }

            .mib-command[data-manager="deno"] {
                --mib-accent: #5b9279;
            }

            .mib-command[data-manager="vlt"] {
                --mib-accent: #6f5bd3;
            }

            .mib-command[data-manager="aube"],
            .mib-command[data-manager="nub"],
            .mib-command[data-manager="cnpm"] {
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

    function updateInstallHeading(installHeading) {
        installHeading.dataset.mibHeading = "Install";
        installHeading.classList.toggle(
            "mib-install-heading",
            DISPLAY_OPTIONS.showInstallHeaderIcon
        );

        const existingIcon = installHeading.querySelector(
            ".mib-install-heading-icon"
        );
        if (!DISPLAY_OPTIONS.showInstallHeaderIcon) {
            existingIcon?.remove();
            return;
        }

        if (existingIcon) return;

        const installHeadingIcon = document.createElement("span");
        installHeadingIcon.className = "mib-install-heading-icon";
        installHeadingIcon.setAttribute("aria-hidden", "true");
        installHeadingIcon.textContent = "󰏗";
        installHeading.prepend(installHeadingIcon);
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
        return template
            .replaceAll("{{package}}", packageName)
            .replaceAll("{{version}}", packageVersion)
            .replaceAll("{{packageSpec}}", `${packageName}@${packageVersion}`)
            .replaceAll("{{typesPackage}}", typesPackageName || "");
    }

    function buildCommands(details) {
        const hasSeparateTypes =
            Boolean(details.typesPackageName) &&
            !details.packageName.startsWith("@types/");

        return COMMAND_BUTTONS.filter(
            (button) =>
                button.enabled !== false &&
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
        const installRow = installHeading?.nextElementSibling;

        if (
            !sidebar ||
            !originalCopyButton ||
            !installRow?.contains(originalCopyButton)
        )
            return;

        const details = getPackageDetails(sidebar);
        if (!details) return;

        const pageKey = [
            details.packageName,
            details.packageVersion,
            details.typesPackageName,
        ].join("|");
        const existingList = sidebar.querySelector(`[${LIST_ATTRIBUTE}]`);
        updateInstallHeading(installHeading);
        if (existingList?.dataset.pageKey === pageKey) return;
        existingList?.remove();

        addStyles();

        const list = document.createElement("div");
        list.className = "mib-list";
        list.dataset.pageKey = pageKey;
        list.dataset.showIcons = String(DISPLAY_OPTIONS.showCommandIcons);
        list.dataset.showLabels = String(DISPLAY_OPTIONS.showCommandLabels);
        list.setAttribute(LIST_ATTRIBUTE, "");
        list.setAttribute("aria-label", "Additional install commands");

        const commands = buildCommands(details);
        if (DISPLAY_OPTIONS.showListHeading && commands.length > 0) {
            const listHeading = document.createElement("div");
            listHeading.className = "mib-list-heading";
            listHeading.setAttribute("aria-hidden", "true");

            const listHeadingIcon = document.createElement("span");
            listHeadingIcon.className = "mib-list-heading-icon";
            listHeadingIcon.textContent = "";

            const listHeadingText = document.createElement("span");
            listHeadingText.textContent = "More commands";

            const listHeadingCount = document.createElement("span");
            listHeadingCount.className = "mib-list-heading-count";
            listHeadingCount.textContent = String(commands.length);

            listHeading.append(
                listHeadingIcon,
                listHeadingText,
                listHeadingCount
            );
            list.append(listHeading);
        }

        for (const command of commands) {
            list.append(createCommandButton(command));
        }

        installRow.after(list);
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
    scheduleRender();
})();
