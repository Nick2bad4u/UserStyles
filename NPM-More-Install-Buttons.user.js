// ==UserScript==
// @name         NPM - More Install Buttons
// @namespace    nick2bad4u.github.io
// @version      1.0.0
// @description  Adds copyable Yarn install commands to npm package pages.
// @author       Nick2bad4u (based on the original script by Kıraç Armağan Önal)
// @license      UnLicense
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @downloadURL  https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/NPM-More-Install-Buttons.user.js
// @updateURL    https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/NPM-More-Install-Buttons.user.js
// @source       https://greasyfork.org/scripts/425544
// @icon         https://www.google.com/s2/favicons?sz=64&domain=npmjs.com
// @match        https://www.npmjs.com/package/*
// @run-at       document-idle
// @grant        none
// @noframes
// ==/UserScript==

(function () {
    "use strict";

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
                align-items: stretch;
                background: color-mix(in srgb, currentColor 5%, transparent);
                border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
                border-radius: 0.25rem;
                color: inherit;
                cursor: pointer;
                display: flex;
                font: inherit;
                max-width: 100%;
                min-width: 0;
                padding: 0;
                transition: border-color 120ms ease, background-color 120ms ease;
                width: 100%;
            }

            .mib-command:hover {
                background: color-mix(in srgb, currentColor 9%, transparent);
                border-color: #cb3837;
            }

            .mib-command:focus-visible {
                outline: 2px solid #cb3837;
                outline-offset: 2px;
            }

            .mib-command code {
                flex: 1 1 auto;
                min-width: 0;
                overflow: hidden;
                padding: 0.65rem 0.75rem;
                text-align: left;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .mib-status {
                align-items: center;
                border-left: 1px solid color-mix(in srgb, currentColor 18%, transparent);
                display: flex;
                flex: 0 0 auto;
                font-size: 0.75rem;
                font-weight: 600;
                justify-content: center;
                min-width: 4.5rem;
                padding: 0.65rem 0.6rem;
            }

            .mib-command[data-copy-state="copied"] .mib-status {
                color: #137752;
            }

            .mib-command[data-copy-state="failed"] .mib-status {
                color: #cb3837;
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

    function buildCommands({ packageName, packageVersion, typesPackageName }) {
        const packageSpec = `${packageName}@${packageVersion}`;
        const commands = [
            {
                label: "Yarn dependency",
                text: `yarn add ${packageSpec}`,
            },
            {
                label: "Yarn development dependency",
                text: `yarn add --dev ${packageSpec}`,
            },
            {
                label: "Yarn Classic global dependency",
                text: `yarn global add ${packageSpec}`,
            },
        ];

        if (typesPackageName && !packageName.startsWith("@types/")) {
            commands.push(
                {
                    label: "Yarn types development dependency",
                    text: `yarn add --dev ${typesPackageName}`,
                },
                {
                    label: "Yarn package and types dependencies",
                    text: `yarn add ${packageSpec} && yarn add --dev ${typesPackageName}`,
                }
            );
        }

        return commands;
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

    function showCopyResult(button, status, copied) {
        button.dataset.copyState = copied ? "copied" : "failed";
        status.textContent = copied ? "Copied!" : "Failed";

        window.setTimeout(() => {
            if (!button.isConnected) return;
            delete button.dataset.copyState;
            status.textContent = "Copy";
        }, 1400);
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
        status.textContent = "Copy";

        button.append(code, status);
        button.addEventListener("click", () => {
            copyText(text).then(
                (copied) => {
                    showCopyResult(button, status, copied);
                },
                () => {
                    showCopyResult(button, status, false);
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
