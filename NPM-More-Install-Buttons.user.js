// ==UserScript==
// @name         NPM - More Install Buttons
// @namespace    nick2bad4u.github.io
// @version      1.1.2
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

    // Add, remove, disable, or reorder buttons here.
    // Available tokens: {{package}}, {{version}}, {{packageSpec}}, and
    // {{typesPackage}}. Set enabled to false to hide a button. Commands with
    // requiresTypes only appear when npm links a separate @types package.
    const COMMAND_BUTTONS = [
        {
            label: "NPM dependency",
            template: "npm install {{packageSpec}}",
            enabled: false, // Disabled by default because the original "Copy install command line" button already provides this command.
        },
        {
            label: "NPM dev dependency",
            template: "npm i --save-dev {{packageSpec}}",
            enabled: true,
        },
        {
            label: "NPM global dependency",
            template: "npm i -g {{packageSpec}}",
            enabled: true, // Disabled by default because global installs are less common.
        },
        {
            label: "NPM @types dev dependency",
            template: "npm install --save-dev {{typesPackage}}",
            requiresTypes: true,
        },
        {
            label: "Yarn dependency",
            template: "yarn add {{packageSpec}}",
            enabled: true,
        },
        {
            label: "Yarn package and types dependencies",
            template:
                "yarn add {{packageSpec}} && yarn add --dev {{typesPackage}}",
            requiresTypes: true,
            enabled: false, // Disabled by default because many users don't use Yarn.
        },
        {
            label: "PNPM dependency",
            template: "pnpm add {{packageSpec}}",
            enabled: true,
        },
        {
            label: "Bun dependency",
            template: "bun add {{packageSpec}}",
            enabled: true,
        },
        {
            label: "Deno dependency",
            template: "deno add npm:{{packageSpec}}",
            enabled: true,
        },
        {
            label: "vlt dependency",
            template: "vlt install {{packageSpec}}",
            enabled: false, // Disabled by default because vlt is less common.
        },
        {
            label: "Aube dependency",
            template: "aube add {{packageSpec}}",
            enabled: false, // Disabled by default because Aube is less common.
        },
        {
            label: "Nub dependency",
            template: "nub add {{packageSpec}}",
            enabled: false, // Disabled by default because Nub is less common.
        },
        {
            label: "CNPM dependency",
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
                gap: 0.5rem;
                margin: -0.35rem 0 1.5rem;
            }

            .mib-command {
                align-items: center;
                background: transparent;
                border: 1px solid var(--color-border-default, #dfdfdf);
                border-radius: 5px;
                color: var(--color-fg-default, #111);
                cursor: pointer;
                display: flex;
                font-family: Consolas, monaco, monospace;
                font-size: .875rem;
                height: 46px;
                line-height: var(--code-lh, 24px);
                max-width: 100%;
                min-width: 0;
                overflow: hidden;
                padding: 10px 10px 10px 34px;
                position: relative;
                text-align: left;
                transition: border-color 120ms ease, background-color 120ms ease;
                white-space: nowrap;
                width: 100%;
            }

            .mib-command::before {
                color: var(--color-fg-muted, #777);
                content: "›";
                font-size: 16px;
                font-weight: 700;
                left: 16px;
                line-height: 1;
                position: absolute;
                top: 50%;
                transform: translateY(-52%);
            }

            .mib-command:hover {
                background: var(--color-bg-subtle, rgba(0, 0, 0, 0.03));
                border-color: var(--color-border-strong, #999);
            }

            .mib-command:focus-visible {
                outline: 2px solid var(--color-fg-brand, #cb3837);
                outline-offset: 2px;
            }

            .mib-command code {
                flex: 1 1 auto;
                font: inherit;
                height: 24px;
                line-height: 24px;
                min-width: 0;
                overflow: hidden;
                padding: 0 35px 0 0;
                text-align: left;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .mib-status {
                align-items: center;
                color: #808080;
                display: flex;
                height: 22px;
                justify-content: center;
                padding: 1px 6px;
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                width: 28px;
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
                transform: scale(1.15);
            }

            .mib-command[data-copy-state="failed"] .mib-status {
                color: var(--color-fg-danger, #cb3837);
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
            (heading) => heading.textContent?.trim() === text
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

    function createCommandButton({ label, text }) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "mib-command";
        button.title = `${label}: click to copy`;
        button.setAttribute("aria-label", `Copy ${label}: ${text}`);

        const code = document.createElement("code");
        code.textContent = text;

        const status = document.createElement("span");
        status.className = "mib-status";
        status.setAttribute("aria-live", "polite");

        const statusText = document.createElement("span");
        statusText.className = "mib-status-text";
        statusText.textContent = "Copy";
        status.append(createCopyIcon(), statusText);

        button.append(code, status);
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
        if (existingList?.dataset.pageKey === pageKey) return;
        existingList?.remove();

        addStyles();

        const list = document.createElement("div");
        list.className = "mib-list";
        list.dataset.pageKey = pageKey;
        list.setAttribute(LIST_ATTRIBUTE, "");
        list.setAttribute("aria-label", "Additional install commands");

        for (const command of buildCommands(details)) {
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
