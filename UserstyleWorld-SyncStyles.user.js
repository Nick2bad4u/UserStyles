// ==UserScript==
// @name         UserStyles.world Mirror Sync
// @namespace    nick2bad4u.github.io
// @version      3.0.0
// @description  Select and safely refresh GitHub mirrors for styles visible on UserStyles.world.
// @author       Nick2bad4u
// @license      UnLicense
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @icon         https://userstyles.world/mascot.svg
// @match        https://userstyles.world/user/*
// @grant        none
// @noframes
// @run-at       document-idle
// @downloadURL  https://update.greasyfork.org/scripts/524688/Userstyle%20World%20-%20Auto%20Sync%20UserStyles%20with%20Selection%20UI.user.js
// @updateURL    https://update.greasyfork.org/scripts/524688/Userstyle%20World%20-%20Auto%20Sync%20UserStyles%20with%20Selection%20UI.meta.js
// ==/UserScript==

(function () {
    "use strict";

    const UI_HOST_ID = "usw-mirror-sync";
    const COLLAPSED_STORAGE_KEY = `${UI_HOST_ID}:collapsed`;
    const STYLE_PATH_PATTERN = /^\/style\/(\d+)(?:\/|$)/u;

    const UI_CSS = `
		:host {
			--usw-accent: #5b5ce2;
			--usw-accent-hover: #494aca;
			--usw-accent-soft: #ededff;
			--usw-border: #d9deea;
			--usw-danger: #c2414b;
			--usw-danger-soft: #fff0f1;
			--usw-muted: #667085;
			--usw-panel: #ffffff;
			--usw-shadow: 0 24px 70px rgb(15 23 42 / 20%), 0 8px 24px rgb(15 23 42 / 12%);
			--usw-success: #16825d;
			--usw-success-soft: #eaf8f2;
			--usw-surface: #f6f7fb;
			--usw-surface-hover: #eef0f7;
			--usw-text: #172033;
			all: initial;
			bottom: max(18px, env(safe-area-inset-bottom));
			color-scheme: light;
			font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
			position: fixed;
			right: max(18px, env(safe-area-inset-right));
			z-index: 2147483646;
		}

		:host([data-theme="dark"]) {
			--usw-accent: #8587ff;
			--usw-accent-hover: #9a9cff;
			--usw-accent-soft: #27294f;
			--usw-border: #35405a;
			--usw-danger: #ff8c95;
			--usw-danger-soft: #42262e;
			--usw-muted: #9aa7bd;
			--usw-panel: #111827;
			--usw-shadow: 0 28px 80px rgb(0 0 0 / 48%), 0 8px 28px rgb(0 0 0 / 32%);
			--usw-success: #5ed5a5;
			--usw-success-soft: #173b33;
			--usw-surface: #1a2334;
			--usw-surface-hover: #222e43;
			--usw-text: #f6f8fc;
			color-scheme: dark;
		}

		*,
		*::before,
		*::after {
			box-sizing: border-box;
		}

		button,
		input {
			font: inherit;
		}

		button {
			-webkit-tap-highlight-color: transparent;
		}

		[hidden] {
			display: none !important;
		}

		.panel {
			background:
				radial-gradient(circle at 92% 0%, color-mix(in srgb, var(--usw-accent) 12%, transparent), transparent 34%),
				var(--usw-panel);
			border: 1px solid var(--usw-border);
			border-radius: 20px;
			box-shadow: var(--usw-shadow);
			color: var(--usw-text);
			display: flex;
			flex-direction: column;
			max-height: min(720px, calc(100vh - 36px));
			overflow: hidden;
			width: min(408px, calc(100vw - 36px));
		}

		.header {
			align-items: center;
			border-bottom: 1px solid var(--usw-border);
			display: grid;
			gap: 12px;
			grid-template-columns: auto 1fr auto;
			padding: 16px 16px 14px;
		}

		.brand-mark,
		.launcher-mark {
			align-items: center;
			background: linear-gradient(145deg, var(--usw-accent), #7476f2);
			box-shadow: 0 7px 16px color-mix(in srgb, var(--usw-accent) 25%, transparent);
			color: #ffffff;
			display: inline-flex;
			font-weight: 750;
			justify-content: center;
		}

		.brand-mark {
			border-radius: 12px;
			font-size: 23px;
			height: 40px;
			line-height: 1;
			width: 40px;
		}

		.heading {
			min-width: 0;
		}

		.eyebrow {
			color: var(--usw-muted);
			display: block;
			font-size: 10px;
			font-weight: 750;
			letter-spacing: 0.12em;
			line-height: 1.3;
			margin-bottom: 2px;
			text-transform: uppercase;
		}

		.title {
			color: var(--usw-text);
			font-size: 17px;
			font-weight: 740;
			letter-spacing: -0.018em;
			line-height: 1.25;
			margin: 0;
		}

		.icon-button {
			align-items: center;
			background: transparent;
			border: 0;
			border-radius: 10px;
			color: var(--usw-muted);
			cursor: pointer;
			display: inline-flex;
			font-size: 22px;
			height: 36px;
			justify-content: center;
			line-height: 1;
			padding: 0;
			transition: background-color 140ms ease, color 140ms ease;
			width: 36px;
		}

		.icon-button:hover {
			background: var(--usw-surface-hover);
			color: var(--usw-text);
		}

		.content {
			display: flex;
			flex: 1;
			flex-direction: column;
			min-height: 0;
			padding: 16px;
		}

		.intro {
			color: var(--usw-muted);
			font-size: 12.5px;
			line-height: 1.55;
			margin: 0 0 13px;
		}

		.toolbar {
			display: grid;
			gap: 8px;
			grid-template-columns: minmax(0, 1fr) auto auto;
		}

		.search-wrap {
			position: relative;
		}

		.search-icon {
			color: var(--usw-muted);
			font-size: 15px;
			left: 11px;
			line-height: 1;
			pointer-events: none;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}

		.search {
			background: var(--usw-surface);
			border: 1px solid var(--usw-border);
			border-radius: 11px;
			color: var(--usw-text);
			font-size: 13px;
			height: 38px;
			outline: none;
			padding: 0 11px 0 34px;
			transition: border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease;
			width: 100%;
		}

		.search::placeholder {
			color: var(--usw-muted);
			opacity: 0.9;
		}

		.search:focus {
			background: var(--usw-panel);
			border-color: var(--usw-accent);
			box-shadow: 0 0 0 3px color-mix(in srgb, var(--usw-accent) 17%, transparent);
		}

		.small-button {
			background: var(--usw-surface);
			border: 1px solid var(--usw-border);
			border-radius: 11px;
			color: var(--usw-text);
			cursor: pointer;
			font-size: 12px;
			font-weight: 700;
			height: 38px;
			padding: 0 11px;
			transition: background-color 140ms ease, border-color 140ms ease;
		}

		.small-button:hover:not(:disabled) {
			background: var(--usw-surface-hover);
			border-color: color-mix(in srgb, var(--usw-border) 55%, var(--usw-accent));
		}

		.summary {
			align-items: center;
			color: var(--usw-muted);
			display: flex;
			font-size: 11.5px;
			font-weight: 650;
			justify-content: space-between;
			letter-spacing: 0.01em;
			padding: 11px 2px 8px;
		}

		.selected-count {
			color: var(--usw-accent);
		}

		.style-list {
			border: 1px solid var(--usw-border);
			border-radius: 14px;
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;
			gap: 3px;
			max-height: min(320px, 38vh);
			min-height: 92px;
			overflow-y: auto;
			overscroll-behavior: contain;
			padding: 5px;
			scrollbar-color: var(--usw-border) transparent;
			scrollbar-width: thin;
		}

		.style-item {
			align-items: center;
			border: 1px solid transparent;
			border-radius: 10px;
			cursor: pointer;
			display: grid;
			gap: 10px;
			grid-template-columns: auto minmax(0, 1fr) auto;
			min-height: 50px;
			padding: 7px 8px;
			transition: background-color 130ms ease, border-color 130ms ease;
		}

		.style-item:hover {
			background: var(--usw-surface);
		}

		.style-item:has(input:checked) {
			background: var(--usw-accent-soft);
			border-color: color-mix(in srgb, var(--usw-accent) 40%, transparent);
		}

		.style-item[data-state="success"] {
			background: var(--usw-success-soft);
		}

		.style-item[data-state="error"] {
			background: var(--usw-danger-soft);
		}

		.style-checkbox {
			accent-color: var(--usw-accent);
			cursor: pointer;
			height: 17px;
			margin: 0;
			width: 17px;
		}

		.style-copy {
			display: block;
			min-width: 0;
		}

		.style-name {
			color: var(--usw-text);
			display: block;
			font-size: 12.5px;
			font-weight: 660;
			line-height: 1.35;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.style-id {
			color: var(--usw-muted);
			display: block;
			font-size: 10.5px;
			line-height: 1.35;
			margin-top: 2px;
		}

		.item-state {
			color: var(--usw-muted);
			font-size: 10.5px;
			font-weight: 700;
			min-width: 44px;
			text-align: right;
		}

		.item-detail {
			color: var(--usw-danger);
			display: block;
			font-size: 10.5px;
			line-height: 1.35;
			margin-top: 4px;
		}

		.style-item[data-state="syncing"] .item-state,
		.style-item[data-state="queued"] .item-state {
			color: var(--usw-accent);
		}

		.style-item[data-state="success"] .item-state {
			color: var(--usw-success);
		}

		.style-item[data-state="error"] .item-state {
			color: var(--usw-danger);
		}

		.empty {
			color: var(--usw-muted);
			font-size: 12px;
			margin: auto;
			padding: 20px;
			text-align: center;
		}

		.progress-wrap {
			margin-top: 12px;
		}

		.progress-meta {
			align-items: center;
			color: var(--usw-muted);
			display: flex;
			font-size: 10.5px;
			font-weight: 650;
			justify-content: space-between;
			margin-bottom: 6px;
		}

		.progress {
			accent-color: var(--usw-accent);
			display: block;
			height: 7px;
			width: 100%;
		}

		.actions {
			display: grid;
			gap: 8px;
			grid-template-columns: 1fr;
			margin-top: 12px;
		}

		.actions.has-cancel {
			grid-template-columns: minmax(0, 1fr) auto;
		}

		.primary-button,
		.cancel-button {
			border-radius: 12px;
			cursor: pointer;
			font-size: 13px;
			font-weight: 730;
			height: 42px;
			padding: 0 15px;
			transition: background-color 140ms ease, box-shadow 140ms ease, opacity 140ms ease, transform 140ms ease;
		}

		.primary-button {
			background: linear-gradient(135deg, var(--usw-accent), color-mix(in srgb, var(--usw-accent) 78%, #3234a5));
			border: 1px solid transparent;
			box-shadow: 0 8px 18px color-mix(in srgb, var(--usw-accent) 24%, transparent);
			color: #ffffff;
		}

		.primary-button:hover:not(:disabled) {
			background: var(--usw-accent-hover);
			transform: translateY(-1px);
		}

		.cancel-button {
			background: var(--usw-surface);
			border: 1px solid var(--usw-border);
			color: var(--usw-text);
		}

		.cancel-button:hover:not(:disabled) {
			background: var(--usw-surface-hover);
		}

		button:disabled,
		input:disabled {
			cursor: not-allowed;
			opacity: 0.52;
		}

		.status {
			color: var(--usw-muted);
			font-size: 11.5px;
			line-height: 1.45;
			margin: 10px 2px 0;
			min-height: 17px;
		}

		.status[data-tone="success"] {
			color: var(--usw-success);
		}

		.status[data-tone="error"] {
			color: var(--usw-danger);
		}

		.status[data-tone="active"] {
			color: var(--usw-accent);
		}

		.launcher {
			align-items: center;
			background: var(--usw-panel);
			border: 1px solid var(--usw-border);
			border-radius: 999px;
			box-shadow: var(--usw-shadow);
			color: var(--usw-text);
			cursor: pointer;
			display: inline-flex;
			gap: 9px;
			height: 50px;
			padding: 5px 14px 5px 5px;
			transition: border-color 140ms ease, transform 140ms ease;
		}

		.launcher:hover {
			border-color: color-mix(in srgb, var(--usw-border) 45%, var(--usw-accent));
			transform: translateY(-2px);
		}

		.launcher-mark {
			border-radius: 50%;
			font-size: 20px;
			height: 38px;
			width: 38px;
		}

		.launcher-copy {
			display: flex;
			flex-direction: column;
			line-height: 1.15;
			text-align: left;
		}

		.launcher-title {
			font-size: 12px;
			font-weight: 740;
		}

		.launcher-count {
			color: var(--usw-muted);
			font-size: 10px;
			margin-top: 2px;
		}

		.sr-only {
			clip: rect(0, 0, 0, 0);
			clip-path: inset(50%);
			height: 1px;
			overflow: hidden;
			position: absolute;
			white-space: nowrap;
			width: 1px;
		}

		button:focus-visible,
		input:focus-visible,
		.style-item:has(input:focus-visible) {
			outline: 3px solid color-mix(in srgb, var(--usw-accent) 38%, transparent);
			outline-offset: 2px;
		}

		@media (max-width: 480px) {
			:host {
				bottom: max(10px, env(safe-area-inset-bottom));
				left: max(10px, env(safe-area-inset-left));
				right: max(10px, env(safe-area-inset-right));
			}

			.panel {
				max-height: calc(100vh - 20px - env(safe-area-inset-bottom));
				width: 100%;
			}

			.launcher {
				float: right;
			}

			.style-list {
				max-height: 36vh;
			}
		}

		@media (prefers-reduced-motion: reduce) {
			*,
			*::before,
			*::after {
				scroll-behavior: auto !important;
				transition-duration: 0.01ms !important;
			}
		}
	`;

    class AuthenticationRequiredError extends Error {
        constructor() {
            super("Sign in to UserStyles.world before syncing mirrors.");
            this.name = "AuthenticationRequiredError";
        }
    }

    function createElement(
        tagName,
        { attributes = {}, className = "", text = "" } = {}
    ) {
        const element = document.createElement(tagName);
        if (className) {
            element.className = className;
        }
        if (text) {
            element.textContent = text;
        }
        for (const [name, value] of Object.entries(attributes)) {
            element.setAttribute(name, value);
        }
        return element;
    }

    function getStyleID(href) {
        try {
            const url = new URL(href, window.location.href);
            if (url.origin !== window.location.origin) {
                return null;
            }
            return STYLE_PATH_PATTERN.exec(url.pathname)?.[1] ?? null;
        } catch {
            return null;
        }
    }

    function collectStyles() {
        const styles = new Map();
        const cards = document.querySelectorAll(".card");

        for (const card of cards) {
            const links = card.querySelectorAll('a[href*="/style/"]');
            for (const link of links) {
                const id = getStyleID(link.getAttribute("href"));
                if (!id || styles.has(id)) {
                    continue;
                }

                const nameLink = card.querySelector('a.name[href*="/style/"]');
                const ariaName = link
                    .getAttribute("aria-label")
                    ?.replace(/\s+screenshot$/iu, "")
                    .trim();
                const name =
                    nameLink?.textContent?.trim() || ariaName || `Style ${id}`;
                styles.set(id, { id, name });
                break;
            }
        }

        return [...styles.values()];
    }

    function normalizeProfilePath(pathname) {
        const match = /^\/user\/[^/]+\/?$/u.exec(pathname);
        return match ? pathname.replace(/\/$/u, "") : null;
    }

    function isOwnProfilePage() {
        const currentProfile = normalizeProfilePath(window.location.pathname);
        const accountLink = document.querySelector(
            'nav.navbar .menu a[href^="/user/"]'
        );
        if (!currentProfile || !accountLink) {
            return false;
        }

        try {
            const accountURL = new URL(
                accountLink.getAttribute("href"),
                window.location.href
            );
            return normalizeProfilePath(accountURL.pathname) === currentProfile;
        } catch {
            return false;
        }
    }

    function getPageTheme() {
        const explicitTheme = document.documentElement.dataset.colorScheme;
        if (explicitTheme === "light" || explicitTheme === "dark") {
            return explicitTheme;
        }
        return window.matchMedia?.("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    function getCollapsedPreference() {
        try {
            return (
                window.localStorage.getItem(COLLAPSED_STORAGE_KEY) === "true"
            );
        } catch {
            return false;
        }
    }

    function saveCollapsedPreference(collapsed) {
        try {
            window.localStorage.setItem(
                COLLAPSED_STORAGE_KEY,
                String(collapsed)
            );
        } catch {
            // The panel still works when storage is blocked.
        }
    }

    function formatStyleCount(count) {
        return `${count} ${count === 1 ? "style" : "styles"}`;
    }

    function getErrorMessage(error) {
        return error instanceof Error ? error.message : String(error);
    }

    async function refreshMirror(styleID, signal) {
        const response = await fetch(`/mirror/${encodeURIComponent(styleID)}`, {
            cache: "no-store",
            credentials: "same-origin",
            redirect: "follow",
            signal,
        });
        const finalURL = response.url
            ? new URL(response.url, window.location.href)
            : null;
        if (finalURL?.pathname === "/signin") {
            throw new AuthenticationRequiredError();
        }
        if (!response.ok) {
            const detail = response.statusText ? ` ${response.statusText}` : "";
            throw new Error(
                `Mirror request failed with HTTP ${response.status}${detail}.`
            );
        }
        if (finalURL && getStyleID(finalURL.href) === styleID) {
            return;
        }

        let serverMessage = "";
        if (typeof response.text === "function") {
            const responseText = await response.text();
            const errorPage = new DOMParser().parseFromString(
                responseText,
                "text/html"
            );
            serverMessage =
                errorPage
                    .querySelector("main h1, main h2")
                    ?.textContent?.trim() ||
                errorPage.title
                    .replace(/\s+[—-]\s+UserStyles\.world$/u, "")
                    .trim();
        }
        if (serverMessage) {
            throw new Error(serverMessage);
        }
        throw new Error("UserStyles.world did not confirm the mirror refresh.");
    }

    class MirrorSyncPanel {
        constructor(styles) {
            this.styles = styles;
            this.items = new Map();
            this.lastChecked = null;
            this.controller = null;
            this.running = false;
            this.themeObserver = null;
            this.elements = {};
        }

        mount() {
            this.host = createElement("div", {
                attributes: { id: UI_HOST_ID },
            });
            this.shadow = this.host.attachShadow({ mode: "open" });
            this.buildUI();
            this.renderStyles();
            this.syncTheme();
            document.body.append(this.host);
            this.setCollapsed(getCollapsedPreference(), false, false);
            this.setStatus(
                "Choose the visible styles whose GitHub mirrors should be refreshed."
            );

            this.themeObserver = new MutationObserver(() => this.syncTheme());
            this.themeObserver.observe(document.documentElement, {
                attributeFilter: ["data-color-scheme"],
                attributes: true,
            });
        }

        buildUI() {
            const stylesheet = createElement("style", { text: UI_CSS });
            const panel = createElement("section", {
                attributes: {
                    "aria-labelledby": "usw-sync-title",
                    id: "usw-sync-panel",
                },
                className: "panel",
            });
            const header = createElement("header", { className: "header" });
            const brandMark = createElement("span", {
                attributes: { "aria-hidden": "true" },
                className: "brand-mark",
                text: "↻",
            });
            const heading = createElement("div", { className: "heading" });
            heading.append(
                createElement("span", {
                    className: "eyebrow",
                    text: "UserStyles.world",
                }),
                createElement("h2", {
                    attributes: { id: "usw-sync-title" },
                    className: "title",
                    text: "Mirror sync",
                })
            );
            const collapseButton = createElement("button", {
                attributes: {
                    "aria-controls": "usw-sync-panel",
                    "aria-expanded": "true",
                    "aria-label": "Minimize mirror sync",
                    type: "button",
                },
                className: "icon-button",
                text: "−",
            });
            collapseButton.addEventListener("click", () =>
                this.setCollapsed(true)
            );
            header.append(brandMark, heading, collapseButton);

            const content = createElement("div", { className: "content" });
            content.append(
                createElement("p", {
                    className: "intro",
                    text: "Refresh the GitHub mirror for styles listed on this page. Requests run one at a time, and each style has a one-hour cooldown.",
                })
            );

            const toolbar = createElement("div", { className: "toolbar" });
            const searchWrap = createElement("div", {
                className: "search-wrap",
            });
            const searchLabel = createElement("label", {
                attributes: { for: "usw-sync-search" },
                className: "sr-only",
                text: "Filter styles",
            });
            const searchIcon = createElement("span", {
                attributes: { "aria-hidden": "true" },
                className: "search-icon",
                text: "⌕",
            });
            const search = createElement("input", {
                attributes: {
                    autocomplete: "off",
                    id: "usw-sync-search",
                    placeholder: "Filter styles…",
                    type: "search",
                },
                className: "search",
            });
            search.addEventListener("input", () => this.applyFilter());
            searchWrap.append(searchLabel, searchIcon, search);

            const selectAllButton = createElement("button", {
                attributes: {
                    "aria-label": "Select all visible styles",
                    title: "Select all filtered styles",
                    type: "button",
                },
                className: "small-button",
                text: "All",
            });
            selectAllButton.addEventListener("click", () =>
                this.selectVisible(true)
            );
            const selectNoneButton = createElement("button", {
                attributes: {
                    "aria-label": "Clear all visible styles",
                    title: "Clear all filtered styles",
                    type: "button",
                },
                className: "small-button",
                text: "None",
            });
            selectNoneButton.addEventListener("click", () =>
                this.selectVisible(false)
            );
            toolbar.append(searchWrap, selectAllButton, selectNoneButton);

            const summary = createElement("div", { className: "summary" });
            const selectedCount = createElement("span", {
                className: "selected-count",
                text: "0 selected",
            });
            const visibleCount = createElement("span", {
                className: "visible-count",
            });
            summary.append(selectedCount, visibleCount);

            const list = createElement("div", {
                attributes: {
                    "aria-label": "Styles available to sync",
                    role: "group",
                },
                className: "style-list",
            });
            const empty = createElement("p", {
                className: "empty",
                text: "No styles match this filter.",
            });
            empty.hidden = true;
            list.append(empty);

            const progressWrap = createElement("div", {
                className: "progress-wrap",
            });
            progressWrap.hidden = true;
            const progressMeta = createElement("div", {
                className: "progress-meta",
            });
            const progressLabel = createElement("span", {
                text: "Refresh progress",
            });
            const progressCount = createElement("span", { text: "0 / 0" });
            progressMeta.append(progressLabel, progressCount);
            const progress = createElement("progress", {
                attributes: {
                    "aria-label": "Mirror sync progress",
                    max: "1",
                    value: "0",
                },
                className: "progress",
            });
            progressWrap.append(progressMeta, progress);

            const actions = createElement("div", { className: "actions" });
            const syncButton = createElement("button", {
                attributes: { type: "button" },
                className: "primary-button",
                text: "Select styles to refresh",
            });
            syncButton.disabled = true;
            syncButton.addEventListener(
                "click",
                () => void this.syncSelected()
            );
            const cancelButton = createElement("button", {
                attributes: { type: "button" },
                className: "cancel-button",
                text: "Cancel",
            });
            cancelButton.hidden = true;
            cancelButton.addEventListener("click", () => this.cancelSync());
            actions.append(syncButton, cancelButton);

            const status = createElement("p", {
                attributes: { "aria-live": "polite", role: "status" },
                className: "status",
            });
            content.append(
                toolbar,
                summary,
                list,
                progressWrap,
                actions,
                status
            );
            panel.append(header, content);

            const launcher = createElement("button", {
                attributes: {
                    "aria-controls": "usw-sync-panel",
                    "aria-expanded": "false",
                    type: "button",
                },
                className: "launcher",
            });
            const launcherMark = createElement("span", {
                attributes: { "aria-hidden": "true" },
                className: "launcher-mark",
                text: "↻",
            });
            const launcherCopy = createElement("span", {
                className: "launcher-copy",
            });
            launcherCopy.append(
                createElement("span", {
                    className: "launcher-title",
                    text: "Mirror sync",
                }),
                createElement("span", {
                    className: "launcher-count",
                    text: `${formatStyleCount(this.styles.length)} found`,
                })
            );
            launcher.append(launcherMark, launcherCopy);
            launcher.addEventListener("click", () => this.setCollapsed(false));

            this.shadow.append(stylesheet, panel, launcher);
            this.elements = {
                actions,
                cancelButton,
                collapseButton,
                empty,
                launcher,
                list,
                panel,
                progress,
                progressCount,
                progressWrap,
                search,
                selectAllButton,
                selectedCount,
                selectNoneButton,
                status,
                syncButton,
                visibleCount,
            };
        }

        renderStyles() {
            for (const style of this.styles) {
                const row = createElement("label", {
                    attributes: { "data-state": "idle" },
                    className: "style-item",
                });
                const checkbox = createElement("input", {
                    attributes: {
                        "aria-describedby": `usw-sync-detail-${style.id}`,
                        type: "checkbox",
                        value: style.id,
                    },
                    className: "style-checkbox",
                });
                checkbox.addEventListener("click", (event) =>
                    this.handleCheckboxClick(event)
                );
                const copy = createElement("span", { className: "style-copy" });
                const itemDetail = createElement("span", {
                    attributes: { id: `usw-sync-detail-${style.id}` },
                    className: "item-detail",
                });
                itemDetail.hidden = true;
                copy.append(
                    createElement("span", {
                        className: "style-name",
                        text: style.name,
                    }),
                    createElement("span", {
                        className: "style-id",
                        text: `Style #${style.id}`,
                    }),
                    itemDetail
                );
                const itemState = createElement("span", {
                    className: "item-state",
                    text: "Ready",
                });
                row.append(checkbox, copy, itemState);
                this.elements.list.insertBefore(row, this.elements.empty);
                this.items.set(style.id, {
                    checkbox,
                    itemDetail,
                    itemState,
                    row,
                    style,
                });
            }
            this.applyFilter();
        }

        syncTheme() {
            this.host.dataset.theme = getPageTheme();
        }

        setCollapsed(collapsed, persist = true, moveFocus = true) {
            this.elements.panel.hidden = collapsed;
            this.elements.launcher.hidden = !collapsed;
            this.elements.collapseButton.setAttribute(
                "aria-expanded",
                String(!collapsed)
            );
            this.elements.launcher.setAttribute(
                "aria-expanded",
                String(!collapsed)
            );
            if (persist) {
                saveCollapsedPreference(collapsed);
            }
            if (moveFocus) {
                const focusTarget = collapsed
                    ? this.elements.launcher
                    : this.elements.search;
                focusTarget.focus({ preventScroll: true });
            }
        }

        getVisibleItems() {
            return [...this.items.values()].filter(({ row }) => !row.hidden);
        }

        applyFilter() {
            const query = this.elements.search.value.trim().toLocaleLowerCase();
            let visible = 0;
            for (const item of this.items.values()) {
                const matches =
                    !query ||
                    `${item.style.name} ${item.style.id}`
                        .toLocaleLowerCase()
                        .includes(query);
                item.row.hidden = !matches;
                visible += Number(matches);
            }
            this.elements.empty.hidden = visible > 0;
            this.elements.visibleCount.textContent = `${visible} of ${this.styles.length} visible`;
            this.updateSelection();
        }

        handleCheckboxClick(event) {
            const checkbox = event.currentTarget;
            if (event.shiftKey && this.lastChecked) {
                const visibleItems = this.getVisibleItems();
                const currentIndex = visibleItems.findIndex(
                    (item) => item.checkbox === checkbox
                );
                const previousIndex = visibleItems.findIndex(
                    (item) => item.checkbox === this.lastChecked
                );
                if (currentIndex >= 0 && previousIndex >= 0) {
                    const start = Math.min(currentIndex, previousIndex);
                    const end = Math.max(currentIndex, previousIndex);
                    for (const item of visibleItems.slice(start, end + 1)) {
                        item.checkbox.checked = checkbox.checked;
                    }
                }
            }
            this.lastChecked = checkbox;
            this.updateSelection();
        }

        selectVisible(checked) {
            for (const { checkbox } of this.getVisibleItems()) {
                checkbox.checked = checked;
            }
            this.lastChecked = null;
            this.updateSelection();
        }

        updateSelection() {
            const selected = [...this.items.values()].filter(
                ({ checkbox }) => checkbox.checked
            );
            const visibleItems = this.getVisibleItems();
            this.elements.selectedCount.textContent = `${selected.length} selected`;
            this.elements.syncButton.disabled =
                this.running || selected.length === 0;
            this.elements.syncButton.textContent = selected.length
                ? `Refresh ${formatStyleCount(selected.length)}`
                : "Select styles to refresh";
            this.elements.selectAllButton.disabled =
                this.running || visibleItems.length === 0;
            this.elements.selectNoneButton.disabled =
                this.running ||
                !visibleItems.some(({ checkbox }) => checkbox.checked);
        }

        setItemState(item, state, label, detail = "") {
            item.row.dataset.state = state;
            item.itemState.textContent = label;
            item.itemDetail.textContent = detail;
            item.itemDetail.hidden = !detail;
        }

        setStatus(message, tone = "") {
            this.elements.status.textContent = message;
            if (tone) {
                this.elements.status.dataset.tone = tone;
            } else {
                delete this.elements.status.dataset.tone;
            }
        }

        setRunning(running) {
            this.running = running;
            this.elements.panel.setAttribute("aria-busy", String(running));
            this.elements.search.disabled = running;
            for (const { checkbox } of this.items.values()) {
                checkbox.disabled = running;
            }
            this.elements.cancelButton.hidden = !running;
            this.elements.cancelButton.disabled = false;
            this.elements.actions.classList.toggle("has-cancel", running);
            this.updateSelection();
        }

        cancelSync() {
            if (!this.controller || this.controller.signal.aborted) {
                return;
            }
            this.elements.cancelButton.disabled = true;
            this.setStatus("Stopping the refresh…", "active");
            this.controller.abort();
        }

        async syncSelected() {
            if (this.running) {
                return;
            }

            const selectedItems = [...this.items.values()].filter(
                ({ checkbox }) => checkbox.checked
            );
            if (selectedItems.length === 0) {
                return;
            }

            this.controller = new AbortController();
            const { signal } = this.controller;
            let completed = 0;
            let failures = 0;
            let successes = 0;
            let authenticationRequired = false;
            this.setRunning(true);
            this.elements.progressWrap.hidden = false;
            this.elements.progress.max = selectedItems.length;
            this.elements.progress.value = 0;
            this.elements.progressCount.textContent = `0 / ${selectedItems.length}`;

            for (const item of selectedItems) {
                this.setItemState(item, "queued", "Queued");
            }

            for (const item of selectedItems) {
                if (signal.aborted) {
                    break;
                }

                this.setItemState(item, "syncing", "Requesting");
                this.setStatus(
                    `Requesting ${completed + 1} of ${selectedItems.length}: ${item.style.name}`,
                    "active"
                );

                try {
                    await refreshMirror(item.style.id, signal);
                    successes += 1;
                    item.checkbox.checked = false;
                    this.setItemState(item, "success", "Requested");
                } catch (error) {
                    if (signal.aborted) {
                        this.setItemState(item, "idle", "Ready");
                        break;
                    }

                    failures += 1;
                    const message = getErrorMessage(error);
                    this.setItemState(item, "error", "Failed", message);
                    console.error(
                        `[Mirror Sync] Style ${item.style.id}: ${message}`,
                        error
                    );
                    if (error instanceof AuthenticationRequiredError) {
                        authenticationRequired = true;
                    }
                } finally {
                    if (!signal.aborted) {
                        completed += 1;
                        this.elements.progress.value = completed;
                        this.elements.progressCount.textContent = `${completed} / ${selectedItems.length}`;
                    }
                }

                if (authenticationRequired) {
                    break;
                }
            }

            for (const item of selectedItems) {
                if (item.row.dataset.state === "queued") {
                    this.setItemState(item, "idle", "Ready");
                }
            }

            const canceled = signal.aborted;
            const remaining = selectedItems.length - completed;
            this.controller = null;
            this.setRunning(false);
            this.lastChecked = null;

            if (canceled) {
                this.setStatus(
                    `Refresh stopped. ${successes} accepted, ${failures} failed, and ${remaining} not completed.`,
                    failures > 0 ? "error" : ""
                );
            } else if (authenticationRequired) {
                this.setStatus(
                    `Sign in to UserStyles.world, then retry. ${successes} accepted, ${failures} failed, and ${remaining} not attempted.`,
                    "error"
                );
            } else if (failures > 0) {
                this.setStatus(
                    `Finished with ${successes} accepted and ${failures} failed. Failed styles remain selected for retry.`,
                    "error"
                );
            } else {
                this.setStatus(
                    `Refresh requested for ${formatStyleCount(successes)}.`,
                    "success"
                );
            }
        }
    }

    function initialize() {
        if (document.getElementById(UI_HOST_ID) || !isOwnProfilePage()) {
            return;
        }
        const styles = collectStyles();
        if (styles.length > 0) {
            new MirrorSyncPanel(styles).mount();
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, {
            once: true,
        });
    } else {
        initialize();
    }
})();
