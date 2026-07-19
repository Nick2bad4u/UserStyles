// ==UserScript==
// @name         NPM - Bundlephobia Package Size
// @namespace    nick2bad4u.github.io
// @version      2.0.0
// @description  Shows exact-version minified and gzip bundle sizes from Bundlephobia on npm package pages.
// @author       Nick2bad4u (modern fork of dutzi's original script)
// @license      MIT
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @source       https://greasyfork.org/scripts/436941-npm-package-size-from-bundlephobia
// @icon         https://www.google.com/s2/favicons?sz=64&domain=npmjs.com
// @match        https://www.npmjs.com/package/*
// @match        https://npmjs.com/package/*
// @run-at       document-idle
// @connect      bundlephobia.com
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

    const CARD_ATTRIBUTE = "data-npm-bundlephobia-size";
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
                --nbps-accent: #cb3837;
                background: rgba(127, 127, 127, 0.055);
                border: 1px solid rgba(127, 127, 127, 0.28);
                border-left: 3px solid var(--nbps-accent);
                border-radius: 0.4rem;
                box-sizing: border-box;
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

            [${CARD_ATTRIBUTE}] .nbps-mark {
                align-items: center;
                background: var(--nbps-accent);
                border-radius: 0.3rem;
                color: #fff;
                display: inline-flex;
                flex: 0 0 auto;
                font-size: 0.65rem;
                font-weight: 800;
                height: 1.65rem;
                justify-content: center;
                letter-spacing: -0.04em;
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

    function createCard(details) {
        const card = createElement("section");
        card.dataset.pageKey = details.pageKey;
        card.setAttribute(CARD_ATTRIBUTE, "");
        card.setAttribute("aria-label", "Bundlephobia package size");

        const header = createElement("div", "nbps-header");
        const mark = createElement("span", "nbps-mark", "BP");
        mark.setAttribute("aria-hidden", "true");

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
        header.append(mark, title, version);

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

    function dependencyLabel(count) {
        if (!Number.isFinite(count)) return "dependency count unavailable";
        return `${new Intl.NumberFormat().format(count)} bundled ${
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

    function createMetric(label, value) {
        const metric = createElement("span", "nbps-metric");
        metric.append(
            createElement("span", "nbps-metric-label", label),
            createElement("strong", "nbps-metric-value", value)
        );
        return metric;
    }

    function showStats(content, data) {
        const metrics = createElement("div", "nbps-metrics");
        metrics.append(
            createMetric("Minified", formatSize(data.size)),
            createMetric("Gzip", formatSize(data.gzip))
        );

        const details = createElement(
            "p",
            "nbps-details",
            `Bundlephobia analyzed v${data.version} · ${dependencyLabel(
                data.dependencyCount
            )}`
        );
        content.replaceChildren(metrics, details);
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

    function insertCard(details, card) {
        const bundlephobiaLink = findBundlephobiaLink(details.sidebar);
        if (bundlephobiaLink) {
            bundlephobiaLink.insertAdjacentElement("afterend", card);
            return;
        }

        const versionHeading = findSidebarHeading(details.sidebar, "Version");
        const versionSection = versionHeading?.parentElement;
        if (versionSection) {
            versionSection.insertAdjacentElement("afterend", card);
            return;
        }

        details.sidebar.append(card);
    }

    function render() {
        const details = getPageDetails();
        if (!details) return;

        addStyles();
        const existingCard = details.sidebar.querySelector(
            `[${CARD_ATTRIBUTE}]`
        );
        if (existingCard?.dataset.pageKey === details.pageKey) return;
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

    const observer = new MutationObserver(scheduleRender);
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });

    window.addEventListener("pageshow", scheduleRender);
    window.addEventListener("popstate", scheduleRender);
    scheduleRender();
})();
