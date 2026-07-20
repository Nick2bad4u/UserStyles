// ==UserScript==
// @name         NPM - Bundlephobia Package Size
// @namespace    nick2bad4u.github.io
// @version      2.2.0
// @description  Shows exact-version Bundlephobia sizes, download estimates, and bundle metadata on npm package pages.
// @author       Nick2bad4u (modern fork of dutzi's original script)
// @license      MIT
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @source       https://greasyfork.org/scripts/436941-npm-package-size-from-bundlephobia
// @icon         https://bundlephobia.com/favicon.ico
// @match        https://www.npmjs.com/package/*
// @match        https://npmjs.com/package/*
// @run-at       document-idle
// @connect      bundlephobia.com
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @noframes
// @downloadURL  https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/NPM-Bundlephobia-Package-Size.user.js
// @updateURL    https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/NPM-Bundlephobia-Package-Size.user.js
// ==/UserScript==

/*
 * Modern fork of “NPM Package Size from BundlePhobia” by dutzi:
 * https://greasyfork.org/scripts/436941-npm-package-size-from-bundlephobia
 *
 * The original script and this fork are licensed under the MIT License.
 */

(function () {
    "use strict";

    const ACCENT_COLOR_KEY = "bundlephobiaSizeAccentColor";
    const ACCENT_DIALOG_ID = "npm-bundlephobia-accent-dialog";
    const CARD_ATTRIBUTE = "data-npm-bundlephobia-size";
    const CARD_PLACEMENT_KEY = "bundlephobiaSizeCardPlacement";
    const CARD_PLACEMENTS = Object.freeze({
        bundlephobiaLink: "bundlephobia-link",
        unpackedSize: "unpacked-size",
    });
    const DEFAULT_ACCENT_COLOR = "#cb3837";
    const DOWNLOAD_SPEED_KBPS = Object.freeze({
        emerging4G: 7000 / 8,
        slow3G: 400 / 8,
    });
    const FAVICON_URL = "https://bundlephobia.com/favicon.ico";
    // Status icons derived from Bundlephobia's MIT-licensed client assets:
    // https://github.com/pastelsky/bundlephobia/tree/bundlephobia/client/assets
    const STATUS_ICON_MARKUP = Object.freeze({
        dependency: `<svg width="20" height="18" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero"><path class="dep-icon__node" d="M9.5625 9a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-1.125a3.375 3.375 0 1 0 0-6.75 3.375 3.375 0 0 0 0 6.75Z" fill="#C8CDD3"/><path class="dep-icon__node" d="M9.5625 18a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-1.125a3.375 3.375 0 1 0 0-6.75 3.375 3.375 0 0 0 0 6.75Z" fill="#C8CDD3"/><path class="dep-icon__node" d="M14.625 13.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-1.125a3.375 3.375 0 1 0 0-6.75 3.375 3.375 0 0 0 0 6.75Z" fill="#C8CDD3"/><path class="dep-icon__node" d="M4.5 13.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-1.125a3.375 3.375 0 1 0 0-6.75 3.375 3.375 0 0 0 0 6.75Z" fill="#C8CDD3"/><path d="M9.5625 13.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-1.125a3.375 3.375 0 1 0 0-6.75 3.375 3.375 0 0 0 0 6.75Z" fill="#90DD97"/><circle class="dep-icon__dot" fill="#FFFFFF" cx="9.5625" cy="9" r="3.375"/></g></svg>`,
        sideEffect: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><path class="side-effect-icon-svg__circle" d="M9.65 6.54a3.12 3.12 0 1 0 .01 6.24 3.12 3.12 0 0 0 0-6.24zm0 .7a2.42 2.42 0 1 1 0 4.84 2.42 2.42 0 1 1 0-4.85z" stroke="#C8CDD3" fill="#C8CDD3"/><path class="side-effect-icon-svg__arrows" d="M6.2 6.54a.38.38 0 0 0 .34-.38v-3.2a.38.38 0 1 0-.75 0v2.29L1.65 1.1a.38.38 0 0 0-.54.53L5.26 5.8H2.98a.38.38 0 1 0 0 .75H6.2zM17.06 6.54a.38.38 0 1 0-.04-.75h-2.28l4.15-4.15a.38.38 0 1 0-.54-.53l-4.14 4.14V2.97a.38.38 0 1 0-.75 0v3.2c0 .2.17.37.38.37h3.22zM1.4 19c.1 0 .19-.05.26-.12l4.13-4.14v2.29a.38.38 0 1 0 .75 0v-3.2c0-.2-.17-.37-.38-.37H2.98a.38.38 0 1 0 0 .75h2.28l-4.14 4.14a.38.38 0 0 0 .28.65zM18.65 19a.38.38 0 0 0 .23-.65l-4.14-4.14h2.28a.38.38 0 1 0 0-.75h-3.18c-.21 0-.38.17-.38.38v3.19a.38.38 0 1 0 .75 0v-2.29l4.13 4.14c.08.09.2.13.31.12z" stroke="#90DD97" stroke-width=".5" fill="#90DD97"/></g></svg>`,
        treeShake: `<svg width="23" height="21" viewBox="0 0 23 21" xmlns="http://www.w3.org/2000/svg"><g fill="#90DD97"><path class="tree-shake-icon-svg__bush" d="M11.95 15.89v.72A4.64 4.64 0 0 0 16 11.92c0-2.48-.53-5.27-1.41-7.44C13.69 2.27 12.56 1 11.5 1S9.31 2.26 8.41 4.46A20.82 20.82 0 0 0 7 11.92a4.64 4.64 0 0 0 4.05 4.69v-1.66L9.38 13.2a.49.49 0 0 1 0-.66.43.43 0 0 1 .64 0l1.03 1.08v-3.57c0-.26.2-.47.45-.47s.45.21.45.47v1.22l.58-.61a.43.43 0 0 1 .64 0 .49.49 0 0 1 0 .66l-1.22 1.28v1.96l1.03-1.08a.43.43 0 0 1 .63 0 .49.49 0 0 1 0 .66l-1.66 1.75zm.05 1.8l-.5-.05-.5.05v-.1l-.04-.01a5.6 5.6 0 0 1-4.9-5.66c0-2.62.55-5.54 1.48-7.84C8.57 1.56 9.94.02 11.5.02s2.93 1.54 3.96 4.08c.94 2.3 1.49 5.21 1.49 7.82a5.6 5.6 0 0 1-4.9 5.66H12v.1z"/><path d="M11.03 16.61h.94v3.9a.48.48 0 0 1-.47.49.48.48 0 0 1-.47-.49v-3.9z"/></g><path fill="#C8CDD3" class="tree-shake-icon-svg__shake" d="M19.95 16L21 13.89l-.95-1.97L21 10l-.95-1.92.95-1.97L19.95 4l-.85.43.85 1.68L19 8.08l.95 1.92-.95 1.92.95 1.97-.86 1.68zm2 0L23 13.89l-.95-1.97L23 10l-.95-1.92.95-1.97-.46-.92L21.95 4l-.85.43.85 1.68L21 8.08l.95 1.92-.95 1.92.95 1.97-.86 1.68zm-20.9 0L0 13.89l.95-1.97L0 10l.95-1.92L0 6.11 1.05 4l.85.43-.85 1.68L2 8.08 1.05 10 2 11.92l-.95 1.97.85 1.68zm1.97 0L2 13.89l.93-1.97L2 10l.93-1.92L2 6.11 3.02 4l.84.43-.79 1.68L4 8.08 3.07 10 4 11.92l-.93 1.97.79 1.68z"/></svg>`,
    });
    const STYLE_ID = "npm-bundlephobia-size-styles";
    const REQUEST_TIMEOUT_MS = 20_000;
    const bundleStatsCache = new Map();
    let renderQueued = false;

    function normalizeText(value) {
        return value?.replace(/\s+/gu, " ").trim() ?? "";
    }

    function decodePathSegment(segment) {
        try {
            return decodeURIComponent(segment);
        } catch {
            return segment;
        }
    }

    function getPackageFromPath() {
        const segments = window.location.pathname
            .split("/")
            .filter(Boolean)
            .map(decodePathSegment);

        if (segments[0] !== "package" || !segments[1]) return null;

        const isScoped = segments[1].startsWith("@");
        if (isScoped && !segments[2]) return null;

        const packageName = isScoped
            ? `${segments[1]}/${segments[2]}`
            : segments[1];
        const versionMarkerIndex = isScoped ? 3 : 2;
        const pathVersion =
            segments[versionMarkerIndex] === "v"
                ? (segments[versionMarkerIndex + 1] ?? "")
                : "";

        return { packageName, pathVersion };
    }

    function findSidebarHeading(sidebar, label) {
        return [...sidebar.querySelectorAll("h2, h3, h4")].find(
            (heading) => normalizeText(heading.textContent) === label
        );
    }

    function getSidebarFieldValue(sidebar, label) {
        const heading = findSidebarHeading(sidebar, label);
        if (!heading) return "";

        const siblingValue = normalizeText(
            heading.nextElementSibling?.textContent
        );
        if (siblingValue) return siblingValue;

        return normalizeText(
            [...(heading.parentElement?.children ?? [])].find(
                (element) => element !== heading && element.matches("p")
            )?.textContent
        );
    }

    function findBundlephobiaLink(sidebar) {
        return [...sidebar.querySelectorAll("a[href]")].find((link) => {
            if (link.closest(`[${CARD_ATTRIBUTE}]`)) return false;

            try {
                const url = new URL(link.href);
                return (
                    url.hostname === "bundlephobia.com" &&
                    url.pathname.startsWith("/package/")
                );
            } catch {
                return false;
            }
        });
    }

    function encodePackagePath(packageName) {
        return packageName.split("/").map(encodeURIComponent).join("/");
    }

    function getPageDetails() {
        const sidebar = document.querySelector(
            'aside[aria-label="Package sidebar"]'
        );
        const packagePath = getPackageFromPath();
        if (!sidebar || !packagePath) return null;

        const packageVersion =
            packagePath.pathVersion || getSidebarFieldValue(sidebar, "Version");
        if (!packageVersion) return null;

        const packageSpec = `${packagePath.packageName}@${packageVersion}`;
        const bundlephobiaPath = `${encodePackagePath(
            packagePath.packageName
        )}@${encodeURIComponent(packageVersion)}`;

        return {
            bundlephobiaUrl: `https://bundlephobia.com/package/${bundlephobiaPath}`,
            pageKey: `${window.location.pathname}|${packageSpec}`,
            packageName: packagePath.packageName,
            packageSpec,
            packageVersion,
            sidebar,
        };
    }

    function addStyles() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = `
            [${CARD_ATTRIBUTE}] {
                --nbps-accent: ${DEFAULT_ACCENT_COLOR};
                background: rgba(127, 127, 127, 0.055);
                border: 1px solid rgba(127, 127, 127, 0.28);
                border-left: 3px solid var(--nbps-accent);
                border-radius: 0.4rem;
                box-sizing: border-box;
                clear: both;
                color: inherit;
                display: grid;
                gap: 0.75rem;
                margin: 0.5rem 0 0.75rem;
                min-width: 0;
                padding: 0.8rem;
                width: 100%;
            }

            [${CARD_ATTRIBUTE}] .nbps-header {
                align-items: center;
                display: flex;
                gap: 0.55rem;
                min-width: 0;
            }

            [${CARD_ATTRIBUTE}] .nbps-icon {
                border-radius: 0.25rem;
                display: block;
                flex: 0 0 auto;
                height: 1.65rem;
                object-fit: contain;
                width: 1.65rem;
            }

            [${CARD_ATTRIBUTE}] .nbps-title {
                color: inherit;
                font-size: 0.875rem;
                font-weight: 700;
                min-width: 0;
                text-decoration: none;
            }

            [${CARD_ATTRIBUTE}] .nbps-title:hover {
                color: var(--nbps-accent);
                text-decoration: underline;
            }

            [${CARD_ATTRIBUTE}] .nbps-version {
                color: inherit;
                font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
                font-size: 0.72rem;
                margin-left: auto;
                max-width: 45%;
                opacity: 0.65;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            [${CARD_ATTRIBUTE}] .nbps-content {
                min-width: 0;
            }

            [${CARD_ATTRIBUTE}] .nbps-loading,
            [${CARD_ATTRIBUTE}] .nbps-error {
                font-size: 0.8rem;
                line-height: 1.45;
                margin: 0;
            }

            [${CARD_ATTRIBUTE}] .nbps-loading {
                opacity: 0.72;
            }

            [${CARD_ATTRIBUTE}] .nbps-metrics {
                display: grid;
                gap: 0.5rem;
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            [${CARD_ATTRIBUTE}] .nbps-metric {
                background: rgba(127, 127, 127, 0.08);
                border-radius: 0.3rem;
                display: grid;
                gap: 0.15rem;
                min-width: 0;
                padding: 0.55rem 0.65rem;
            }

            [${CARD_ATTRIBUTE}] .nbps-metric-label {
                font-size: 0.68rem;
                font-weight: 700;
                letter-spacing: 0.04em;
                opacity: 0.65;
                text-transform: uppercase;
            }

            [${CARD_ATTRIBUTE}] .nbps-metric-value {
                font-size: 1rem;
                line-height: 1.25;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            [${CARD_ATTRIBUTE}] .nbps-details {
                font-size: 0.7rem;
                line-height: 1.4;
                margin: 0.5rem 0 0;
                opacity: 0.65;
            }

            [${CARD_ATTRIBUTE}] .nbps-badges {
                display: flex;
                flex-wrap: wrap;
                gap: 0.4rem;
                margin-top: 0.6rem;
            }

            [${CARD_ATTRIBUTE}] .nbps-badge {
                align-items: center;
                background: rgba(34, 197, 94, 0.12);
                border: 1px solid rgba(34, 197, 94, 0.45);
                border-radius: 999px;
                color: inherit;
                display: inline-flex;
                font-size: 0.68rem;
                font-weight: 700;
                gap: 0.3rem;
                line-height: 1.2;
                padding: 0.25rem 0.5rem;
            }

            [${CARD_ATTRIBUTE}] .nbps-badge-icon {
                display: block;
                flex: 0 0 auto;
                height: 1.05rem;
                overflow: visible;
                width: auto;
            }

            [${CARD_ATTRIBUTE}] .nbps-composition {
                background: rgba(127, 127, 127, 0.08);
                border-radius: 0.3rem;
                display: grid;
                gap: 0.4rem;
                margin-top: 0.6rem;
                padding: 0.55rem 0.65rem;
            }

            [${CARD_ATTRIBUTE}] .nbps-composition-summary {
                align-items: baseline;
                display: flex;
                flex-wrap: wrap;
                font-size: 0.72rem;
                gap: 0.35rem 0.6rem;
                justify-content: space-between;
            }

            [${CARD_ATTRIBUTE}] .nbps-composition-label {
                font-weight: 700;
                letter-spacing: 0.04em;
                opacity: 0.65;
                text-transform: uppercase;
            }

            [${CARD_ATTRIBUTE}] .nbps-composition-value {
                font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
                font-size: 0.72rem;
            }

            [${CARD_ATTRIBUTE}] .nbps-composition-track {
                background: rgba(127, 127, 127, 0.2);
                border-radius: 999px;
                height: 0.38rem;
                overflow: hidden;
            }

            [${CARD_ATTRIBUTE}] .nbps-composition-fill {
                background: linear-gradient(90deg, #16a34a, var(--nbps-accent));
                border-radius: inherit;
                height: 100%;
            }

            [${CARD_ATTRIBUTE}] .nbps-error {
                color: #b42318;
            }

            [${CARD_ATTRIBUTE}] .nbps-retry {
                background: transparent;
                border: 1px solid currentColor;
                border-radius: 0.3rem;
                color: inherit;
                cursor: pointer;
                font: inherit;
                font-size: 0.75rem;
                font-weight: 700;
                margin-top: 0.6rem;
                padding: 0.35rem 0.55rem;
            }

            [${CARD_ATTRIBUTE}] .nbps-retry:hover {
                background: rgba(127, 127, 127, 0.12);
            }

            [${CARD_ATTRIBUTE}] .nbps-title:focus-visible,
            [${CARD_ATTRIBUTE}] .nbps-retry:focus-visible {
                outline: 2px solid var(--nbps-accent);
                outline-offset: 2px;
            }

            #${ACCENT_DIALOG_ID} {
                --nbps-accent: ${DEFAULT_ACCENT_COLOR};
                background: Canvas;
                border: 1px solid rgba(127, 127, 127, 0.4);
                border-radius: 0.65rem;
                box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.35);
                color: CanvasText;
                color-scheme: light dark;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                max-width: calc(100vw - 2rem);
                padding: 1rem;
                width: 19rem;
            }

            #${ACCENT_DIALOG_ID}::backdrop {
                background: rgba(0, 0, 0, 0.45);
                backdrop-filter: blur(2px);
            }

            #${ACCENT_DIALOG_ID} form {
                display: grid;
                gap: 0.85rem;
                margin: 0;
            }

            #${ACCENT_DIALOG_ID} .nbps-accent-dialog-title {
                font-size: 1rem;
                margin: 0;
            }

            #${ACCENT_DIALOG_ID} label {
                display: grid;
                font-size: 0.8rem;
                font-weight: 700;
                gap: 0.4rem;
            }

            #${ACCENT_DIALOG_ID} input[type="color"] {
                background: transparent;
                border: 1px solid rgba(127, 127, 127, 0.45);
                border-radius: 0.4rem;
                box-sizing: border-box;
                cursor: pointer;
                height: 3rem;
                padding: 0.2rem;
                width: 100%;
            }

            #${ACCENT_DIALOG_ID} .nbps-accent-dialog-actions {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                justify-content: flex-end;
            }

            #${ACCENT_DIALOG_ID} button {
                background: transparent;
                border: 1px solid rgba(127, 127, 127, 0.55);
                border-radius: 0.35rem;
                color: inherit;
                cursor: pointer;
                font: inherit;
                font-size: 0.78rem;
                font-weight: 700;
                padding: 0.45rem 0.7rem;
            }

            #${ACCENT_DIALOG_ID} button[value="save"] {
                background: var(--nbps-accent);
                border-color: var(--nbps-accent);
                color: #fff;
            }

            #${ACCENT_DIALOG_ID} button:focus-visible,
            #${ACCENT_DIALOG_ID} input:focus-visible {
                outline: 2px solid var(--nbps-accent);
                outline-offset: 2px;
            }

            @media (prefers-color-scheme: dark) {
                [${CARD_ATTRIBUTE}] .nbps-error {
                    color: #ff8a80;
                }
            }

            @media (max-width: 34rem) {
                [${CARD_ATTRIBUTE}] .nbps-metrics {
                    grid-template-columns: minmax(0, 1fr);
                }
            }
        `;
        (document.head || document.documentElement).append(style);
    }

    function createElement(tagName, className, text) {
        const element = document.createElement(tagName);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }

    function normalizeAccentColor(value) {
        const color =
            typeof value === "string" ? value.trim().toLowerCase() : "";
        return /^#[\da-f]{6}$/u.test(color) ? color : DEFAULT_ACCENT_COLOR;
    }

    function getAccentColor() {
        return normalizeAccentColor(
            GM_getValue(ACCENT_COLOR_KEY, DEFAULT_ACCENT_COLOR)
        );
    }

    function applyAccentColor(element, color = getAccentColor()) {
        element.style.setProperty("--nbps-accent", color);
    }

    function applyAccentColorToUi(color) {
        document
            .querySelectorAll(`[${CARD_ATTRIBUTE}], #${ACCENT_DIALOG_ID}`)
            .forEach((element) => applyAccentColor(element, color));
    }

    function setAccentColor(color) {
        const normalizedColor = normalizeAccentColor(color);
        GM_setValue(ACCENT_COLOR_KEY, normalizedColor);
        applyAccentColorToUi(normalizedColor);
    }

    function createStatusIcon(iconName) {
        const markup = STATUS_ICON_MARKUP[iconName];
        if (!markup) return null;

        const parsed = new DOMParser().parseFromString(markup, "image/svg+xml");
        const icon = parsed.documentElement;
        if (icon.localName !== "svg") return null;

        icon.classList.add("nbps-badge-icon");
        icon.setAttribute("aria-hidden", "true");
        icon.setAttribute("focusable", "false");
        return document.importNode(icon, true);
    }

    function openAccentColorDialog() {
        addStyles();

        const existingDialog = document.getElementById(ACCENT_DIALOG_ID);
        if (existingDialog?.open) {
            existingDialog.querySelector('input[type="color"]')?.focus();
            return;
        }
        existingDialog?.remove();

        const currentColor = getAccentColor();
        const dialog = createElement("dialog");
        dialog.id = ACCENT_DIALOG_ID;
        dialog.setAttribute("aria-labelledby", `${ACCENT_DIALOG_ID}-title`);
        applyAccentColor(dialog, currentColor);

        const form = createElement("form");
        form.method = "dialog";

        const title = createElement(
            "h2",
            "nbps-accent-dialog-title",
            "Bundlephobia accent color"
        );
        title.id = `${ACCENT_DIALOG_ID}-title`;

        const label = createElement("label", null, "Choose an accent color");
        const input = createElement("input");
        input.type = "color";
        input.value = currentColor;
        input.setAttribute("aria-label", "Bundlephobia accent color");
        input.addEventListener("input", () =>
            applyAccentColorToUi(input.value)
        );
        label.append(input);

        const actions = createElement("div", "nbps-accent-dialog-actions");
        const reset = createElement("button", null, "Reset");
        reset.type = "submit";
        reset.value = "reset";
        const cancel = createElement("button", null, "Cancel");
        cancel.type = "submit";
        cancel.value = "cancel";
        const save = createElement("button", null, "Save");
        save.type = "submit";
        save.value = "save";
        actions.append(reset, cancel, save);
        form.append(title, label, actions);
        dialog.append(form);

        dialog.addEventListener(
            "close",
            () => {
                if (dialog.returnValue === "save") {
                    setAccentColor(input.value);
                } else if (dialog.returnValue === "reset") {
                    setAccentColor(DEFAULT_ACCENT_COLOR);
                } else {
                    applyAccentColorToUi(getAccentColor());
                }
                dialog.remove();
            },
            { once: true }
        );

        (document.body || document.documentElement).append(dialog);
        dialog.showModal();
        input.focus();
    }

    function createCard(details) {
        const card = createElement("section");
        card.dataset.pageKey = details.pageKey;
        card.setAttribute(CARD_ATTRIBUTE, "");
        card.setAttribute("aria-label", "Bundlephobia package size");
        applyAccentColor(card);

        const header = createElement("div", "nbps-header");
        const icon = createElement("img", "nbps-icon");
        icon.src = FAVICON_URL;
        icon.alt = "";
        icon.width = 26;
        icon.height = 26;
        icon.decoding = "async";
        icon.referrerPolicy = "no-referrer";
        icon.setAttribute("aria-hidden", "true");
        icon.addEventListener("error", () => icon.remove(), { once: true });

        const title = createElement("a", "nbps-title", "Bundlephobia size");
        title.href = details.bundlephobiaUrl;
        title.target = "_blank";
        title.rel = "noopener noreferrer nofollow";
        title.title = `Open ${details.packageSpec} on Bundlephobia`;

        const version = createElement(
            "span",
            "nbps-version",
            `v${details.packageVersion}`
        );
        version.title = details.packageSpec;
        header.append(icon, title, version);

        const content = createElement("div", "nbps-content");
        content.setAttribute("aria-live", "polite");
        content.setAttribute("aria-atomic", "true");
        card.append(header, content);

        return { card, content };
    }

    function formatSize(bytes) {
        if (!Number.isFinite(bytes) || bytes < 0) return "Unknown";

        const units = [
            "B",
            "kB",
            "MB",
            "GB",
        ];
        let value = bytes;
        let unitIndex = 0;

        while (value >= 1000 && unitIndex < units.length - 1) {
            value /= 1000;
            unitIndex += 1;
        }

        const maximumFractionDigits = unitIndex === 0 || value >= 100 ? 0 : 1;
        return `${new Intl.NumberFormat(undefined, {
            maximumFractionDigits,
        }).format(value)} ${units[unitIndex]}`;
    }

    function formatDownloadTime(seconds) {
        if (!Number.isFinite(seconds) || seconds < 0) return "Unknown";

        if (seconds < 0.0005) {
            return `${Math.round(seconds * 1_000_000)} μs`;
        }
        if (seconds < 0.5) {
            return `${Math.round(seconds * 1000)} ms`;
        }
        return `${new Intl.NumberFormat(undefined, {
            maximumFractionDigits: 1,
        }).format(seconds)} s`;
    }

    function getDownloadTimes(gzipSize) {
        const gzipKilobytes = gzipSize / 1024;
        return {
            emerging4G: gzipKilobytes / DOWNLOAD_SPEED_KBPS.emerging4G,
            slow3G: gzipKilobytes / DOWNLOAD_SPEED_KBPS.slow3G,
        };
    }

    function getSelfComposition(data) {
        if (!Array.isArray(data.dependencySizes)) return null;

        const dependencies = data.dependencySizes.filter(
            (dependency) =>
                dependency &&
                typeof dependency.name === "string" &&
                Number.isFinite(dependency.approximateSize) &&
                dependency.approximateSize >= 0
        );
        const totalApproximateSize = dependencies.reduce(
            (total, dependency) => total + dependency.approximateSize,
            0
        );
        const self = dependencies.find(
            (dependency) => dependency.name === data.name
        );
        if (!self || totalApproximateSize <= 0) return null;

        const ratio = self.approximateSize / totalApproximateSize;
        return {
            percent: ratio * 100,
            size: ratio * data.size,
        };
    }

    function dependencyBadgeLabel(count) {
        if (!Number.isFinite(count) || count < 0) return null;
        if (count === 0) return "No dependencies";
        return `${new Intl.NumberFormat().format(count)} ${
            count === 1 ? "dependency" : "dependencies"
        }`;
    }

    function showLoading(content, details) {
        const loading = createElement(
            "p",
            "nbps-loading",
            `Fetching bundle data for ${details.packageSpec}…`
        );
        content.replaceChildren(loading);
    }

    function createMetric(label, value, title) {
        const metric = createElement("span", "nbps-metric");
        if (title) metric.title = title;
        metric.append(
            createElement("span", "nbps-metric-label", label),
            createElement("strong", "nbps-metric-value", value)
        );
        return metric;
    }

    function createBadge(label, title, iconName) {
        const badge = createElement("span", "nbps-badge");
        const icon = createStatusIcon(iconName);
        if (icon) badge.append(icon);
        badge.append(document.createTextNode(label));
        badge.title = title;
        return badge;
    }

    function createBadges(data) {
        const badges = createElement("div", "nbps-badges");
        const isTreeShakeable = Boolean(
            data.hasJSModule || data.hasJSNext || data.isModuleType
        );

        if (isTreeShakeable) {
            badges.append(
                createBadge(
                    "Tree-shakable",
                    "Bundlephobia detected an ES module entry point.",
                    "treeShake"
                )
            );
        }

        if (data.hasSideEffects === false) {
            badges.append(
                createBadge(
                    "Side-effect free",
                    "Bundlephobia reports that the package is marked as side-effect free.",
                    "sideEffect"
                )
            );
        }

        const dependencyText = dependencyBadgeLabel(data.dependencyCount);
        if (dependencyText) {
            badges.append(
                createBadge(
                    dependencyText,
                    "Bundlephobia's bundled dependency count.",
                    "dependency"
                )
            );
        }

        return badges.childElementCount > 0 ? badges : null;
    }

    function createSelfComposition(data) {
        const composition = getSelfComposition(data);
        if (!composition) return null;

        const container = createElement("div", "nbps-composition");
        container.title =
            "Estimated from Bundlephobia's dependency contribution data.";

        const summary = createElement("div", "nbps-composition-summary");
        const label = createElement(
            "span",
            "nbps-composition-label",
            "Self composition"
        );
        const value = createElement(
            "strong",
            "nbps-composition-value",
            `${composition.percent.toFixed(1)}% · ~${formatSize(
                composition.size
            )}`
        );
        summary.append(label, value);

        const track = createElement("div", "nbps-composition-track");
        track.setAttribute("role", "progressbar");
        track.setAttribute("aria-label", "Package self composition");
        track.setAttribute("aria-valuemin", "0");
        track.setAttribute("aria-valuemax", "100");
        track.setAttribute("aria-valuenow", composition.percent.toFixed(1));

        const fill = createElement("div", "nbps-composition-fill");
        fill.style.width = `${Math.min(100, composition.percent)}%`;
        track.append(fill);
        container.append(summary, track);
        return container;
    }

    function showStats(content, data) {
        const downloadTimes = getDownloadTimes(data.gzip);
        const metrics = createElement("div", "nbps-metrics");
        metrics.append(
            createMetric("Minified", formatSize(data.size)),
            createMetric("Gzip", formatSize(data.gzip)),
            createMetric(
                "Slow 3G",
                formatDownloadTime(downloadTimes.slow3G),
                `Estimated at ${DOWNLOAD_SPEED_KBPS.slow3G} kB/s, excluding request latency.`
            ),
            createMetric(
                "Emerging 4G",
                formatDownloadTime(downloadTimes.emerging4G),
                `Estimated at ${DOWNLOAD_SPEED_KBPS.emerging4G} kB/s, excluding request latency.`
            )
        );

        const badges = createBadges(data);
        const composition = createSelfComposition(data);

        const details = createElement(
            "p",
            "nbps-details",
            `Bundlephobia analyzed v${data.version}`
        );
        content.replaceChildren(
            metrics,
            ...(badges ? [badges] : []),
            ...(composition ? [composition] : []),
            details
        );
    }

    function getFriendlyError(error) {
        if (error?.code === "UnsupportedPackageError") {
            return "No browser bundle data is available for this package.";
        }
        if (error?.code === "PackageNotFoundError") {
            return "Bundlephobia could not find this package version.";
        }
        if (error?.code === "TimeoutError") {
            return "Bundlephobia took too long to respond.";
        }
        if (error?.code === "NetworkError") {
            return "Could not reach Bundlephobia.";
        }
        return error instanceof Error
            ? error.message
            : "Could not load bundle size data.";
    }

    function showError(content, details, error) {
        const message = createElement(
            "p",
            "nbps-error",
            getFriendlyError(error)
        );
        const retry = createElement("button", "nbps-retry", "Retry");
        retry.type = "button";
        retry.addEventListener("click", () => {
            bundleStatsCache.delete(details.packageSpec);
            loadStats(content, details);
        });
        content.replaceChildren(message, retry);
    }

    function createRequestError(message, code) {
        const error = new Error(message);
        error.code = code;
        return error;
    }

    function parseResponse(response) {
        if (response.response && typeof response.response === "object") {
            return response.response;
        }

        const responseText = response.responseText || response.response;
        if (typeof responseText !== "string") return null;

        try {
            return JSON.parse(responseText);
        } catch {
            return null;
        }
    }

    function requestBundleStats(packageSpec) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                anonymous: true,
                url: `https://bundlephobia.com/api/size?package=${encodeURIComponent(
                    packageSpec
                )}`,
                responseType: "json",
                timeout: REQUEST_TIMEOUT_MS,
                headers: {
                    Accept: "application/json",
                },
                onload: (response) => {
                    const data = parseResponse(response);
                    if (response.status < 200 || response.status >= 300) {
                        reject(
                            createRequestError(
                                data?.error?.message ||
                                    `Bundlephobia returned HTTP ${response.status}.`,
                                data?.error?.code || "HttpError"
                            )
                        );
                        return;
                    }

                    if (
                        !data ||
                        !Number.isFinite(data.size) ||
                        !Number.isFinite(data.gzip) ||
                        typeof data.version !== "string"
                    ) {
                        reject(
                            createRequestError(
                                "Bundlephobia returned an unexpected response.",
                                "InvalidResponseError"
                            )
                        );
                        return;
                    }

                    resolve(data);
                },
                onabort: () => {
                    reject(
                        createRequestError(
                            "The Bundlephobia request was cancelled.",
                            "AbortError"
                        )
                    );
                },
                onerror: () => {
                    reject(
                        createRequestError(
                            "Could not reach Bundlephobia.",
                            "NetworkError"
                        )
                    );
                },
                ontimeout: () => {
                    reject(
                        createRequestError(
                            "Bundlephobia took too long to respond.",
                            "TimeoutError"
                        )
                    );
                },
            });
        });
    }

    function getBundleStats(packageSpec) {
        const cached = bundleStatsCache.get(packageSpec);
        if (cached) return cached;

        const request = requestBundleStats(packageSpec).catch((error) => {
            bundleStatsCache.delete(packageSpec);
            throw error;
        });
        bundleStatsCache.set(packageSpec, request);
        return request;
    }

    async function loadStats(content, details) {
        showLoading(content, details);

        try {
            const data = await getBundleStats(details.packageSpec);
            if (
                !content.isConnected ||
                content.closest(`[${CARD_ATTRIBUTE}]`)?.dataset.pageKey !==
                    details.pageKey
            ) {
                return;
            }
            showStats(content, data);
        } catch (error) {
            if (
                content.isConnected &&
                content.closest(`[${CARD_ATTRIBUTE}]`)?.dataset.pageKey ===
                    details.pageKey
            ) {
                showError(content, details, error);
            }
        }
    }

    function getCardPlacement() {
        const placement = GM_getValue(
            CARD_PLACEMENT_KEY,
            CARD_PLACEMENTS.bundlephobiaLink
        );
        return Object.values(CARD_PLACEMENTS).includes(placement)
            ? placement
            : CARD_PLACEMENTS.bundlephobiaLink;
    }

    function setCardPlacement(placement) {
        GM_setValue(CARD_PLACEMENT_KEY, placement);
        scheduleRender();
    }

    function registerMenuCommands() {
        GM_registerMenuCommand(
            "Bundlephobia: change accent color…",
            openAccentColorDialog
        );
        GM_registerMenuCommand("Bundlephobia: place below Unpacked Size", () =>
            setCardPlacement(CARD_PLACEMENTS.unpackedSize)
        );
        GM_registerMenuCommand("Bundlephobia: place by npm bundle link", () =>
            setCardPlacement(CARD_PLACEMENTS.bundlephobiaLink)
        );
    }

    function insertAfter(target, card, placement) {
        card.dataset.placement = placement;
        if (target.nextElementSibling !== card) {
            target.insertAdjacentElement("afterend", card);
        }
    }

    function insertCard(details, card) {
        if (getCardPlacement() === CARD_PLACEMENTS.unpackedSize) {
            const unpackedSizeHeading = findSidebarHeading(
                details.sidebar,
                "Unpacked Size"
            );
            const unpackedSizeSection = unpackedSizeHeading?.parentElement;
            if (unpackedSizeSection) {
                insertAfter(
                    unpackedSizeSection,
                    card,
                    CARD_PLACEMENTS.unpackedSize
                );
                return;
            }
        }

        const bundlephobiaLink = findBundlephobiaLink(details.sidebar);
        if (bundlephobiaLink) {
            insertAfter(
                bundlephobiaLink,
                card,
                CARD_PLACEMENTS.bundlephobiaLink
            );
            return;
        }

        const versionHeading = findSidebarHeading(details.sidebar, "Version");
        const versionSection = versionHeading?.parentElement;
        if (versionSection) {
            insertAfter(versionSection, card, "version-fallback");
            return;
        }

        card.dataset.placement = "sidebar-fallback";
        if (details.sidebar.lastElementChild !== card) {
            details.sidebar.append(card);
        }
    }

    function render() {
        const details = getPageDetails();
        if (!details) return;

        addStyles();
        const existingCard = details.sidebar.querySelector(
            `[${CARD_ATTRIBUTE}]`
        );
        if (existingCard?.dataset.pageKey === details.pageKey) {
            insertCard(details, existingCard);
            return;
        }
        existingCard?.remove();

        const { card, content } = createCard(details);
        insertCard(details, card);
        loadStats(content, details);
    }

    function scheduleRender() {
        if (renderQueued) return;
        renderQueued = true;
        window.requestAnimationFrame(() => {
            renderQueued = false;
            render();
        });
    }

    registerMenuCommands();

    const observer = new MutationObserver(scheduleRender);
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });

    window.addEventListener("pageshow", scheduleRender);
    window.addEventListener("popstate", scheduleRender);
    scheduleRender();
})();
