// ==UserScript==
// @name         NPM - Related Package Links
// @namespace    nick2bad4u.github.io
// @version      1.4.1
// @description  Adds a configurable menu of useful package pages, security reports, size tools, trends, and CDNs.
// @author       Nick2bad4u
// @license      UnLicense
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @downloadURL  https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/NPM-Package-Mirror-Menu.user.js
// @updateURL    https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/NPM-Package-Mirror-Menu.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=npmjs.com
// @match        https://*.npmjs.com/package/*
// @run-at       document-idle
// @connect      app.unpkg.com
// @connect      arethetypeswrong.github.io
// @connect      avatars.githubusercontent.com
// @connect      bundlejs.com
// @connect      bundleinfo.com
// @connect      bundlecheck.dev
// @connect      bundlephobia.com
// @connect      deps.dev
// @connect      esm.sh
// @connect      esm.run
// @connect      ghub.io
// @connect      github.githubassets.com
// @connect      i.gyazo.com
// @connect      www.jsdocs.io
// @connect      libraries.io
// @connect      npm-compare.com
// @connect      npm-stat.com
// @connect      npm.anvaka.com
// @connect      npm.willow.sh
// @connect      npm.io
// @connect      npm.runkit.com
// @connect      npmcharts.com
// @connect      npmgraph.js.org
// @connect      npmsearch.com
// @connect      npmtrends.com
// @connect      npkg.lorypelli.dev
// @connect      npmdiff.dev
// @connect      npmmirror.com
// @connect      npms.io
// @connect      npmx.dev
// @connect      packagephobia.com
// @connect      packages.ecosyste.ms
// @connect      pkg-size.dev
// @connect      www.pkgpulse.com
// @connect      publint.dev
// @connect      security.snyk.io
// @connect      socket.dev
// @connect      topheman.github.io
// @connect      unpkg.com
// @connect      www.jsdelivr.com
// @connect      www.packfolio.dev
// @connect      www.paralect.com
// @connect      www.skypack.dev
// @connect      xnpmjs.com
// @connect      yarnpkg.com
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @noframes
// ==/UserScript==

(function () {
    "use strict";

    const PACKAGE_MIRRORS = [
        {
            id: "socket",
            category: "Package quality and security",
            label: "Socket",
            description: "Supply-chain security analysis",
            homepage: "https://socket.dev/",
            iconFallback: "SO",
            buildUrl: ({ packageName }) =>
                `https://socket.dev/npm/package/${packageName}`,
        },
        {
            id: "snyk-advisor",
            category: "Package quality and security",
            label: "Snyk",
            description: "Vulnerabilities, licenses, and package health",
            homepage: "https://security.snyk.io/",
            iconFallback: "SY",
            buildUrl: ({ encodedPackageName }) =>
                `https://security.snyk.io/package/npm/${encodedPackageName}`,
        },
        {
            id: "pkgpulse",
            category: "Package quality and security",
            label: "PkgPulse",
            description: "Package health, activity, size, and security signals",
            homepage: "https://www.pkgpulse.com/",
            iconFallback: "PP",
            buildUrl: ({ encodedPackageName }) =>
                `https://www.pkgpulse.com/packages/${encodedPackageName}`,
        },
        {
            id: "deps-dev",
            category: "Package quality and security",
            label: "deps.dev",
            description: "Dependencies, licenses, and advisories",
            iconUrl: "https://deps.dev/static/favicon.ico",
            homepage: "https://deps.dev/",
            iconFallback: "DD",
            buildUrl: ({ encodedPackageName }) =>
                `https://deps.dev/npm/${encodedPackageName}`,
        },
        {
            id: "publint",
            category: "Package quality and security",
            label: "publint",
            iconUrl: "https://publint.dev/favicon.png",
            description: "Package publishing and exports checks",
            homepage: "https://publint.dev/",
            iconFallback: "PL",
            buildUrl: ({ packageVersionRaw }) =>
                `https://publint.dev/${packageVersionRaw}`,
        },
        {
            id: "are-the-types-wrong",
            category: "Package quality and security",
            label: "Are the Types Wrong?",
            iconUrl:
                "https://arethetypeswrong.github.io/icons/apple-touch-icon.png",
            description: "TypeScript declarations and module-resolution checks",
            homepage: "https://arethetypeswrong.github.io/",
            iconFallback: "AT",
            buildUrl: ({ encodedPackageSpec }) =>
                `https://arethetypeswrong.github.io/?p=${encodedPackageSpec}`,
        },
        {
            id: "libraries-io",
            category: "Package quality and security",
            label: "Libraries.io",
            description: "Releases, dependencies, and maintenance data",
            homepage: "https://libraries.io/",
            iconFallback: "LI",
            buildUrl: ({ encodedPackageName }) =>
                `https://libraries.io/npm/${encodedPackageName}`,
        },
        {
            id: "packages-ecosystems",
            category: "Package quality and security",
            label: "packages.ecosyste.ms",
            description: "Open package metadata and dependency data",
            homepage: "https://packages.ecosyste.ms/",
            iconFallback: "PE",
            buildUrl: ({ encodedPackageName }) =>
                `https://packages.ecosyste.ms/registries/npmjs.org/packages/${encodedPackageName}`,
        },
        {
            id: "npmx",
            category: "Package pages",
            label: "npmx",
            description: "Fast, modern npm frontend",
            homepage: "https://npmx.dev/",
            iconFallback: "NX",
            buildUrl: ({ npmHash, npmPath, npmSearch }) =>
                `https://npmx.dev${npmPath}${npmSearch}${npmHash}`,
        },
        {
            id: "yarn",
            category: "Package pages",
            label: "Yarn",
            description: "Yarn package details",
            iconUrl: "https://yarnpkg.com/img/yarn-favicon.svg",
            homepage: "https://yarnpkg.com/",
            iconFallback: "Y",
            buildUrl: ({ encodedPackageName }) =>
                `https://yarnpkg.com/package?name=${encodedPackageName}`,
        },
        {
            id: "npm-io",
            category: "Package pages",
            label: "npm.io",
            iconUrl: "https://npm.io/icon.svg",
            description: "Package summary and health",
            homepage: "https://npm.io/",
            iconFallback: "NI",
            buildUrl: ({ packagePath }) =>
                `https://npm.io/package/${packagePath}`,
        },
        {
            id: "npkg",
            category: "Package pages",
            label: "NPKG",
            description: "Lightweight package details, commands, and scripts",
            homepage: "https://npkg.lorypelli.dev/",
            iconFallback: "NP",
            buildUrl: ({ packageName }) =>
                `https://npkg.lorypelli.dev/${packageName}`,
        },
        {
            id: "jsdocs",
            category: "Package pages",
            label: "jsDocs.io",
            description: "Generated API documentation from TypeScript types",
            homepage: "https://www.jsdocs.io/",
            iconFallback: "JS",
            buildUrl: ({ encodedPackageName }) =>
                `https://www.jsdocs.io/package/${encodedPackageName}`,
        },
        {
            id: "ghub",
            category: "Package pages",
            label: "ghub.io",
            iconUrl: "https://github.githubassets.com/favicons/favicon.svg",
            description: "Open the package's source repository",
            homepage: "https://ghub.io/",
            iconFallback: "GH",
            buildUrl: ({ encodedPackageName }) =>
                `https://ghub.io/${encodedPackageName}`,
        },
        {
            id: "npmmirror",
            category: "Package pages",
            label: "npmmirror",
            description: "Chinese npm registry mirror",
            homepage: "https://npmmirror.com/",
            iconFallback: "NM",
            buildUrl: ({ packagePath }) =>
                `https://npmmirror.com/package/${packagePath}`,
        },
        {
            id: "bundlephobia",
            category: "Size and bundling",
            label: "Bundlephobia",
            description: "Bundle size, exports, and dependency cost",
            homepage: "https://bundlephobia.com/",
            iconFallback: "BP",
            iconUrl: "https://bundlephobia.com/favicon-32x32.png?l=4",
            buildUrl: ({ packageVersionPath }) =>
                `https://bundlephobia.com/package/${packageVersionPath}`,
        },
        {
            id: "bundlejs",
            category: "Size and bundling",
            label: "BundleJS",
            description: "Tree-shaken bundle size explorer",
            iconUrl: "https://bundlejs.com/favicon/favicon.svg",
            homepage: "https://bundlejs.com/",
            iconFallback: "BJ",
            buildUrl: ({ encodedPackageSpec }) =>
                `https://bundlejs.com/?q=${encodedPackageSpec}`,
        },
        {
            id: "bundleinfo",
            category: "Manual and search tools",
            label: "bundleinfo",
            iconUrl: "https://bundleinfo.com/favicon.svg",
            description: "Install, gzip, exports, and dependency size details",
            homepage: "https://bundleinfo.com/",
            iconFallback: "BI",
            buildUrl: ({ encodedPackageSpec }) =>
                `https://bundleinfo.com/?q=${encodedPackageSpec}`,
        },
        {
            id: "bundlecheck",
            category: "Size and bundling",
            label: "BundleCheck",
            iconUrl: "https://bundlecheck.dev/logo.png",
            description: "Raw, minified, gzip, and Brotli bundle sizes",
            homepage: "https://bundlecheck.dev/",
            iconFallback: "BC",
            buildUrl: ({ encodedPackageSpec }) =>
                `https://bundlecheck.dev/?q=${encodedPackageSpec}`,
        },
        {
            id: "pkg-size",
            category: "Size and bundling",
            label: "pkg-size",
            description: "Package files and bundle size explorer",
            iconUrl: "https://pkg-size.dev/favicon.svg",
            homepage: "https://pkg-size.dev/",
            iconFallback: "PS",
            buildUrl: ({ packageVersionPath }) =>
                `https://pkg-size.dev/${packageVersionPath}`,
        },
        {
            id: "package-phobia",
            category: "Size and bundling",
            label: "Package Phobia",
            description: "Install and publish size",
            homepage: "https://packagephobia.com/",
            iconFallback: "PP",
            buildUrl: ({ encodedPackageSpec }) =>
                `https://packagephobia.com/result?p=${encodedPackageSpec}`,
        },
        {
            id: "npm-trends",
            category: "Downloads and graphs",
            label: "npm trends",
            description: "Compare package download trends",
            homepage: "https://npmtrends.com/",
            iconFallback: "NT",
            buildUrl: ({ packagePath }) =>
                `https://npmtrends.com/${packagePath}`,
        },
        {
            id: "npm-compare",
            category: "Downloads and graphs",
            label: "npm-compare.com",
            description: "Package alternatives, downloads, and comparisons",
            iconUrl: "https://npm-compare.com/img/favicon.png",
            homepage: "https://npm-compare.com/",
            iconFallback: "NC",
            buildUrl: ({ packageName }) =>
                `https://npm-compare.com/${packageName}`,
        },
        {
            id: "packfolio",
            category: "Downloads and graphs",
            label: "PackFolio",
            iconUrl: "https://www.packfolio.dev/icon.svg",
            description: "Downloads, health, trends, and comparisons",
            homepage: "https://www.packfolio.dev/",
            iconFallback: "PF",
            buildUrl: ({ encodedPackageName }) =>
                `https://www.packfolio.dev/?q=${encodedPackageName}`,
        },
        {
            id: "npmgraph",
            category: "Downloads and graphs",
            label: "npmgraph",
            description: "Interactive dependency graph",
            iconUrl: "https://npmgraph.js.org/favicon.png",
            homepage: "https://npmgraph.js.org/",
            iconFallback: "NG",
            buildUrl: ({ encodedPackageName }) =>
                `https://npmgraph.js.org/?q=${encodedPackageName}`,
        },
        {
            id: "npm-anvaka",
            category: "Downloads and graphs",
            label: "npm.anvaka.com",
            description: "Large interactive dependency graph",
            iconUrl: "https://avatars.githubusercontent.com/u/225407?s=48&v=4",
            homepage: "https://npm.anvaka.com/",
            iconFallback: "NA",
            buildUrl: ({ encodedPackageName }) =>
                `https://npm.anvaka.com/#/view/2d/${encodedPackageName}`,
        },
        {
            id: "npmcharts",
            category: "Downloads and graphs",
            label: "npmcharts",
            description: "Package download charts",
            homepage: "https://npmcharts.com/",
            iconFallback: "NC",
            buildUrl: ({ encodedPackageName }) =>
                `https://npmcharts.com/compare/${encodedPackageName}`,
        },
        {
            id: "npm-stat",
            category: "Downloads and graphs",
            label: "npm-stat",
            description: "Historical npm download statistics",
            homepage: "https://npm-stat.com/",
            iconFallback: "NS",
            buildUrl: ({ encodedPackageName }) =>
                `https://npm-stat.com/charts.html?package=${encodedPackageName}`,
        },
        {
            id: "unpkg",
            category: "Files and CDNs",
            label: "UNPKG",
            iconUrl: "https://app.unpkg.com/favicon.jpg",
            description: "Versioned package file browser",
            homepage: "https://unpkg.com/",
            iconFallback: "UP",
            buildUrl: ({ packageVersionPath }) =>
                `https://app.unpkg.com/${packageVersionPath}`,
        },
        {
            id: "jsdelivr",
            category: "Files and CDNs",
            label: "jsDelivr",
            description: "Package files, CDN usage, and statistics",
            homepage: "https://www.jsdelivr.com/",
            iconFallback: "JD",
            buildUrl: ({ packageName }) =>
                `https://www.jsdelivr.com/package/npm/${packageName}`,
        },
        {
            id: "esm-sh",
            category: "Files and CDNs",
            label: "esm.sh",
            description: "ES module CDN endpoint",
            homepage: "https://esm.sh/",
            iconFallback: "ES",
            buildUrl: ({ packageVersionPath }) =>
                `https://esm.sh/${packageVersionPath}`,
        },
        {
            id: "esm-run",
            category: "Files and CDNs",
            label: "esm.run",
            description: "jsDelivr-backed ES module endpoint",
            homepage: "https://esm.run/",
            iconFallback: "ER",
            buildUrl: ({ packageVersionRaw }) =>
                `https://esm.run/${packageVersionRaw}`,
        },
        {
            id: "skypack",
            category: "Files and CDNs",
            label: "Skypack",
            description: "Legacy package browser and ESM CDN",
            homepage: "https://www.skypack.dev/",
            iconFallback: "SK",
            buildUrl: ({ packageName }) =>
                `https://www.skypack.dev/view/${packageName}`,
        },
        {
            id: "npm-diff",
            category: "Manual and search tools",
            label: "npm diff",
            description: "Manual tool requiring two package versions",
            homepage: "https://npmdiff.dev/",
            iconFallback: "ND",
            buildUrl: () => "https://npmdiff.dev/",
        },
        {
            id: "paralect-npm-compare",
            category: "Manual and search tools",
            label: "Paralect NPM Compare",
            iconUrl: "https://i.gyazo.com/373bedac2a665666660d93e77ac2c5f8.png",
            description: "Manual multi-package comparison tool",
            homepage: "https://www.paralect.com/npm-compare",
            iconFallback: "PN",
            buildUrl: () => "https://www.paralect.com/npm-compare",
        },
        {
            id: "npms-io",
            category: "Manual and search tools",
            label: "npms.io",
            description: "Search-focused package scores and metadata",
            homepage: "https://npms.io/",
            iconFallback: "NS",
            buildUrl: ({ encodedPackageName }) =>
                `https://npms.io/search?q=${encodedPackageName}`,
        },
        {
            id: "npm-registry-browser",
            category: "Dead, old, and archived",
            label: "npm registry browser",
            description: "Legacy 2020 registry browser",
            homepage: "https://topheman.github.io/npm-registry-browser/",
            iconFallback: "NR",
            buildUrl: ({ encodedPackageName }) =>
                `https://topheman.github.io/npm-registry-browser/#/package/${encodedPackageName}`,
        },
        {
            id: "xnpmjs",
            category: "Package pages",
            label: "xnpmjs.com",
            description: "Alias that redirects to npmx",
            homepage: "https://xnpmjs.com/",
            iconFallback: "XN",
            buildUrl: ({ npmHash, npmPath, npmSearch }) =>
                `https://xnpmjs.com${npmPath}${npmSearch}${npmHash}`,
        },
        {
            id: "npm-alt",
            category: "Package pages",
            label: "npm-alt",
            iconUrl: "https://i.gyazo.com/dc8a298218b01cb39958e045e14036f8.png",
            description: "Deprecated but online predecessor to npmx",
            homepage: "https://npm.willow.sh/",
            iconFallback: "NA",
            buildUrl: ({ packageName }) =>
                `https://npm.willow.sh/package/${packageName}`,
        },
        {
            id: "npmsearch",
            category: "Dead, old, and archived",
            label: "npmsearch.com",
            iconUrl: "https://i.gyazo.com/dc8a298218b01cb39958e045e14036f8.png",
            description: "Dead search domain; no longer resolves",
            homepage: "https://npmsearch.com/",
            iconFallback: "NS",
            buildUrl: ({ encodedPackageName }) =>
                `https://npmsearch.com/?q=${encodedPackageName}`,
        },
        {
            id: "runkit",
            category: "Dead, old, and archived",
            label: "RunKit npm",
            iconUrl: "https://i.gyazo.com/dc8a298218b01cb39958e045e14036f8.png",
            description:
                "Archived package notebook with an expired certificate",
            homepage: "https://npm.runkit.com/",
            iconFallback: "RK",
            buildUrl: ({ encodedPackageName }) =>
                `https://npm.runkit.com/${encodedPackageName}`,
        },
    ];

    const CATEGORY_ORDER = [
        "Package quality and security",
        "Package pages",
        "Custom links",
        "Size and bundling",
        "Downloads and graphs",
        "Files and CDNs",
        "Manual and search tools",
        "Dead, old, and archived",
    ];
    const DEFAULT_DISABLED_MIRROR_IDS = [
        "npm-diff",
        "bundleinfo",
        "bundlecheck",
        "esm-run",
        "npms-io",
        "npm-registry-browser",
        "xnpmjs",
        "npm-alt",
        "npmsearch",
        "paralect-npm-compare",
        "runkit",
    ];
    const REENABLED_IN_SETTINGS_SCHEMA_3 = ["npm-compare", "skypack"];
    const REENABLED_IN_SETTINGS_SCHEMA_4 = ["npkg"];
    const DISABLED_MIRRORS_KEY = "disabledMirrorIds";
    const CUSTOM_LINKS_KEY = "relatedPackageLinksCustomLinks";
    const VISIBLE_LINKS_KEY = "relatedPackageLinksVisibleCount";
    const DEFAULT_VISIBLE_LINKS = 7;
    const MINIMUM_VISIBLE_LINKS = 3;
    const MAXIMUM_VISIBLE_LINKS = 15;
    const SETTINGS_SCHEMA_KEY = "relatedPackageLinksSettingsSchema";
    const SETTINGS_SCHEMA_VERSION = 4;
    const ICON_CACHE_KEY = "relatedPackageLinksIconCache";
    const ICON_CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
    const ICON_CACHE_FAILURE_TTL_MS = 24 * 60 * 60 * 1000;
    const ICON_CACHE_MAX_BLOB_BYTES = 96 * 1024;
    const ICON_CACHE_MAX_ENTRIES = 64;
    const MENU_ATTRIBUTE = "data-npm-package-mirror-menu";
    const MENU_ID = "npm-package-mirror-menu-list";
    const SETTINGS_DIALOG_ID = "npm-package-mirror-settings";
    const STYLE_ID = "npm-package-mirror-menu-style";

    let disabledMirrorIds = loadDisabledMirrorIds();
    let customLinksText = loadCustomLinksText();
    let visibleLinkCount = loadVisibleLinkCount();
    let iconCache = loadIconCache();
    let menuAbortController = null;
    let renderFrame = 0;
    let settingsVersion = 0;
    const iconSourcePromises = new Map();

    function addStyles() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = `
            .npml-title-container {
                position: relative;
            }

            .npml-heading-host {
                padding-right: 6.5rem;
            }

            .npml-heading-host > :first-child {
                min-width: 0;
            }

            .npml-menu,
            .npml-settings-dialog {
                --npml-bg: #fff;
                --npml-border: #c9c9c9;
                --npml-color: #111;
                --npml-hover: #f2f2f2;
                --npml-muted: #666;
                --npml-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
                font-family: "Source Sans Pro", "Lucida Grande", sans-serif;
                font-size: 0.875rem;
                font-weight: 400;
                letter-spacing: normal;
                line-height: 1.25;
            }

            .npml-menu {
                position: absolute;
                right: 0;
                top: 1rem;
            }

            html[data-color-mode="dark"] .npml-menu,
            html[data-color-mode="dark"] .npml-settings-dialog {
                --npml-bg: #202020;
                --npml-border: #4a4a4a;
                --npml-color: #e6e6e6;
                --npml-hover: #303030;
                --npml-muted: #aaa;
                --npml-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
            }

            .npml-trigger,
            .npml-settings-button,
            .npml-settings-close,
            .npml-menu-settings {
                align-items: center;
                background: var(--npml-bg);
                border: 1px solid var(--npml-border);
                border-radius: 4px;
                color: var(--npml-color);
                cursor: pointer;
                display: inline-flex;
                font: inherit;
                justify-content: center;
            }

            .npml-trigger {
                font-weight: 600;
                gap: 0.45rem;
                min-height: 32px;
                padding: 0.4rem 0.7rem;
                white-space: nowrap;
            }

            .npml-trigger:hover,
            .npml-settings-button:hover,
            .npml-settings-close:hover,
            .npml-menu-settings:hover {
                border-color: #cb3837;
                color: #cb3837;
            }

            .npml-trigger:focus-visible,
            .npml-item:focus-visible,
            .npml-settings-button:focus-visible,
            .npml-settings-close:focus-visible,
            .npml-menu-settings:focus-visible,
            .npml-settings-input:focus-visible,
            .npml-settings-option:has(input:focus-visible) {
                outline: 2px solid #cb3837;
                outline-offset: 2px;
            }

            .npml-chevron {
                fill: none;
                height: 10px;
                stroke: currentColor;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 1.75;
                transition: transform 120ms ease;
                width: 10px;
            }

            .npml-trigger-icon {
                fill: none;
                height: 15px;
                stroke: currentColor;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 1.6;
                width: 15px;
            }

            .npml-trigger[aria-expanded="true"] .npml-chevron {
                transform: rotate(180deg);
            }

            .npml-list {
                background: var(--npml-bg);
                border: 1px solid var(--npml-border);
                border-radius: 5px;
                box-shadow: var(--npml-shadow);
                box-sizing: border-box;
                color: var(--npml-color);
                list-style: none;
                margin: 0;
                max-height: min(var(--npml-menu-content-height, 28rem), 70vh);
                overflow-x: hidden;
                overflow-y: auto;
                overscroll-behavior: contain;
                padding: 0.35rem;
                position: absolute;
                right: 0;
                scrollbar-gutter: stable;
                top: calc(100% + 0.5rem);
                width: min(20rem, calc(100vw - 2rem));
                z-index: 1000;
            }

            .npml-list[hidden] {
                display: none !important;
            }

            .npml-menu-toolbar {
                align-items: center;
                background: var(--npml-bg);
                color: var(--npml-muted);
                display: flex;
                font-size: 0.72rem;
                font-weight: 700;
                height: 2rem;
                justify-content: space-between;
                letter-spacing: 0.03em;
                padding: 0 0.4rem 0 0.65rem;
                position: sticky;
                text-transform: uppercase;
                top: -0.35rem;
                z-index: 3;
            }

            .npml-menu-settings {
                background: transparent;
                border-color: transparent;
                height: 1.65rem;
                padding: 0;
                width: 1.65rem;
            }

            .npml-gear-icon {
                fill: none;
                height: 14px;
                stroke: currentColor;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 1.4;
                width: 14px;
            }

            .npml-section-heading {
                align-items: center;
                background: var(--npml-bg);
                color: var(--npml-muted);
                display: flex;
                font-size: 0.7rem;
                font-weight: 700;
                height: 1.8rem;
                letter-spacing: 0.04em;
                padding: 0 0.65rem;
                position: sticky;
                text-transform: uppercase;
                top: 1.65rem;
                z-index: 1;
            }

            .npml-item {
                align-items: center;
                border-radius: 3px;
                box-sizing: border-box;
                color: var(--npml-color) !important;
                display: grid;
                gap: 0.65rem;
                grid-template-columns: 1.65rem minmax(0, 1fr) 0.75rem;
                height: 3.65rem;
                padding: 0.45rem 0.65rem;
                text-decoration: none !important;
            }

            .npml-item:hover,
            .npml-item:focus {
                background: var(--npml-hover);
            }

            .npml-site-icon {
                align-items: center;
                background: hsl(var(--npml-icon-hue, 0) 65% 91%);
                border: 1px solid hsl(var(--npml-icon-hue, 0) 45% 77%);
                border-radius: 4px;
                color: hsl(var(--npml-icon-hue, 0) 55% 26%);
                display: inline-flex;
                flex: 0 0 auto;
                font-size: 0.62rem;
                font-weight: 800;
                height: 1.65rem;
                justify-content: center;
                overflow: hidden;
                position: relative;
                text-transform: uppercase;
                width: 1.65rem;
            }

            html[data-color-mode="dark"] .npml-site-icon {
                background: hsl(var(--npml-icon-hue, 0) 38% 22%);
                border-color: hsl(var(--npml-icon-hue, 0) 35% 38%);
                color: hsl(var(--npml-icon-hue, 0) 70% 82%);
            }

            .npml-site-icon img {
                box-sizing: border-box;
                height: 100%;
                inset: 0;
                object-fit: contain;
                padding: 0.18rem;
                position: absolute;
                width: 100%;
            }

            .npml-item-text,
            .npml-settings-option-text {
                display: grid;
                gap: 0.1rem;
                min-width: 0;
            }

            .npml-item-label,
            .npml-settings-option-label {
                font-size: 0.9rem;
                font-weight: 600;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .npml-item-description,
            .npml-settings-option-description {
                color: var(--npml-muted);
                font-size: 0.73rem;
                font-weight: 400;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .npml-external-icon {
                fill: none;
                flex: 0 0 auto;
                height: 12px;
                opacity: 0.65;
                stroke: currentColor;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 1.5;
                width: 12px;
            }

            .npml-settings-dialog {
                background: var(--npml-bg);
                border: 1px solid var(--npml-border);
                border-radius: 7px;
                box-shadow: var(--npml-shadow);
                color: var(--npml-color);
                max-height: min(46rem, calc(100vh - 2rem));
                max-width: calc(100vw - 2rem);
                padding: 0;
                width: min(38rem, calc(100vw - 2rem));
            }

            .npml-settings-dialog::backdrop {
                background: rgba(0, 0, 0, 0.55);
            }

            .npml-settings-form {
                display: grid;
                grid-template-rows: auto auto auto minmax(0, 1fr) auto;
                max-height: min(46rem, calc(100vh - 2rem));
            }

            .npml-settings-header,
            .npml-settings-footer,
            .npml-settings-toolbar {
                align-items: center;
                display: flex;
                gap: 0.5rem;
            }

            .npml-settings-header {
                border-bottom: 1px solid var(--npml-border);
                justify-content: space-between;
                padding: 1rem 1.1rem;
            }

            .npml-settings-title {
                font-size: 1.15rem;
                margin: 0;
            }

            .npml-settings-close {
                font-size: 1.25rem;
                height: 2rem;
                line-height: 1;
                width: 2rem;
            }

            .npml-settings-intro {
                color: var(--npml-muted);
                margin: 0;
                padding: 0.85rem 1.1rem 0.25rem;
            }

            .npml-settings-toolbar {
                flex-wrap: wrap;
                padding: 0.6rem 1.1rem 0.85rem;
            }

            .npml-settings-button {
                min-height: 2rem;
                padding: 0.35rem 0.7rem;
            }

            .npml-settings-button-primary {
                background: #cb3837;
                border-color: #cb3837;
                color: #fff;
                font-weight: 600;
            }

            .npml-settings-button-primary:hover {
                background: #a92f2e;
                border-color: #a92f2e;
                color: #fff;
            }

            .npml-settings-groups {
                border-bottom: 1px solid var(--npml-border);
                border-top: 1px solid var(--npml-border);
                overflow: auto;
                overscroll-behavior: contain;
                padding: 0.65rem 1.1rem;
            }

            .npml-settings-preferences {
                border-bottom: 1px solid var(--npml-border);
                display: grid;
                gap: 0.85rem;
                margin: -0.65rem -1.1rem 0.9rem;
                padding: 0.85rem 1.1rem 1rem;
            }

            .npml-settings-field {
                display: grid;
                gap: 0.3rem;
            }

            .npml-settings-field-label {
                font-size: 0.85rem;
                font-weight: 700;
            }

            .npml-settings-field-help,
            .npml-settings-error {
                color: var(--npml-muted);
                font-size: 0.75rem;
                margin: 0;
            }

            .npml-settings-error {
                color: #cb3837;
                white-space: pre-line;
            }

            .npml-settings-input {
                background: var(--npml-bg);
                border: 1px solid var(--npml-border);
                border-radius: 4px;
                box-sizing: border-box;
                color: var(--npml-color);
                font: inherit;
                padding: 0.45rem 0.55rem;
                width: 100%;
            }

            input.npml-settings-input {
                max-width: 6rem;
            }

            textarea.npml-settings-input {
                font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
                font-size: 0.78rem;
                line-height: 1.4;
                min-height: 6.5rem;
                resize: vertical;
            }

            .npml-settings-group {
                border: 0;
                margin: 0;
                padding: 0;
            }

            .npml-settings-group + .npml-settings-group {
                margin-top: 1rem;
            }

            .npml-settings-legend {
                font-size: 0.85rem;
                font-weight: 700;
                padding: 0 0 0.4rem;
            }

            .npml-settings-option {
                align-items: center;
                border-radius: 4px;
                cursor: pointer;
                display: grid;
                gap: 0.65rem;
                grid-template-columns: auto 1.65rem minmax(0, 1fr);
                min-height: 3.35rem;
                padding: 0.35rem 0.5rem;
            }

            .npml-settings-option:hover {
                background: var(--npml-hover);
            }

            .npml-settings-option input {
                accent-color: #cb3837;
                height: 1rem;
                margin: 0;
                width: 1rem;
            }

            .npml-settings-footer {
                justify-content: flex-end;
                padding: 0.85rem 1.1rem;
            }

            @media (forced-colors: active) {
                .npml-trigger,
                .npml-list,
                .npml-settings-dialog,
                .npml-settings-button,
                .npml-settings-close,
                .npml-menu-settings,
                .npml-site-icon {
                    border-color: ButtonText;
                }

                .npml-item:hover,
                .npml-item:focus,
                .npml-settings-option:hover {
                    outline: 1px solid Highlight;
                }
            }
        `;
        (document.head || document.documentElement).append(style);
    }

    function isValidIconCacheEntry(entry) {
        const maximumDataUrlLength =
            Math.ceil((ICON_CACHE_MAX_BLOB_BYTES * 4) / 3) + 256;
        return (
            entry &&
            typeof entry === "object" &&
            typeof entry.sourceUrl === "string" &&
            Number.isFinite(entry.cachedAt) &&
            ((typeof entry.dataUrl === "string" &&
                entry.dataUrl.startsWith("data:") &&
                entry.dataUrl.length <= maximumDataUrlLength) ||
                entry.failed === true)
        );
    }

    function trimIconCache(cache) {
        return Object.fromEntries(
            Object.entries(cache)
                .filter(([, entry]) => isValidIconCacheEntry(entry))
                .sort(
                    ([, firstEntry], [, secondEntry]) =>
                        secondEntry.cachedAt - firstEntry.cachedAt
                )
                .slice(0, ICON_CACHE_MAX_ENTRIES)
        );
    }

    function loadIconCache() {
        if (typeof GM_getValue !== "function") return {};

        try {
            const savedCache = GM_getValue(ICON_CACHE_KEY, {});
            if (
                !savedCache ||
                typeof savedCache !== "object" ||
                Array.isArray(savedCache)
            ) {
                return {};
            }

            return trimIconCache(savedCache);
        } catch {
            return {};
        }
    }

    function saveIconCacheEntry(id, entry) {
        iconCache[id] = entry;
        iconCache = trimIconCache(iconCache);

        if (typeof GM_setValue !== "function") return;

        try {
            GM_setValue(ICON_CACHE_KEY, iconCache);
        } catch {
            // The fetched icon still works for the current page.
        }
    }

    function getFreshIconCacheEntry(id, sourceUrl) {
        const entry = iconCache[id];
        if (!isValidIconCacheEntry(entry) || entry.sourceUrl !== sourceUrl) {
            return null;
        }

        const maximumAge = entry.failed
            ? ICON_CACHE_FAILURE_TTL_MS
            : ICON_CACHE_TTL_MS;
        return Date.now() - entry.cachedAt <= maximumAge ? entry : null;
    }

    function requestIconBlob(sourceUrl) {
        return new Promise((resolve, reject) => {
            try {
                GM_xmlhttpRequest({
                    anonymous: true,
                    method: "GET",
                    onabort: () => reject(new Error("Icon request aborted")),
                    onerror: () => reject(new Error("Icon request failed")),
                    onload: ({ response, status }) => {
                        const responseType =
                            typeof response?.type === "string"
                                ? response.type.toLowerCase()
                                : "";
                        if (
                            status < 200 ||
                            status >= 300 ||
                            !response ||
                            typeof response.size !== "number" ||
                            response.size === 0 ||
                            response.size > ICON_CACHE_MAX_BLOB_BYTES ||
                            (responseType &&
                                !responseType.startsWith("image/") &&
                                responseType !== "application/octet-stream")
                        ) {
                            reject(new Error("Invalid icon response"));
                            return;
                        }

                        resolve(response);
                    },
                    ontimeout: () =>
                        reject(new Error("Icon request timed out")),
                    responseType: "blob",
                    timeout: 10_000,
                    url: sourceUrl,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    function blobToDataUrl(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("error", () => {
                reject(new Error("Could not read icon response"));
            });
            reader.addEventListener("load", () => {
                if (typeof reader.result === "string") {
                    resolve(reader.result);
                } else {
                    reject(new Error("Invalid icon data URL"));
                }
            });
            reader.readAsDataURL(blob);
        });
    }

    async function fetchAndCacheIcon(id, sourceUrl) {
        try {
            const blob = await requestIconBlob(sourceUrl);
            const dataUrl = await blobToDataUrl(blob);
            saveIconCacheEntry(id, {
                cachedAt: Date.now(),
                dataUrl,
                sourceUrl,
            });
            return dataUrl;
        } catch {
            saveIconCacheEntry(id, {
                cachedAt: Date.now(),
                failed: true,
                sourceUrl,
            });
            return sourceUrl;
        }
    }

    function getCachedIconSource(id, sourceUrl) {
        const entry = getFreshIconCacheEntry(id, sourceUrl);
        if (entry?.dataUrl) return Promise.resolve(entry.dataUrl);
        if (entry?.failed) return Promise.resolve(sourceUrl);

        if (typeof GM_xmlhttpRequest !== "function") {
            return Promise.resolve(sourceUrl);
        }

        const requestKey = `${id}|${sourceUrl}`;
        const existingRequest = iconSourcePromises.get(requestKey);
        if (existingRequest) return existingRequest;

        const request = fetchAndCacheIcon(id, sourceUrl);
        iconSourcePromises.set(requestKey, request);
        request.finally(() => iconSourcePromises.delete(requestKey));
        return request;
    }

    function loadDisabledMirrorIds() {
        if (typeof GM_getValue !== "function") {
            return [...DEFAULT_DISABLED_MIRROR_IDS];
        }

        try {
            const savedIds = GM_getValue(
                DISABLED_MIRRORS_KEY,
                DEFAULT_DISABLED_MIRROR_IDS
            );
            const knownIds = new Set(PACKAGE_MIRRORS.map(({ id }) => id));
            const candidateIds = Array.isArray(savedIds)
                ? savedIds
                : DEFAULT_DISABLED_MIRROR_IDS;
            let normalizedIds = candidateIds.filter(
                (id, index) =>
                    typeof id === "string" &&
                    knownIds.has(id) &&
                    candidateIds.indexOf(id) === index
            );

            const savedSchema = Number(GM_getValue(SETTINGS_SCHEMA_KEY, 0));
            if (savedSchema < SETTINGS_SCHEMA_VERSION) {
                if (savedSchema < 3) {
                    normalizedIds = normalizedIds.filter(
                        (id) => !REENABLED_IN_SETTINGS_SCHEMA_3.includes(id)
                    );
                }
                if (savedSchema < 4) {
                    normalizedIds = normalizedIds.filter(
                        (id) => !REENABLED_IN_SETTINGS_SCHEMA_4.includes(id)
                    );
                }
                normalizedIds = Array.from(
                    new Set([...normalizedIds, ...DEFAULT_DISABLED_MIRROR_IDS])
                );
                if (typeof GM_setValue === "function") {
                    GM_setValue(DISABLED_MIRRORS_KEY, normalizedIds);
                    GM_setValue(SETTINGS_SCHEMA_KEY, SETTINGS_SCHEMA_VERSION);
                }
            }

            return normalizedIds;
        } catch {
            return [...DEFAULT_DISABLED_MIRROR_IDS];
        }
    }

    function normalizeVisibleLinkCount(value) {
        const numericValue = Number.parseInt(String(value), 10);
        if (!Number.isFinite(numericValue)) return DEFAULT_VISIBLE_LINKS;

        return Math.min(
            MAXIMUM_VISIBLE_LINKS,
            Math.max(MINIMUM_VISIBLE_LINKS, numericValue)
        );
    }

    function loadVisibleLinkCount() {
        if (typeof GM_getValue !== "function") return DEFAULT_VISIBLE_LINKS;

        try {
            return normalizeVisibleLinkCount(
                GM_getValue(VISIBLE_LINKS_KEY, DEFAULT_VISIBLE_LINKS)
            );
        } catch {
            return DEFAULT_VISIBLE_LINKS;
        }
    }

    function loadCustomLinksText() {
        if (typeof GM_getValue !== "function") return "";

        try {
            const savedText = GM_getValue(CUSTOM_LINKS_KEY, "");
            return typeof savedText === "string" ? savedText : "";
        } catch {
            return "";
        }
    }

    function saveRelatedLinkSettings({
        customLinks,
        disabledIds,
        visibleLinks,
    }) {
        customLinksText = customLinks;
        disabledMirrorIds = [...disabledIds];
        visibleLinkCount = normalizeVisibleLinkCount(visibleLinks);
        settingsVersion += 1;

        if (typeof GM_setValue === "function") {
            try {
                GM_setValue(DISABLED_MIRRORS_KEY, disabledMirrorIds);
                GM_setValue(CUSTOM_LINKS_KEY, customLinksText);
                GM_setValue(VISIBLE_LINKS_KEY, visibleLinkCount);
                GM_setValue(SETTINGS_SCHEMA_KEY, SETTINGS_SCHEMA_VERSION);
            } catch {
                // The current page still updates when persistent storage fails.
            }
        }

        removeMirrorMenu();
        scheduleRender();
    }

    function resetMirrorSettings() {
        saveRelatedLinkSettings({
            customLinks: customLinksText,
            disabledIds: DEFAULT_DISABLED_MIRROR_IDS,
            visibleLinks: DEFAULT_VISIBLE_LINKS,
        });
    }

    function decodePathPart(part) {
        if (!part) return "";

        try {
            return decodeURIComponent(part);
        } catch {
            return part;
        }
    }

    function getPackageNameFromPath(pathname) {
        const pathParts = pathname.split("/").filter(Boolean);
        if (pathParts[0] !== "package") return null;

        const firstPackagePart = decodePathPart(pathParts[1]);
        if (!firstPackagePart) return null;

        // A scoped package may appear as one encoded segment or as the usual
        // visible /package/@scope/name path.
        if (firstPackagePart.includes("/")) return firstPackagePart;
        if (!firstPackagePart.startsWith("@")) return firstPackagePart;

        const scopedPackageName = decodePathPart(pathParts[2]);
        return scopedPackageName
            ? `${firstPackagePart}/${scopedPackageName}`
            : null;
    }

    function encodePackagePath(packageName) {
        return packageName.split("/").map(encodeURIComponent).join("/");
    }

    function findHeading(root, text) {
        return Array.from(root.querySelectorAll("h3")).find(
            (heading) => heading.textContent?.trim() === text
        );
    }

    function getPackageDetails() {
        const packageName = getPackageNameFromPath(window.location.pathname);
        const sidebar = document.querySelector(
            'aside[aria-label="Package sidebar"]'
        );
        const versionHeading = sidebar ? findHeading(sidebar, "Version") : null;
        const packageVersion = versionHeading?.parentElement
            ?.querySelector("p")
            ?.textContent?.trim();

        if (!packageName || !packageVersion) return null;

        const packagePath = encodePackagePath(packageName);
        const packageVersionPath = `${packagePath}@${encodeURIComponent(
            packageVersion
        )}`;
        return {
            encodedPackageName: encodeURIComponent(packageName),
            encodedPackageSpec: encodeURIComponent(
                `${packageName}@${packageVersion}`
            ),
            encodedVersion: encodeURIComponent(packageVersion),
            npmHash: window.location.hash,
            npmPath: window.location.pathname,
            npmSearch: window.location.search,
            packageName,
            packagePath,
            packageVersion,
            packageVersionRaw: `${packageName}@${packageVersion}`,
            packageVersionPath,
        };
    }

    function fillCustomLinkTemplate(template, details) {
        const tokenValues = {
            "{{encodedPackage}}": details.encodedPackageName,
            "{{encodedPackageSpec}}": details.encodedPackageSpec,
            "{{encodedVersion}}": details.encodedVersion,
            "{{package}}": details.packageName,
            "{{packagePath}}": details.packagePath,
            "{{packageSpec}}": details.packageVersionRaw,
            "{{packageVersionPath}}": details.packageVersionPath,
            "{{version}}": details.packageVersion,
        };

        return Object.entries(tokenValues).reduce(
            (result, [token, value]) => result.replaceAll(token, value),
            template
        );
    }

    function parseCustomLinks(text) {
        const errors = [];
        const mirrors = [];
        const allowedTokens = new Set([
            "encodedPackage",
            "encodedPackageSpec",
            "encodedVersion",
            "package",
            "packagePath",
            "packageSpec",
            "packageVersionPath",
            "version",
        ]);
        const exampleDetails = {
            encodedPackageName: "%40scope%2Fpackage",
            encodedPackageSpec: "%40scope%2Fpackage%401.2.3",
            encodedVersion: "1.2.3",
            packageName: "@scope/package",
            packagePath: "%40scope/package",
            packageVersion: "1.2.3",
            packageVersionPath: "%40scope/package@1.2.3",
            packageVersionRaw: "@scope/package@1.2.3",
        };
        const lines = text.split(/\r?\n/u);

        for (const [lineIndex, untrimmedLine] of lines.entries()) {
            const line = untrimmedLine.trim();
            if (!line || line.startsWith("#")) continue;

            if (mirrors.length >= 25) {
                errors.push("Custom links are limited to 25 entries.");
                break;
            }

            const separatorIndex = line.indexOf("|");
            const lineNumber = lineIndex + 1;
            if (separatorIndex < 1) {
                errors.push(`Line ${lineNumber}: use Label | https://…`);
                continue;
            }

            const label = line.slice(0, separatorIndex).trim();
            const template = line.slice(separatorIndex + 1).trim();
            if (!label || label.length > 60) {
                errors.push(
                    `Line ${lineNumber}: labels must be 1–60 characters.`
                );
                continue;
            }
            if (!template || template.length > 2_000) {
                errors.push(
                    `Line ${lineNumber}: URL templates must be 1–2000 characters.`
                );
                continue;
            }

            const unknownTokens = Array.from(
                template.matchAll(/\{\{([^{}]+)\}\}/gu),
                (match) => match[1]
            ).filter((token) => !allowedTokens.has(token));
            if (unknownTokens.length > 0) {
                errors.push(
                    `Line ${lineNumber}: unknown token {{${unknownTokens[0]}}}.`
                );
                continue;
            }

            try {
                const previewUrl = new URL(
                    fillCustomLinkTemplate(template, exampleDetails)
                );
                if (
                    previewUrl.protocol !== "https:" &&
                    previewUrl.protocol !== "http:"
                ) {
                    throw new TypeError("Unsupported URL protocol");
                }

                const normalizedLabel = label
                    .toLowerCase()
                    .replaceAll(/[^a-z0-9]+/gu, "-")
                    .replaceAll(/(^-|-$)/gu, "");
                mirrors.push({
                    buildUrl: (details) =>
                        fillCustomLinkTemplate(template, details),
                    category: "Custom links",
                    description: `Custom link to ${previewUrl.hostname}`,
                    disableRemoteIcon: true,
                    homepage: `${previewUrl.origin}/`,
                    iconFallback: label.slice(0, 2),
                    id: `custom-${lineNumber}-${normalizedLabel || "link"}`,
                    label,
                });
            } catch {
                errors.push(
                    `Line ${lineNumber}: enter a valid http:// or https:// URL template.`
                );
            }
        }

        return { errors, mirrors };
    }

    function buildMirrorLinks(details) {
        const disabledIds = new Set(disabledMirrorIds);
        const customMirrors = parseCustomLinks(customLinksText).mirrors;
        return [...PACKAGE_MIRRORS, ...customMirrors]
            .filter(
                (mirror) =>
                    !disabledIds.has(mirror.id) &&
                    typeof mirror.label === "string" &&
                    mirror.label.trim().length > 0 &&
                    typeof mirror.buildUrl === "function"
            )
            .flatMap((mirror) => {
                try {
                    const url = new URL(mirror.buildUrl(details));
                    if (url.protocol !== "https:" && url.protocol !== "http:") {
                        return [];
                    }

                    return [
                        {
                            ...mirror,
                            description:
                                typeof mirror.description === "string"
                                    ? mirror.description.trim()
                                    : "",
                            homepage: mirror.homepage || `${url.origin}/`,
                            label: mirror.label.trim(),
                            url: url.href,
                        },
                    ];
                } catch {
                    return [];
                }
            });
    }

    function createSvgIcon(className, pathData) {
        const svgNamespace = "http://www.w3.org/2000/svg";
        const icon = document.createElementNS(svgNamespace, "svg");
        icon.classList.add(className);
        icon.setAttribute("aria-hidden", "true");
        icon.setAttribute("focusable", "false");
        icon.setAttribute("viewBox", "0 0 16 16");

        const path = document.createElementNS(svgNamespace, "path");
        path.setAttribute("d", pathData);
        icon.append(path);
        return icon;
    }

    function getIconHue(value) {
        return Array.from(value).reduce(
            (hue, character) =>
                (hue * 31 + (character.codePointAt(0) || 0)) % 360,
            0
        );
    }

    function createServiceIcon({
        disableRemoteIcon,
        homepage,
        iconFallback,
        iconUrl,
        id,
        label,
    }) {
        const icon = document.createElement("span");
        icon.className = "npml-site-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.style.setProperty("--npml-icon-hue", String(getIconHue(id)));
        icon.textContent =
            iconFallback ||
            label
                .match(/[a-z\d]+/gi)
                ?.map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() ||
            "•";

        if (disableRemoteIcon) return icon;

        try {
            const image = document.createElement("img");
            image.alt = "";
            image.decoding = "async";
            image.loading = "lazy";
            image.referrerPolicy = "no-referrer";
            image.addEventListener(
                "load",
                () => {
                    if (image.naturalWidth < 2 || image.naturalHeight < 2) {
                        image.remove();
                    }
                },
                { once: true }
            );
            image.addEventListener("error", () => image.remove(), {
                once: true,
            });
            icon.append(image);
            const sourceUrl = iconUrl || new URL("/favicon.ico", homepage).href;
            getCachedIconSource(id, sourceUrl).then((cachedSource) => {
                if (cachedSource) {
                    image.src = cachedSource;
                } else {
                    image.remove();
                }
            });
        } catch {
            // Keep the generated monogram when the icon URL is invalid.
        }

        return icon;
    }

    function createMirrorItem(mirror, packageName) {
        const item = document.createElement("a");
        item.className = "npml-item";
        item.dataset.mirrorId = mirror.id;
        item.href = mirror.url;
        item.target = "_blank";
        item.rel = "noopener noreferrer";
        item.role = "menuitem";
        item.setAttribute(
            "aria-label",
            `Open ${packageName} on ${mirror.label} in a new tab`
        );

        const text = document.createElement("span");
        text.className = "npml-item-text";

        const labelText = document.createElement("span");
        labelText.className = "npml-item-label";
        labelText.textContent = mirror.label;

        const descriptionText = document.createElement("span");
        descriptionText.className = "npml-item-description";
        descriptionText.textContent = mirror.description;

        text.append(labelText, descriptionText);
        item.append(
            createServiceIcon(mirror),
            text,
            createSvgIcon(
                "npml-external-icon",
                "M6 3H3.75A1.75 1.75 0 0 0 2 4.75v7.5C2 13.22 2.78 14 3.75 14h7.5A1.75 1.75 0 0 0 13 12.25V10M9 2h5v5M14 2 7.5 8.5"
            )
        );
        return item;
    }

    function appendMirrorGroups(menu, mirrorLinks, packageName) {
        for (const category of CATEGORY_ORDER) {
            const categoryMirrors = mirrorLinks.filter(
                (mirror) => mirror.category === category
            );
            if (categoryMirrors.length === 0) continue;

            const group = document.createElement("div");
            group.role = "group";

            const heading = document.createElement("div");
            heading.className = "npml-section-heading";
            heading.id = `npml-category-${category
                .toLowerCase()
                .replaceAll(/[^a-z0-9]+/g, "-")}`;
            heading.textContent = category;
            group.setAttribute("aria-labelledby", heading.id);
            group.append(heading);

            for (const mirror of categoryMirrors) {
                group.append(createMirrorItem(mirror, packageName));
            }

            menu.append(group);
        }
    }

    function sizeMenuForVisibleLinks(menu) {
        const items = Array.from(menu.querySelectorAll(".npml-item"));
        const finalVisibleItem =
            items[Math.min(visibleLinkCount, items.length) - 1];
        if (!finalVisibleItem) return;

        const menuStyles = window.getComputedStyle(menu);
        const paddingBottom = Number.parseFloat(menuStyles.paddingBottom) || 0;
        const contentHeight =
            finalVisibleItem.offsetTop +
            finalVisibleItem.offsetHeight +
            paddingBottom;
        menu.style.setProperty(
            "--npml-menu-content-height",
            `${Math.ceil(contentHeight)}px`
        );
    }

    function bindMenuInteractions(container, button, menu) {
        menuAbortController?.abort();
        menuAbortController = new AbortController();
        const { signal } = menuAbortController;

        const getItems = () =>
            Array.from(menu.querySelectorAll('[role="menuitem"]'));
        const setOpen = (open, focusPosition = null) => {
            button.setAttribute("aria-expanded", String(open));
            menu.hidden = !open;

            if (!open) return;

            sizeMenuForVisibleLinks(menu);
            keepMenuInViewport(menu);
            if (focusPosition === null) return;

            const items = getItems();
            const item = focusPosition === "last" ? items.at(-1) : items[0];
            item?.focus();
        };

        button.addEventListener(
            "click",
            () => {
                setOpen(button.getAttribute("aria-expanded") !== "true");
            },
            { signal }
        );

        button.addEventListener(
            "keydown",
            (event) => {
                if (event.key === "Escape") {
                    if (button.getAttribute("aria-expanded") === "true") {
                        event.preventDefault();
                        setOpen(false);
                    }
                    return;
                }

                if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
                    return;
                }

                event.preventDefault();
                setOpen(true, event.key === "ArrowUp" ? "last" : "first");
            },
            { signal }
        );

        menu.addEventListener(
            "keydown",
            (event) => {
                const items = getItems();
                const currentIndex = items.indexOf(document.activeElement);
                let nextIndex = null;

                if (event.key === "ArrowDown") {
                    nextIndex = (currentIndex + 1) % items.length;
                } else if (event.key === "ArrowUp") {
                    nextIndex =
                        (currentIndex - 1 + items.length) % items.length;
                } else if (event.key === "Home") {
                    nextIndex = 0;
                } else if (event.key === "End") {
                    nextIndex = items.length - 1;
                } else if (event.key === "Escape") {
                    event.preventDefault();
                    setOpen(false);
                    button.focus();
                    return;
                }

                if (nextIndex === null) return;
                event.preventDefault();
                items[nextIndex]?.focus();
            },
            { signal }
        );

        menu.addEventListener("click", () => setOpen(false), { signal });

        document.addEventListener(
            "pointerdown",
            (event) => {
                if (!container.contains(event.target)) setOpen(false);
            },
            { capture: true, signal }
        );

        document.addEventListener(
            "focusin",
            (event) => {
                if (!container.contains(event.target)) setOpen(false);
            },
            { signal }
        );
    }

    function createMirrorMenu(details, mirrorLinks) {
        const container = document.createElement("div");
        container.className = "npml-menu";
        container.setAttribute(MENU_ATTRIBUTE, "");

        const button = document.createElement("button");
        button.type = "button";
        button.className = "npml-trigger";
        button.setAttribute("aria-controls", MENU_ID);
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-haspopup", "menu");
        button.append(
            createSvgIcon(
                "npml-trigger-icon",
                "M6.25 9.75 4.5 11.5a2.12 2.12 0 0 1-3-3l2.25-2.25a2.12 2.12 0 0 1 3 0M9.75 6.25l1.75-1.75a2.12 2.12 0 1 1 3 3l-2.25 2.25a2.12 2.12 0 0 1-3 0M5.75 10.25l4.5-4.5"
            ),
            "Links",
            createSvgIcon("npml-chevron", "m3.5 6 4.5 4 4.5-4")
        );

        const menu = document.createElement("div");
        menu.id = MENU_ID;
        menu.className = "npml-list";
        menu.hidden = true;
        menu.role = "menu";
        menu.setAttribute("aria-label", "Related package links");

        const toolbar = document.createElement("div");
        toolbar.className = "npml-menu-toolbar";
        toolbar.role = "none";
        const toolbarLabel = document.createElement("span");
        toolbarLabel.textContent = "Related links";
        const settingsButton = document.createElement("button");
        settingsButton.type = "button";
        settingsButton.className = "npml-menu-settings";
        settingsButton.role = "menuitem";
        settingsButton.title = "Configure related package links";
        settingsButton.setAttribute(
            "aria-label",
            "Configure related package links"
        );
        settingsButton.append(
            createSvgIcon(
                "npml-gear-icon",
                "M8 5.4a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2ZM8 1.5v1.25M8 13.25v1.25M1.5 8h1.25M13.25 8h1.25M3.4 3.4l.9.9M11.7 11.7l.9.9M12.6 3.4l-.9.9M4.3 11.7l-.9.9"
            )
        );
        settingsButton.addEventListener("click", () => {
            button.setAttribute("aria-expanded", "false");
            menu.hidden = true;
            openSettingsDialog();
        });
        toolbar.append(toolbarLabel, settingsButton);
        menu.append(toolbar);
        appendMirrorGroups(menu, mirrorLinks, details.packageName);

        container.append(button, menu);
        bindMenuInteractions(container, button, menu);
        return container;
    }

    function createSettingsOption(mirror) {
        const option = document.createElement("label");
        option.className = "npml-settings-option";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "enabledMirror";
        checkbox.value = mirror.id;
        checkbox.checked = !disabledMirrorIds.includes(mirror.id);

        const text = document.createElement("span");
        text.className = "npml-settings-option-text";

        const label = document.createElement("span");
        label.className = "npml-settings-option-label";
        label.textContent = mirror.label;

        const description = document.createElement("span");
        description.className = "npml-settings-option-description";
        description.textContent = mirror.description;

        text.append(label, description);
        option.append(checkbox, createServiceIcon(mirror), text);
        return option;
    }

    function createSettingsButton(label, action, primary = false) {
        const button = document.createElement("button");
        button.type = action === "submit" ? "submit" : "button";
        button.className = "npml-settings-button";
        if (primary) button.classList.add("npml-settings-button-primary");
        button.textContent = label;
        if (typeof action === "function") {
            button.addEventListener("click", action);
        }
        return button;
    }

    function setAllSettingsCheckboxes(form, checked) {
        for (const checkbox of form.querySelectorAll(
            'input[name="enabledMirror"]'
        )) {
            checkbox.checked = checked;
        }
    }

    function openSettingsDialog() {
        document.getElementById(SETTINGS_DIALOG_ID)?.remove();
        addStyles();

        const dialog = document.createElement("dialog");
        dialog.id = SETTINGS_DIALOG_ID;
        dialog.className = "npml-settings-dialog";
        dialog.setAttribute("aria-describedby", "npml-settings-description");
        dialog.setAttribute("aria-labelledby", "npml-settings-title");

        const form = document.createElement("form");
        form.className = "npml-settings-form";

        const header = document.createElement("header");
        header.className = "npml-settings-header";
        const title = document.createElement("h2");
        title.id = "npml-settings-title";
        title.className = "npml-settings-title";
        title.textContent = "Related package links";
        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.className = "npml-settings-close";
        closeButton.setAttribute("aria-label", "Close related links settings");
        closeButton.textContent = "×";
        closeButton.addEventListener("click", () => dialog.close());
        header.append(title, closeButton);

        const intro = document.createElement("p");
        intro.id = "npml-settings-description";
        intro.className = "npml-settings-intro";
        intro.textContent =
            "Choose the built-in destinations, popup size, and your own package links. Older and limited services are off by default. Changes apply to every npm package page.";

        const visibleLinksInput = document.createElement("input");
        visibleLinksInput.id = "npml-visible-links";
        visibleLinksInput.className = "npml-settings-input";
        visibleLinksInput.type = "number";
        visibleLinksInput.min = String(MINIMUM_VISIBLE_LINKS);
        visibleLinksInput.max = String(MAXIMUM_VISIBLE_LINKS);
        visibleLinksInput.step = "1";
        visibleLinksInput.value = String(visibleLinkCount);

        const customLinksInput = document.createElement("textarea");
        customLinksInput.id = "npml-custom-links";
        customLinksInput.className = "npml-settings-input";
        customLinksInput.placeholder =
            "My package page | https://example.com/package/{{encodedPackage}}";
        customLinksInput.spellcheck = false;
        customLinksInput.value = customLinksText;

        const customLinksError = document.createElement("p");
        customLinksError.className = "npml-settings-error";
        customLinksError.hidden = true;
        customLinksError.role = "alert";
        customLinksInput.addEventListener("input", () => {
            customLinksError.hidden = true;
            customLinksError.textContent = "";
        });

        const toolbar = document.createElement("div");
        toolbar.className = "npml-settings-toolbar";
        toolbar.append(
            createSettingsButton("Enable all", () =>
                setAllSettingsCheckboxes(form, true)
            ),
            createSettingsButton("Disable all", () =>
                setAllSettingsCheckboxes(form, false)
            ),
            createSettingsButton("Defaults", () => {
                setAllSettingsCheckboxes(form, true);
                visibleLinksInput.value = String(DEFAULT_VISIBLE_LINKS);
                for (const id of DEFAULT_DISABLED_MIRROR_IDS) {
                    const checkbox = form.querySelector(
                        `input[value="${CSS.escape(id)}"]`
                    );
                    if (checkbox) checkbox.checked = false;
                }
            })
        );

        const groups = document.createElement("div");
        groups.className = "npml-settings-groups";

        const preferences = document.createElement("section");
        preferences.className = "npml-settings-preferences";

        const visibleLinksField = document.createElement("label");
        visibleLinksField.className = "npml-settings-field";
        visibleLinksField.htmlFor = visibleLinksInput.id;
        const visibleLinksLabel = document.createElement("span");
        visibleLinksLabel.className = "npml-settings-field-label";
        visibleLinksLabel.textContent = "Links visible before scrolling";
        const visibleLinksHelp = document.createElement("span");
        visibleLinksHelp.className = "npml-settings-field-help";
        visibleLinksHelp.textContent = `${MINIMUM_VISIBLE_LINKS}–${MAXIMUM_VISIBLE_LINKS}; the default is ${DEFAULT_VISIBLE_LINKS}.`;
        visibleLinksField.append(
            visibleLinksLabel,
            visibleLinksInput,
            visibleLinksHelp
        );

        const customLinksField = document.createElement("label");
        customLinksField.className = "npml-settings-field";
        customLinksField.htmlFor = customLinksInput.id;
        const customLinksLabel = document.createElement("span");
        customLinksLabel.className = "npml-settings-field-label";
        customLinksLabel.textContent = "Custom links";
        const customLinksHelp = document.createElement("span");
        customLinksHelp.className = "npml-settings-field-help";
        customLinksHelp.textContent =
            "One per line: Label | URL. Tokens: {{package}}, {{packagePath}}, {{encodedPackage}}, {{version}}, {{encodedVersion}}, {{packageSpec}}, {{packageVersionPath}}, {{encodedPackageSpec}}. Lines beginning with # are ignored.";
        customLinksField.append(
            customLinksLabel,
            customLinksInput,
            customLinksHelp,
            customLinksError
        );
        preferences.append(visibleLinksField, customLinksField);
        groups.append(preferences);

        for (const category of CATEGORY_ORDER) {
            const mirrors = PACKAGE_MIRRORS.filter(
                (mirror) => mirror.category === category
            );
            if (mirrors.length === 0) continue;

            const fieldset = document.createElement("fieldset");
            fieldset.className = "npml-settings-group";
            const legend = document.createElement("legend");
            legend.className = "npml-settings-legend";
            legend.textContent = category;
            fieldset.append(legend);
            for (const mirror of mirrors) {
                fieldset.append(createSettingsOption(mirror));
            }
            groups.append(fieldset);
        }

        const footer = document.createElement("footer");
        footer.className = "npml-settings-footer";
        footer.append(
            createSettingsButton("Cancel", () => dialog.close()),
            createSettingsButton("Save", "submit", true)
        );

        form.append(header, intro, toolbar, groups, footer);
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const customLinks = customLinksInput.value.trim();
            const { errors } = parseCustomLinks(customLinks);
            if (errors.length > 0) {
                customLinksError.hidden = false;
                customLinksError.textContent = errors.join("\n");
                customLinksInput.focus();
                return;
            }

            const disabledIds = PACKAGE_MIRRORS.filter((mirror) => {
                const checkbox = form.querySelector(
                    `input[value="${CSS.escape(mirror.id)}"]`
                );
                return !checkbox?.checked;
            }).map(({ id }) => id);
            saveRelatedLinkSettings({
                customLinks,
                disabledIds,
                visibleLinks: visibleLinksInput.value,
            });
            dialog.close();
        });

        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) dialog.close();
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
        form.querySelector('input[name="enabledMirror"]')?.focus();
    }

    function registerSettingsCommands() {
        if (typeof GM_registerMenuCommand !== "function") return;

        GM_registerMenuCommand(
            "Configure related package links…",
            openSettingsDialog
        );
        GM_registerMenuCommand(
            "Reset built-in links and popup size",
            resetMirrorSettings
        );
    }

    function alignMenuWithTitle(menu, titleContainer) {
        menu.style.right = window.getComputedStyle(titleContainer).paddingRight;
        const list = menu.querySelector(".npml-list:not([hidden])");
        if (list) keepMenuInViewport(list);
    }

    function keepMenuInViewport(menu) {
        const viewportPadding = 16;
        menu.style.transform = "";
        const bounds = menu.getBoundingClientRect();
        let shift = 0;

        if (bounds.left < viewportPadding) {
            shift = viewportPadding - bounds.left;
        } else if (bounds.right > window.innerWidth - viewportPadding) {
            shift = window.innerWidth - viewportPadding - bounds.right;
        }

        if (shift !== 0) menu.style.transform = `translateX(${shift}px)`;
    }

    function removeMirrorMenu() {
        menuAbortController?.abort();
        menuAbortController = null;
        document.querySelector(`[${MENU_ATTRIBUTE}]`)?.remove();
        document
            .querySelector(".npml-title-container")
            ?.classList.remove("npml-title-container");
        document
            .querySelector(".npml-heading-host")
            ?.classList.remove("npml-heading-host");
    }

    function renderMirrorMenu() {
        const packageHeading = document.querySelector("main h1");
        const titleContainer = packageHeading?.parentElement;
        if (!packageHeading || !titleContainer) return;

        const details = getPackageDetails();
        if (!details) return;

        const pageKey = [
            details.packageName,
            details.packageVersion,
            details.npmPath,
            details.npmSearch,
            details.npmHash,
            settingsVersion,
            disabledMirrorIds.join(","),
            visibleLinkCount,
            customLinksText,
        ].join("|");
        const existingMenu = document.querySelector(`[${MENU_ATTRIBUTE}]`);
        if (
            existingMenu?.dataset.pageKey === pageKey &&
            existingMenu.parentElement === titleContainer
        ) {
            alignMenuWithTitle(existingMenu, titleContainer);
            return;
        }

        if (existingMenu) removeMirrorMenu();

        const mirrorLinks = buildMirrorLinks(details);
        if (mirrorLinks.length === 0) {
            packageHeading.classList.remove("npml-heading-host");
            titleContainer.classList.remove("npml-title-container");
            return;
        }

        addStyles();
        titleContainer.classList.add("npml-title-container");
        packageHeading.classList.add("npml-heading-host");
        const menu = createMirrorMenu(details, mirrorLinks);
        menu.dataset.pageKey = pageKey;
        alignMenuWithTitle(menu, titleContainer);
        titleContainer.append(menu);
    }

    function scheduleRender() {
        if (renderFrame) return;

        renderFrame = window.requestAnimationFrame(() => {
            renderFrame = 0;
            renderMirrorMenu();
        });
    }

    registerSettingsCommands();
    const observer = new MutationObserver(scheduleRender);
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
    window.addEventListener("popstate", scheduleRender);
    window.addEventListener("resize", scheduleRender);
    scheduleRender();
})();
