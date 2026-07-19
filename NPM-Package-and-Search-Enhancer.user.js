// ==UserScript==
// @name         npm Package and Search Enhancer
// @version      0.6.0
// @description  Configurable package badges, links, search metadata, and modern npmjs.com improvements
// @license      MIT
// @author       Bjorn Lu; modernized by Nick2bad4u
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @namespace    nick2bad4u.github.io
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @source       https://github.com/bluwy/npm-userscript
// @downloadURL  https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/NPM-Package-and-Search-Enhancer.user.js
// @updateURL    https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/NPM-Package-and-Search-Enhancer.user.js
// @match        https://www.npmjs.com/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=npmjs.com
// @grant        GM.xmlHttpRequest
// @connect      api.github.com
// @connect      api.npmjs.org
// @connect      api.osv.dev
// @connect      cdn.jsdelivr.net
// @connect      data.jsdelivr.com
// @connect      registry.npmjs.org
// @inject-into  content
// @run-at       document-start
// ==/UserScript==

/* eslint-disable -- Generated bundle containing audited upstream and third-party code; authored TypeScript is type-checked before bundling. */

(() => {
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __esm = (fn, res) =>
        function __init() {
            return (
                fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))),
                res
            );
        };
    var __commonJS = (cb, mod) =>
        function __require() {
            return (
                mod ||
                    (0, cb[__getOwnPropNames(cb)[0]])(
                        (mod = { exports: {} }).exports,
                        mod
                    ),
                mod.exports
            );
        };
    var __export = (target, all) => {
        for (var name in all)
            __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
        if ((from && typeof from === "object") || typeof from === "function") {
            for (let key of __getOwnPropNames(from))
                if (!__hasOwnProp.call(to, key) && key !== except)
                    __defProp(to, key, {
                        get: () => from[key],
                        enumerable:
                            !(desc = __getOwnPropDesc(from, key)) ||
                            desc.enumerable,
                    });
        }
        return to;
    };
    var __toESM = (mod, isNodeMode, target) => (
        (target = mod != null ? __create(__getProtoOf(mod)) : {}),
        __copyProps(
            // If the importer is in node compatibility mode or this is not an ESM
            // file that has been converted to a CommonJS file using a Babel-
            // compatible transform (i.e. "__esModule" has not been set), then set
            // "default" to the CommonJS "module.exports" for node compatibility.
            isNodeMode || !mod || !mod.__esModule
                ? __defProp(target, "default", { value: mod, enumerable: true })
                : target,
            mod
        )
    );

    // src/utils-cache.ts
    function setCache(key, value, expirySeconds) {
        key = CACHE_PREFIX + key;
        const data = {
            value,
            expireOn: expirySeconds ? Date.now() + expirySeconds * 1e3 : null,
        };
        localStorage.setItem(key, JSON.stringify(data));
    }
    function getCache(key) {
        key = CACHE_PREFIX + key;
        const cached = localStorage.getItem(key);
        if (!cached) return null;
        const { value, expireOn } = JSON.parse(cached);
        if (expireOn && Date.now() >= expireOn) {
            localStorage.removeItem(key);
            return null;
        }
        return value;
    }
    function clearCache(key) {
        key = CACHE_PREFIX + key;
        localStorage.removeItem(key);
    }
    function clearCacheByPrefix(prefix, except) {
        prefix = CACHE_PREFIX + prefix;
        except = except?.map((k2) => CACHE_PREFIX + k2);
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith(prefix) && !except?.includes(key)) {
                localStorage.removeItem(key);
            }
        });
    }
    function clearExpiredCache() {
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith(CACHE_PREFIX)) {
                const cached = localStorage.getItem(key);
                if (cached) {
                    const expiredOn = /"expireOn":(\d+|null)}$/.exec(
                        cached
                    )?.[1];
                    if (
                        expiredOn &&
                        expiredOn !== "null" &&
                        Date.now() >= Number(expiredOn)
                    ) {
                        localStorage.removeItem(key);
                    }
                }
            }
        });
    }
    function hasCacheByPrefix(prefix) {
        prefix = CACHE_PREFIX + prefix;
        return Object.keys(localStorage).some((key) => key.startsWith(prefix));
    }
    function cacheResult(key, duration, fn) {
        if (key in _inMemoryCache) {
            return _inMemoryCache[key];
        }
        if (duration > 0) {
            const cached = cache.get(key);
            if (cached === void 0) return void 0;
            if (cached !== null) return JSON.parse(cached);
        }
        const result = fn();
        _inMemoryCache[key] = result;
        if (result.then) {
            result.then((resolved) => {
                _inMemoryCache[key] = resolved;
                if (duration > 0) {
                    cache.set(key, JSON.stringify(resolved), duration);
                }
            });
        } else {
            if (duration > 0) {
                cache.set(key, JSON.stringify(result), duration);
            }
        }
        return result;
    }
    var CACHE_PREFIX, cache, _inMemoryCache;
    var init_utils_cache = __esm({
        "src/utils-cache.ts"() {
            CACHE_PREFIX = "npm-userscript:";
            cache = {
                set: setCache,
                get: getCache,
                clear: clearCache,
                clearByPrefix: clearCacheByPrefix,
                clearExpired: clearExpiredCache,
                hasByPrefix: hasCacheByPrefix,
            };
            _inMemoryCache = {};
        },
    });

    // src/utils-npm-context.ts
    function getNpmContext() {
        if (npmContext == null) {
            throw new Error("npm context not yet loaded");
        }
        return npmContext;
    }
    function listenNpmContext() {}
    async function waitForNpmContextReady() {
        const key = getPageKey();
        if (npmContext && npmContextKey === key) return;
        if (!npmContextPromise || npmContextKey !== key) {
            npmContextKey = key;
            npmContextPromise = buildNpmContext(key)
                .then((context) => {
                    if (getPageKey() === key) npmContext = context;
                })
                .catch((error) => {
                    if (getPageKey() === key) npmContext = createEmptyContext();
                    console.error(
                        "[npm-userscript] Could not load npm package metadata:",
                        error
                    );
                });
        }
        await npmContextPromise;
        if (getPageKey() !== key) {
            await waitForNpmContextReady();
        }
    }
    async function buildNpmContext(key) {
        const packageName = getPackageNameFromPath();
        if (!packageName) return createEmptyContext();
        const packageVersion = (await waitForPackageVersion()) || "latest";
        const encodedPackageName = encodeURIComponent(packageName);
        const encodedPackageVersion = encodeURIComponent(packageVersion);
        const manifest = await requestJson(
            `https://registry.npmjs.org/${encodedPackageName}/${encodedPackageVersion}`
        );
        if (getPageKey() !== key) return createEmptyContext();
        const resolvedVersion =
            typeof manifest.version === "string"
                ? manifest.version
                : packageVersion;
        const isVersionsPage =
            new URLSearchParams(location.search).get("activeTab") ===
            "versions";
        let latestVersion = resolvedVersion;
        let versions = [];
        let versionsDownloads = {};
        if (isVersionsPage) {
            const [packument, downloadsResult] = await Promise.all([
                requestJson(`https://registry.npmjs.org/${encodedPackageName}`),
                requestJson(
                    `https://api.npmjs.org/versions/${encodedPackageName}/last-week`
                ).catch(() => ({ downloads: {} })),
            ]);
            latestVersion = packument["dist-tags"]?.latest || resolvedVersion;
            versionsDownloads = downloadsResult.downloads || {};
            versions = Object.keys(packument.versions || {}).map((version) => {
                const published = packument.time?.[version];
                const timestamp = published ? new Date(published).getTime() : 0;
                return {
                    version,
                    date: {
                        ts: Number.isFinite(timestamp) ? timestamp : 0,
                        rel:
                            Number.isFinite(timestamp) && timestamp > 0
                                ? formatRelativeTime(timestamp)
                                : "Unknown",
                    },
                };
            });
        } else if (location.pathname.includes("/v/")) {
            const latestManifest = await requestJson(
                `https://registry.npmjs.org/${encodedPackageName}/latest`
            ).catch(() => null);
            latestVersion = latestManifest?.version || resolvedVersion;
        }
        return {
            context: {
                capsule: { types: { typescript: getTypesInfo(manifest) } },
                packageVersion: { version: resolvedVersion },
                packument: {
                    distTags: { latest: latestVersion },
                    funding: normalizeFunding(manifest.funding),
                    homepage: normalizeHttpUrl(manifest.homepage),
                    repository: normalizeRepository(manifest.repository),
                    versions,
                },
                versionsDownloads,
            },
        };
    }
    function createEmptyContext() {
        return {
            context: {
                capsule: { types: { typescript: null } },
                packageVersion: { version: "" },
                packument: { distTags: {}, versions: [] },
                versionsDownloads: {},
            },
        };
    }
    function getPageKey() {
        return `${location.pathname}${location.search}`;
    }
    function getPackageNameFromPath() {
        if (!location.pathname.startsWith("/package/")) return void 0;
        const path = location.pathname.slice("/package/".length);
        const parts = path.split("/").filter(Boolean);
        const packageName = path.startsWith("@")
            ? parts.slice(0, 2).join("/")
            : parts[0];
        if (!packageName) return void 0;
        try {
            return decodeURIComponent(packageName);
        } catch {
            return packageName;
        }
    }
    function getVersionFromPath() {
        const match = /\/v\/([^/?#]+)/.exec(location.pathname);
        if (!match) return void 0;
        try {
            return decodeURIComponent(match[1]);
        } catch {
            return match[1];
        }
    }
    async function waitForPackageVersion() {
        const pathVersion = getVersionFromPath();
        const currentVersion = getSidebarValue("Version");
        if (currentVersion) return currentVersion;
        if (pathVersion && /^\d/.test(pathVersion)) return pathVersion;
        return new Promise((resolve) => {
            const timeout = window.setTimeout(() => {
                observer2.disconnect();
                resolve(pathVersion);
            }, 5e3);
            const observer2 = new MutationObserver(() => {
                const version = getSidebarValue("Version");
                if (!version) return;
                window.clearTimeout(timeout);
                observer2.disconnect();
                resolve(version);
            });
            observer2.observe(document.documentElement, {
                childList: true,
                subtree: true,
            });
        });
    }
    function getSidebarValue(label) {
        const sidebar = document.querySelector(
            'aside[aria-label="Package sidebar"]'
        );
        const heading = Array.from(
            sidebar?.querySelectorAll("h2, h3") || []
        ).find((element) => element.textContent?.trim() === label);
        if (!heading) return void 0;
        const value = heading.parentElement
            ?.querySelector("p")
            ?.textContent?.trim();
        return (
            value || heading.nextElementSibling?.textContent?.trim() || void 0
        );
    }
    function getTypesInfo(manifest) {
        if (
            typeof manifest.types === "string" ||
            typeof manifest.typings === "string"
        ) {
            return { bundled: true };
        }
        const typesLink = document.querySelector(
            'main h1 a[href^="/package/@types/"]'
        );
        if (!typesLink) return null;
        const packageName = typesLink
            .getAttribute("href")
            ?.slice("/package/".length);
        return packageName
            ? { package: decodeURIComponent(packageName) }
            : null;
    }
    function normalizeFunding(value) {
        const funding = Array.isArray(value) ? value[0] : value;
        const url = typeof funding === "string" ? funding : funding?.url;
        const normalized = normalizeHttpUrl(url);
        return normalized ? { url: normalized } : void 0;
    }
    function normalizeRepository(value) {
        let repository = typeof value === "string" ? value : value?.url;
        if (typeof repository !== "string") return void 0;
        repository = repository
            .replace(/^git\+/, "")
            .replace(/^git:\/\//, "https://")
            .replace(/^git@github\.com:/, "https://github.com/")
            .replace(/\.git$/, "");
        return normalizeHttpUrl(repository);
    }
    function normalizeHttpUrl(value) {
        if (typeof value !== "string") return void 0;
        try {
            const url = new URL(value);
            return url.protocol === "https:" || url.protocol === "http:"
                ? url.href
                : void 0;
        } catch {
            return void 0;
        }
    }
    function formatRelativeTime(timestamp) {
        const deltaSeconds = Math.round((timestamp - Date.now()) / 1e3);
        const units = [
            ["year", 31556952],
            ["month", 2629746],
            ["week", 604800],
            ["day", 86400],
            ["hour", 3600],
            ["minute", 60],
        ];
        const formatter = new Intl.RelativeTimeFormat(void 0, {
            numeric: "auto",
        });
        for (const [unit, seconds] of units) {
            if (Math.abs(deltaSeconds) >= seconds) {
                return formatter.format(
                    Math.round(deltaSeconds / seconds),
                    unit
                );
            }
        }
        return formatter.format(deltaSeconds, "second");
    }
    function requestJson(url) {
        return new Promise((resolve, reject) => {
            GM.xmlHttpRequest({
                url,
                method: "GET",
                responseType: "json",
                timeout: 2e4,
                onload(response) {
                    if (response.status >= 200 && response.status < 300) {
                        resolve(response.response);
                    } else {
                        reject(
                            new Error(
                                `npm request failed with HTTP ${response.status}: ${url}`
                            )
                        );
                    }
                },
                onerror: () => reject(new Error(`npm request failed: ${url}`)),
                ontimeout: () =>
                    reject(new Error(`npm request timed out: ${url}`)),
                onabort: () =>
                    reject(new Error(`npm request was aborted: ${url}`)),
            });
        });
    }
    var npmContext, npmContextKey, npmContextPromise;
    var init_utils_npm_context = __esm({
        "src/utils-npm-context.ts"() {
            npmContext = null;
            npmContextKey = "";
            npmContextPromise = null;
        },
    });

    // src/utils.ts
    function addStyle(css) {
        css = css.trim();
        if (styles.includes(css) || allStyles.includes(css)) return;
        styles.push(css);
    }
    function consolidateStyles() {
        const style = document.createElement("style");
        const combinedStyles = styles.join("\n");
        style.textContent = combinedStyles;
        allStyles += combinedStyles;
        document.head.appendChild(style);
        styles.length = 0;
    }
    async function waitForElement(selector, timeout = 1e3) {
        const element = document.querySelector(selector);
        if (element) return element;
        return new Promise((resolve, reject) => {
            const timeoutTimer = setTimeout(() => {
                clearInterval(queryTimer);
                clearInterval(timeoutTimer);
                reject(new Error(`Timeout waiting for element: ${selector}`));
            }, timeout);
            const queryTimer = setInterval(() => {
                const element2 = document.querySelector(selector);
                if (element2) {
                    clearInterval(queryTimer);
                    clearTimeout(timeoutTimer);
                    resolve(element2);
                }
            }, 100);
        });
    }
    function getPackageName() {
        if (!location.pathname.startsWith("/package/")) return void 0;
        const packagePath = location.pathname.slice("/package/".length);
        const parts = packagePath.split("/").filter(Boolean);
        if (parts.length === 0) return void 0;
        const firstPart = decodeURIComponent(parts[0]);
        if (firstPart.startsWith("@") && firstPart.includes("/")) {
            return firstPart;
        }
        if (packagePath.startsWith("@")) {
            return parts.length >= 2
                ? `${firstPart}/${decodeURIComponent(parts[1])}`
                : void 0;
        }
        return firstPart;
    }
    function getPackageVersion() {
        if (!location.pathname.startsWith("/package/")) return void 0;
        const match = /\/v\/(.+?)(?:$|\/|\?|#)/.exec(location.pathname);
        if (match) return decodeURIComponent(match[1]);
        return getNpmContext().context.packageVersion.version;
    }
    function isValidPackagePage() {
        return (
            location.pathname.startsWith("/package/") && // if is a valid package, should be like "package-name - npm"
            document.title !== "npm"
        );
    }
    function isSamePackagePage(previousUrl) {
        const previousPathname = new URL(previousUrl).pathname;
        const newPathname = location.pathname;
        return previousPathname === newPathname;
    }
    function getGitHubOwnerRepo() {
        const repositoryLink = getNpmContext().context.packument.repository;
        if (!repositoryLink) return void 0;
        return /github\.com\/([^\/]+\/[^\/]+)/.exec(repositoryLink)?.[1];
    }
    function prettyBytes(bytes) {
        if (bytes < 1e3) return `${bytes} B`;
        const units = [
            "kB",
            "MB",
            "GB",
            "TB",
        ];
        let i2 = -1;
        do {
            bytes *= 1e-3;
            i2++;
        } while (bytes >= 1e3 && i2 < units.length - 1);
        const unit = units[i2];
        const num = unit === "kB" ? Math.round(bytes) : bytes.toFixed(2);
        return `${num} ${unit}`;
    }
    function ensureSidebarBalance() {
        const halfWidthColumns = document.querySelectorAll(
            '[aria-label="Package sidebar"] div.w-50:not(.w-100)'
        );
        if (halfWidthColumns.length % 2 === 1) {
            const lastColumn = halfWidthColumns[halfWidthColumns.length - 1];
            lastColumn.classList.add("w-100");
            lastColumnH3Text =
                lastColumn.querySelector("h3")?.textContent || null;
        }
    }
    function teardownSidebarBalance() {
        if (lastColumnH3Text) {
            const columns = document.querySelectorAll(
                '[aria-label="Package sidebar"] div.w-50.w-100'
            );
            const lastColumn = Array.from(columns).find(
                (col) =>
                    col.querySelector("h3")?.textContent === lastColumnH3Text
            );
            lastColumn?.classList.remove("w-100");
            lastColumnH3Text = null;
        }
    }
    var styles, allStyles, lastColumnH3Text;
    var init_utils = __esm({
        "src/utils.ts"() {
            init_utils_npm_context();
            styles = [];
            allStyles = "";
            lastColumnH3Text = null;
        },
    });

    // src/utils-fetch.ts
    async function getFullRepositoryLink() {
        const repository = getNpmContext().context.packument.repository;
        if (!repository) return;
        const packageJson = await fetchPackageJson();
        const directory = packageJson?.repository?.directory;
        if (!directory) return repository;
        return getRepositoryFilePath(directory);
    }
    async function getRepositoryFilePath(filePath) {
        const repository = getNpmContext().context.packument.repository;
        if (!repository) return;
        let repositoryFilePath = repository;
        if (!/\/tree\/.+$/.test(repository)) {
            const repoData = await fetchGitHubRepoData();
            if (!repoData) return;
            repositoryFilePath += `/tree/${repoData.default_branch}`;
        }
        if (repositoryFilePath.endsWith("/")) {
            repositoryFilePath = repositoryFilePath.slice(0, -1);
        }
        if (filePath.startsWith("/")) {
            filePath = filePath.slice(1);
        }
        if (filePath) {
            repositoryFilePath += `/${filePath}`;
        }
        return repositoryFilePath;
    }
    async function fetchPackageFilesData() {
        const packageName = getPackageName();
        const packageVersion = getPackageVersion();
        if (!packageName || !packageVersion) return void 0;
        return cacheResult(
            `fetchPackageFiles:${packageName}@${packageVersion}`,
            60,
            () =>
                fetchJson(
                    `https://www.npmjs.com/package/${packageName}/v/${packageVersion}/index`
                )
        );
    }
    async function fetchPackageFileContent(hex) {
        const packageName = getPackageName();
        if (!packageName) return void 0;
        return cacheResult(`fetchPackageFiles:${packageName}-${hex}`, 0, () =>
            fetchJson(
                `https://www.npmjs.com/package/${packageName}/file/${hex}`
            )
        );
    }
    async function fetchPackageJson() {
        const packageName = getPackageName();
        const packageVersion = getPackageVersion();
        if (!packageName || !packageVersion) return void 0;
        return cacheResult(
            `fetchPackageJson:${packageName}@${packageVersion}`,
            60,
            () =>
                fetchJson(
                    `https://registry.npmjs.org/${packageName}/${packageVersion}`
                )
        );
    }
    async function fetchGitHubRepoData() {
        const ownerRepo = getGitHubOwnerRepo();
        if (!ownerRepo) return void 0;
        return cacheResult(`fetchGitHubRepoData:${ownerRepo}`, 60, () =>
            fetchJson(`https://api.github.com/repos/${ownerRepo}`)
        );
    }
    async function fetchGitHubPullRequestsCount() {
        const ownerRepo = getGitHubOwnerRepo();
        if (!ownerRepo) return void 0;
        return cacheResult(`fetchPrCount:${ownerRepo}`, 60, async () => {
            const result = await fetchJson(
                `https://api.github.com/search/issues?q=repo:${ownerRepo}+type:pr+state:open&per_page=1`
            );
            return result.total_count;
        });
    }
    function fetchText(input, init) {
        return new Promise((resolve, reject) => {
            GM.xmlHttpRequest({
                ...getSharedOptions(input, init, reject),
                responseType: "text",
                onload: (response) => {
                    if (isSuccessful(response.status)) {
                        resolve(response.responseText);
                    } else {
                        reject(
                            new Error(
                                `Request failed with HTTP ${response.status}: ${input.toString()}`
                            )
                        );
                    }
                },
            });
        });
    }
    function fetchJson(input, init) {
        return new Promise((resolve, reject) => {
            GM.xmlHttpRequest({
                ...getSharedOptions(input, init, reject),
                responseType: "json",
                onload: (response) => {
                    if (isSuccessful(response.status)) {
                        resolve(response.response);
                    } else {
                        reject(
                            new Error(
                                `Request failed with HTTP ${response.status}: ${input.toString()}`
                            )
                        );
                    }
                },
            });
        });
    }
    function fetchContentLength(input) {
        return new Promise((resolve, reject) => {
            const url = input.toString();
            GM.xmlHttpRequest({
                url,
                method: "GET",
                headers: { Range: "bytes=0-0" },
                responseType: "arraybuffer",
                timeout: 2e4,
                onload(response) {
                    if (!isSuccessful(response.status)) {
                        reject(
                            new Error(
                                `Range request failed with HTTP ${response.status}: ${url}`
                            )
                        );
                        return;
                    }
                    const contentRange = getResponseHeader(
                        response.responseHeaders,
                        "content-range"
                    );
                    const total = /\/([0-9]+)$/.exec(contentRange || "")?.[1];
                    const contentLength = getResponseHeader(
                        response.responseHeaders,
                        "content-length"
                    );
                    const size2 = Number(total || contentLength);
                    if (Number.isSafeInteger(size2) && size2 > 0) {
                        resolve(size2);
                    } else {
                        reject(
                            new Error(
                                `Range response did not include a valid package size: ${url}`
                            )
                        );
                    }
                },
                onerror: () =>
                    reject(new Error(`Range request failed: ${url}`)),
                ontimeout: () =>
                    reject(new Error(`Range request timed out: ${url}`)),
                onabort: () =>
                    reject(new Error(`Range request was aborted: ${url}`)),
            });
        });
    }
    function fetchStatus(input, init) {
        return new Promise((resolve, reject) => {
            GM.xmlHttpRequest({
                ...getSharedOptions(input, init, reject),
                method: "HEAD",
                onreadystatechange: (response) => {
                    if (response.readyState === 2) {
                        resolve(response.status);
                    }
                },
            });
        });
    }
    function getSharedOptions(input, init, reject) {
        return {
            ...init,
            url: input instanceof Request ? input.url : input.toString(),
            // @ts-expect-error
            method: init?.method || "GET",
            headers: init?.headers
                ? init.headers instanceof Headers
                    ? Object.fromEntries(init.headers.entries())
                    : Array.isArray(init.headers)
                      ? Object.fromEntries(init.headers)
                      : init.headers
                : void 0,
            data: init?.body?.toString() ?? void 0,
            onerror: (err) => reject(err),
            ontimeout: () => reject(new Error("Request timed out")),
            onabort: () => reject(new Error("Request aborted")),
        };
    }
    function isSuccessful(status) {
        return status >= 200 && status < 300;
    }
    function getResponseHeader(headers, name) {
        const expression = new RegExp(`^${name}:\\s*(.+)$`, "im");
        return expression.exec(headers)?.[1]?.trim();
    }
    var init_utils_fetch = __esm({
        "src/utils-fetch.ts"() {
            init_utils_cache();
            init_utils_npm_context();
            init_utils();
        },
    });

    // src/features/better-dependencies.ts
    var better_dependencies_exports = {};
    __export(better_dependencies_exports, {
        description: () => description,
        run: () => run,
        runPre: () => runPre,
    });
    function runPre() {
        addStyle(`
    #tabpanel-dependencies li sup {
      font-size: 0.875rem;
      top: -0.6rem;
      opacity: 0.7;
    }
  `);
        addStyle(`
    #tabpanel-dependencies li > a {
      color: var(--wombat-red);
    }
  `);
        addStyle(`
    #tabpanel-dependencies[data-attribute="hidden"] {
      display: none;
    }
  `);
        addStyle(`
    #tabpanel-dependencies > h2:not([data-npm-userscript-added]),
    #tabpanel-dependencies > ul:not([data-npm-userscript-added]) {
      display: none;
    }
  `);
    }
    async function run() {
        if (!isValidPackagePage()) return;
        if (
            new URLSearchParams(location.search).get("activeTab") !==
            "dependencies"
        )
            return;
        if (document.querySelector('[aria-label="Peer Dependencies"]')) return;
        const packageJson = await fetchPackageJson();
        if (!packageJson) return;
        const section = document.getElementById("tabpanel-dependencies");
        if (!section) return;
        const h2 = section.querySelector("h2");
        const ul = section.querySelector("ul");
        const li =
            section.querySelector("li") ??
            (() => {
                const el = document.createElement("li");
                el.className = "dib mr2";
                el.innerHTML = `<a class="f4 fw6 fl db pv1 ma2 black-70 link hover-black animate" href=""></a>`;
                return el;
            })();
        const peerDependencies = {};
        const optionalPeerDependencies = {};
        if (packageJson.peerDependencies) {
            for (const [depName, depVersion] of Object.entries(
                packageJson.peerDependencies
            )) {
                if (
                    packageJson.peerDependenciesMeta?.[depName]?.optional ===
                    true
                ) {
                    optionalPeerDependencies[depName] = depVersion;
                } else {
                    peerDependencies[depName] = depVersion;
                }
            }
        }
        const groups = [
            { title: "Dependencies", data: packageJson.dependencies },
            { title: "Peer Dependencies", data: peerDependencies },
            {
                title: "Optional Peer Dependencies",
                data: optionalPeerDependencies,
            },
            {
                title: "Optional Dependencies",
                data: packageJson.optionalDependencies,
            },
            { title: "Dev Dependencies", data: packageJson.devDependencies },
        ];
        const elements = [];
        for (const group of groups) {
            const normalizedData = group.data
                ? Object.entries(group.data).sort((a2, b2) =>
                      a2[0].localeCompare(b2[0])
                  )
                : [];
            const newH2 = h2.cloneNode();
            newH2.setAttribute("data-npm-userscript-added", "true");
            newH2.textContent = `${group.title} (${normalizedData.length})`;
            elements.push(newH2);
            const newUl = ul.cloneNode();
            newUl.setAttribute("data-npm-userscript-added", "true");
            newUl.ariaLabel = group.title;
            for (const [depName, depVersion] of normalizedData) {
                const newLi = li.cloneNode(true);
                newLi.classList.remove("mr2");
                newLi.classList.add("mr1");
                newLi.querySelector("a").innerHTML =
                    `${depName} <sup>${depVersion}</sup>`;
                newLi.querySelector("a").href =
                    `/package/${encodeURIComponent(depName)}`;
                newUl.appendChild(newLi);
            }
            elements.push(newUl);
        }
        for (const el of elements) {
            section.appendChild(el);
        }
    }
    var description;
    var init_better_dependencies = __esm({
        "src/features/better-dependencies.ts"() {
            init_utils_fetch();
            init_utils();
            description = `Improved package dependencies tab with added peer dependencies info, optional dependencies info,
and dependency semver ranges.
`;
        },
    });

    // src/features/better-versions.ts
    var better_versions_exports = {};
    __export(better_versions_exports, {
        description: () => description2,
        run: () => run2,
        runPre: () => runPre2,
    });
    function runPre2() {
        if (!isValidPackagePage()) return;
        addStyle(`
    table[aria-labelledby="current-tags"] tbody tr td,
    table[aria-labelledby="cumulated-versions"] tbody tr td,
    table[aria-labelledby="version-history"] tbody tr td {
      padding-bottom: 8px;
    }
  `);
        addStyle(`
    table[aria-labelledby="current-tags"] td > span:last-child > div,
    table[aria-labelledby="version-history"] td > span:last-child > div,
    table[aria-labelledby="current-tags"] td > span:last-child > div > button,
    table[aria-labelledby="version-history"] td > span:last-child > div > button {
      display: inline-block;
    }

    table[aria-labelledby="current-tags"] td > span:last-child > div > div,
    table[aria-labelledby="version-history"] td > span:last-child > div > div {
      right: calc(50% - 2px);
    }
  `);
        addStyle(`
    table[aria-labelledby="current-tags"] th:nth-child(1),
    table[aria-labelledby="cumulated-versions"] th:nth-child(1),
    table[aria-labelledby="version-history"] th:nth-child(1) {
      width: 37%;
    }
    table[aria-labelledby="current-tags"] th:nth-child(2),
    table[aria-labelledby="cumulated-versions"] th:nth-child(2),
    table[aria-labelledby="version-history"] th:nth-child(2) {
      width: 30%;
    }
    table[aria-labelledby="current-tags"] th:nth-child(3),
    table[aria-labelledby="cumulated-versions"] th:nth-child(3),
    table[aria-labelledby="version-history"] th:nth-child(3) {
      width: 33%;
    }
  `);
        addStyle(`
    #current-tags {
      margin-bottom: 0;
    }

    #cumulated-versions,
    #version-history {
      margin-top: 2rem;
      margin-bottom: 0;
    }
  `);
        addStyle(`
    table[aria-labelledby="cumulated-versions"] .npm-userscript-cumulated-versions-minor {
      display: none;
    }
    table[aria-labelledby="cumulated-versions"] .npm-userscript-cumulated-versions-minor[open] {
      display: table-row-group;
    }
  `);
        addStyle(`
    html[data-color-mode="dark"] table[aria-labelledby="current-tags"] thead th,
    html[data-color-mode="dark"] table[aria-labelledby="current-tags"] tbody td,
    html[data-color-mode="dark"] table[aria-labelledby="cumulated-versions"] thead th,
    html[data-color-mode="dark"] table[aria-labelledby="cumulated-versions"] tbody td,
    html[data-color-mode="dark"] table[aria-labelledby="version-history"] thead th,
    html[data-color-mode="dark"] table[aria-labelledby="version-history"] tbody td {
      border-color: var(--color-border-default);
    }
  `);
    }
    function run2() {
        if (!isValidPackagePage()) return;
        if (
            new URLSearchParams(location.search).get("activeTab") !== "versions"
        )
            return;
        addVersionTag();
        addCumulatedVersionsTable();
    }
    function addVersionTag() {
        if (document.querySelector(".npm-userscript-tag")) return;
        const versionToTags = {};
        document
            .querySelectorAll('table[aria-labelledby="current-tags"] tr')
            .forEach((row) => {
                const version = row.querySelector("td a")?.textContent;
                const tag = row.querySelector("td:last-child")?.textContent;
                if (version && tag) {
                    if (!versionToTags[version]) {
                        versionToTags[version] = [];
                    }
                    versionToTags[version].push(tag);
                }
            });
        for (const [version, tags] of Object.entries(versionToTags)) {
            const row = document.querySelector(
                `table[aria-labelledby="version-history"] tr td a[href$="/v/${version}"]`
            );
            row?.insertAdjacentHTML(
                "afterend",
                `<span class="npm-userscript-tag ml2">(${tags.join(", ")})</span>`
            );
        }
    }
    function addCumulatedVersionsTable() {
        if (document.getElementById("cumulated-versions")) return;
        const versionHistoryH3 = document.querySelector("h3#version-history");
        if (!versionHistoryH3) return;
        const versionHistoryTable = document.querySelector(
            'table[aria-labelledby="version-history"]'
        );
        if (!versionHistoryTable) return;
        const newH3 = versionHistoryH3.cloneNode(true);
        newH3.id = "cumulated-versions";
        newH3.textContent = "Cumulated Versions";
        const newTable = versionHistoryTable.cloneNode(true);
        newTable.setAttribute("aria-labelledby", "cumulated-versions");
        const newBody = newTable.querySelector("tbody");
        if (!newBody) return;
        const majorToInfo = {};
        const minorToInfo = {};
        const npmContext2 = getNpmContext();
        for (const entry of npmContext2.context.packument.versions) {
            const version = entry.version;
            const major = version.split(".")[0];
            const minor = version.split(".").slice(0, 2).join(".");
            const downloads =
                npmContext2.context.versionsDownloads[version] || 0;
            const lastPublished = entry.date;
            if (!majorToInfo[major]) {
                majorToInfo[major] = { totalDownloads: 0, lastPublished };
            }
            majorToInfo[major].totalDownloads += downloads;
            if (!minorToInfo[minor]) {
                minorToInfo[minor] = { totalDownloads: 0, lastPublished };
            }
            minorToInfo[minor].totalDownloads += downloads;
        }
        newBody.remove();
        const keys = Object.keys(majorToInfo).sort(
            (a2, b2) => parseInt(b2) - parseInt(a2)
        );
        for (const major of keys) {
            const majorInfo = majorToInfo[major];
            const majorDate = new Date(majorInfo.lastPublished.ts);
            const majorTbody = document.createElement("tbody");
            majorTbody.innerHTML = `
      <tr>
        <td style="cursor: pointer;">
          <span class="f5 black-80 lh-copy code">${major}.x</span>
        </td>
        <td>${majorInfo.totalDownloads.toLocaleString()}</td>
        <td class="f5 black-60 lh-copy">
          <time datetime="${majorDate.toISOString()}" title="${majorDate.toLocaleString()}">
            ${majorInfo.lastPublished.rel}
          </time>
        </td>
      </tr>
    `;
            const minorTbody = document.createElement("tbody");
            minorTbody.className = "npm-userscript-cumulated-versions-minor";
            const minorKeys = Object.keys(minorToInfo)
                .filter((k2) => k2.startsWith(major + "."))
                .sort((a2, b2) => {
                    const [aMajor, aMinor] = a2
                        .split(".")
                        .map((n2) => parseInt(n2, 10));
                    const [bMajor, bMinor] = b2
                        .split(".")
                        .map((n2) => parseInt(n2, 10));
                    if (aMajor !== bMajor) return bMajor - aMajor;
                    return bMinor - aMinor;
                });
            for (const minor of minorKeys) {
                const minorInfo = minorToInfo[minor];
                const minorDate = new Date(minorInfo.lastPublished.ts);
                minorTbody.innerHTML += `
        <tr>
          <td><span class="f6 black-80 code ml3">${minor}.x</span></td>
          <td class="o-80">${minorInfo.totalDownloads.toLocaleString()}</td>
          <td class="o-80 f5 black-60 lh-copy">
            <time datetime="${minorDate.toISOString()}" title="${minorDate.toLocaleString()}">
              ${minorInfo.lastPublished.rel}
            </time>
          </td>
        </tr>
      `;
            }
            majorTbody.querySelector("td")?.addEventListener("click", () => {
                minorTbody.toggleAttribute("open");
            });
            newTable.appendChild(majorTbody);
            newTable.appendChild(minorTbody);
        }
        versionHistoryH3.insertAdjacentElement("beforebegin", newH3);
        versionHistoryH3.insertAdjacentElement("beforebegin", newTable);
    }
    var description2;
    var init_better_versions = __esm({
        "src/features/better-versions.ts"() {
            init_utils_npm_context();
            init_utils();
            description2 = `Improved package versions tab with compact table view, cumulated versions table, show tags next to
versions, and fix provenance icon alignment.
`;
        },
    });

    // src/enhancement-settings.ts
    function localStorageStore(key, defaultValue) {
        const store = {
            get() {
                const value = localStorage.getItem(key);
                if (value !== null) {
                    try {
                        return JSON.parse(value);
                    } catch {
                        localStorage.removeItem(key);
                    }
                }
                store.reset();
                return structuredClone(defaultValue);
            },
            set(value) {
                localStorage.setItem(key, JSON.stringify(value));
            },
            reset() {
                store.set(defaultValue);
            },
        };
        return store;
    }
    function parseCustomLinks(input) {
        const links = [];
        const errors = [];
        for (const [index, rawLine] of input.split(/\r?\n/).entries()) {
            const line = rawLine.trim();
            if (!line || line.startsWith("#")) continue;
            if (links.length >= MAX_CUSTOM_LINKS) {
                errors.push(
                    `Only the first ${MAX_CUSTOM_LINKS} custom links are used.`
                );
                break;
            }
            const [
                label = "",
                urlTemplate = "",
                iconTemplate = "",
                ...extra
            ] = line.split("|").map((part) => part.trim());
            const lineNumber = index + 1;
            if (extra.length > 0 || !label || !urlTemplate) {
                errors.push(
                    `Line ${lineNumber}: use Label | URL | optional icon URL.`
                );
                continue;
            }
            if (label.length > MAX_LABEL_LENGTH) {
                errors.push(
                    `Line ${lineNumber}: label is longer than ${MAX_LABEL_LENGTH} characters.`
                );
                continue;
            }
            if (
                urlTemplate.length > MAX_URL_LENGTH ||
                iconTemplate.length > MAX_URL_LENGTH
            ) {
                errors.push(`Line ${lineNumber}: URL is too long.`);
                continue;
            }
            try {
                validateHttpTemplate(urlTemplate);
                if (iconTemplate) validateHttpTemplate(iconTemplate);
            } catch (error) {
                errors.push(`Line ${lineNumber}: ${error.message}`);
                continue;
            }
            links.push({
                label,
                urlTemplate,
                iconTemplate: iconTemplate || void 0,
            });
        }
        return { links, errors };
    }
    function fillLinkTemplate(template, context) {
        const version = context.version || "";
        const packagePath = context.packageName.startsWith("@")
            ? context.packageName
            : encodeURIComponent(context.packageName);
        const values = {
            package: context.packageName,
            packagePath,
            encodedPackage: encodeURIComponent(context.packageName),
            version,
            encodedVersion: encodeURIComponent(version),
            packageSpec: version
                ? `${context.packageName}@${version}`
                : context.packageName,
            encodedPackageSpec: encodeURIComponent(
                version
                    ? `${context.packageName}@${version}`
                    : context.packageName
            ),
        };
        return template.replace(
            /\{\{([A-Za-z]+)\}\}/g,
            (match, token) => values[token] ?? match
        );
    }
    function validateHttpTemplate(template) {
        const filled = fillLinkTemplate(template, {
            packageName: "@scope/package",
            version: "1.2.3",
        });
        const url = new URL(filled);
        if (url.protocol !== "https:" && url.protocol !== "http:") {
            throw new Error("only http:// and https:// URLs are allowed.");
        }
    }
    var badgeDefinitions,
        badgeVisibility,
        linkDefinitions,
        linkVisibility,
        customLinksSetting,
        MAX_CUSTOM_LINKS,
        MAX_LABEL_LENGTH,
        MAX_URL_LENGTH;
    var init_enhancement_settings = __esm({
        "src/enhancement-settings.ts"() {
            badgeDefinitions = {
                esm: "ESM",
                cjs: "CJS",
                dts: "TypeScript types (DTS)",
                untyped: "Untyped warning",
                cli: "Command-line package (CLI)",
                binary: "Native binaries",
                node: "Node.js engine requirement",
                lifecycle: "Install lifecycle scripts",
                vulnerable: "Known vulnerabilities",
                alternatives: "Package alternatives",
            };
            badgeVisibility = Object.fromEntries(
                Object.keys(badgeDefinitions).map((id) => [
                    id,
                    localStorageStore(
                        `npm-enhancer:settings:badge:${id}`,
                        true
                    ),
                ])
            );
            linkDefinitions = {
                documentation: "npm documentation",
                repository: "Repository",
                homepage: "Homepage",
                funding: "Funding",
                npmx: "npmx",
                publint: "publint",
                attw: "Are the Types Wrong?",
                npmgraph: "npmgraph",
                pkgSize: "pkg-size",
                nodeModulesInspector: "Node Modules Inspector",
                packagephobia: "Packagephobia",
                bundlejs: "Bundlejs",
                custom: "Custom links",
            };
            linkVisibility = Object.fromEntries(
                Object.keys(linkDefinitions).map((id) => [
                    id,
                    localStorageStore(`npm-enhancer:settings:link:${id}`, true),
                ])
            );
            customLinksSetting = localStorageStore(
                "npm-enhancer:settings:custom-links",
                ""
            );
            MAX_CUSTOM_LINKS = 20;
            MAX_LABEL_LENGTH = 48;
            MAX_URL_LENGTH = 1500;
        },
    });

    // src/features/compact-navigation.ts
    var compact_navigation_exports = {};
    __export(compact_navigation_exports, {
        description: () => description3,
        run: () => run3,
        runPre: () => runPre3,
    });
    function runPre3() {
        addStyle(`
    div:has(> nav[aria-label="Product Navigation"]) {
      display: none !important;
    }

    .npm-userscript-header-actions {
      display: flex;
      align-items: center;
      align-self: center;
      gap: 2px;
      margin-left: 12px;
      order: 1;
      white-space: nowrap;
    }

    .npm-userscript-docs-link {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 7px 8px;
      color: inherit;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      opacity: 0.85;
    }

    .npm-userscript-docs-link:hover,
    .npm-userscript-docs-link:focus-visible {
      background: rgba(127, 127, 127, 0.14);
      opacity: 1;
    }

    .npm-userscript-docs-link svg {
      width: 15px;
      height: 15px;
      fill: currentColor;
    }

    @media (max-width: 37rem) {
      .npm-userscript-header-actions {
        margin-left: 4px;
      }

      .npm-userscript-docs-link span {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    }
  `);
    }
    function run3() {
        if (document.querySelector(".npm-userscript-header-actions")) return;
        const searchInput = document.querySelector(
            'input[aria-label="Search packages"]'
        );
        const primaryHeader =
            searchInput?.closest("form")?.parentElement?.parentElement;
        if (!primaryHeader) return;
        const profile = Array.from(primaryHeader.children).find((child) =>
            child.querySelector('button[aria-label="Profile menu"]')
        );
        if (!profile) return;
        const actions = document.createElement("div");
        actions.className = "npm-userscript-header-actions";
        if (linkVisibility.documentation.get()) {
            const documentation = document.createElement("a");
            documentation.className = "npm-userscript-docs-link";
            documentation.href = "https://docs.npmjs.com/";
            documentation.target = "_blank";
            documentation.rel = "noopener noreferrer";
            documentation.title = "npm documentation";
            documentation.setAttribute("aria-label", "npm documentation");
            documentation.innerHTML =
                '<svg aria-hidden="true" viewBox="0 0 16 16"><path d="M2.75 1A1.75 1.75 0 0 0 1 2.75v10.5C1 14.216 1.784 15 2.75 15H7.5V3.25C7.5 2.007 6.493 1 5.25 1h-2.5Zm10.5 0H10.75A2.75 2.75 0 0 0 8 3.75V15h5.25A1.75 1.75 0 0 0 15 13.25V2.75A1.75 1.75 0 0 0 13.25 1Z"/></svg><span>Docs</span>';
            actions.appendChild(documentation);
        }
        profile.insertAdjacentElement("beforebegin", actions);
    }
    var description3;
    var init_compact_navigation = __esm({
        "src/features/compact-navigation.ts"() {
            init_enhancement_settings();
            init_utils();
            description3 =
                "Hide npm paid-plan navigation and keep Documentation as a compact primary-header action.";
        },
    });

    // src/features/fix-highlight-styles.ts
    var fix_highlight_styles_exports = {};
    __export(fix_highlight_styles_exports, {
        description: () => description4,
        runPre: () => runPre4,
    });
    function runPre4() {
        if (isValidPackagePage()) {
            addStyle(`
      html[data-color-mode="dark"] .highlight {
        /*!
        * GitHub Dark v0.5.0
        * Copyright (c) 2012 - 2017 GitHub, Inc.
        * Licensed under MIT (https://github.com/primer/github-syntax-theme-generator/blob/master/LICENSE)
        */

        .pl-c /* comment, punctuation.definition.comment, string.comment */ {
          color: #959da5;
        }

        .pl-c1 /* constant, entity.name.constant, variable.other.constant, variable.language, support, meta.property-name, support.constant, support.variable, meta.module-reference, markup.quote, markup.raw, meta.diff.header */,
        .pl-s .pl-v /* string variable */ {
          color: #c8e1ff;
        }

        .pl-e /* entity */,
        .pl-en /* entity.name */ {
          color: #b392f0;
        }

        .pl-smi /* variable.parameter.function, storage.modifier.package, storage.modifier.import, storage.type.java, variable.other */,
        .pl-s .pl-s1 /* string source */ {
          color: #f6f8fa;
        }

        .pl-ent /* entity.name.tag */ {
          color: #7bcc72;
        }

        .pl-k /* keyword, storage, storage.type */ {
          color: #ea4a5a;
        }

        .pl-s /* string */,
        .pl-pds /* punctuation.definition.string, source.regexp, string.regexp.character-class */,
        .pl-s .pl-pse .pl-s1 /* string punctuation.section.embedded source */,
        .pl-sr /* string.regexp */,
        .pl-sr .pl-cce /* string.regexp constant.character.escape */,
        .pl-sr .pl-sre /* string.regexp source.ruby.embedded */,
        .pl-sr .pl-sra /* string.regexp string.regexp.arbitrary-repitition */ {
          color: #79b8ff;
        }

        .pl-v /* variable */,
        .pl-ml /* markup.list, sublimelinter.mark.warning */ {
          color: #fb8532;
        }

        .pl-bu /* invalid.broken, invalid.deprecated, invalid.unimplemented, message.error, brackethighlighter.unmatched, sublimelinter.mark.error */ {
          color: #d73a49;
        }

        .pl-ii /* invalid.illegal */ {
          color: #fafbfc;
          background-color: #d73a49;
        }

        .pl-c2 /* carriage-return */ {
          color: #fafbfc;
          background-color: #d73a49;
        }

        .pl-c2::before /* carriage-return */ {
          content: "^M";
        }

        .pl-sr .pl-cce /* string.regexp constant.character.escape */ {
          font-weight: bold;
          color: #7bcc72;
        }

        .pl-mh /* markup.heading */,
        .pl-mh .pl-en /* markup.heading entity.name */,
        .pl-ms /* meta.separator */ {
          font-weight: bold;
          color: #0366d6;
        }

        .pl-mi /* markup.italic */ {
          font-style: italic;
          color: #f6f8fa;
        }

        .pl-mb /* markup.bold */ {
          font-weight: bold;
          color: #f6f8fa;
        }

        .pl-md /* markup.deleted, meta.diff.header.from-file, punctuation.definition.deleted */ {
          color: #b31d28;
          background-color: #ffeef0;
        }

        .pl-mi1 /* markup.inserted, meta.diff.header.to-file, punctuation.definition.inserted */ {
          color: #176f2c;
          background-color: #f0fff4;
        }

        .pl-mc /* markup.changed, punctuation.definition.changed */ {
          color: #b08800;
          background-color: #fffdef;
        }

        .pl-mi2 /* markup.ignored, markup.untracked */ {
          color: #2f363d;
          background-color: #959da5;
        }

        .pl-mdr /* meta.diff.range */ {
          font-weight: bold;
          color: #b392f0;
        }

        .pl-mo /* meta.output */ {
          color: #0366d6;
        }

        .pl-ba /* brackethighlighter.tag, brackethighlighter.curly, brackethighlighter.round, brackethighlighter.square, brackethighlighter.angle, brackethighlighter.quote */ {
          color: #ffeef0;
        }

        .pl-sg /* sublimelinter.gutter-mark */ {
          color: #6a737d;
        }

        .pl-corl /* constant.other.reference.link, string.other.link */ {
          text-decoration: underline;
          color: #79b8ff;
        }
      }
    `);
        }
    }
    var description4;
    var init_fix_highlight_styles = __esm({
        "src/features/fix-highlight-styles.ts"() {
            init_utils();
            description4 = `Fix syntax highlighting contrast issues in dark mode by using the GitHub Dark theme.
`;
        },
    });

    // node_modules/.pnpm/uhtml@5.0.9/node_modules/uhtml/dist/prod/dom.js
    function v(e3) {
        const t2 = u;
        return ((u = e3), t2);
    }
    function b(e3) {
        return T.bind({
            previousValue: e3,
            value: e3,
            subs: void 0,
            subsTail: void 0,
            flags: 1,
        });
    }
    function x(e3) {
        const t2 = {
            fn: e3,
            subs: void 0,
            subsTail: void 0,
            deps: void 0,
            depsTail: void 0,
            flags: 2,
        };
        void 0 !== u ? s(t2, u) : void 0 !== d && s(t2, d);
        const n2 = v(t2);
        try {
            t2.fn();
        } finally {
            v(n2);
        }
        return D.bind(t2);
    }
    function y(e3) {
        const t2 = v(e3);
        a(e3);
        try {
            const t3 = e3.value;
            return t3 !== (e3.value = e3.getter(t3));
        } finally {
            (v(t2), l(e3));
        }
    }
    function w(e3, t2) {
        return ((e3.flags = 1), e3.previousValue !== (e3.previousValue = t2));
    }
    function S(e3, t2) {
        if (16 & t2 || (32 & t2 && o(e3.deps, e3))) {
            const t3 = v(e3);
            a(e3);
            try {
                e3.fn();
            } finally {
                (v(t3), l(e3));
            }
            return;
        }
        32 & t2 && (e3.flags = -33 & t2);
        let n2 = e3.deps;
        for (; void 0 !== n2; ) {
            const e4 = n2.dep,
                t3 = e4.flags;
            (64 & t3 && S(e4, (e4.flags = -65 & t3)), (n2 = n2.nextDep));
        }
    }
    function k() {
        for (; p < h; ) {
            const e3 = n[p];
            ((n[p++] = void 0), S(e3, (e3.flags &= -65)));
        }
        ((p = 0), (h = 0));
    }
    function T(...e3) {
        if (!e3.length) {
            const e4 = this.value;
            if (16 & this.flags && w(this, e4)) {
                const e5 = this.subs;
                void 0 !== e5 && c(e5);
            }
            return (void 0 !== u && s(this, u), e4);
        }
        {
            const t2 = e3[0];
            if (this.value !== (this.value = t2)) {
                this.flags = 17;
                const e4 = this.subs;
                void 0 !== e4 && (r(e4), f || k());
            }
        }
    }
    function D() {
        let e3 = this.deps;
        for (; void 0 !== e3; ) e3 = i(e3, this);
        const t2 = this.subs;
        (void 0 !== t2 && i(t2), (this.flags = 0));
    }
    function L() {
        return R.apply(null, arguments);
    }
    function Te(e3) {
        const t2 = H("<>"),
            n2 = H("</>");
        return (
            e3.replaceChildren(t2, ...e3.childNodes, n2),
            (be = true),
            P(e3, {
                [ye]: { writable: true, value: Q },
                firstChild: { value: t2 },
                lastChild: { value: n2 },
                parentNode: we,
                valueOf: Ce,
                replaceWith: Se,
                remove: ke,
            })
        );
    }
    function at(e3, ...t2) {
        const n2 = rt.apply(null, arguments);
        return Ge() ? n2.valueOf(true) : n2;
    }
    var e,
        t,
        n,
        s,
        i,
        r,
        o,
        l,
        a,
        c,
        u,
        d,
        f,
        p,
        h,
        O,
        $,
        W,
        E,
        R,
        _,
        j,
        F,
        P,
        B,
        J,
        V,
        H,
        q,
        G,
        I,
        K,
        Q,
        U,
        X,
        Y,
        Z,
        ee,
        te,
        ne,
        se,
        ie,
        re,
        oe,
        le,
        ae,
        ce,
        ue,
        de,
        fe,
        pe,
        he,
        ve,
        ge,
        be,
        me,
        xe,
        ye,
        we,
        Se,
        ke,
        Ce,
        De,
        Oe,
        Ne,
        $e,
        We,
        Ae,
        Ee,
        Me,
        Re,
        Le,
        _e,
        je,
        Fe,
        Pe,
        Be,
        Je,
        Ve,
        ze,
        He,
        qe,
        Ge,
        Ie,
        Ke,
        Qe,
        Ue,
        Xe,
        Ye,
        Ze,
        et,
        tt,
        nt,
        st,
        it,
        rt,
        ot;
    var init_dom = __esm({
        "node_modules/.pnpm/uhtml@5.0.9/node_modules/uhtml/dist/prod/dom.js"() {
            !(function (e3) {
                ((e3[(e3.None = 0)] = "None"),
                    (e3[(e3.Mutable = 1)] = "Mutable"),
                    (e3[(e3.Watching = 2)] = "Watching"),
                    (e3[(e3.RecursedCheck = 4)] = "RecursedCheck"),
                    (e3[(e3.Recursed = 8)] = "Recursed"),
                    (e3[(e3.Dirty = 16)] = "Dirty"),
                    (e3[(e3.Pending = 32)] = "Pending"));
            })(e || (e = {}));
            t = [];
            n = [];
            ({
                link: s,
                unlink: i,
                propagate: r,
                checkDirty: o,
                endTracking: l,
                startTracking: a,
                shallowPropagate: c,
            } = (function ({ update: e3, notify: t2, unwatched: n2 }) {
                let s2 = 0;
                return {
                    link: function (e4, t3) {
                        const n3 = t3.depsTail;
                        if (void 0 !== n3 && n3.dep === e4) return;
                        let i3;
                        if (
                            4 & t3.flags &&
                            ((i3 = void 0 !== n3 ? n3.nextDep : t3.deps),
                            void 0 !== i3 && i3.dep === e4)
                        )
                            return ((i3.version = s2), void (t3.depsTail = i3));
                        const r3 = e4.subsTail;
                        if (void 0 !== r3 && r3.version === s2 && r3.sub === t3)
                            return;
                        const o3 =
                            (t3.depsTail =
                            e4.subsTail =
                                {
                                    version: s2,
                                    dep: e4,
                                    sub: t3,
                                    prevDep: n3,
                                    nextDep: i3,
                                    prevSub: r3,
                                    nextSub: void 0,
                                });
                        void 0 !== i3 && (i3.prevDep = o3);
                        void 0 !== n3 ? (n3.nextDep = o3) : (t3.deps = o3);
                        void 0 !== r3 ? (r3.nextSub = o3) : (e4.subs = o3);
                    },
                    unlink: i2,
                    propagate: function (e4) {
                        let n3,
                            s3 = e4.nextSub;
                        e: for (;;) {
                            const i3 = e4.sub;
                            let r3 = i3.flags;
                            if (
                                3 & r3 &&
                                (60 & r3
                                    ? 12 & r3
                                        ? 4 & r3
                                            ? 48 & r3 || !o2(e4, i3)
                                                ? (r3 = 0)
                                                : ((i3.flags = 40 | r3),
                                                  (r3 &= 1))
                                            : (i3.flags = (-9 & r3) | 32)
                                        : (r3 = 0)
                                    : (i3.flags = 32 | r3),
                                2 & r3 && t2(i3),
                                1 & r3)
                            ) {
                                const t3 = i3.subs;
                                if (void 0 !== t3) {
                                    ((e4 = t3),
                                        void 0 !== t3.nextSub &&
                                            ((n3 = { value: s3, prev: n3 }),
                                            (s3 = e4.nextSub)));
                                    continue;
                                }
                            }
                            if (void 0 === (e4 = s3)) {
                                for (; void 0 !== n3; )
                                    if (
                                        ((e4 = n3.value),
                                        (n3 = n3.prev),
                                        void 0 !== e4)
                                    ) {
                                        s3 = e4.nextSub;
                                        continue e;
                                    }
                                break;
                            }
                            s3 = e4.nextSub;
                        }
                    },
                    checkDirty: function (t3, n3) {
                        let s3,
                            i3 = 0;
                        e: for (;;) {
                            const o3 = t3.dep,
                                l2 = o3.flags;
                            let a2 = false;
                            if (16 & n3.flags) a2 = true;
                            else if (17 & ~l2) {
                                if (!(33 & ~l2)) {
                                    ((void 0 === t3.nextSub &&
                                        void 0 === t3.prevSub) ||
                                        (s3 = { value: t3, prev: s3 }),
                                        (t3 = o3.deps),
                                        (n3 = o3),
                                        ++i3);
                                    continue;
                                }
                            } else if (e3(o3)) {
                                const e4 = o3.subs;
                                (void 0 !== e4.nextSub && r2(e4), (a2 = true));
                            }
                            if (a2 || void 0 === t3.nextDep) {
                                for (; i3; ) {
                                    --i3;
                                    const o4 = n3.subs,
                                        l3 = void 0 !== o4.nextSub;
                                    if (
                                        (l3
                                            ? ((t3 = s3.value), (s3 = s3.prev))
                                            : (t3 = o4),
                                        a2)
                                    ) {
                                        if (e3(n3)) {
                                            (l3 && r2(o4), (n3 = t3.sub));
                                            continue;
                                        }
                                    } else n3.flags &= -33;
                                    if (
                                        ((n3 = t3.sub), void 0 !== t3.nextDep)
                                    ) {
                                        t3 = t3.nextDep;
                                        continue e;
                                    }
                                    a2 = false;
                                }
                                return a2;
                            }
                            t3 = t3.nextDep;
                        }
                    },
                    endTracking: function (e4) {
                        const t3 = e4.depsTail;
                        let n3 = void 0 !== t3 ? t3.nextDep : e4.deps;
                        for (; void 0 !== n3; ) n3 = i2(n3, e4);
                        e4.flags &= -5;
                    },
                    startTracking: function (e4) {
                        (++s2,
                            (e4.depsTail = void 0),
                            (e4.flags = (-57 & e4.flags) | 4));
                    },
                    shallowPropagate: r2,
                };
                function i2(e4, t3 = e4.sub) {
                    const s3 = e4.dep,
                        i3 = e4.prevDep,
                        r3 = e4.nextDep,
                        o3 = e4.nextSub,
                        l2 = e4.prevSub;
                    return (
                        void 0 !== r3 ? (r3.prevDep = i3) : (t3.depsTail = i3),
                        void 0 !== i3 ? (i3.nextDep = r3) : (t3.deps = r3),
                        void 0 !== o3 ? (o3.prevSub = l2) : (s3.subsTail = l2),
                        void 0 !== l2
                            ? (l2.nextSub = o3)
                            : void 0 === (s3.subs = o3) && n2(s3),
                        r3
                    );
                }
                function r2(e4) {
                    do {
                        const n3 = e4.sub,
                            s3 = e4.nextSub,
                            i3 = n3.flags;
                        (32 == (48 & i3) &&
                            ((n3.flags = 16 | i3), 2 & i3 && t2(n3)),
                            (e4 = s3));
                    } while (void 0 !== e4);
                }
                function o2(e4, t3) {
                    const n3 = t3.depsTail;
                    if (void 0 !== n3) {
                        let s3 = t3.deps;
                        do {
                            if (s3 === e4) return true;
                            if (s3 === n3) break;
                            s3 = s3.nextDep;
                        } while (void 0 !== s3);
                    }
                    return false;
                }
            })({
                update: (e3) => ("getter" in e3 ? y(e3) : w(e3, e3.value)),
                notify: function e2(t2) {
                    const s2 = t2.flags;
                    if (!(64 & s2)) {
                        t2.flags = 64 | s2;
                        const i2 = t2.subs;
                        void 0 !== i2 ? e2(i2.sub) : (n[h++] = t2);
                    }
                },
                unwatched(e3) {
                    if ("getter" in e3) {
                        let t2 = e3.deps;
                        if (void 0 !== t2) {
                            e3.flags = 17;
                            do {
                                t2 = i(t2, e3);
                            } while (void 0 !== t2);
                        }
                    } else "previousValue" in e3 || D.call(e3);
                },
            }));
            f = 0;
            p = 0;
            h = 0;
            O = { greedy: false };
            $ = (e3) => {
                t.push(v(void 0));
                try {
                    return e3();
                } finally {
                    v(t.pop());
                }
            };
            W = class {
                constructor(e3, t2) {
                    this._ = e3(t2);
                }
                get value() {
                    return this._();
                }
                set value(e3) {
                    this._(e3);
                }
                peek() {
                    return $(this._);
                }
                valueOf() {
                    return this.value;
                }
            };
            E = class extends W {
                constructor(e3) {
                    super(b, [e3]);
                }
                get value() {
                    return super.value[0];
                }
                set value(e3) {
                    super.value = [e3];
                }
                peek() {
                    return super.peek()[0];
                }
            };
            R = (e3, { greedy: t2 = false } = O) =>
                t2 ? new E(e3) : new W(b, e3);
            _ = (e3) => {
                R = e3;
            };
            ({ isArray: j } = Array);
            ({
                assign: F,
                defineProperties: P,
                entries: B,
                freeze: J,
            } = Object);
            V = class {
                #e;
                constructor(e3) {
                    this.#e = e3;
                }
                valueOf() {
                    return this.#e;
                }
                toString() {
                    return String(this.#e);
                }
            };
            H = (e3) => document.createComment(e3);
            q = 42;
            G = /* @__PURE__ */ new Set([
                "plaintext",
                "script",
                "style",
                "textarea",
                "title",
                "xmp",
            ]);
            I = /* @__PURE__ */ new Set([
                "area",
                "base",
                "br",
                "col",
                "embed",
                "hr",
                "img",
                "input",
                "keygen",
                "link",
                "menuitem",
                "meta",
                "param",
                "source",
                "track",
                "wbr",
            ]);
            K = J({});
            Q = J([]);
            U = (e3, t2) => (
                e3.children === Q && (e3.children = []),
                e3.children.push(t2),
                (t2.parent = e3),
                t2
            );
            X = (e3, t2, n2) => {
                (e3.props === K && (e3.props = {}), (e3.props[t2] = n2));
            };
            Y = (e3, t2, n2) => {
                e3 !== t2 && n2.push(e3);
            };
            Z = class {
                constructor(e3) {
                    ((this.type = e3), (this.parent = null));
                }
                toJSON() {
                    return [this.type, this.data];
                }
            };
            ee = class extends Z {
                constructor(e3) {
                    (super(8), (this.data = e3));
                }
                toString() {
                    return `<!--${this.data}-->`;
                }
            };
            te = class extends Z {
                constructor(e3) {
                    (super(10), (this.data = e3));
                }
                toString() {
                    return `<!${this.data}>`;
                }
            };
            ne = class extends Z {
                constructor(e3) {
                    (super(3), (this.data = e3));
                }
                toString() {
                    return this.data;
                }
            };
            se = class extends Z {
                constructor() {
                    (super(q),
                        (this.name = "template"),
                        (this.props = K),
                        (this.children = Q));
                }
                toJSON() {
                    const e3 = [q];
                    return (Y(this.props, K, e3), Y(this.children, Q, e3), e3);
                }
                toString() {
                    let e3 = "";
                    for (const t2 in this.props) {
                        const n2 = this.props[t2];
                        null != n2 &&
                            ("boolean" == typeof n2
                                ? n2 && (e3 += ` ${t2}`)
                                : (e3 += ` ${t2}="${n2}"`));
                    }
                    return `<template${e3}>${this.children.join("")}</template>`;
                }
            };
            ie = class extends Z {
                constructor(e3, t2 = false) {
                    (super(1),
                        (this.name = e3),
                        (this.xml = t2),
                        (this.props = K),
                        (this.children = Q));
                }
                toJSON() {
                    const e3 = [
                        1,
                        this.name,
                        +this.xml,
                    ];
                    return (Y(this.props, K, e3), Y(this.children, Q, e3), e3);
                }
                toString() {
                    const { xml: e3, name: t2, props: n2, children: s2 } = this,
                        { length: i2 } = s2;
                    let r2 = `<${t2}`;
                    for (const t3 in n2) {
                        const s3 = n2[t3];
                        null != s3 &&
                            ("boolean" == typeof s3
                                ? s3 && (r2 += e3 ? ` ${t3}=""` : ` ${t3}`)
                                : (r2 += ` ${t3}="${s3}"`));
                    }
                    if (i2) {
                        r2 += ">";
                        for (let n3 = !e3 && G.has(t2), o2 = 0; o2 < i2; o2++)
                            r2 += n3 ? s2[o2].data : s2[o2];
                        r2 += `</${t2}>`;
                    } else r2 += e3 ? " />" : I.has(t2) ? ">" : `></${t2}>`;
                    return r2;
                }
            };
            re = class extends Z {
                constructor() {
                    (super(11), (this.name = "#fragment"), (this.children = Q));
                }
                toJSON() {
                    const e3 = [11];
                    return (Y(this.children, Q, e3), e3);
                }
                toString() {
                    return this.children.join("");
                }
            };
            oe = "\0";
            le = `"${oe}"`;
            ae = `'${oe}'`;
            ce = /\x00|<[^><\s]+/g;
            ue = /([^\s/>=]+)(?:=(\x00|(?:(['"])[\s\S]*?\3)))?/g;
            de = (e3, t2, n2, s2, i2) => [
                t2,
                n2,
                s2,
            ];
            fe = (e3) => {
                const t2 = [];
                for (; e3.parent; ) {
                    switch (e3.type) {
                        case q:
                        case 1:
                            "template" === e3.name && t2.push(-1);
                    }
                    (t2.push(e3.parent.children.indexOf(e3)), (e3 = e3.parent));
                }
                return t2;
            };
            pe = (e3, t2) => {
                do {
                    e3 = e3.parent;
                } while (t2.has(e3));
                return e3;
            };
            he = (e3, t2) => (t2 < 0 ? e3.content : e3.childNodes[t2]);
            ve = (e3, t2) => t2.reduceRight(he, e3);
            be = false;
            me = ({ firstChild: e3, lastChild: t2 }) => {
                const n2 = ge || (ge = document.createRange());
                return (
                    n2.setStartAfter(e3),
                    n2.setEndAfter(t2),
                    n2.deleteContents(),
                    e3
                );
            };
            xe = (e3, t2) =>
                be && 11 === e3.nodeType
                    ? 1 / t2 < 0
                        ? t2
                            ? me(e3)
                            : e3.lastChild
                        : t2
                          ? e3.valueOf()
                          : e3.firstChild
                    : e3;
            ye = /* @__PURE__ */ Symbol("nodes");
            we = {
                get() {
                    return this.firstChild.parentNode;
                },
            };
            Se = {
                value(e3) {
                    me(this).replaceWith(e3);
                },
            };
            ke = {
                value() {
                    me(this).remove();
                },
            };
            Ce = {
                value() {
                    const { parentNode: e3 } = this;
                    if (e3 === this)
                        this[ye] === Q && (this[ye] = [...this.childNodes]);
                    else {
                        if (e3) {
                            let { firstChild: e4, lastChild: t2 } = this;
                            for (this[ye] = [e4]; e4 !== t2; )
                                this[ye].push((e4 = e4.nextSibling));
                        }
                        this.replaceChildren(...this[ye]);
                    }
                    return this;
                },
            };
            Te.prototype = DocumentFragment.prototype;
            De = 16;
            Oe = 32768;
            Ne = ((e3 = globalThis.document) => {
                let t2,
                    n2 = e3.createElement("template");
                return (s2, i2 = false) => {
                    if (i2)
                        return (
                            t2 ||
                                ((t2 = e3.createRange()),
                                t2.selectNodeContents(
                                    e3.createElementNS(
                                        "http://www.w3.org/2000/svg",
                                        "svg"
                                    )
                                )),
                            t2.createContextualFragment(s2)
                        );
                    n2.innerHTML = s2;
                    const r2 = n2.content;
                    return ((n2 = n2.cloneNode(false)), r2);
                };
            })(document);
            $e = /* @__PURE__ */ Symbol("ref");
            We = (e3, t2) => {
                for (const [n2, s2] of B(t2)) {
                    const t3 = "role" === n2 ? n2 : `aria-${n2.toLowerCase()}`;
                    null == s2
                        ? e3.removeAttribute(t3)
                        : e3.setAttribute(t3, s2);
                }
            };
            Ae = (e3) => (t2, n2) => {
                null == n2 ? t2.removeAttribute(e3) : t2.setAttribute(e3, n2);
            };
            Ee = (e3, t2) => {
                e3[ye] = ((e4, t3, n2, s2) => {
                    const i2 = s2.parentNode,
                        r2 = t3.length;
                    let o2 = e4.length,
                        l2 = r2,
                        a2 = 0,
                        c2 = 0,
                        u2 = null;
                    for (; a2 < o2 || c2 < l2; )
                        if (o2 === a2) {
                            const e5 =
                                l2 < r2
                                    ? c2
                                        ? n2(t3[c2 - 1], -0).nextSibling
                                        : n2(t3[l2], 0)
                                    : s2;
                            for (; c2 < l2; )
                                i2.insertBefore(n2(t3[c2++], 1), e5);
                        } else if (l2 === c2)
                            for (; a2 < o2; )
                                ((u2 && u2.has(e4[a2])) ||
                                    n2(e4[a2], -1).remove(),
                                    a2++);
                        else if (e4[a2] === t3[c2]) (a2++, c2++);
                        else if (e4[o2 - 1] === t3[l2 - 1]) (o2--, l2--);
                        else if (
                            e4[a2] === t3[l2 - 1] &&
                            t3[c2] === e4[o2 - 1]
                        ) {
                            const s3 = n2(e4[--o2], -0).nextSibling;
                            (i2.insertBefore(
                                n2(t3[c2++], 1),
                                n2(e4[a2++], -0).nextSibling
                            ),
                                i2.insertBefore(n2(t3[--l2], 1), s3),
                                (e4[o2] = t3[l2]));
                        } else {
                            if (!u2) {
                                u2 = /* @__PURE__ */ new Map();
                                let e5 = c2;
                                for (; e5 < l2; ) u2.set(t3[e5], e5++);
                            }
                            const s3 = u2.get(e4[a2]) ?? -1;
                            if (s3 < 0) n2(e4[a2++], -1).remove();
                            else if (c2 < s3 && s3 < l2) {
                                let r3 = a2,
                                    d2 = 1;
                                for (
                                    ;
                                    ++r3 < o2 &&
                                    r3 < l2 &&
                                    u2.get(e4[r3]) === s3 + d2;
                                )
                                    d2++;
                                if (d2 > s3 - c2) {
                                    const r4 = n2(e4[a2], 0);
                                    for (; c2 < s3; )
                                        i2.insertBefore(n2(t3[c2++], 1), r4);
                                } else
                                    i2.replaceChild(
                                        n2(t3[c2++], 1),
                                        n2(e4[a2++], -1)
                                    );
                            } else a2++;
                        }
                    return t3;
                })(e3[ye] || Q, t2, xe, e3);
            };
            Me = /* @__PURE__ */ new WeakMap();
            Re = (e3, t2) => {
                const n2 =
                        "object" == typeof t2
                            ? (t2 ?? e3)
                            : ((e4, t3) => {
                                  let n3 = Me.get(e4);
                                  return (
                                      n3
                                          ? (n3.data = t3)
                                          : Me.set(
                                                e4,
                                                (n3 =
                                                    document.createTextNode(t3))
                                            ),
                                      n3
                                  );
                              })(e3, t2),
                    s2 = e3[ye] ?? e3;
                n2 !== s2 && s2.replaceWith(xe((e3[ye] = n2), 1));
            };
            Le = (e3, t2) => {
                Re(e3, t2 instanceof W ? t2.value : t2);
            };
            _e = ({ dataset: e3 }, t2) => {
                for (const [n2, s2] of B(t2))
                    null == s2 ? delete e3[n2] : (e3[n2] = s2);
            };
            je = /* @__PURE__ */ new Map();
            Fe = (e3) => {
                let t2 = je.get(e3);
                return (t2 || je.set(e3, (t2 = Pe(e3))), t2);
            };
            Pe = (e3) => (t2, n2) => {
                t2[e3] = n2;
            };
            Be = (e3, t2) => {
                for (const [n2, s2] of B(t2)) Ae(n2)(e3, s2);
            };
            Je = (e3, t2, n2) =>
                n2
                    ? (n3, s2) => {
                          const i2 = n3[t2];
                          (i2?.length && n3.removeEventListener(e3, ...i2),
                              s2 && n3.addEventListener(e3, ...s2),
                              (n3[t2] = s2));
                      }
                    : (n3, s2) => {
                          const i2 = n3[t2];
                          (i2 && n3.removeEventListener(e3, i2),
                              s2 && n3.addEventListener(e3, s2),
                              (n3[t2] = s2));
                      };
            Ve = (e3) => (t2, n2) => {
                t2.toggleAttribute(e3, !!n2);
            };
            ze = false;
            He = true;
            qe = (e3) => {
                He = e3;
            };
            Ge = () => He;
            Ie = (e3) => xe(e3.n ? e3.update(e3) : e3.valueOf(false), 1);
            Ke = (e3, t2) => {
                const n2 = [],
                    s2 = e3.length,
                    i2 = t2.length;
                for (let r2, o2, l2 = 0, a2 = 0; a2 < i2; a2++)
                    ((r2 = t2[a2]),
                        (n2[a2] =
                            l2 < s2 && (o2 = e3[l2++]).t === r2.t
                                ? (t2[a2] = o2).update(r2)
                                : r2.valueOf(false)));
                return n2;
            };
            Qe = (e3, t2, n2) => {
                const s2 = R,
                    i2 = n2.length;
                let r2 = 0;
                _((e4) =>
                    r2 < i2
                        ? n2[r2++]
                        : (n2[r2++] = e4 instanceof W ? e4 : s2(e4))
                );
                const o2 = Ge();
                o2 && qe(!o2);
                try {
                    return e3(t2, Ze);
                } finally {
                    (o2 && qe(o2), _(s2));
                }
            };
            Ue = (e3, t2) => (
                e3.t === t2.t
                    ? e3.update(t2)
                    : (e3.n.replaceWith(Ie(t2)), (e3 = t2)),
                e3
            );
            Xe = (e3, t2, n2) => {
                let s2,
                    i2 = [],
                    r2 = [
                        De,
                        null,
                        n2,
                    ],
                    o2 = true;
                return (
                    x(() => {
                        if (o2)
                            ((o2 = false),
                                (s2 = Qe(t2, n2, i2)),
                                i2.length || (i2 = Q),
                                s2
                                    ? (e3.replaceWith(Ie(s2)), (r2[1] = s2))
                                    : e3.remove());
                        else {
                            const e4 = Qe(t2, n2, i2);
                            s2 && Ue(s2, e4) === e4 && (r2[2] = s2 = e4);
                        }
                    }),
                    r2
                );
            };
            Ye = /* @__PURE__ */ Symbol();
            Ze = {};
            et = class _et {
                constructor(e3, t2) {
                    ((this.t = e3),
                        (this.v = t2),
                        (this.n = null),
                        (this.k = -1));
                }
                valueOf(e3 = Ge()) {
                    const [
                            t2,
                            n2,
                            s2,
                        ] = this.t,
                        i2 = document.importNode(t2, true),
                        r2 = this.v;
                    let o2,
                        l2,
                        a2,
                        c2 = r2.length,
                        u2 = Q;
                    if (0 < c2) {
                        for (u2 = n2.slice(0); c2--; ) {
                            const [
                                    t3,
                                    s3,
                                    d3,
                                ] = n2[c2],
                                f3 = r2[c2];
                            if (
                                (l2 !== t3 && ((o2 = ve(i2, t3)), (l2 = t3)),
                                d3 & De)
                            ) {
                                const e4 = o2[Ye] || (o2[Ye] = {});
                                if (d3 === De) {
                                    for (const {
                                        name: t4,
                                        value: n3,
                                    } of o2.attributes)
                                        e4[t4] ??= n3;
                                    ((e4.children ??= [
                                        ...o2.content.childNodes,
                                    ]),
                                        (u2[c2] = Xe(o2, f3, e4)));
                                } else
                                    (s3(e4, f3),
                                        (u2[c2] = [
                                            d3,
                                            s3,
                                            e4,
                                        ]));
                            } else {
                                let t4 = true;
                                (e3 ||
                                    !(8 & d3) ||
                                    d3 & Oe ||
                                    (1 & d3
                                        ? ((t4 = false),
                                          f3.length &&
                                              s3(
                                                  o2,
                                                  f3[0] instanceof _et
                                                      ? Ke(Q, f3)
                                                      : f3
                                              ))
                                        : f3 instanceof _et &&
                                          ((t4 = false), s3(o2, Ie(f3)))),
                                    t4 &&
                                        (512 === d3
                                            ? (this.k = c2)
                                            : (16384 === d3 &&
                                                  (a2 ??=
                                                      /* @__PURE__ */ new Set()).add(
                                                      o2
                                                  ),
                                              s3(o2, f3))),
                                    (u2[c2] = [
                                        d3,
                                        s3,
                                        f3,
                                        o2,
                                    ]),
                                    e3 && 8 & d3 && o2.remove());
                            }
                        }
                        a2 &&
                            ((e4) => {
                                for (const t3 of e4) {
                                    const e5 = t3[$e];
                                    "function" == typeof e5
                                        ? e5(t3)
                                        : e5 instanceof W
                                          ? (e5.value = t3)
                                          : e5 && (e5.current = t3);
                                }
                            })(a2);
                    }
                    const { childNodes: d2 } = i2,
                        f2 = d2.length,
                        p2 = 1 === f2 ? d2[0] : f2 ? Te(i2) : i2;
                    return (
                        (this.v = u2),
                        (this.n = p2),
                        -1 < this.k && s2.set(u2[this.k][2], p2, this),
                        p2
                    );
                }
                update(e3) {
                    const t2 = this.k,
                        n2 = this.v,
                        s2 = e3.v;
                    if (-1 < t2 && n2[t2][2] !== s2[t2])
                        return ((e4, t3) =>
                            e4.t[2].get(t3)?.update(e4) ?? e4.valueOf(false))(
                            e3,
                            s2[t2]
                        );
                    let { length: i2 } = n2;
                    for (; i2--; ) {
                        const e4 = n2[i2],
                            [
                                t3,
                                r2,
                                o2,
                            ] = e4;
                        if (512 === t3) continue;
                        let l2 = s2[i2];
                        if (t3 & De)
                            if (t3 === De) {
                                const t4 = l2(o2, Ze);
                                r2 && Ue(r2, t4) === t4 && (e4[2] = t4);
                            } else r2(o2, l2);
                        else {
                            let n3 = l2;
                            if (1 & t3) {
                                if (8 & t3)
                                    l2.length &&
                                        l2[0] instanceof _et &&
                                        (n3 = Ke(o2, l2));
                                else if (256 & t3 && l2[0] === o2[0]) continue;
                            } else if (8 & t3)
                                if (t3 & Oe) {
                                    if (l2 === o2) {
                                        r2(e4[3], n3);
                                        continue;
                                    }
                                } else
                                    o2 instanceof _et &&
                                        ((l2 = Ue(o2, l2)), (n3 = l2.n));
                            l2 !== o2 && ((e4[2] = l2), r2(e4[3], n3));
                        }
                    }
                    return this.n;
                }
            };
            tt = /* @__PURE__ */ new WeakMap();
            nt = class extends Map {
                constructor() {
                    super()._ = new FinalizationRegistry((e3) =>
                        this.delete(e3)
                    );
                }
                get(e3) {
                    const t2 = super.get(e3)?.deref();
                    return t2 && tt.get(t2);
                }
                set(e3, t2, n2) {
                    (tt.set(t2, n2),
                        this._.register(t2, e3),
                        super.set(e3, new WeakRef(t2)));
                }
            };
            st = (
                ({
                    Comment: e3 = ee,
                    DocumentType: t2 = te,
                    Text: n2 = ne,
                    Fragment: s2 = re,
                    Element: i2 = ie,
                    Component: r2 = se,
                    update: o2 = de,
                }) =>
                (l2, a2, c2) => {
                    const u2 = l2.join(oe).trim(),
                        d2 = /* @__PURE__ */ new Set(),
                        f2 = [];
                    let p2 = new s2(),
                        h2 = 0,
                        v2 = 0,
                        g = 0,
                        b2 = Q;
                    for (const s3 of u2.matchAll(ce)) {
                        if (0 < v2) {
                            v2--;
                            continue;
                        }
                        const l3 = s3[0],
                            m = s3.index;
                        if (
                            (h2 < m && U(p2, new n2(u2.slice(h2, m))),
                            l3 === oe)
                        ) {
                            "table" === p2.name &&
                                ((p2 = U(p2, new i2("tbody", c2))), d2.add(p2));
                            const t3 = U(p2, new e3("\u25E6"));
                            (f2.push(o2(t3, 8, fe(t3), "", a2[g++])),
                                (h2 = m + 1));
                        } else if (l3.startsWith("<!")) {
                            const n3 = u2.indexOf(">", m + 2);
                            if ("-->" === u2.slice(n3 - 2, n3 + 1)) {
                                const t3 = u2.slice(m + 4, n3 - 2);
                                "!" === t3[0] &&
                                    U(
                                        p2,
                                        new e3(t3.slice(1).replace(/!$/, ""))
                                    );
                            } else U(p2, new t2(u2.slice(m + 2, n3)));
                            h2 = n3 + 1;
                        } else if (l3.startsWith("</")) {
                            const e4 = u2.indexOf(">", m + 2);
                            (c2 && "svg" === p2.name && (c2 = false),
                                (p2 = pe(p2, d2)),
                                (h2 = e4 + 1));
                        } else {
                            const e4 = m + l3.length,
                                t3 = u2.indexOf(">", e4),
                                s4 = l3.slice(1);
                            let x2 = s4;
                            if (
                                (s4 === oe
                                    ? ((x2 = "template"),
                                      (p2 = U(p2, new r2())),
                                      (b2 = fe(p2).slice(1)),
                                      f2.push(o2(p2, q, b2, "", a2[g++])))
                                    : (c2 ||
                                          ((x2 = x2.toLowerCase()),
                                          "table" !== p2.name ||
                                              ("tr" !== x2 && "td" !== x2) ||
                                              ((p2 = U(
                                                  p2,
                                                  new i2("tbody", c2)
                                              )),
                                              d2.add(p2)),
                                          "tbody" === p2.name &&
                                              "td" === x2 &&
                                              ((p2 = U(p2, new i2("tr", c2))),
                                              d2.add(p2))),
                                      (p2 = U(
                                          p2,
                                          new i2(x2, !!c2 && "svg" !== x2)
                                      )),
                                      (b2 = Q)),
                                e4 < t3)
                            ) {
                                let n3 = false;
                                for (const [
                                    s5,
                                    i3,
                                    r3,
                                ] of u2.slice(e4, t3).matchAll(ue))
                                    if (
                                        r3 === oe ||
                                        r3 === le ||
                                        r3 === ae ||
                                        (n3 = i3.endsWith(oe))
                                    ) {
                                        const e5 =
                                            b2 === Q ? (b2 = fe(p2)) : b2;
                                        (f2.push(
                                            o2(
                                                p2,
                                                2,
                                                e5,
                                                n3 ? i3.slice(0, -1) : i3,
                                                a2[g++]
                                            )
                                        ),
                                            (n3 = false),
                                            v2++);
                                    } else X(p2, i3, !r3 || r3.slice(1, -1));
                                b2 = Q;
                            }
                            h2 = t3 + 1;
                            const y2 = 0 < t3 && "/" === u2[t3 - 1];
                            if (c2) y2 && (p2 = p2.parent);
                            else if (y2 || I.has(x2))
                                p2 = y2 ? pe(p2, d2) : p2.parent;
                            else if ("svg" === x2) c2 = true;
                            else if (G.has(x2)) {
                                const e5 = u2.indexOf(`</${s4}>`, h2),
                                    t4 = u2.slice(h2, e5);
                                (t4.trim() === oe
                                    ? (v2++,
                                      f2.push(o2(p2, 3, fe(p2), "", a2[g++])))
                                    : U(p2, new n2(t4)),
                                    (p2 = p2.parent),
                                    (h2 = e5 + s4.length + 3),
                                    v2++);
                                continue;
                            }
                        }
                    }
                    return (
                        h2 < u2.length && U(p2, new n2(u2.slice(h2))),
                        [p2, f2]
                    );
                }
            )({
                Comment: ee,
                DocumentType: te,
                Text: ne,
                Fragment: re,
                Element: ie,
                Component: se,
                update: (e3, t2, n2, s2, i2) => {
                    switch (t2) {
                        case q:
                            return [
                                n2,
                                i2,
                                De,
                            ];
                        case 8:
                            return j(i2)
                                ? [
                                      n2,
                                      Ee,
                                      9,
                                  ]
                                : i2 instanceof V
                                  ? [
                                        n2,
                                        ((r2 = e3.xml),
                                        (e4, t3) => {
                                            const n3 = e4[$e] ?? (e4[$e] = {});
                                            (n3.v !== t3 &&
                                                ((n3.f = Te(Ne(t3, r2))),
                                                (n3.v = t3)),
                                                Re(e4, n3.f));
                                        }),
                                        8192,
                                    ]
                                  : i2 instanceof W
                                    ? [
                                          n2,
                                          Le,
                                          32776,
                                      ]
                                    : [
                                          n2,
                                          Re,
                                          8,
                                      ];
                        case 3:
                            return [
                                n2,
                                Fe("textContent"),
                                2048,
                            ];
                        case 2: {
                            const t3 = e3.type === q;
                            switch (s2.at(0)) {
                                case "@": {
                                    const e4 = j(i2);
                                    return [
                                        n2,
                                        Je(s2.slice(1), Symbol(s2), e4),
                                        e4 ? 257 : 256,
                                    ];
                                }
                                case "?":
                                    return [
                                        n2,
                                        Ve(s2.slice(1)),
                                        4096,
                                    ];
                                case ".":
                                    return "..." === s2
                                        ? [
                                              n2,
                                              t3 ? F : Be,
                                              t3 ? 144 : 128,
                                          ]
                                        : [
                                              n2,
                                              Pe(s2.slice(1)),
                                              t3 ? 80 : 64,
                                          ];
                                default:
                                    return t3
                                        ? [
                                              n2,
                                              Pe(s2),
                                              1040,
                                          ]
                                        : "aria" === s2
                                          ? [
                                                n2,
                                                We,
                                                2,
                                            ]
                                          : "data" !== s2 ||
                                              /^object$/i.test(e3.name)
                                            ? "key" === s2
                                                ? [
                                                      n2,
                                                      (ze = true),
                                                      512,
                                                  ]
                                                : "ref" === s2
                                                  ? [
                                                        n2,
                                                        Fe($e),
                                                        16384,
                                                    ]
                                                  : s2.startsWith("on")
                                                    ? [
                                                          n2,
                                                          Fe(s2.toLowerCase()),
                                                          64,
                                                      ]
                                                    : [
                                                          n2,
                                                          Ae(s2),
                                                          4,
                                                      ]
                                            : [
                                                  n2,
                                                  _e,
                                                  32,
                                              ];
                            }
                        }
                    }
                    var r2;
                },
            });
            it =
                (e3, t2 = /* @__PURE__ */ new WeakMap()) =>
                (n2, ...s2) => {
                    let i2 = t2.get(n2);
                    return (
                        i2 ||
                            ((i2 = st(n2, s2, e3)),
                            i2.push(
                                (() => {
                                    const e4 = ze;
                                    return ((ze = false), e4);
                                })()
                                    ? new nt()
                                    : null
                            ),
                            (i2[0] = Ne(i2[0].toString(), e3)),
                            t2.set(n2, i2)),
                        new et(i2, s2)
                    );
                };
            rt = it(false);
            ot = it(true);
        },
    });

    // src/settings.ts
    var settings_exports = {};
    __export(settings_exports, {
        clearOutdatedSettings: () => clearOutdatedSettings,
        featureSettings: () => featureSettings,
        injectSettingsTrigger: () => injectSettingsTrigger,
    });
    function localStorageStore2(key, defaultValue) {
        const store = {
            get() {
                const v2 = localStorage.getItem(key);
                if (v2) return JSON.parse(v2);
                if (defaultValue != null) {
                    store.reset();
                    return JSON.parse(JSON.stringify(defaultValue));
                }
            },
            set(value) {
                localStorage.setItem(key, JSON.stringify(value));
            },
            reset() {
                if (defaultValue != null) {
                    store.set(defaultValue);
                } else {
                    localStorage.removeItem(key);
                }
            },
        };
        return store;
    }
    function Settings() {
        const featureStates = Object.fromEntries(
            Object.entries(featureSettings).map(([name, setting]) => [
                name,
                L(setting.get()),
            ])
        );
        const badgeStates = Object.fromEntries(
            Object.entries(badgeVisibility).map(([name, setting]) => [
                name,
                L(setting.get()),
            ])
        );
        const linkStates = Object.fromEntries(
            Object.entries(linkVisibility).map(([name, setting]) => [
                name,
                L(setting.get()),
            ])
        );
        const customLinksState = L(customLinksSetting.get());
        const customLinkErrors = L(
            parseCustomLinks(customLinksState.value).errors.join("\n")
        );
        return at`
    <div
      id="npm-userscript-settings"
      @click=${(e3) => e3.currentTarget.remove()}
    >
      <style>
        #npm-userscript-settings {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          font-family: 'Source Sans Pro', 'Lucida Grande', sans-serif;
        }
        #npm-userscript-settings .dialog {
          background-color: var(--background-color);
          width: 700px;
          max-width: 90vw;
          max-height: 90vh;
          padding: 16px;
          border-radius: 4px;
          overflow-y: auto;
        }
        #npm-userscript-settings h2 {
          margin: 0;
        }
        #npm-userscript-settings .features {
          font-size: 14px;
          margin: 18px 0 8px 0;
          color: var(--color-fg-muted);
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        #npm-userscript-settings .setting {
          display: grid;
          grid-template-columns: auto 1fr;
          grid-template-rows: auto auto;
          margin: 0 0 10px 0;
        }
        #npm-userscript-settings .setting > input {
          grid-area: 1 / 1 / 3 / 2;
          margin: 3px 6px 0 0;
        }
        #npm-userscript-settings .setting > span {
          grid-area: 1 / 2 / 2 / 3;
          font-weight: bold;
        }
        #npm-userscript-settings .setting > p {
          grid-area: 2 / 2 / 3 / 3;
          margin: 4px 0 0 0;
          opacity: 0.6;
        }
        #npm-userscript-settings .footer {
          font-size: 12px;
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        #npm-userscript-settings .footer p {
          color: var(--color-fg-muted);
          margin: 0;
        }
        #npm-userscript-settings textarea {
          box-sizing: border-box;
          width: 100%;
          min-height: 120px;
          padding: 8px;
          resize: vertical;
          color: inherit;
          background: var(--background-color);
          border: 1px solid var(--color-border-muted, #aaa);
          border-radius: 4px;
          font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
          font-size: 12px;
        }
        #npm-userscript-settings .custom-help,
        #npm-userscript-settings .custom-errors {
          white-space: pre-wrap;
          font-size: 12px;
          margin: 6px 0;
        }
        #npm-userscript-settings .custom-help {
          color: var(--color-fg-muted);
        }
        #npm-userscript-settings .custom-errors {
          color: var(--color-fg-danger, #bb2e3e);
        }
      </style>
      <div class="dialog" @click=${(e3) => e3.stopPropagation()}>
        <h2>npm Package & Search Enhancer</h2>
        <p class="features">Features</p>
        ${Object.entries(featureStates).map(([name, state]) => {
            return at`
            <label class="setting" key=${name}>
              <input
                type="checkbox"
                .checked=${state.value}
                @change=${(e3) => {
                    const checked = e3.target.checked;
                    featureSettings[name].set(checked);
                    state.value = checked;
                }}
              />
              <span>${name}</span>
              <p>${allFeatures[name].description.trim().replace(/\n/g, " ")}</p>
            </label>
          `;
        })}
        <p class="features">Badges</p>
        ${Object.entries(badgeStates).map(
            ([name, state]) => at`
            <label class="setting" key=${name}>
              <input
                type="checkbox"
                .checked=${state.value}
                @change=${(e3) => {
                    const checked = e3.target.checked;
                    badgeVisibility[name].set(checked);
                    state.value = checked;
                }}
              />
              <span>${badgeDefinitions[name]}</span>
            </label>
          `
        )}
        <p class="features">Links</p>
        ${Object.entries(linkStates).map(
            ([name, state]) => at`
            <label class="setting" key=${name}>
              <input
                type="checkbox"
                .checked=${state.value}
                @change=${(e3) => {
                    const checked = e3.target.checked;
                    linkVisibility[name].set(checked);
                    state.value = checked;
                }}
              />
              <span>${linkDefinitions[name]}</span>
            </label>
          `
        )}
        <p class="features">Custom links</p>
        <textarea
          aria-label="Custom package links"
          placeholder="My service | https://example.com/{{encodedPackage}} | https://example.com/icon.png"
          .value=${customLinksState.value}
          @input=${(e3) => {
              const value = e3.target.value;
              customLinksSetting.set(value);
              customLinksState.value = value;
              customLinkErrors.value =
                  parseCustomLinks(value).errors.join("\n");
          }}
        ></textarea>
        <p class="custom-help">
          One per line: Label | URL | optional icon URL. Tokens: {{package}}, {{packagePath}},
          {{encodedPackage}}, {{version}}, {{encodedVersion}}, {{packageSpec}},
          {{encodedPackageSpec}}.
        </p>
        <p class="custom-errors">${customLinkErrors}</p>
        <div class="footer">
          <p class="note">(Refresh page to view changes)</p>
          <button
            @click=${() => {
                Object.entries(featureStates).forEach(([name, state]) => {
                    featureSettings[name].reset();
                    state.value = featureSettings[name].get();
                });
                Object.entries(badgeStates).forEach(([name, state]) => {
                    const setting = badgeVisibility[name];
                    setting.reset();
                    state.value = setting.get();
                });
                Object.entries(linkStates).forEach(([name, state]) => {
                    const setting = linkVisibility[name];
                    setting.reset();
                    state.value = setting.get();
                });
                customLinksSetting.reset();
                customLinksState.value = customLinksSetting.get();
                customLinkErrors.value = "";
            }}
          >
            Reset to defaults
          </button>
        </div>
      </div>
    </div>
  `;
    }
    function injectSettingsTrigger() {
        if (document.querySelector(".npm-userscript-settings-trigger")) return;
        const button = document.createElement("button");
        button.classList.add("npm-userscript-settings-trigger");
        button.type = "button";
        button.title = "Open npm enhancer settings";
        button.setAttribute("aria-label", "Open npm enhancer settings");
        button.textContent = "\u2699";
        button.style.cssText =
            "font-size: 18px; border: 0; background: none; color: inherit; cursor: pointer; padding: 6px 8px; opacity: 0.85;";
        button.onclick = () => document.body.append(at`<${Settings} />`);
        const headerActions = document.querySelector(
            ".npm-userscript-header-actions"
        );
        if (headerActions) {
            headerActions.appendChild(button);
            return;
        }
        const sidebar = document.querySelector(
            '[aria-label="Package sidebar"]'
        );
        if (sidebar) {
            button.textContent = "\u2699 Enhancer settings";
            button.style.fontSize = "13px";
            sidebar.insertAdjacentElement("beforeend", button);
        }
    }
    function clearOutdatedSettings() {
        const keys = Object.keys(localStorage);
        for (const key of keys) {
            if (key.startsWith("npm-userscript:settings:feature:")) {
                const featureName = key.slice(
                    "npm-userscript:settings:feature:".length
                );
                if (!(featureName in allFeatures)) {
                    localStorage.removeItem(key);
                }
            }
        }
    }
    var featureSettings;
    var init_settings = __esm({
        "src/settings.ts"() {
            init_dom();
            init_all_features();
            init_enhancement_settings();
            featureSettings = Object.fromEntries(
                Object.entries(allFeatures).map(([name, feature]) => {
                    return [
                        name,
                        localStorageStore2(
                            `npm-userscript:settings:feature:${name}`,
                            feature.disabled ? false : true
                        ),
                    ];
                })
            );
        },
    });

    // src/features/fix-issue-pr-count.ts
    var fix_issue_pr_count_exports = {};
    __export(fix_issue_pr_count_exports, {
        description: () => description5,
        run: () => run4,
        runPre: () => runPre5,
        teardown: () => teardown,
    });
    function teardown(previousUrl) {
        if (isSamePackagePage(previousUrl)) return;
        document
            .querySelectorAll(".npm-userscript-issue-pr-count")
            .forEach((el) => el.remove());
    }
    async function runPre5() {
        if (!isValidPackagePage()) return;
        if ((await getFeatureSettings())["repository-card"].get() === true)
            return;
        addStyle(`
    #issues + p,
    #pulls + p {
      padding: 0;
      margin: 0;
    }

    #issues + p > a,
    #pulls + p > a {
      font-size: 1.25rem;
    }
  `);
        addStyle(`
    .npm-userscript-issue-pr-link {
      text-decoration: none;
    }

    .npm-userscript-issue-pr-link:focus,
    .npm-userscript-issue-pr-link:hover {
      text-decoration: underline;
      color: #cb3837;
    }
  `);
    }
    async function run4() {
        if (!isValidPackagePage()) return;
        if ((await getFeatureSettings())["repository-card"].get() === true)
            return;
        await new Promise((resolve) => setTimeout(resolve, 2e3));
        if (
            document.getElementById("issues") ||
            document.getElementById("pulls")
        )
            return;
        if (document.querySelector(".npm-userscript-issue-pr-count")) return;
        const ownerRepo = getGitHubOwnerRepo();
        if (!ownerRepo) return;
        const counts = await fetchIssueAndPrCount();
        let ref;
        if ((await getFeatureSettings())["stars"].get() === true) {
            ref = await waitForElement(".npm-userscript-stars-column", 5e3);
        } else {
            ref = getTotalFilesColumn();
        }
        if (!ref) return;
        if (
            document.getElementById("issues") ||
            document.getElementById("pulls")
        )
            return;
        insertCountNode(
            ref,
            "Pull Requests",
            counts.pulls,
            `https://github.com/${ownerRepo}/pulls`
        );
        const c2 = insertCountNode(
            ref,
            "Issues",
            counts.issues,
            `https://github.com/${ownerRepo}/issues`
        );
        balanceColumn(c2);
    }
    function getTotalFilesColumn() {
        const sidebarColumns = document.querySelectorAll(
            '[aria-label="Package sidebar"] div.w-50:not(.w-100)'
        );
        return Array.from(sidebarColumns).find((el) =>
            el.querySelector("h3")?.textContent.includes("Total Files")
        );
    }
    function balanceColumn(column) {
        const sidebarColumns = document.querySelectorAll(
            '[aria-label="Package sidebar"] div.w-50:not(.w-100)'
        );
        const columnIndex = Array.from(sidebarColumns).indexOf(column);
        if (columnIndex % 2 === 1) {
            const previousColumn = sidebarColumns[columnIndex - 1];
            if (!previousColumn) return;
            previousColumn.classList.add("w-100");
        }
    }
    function insertCountNode(ref, name, count, link) {
        const cloned = ref.cloneNode(true);
        cloned.classList.add("npm-userscript-issue-pr-count");
        cloned.classList.remove("w-100");
        cloned.querySelector("h3").textContent = name;
        const linkHtml = `<a class="npm-userscript-issue-pr-link" href="${link}">${count}</a>`;
        cloned.querySelector("p").innerHTML = linkHtml;
        ref.insertAdjacentElement("afterend", cloned);
        return cloned;
    }
    async function fetchIssueAndPrCount() {
        const data = await fetchGitHubRepoData();
        if (!data) return { issues: 0, pulls: 0 };
        const prCount = await fetchGitHubPullRequestsCount();
        if (prCount === void 0) return { issues: 0, pulls: 0 };
        const issueAndPrCount = data.open_issues_count;
        const issues = issueAndPrCount - prCount;
        const pulls = prCount;
        return { issues, pulls };
    }
    async function getFeatureSettings() {
        const settings = await Promise.resolve().then(
            () => (init_settings(), settings_exports)
        );
        return settings.featureSettings;
    }
    var description5;
    var init_fix_issue_pr_count = __esm({
        "src/features/fix-issue-pr-count.ts"() {
            init_utils_fetch();
            init_utils();
            description5 = `Show "Issue" and "Pull Requests" counts in the package sidebar. At the time of writing, npm's own
implementation is broken for large numbers for some reason. This temporarily fixes it.
`;
        },
    });

    // src/features/fix-styles.ts
    var fix_styles_exports = {};
    __export(fix_styles_exports, {
        description: () => description6,
        run: () => run5,
        runPre: () => runPre6,
    });
    function runPre6() {
        if (isValidPackagePage()) {
            addStyle(`
      #repository + p,
      #homePage + p {
        padding: 0 !important;
        margin: 0 !important;
        text-decoration: none;
      }
    `);
            addStyle(`
      [aria-labelledby*=repository-link],
      [aria-labelledby*=homePage-link] {
        display: flex;
        align-items: center;
      }

      [aria-labelledby*=repository-link] > span {
        margin-right: 6px;
      }

      [aria-labelledby*=repository-link] > span > svg {
        display: block;
      }
    `);
            addStyle(`
      [aria-label="Package sidebar"] a.button > svg {
        margin-right: 8px;
      }
    `);
            addStyle(`
      button[aria-label="Copy install command line"] {
        right: -1px;
      }

      button[aria-label="Copy install command line"] > svg {
        margin-right: 0;
        margin-top: 4px;
      }
    `);
            addStyle(`
      h1 > div[data-nosnippet="true"] {
        display: flex;
      }
    `);
            addStyle(`
      aside[aria-label="Package sidebar"] > h3 + div {
        margin-bottom: 0;
      }
    `);
            addStyle(`
      html[data-color-mode="dark"] #top > div:first-child.bg-washed-red.b--black-10,
      html[data-color-mode="dark"] #top > div:first-child.bg-washed-red .b--black-10 {
        color: #262626 !important;
      }

      html[data-color-mode="dark"] #top > div:first-child code {
        color: var(--color-fg-default);
      }
    `);
        }
        if (/^\/settings\/.+?\/members/.test(location.pathname)) {
            addStyle(`
      #tabpanel-members h3 {
        width: 300px;
        flex-grow: 0;
      }

      #tabpanel-members [data-type="role"] {
        text-align: left;
      }
    `);
        }
        if (location.pathname === "/") {
            addStyle(`
      ul[aria-labelledby="discover-packages-header"] {
        gap: 10px;
      }

      ul[aria-labelledby="discover-packages-header"] li {
        display: block;
        flex: unset;
        width: calc(50% - 5px);
        margin: 0;
      }

      ul[aria-labelledby="discover-packages-header"] a {
        padding-left: 0;
        padding-right: 0;
      }
    `);
        }
    }
    function run5() {
        if (isValidPackagePage()) {
            const sidebar = document.querySelector(
                '[aria-label="Package sidebar"]'
            );
            const el = Array.from(sidebar?.querySelectorAll("h3") || []).find(
                (el2) => el2.textContent === "Last publish"
            );
            if (el) {
                el.textContent = "Last Publish";
            }
        }
    }
    var description6;
    var init_fix_styles = __esm({
        "src/features/fix-styles.ts"() {
            init_utils();
            description6 = `Fix various style issues on the npm site.
`;
        },
    });

    // src/features/helpful-links.ts
    var helpful_links_exports = {};
    __export(helpful_links_exports, {
        createHelpfulLinksElement: () => createHelpfulLinksElement,
        description: () => description7,
        getHelpfulLinks: () => getHelpfulLinks,
        run: () => run6,
        runPre: () => runPre7,
        teardown: () => teardown2,
    });
    function teardown2(previousUrl) {
        if (isSamePackagePage(previousUrl)) return;
        document.querySelector(".npm-userscript-helpful-links")?.remove();
    }
    function runPre7() {
        if (!isValidPackagePage()) return;
        addStyle(`
    .npm-userscript-helpful-links {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      width: 100%;
      height: auto;
      margin: 4px 0 8px;
      clear: both;
      box-sizing: border-box;
      transform: none;
    }

    .npm-userscript-helpful-links a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      flex: 0 0 28px;
      border-radius: 5px;
      text-decoration: none;
      overflow: hidden;
    }

    .npm-userscript-helpful-links a:hover,
    .npm-userscript-helpful-links a:focus-visible {
      background: rgba(127, 127, 127, 0.14);
    }

    .npm-userscript-helpful-links a svg,
    .npm-userscript-helpful-links a img {
      display: block;
      width: 20px;
      height: 20px;
      object-fit: contain;
    }

    .npm-userscript-helpful-links .npm-userscript-link-monogram {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: 4px;
      color: #fff;
      background: #6b7280;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
    }

    html[data-color-mode="dark"] .npm-userscript-helpful-links a svg.dark-invert {
      filter: invert(100%) sepia(100%) grayscale(100%);
    }

    /* link icon is jarringly large, so shrink */
    .npm-userscript-helpful-links a[title="Homepage"] svg {
      height: 17px;
    }
    
    /* publint icon is too short, so widen */
    .npm-userscript-helpful-links a[href*="publint.dev"] svg {
      width: 24px;
    }
  `);
    }
    async function run6() {
        if (!isValidPackagePage()) return;
        if (document.querySelector(".npm-userscript-helpful-links")) return;
        const packageName = getPackageName();
        if (!packageName) return;
        const links = await getHelpfulLinks(
            packageName,
            void 0,
            getPackageVersion()
        );
        if (links.length === 0) return;
        const sidebar = document.querySelector(
            'aside[aria-label="Package sidebar"]'
        );
        const installHeading = Array.from(
            sidebar?.querySelectorAll(":scope > h2, :scope > h3") || []
        ).find((heading) => heading.textContent?.trim() === "Install");
        if (!installHeading) return;
        installHeading.insertAdjacentElement(
            "beforebegin",
            createHelpfulLinksElement(links)
        );
    }
    async function getHelpfulLinks(
        packageName,
        metadata,
        version = metadata?.version
    ) {
        const contextualLinks = metadata
            ? [
                  getRepositoryLinkData(metadata.repository),
                  getHomepageLinkData(metadata.homepage),
                  getFundingLinkData(metadata.funding),
              ]
            : [
                  await getRepoLinkData(),
                  getHomepageLinkData(),
                  getFundingLinkData(),
              ];
        const builtInLinks = [
            ...contextualLinks,
            getNpmxLinkData(packageName),
            getPublintLinkData(packageName),
            getAttwLinkData(packageName),
            getNpmgraphLinkData(packageName),
            getPkgSizeLinkData(packageName),
            getNodeModulesInspectorLinkData(packageName),
            getPackagephobiaLinkData(packageName),
            getBundlejsLinkData(packageName),
        ].filter((link) => Boolean(link));
        const enabledLinks = builtInLinks.filter((link) => {
            const setting = linkVisibility[link.id];
            return setting?.get() !== false;
        });
        if (linkVisibility.custom.get()) {
            const templates = parseCustomLinks(customLinksSetting.get()).links;
            for (const [index, template] of templates.entries()) {
                const context = { packageName, version };
                enabledLinks.push({
                    id: `custom-${index}`,
                    label: template.label,
                    url: fillLinkTemplate(template.urlTemplate, context),
                    iconUrl: template.iconTemplate
                        ? fillLinkTemplate(template.iconTemplate, context)
                        : void 0,
                });
            }
        }
        return enabledLinks;
    }
    function createHelpfulLinksElement(
        links,
        className = "npm-userscript-helpful-links"
    ) {
        const container = document.createElement("div");
        container.className = className;
        for (const link of links) {
            const anchor = document.createElement("a");
            anchor.href = link.url;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer nofollow";
            anchor.title = link.label;
            anchor.setAttribute("aria-label", link.label);
            if (link.iconSvg) {
                anchor.innerHTML = scopeSvgId(
                    link.iconSvg,
                    `${link.id}-${link.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
                );
            } else if (link.iconUrl) {
                const image = document.createElement("img");
                image.src = link.iconUrl;
                image.alt = "";
                image.loading = "lazy";
                image.referrerPolicy = "no-referrer";
                image.addEventListener(
                    "error",
                    () => image.replaceWith(createMonogram(link.label)),
                    {
                        once: true,
                    }
                );
                anchor.appendChild(image);
            } else {
                anchor.appendChild(createMonogram(link.label));
            }
            container.appendChild(anchor);
        }
        return container;
    }
    function createMonogram(label) {
        const monogram = document.createElement("span");
        monogram.className = "npm-userscript-link-monogram";
        monogram.textContent = label.trim().slice(0, 2) || "\u2197";
        monogram.setAttribute("aria-hidden", "true");
        return monogram;
    }
    async function getRepoLinkData() {
        const useFullRepoLink =
            (await getFeatureSettings2())["repository-directory"].get() ===
            true;
        const repositoryLink = useFullRepoLink
            ? await getFullRepositoryLink()
            : getNpmContext().context.packument.repository;
        return getRepositoryLinkData(repositoryLink);
    }
    function getRepositoryLinkData(repositoryLink) {
        if (!repositoryLink) return void 0;
        return {
            id: "repository",
            label: "Repository",
            url: repositoryLink,
            iconSvg: `<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g fill="#F1502F" fill-rule="nonzero"><path d="M15.6981994,7.28744895 L8.71251571,0.3018063 C8.3102891,-0.1006021 7.65784619,-0.1006021 7.25527133,0.3018063 L5.80464367,1.75263572 L7.64478689,3.59281398 C8.07243561,3.44828825 8.56276901,3.5452772 8.90352982,3.88604451 C9.24638012,4.22907547 9.34249661,4.72359725 9.19431703,5.15282127 L10.9679448,6.92630874 C11.3971607,6.77830046 11.8918472,6.8738964 12.2346975,7.21727561 C12.7135387,7.69595181 12.7135387,8.47203759 12.2346975,8.95106204 C11.755508,9.43026062 10.9796112,9.43026062 10.5002476,8.95106204 C10.140159,8.59061834 10.0510075,8.06127108 10.2336636,7.61759448 L8.57948492,5.9635584 L8.57948492,10.3160467 C8.69614805,10.3738569 8.80636859,10.4509954 8.90352982,10.5479843 C9.38237103,11.0268347 9.38237103,11.8027463 8.90352982,12.2822931 C8.42468862,12.7609693 7.64826937,12.7609693 7.16977641,12.2822931 C6.69093521,11.8027463 6.69093521,11.0268347 7.16977641,10.5479843 C7.28818078,10.4297518 7.42521643,10.3402504 7.57148065,10.2803505 L7.57148065,5.88746473 C7.42521643,5.82773904 7.28852903,5.73893407 7.16977641,5.62000506 C6.80707597,5.25747183 6.71983981,4.72499027 6.90597844,4.27957241 L5.09195384,2.465165 L0.301800552,7.25506126 C-0.100600184,7.65781791 -0.100600184,8.31027324 0.301800552,8.71268164 L7.28783254,15.6983243 C7.69005915,16.1005586 8.34232793,16.1005586 8.74507691,15.6983243 L15.6981994,8.74506934 C16.1006002,8.34266094 16.1006002,7.68968322 15.6981994,7.28744895" id="Path"></path></g></svg>`,
        };
    }
    function getHomepageLinkData(
        homepageLink = getNpmContext().context.packument.homepage
    ) {
        if (homepageLink) {
            return {
                id: "homepage",
                label: "Homepage",
                url: homepageLink,
                iconSvg: `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#2679d8" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path></svg>`,
            };
        }
    }
    function getFundingLinkData(
        fundingLink = getNpmContext().context.packument.funding?.url
    ) {
        if (fundingLink) {
            return {
                id: "funding",
                label: "Fund this package",
                url: fundingLink,
                iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true"><path fill="#fa5b9b" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>`,
            };
        }
    }
    function getNpmxLinkData(packageName) {
        return {
            id: "npmx",
            label: "Open in npmx",
            url: `https://npmx.dev/package/${packageName}`,
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#0a0a0a" rx="64"/><path fill="#525252" d="M110 310h60v60h-60z"/><text x="320" y="370" fill="#fafafa" font-family="ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace" font-size="420" font-weight="500" text-anchor="middle"><tspan>/</tspan></text></svg>`,
        };
    }
    function getPublintLinkData(packageName) {
        return {
            id: "publint",
            label: "Check with Publint",
            url: `https://publint.dev/${packageName}`,
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 241" width="100%" height="100%" aria-hidden="true" fill="none"><g clip-path="url(#a)"><path fill="#CF7522" stroke="#fff" stroke-width="8" d="m171.514 210.672-.006.003-.007.003c-.717.358-1.534.461-2.326.304-1.486-.294-2.092-1.028-2.446-1.852-.448-1.041-.45-2.255-.339-2.813l35.471-179.0918c.22-1.1065.922-2.029 1.922-2.5282.346-.1148.784-.2761 1.321-.4739 2.613-.9619 7.569-2.7866 15.673-4.3209 10.147-1.921 24.244-3.0651 40.689-.1184 16.777 3.1628 35.653 11.4949 54.595 24.6852 3.309 2.3123 4.906 6.6296 4.362 11.4434l-33.08 167.0166c-.528 2.663-3.609 3.763-5.582 2.318-55.564-40.744-107.73-15.819-110.247-14.575Z"/></g><g clip-path="url(#b)"><path fill="#CF7522" stroke="#fff" stroke-width="8" d="m158.439 210.682.007.003.007.003c.717.358 1.534.461 2.325.304 1.486-.294 2.093-1.028 2.447-1.851.447-1.042.449-2.256.339-2.814L128.092 27.2354c-.219-1.1065-.921-2.0289-1.921-2.5282-.346-.1148-.784-.2761-1.321-.4739-2.613-.9619-7.569-2.7866-15.674-4.3209-10.1467-1.921-24.2437-3.065-40.6882-.1184-16.777 3.1629-35.6531 11.4949-54.5951 24.6852-3.3089 2.3123-4.9057 6.6296-4.3621 11.4434L42.6108 222.939c.5275 2.664 3.6093 3.764 5.5817 2.318 55.5635-40.744 107.7305-15.819 110.2465-14.575Z"/></g><g clip-path="url(#c)"><path fill="#E69B57" stroke="#fff" stroke-width="8" d="m170.873 208.731-.006.004-.006.005c-.633.49-1.415.75-2.222.75-1.515 0-2.252-.602-2.76-1.341-.641-.934-.879-2.126-.879-2.694V22.8841c0-1.128.509-2.1692 1.393-2.8532.317-.1799.716-.4233 1.204-.7217 2.377-1.4512 6.883-4.204 14.536-7.2837 9.58-3.856 23.186-7.717 39.89-8.0215 17.072-.1571 37.207 4.3487 58.351 13.6074 3.695 1.6254 6.1 5.5501 6.502 10.3778V198.25c0 2.715-2.809 4.393-5.025 3.358-62.421-29.171-108.751 5.414-110.978 7.123Z"/></g><g clip-path="url(#d)"><path fill="#E69B57" stroke="#fff" stroke-width="8" d="m159.127 208.731.006.004.006.005c.633.49 1.415.75 2.222.75 1.515 0 2.252-.602 2.76-1.341.641-.934.879-2.126.879-2.694V22.8841c0-1.128-.509-2.1692-1.393-2.8532-.318-.1799-.716-.4233-1.204-.7217-2.377-1.4512-6.883-4.204-14.536-7.2837-9.58-3.856-23.186-7.717-39.89-8.0215-17.0716-.1571-37.2068 4.3487-58.3507 13.6074-3.695 1.6254-6.1002 5.5501-6.5023 10.3778l.0001 170.2618c0 2.715 2.8093 4.392 5.0251 3.357 62.4208-29.171 108.7508 5.414 110.9778 7.123Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h130v215.599H0z" transform="rotate(11.203 80.8005 1033.73)"/></clipPath><clipPath id="b"><path fill="#fff" d="M0 0h130v215.06H0z" transform="scale(-1 1) rotate(11.203 -84.2286 -648.3313)"/></clipPath><clipPath id="c"><path fill="#fff" d="M0 0h130v213H0z" transform="translate(161)"/></clipPath><clipPath id="d"><path fill="#fff" d="M0 0h130v213H0z" transform="matrix(-1 0 0 1 169 0)"/></clipPath></defs></svg>`,
        };
    }
    function getAttwLinkData(packageName) {
        return {
            id: "attw",
            label: "Check with Are the types wrong?",
            url: `https://arethetypeswrong.github.io/?p=${packageName}`,
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="933.333" height="933.333" viewBox="0 0 700 700" aria-hidden="true"><path fill="#3178C6" d="M0 350v350h420.5l-3.5-2.2c-11.7-7.2-27.9-18.1-36.5-24.7-10.8-8.1-32-28.8-37.1-36.1l-3.2-4.5 21.1-40.6 21.1-40.6 5.6 11.1c9.9 19.8 20.4 34.1 35.8 48.7 19.9 19 42.3 32.4 65.9 39.5 12.2 3.7 28.9 3.9 37.6.5 11.8-4.6 20.5-16.9 21.5-30 .6-8.5-1.5-16.9-7.2-28.8-5.7-11.8-12-21.1-27-39.6-6.6-8.2-15.6-19.3-19.9-24.6-10.7-13.1-19.9-27.2-26.2-39.9-9.8-19.7-13.7-35.1-13.7-53.7 0-18.4 3.3-31.9 12.4-50.3 30.6-62.3 95-80 175-48.1 14.9 5.9 42.7 20.2 55.1 28.3l2.7 1.8V0H0zm395-115v38H275v337h-95V273H60v-76h335z"/><path fill="#3178C6" d="M580.7 403c-11.6 3-21.3 11.9-24.7 22.7-2.5 8.1-2.5 11-.1 20.5 4.3 16.6 12.2 28.6 47.1 71.8 25 30.9 39.4 57.5 44.4 82.2 2 9.6 2.1 28.2.2 38-3.1 16.2-12.5 37.5-23.1 52.2-2.8 4-5.5 7.8-5.9 8.4-.5.9 9.5 1.2 40.3 1.2H700V466.3l-6.3-7.4c-21.9-25.5-51.7-45.6-79.8-53.9-8.3-2.4-26.9-3.6-33.2-2"/></svg>`,
        };
    }
    function getNpmgraphLinkData(packageName) {
        return {
            id: "npmgraph",
            label: "Check with Npmgraph",
            url: `https://npmgraph.js.org/?q=${packageName}`,
            iconSvg: `<svg class="dark-invert" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 8.467 8.467" aria-hidden="true"><defs><radialGradient xlink:href="#a" id="b" cx=".794" cy="3.572" r="1.323" fx=".794" fy="3.572" gradientTransform="matrix(1.4 0 0 .8 -.317 1.111)" gradientUnits="userSpaceOnUse"/><radialGradient xlink:href="#a" id="c" cx=".794" cy="3.572" r="1.323" fx=".794" fy="3.572" gradientTransform="matrix(1.4 0 0 .8 4.974 -2.328)" gradientUnits="userSpaceOnUse"/><radialGradient xlink:href="#a" id="d" cx=".794" cy="3.572" r="1.323" fx=".794" fy="3.572" gradientTransform="matrix(1.4 0 0 .8 4.974 .053)" gradientUnits="userSpaceOnUse"/><radialGradient xlink:href="#a" id="f" cx=".794" cy="3.572" r="1.323" fx=".794" fy="3.572" gradientTransform="matrix(1.4 0 0 .8 4.974 4.55)" gradientUnits="userSpaceOnUse"/><radialGradient xlink:href="#a" id="e" cx=".794" cy="3.572" r="1.323" fx=".794" fy="3.572" gradientTransform="matrix(1.4 0 0 .8 4.974 2.17)" gradientUnits="userSpaceOnUse"/><linearGradient id="a"><stop offset="0" style="stop-color:#fff;stop-opacity:1"/><stop offset="1" style="stop-color:#a4a4a4;stop-opacity:1"/></linearGradient></defs><rect width="2.381" height=".794" x=".397" y="3.836" rx=".282" ry=".282" style="fill:url(#b);stroke:#000;stroke-width:.264584;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;fill-opacity:1"/><path d="M2.891 4.233c1.047.045.558-3.44 2.136-3.44" style="fill:none;stroke:#000;stroke-width:.264583;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/><path d="m5.027.265.546.557-.546.5ZM5.027 2.646l.546.558-.546.5ZM5.027 4.762l.546.558-.546.5ZM5.027 7.144l.546.558-.546.5Z" style="fill:#000;stroke:none;stroke-width:.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"/><path d="M2.91 4.233c1.048.045.539-1.058 2.117-1.058" style="fill:none;stroke:#000;stroke-width:.264583;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/><path d="M2.891 4.233c1.047-.044.558 3.44 2.136 3.44" style="fill:none;stroke:#000;stroke-width:.264583;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/><path d="M2.91 4.233c1.048-.044.539 1.059 2.117 1.059" style="fill:none;stroke:#000;stroke-width:.264583;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/><rect width="2.381" height=".794" x="5.689" y=".397" rx=".282" ry=".282" style="fill:url(#c);fill-opacity:1;stroke:#000;stroke-width:.264583;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none"/><rect width="2.381" height=".794" x="5.689" y="2.778" rx=".282" ry=".282" style="fill:url(#d);fill-opacity:1;stroke:#000;stroke-width:.264583;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none"/><rect width="2.381" height=".794" x="5.689" y="4.895" rx=".282" ry=".282" style="fill:url(#e);fill-opacity:1;stroke:#000;stroke-width:.264583;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none"/><rect width="2.381" height=".794" x="5.689" y="7.276" rx=".282" ry=".282" style="fill:url(#f);fill-opacity:1;stroke:#000;stroke-width:.264583;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none"/></svg>`,
        };
    }
    function getPkgSizeLinkData(packageName) {
        return {
            id: "pkgSize",
            label: "Check with pkg-size",
            url: `https://pkg-size.dev/${packageName}`,
            iconSvg: `<svg width="1.2em" height="1.2em" viewBox="0 0 24 24"><g fill="none" stroke="#ff7251" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14M7.5 4.27l9 5.15"/><path d="M3.29 7 12 12l8.71-5M12 22V12"/><circle cx="18.5" cy="15.5" r="2.5"/><path d="M20.27 17.27 22 19"/></g></svg>`,
        };
    }
    function getNodeModulesInspectorLinkData(packageName) {
        return {
            id: "nodeModulesInspector",
            label: "Check with Node Modules Inspector",
            url: `https://node-modules.dev/grid/depth#install=${packageName}`,
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true"><path fill="#469B18" fill-rule="evenodd" d="M51.05 39.797a3.1 3.1 0 0 1 3.428-2.732c2.682.304 5.347 1.215 7.865 2.543a3.1 3.1 0 1 1-2.89 5.485c-1.977-1.042-3.901-1.667-5.672-1.867a3.1 3.1 0 0 1-2.732-3.43Zm-1.133.1a3.1 3.1 0 0 1-1.316 4.182 8.62 8.62 0 0 0-2.113 1.569 3.1 3.1 0 1 1-4.384-4.385 14.82 14.82 0 0 1 3.631-2.682 3.1 3.1 0 0 1 4.182 1.316Zm14.52 4.506a3.1 3.1 0 0 1 4.377-.244 38.946 38.946 0 0 1 5.239 5.744 3.1 3.1 0 1 1-4.971 3.705 32.743 32.743 0 0 0-4.4-4.827 3.1 3.1 0 0 1-.245-4.378Zm9.497 10.678a3.1 3.1 0 0 1 4.127 1.48 34.816 34.816 0 0 1 2.55 7.425 3.1 3.1 0 0 1-6.058 1.32 28.622 28.622 0 0 0-2.1-6.099 3.1 3.1 0 0 1 1.481-4.127ZM78.35 68.67a3.1 3.1 0 0 1 2.92 3.27 26.364 26.364 0 0 1-1.677 7.911 3.1 3.1 0 1 1-5.794-2.205 20.163 20.163 0 0 0 1.281-6.056 3.1 3.1 0 0 1 3.27-2.92Zm-3.264 13.833a3.1 3.1 0 0 1 .558 4.348 31.224 31.224 0 0 1-2.639 2.992 3.1 3.1 0 1 1-4.383-4.384 25.043 25.043 0 0 0 2.115-2.397 3.1 3.1 0 0 1 4.349-.559ZM32.676 9.046a3.1 3.1 0 0 1 0 4.384 25.044 25.044 0 0 0-2.117 2.397 3.1 3.1 0 1 1-4.907-3.79 31.23 31.23 0 0 1 2.64-2.992 3.1 3.1 0 0 1 4.384 0Zm-6.973 8.197a3.1 3.1 0 0 1 1.795 4 20.155 20.155 0 0 0-1.28 6.056 3.1 3.1 0 0 1-6.19-.35 26.349 26.349 0 0 1 1.675-7.911 3.1 3.1 0 0 1 4-1.795Zm-2.648 13.971a3.1 3.1 0 0 1 3.69 2.368 28.625 28.625 0 0 0 2.098 6.1 3.1 3.1 0 0 1-5.606 2.646 34.822 34.822 0 0 1-2.55-7.424 3.1 3.1 0 0 1 2.368-3.69Zm4.822 13.434a3.1 3.1 0 0 1 4.338.633 32.756 32.756 0 0 0 4.4 4.828 3.1 3.1 0 0 1-4.132 4.621 38.956 38.956 0 0 1-5.239-5.744 3.1 3.1 0 0 1 .633-4.338Zm31.315 8.593a3.1 3.1 0 0 1 0 4.384 14.816 14.816 0 0 1-3.63 2.683 3.1 3.1 0 1 1-2.867-5.497 8.621 8.621 0 0 0 2.113-1.57 3.1 3.1 0 0 1 4.384 0Zm-21.536 1.853a3.1 3.1 0 0 1 4.188-1.297c1.977 1.042 3.901 1.667 5.672 1.867a3.1 3.1 0 1 1-.698 6.16c-2.681-.303-5.346-1.215-7.865-2.542a3.1 3.1 0 0 1-1.297-4.188Z" clip-rule="evenodd" opacity=".5"></path><path fill="#469B18" fill-rule="evenodd" d="M69.316 22.298a3.1 3.1 0 0 1 3.27-2.92 26.35 26.35 0 0 1 7.911 1.676 3.1 3.1 0 1 1-2.204 5.795 20.157 20.157 0 0 0-6.057-1.281 3.1 3.1 0 0 1-2.92-3.27Zm-.995.107a3.1 3.1 0 0 1-2.368 3.69 28.626 28.626 0 0 0-6.099 2.099 3.1 3.1 0 1 1-2.646-5.607 34.823 34.823 0 0 1 7.424-2.55 3.1 3.1 0 0 1 3.69 2.368Zm14.828 3.156a3.1 3.1 0 0 1 4.348-.558 31.223 31.223 0 0 1 2.992 2.638 3.1 3.1 0 0 1-4.384 4.384 25.041 25.041 0 0 0-2.397-2.115 3.1 3.1 0 0 1-.559-4.349Zm-28.26 1.667a3.1 3.1 0 0 1-.634 4.338 32.75 32.75 0 0 0-4.826 4.4 3.1 3.1 0 1 1-4.622-4.132 38.952 38.952 0 0 1 5.743-5.239 3.1 3.1 0 0 1 4.338.633Zm-10.445 9.78a3.1 3.1 0 0 1 1.297 4.187c-1.042 1.977-1.666 3.9-1.867 5.671a3.1 3.1 0 1 1-6.16-.697c.303-2.681 1.215-5.346 2.542-7.865a3.1 3.1 0 0 1 4.188-1.297ZM40.545 50.73a3.1 3.1 0 0 1 4.182 1.315c.38.727.893 1.436 1.57 2.112a3.1 3.1 0 0 1-4.383 4.386 14.816 14.816 0 0 1-2.684-3.63 3.1 3.1 0 0 1 1.315-4.183Zm13.346-9.272a3.1 3.1 0 0 1 4.384 0 14.817 14.817 0 0 1 2.683 3.631 3.1 3.1 0 0 1-5.497 2.866 8.62 8.62 0 0 0-1.57-2.113 3.1 3.1 0 0 1 0-4.384Zm5.851 8.945a3.1 3.1 0 0 1 2.732 3.43c-.304 2.68-1.216 5.346-2.544 7.864a3.1 3.1 0 1 1-5.484-2.89c1.042-1.978 1.666-3.902 1.867-5.672a3.1 3.1 0 0 1 3.43-2.732ZM55.135 63.79a3.1 3.1 0 0 1 .244 4.378 38.955 38.955 0 0 1-5.743 5.238 3.1 3.1 0 0 1-3.706-4.971 32.758 32.758 0 0 0 4.828-4.4 3.1 3.1 0 0 1 4.377-.245Zm-45.44 4.185a3.1 3.1 0 0 1 4.384 0c.788.787 1.588 1.49 2.398 2.116a3.1 3.1 0 1 1-3.79 4.906 31.225 31.225 0 0 1-2.992-2.638 3.1 3.1 0 0 1 0-4.384Zm34.763 5.312a3.1 3.1 0 0 1-1.48 4.127 34.814 34.814 0 0 1-7.425 2.55 3.1 3.1 0 1 1-1.32-6.058 28.622 28.622 0 0 0 6.098-2.099 3.1 3.1 0 0 1 4.127 1.48Zm-26.565 1.66a3.1 3.1 0 0 1 4-1.795 20.161 20.161 0 0 0 6.056 1.28 3.1 3.1 0 1 1-.35 6.19 26.361 26.361 0 0 1-7.911-1.675 3.1 3.1 0 0 1-1.795-4Z" clip-rule="evenodd" opacity=".5"></path><path fill="#579E4B" fill-rule="evenodd" d="M58.501 50.834C56.589 46.9 53.708 44.767 50 44.767a3.1 3.1 0 1 1 0-6.2c6.708 0 11.432 4.116 14.077 9.557 2.607 5.363 3.381 12.263 2.43 18.977C64.614 80.466 55.465 94.767 37.5 94.767a3.1 3.1 0 1 1 0-6.2c13.701 0 21.22-10.699 22.868-22.335.82-5.786.083-11.385-1.867-15.398Z" clip-rule="evenodd"></path><path fill="#579E4B" fill-rule="evenodd" d="M42.799 49.166c1.913 3.934 4.793 6.067 8.501 6.067a3.1 3.1 0 0 1 0 6.2c-6.708 0-11.432-4.116-14.077-9.557-2.607-5.363-3.381-12.263-2.43-18.977C36.686 19.534 45.834 5.232 63.8 5.232a3.1 3.1 0 1 1 0 6.2c-13.701 0-21.22 10.699-22.868 22.335-.82 5.786-.083 11.385 1.867 15.398Z" clip-rule="evenodd"></path><path fill="#3E863D" fill-rule="evenodd" d="M50.834 42.799c-3.934 1.913-6.067 4.793-6.067 8.501a3.1 3.1 0 1 1-6.2 0c0-6.708 4.116-11.432 9.557-14.077 5.363-2.607 12.263-3.381 18.977-2.43C80.466 36.686 94.767 45.834 94.767 63.8a3.1 3.1 0 1 1-6.2 0c0-13.701-10.699-21.22-22.335-22.868-5.786-.82-11.385-.083-15.398 1.867Z" clip-rule="evenodd"></path><path fill="#3E863D" fill-rule="evenodd" d="M8.333 34.4a3.1 3.1 0 0 1 3.1 3.1c0 13.701 10.699 21.22 22.335 22.868 5.786.82 11.385.083 15.398-1.867 3.934-1.912 6.067-4.793 6.067-8.501a3.1 3.1 0 0 1 6.2 0c0 6.708-4.116 11.432-9.557 14.077-5.363 2.607-12.263 3.381-18.977 2.43C19.534 64.614 5.232 55.465 5.232 37.5a3.1 3.1 0 0 1 3.1-3.1Z" clip-rule="evenodd"></path><path fill="#579E4B" fill-rule="evenodd" d="M50 45.017a4.983 4.983 0 1 0 0 9.966 4.983 4.983 0 0 0 0-9.966ZM38.317 50c0-6.453 5.23-11.683 11.683-11.683 6.453 0 11.683 5.23 11.683 11.683 0 6.453-5.23 11.683-11.683 11.683-6.453 0-11.683-5.23-11.683-11.683Z" clip-rule="evenodd"></path></svg>`,
        };
    }
    function getPackagephobiaLinkData(packageName) {
        return {
            id: "packagephobia",
            label: "Check with Packagephobia",
            url: `https://packagephobia.com/result?p=${packageName}`,
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108" width="108" height="108" aria-hidden="true"><defs><linearGradient id="main"><stop offset="0" stop-color="#006838"></stop><stop offset="1" stop-color="#32de85"></stop></linearGradient></defs><path xmlns="http://www.w3.org/2000/svg" fill="url(#main)" d="M21.667 73.809V33.867l28.33-16.188 28.337 16.188V66.13L49.997 82.321 35 73.75V41.604l14.997-8.57L65 41.604v16.788l-15.003 8.571-1.663-.95v-16.67l8.382-4.792-6.719-3.838-8.33 4.763V69.88l8.33 4.762 21.67-12.383V37.737l-21.67-12.379-21.663 12.379v39.88L49.997 90 85 70V30L49.997 10 15 30v40z" transform="translate(-8.75 -7.5)scale(1.25)"></path></svg>`,
        };
    }
    function getBundlejsLinkData(packageName) {
        return {
            id: "bundlejs",
            label: "Check with Bundlejs",
            url: `https://bundlejs.com/?q=${packageName}`,
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024" aria-hidden="true" fill="none"><rect width="1024" height="1024" rx="250" fill="url(#a)"/><path d="M546.914 715.1c-28.98 0-53.19-6.75-72.63-20.25-19.44-13.5-34.11-31.86-44.01-55.08-9.72-23.22-14.58-49.41-14.58-78.57 0-29.16 4.86-55.35 14.58-78.57 9.72-23.22 24.03-41.58 42.93-55.08s42.21-20.25 69.93-20.25c27.9 0 52.2 6.66 72.9 19.98 20.7 13.32 36.72 31.59 48.06 54.81 11.52 23.04 17.28 49.41 17.28 79.11 0 29.16-5.67 55.35-17.01 78.57-11.16 23.22-26.82 41.58-46.98 55.08-20.16 13.5-43.65 20.25-70.47 20.25Zm-143.64-8.1V318.2h73.98v189h-9.18V707h-64.8Zm131.76-57.24c15.84 0 28.8-3.96 38.88-11.88 10.08-7.92 17.55-18.54 22.41-31.86 4.86-13.5 7.29-28.44 7.29-44.82 0-16.2-2.52-30.96-7.56-44.28-5.04-13.5-12.87-24.21-23.49-32.13-10.44-8.1-23.85-12.15-40.23-12.15-15.3 0-27.72 3.69-37.26 11.07-9.36 7.38-16.2 17.73-20.52 31.05s-6.48 28.8-6.48 46.44c0 17.64 2.16 33.12 6.48 46.44s11.34 23.67 21.06 31.05c9.9 7.38 23.04 11.07 39.42 11.07Z" fill="#FCFCFC" fill-opacity=".96"/><path d="m474.284 694.85.57-.821-.57.821Zm-44.01-55.08-.923.386.003.006.92-.392Zm0-157.14-.923-.386.923.386Zm42.93-55.08-.582-.814.582.814Zm142.83-.27-.541.841.541-.841Zm48.06 54.81-.899.439.004.008.895-.447Zm.27 157.68-.899-.439-.003.006.902.433Zm-46.98 55.08-.557-.831.557.831ZM403.274 707h-1v1h1v-1Zm0-388.8v-1h-1v1h1Zm73.98 0h1v-1h-1v1Zm0 189v1h1v-1h-1Zm-9.18 0v-1h-1v1h1Zm0 199.8v1h1v-1h-1Zm128.25-100.98.939.343.002-.004-.941-.339Zm-.27-89.1-.937.35.001.004.936-.354Zm-23.49-32.13-.613.79.007.006.008.006.598-.802Zm-77.49-1.08-.612-.791-.007.006.619.785Zm-20.52 31.05-.952-.309.952.309Zm0 92.88-.952.308.952-.308Zm21.06 31.05-.605.796.007.006.598-.802Zm51.3 75.41c-28.823 0-52.822-6.712-72.06-20.071l-1.141 1.642c19.642 13.641 44.063 20.429 73.201 20.429v-2Zm-72.06-20.071c-19.275-13.386-33.829-31.592-43.66-54.651l-1.84.784c9.968 23.381 24.754 41.895 44.359 55.509l1.141-1.642Zm-43.658-54.645c-9.661-23.08-14.502-49.136-14.502-78.184h-2c0 29.272 4.879 55.596 14.657 78.956l1.845-.772ZM416.694 561.2c0-29.048 4.841-55.104 14.502-78.184l-1.845-.772c-9.778 23.36-14.657 49.684-14.657 78.956h2Zm14.502-78.184c9.655-23.063 23.853-41.269 42.589-54.652l-1.163-1.628c-19.063 13.617-33.485 32.131-43.271 55.508l1.845.772Zm42.589-54.652c18.7-13.357 41.796-20.064 69.349-20.064v-2c-27.887 0-51.411 6.793-70.512 20.436l1.163 1.628Zm69.349-20.064c27.734 0 51.841 6.618 72.359 19.821l1.082-1.682c-20.882-13.437-45.376-20.139-73.441-20.139v2Zm72.359 19.821c20.538 13.216 36.438 31.343 47.702 54.408l1.797-.878c-11.416-23.375-27.556-41.788-48.417-55.212l-1.082 1.682Zm47.706 54.416c11.441 22.882 17.175 49.094 17.175 78.663h2c0-29.831-5.787-56.359-17.386-79.557l-1.789.894Zm17.175 78.663c0 29.028-5.644 55.064-16.909 78.131l1.797.878c11.415-23.373 17.112-49.717 17.112-79.009h-2Zm-16.912 78.137c-11.087 23.069-26.632 41.288-46.635 54.682l1.113 1.662c20.318-13.606 36.093-32.107 47.325-55.478l-1.803-.866Zm-46.635 54.682c-19.978 13.378-43.27 20.081-69.913 20.081v2c26.996 0 50.684-6.797 71.026-20.419l-1.113-1.662ZM404.274 707V318.2h-2V707h2Zm-1-387.8h73.98v-2h-73.98v2Zm72.98-1v189h2v-189h-2Zm1 188h-9.18v2h9.18v-2Zm-10.18 1V707h2V507.2h-2Zm1 198.8h-64.8v2h64.8v-2Zm66.96-55.24c16.01 0 29.203-4.005 39.498-12.094l-1.236-1.572c-9.866 7.751-22.592 11.666-38.262 11.666v2Zm39.498-12.094c10.241-8.047 17.814-18.827 22.731-32.303l-1.879-.686c-4.803 13.164-12.17 23.624-22.088 31.417l1.236 1.572Zm22.733-32.307c4.904-13.623 7.349-28.68 7.349-45.159h-2c0 16.281-2.415 31.104-7.231 44.481l1.882.678Zm7.349-45.159c0-16.304-2.537-31.186-7.625-44.634l-1.871.708c4.992 13.192 7.496 27.83 7.496 43.926h2Zm-7.623-44.63c-5.102-13.663-13.042-24.537-23.829-32.582l-1.196 1.604c10.452 7.795 18.172 18.341 23.151 31.678l1.874-.7ZM573.177 484c-10.654-8.266-24.296-12.36-40.843-12.36v2c16.212 0 29.391 4.006 39.617 11.94l1.226-1.58Zm-40.843-12.36c-15.461 0-28.115 3.731-37.872 11.279l1.224 1.582c9.322-7.212 21.509-10.861 36.648-10.861v-2Zm-37.879 11.285c-9.542 7.522-16.482 18.052-20.853 31.526l1.903.618c4.27-13.166 11.009-23.336 20.188-30.574l-1.238-1.57Zm-20.853 31.526c-4.359 13.442-6.528 29.03-6.528 46.749h2c0-17.561 2.15-32.933 6.431-46.131l-1.903-.618Zm-6.528 46.749c0 17.719 2.169 33.307 6.528 46.748l1.903-.617c-4.281-13.198-6.431-28.57-6.431-46.131h-2Zm6.528 46.748c4.374 13.485 11.501 24.017 21.407 31.538l1.209-1.592c-9.534-7.239-16.446-17.407-20.713-30.563l-1.903.617Zm21.414 31.544c10.121 7.545 23.492 11.268 40.018 11.268v-2c-16.235 0-29.144-3.657-38.823-10.872l-1.195 1.604Z" fill="#fff"/><defs><linearGradient id="a" x1="512" y1="0" x2="512" y2="1024" gradientUnits="userSpaceOnUse"><stop offset=".161" stop-color="#3B82F6"/><stop offset="1" stop-color="#262BA3"/></linearGradient></defs></svg>`,
        };
    }
    function scopeSvgId(svg, scope) {
        return svg
            .replace(/id="([^"]+)"/g, `id="${scope}-$1"`)
            .replace(/url\(#([^ )]+)\)/g, `url(#${scope}-$1)`);
    }
    async function getFeatureSettings2() {
        const settings = await Promise.resolve().then(
            () => (init_settings(), settings_exports)
        );
        return settings.featureSettings;
    }
    var description7;
    var init_helpful_links = __esm({
        "src/features/helpful-links.ts"() {
            init_utils_fetch();
            init_enhancement_settings();
            init_utils_npm_context();
            init_utils();
            description7 =
                "Add configurable package links above the Install command.";
        },
    });

    // node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
    function clamp(start, value, end) {
        return max(start, min(value, end));
    }
    function evaluate(value, param) {
        return typeof value === "function" ? value(param) : value;
    }
    function getSide(placement) {
        return placement.split("-")[0];
    }
    function getAlignment(placement) {
        return placement.split("-")[1];
    }
    function getOppositeAxis(axis) {
        return axis === "x" ? "y" : "x";
    }
    function getAxisLength(axis) {
        return axis === "y" ? "height" : "width";
    }
    function getSideAxis(placement) {
        const firstChar = placement[0];
        return firstChar === "t" || firstChar === "b" ? "y" : "x";
    }
    function getAlignmentAxis(placement) {
        return getOppositeAxis(getSideAxis(placement));
    }
    function expandPaddingObject(padding) {
        return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            ...padding,
        };
    }
    function getPaddingObject(padding) {
        return typeof padding !== "number"
            ? expandPaddingObject(padding)
            : {
                  top: padding,
                  right: padding,
                  bottom: padding,
                  left: padding,
              };
    }
    function rectToClientRect(rect) {
        const { x: x2, y: y2, width, height } = rect;
        return {
            width,
            height,
            top: y2,
            left: x2,
            right: x2 + width,
            bottom: y2 + height,
            x: x2,
            y: y2,
        };
    }
    var min, max, round, createCoords;
    var init_floating_ui_utils = __esm({
        "node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs"() {
            min = Math.min;
            max = Math.max;
            round = Math.round;
            createCoords = (v2) => ({
                x: v2,
                y: v2,
            });
        },
    });

    // node_modules/.pnpm/@floating-ui+core@1.7.5/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
    function computeCoordsFromPlacement(_ref, placement, rtl) {
        let { reference, floating } = _ref;
        const sideAxis = getSideAxis(placement);
        const alignmentAxis = getAlignmentAxis(placement);
        const alignLength = getAxisLength(alignmentAxis);
        const side = getSide(placement);
        const isVertical = sideAxis === "y";
        const commonX = reference.x + reference.width / 2 - floating.width / 2;
        const commonY =
            reference.y + reference.height / 2 - floating.height / 2;
        const commonAlign =
            reference[alignLength] / 2 - floating[alignLength] / 2;
        let coords;
        switch (side) {
            case "top":
                coords = {
                    x: commonX,
                    y: reference.y - floating.height,
                };
                break;
            case "bottom":
                coords = {
                    x: commonX,
                    y: reference.y + reference.height,
                };
                break;
            case "right":
                coords = {
                    x: reference.x + reference.width,
                    y: commonY,
                };
                break;
            case "left":
                coords = {
                    x: reference.x - floating.width,
                    y: commonY,
                };
                break;
            default:
                coords = {
                    x: reference.x,
                    y: reference.y,
                };
        }
        switch (getAlignment(placement)) {
            case "start":
                coords[alignmentAxis] -=
                    commonAlign * (rtl && isVertical ? -1 : 1);
                break;
            case "end":
                coords[alignmentAxis] +=
                    commonAlign * (rtl && isVertical ? -1 : 1);
                break;
        }
        return coords;
    }
    async function detectOverflow(state, options) {
        var _await$platform$isEle;
        if (options === void 0) {
            options = {};
        }
        const {
            x: x2,
            y: y2,
            platform: platform2,
            rects,
            elements,
            strategy,
        } = state;
        const {
            boundary = "clippingAncestors",
            rootBoundary = "viewport",
            elementContext = "floating",
            altBoundary = false,
            padding = 0,
        } = evaluate(options, state);
        const paddingObject = getPaddingObject(padding);
        const altContext =
            elementContext === "floating" ? "reference" : "floating";
        const element = elements[altBoundary ? altContext : elementContext];
        const clippingClientRect = rectToClientRect(
            await platform2.getClippingRect({
                element: (
                    (_await$platform$isEle = await (platform2.isElement == null
                        ? void 0
                        : platform2.isElement(element))) != null
                        ? _await$platform$isEle
                        : true
                )
                    ? element
                    : element.contextElement ||
                      (await (platform2.getDocumentElement == null
                          ? void 0
                          : platform2.getDocumentElement(elements.floating))),
                boundary,
                rootBoundary,
                strategy,
            })
        );
        const rect =
            elementContext === "floating"
                ? {
                      x: x2,
                      y: y2,
                      width: rects.floating.width,
                      height: rects.floating.height,
                  }
                : rects.reference;
        const offsetParent = await (platform2.getOffsetParent == null
            ? void 0
            : platform2.getOffsetParent(elements.floating));
        const offsetScale = (await (platform2.isElement == null
            ? void 0
            : platform2.isElement(offsetParent)))
            ? (await (platform2.getScale == null
                  ? void 0
                  : platform2.getScale(offsetParent))) || {
                  x: 1,
                  y: 1,
              }
            : {
                  x: 1,
                  y: 1,
              };
        const elementClientRect = rectToClientRect(
            platform2.convertOffsetParentRelativeRectToViewportRelativeRect
                ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect(
                      {
                          elements,
                          rect,
                          offsetParent,
                          strategy,
                      }
                  )
                : rect
        );
        return {
            top:
                (clippingClientRect.top -
                    elementClientRect.top +
                    paddingObject.top) /
                offsetScale.y,
            bottom:
                (elementClientRect.bottom -
                    clippingClientRect.bottom +
                    paddingObject.bottom) /
                offsetScale.y,
            left:
                (clippingClientRect.left -
                    elementClientRect.left +
                    paddingObject.left) /
                offsetScale.x,
            right:
                (elementClientRect.right -
                    clippingClientRect.right +
                    paddingObject.right) /
                offsetScale.x,
        };
    }
    async function convertValueToCoords(state, options) {
        const { placement, platform: platform2, elements } = state;
        const rtl = await (platform2.isRTL == null
            ? void 0
            : platform2.isRTL(elements.floating));
        const side = getSide(placement);
        const alignment = getAlignment(placement);
        const isVertical = getSideAxis(placement) === "y";
        const mainAxisMulti = originSides.has(side) ? -1 : 1;
        const crossAxisMulti = rtl && isVertical ? -1 : 1;
        const rawValue = evaluate(options, state);
        let { mainAxis, crossAxis, alignmentAxis } =
            typeof rawValue === "number"
                ? {
                      mainAxis: rawValue,
                      crossAxis: 0,
                      alignmentAxis: null,
                  }
                : {
                      mainAxis: rawValue.mainAxis || 0,
                      crossAxis: rawValue.crossAxis || 0,
                      alignmentAxis: rawValue.alignmentAxis,
                  };
        if (alignment && typeof alignmentAxis === "number") {
            crossAxis =
                alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
        }
        return isVertical
            ? {
                  x: crossAxis * crossAxisMulti,
                  y: mainAxis * mainAxisMulti,
              }
            : {
                  x: mainAxis * mainAxisMulti,
                  y: crossAxis * crossAxisMulti,
              };
    }
    var MAX_RESET_COUNT, computePosition, originSides, offset, shift;
    var init_floating_ui_core = __esm({
        "node_modules/.pnpm/@floating-ui+core@1.7.5/node_modules/@floating-ui/core/dist/floating-ui.core.mjs"() {
            init_floating_ui_utils();
            init_floating_ui_utils();
            MAX_RESET_COUNT = 50;
            computePosition = async (reference, floating, config) => {
                const {
                    placement = "bottom",
                    strategy = "absolute",
                    middleware = [],
                    platform: platform2,
                } = config;
                const platformWithDetectOverflow = platform2.detectOverflow
                    ? platform2
                    : {
                          ...platform2,
                          detectOverflow,
                      };
                const rtl = await (platform2.isRTL == null
                    ? void 0
                    : platform2.isRTL(floating));
                let rects = await platform2.getElementRects({
                    reference,
                    floating,
                    strategy,
                });
                let { x: x2, y: y2 } = computeCoordsFromPlacement(
                    rects,
                    placement,
                    rtl
                );
                let statefulPlacement = placement;
                let resetCount = 0;
                const middlewareData = {};
                for (let i2 = 0; i2 < middleware.length; i2++) {
                    const currentMiddleware = middleware[i2];
                    if (!currentMiddleware) {
                        continue;
                    }
                    const { name, fn } = currentMiddleware;
                    const {
                        x: nextX,
                        y: nextY,
                        data,
                        reset,
                    } = await fn({
                        x: x2,
                        y: y2,
                        initialPlacement: placement,
                        placement: statefulPlacement,
                        strategy,
                        middlewareData,
                        rects,
                        platform: platformWithDetectOverflow,
                        elements: {
                            reference,
                            floating,
                        },
                    });
                    x2 = nextX != null ? nextX : x2;
                    y2 = nextY != null ? nextY : y2;
                    middlewareData[name] = {
                        ...middlewareData[name],
                        ...data,
                    };
                    if (reset && resetCount < MAX_RESET_COUNT) {
                        resetCount++;
                        if (typeof reset === "object") {
                            if (reset.placement) {
                                statefulPlacement = reset.placement;
                            }
                            if (reset.rects) {
                                rects =
                                    reset.rects === true
                                        ? await platform2.getElementRects({
                                              reference,
                                              floating,
                                              strategy,
                                          })
                                        : reset.rects;
                            }
                            ({ x: x2, y: y2 } = computeCoordsFromPlacement(
                                rects,
                                statefulPlacement,
                                rtl
                            ));
                        }
                        i2 = -1;
                    }
                }
                return {
                    x: x2,
                    y: y2,
                    placement: statefulPlacement,
                    strategy,
                    middlewareData,
                };
            };
            originSides = /* @__PURE__ */ new Set(["left", "top"]);
            offset = function (options) {
                if (options === void 0) {
                    options = 0;
                }
                return {
                    name: "offset",
                    options,
                    async fn(state) {
                        var _middlewareData$offse, _middlewareData$arrow;
                        const {
                            x: x2,
                            y: y2,
                            placement,
                            middlewareData,
                        } = state;
                        const diffCoords = await convertValueToCoords(
                            state,
                            options
                        );
                        if (
                            placement ===
                                ((_middlewareData$offse =
                                    middlewareData.offset) == null
                                    ? void 0
                                    : _middlewareData$offse.placement) &&
                            (_middlewareData$arrow = middlewareData.arrow) !=
                                null &&
                            _middlewareData$arrow.alignmentOffset
                        ) {
                            return {};
                        }
                        return {
                            x: x2 + diffCoords.x,
                            y: y2 + diffCoords.y,
                            data: {
                                ...diffCoords,
                                placement,
                            },
                        };
                    },
                };
            };
            shift = function (options) {
                if (options === void 0) {
                    options = {};
                }
                return {
                    name: "shift",
                    options,
                    async fn(state) {
                        const {
                            x: x2,
                            y: y2,
                            placement,
                            platform: platform2,
                        } = state;
                        const {
                            mainAxis: checkMainAxis = true,
                            crossAxis: checkCrossAxis = false,
                            limiter = {
                                fn: (_ref) => {
                                    let { x: x3, y: y3 } = _ref;
                                    return {
                                        x: x3,
                                        y: y3,
                                    };
                                },
                            },
                            ...detectOverflowOptions
                        } = evaluate(options, state);
                        const coords = {
                            x: x2,
                            y: y2,
                        };
                        const overflow = await platform2.detectOverflow(
                            state,
                            detectOverflowOptions
                        );
                        const crossAxis = getSideAxis(getSide(placement));
                        const mainAxis = getOppositeAxis(crossAxis);
                        let mainAxisCoord = coords[mainAxis];
                        let crossAxisCoord = coords[crossAxis];
                        if (checkMainAxis) {
                            const minSide = mainAxis === "y" ? "top" : "left";
                            const maxSide =
                                mainAxis === "y" ? "bottom" : "right";
                            const min2 = mainAxisCoord + overflow[minSide];
                            const max2 = mainAxisCoord - overflow[maxSide];
                            mainAxisCoord = clamp(min2, mainAxisCoord, max2);
                        }
                        if (checkCrossAxis) {
                            const minSide = crossAxis === "y" ? "top" : "left";
                            const maxSide =
                                crossAxis === "y" ? "bottom" : "right";
                            const min2 = crossAxisCoord + overflow[minSide];
                            const max2 = crossAxisCoord - overflow[maxSide];
                            crossAxisCoord = clamp(min2, crossAxisCoord, max2);
                        }
                        const limitedCoords = limiter.fn({
                            ...state,
                            [mainAxis]: mainAxisCoord,
                            [crossAxis]: crossAxisCoord,
                        });
                        return {
                            ...limitedCoords,
                            data: {
                                x: limitedCoords.x - x2,
                                y: limitedCoords.y - y2,
                                enabled: {
                                    [mainAxis]: checkMainAxis,
                                    [crossAxis]: checkCrossAxis,
                                },
                            },
                        };
                    },
                };
            };
        },
    });

    // node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
    function hasWindow() {
        return typeof window !== "undefined";
    }
    function getNodeName(node) {
        if (isNode(node)) {
            return (node.nodeName || "").toLowerCase();
        }
        return "#document";
    }
    function getWindow(node) {
        var _node$ownerDocument;
        return (
            (node == null || (_node$ownerDocument = node.ownerDocument) == null
                ? void 0
                : _node$ownerDocument.defaultView) || window
        );
    }
    function getDocumentElement(node) {
        var _ref;
        return (_ref =
            (isNode(node) ? node.ownerDocument : node.document) ||
            window.document) == null
            ? void 0
            : _ref.documentElement;
    }
    function isNode(value) {
        if (!hasWindow()) {
            return false;
        }
        return value instanceof Node || value instanceof getWindow(value).Node;
    }
    function isElement(value) {
        if (!hasWindow()) {
            return false;
        }
        return (
            value instanceof Element ||
            value instanceof getWindow(value).Element
        );
    }
    function isHTMLElement(value) {
        if (!hasWindow()) {
            return false;
        }
        return (
            value instanceof HTMLElement ||
            value instanceof getWindow(value).HTMLElement
        );
    }
    function isShadowRoot(value) {
        if (!hasWindow() || typeof ShadowRoot === "undefined") {
            return false;
        }
        return (
            value instanceof ShadowRoot ||
            value instanceof getWindow(value).ShadowRoot
        );
    }
    function isOverflowElement(element) {
        const { overflow, overflowX, overflowY, display } =
            getComputedStyle2(element);
        return (
            /auto|scroll|overlay|hidden|clip/.test(
                overflow + overflowY + overflowX
            ) &&
            display !== "inline" &&
            display !== "contents"
        );
    }
    function isTableElement(element) {
        return /^(table|td|th)$/.test(getNodeName(element));
    }
    function isTopLayer(element) {
        try {
            if (element.matches(":popover-open")) {
                return true;
            }
        } catch (_e2) {}
        try {
            return element.matches(":modal");
        } catch (_e2) {
            return false;
        }
    }
    function isContainingBlock(elementOrCss) {
        const css = isElement(elementOrCss)
            ? getComputedStyle2(elementOrCss)
            : elementOrCss;
        return (
            isNotNone(css.transform) ||
            isNotNone(css.translate) ||
            isNotNone(css.scale) ||
            isNotNone(css.rotate) ||
            isNotNone(css.perspective) ||
            (!isWebKit() &&
                (isNotNone(css.backdropFilter) || isNotNone(css.filter))) ||
            willChangeRe.test(css.willChange || "") ||
            containRe.test(css.contain || "")
        );
    }
    function getContainingBlock(element) {
        let currentNode = getParentNode(element);
        while (
            isHTMLElement(currentNode) &&
            !isLastTraversableNode(currentNode)
        ) {
            if (isContainingBlock(currentNode)) {
                return currentNode;
            } else if (isTopLayer(currentNode)) {
                return null;
            }
            currentNode = getParentNode(currentNode);
        }
        return null;
    }
    function isWebKit() {
        if (isWebKitValue == null) {
            isWebKitValue =
                typeof CSS !== "undefined" &&
                CSS.supports &&
                CSS.supports("-webkit-backdrop-filter", "none");
        }
        return isWebKitValue;
    }
    function isLastTraversableNode(node) {
        return /^(html|body|#document)$/.test(getNodeName(node));
    }
    function getComputedStyle2(element) {
        return getWindow(element).getComputedStyle(element);
    }
    function getNodeScroll(element) {
        if (isElement(element)) {
            return {
                scrollLeft: element.scrollLeft,
                scrollTop: element.scrollTop,
            };
        }
        return {
            scrollLeft: element.scrollX,
            scrollTop: element.scrollY,
        };
    }
    function getParentNode(node) {
        if (getNodeName(node) === "html") {
            return node;
        }
        const result =
            // Step into the shadow DOM of the parent of a slotted node.
            node.assignedSlot || // DOM Element detected.
            node.parentNode || // ShadowRoot detected.
            (isShadowRoot(node) && node.host) || // Fallback.
            getDocumentElement(node);
        return isShadowRoot(result) ? result.host : result;
    }
    function getNearestOverflowAncestor(node) {
        const parentNode = getParentNode(node);
        if (isLastTraversableNode(parentNode)) {
            return node.ownerDocument ? node.ownerDocument.body : node.body;
        }
        if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
            return parentNode;
        }
        return getNearestOverflowAncestor(parentNode);
    }
    function getOverflowAncestors(node, list, traverseIframes) {
        var _node$ownerDocument2;
        if (list === void 0) {
            list = [];
        }
        if (traverseIframes === void 0) {
            traverseIframes = true;
        }
        const scrollableAncestor = getNearestOverflowAncestor(node);
        const isBody =
            scrollableAncestor ===
            ((_node$ownerDocument2 = node.ownerDocument) == null
                ? void 0
                : _node$ownerDocument2.body);
        const win = getWindow(scrollableAncestor);
        if (isBody) {
            const frameElement = getFrameElement(win);
            return list.concat(
                win,
                win.visualViewport || [],
                isOverflowElement(scrollableAncestor) ? scrollableAncestor : [],
                frameElement && traverseIframes
                    ? getOverflowAncestors(frameElement)
                    : []
            );
        } else {
            return list.concat(
                scrollableAncestor,
                getOverflowAncestors(scrollableAncestor, [], traverseIframes)
            );
        }
    }
    function getFrameElement(win) {
        return win.parent && Object.getPrototypeOf(win.parent)
            ? win.frameElement
            : null;
    }
    var willChangeRe, containRe, isNotNone, isWebKitValue;
    var init_floating_ui_utils_dom = __esm({
        "node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs"() {
            willChangeRe =
                /transform|translate|scale|rotate|perspective|filter/;
            containRe = /paint|layout|strict|content/;
            isNotNone = (value) => !!value && value !== "none";
        },
    });

    // node_modules/.pnpm/@floating-ui+dom@1.7.6/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
    function getCssDimensions(element) {
        const css = getComputedStyle2(element);
        let width = parseFloat(css.width) || 0;
        let height = parseFloat(css.height) || 0;
        const hasOffset = isHTMLElement(element);
        const offsetWidth = hasOffset ? element.offsetWidth : width;
        const offsetHeight = hasOffset ? element.offsetHeight : height;
        const shouldFallback =
            round(width) !== offsetWidth || round(height) !== offsetHeight;
        if (shouldFallback) {
            width = offsetWidth;
            height = offsetHeight;
        }
        return {
            width,
            height,
            $: shouldFallback,
        };
    }
    function unwrapElement(element) {
        return !isElement(element) ? element.contextElement : element;
    }
    function getScale(element) {
        const domElement = unwrapElement(element);
        if (!isHTMLElement(domElement)) {
            return createCoords(1);
        }
        const rect = domElement.getBoundingClientRect();
        const { width, height, $: $2 } = getCssDimensions(domElement);
        let x2 = ($2 ? round(rect.width) : rect.width) / width;
        let y2 = ($2 ? round(rect.height) : rect.height) / height;
        if (!x2 || !Number.isFinite(x2)) {
            x2 = 1;
        }
        if (!y2 || !Number.isFinite(y2)) {
            y2 = 1;
        }
        return {
            x: x2,
            y: y2,
        };
    }
    function getVisualOffsets(element) {
        const win = getWindow(element);
        if (!isWebKit() || !win.visualViewport) {
            return noOffsets;
        }
        return {
            x: win.visualViewport.offsetLeft,
            y: win.visualViewport.offsetTop,
        };
    }
    function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
        if (isFixed === void 0) {
            isFixed = false;
        }
        if (
            !floatingOffsetParent ||
            (isFixed && floatingOffsetParent !== getWindow(element))
        ) {
            return false;
        }
        return isFixed;
    }
    function getBoundingClientRect(
        element,
        includeScale,
        isFixedStrategy,
        offsetParent
    ) {
        if (includeScale === void 0) {
            includeScale = false;
        }
        if (isFixedStrategy === void 0) {
            isFixedStrategy = false;
        }
        const clientRect = element.getBoundingClientRect();
        const domElement = unwrapElement(element);
        let scale = createCoords(1);
        if (includeScale) {
            if (offsetParent) {
                if (isElement(offsetParent)) {
                    scale = getScale(offsetParent);
                }
            } else {
                scale = getScale(element);
            }
        }
        const visualOffsets = shouldAddVisualOffsets(
            domElement,
            isFixedStrategy,
            offsetParent
        )
            ? getVisualOffsets(domElement)
            : createCoords(0);
        let x2 = (clientRect.left + visualOffsets.x) / scale.x;
        let y2 = (clientRect.top + visualOffsets.y) / scale.y;
        let width = clientRect.width / scale.x;
        let height = clientRect.height / scale.y;
        if (domElement) {
            const win = getWindow(domElement);
            const offsetWin =
                offsetParent && isElement(offsetParent)
                    ? getWindow(offsetParent)
                    : offsetParent;
            let currentWin = win;
            let currentIFrame = getFrameElement(currentWin);
            while (currentIFrame && offsetParent && offsetWin !== currentWin) {
                const iframeScale = getScale(currentIFrame);
                const iframeRect = currentIFrame.getBoundingClientRect();
                const css = getComputedStyle2(currentIFrame);
                const left =
                    iframeRect.left +
                    (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) *
                        iframeScale.x;
                const top =
                    iframeRect.top +
                    (currentIFrame.clientTop + parseFloat(css.paddingTop)) *
                        iframeScale.y;
                x2 *= iframeScale.x;
                y2 *= iframeScale.y;
                width *= iframeScale.x;
                height *= iframeScale.y;
                x2 += left;
                y2 += top;
                currentWin = getWindow(currentIFrame);
                currentIFrame = getFrameElement(currentWin);
            }
        }
        return rectToClientRect({
            width,
            height,
            x: x2,
            y: y2,
        });
    }
    function getWindowScrollBarX(element, rect) {
        const leftScroll = getNodeScroll(element).scrollLeft;
        if (!rect) {
            return (
                getBoundingClientRect(getDocumentElement(element)).left +
                leftScroll
            );
        }
        return rect.left + leftScroll;
    }
    function getHTMLOffset(documentElement, scroll) {
        const htmlRect = documentElement.getBoundingClientRect();
        const x2 =
            htmlRect.left +
            scroll.scrollLeft -
            getWindowScrollBarX(documentElement, htmlRect);
        const y2 = htmlRect.top + scroll.scrollTop;
        return {
            x: x2,
            y: y2,
        };
    }
    function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
        let { elements, rect, offsetParent, strategy } = _ref;
        const isFixed = strategy === "fixed";
        const documentElement = getDocumentElement(offsetParent);
        const topLayer = elements ? isTopLayer(elements.floating) : false;
        if (offsetParent === documentElement || (topLayer && isFixed)) {
            return rect;
        }
        let scroll = {
            scrollLeft: 0,
            scrollTop: 0,
        };
        let scale = createCoords(1);
        const offsets = createCoords(0);
        const isOffsetParentAnElement = isHTMLElement(offsetParent);
        if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
            if (
                getNodeName(offsetParent) !== "body" ||
                isOverflowElement(documentElement)
            ) {
                scroll = getNodeScroll(offsetParent);
            }
            if (isOffsetParentAnElement) {
                const offsetRect = getBoundingClientRect(offsetParent);
                scale = getScale(offsetParent);
                offsets.x = offsetRect.x + offsetParent.clientLeft;
                offsets.y = offsetRect.y + offsetParent.clientTop;
            }
        }
        const htmlOffset =
            documentElement && !isOffsetParentAnElement && !isFixed
                ? getHTMLOffset(documentElement, scroll)
                : createCoords(0);
        return {
            width: rect.width * scale.x,
            height: rect.height * scale.y,
            x:
                rect.x * scale.x -
                scroll.scrollLeft * scale.x +
                offsets.x +
                htmlOffset.x,
            y:
                rect.y * scale.y -
                scroll.scrollTop * scale.y +
                offsets.y +
                htmlOffset.y,
        };
    }
    function getClientRects(element) {
        return Array.from(element.getClientRects());
    }
    function getDocumentRect(element) {
        const html = getDocumentElement(element);
        const scroll = getNodeScroll(element);
        const body = element.ownerDocument.body;
        const width = max(
            html.scrollWidth,
            html.clientWidth,
            body.scrollWidth,
            body.clientWidth
        );
        const height = max(
            html.scrollHeight,
            html.clientHeight,
            body.scrollHeight,
            body.clientHeight
        );
        let x2 = -scroll.scrollLeft + getWindowScrollBarX(element);
        const y2 = -scroll.scrollTop;
        if (getComputedStyle2(body).direction === "rtl") {
            x2 += max(html.clientWidth, body.clientWidth) - width;
        }
        return {
            width,
            height,
            x: x2,
            y: y2,
        };
    }
    function getViewportRect(element, strategy) {
        const win = getWindow(element);
        const html = getDocumentElement(element);
        const visualViewport = win.visualViewport;
        let width = html.clientWidth;
        let height = html.clientHeight;
        let x2 = 0;
        let y2 = 0;
        if (visualViewport) {
            width = visualViewport.width;
            height = visualViewport.height;
            const visualViewportBased = isWebKit();
            if (
                !visualViewportBased ||
                (visualViewportBased && strategy === "fixed")
            ) {
                x2 = visualViewport.offsetLeft;
                y2 = visualViewport.offsetTop;
            }
        }
        const windowScrollbarX = getWindowScrollBarX(html);
        if (windowScrollbarX <= 0) {
            const doc = html.ownerDocument;
            const body = doc.body;
            const bodyStyles = getComputedStyle(body);
            const bodyMarginInline =
                doc.compatMode === "CSS1Compat"
                    ? parseFloat(bodyStyles.marginLeft) +
                          parseFloat(bodyStyles.marginRight) || 0
                    : 0;
            const clippingStableScrollbarWidth = Math.abs(
                html.clientWidth - body.clientWidth - bodyMarginInline
            );
            if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
                width -= clippingStableScrollbarWidth;
            }
        } else if (windowScrollbarX <= SCROLLBAR_MAX) {
            width += windowScrollbarX;
        }
        return {
            width,
            height,
            x: x2,
            y: y2,
        };
    }
    function getInnerBoundingClientRect(element, strategy) {
        const clientRect = getBoundingClientRect(
            element,
            true,
            strategy === "fixed"
        );
        const top = clientRect.top + element.clientTop;
        const left = clientRect.left + element.clientLeft;
        const scale = isHTMLElement(element)
            ? getScale(element)
            : createCoords(1);
        const width = element.clientWidth * scale.x;
        const height = element.clientHeight * scale.y;
        const x2 = left * scale.x;
        const y2 = top * scale.y;
        return {
            width,
            height,
            x: x2,
            y: y2,
        };
    }
    function getClientRectFromClippingAncestor(
        element,
        clippingAncestor,
        strategy
    ) {
        let rect;
        if (clippingAncestor === "viewport") {
            rect = getViewportRect(element, strategy);
        } else if (clippingAncestor === "document") {
            rect = getDocumentRect(getDocumentElement(element));
        } else if (isElement(clippingAncestor)) {
            rect = getInnerBoundingClientRect(clippingAncestor, strategy);
        } else {
            const visualOffsets = getVisualOffsets(element);
            rect = {
                x: clippingAncestor.x - visualOffsets.x,
                y: clippingAncestor.y - visualOffsets.y,
                width: clippingAncestor.width,
                height: clippingAncestor.height,
            };
        }
        return rectToClientRect(rect);
    }
    function hasFixedPositionAncestor(element, stopNode) {
        const parentNode = getParentNode(element);
        if (
            parentNode === stopNode ||
            !isElement(parentNode) ||
            isLastTraversableNode(parentNode)
        ) {
            return false;
        }
        return (
            getComputedStyle2(parentNode).position === "fixed" ||
            hasFixedPositionAncestor(parentNode, stopNode)
        );
    }
    function getClippingElementAncestors(element, cache2) {
        const cachedResult = cache2.get(element);
        if (cachedResult) {
            return cachedResult;
        }
        let result = getOverflowAncestors(element, [], false).filter(
            (el) => isElement(el) && getNodeName(el) !== "body"
        );
        let currentContainingBlockComputedStyle = null;
        const elementIsFixed = getComputedStyle2(element).position === "fixed";
        let currentNode = elementIsFixed ? getParentNode(element) : element;
        while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
            const computedStyle = getComputedStyle2(currentNode);
            const currentNodeIsContaining = isContainingBlock(currentNode);
            if (
                !currentNodeIsContaining &&
                computedStyle.position === "fixed"
            ) {
                currentContainingBlockComputedStyle = null;
            }
            const shouldDropCurrentNode = elementIsFixed
                ? !currentNodeIsContaining &&
                  !currentContainingBlockComputedStyle
                : (!currentNodeIsContaining &&
                      computedStyle.position === "static" &&
                      !!currentContainingBlockComputedStyle &&
                      (currentContainingBlockComputedStyle.position ===
                          "absolute" ||
                          currentContainingBlockComputedStyle.position ===
                              "fixed")) ||
                  (isOverflowElement(currentNode) &&
                      !currentNodeIsContaining &&
                      hasFixedPositionAncestor(element, currentNode));
            if (shouldDropCurrentNode) {
                result = result.filter((ancestor) => ancestor !== currentNode);
            } else {
                currentContainingBlockComputedStyle = computedStyle;
            }
            currentNode = getParentNode(currentNode);
        }
        cache2.set(element, result);
        return result;
    }
    function getClippingRect(_ref) {
        let { element, boundary, rootBoundary, strategy } = _ref;
        const elementClippingAncestors =
            boundary === "clippingAncestors"
                ? isTopLayer(element)
                    ? []
                    : getClippingElementAncestors(element, this._c)
                : [].concat(boundary);
        const clippingAncestors = [...elementClippingAncestors, rootBoundary];
        const firstRect = getClientRectFromClippingAncestor(
            element,
            clippingAncestors[0],
            strategy
        );
        let top = firstRect.top;
        let right = firstRect.right;
        let bottom = firstRect.bottom;
        let left = firstRect.left;
        for (let i2 = 1; i2 < clippingAncestors.length; i2++) {
            const rect = getClientRectFromClippingAncestor(
                element,
                clippingAncestors[i2],
                strategy
            );
            top = max(rect.top, top);
            right = min(rect.right, right);
            bottom = min(rect.bottom, bottom);
            left = max(rect.left, left);
        }
        return {
            width: right - left,
            height: bottom - top,
            x: left,
            y: top,
        };
    }
    function getDimensions(element) {
        const { width, height } = getCssDimensions(element);
        return {
            width,
            height,
        };
    }
    function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
        const isOffsetParentAnElement = isHTMLElement(offsetParent);
        const documentElement = getDocumentElement(offsetParent);
        const isFixed = strategy === "fixed";
        const rect = getBoundingClientRect(
            element,
            true,
            isFixed,
            offsetParent
        );
        let scroll = {
            scrollLeft: 0,
            scrollTop: 0,
        };
        const offsets = createCoords(0);
        function setLeftRTLScrollbarOffset() {
            offsets.x = getWindowScrollBarX(documentElement);
        }
        if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
            if (
                getNodeName(offsetParent) !== "body" ||
                isOverflowElement(documentElement)
            ) {
                scroll = getNodeScroll(offsetParent);
            }
            if (isOffsetParentAnElement) {
                const offsetRect = getBoundingClientRect(
                    offsetParent,
                    true,
                    isFixed,
                    offsetParent
                );
                offsets.x = offsetRect.x + offsetParent.clientLeft;
                offsets.y = offsetRect.y + offsetParent.clientTop;
            } else if (documentElement) {
                setLeftRTLScrollbarOffset();
            }
        }
        if (isFixed && !isOffsetParentAnElement && documentElement) {
            setLeftRTLScrollbarOffset();
        }
        const htmlOffset =
            documentElement && !isOffsetParentAnElement && !isFixed
                ? getHTMLOffset(documentElement, scroll)
                : createCoords(0);
        const x2 = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
        const y2 = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
        return {
            x: x2,
            y: y2,
            width: rect.width,
            height: rect.height,
        };
    }
    function isStaticPositioned(element) {
        return getComputedStyle2(element).position === "static";
    }
    function getTrueOffsetParent(element, polyfill) {
        if (
            !isHTMLElement(element) ||
            getComputedStyle2(element).position === "fixed"
        ) {
            return null;
        }
        if (polyfill) {
            return polyfill(element);
        }
        let rawOffsetParent = element.offsetParent;
        if (getDocumentElement(element) === rawOffsetParent) {
            rawOffsetParent = rawOffsetParent.ownerDocument.body;
        }
        return rawOffsetParent;
    }
    function getOffsetParent(element, polyfill) {
        const win = getWindow(element);
        if (isTopLayer(element)) {
            return win;
        }
        if (!isHTMLElement(element)) {
            let svgOffsetParent = getParentNode(element);
            while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
                if (
                    isElement(svgOffsetParent) &&
                    !isStaticPositioned(svgOffsetParent)
                ) {
                    return svgOffsetParent;
                }
                svgOffsetParent = getParentNode(svgOffsetParent);
            }
            return win;
        }
        let offsetParent = getTrueOffsetParent(element, polyfill);
        while (
            offsetParent &&
            isTableElement(offsetParent) &&
            isStaticPositioned(offsetParent)
        ) {
            offsetParent = getTrueOffsetParent(offsetParent, polyfill);
        }
        if (
            offsetParent &&
            isLastTraversableNode(offsetParent) &&
            isStaticPositioned(offsetParent) &&
            !isContainingBlock(offsetParent)
        ) {
            return win;
        }
        return offsetParent || getContainingBlock(element) || win;
    }
    function isRTL(element) {
        return getComputedStyle2(element).direction === "rtl";
    }
    var noOffsets,
        SCROLLBAR_MAX,
        getElementRects,
        platform,
        offset2,
        shift2,
        computePosition2;
    var init_floating_ui_dom = __esm({
        "node_modules/.pnpm/@floating-ui+dom@1.7.6/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"() {
            init_floating_ui_core();
            init_floating_ui_utils();
            init_floating_ui_utils_dom();
            noOffsets = /* @__PURE__ */ createCoords(0);
            SCROLLBAR_MAX = 25;
            getElementRects = async function (data) {
                const getOffsetParentFn =
                    this.getOffsetParent || getOffsetParent;
                const getDimensionsFn = this.getDimensions;
                const floatingDimensions = await getDimensionsFn(data.floating);
                return {
                    reference: getRectRelativeToOffsetParent(
                        data.reference,
                        await getOffsetParentFn(data.floating),
                        data.strategy
                    ),
                    floating: {
                        x: 0,
                        y: 0,
                        width: floatingDimensions.width,
                        height: floatingDimensions.height,
                    },
                };
            };
            platform = {
                convertOffsetParentRelativeRectToViewportRelativeRect,
                getDocumentElement,
                getClippingRect,
                getOffsetParent,
                getElementRects,
                getClientRects,
                getDimensions,
                getScale,
                isElement,
                isRTL,
            };
            offset2 = offset;
            shift2 = shift;
            computePosition2 = (reference, floating, options) => {
                const cache2 = /* @__PURE__ */ new Map();
                const mergedOptions = {
                    platform,
                    ...options,
                };
                const platformWithCache = {
                    ...mergedOptions.platform,
                    _c: cache2,
                };
                return computePosition(reference, floating, {
                    ...mergedOptions,
                    platform: platformWithCache,
                });
            };
        },
    });

    // src/utils-ui.ts
    function addPackageLabelStyle() {
        addStyle(`
    .npm-userscript-package-label {
      display: inline-flex;
      border-radius: 4px;
      font-size: 0.9rem;
      font-weight: bold;
      border-style: solid;
      border-width: 1px;
      margin-left: 8px;
      gap: 3px;
      align-items: center;
      padding: 2px 4px;
      letter-spacing: normal;
    }
    button.npm-userscript-package-label {
      cursor: pointer;
    }
    .npm-userscript-package-label a {
      color: inherit;
      text-decoration: underline;
    }
    .npm-userscript-package-label-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.15em;
      height: 1.15em;
      margin-right: 1px;
      font-size: 0.82em;
      font-weight: 900;
      line-height: 1;
    }
    .npm-userscript-package-label-info {
      color: #004085;
      background-color: #cce5ff;
      border-color: #b8daff;
    }
    .npm-userscript-package-label-warning {
      color: #856404;
      background-color: #ffe76a;
      border-color: #d4c150;
    }
    .npm-userscript-package-label-error {
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
    }
    html[data-color-mode="dark"] .npm-userscript-package-label-info {
      color: #cce5ff;
      background-color: #004085;
      border-color: #7f9bb1;
    }
    html[data-color-mode="dark"] .npm-userscript-package-label-warning {
      color: #ffe76a;
      background-color: #856404;
      border-color: #a8943f;
    }
    html[data-color-mode="dark"] .npm-userscript-package-label-error {
      color: #f8d7da;
      background-color: #721c24;
      border-color: #b08f94;
    }
    .npm-userscript-badge-esm {
      color: #4c1d95;
      background: #ede9fe;
      border-color: #a78bfa;
    }
    .npm-userscript-badge-cjs {
      color: #78350f;
      background: #fef3c7;
      border-color: #f59e0b;
    }
    .npm-userscript-badge-dts {
      color: #1e3a8a;
      background: #dbeafe;
      border-color: #60a5fa;
    }
    .npm-userscript-badge-untyped {
      color: #713f12;
      background: #fef9c3;
      border-color: #eab308;
    }
    .npm-userscript-badge-node {
      color: #14532d;
      background: #dcfce7;
      border-color: #4ade80;
    }
    .npm-userscript-badge-cli {
      color: #134e4a;
      background: #ccfbf1;
      border-color: #2dd4bf;
    }
    .npm-userscript-badge-binary {
      color: #7c2d12;
      background: #ffedd5;
      border-color: #fb923c;
    }
    .npm-userscript-badge-lifecycle {
      color: #7f1d1d;
      background: #fee2e2;
      border-color: #f87171;
    }
    .npm-userscript-badge-vulnerable {
      color: #fff;
      background: #b91c1c;
      border-color: #ef4444;
    }
    .npm-userscript-badge-alternatives {
      color: #312e81;
      background: #e0e7ff;
      border-color: #818cf8;
    }
    html[data-color-mode="dark"] .npm-userscript-badge-esm { color: #ede9fe; background: #4c1d95; border-color: #8b5cf6; }
    html[data-color-mode="dark"] .npm-userscript-badge-cjs { color: #fef3c7; background: #78350f; border-color: #d97706; }
    html[data-color-mode="dark"] .npm-userscript-badge-dts { color: #dbeafe; background: #1e3a8a; border-color: #3b82f6; }
    html[data-color-mode="dark"] .npm-userscript-badge-untyped { color: #fef9c3; background: #713f12; border-color: #ca8a04; }
    html[data-color-mode="dark"] .npm-userscript-badge-node { color: #dcfce7; background: #14532d; border-color: #22c55e; }
    html[data-color-mode="dark"] .npm-userscript-badge-cli { color: #ccfbf1; background: #134e4a; border-color: #14b8a6; }
    html[data-color-mode="dark"] .npm-userscript-badge-binary { color: #ffedd5; background: #7c2d12; border-color: #f97316; }
    html[data-color-mode="dark"] .npm-userscript-badge-lifecycle { color: #fee2e2; background: #7f1d1d; border-color: #ef4444; }
    html[data-color-mode="dark"] .npm-userscript-badge-alternatives { color: #e0e7ff; background: #312e81; border-color: #6366f1; }
  `);
    }
    function addPackageLabel(
        orderKey,
        innerHtml,
        type = "info",
        el = "span",
        variant
    ) {
        const order = PACKAGE_LABEL_ORDER.indexOf(orderKey);
        const titleEl = document.querySelector("#top h1");
        if (!titleEl) throw new Error("Could not find package title element");
        const label = document.createElement(el);
        label.className = `npm-userscript-package-label npm-userscript-package-label-${type}`;
        label.innerHTML = innerHtml;
        if (variant) applyBadgeVariant(label, variant);
        label.dataset.order = order.toString();
        let inserted = false;
        const insertedLabels = document.querySelectorAll(
            ".npm-userscript-package-label"
        );
        for (let i2 = 0; i2 < insertedLabels.length; i2++) {
            const insertedLabel = insertedLabels[i2];
            const insertedOrder = Number(insertedLabel.dataset.order);
            if (order < insertedOrder) {
                titleEl.insertBefore(label, insertedLabel);
                inserted = true;
                return label;
            }
        }
        if (!inserted) {
            titleEl.appendChild(label);
        }
        return label;
    }
    function createPackageBadge(variant, text, title, type = "info") {
        const badge = document.createElement("span");
        badge.className = `npm-userscript-package-label npm-userscript-package-label-${type}`;
        badge.appendChild(document.createTextNode(text));
        applyBadgeVariant(badge, variant);
        if (title) badge.title = title;
        return badge;
    }
    function applyBadgeVariant(label, variant) {
        label.classList.add(`npm-userscript-badge-${variant}`);
        const icon = document.createElement("span");
        icon.className = "npm-userscript-package-label-icon";
        icon.textContent = BADGE_ICONS[variant];
        icon.setAttribute("aria-hidden", "true");
        label.insertAdjacentElement("afterbegin", icon);
    }
    function computeFloatingUI(ref, floating, options) {
        let manualOpened = false;
        async function open() {
            await options?.onBeforeOpen?.();
            floating.style.display = "block";
            const computed = await computePosition2(ref, floating, {
                placement: "bottom-start",
                middleware: [offset2(6), shift2({ padding: 5 })],
            });
            floating.style.left = `${computed.x}px`;
            floating.style.top = `${computed.y}px`;
        }
        function close() {
            if (manualOpened) return;
            setTimeout(() => {
                if (
                    floating.matches(":hover") ||
                    floating.matches(":focus-within")
                )
                    return;
                floating.style.display = "";
            }, 100);
        }
        [
            ["mouseenter", open],
            ["mouseleave", close],
            ["focus", open],
            ["blur", close],
        ].forEach(([event, listener]) => {
            ref.addEventListener(event, listener);
        });
        ref.addEventListener("click", () => {
            manualOpened = !manualOpened;
            manualOpened ? open() : close();
        });
        document.addEventListener("click", (event) => {
            if (
                !ref.contains(event.target) &&
                !floating.contains(event.target)
            ) {
                manualOpened = false;
                close();
            }
        });
        floating.addEventListener("mouseleave", close);
    }
    var BADGE_ICONS, PACKAGE_LABEL_ORDER;
    var init_utils_ui = __esm({
        "src/utils-ui.ts"() {
            init_floating_ui_dom();
            init_utils();
            BADGE_ICONS = {
                esm: "\u2197",
                cjs: "\u21BB",
                dts: "TS",
                untyped: "?",
                cli: "\u203A_",
                binary: "\u25C6",
                node: "\u2B22",
                lifecycle: "\u2699",
                vulnerable: "!",
                alternatives: "\u21C4",
            };
            PACKAGE_LABEL_ORDER = [
                "show-vulnerabilities",
                "show-file-types-label",
                "show-types-label",
                "show-cli-label-and-command",
                "show-binary-label",
                "show-engine-label",
                "show-lifecycle-scripts-label",
                "module-replacements",
            ];
        },
    });

    // src/features/module-replacements.ts
    var module_replacements_exports = {};
    __export(module_replacements_exports, {
        description: () => description8,
        getModuleReplacements: () => getModuleReplacements,
        run: () => run7,
        runPre: () => runPre8,
        teardown: () => teardown3,
    });
    function teardown3(previousUrl) {
        if (isSamePackagePage(previousUrl)) return;
        document
            .querySelectorAll(".npm-userscript-module-replacements-label")
            .forEach((el) => el.remove());
        document
            .querySelectorAll(".npm-userscript-popup")
            .forEach((el) => el.remove());
    }
    function runPre8() {
        addPackageLabelStyle();
        addStyle(`
    .npm-userscript-popup {
      display: none;
      width: max-content;
      max-width: 500px;
      max-height: 500px;
      z-index: 1000;
      overflow-y: auto;
      position: absolute;
      top: 0;
      left: 0;
      background: var(--background-color);
      font-size: 90%;
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid #aaa;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .npm-userscript-popup-documented {
      transform-origin: 0 0;
      transform: scale(0.8);
    }
  `);
    }
    async function run7() {
        if (!isValidPackagePage()) return;
        if (!badgeVisibility.alternatives.get()) return;
        if (document.querySelector(".npm-userscript-module-replacements-label"))
            return;
        const packageName = getPackageName();
        if (!packageName) return;
        const moduleReplacements = await getModuleReplacements();
        const replacement = moduleReplacements.find(
            (r2) => r2.moduleName === packageName
        );
        if (!replacement) return;
        const injectParent = document.querySelector("#top > div:first-child");
        if (!injectParent) return;
        switch (replacement.type) {
            case "documented": {
                const label = addPackageLabel(
                    "module-replacements",
                    "Has alternatives",
                    "info",
                    "button",
                    "alternatives"
                );
                label.classList.add("npm-userscript-module-replacements-label");
                const popup = document.createElement("div");
                popup.className =
                    "npm-userscript-popup npm-userscript-popup-documented" +
                    getReadmeInternalClassName();
                injectParent.appendChild(popup);
                let fetched = false;
                computeFloatingUI(label, popup, {
                    async onBeforeOpen() {
                        if (fetched) return;
                        fetched = true;
                        const html = await fetchDocumentedDocs(
                            replacement.docPath
                        );
                        popup.innerHTML = html;
                    },
                });
                break;
            }
            case "native": {
                const label = addPackageLabel(
                    "module-replacements",
                    "Prefer native code",
                    "warning",
                    "button",
                    "alternatives"
                );
                label.classList.add("npm-userscript-module-replacements-label");
                let replacementText = replacement.replacement;
                if (replacementText.startsWith("Use "))
                    replacementText = replacementText.slice(4);
                const popup = document.createElement("div");
                popup.className =
                    "npm-userscript-popup" + getReadmeInternalClassName();
                popup.innerHTML = `For Node.js v${replacement.nodeVersion} and later, use ${replacementText}. 
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/${replacement.mdnPath}" target="_blank">See MDN docs</a>.
`;
                injectParent.appendChild(popup);
                computeFloatingUI(label, popup);
                break;
            }
            case "simple": {
                const label = addPackageLabel(
                    "module-replacements",
                    "Prefer simpler code",
                    "error",
                    "button",
                    "alternatives"
                );
                label.classList.add("npm-userscript-module-replacements-label");
                const popup = document.createElement("div");
                popup.className =
                    "npm-userscript-popup" + getReadmeInternalClassName();
                popup.textContent = replacement.replacement;
                injectParent.appendChild(popup);
                computeFloatingUI(label, popup);
                break;
            }
        }
    }
    function getReadmeInternalClassName() {
        const el = document.getElementById("readme");
        if (!el) return "";
        return el.className
            .split(" ")
            .filter((c2) => c2.startsWith("_"))
            .join(" ");
    }
    function getModuleReplacements() {
        return Promise.resolve(
            cacheResult("moduleReplacements", 3600, async () => {
                const results = [
                    fetchJson(
                        "https://cdn.jsdelivr.net/npm/module-replacements@2/manifests/micro-utilities.json"
                    ),
                    fetchJson(
                        "https://cdn.jsdelivr.net/npm/module-replacements@2/manifests/native.json"
                    ),
                    fetchJson(
                        "https://cdn.jsdelivr.net/npm/module-replacements@2/manifests/preferred.json"
                    ),
                ];
                const [
                    microUtilities,
                    native,
                    preferred,
                ] = await Promise.all(results);
                return [
                    ...microUtilities.moduleReplacements,
                    ...native.moduleReplacements,
                    ...preferred.moduleReplacements,
                ];
            })
        );
    }
    async function fetchDocumentedDocs(docPath) {
        return cacheResult(`fetchDocumentedDocs:${docPath}`, 120, async () => {
            let markdown = await fetchText(
                `https://api.github.com/repos/es-tooling/module-replacements/contents/docs/modules/${docPath}.md`,
                {
                    headers: {
                        Accept: "application/vnd.github.raw+json",
                        "X-GitHub-Api-Version": "2022-11-28",
                    },
                }
            );
            markdown = markdown.replace(/^([\s\S]*?\n)# .+?\n/, "");
            const html = await fetchText("https://api.github.com/markdown", {
                method: "POST",
                headers: {
                    Accept: "text/html",
                    "X-GitHub-Api-Version": "2022-11-28",
                },
                body: JSON.stringify({
                    text: markdown,
                    mode: "gfm",
                    context: "es-tooling/module-replacements",
                }),
            });
            return html;
        });
    }
    var description8;
    var init_module_replacements = __esm({
        "src/features/module-replacements.ts"() {
            init_enhancement_settings();
            init_utils_fetch();
            init_utils_ui();
            init_utils();
            init_utils_cache();
            description8 = `Suggest alternatives for the package based on "es-tooling/module-replacements" data set.
`;
        },
    });

    // src/features/move-funding.ts
    var move_funding_exports = {};
    __export(move_funding_exports, {
        description: () => description9,
        run: () => run8,
    });
    function run8() {
        if (!isValidPackagePage()) return;
        if (document.querySelector(".npm-userscript-funding-button")) return;
        const sidebarButtons = document.querySelectorAll(
            '[aria-label="Package sidebar"] a.button'
        );
        let fundingButton = null;
        for (const button of sidebarButtons) {
            if (button.textContent.includes("Fund this package")) {
                fundingButton = button.parentElement;
                break;
            }
        }
        if (fundingButton) {
            const collaboratorsSection = document.querySelector(
                "div:has(> #collaborators)"
            );
            if (!collaboratorsSection) return;
            const cloned = fundingButton.cloneNode(true);
            cloned.classList.add("npm-userscript-funding-button");
            collaboratorsSection.insertAdjacentElement("afterend", cloned);
            fundingButton.style.display = "none";
        }
    }
    var description9;
    var init_move_funding = __esm({
        "src/features/move-funding.ts"() {
            init_utils();
            description9 = `Move the "Fund this package" button to the bottom of the sidebar.
`;
        },
    });

    // src/features/no-code-beta.ts
    var no_code_beta_exports = {};
    __export(no_code_beta_exports, {
        description: () => description10,
        disabled: () => disabled,
        runPre: () => runPre9,
    });
    function runPre9() {
        addStyle(`
    #package-tab-code > span > span:last-child {
      display: none;
    }
  `);
    }
    var description10, disabled;
    var init_no_code_beta = __esm({
        "src/features/no-code-beta.ts"() {
            init_utils();
            description10 = `Hide the "Beta" label in the package code tab.
`;
            disabled = true;
        },
    });

    // src/features/remember-banner.ts
    var remember_banner_exports = {};
    __export(remember_banner_exports, {
        description: () => description11,
        run: () => run9,
        runPre: () => runPre10,
    });
    function runPre10() {
        if (inited) return;
        inited = true;
        const wasClosed = cache.hasByPrefix(bannerPrefix);
        if (wasClosed) {
            addStyle(`
      section[aria-label="Site notifications"] {
        display: none;
      }
    `);
        }
    }
    function run9() {
        if (inited) return;
        const banner = document.querySelector(
            'section[aria-label="Site notifications"]'
        );
        if (!banner) return;
        const key = getBannerKey(banner);
        if (cache.get(key) === "hide") {
            banner.remove();
        } else {
            banner.style.display = "block";
            const closeButton = banner.querySelector("button");
            closeButton?.addEventListener("click", () => {
                cache.set(key, "hide");
            });
        }
        cache.clearByPrefix(bannerPrefix, [key]);
    }
    var description11, bannerPrefix, getBannerKey, inited;
    var init_remember_banner = __esm({
        "src/features/remember-banner.ts"() {
            init_utils_cache();
            init_utils();
            description11 = `Remember the banner at the top of the page when dismissed, so it doesn't keep showing up.
`;
            bannerPrefix = "remember-banner:";
            getBannerKey = (banner) => {
                const text = banner.textContent.trim();
                const hash =
                    btoa(encodeURIComponent(text)).slice(0, 16) + text.length;
                return `${bannerPrefix}${hash}`;
            };
            inited = false;
        },
    });

    // src/features/remove-redundant-homepage.ts
    var remove_redundant_homepage_exports = {};
    __export(remove_redundant_homepage_exports, {
        description: () => description12,
        run: () => run10,
        teardown: () => teardown4,
    });
    function teardown4(previousUrl) {
        if (isSamePackagePage(previousUrl)) return;
        const homepageEl = document.getElementById("homePage");
        if (homepageEl) {
            homepageEl.parentElement.style.display = "";
        }
    }
    function run10() {
        if (!isValidPackagePage()) return;
        const homepageEl = document.getElementById("homePage");
        if (!homepageEl) return;
        const npmContext2 = getNpmContext();
        const homepage = npmContext2.context.packument.homepage;
        const repository = npmContext2.context.packument.repository;
        if (!homepage || !repository) return;
        const isRedundant =
            homepage === repository || homepage === `${repository}#readme`;
        if (isRedundant) {
            homepageEl.parentElement.style.display = "none";
        }
    }
    var description12;
    var init_remove_redundant_homepage = __esm({
        "src/features/remove-redundant-homepage.ts"() {
            init_utils();
            init_utils_npm_context();
            description12 = `Remove the homepage link if it's the same as the repository link, or only has a hash to the readme.
`;
        },
    });

    // src/features/repository-card.ts
    var repository_card_exports = {};
    __export(repository_card_exports, {
        description: () => description13,
        run: () => run11,
        runPre: () => runPre11,
        teardown: () => teardown5,
    });
    function teardown5(previousUrl) {
        if (isSamePackagePage(previousUrl)) return;
        document.querySelector(".npm-userscript-repository-card")?.remove();
    }
    function runPre11() {
        if (!isValidPackagePage()) return;
        addStyle(`
    .npm-userscript-repository-card {
      border: 1px solid var(--color-border-default);
      border-radius: 5px;
      padding: 10px;
      margin-top: 14px;
      margin-right: -8px;
      font-size: 18px;
    }

    .npm-userscript-repository-card-title {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 0;
    }
    
    .npm-userscript-repository-card-title-repo {
      font-weight: bold;
    }

    .npm-userscript-repository-card-title-directory {
      font-weight: bold;
      color: #757575;
      text-wrap: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .npm-userscript-repository-card-title-separator {
      color: #757575;
    }

    .npm-userscript-repository-card-description {
      margin: 0;
      margin-top: 10px;
    }

    .npm-userscript-repository-card-entry {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      margin-right: 20px;
    }
    .npm-userscript-repository-card-entry:last-child {
      margin-right: 0;
    }

    .npm-userscript-repository-card a {
      text-decoration: none;
    }

    .npm-userscript-repository-card a:focus,
    .npm-userscript-repository-card a:hover {
      text-decoration: underline;
    }
  `);
        addStyle(`
    .npm-userscript-repository-card + p {
      display: none;
    }
  `);
    }
    async function run11() {
        if (!isValidPackagePage()) return;
        if (document.querySelector(".npm-userscript-repository-card")) return;
        const repositoryH3 = document.getElementById("repository");
        if (!repositoryH3) return;
        const repoData = await fetchGitHubRepoData();
        if (!repoData) return;
        const prCount = await fetchGitHubPullRequestsCount();
        if (prCount === void 0) return;
        const issueCount = repoData.open_issues_count - prCount;
        const packageJson = await fetchPackageJson();
        let directory = packageJson?.repository?.directory;
        if (directory) {
            directory = directory.replace(/^\/+/, "").replace(/\/+$/, "");
        }
        const fullRepoLink =
            repoData.html_url +
            (directory ? `/tree/${repoData.default_branch}/${directory}` : "");
        const changelogLink = await getChangelogLink(
            repoData.full_name,
            directory
        );
        const card = document.createElement("div");
        card.className = "npm-userscript-repository-card";
        card.innerHTML = `
    <div class="npm-userscript-repository-card-title">
      <img
        src="${repoData.owner.avatar_url}"
        alt="Repo logo"
        width="24"
        height="24"
        style="border-radius: ${repoData.organization ? "3px" : "100%"}"
      >
      <a class="npm-userscript-repository-card-title-repo" href="${repoData.html_url}" rel="noopener noreferrer nofollow">
        ${repoData.full_name}
      </a>
      ${
          directory
              ? `
            <span class="npm-userscript-repository-card-title-separator">/</span>
            <a class="npm-userscript-repository-card-title-directory" href="${fullRepoLink}" title="${directory}" rel="noopener noreferrer nofollow">
              ${directory}
            </a>
            `
              : ""
      }
    </div>
    <div class="npm-userscript-repository-card-description">
      <a class="npm-userscript-repository-card-entry" href="${repoData.html_url}/stargazers" title="${repoData.stargazers_count} stars" rel="noopener noreferrer nofollow">
        ${starSvg}
        ${repoData.stargazers_count.toLocaleString()}
      </a>
      <a class="npm-userscript-repository-card-entry" href="${repoData.html_url}/issues" title="${issueCount} issues" rel="noopener noreferrer nofollow" style="gap: 5px;">
        ${issueSvg}
        ${issueCount.toLocaleString()}
      </a>
      <a class="npm-userscript-repository-card-entry" href="${repoData.html_url}/pulls" title="${prCount} pull requests" rel="noopener noreferrer nofollow">
        ${pullSvg}
        ${prCount.toLocaleString()}
      </a>
      ${
          changelogLink
              ? `
            <a class="npm-userscript-repository-card-entry" href="${changelogLink}" rel="noopener noreferrer nofollow" style="font-size: 90%">
              ${changelogSvg} Changelog
            </a>
            `
              : ""
      }
    </div>
  `;
        repositoryH3.insertAdjacentElement("afterend", card);
        repositoryH3.parentElement?.classList.remove("bb");
        const sidebarColumns = document.querySelectorAll(
            '[aria-label="Package sidebar"] > div:has(> h3)'
        );
        for (const col of sidebarColumns) {
            const h3Text = col.querySelector("h3")?.textContent;
            if (h3Text === "Issues" || h3Text === "Pull Requests") {
                col.remove();
            }
        }
    }
    async function getChangelogLink(ownerRepo, directory) {
        const changelogPath = directory
            ? directory + "/CHANGELOG.md"
            : "CHANGELOG.md";
        return cacheResult(
            `getChangelogLink:${ownerRepo}:${directory}`,
            600,
            async () => {
                const status = await fetchStatus(
                    `https://api.github.com/repos/${ownerRepo}/contents/${changelogPath}`
                );
                if (status === 200) {
                    return getRepositoryFilePath(changelogPath);
                }
            }
        );
    }
    var description13, starSvg, issueSvg, pullSvg, changelogSvg;
    var init_repository_card = __esm({
        "src/features/repository-card.ts"() {
            init_utils_cache();
            init_utils_fetch();
            init_utils();
            description13 = `Consolidates all repository information in a card-like view in the package sidebar.
Enabling this would remove the "Stars", "Issues", and "Pull Requests" columns.
`;
            starSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path></svg>`;
            issueSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path></svg>`;
            pullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"></path></svg>`;
            changelogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M5 8.25a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 5 8.25ZM4 10.5A.75.75 0 0 0 4 12h4a.75.75 0 0 0 0-1.5H4Z"></path><path d="M13-.005c1.654 0 3 1.328 3 3 0 .982-.338 1.933-.783 2.818-.443.879-1.028 1.758-1.582 2.588l-.011.017c-.568.853-1.104 1.659-1.501 2.446-.398.789-.623 1.494-.623 2.136a1.5 1.5 0 1 0 2.333-1.248.75.75 0 0 1 .834-1.246A3 3 0 0 1 13 16H3a3 3 0 0 1-3-3c0-1.582.891-3.135 1.777-4.506.209-.322.418-.637.623-.946.473-.709.923-1.386 1.287-2.048H2.51c-.576 0-1.381-.133-1.907-.783A2.68 2.68 0 0 1 0 2.995a3 3 0 0 1 3-3Zm0 1.5a1.5 1.5 0 0 0-1.5 1.5c0 .476.223.834.667 1.132A.75.75 0 0 1 11.75 5.5H5.368c-.467 1.003-1.141 2.015-1.773 2.963-.192.289-.381.571-.558.845C2.13 10.711 1.5 11.916 1.5 13A1.5 1.5 0 0 0 3 14.5h7.401A2.989 2.989 0 0 1 10 13c0-.979.338-1.928.784-2.812.441-.874 1.023-1.748 1.575-2.576l.017-.026c.568-.853 1.103-1.658 1.501-2.448.398-.79.623-1.497.623-2.143 0-.838-.669-1.5-1.5-1.5Zm-10 0a1.5 1.5 0 0 0-1.5 1.5c0 .321.1.569.27.778.097.12.325.227.74.227h7.674A2.737 2.737 0 0 1 10 2.995c0-.546.146-1.059.401-1.5Z"></path></svg>`;
        },
    });

    // src/features/repository-directory.ts
    var repository_directory_exports = {};
    __export(repository_directory_exports, {
        description: () => description14,
        run: () => run12,
        teardown: () => teardown6,
    });
    function teardown6(previousUrl) {
        if (isSamePackagePage(previousUrl)) return;
        document
            .querySelector("a[aria-labelledby*=repository-link]")
            ?.classList.remove("npm-userscript-repository-directory");
    }
    async function run12() {
        if (!isValidPackagePage()) return;
        if (!document.querySelector(".npm-userscript-repository-directory"))
            return;
        const el = document.querySelector(
            "a[aria-labelledby*=repository-link]"
        );
        const textEl = document.getElementById("repository-link");
        if (!el || !textEl) return;
        const fullRepositoryLink = await getFullRepositoryLink();
        if (!fullRepositoryLink) return;
        if (el.href === fullRepositoryLink) return;
        el.href = fullRepositoryLink;
        textEl.textContent = fullRepositoryLink.replace(/^https?:\/\//, "");
        el.classList.add("npm-userscript-repository-directory");
    }
    var description14;
    var init_repository_directory = __esm({
        "src/features/repository-directory.ts"() {
            init_utils_fetch();
            init_utils();
            description14 = `Adds the repository directory to the repository link.
`;
        },
    });

    // src/package-metadata.ts
    function getHelpfulLinkMetadata(manifest) {
        return {
            repository: normalizeRepository2(manifest.repository),
            homepage: normalizeHttpUrl2(manifest.homepage),
            funding: normalizeFunding2(manifest.funding),
            version:
                typeof manifest.version === "string"
                    ? manifest.version
                    : void 0,
        };
    }
    function normalizeRepository2(value) {
        let repository = typeof value === "string" ? value : value?.url;
        if (typeof repository !== "string") return void 0;
        repository = repository
            .replace(/^git\+/, "")
            .replace(/^git:\/\//, "https://")
            .replace(/^git@github\.com:/, "https://github.com/")
            .replace(/\.git$/, "");
        return normalizeHttpUrl2(repository);
    }
    function normalizeFunding2(value) {
        const first = Array.isArray(value) ? value[0] : value;
        const url = typeof first === "string" ? first : first?.url;
        return normalizeHttpUrl2(url);
    }
    function normalizeHttpUrl2(value) {
        if (typeof value !== "string") return void 0;
        try {
            const url = new URL(value);
            return url.protocol === "https:" || url.protocol === "http:"
                ? url.href
                : void 0;
        } catch {
            return void 0;
        }
    }
    var init_package_metadata = __esm({
        "src/package-metadata.ts"() {},
    });

    // src/features/search-results.ts
    var search_results_exports = {};
    __export(search_results_exports, {
        description: () => description15,
        run: () => run13,
        runPre: () => runPre12,
        teardown: () => teardown7,
    });
    function runPre12() {
        addPackageLabelStyle();
        addStyle(`
    .npm-userscript-search-card {
      position: relative;
      min-height: 88px;
    }

    .npm-userscript-search-main {
      min-width: 0;
    }

    .npm-userscript-search-badges {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px;
      margin-left: 2px;
    }

    .npm-userscript-search-badges .npm-userscript-package-label {
      margin-left: 4px;
      padding: 1px 4px;
      font-size: 0.72rem;
      line-height: 1.2;
    }

    .npm-userscript-search-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 4px;
      width: 100%;
      max-width: 300px;
      margin: 0;
    }

    .npm-userscript-search-right {
      display: flex;
      flex: 0 0 min(38vw, 300px);
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      gap: 8px;
      min-width: 0;
      margin-left: auto;
    }

    .npm-userscript-search-links a {
      width: 25px;
      height: 25px;
      flex-basis: 25px;
    }

    .npm-userscript-search-links a svg,
    .npm-userscript-search-links a img {
      width: 18px;
      height: 18px;
    }

    @media (max-width: 50rem) {
      .npm-userscript-search-card {
        flex-wrap: wrap;
      }

      .npm-userscript-search-right {
        flex-basis: 100%;
        margin-top: 8px;
      }
    }
  `);
    }
    async function run13() {
        if (!isSearchPage()) return;
        await enrichSearchResults();
        if (!observer) {
            observer = new MutationObserver(queueEnrichment);
            const main2 = document.querySelector("main");
            if (main2)
                observer.observe(main2, { childList: true, subtree: true });
        }
    }
    function teardown7() {
        observer?.disconnect();
        observer = void 0;
        document
            .querySelectorAll(".npm-userscript-search-right")
            .forEach((right) => {
                const download = Array.from(right.children).find((child) =>
                    child.querySelector('[aria-label="Download statistics"]')
                );
                if (download)
                    right.insertAdjacentElement("beforebegin", download);
                right.remove();
            });
        document
            .querySelectorAll("[data-npm-enhancer-search]")
            .forEach((card) => {
                card.classList.remove("npm-userscript-search-card");
                card.firstElementChild?.classList.remove(
                    "npm-userscript-search-main"
                );
                delete card.dataset.npmEnhancerSearch;
            });
        document
            .querySelectorAll(
                ".npm-userscript-search-badges, .npm-userscript-search-links"
            )
            .forEach((element) => element.remove());
    }
    function queueEnrichment() {
        if (enrichQueued || !isSearchPage()) return;
        enrichQueued = true;
        requestAnimationFrame(() => {
            enrichQueued = false;
            void enrichSearchResults();
        });
    }
    async function enrichSearchResults() {
        const pageKey = location.href;
        const cards = getUnprocessedCards();
        if (cards.length === 0) return;
        await Promise.all(
            cards.map(async (card) => {
                card.card.dataset.npmEnhancerSearch = card.packageName;
                try {
                    const packageData = await requestManifest(() =>
                        fetchSearchPackageData(card.packageName)
                    );
                    card.manifest = packageData.manifest;
                    card.filePaths = packageData.filePaths;
                } catch (error) {
                    console.warn(
                        `[npm-enhancer] Could not enrich search result ${card.packageName}:`,
                        error
                    );
                }
            })
        );
        if (location.href !== pageKey) return;
        const settings = await Promise.resolve().then(
            () => (init_settings(), settings_exports)
        );
        const isFeatureEnabled = (name) =>
            settings.featureSettings[name]?.get() !== false;
        const showLinks =
            settings.featureSettings["helpful-links"].get() !== false;
        const showAlternatives =
            settings.featureSettings["module-replacements"].get() !== false &&
            badgeVisibility.alternatives.get();
        const showVulnerabilities =
            settings.featureSettings["show-vulnerabilities"].get() !== false &&
            badgeVisibility.vulnerable.get();
        const validCards = cards.filter((card) =>
            Boolean(card.manifest && card.card.isConnected)
        );
        const [replacementMap, vulnerablePackages] = await Promise.all([
            showAlternatives
                ? fetchReplacementMap()
                : /* @__PURE__ */ new Map(),
            showVulnerabilities
                ? fetchVulnerablePackages(validCards)
                : /* @__PURE__ */ new Set(),
        ]);
        if (location.href !== pageKey) return;
        await Promise.all(
            validCards.map(async (card) => {
                addSearchBadges(
                    card,
                    replacementMap.get(card.packageName),
                    vulnerablePackages,
                    isFeatureEnabled
                );
                if (showLinks) await addSearchLinks(card);
            })
        );
    }
    function getUnprocessedCards() {
        const cards = [];
        const headings = document.querySelectorAll(
            'main a[href^="/package/"] > h3'
        );
        for (const heading of headings) {
            const card = heading.closest("section");
            const headingRow = heading.parentElement?.parentElement;
            const link = heading.parentElement;
            if (!card || !headingRow || !link || card.dataset.npmEnhancerSearch)
                continue;
            const packageName = parsePackageName(link.getAttribute("href"));
            if (!packageName) continue;
            cards.push({ card, headingRow, packageName });
        }
        return cards;
    }
    function addSearchBadges(
        card,
        replacement,
        vulnerablePackages,
        isFeatureEnabled
    ) {
        if (card.card.querySelector(".npm-userscript-search-badges")) return;
        const specs = getBadgeSpecs(
            card.manifest,
            card.filePaths || [],
            isFeatureEnabled
        );
        if (replacement) {
            specs.push({
                id: "alternatives",
                text:
                    replacement.type === "native"
                        ? "Prefer native"
                        : replacement.type === "simple"
                          ? "Prefer simpler"
                          : "Alternatives",
                title: "The module-replacements project recommends an alternative.",
                type: replacement.type === "simple" ? "error" : "warning",
            });
        }
        if (vulnerablePackages.has(card.packageName)) {
            specs.unshift({
                id: "vulnerable",
                text: "VULNERABLE",
                title: "OSV reports a known vulnerability for this displayed package version.",
                type: "error",
            });
        }
        if (specs.length === 0) return;
        const container = document.createElement("span");
        container.className = "npm-userscript-search-badges";
        for (const spec of specs) {
            container.appendChild(
                createPackageBadge(spec.id, spec.text, spec.title, spec.type)
            );
        }
        const packageLink = card.headingRow.querySelector(
            ':scope > a[href^="/package/"]'
        );
        packageLink?.insertAdjacentElement("afterend", container);
    }
    async function addSearchLinks(card) {
        if (card.card.querySelector(".npm-userscript-search-links")) return;
        const links = await getHelpfulLinks(
            card.packageName,
            getHelpfulLinkMetadata(card.manifest),
            card.manifest.version
        );
        if (links.length === 0 || !card.card.isConnected) return;
        card.card.classList.add("npm-userscript-search-card");
        card.card.firstElementChild?.classList.add(
            "npm-userscript-search-main"
        );
        const linkRow = createHelpfulLinksElement(
            links,
            "npm-userscript-helpful-links npm-userscript-search-links"
        );
        const download = Array.from(card.card.children).find((child) =>
            child.querySelector('[aria-label="Download statistics"]')
        );
        if (!download) {
            card.card.appendChild(linkRow);
            return;
        }
        const right = document.createElement("div");
        right.className = "npm-userscript-search-right";
        download.insertAdjacentElement("beforebegin", right);
        right.append(linkRow, download);
    }
    function getBadgeSpecs(manifest, filePaths, isFeatureEnabled) {
        const specs = [];
        const fileTypes = detectManifestFileTypes(manifest, filePaths);
        if (
            isFeatureEnabled("show-file-types-label") &&
            fileTypes.esm &&
            badgeVisibility.esm.get()
        ) {
            specs.push({
                id: "esm",
                text: "ESM",
                title: "The package manifest advertises ESM.",
            });
        }
        if (
            isFeatureEnabled("show-file-types-label") &&
            fileTypes.cjs &&
            badgeVisibility.cjs.get()
        ) {
            specs.push({
                id: "cjs",
                text: "CJS",
                title: "The package manifest advertises CommonJS.",
            });
        }
        if (
            isFeatureEnabled("show-types-label") &&
            badgeVisibility.dts.get() &&
            (typeof manifest.types === "string" ||
                typeof manifest.typings === "string" ||
                manifest.name?.startsWith("@types/") ||
                filePaths.some(
                    (path) =>
                        path.endsWith(".d.ts") ||
                        path.endsWith(".d.mts") ||
                        path.endsWith(".d.cts")
                ))
        ) {
            specs.push({
                id: "dts",
                text: "DTS",
                title: "The package manifest publishes TypeScript types.",
            });
        }
        if (
            isFeatureEnabled("show-cli-label") &&
            badgeVisibility.cli.get() &&
            manifest.bin
        ) {
            specs.push({
                id: "cli",
                text: "CLI",
                title: "The package manifest publishes a command-line tool.",
            });
        }
        if (
            isFeatureEnabled("show-binary-label") &&
            badgeVisibility.binary.get() &&
            publishesNativeBinaries(manifest)
        ) {
            specs.push({
                id: "binary",
                text: "Binary",
                title: "The package manifest indicates native binaries.",
            });
        }
        if (
            isFeatureEnabled("show-engine-label") &&
            badgeVisibility.node.get() &&
            typeof manifest.engines?.node === "string"
        ) {
            specs.push({
                id: "node",
                text: `Node.js ${manifest.engines.node}`,
                title: `This package requires Node.js ${manifest.engines.node}.`,
            });
        }
        if (
            isFeatureEnabled("show-lifecycle-scripts-label") &&
            badgeVisibility.lifecycle.get()
        ) {
            const lifecycle = [
                "preinstall",
                "install",
                "postinstall",
            ].filter((name) => typeof manifest.scripts?.[name] === "string");
            if (lifecycle.length > 0) {
                specs.push({
                    id: "lifecycle",
                    text: "Install script",
                    title: `Runs on install: ${lifecycle.join(", ")}.`,
                    type: "warning",
                });
            }
        }
        return specs;
    }
    function detectManifestFileTypes(manifest, filePaths) {
        const exportsText = JSON.stringify(manifest.exports || "");
        const hasEsm =
            manifest.type === "module" ||
            typeof manifest.module === "string" ||
            /"(?:import|module)"\s*:/.test(exportsText) ||
            /\.mjs(?:"|$)/.test(exportsText) ||
            filePaths.some((path) => path.endsWith(".mjs"));
        const hasCjs =
            manifest.type === "commonjs" ||
            /"require"\s*:/.test(exportsText) ||
            /\.cjs(?:"|$)/.test(exportsText) ||
            (manifest.type !== "module" &&
                typeof manifest.main === "string" &&
                /\.js$/.test(manifest.main)) ||
            filePaths.some((path) => path.endsWith(".cjs"));
        return { esm: hasEsm, cjs: hasCjs };
    }
    function publishesNativeBinaries(manifest) {
        if (Array.isArray(manifest.os) && manifest.os.length > 0) return true;
        if (Array.isArray(manifest.cpu) && manifest.cpu.length > 0) return true;
        const names = Object.keys(manifest.optionalDependencies || {});
        const platforms = [
            "linux",
            "darwin",
            "win32",
            "android",
            "freebsd",
        ];
        const architectures = [
            "x64",
            "arm64",
            "ia32",
            "arm",
        ];
        return (
            names.filter(
                (name) =>
                    platforms.some((platform2) => name.includes(platform2)) &&
                    architectures.some((architecture) =>
                        name.includes(architecture)
                    )
            ).length >= 2
        );
    }
    async function fetchSearchPackageData(packageName) {
        const manifest = await Promise.resolve(
            cacheResult(`searchManifest:${packageName}`, 900, () =>
                fetchJson(
                    `https://registry.npmjs.org/${encodeURIComponent(packageName)}/latest`
                )
            )
        );
        const version = manifest.version;
        let filePaths = [];
        if (
            typeof version === "string" &&
            (badgeVisibility.esm.get() ||
                badgeVisibility.cjs.get() ||
                badgeVisibility.dts.get())
        ) {
            try {
                filePaths = await Promise.resolve(
                    cacheResult(
                        `searchFilePaths:${packageName}@${version}`,
                        900,
                        async () => {
                            const data = await fetchJson(
                                `https://data.jsdelivr.com/v1/package/npm/${packageName}@${encodeURIComponent(version)}/flat`
                            );
                            return (data.files || [])
                                .map((file) => file.name)
                                .filter((name) => typeof name === "string");
                        }
                    )
                );
            } catch (error) {
                console.warn(
                    `[npm-enhancer] Could not inspect published files for ${packageName}:`,
                    error
                );
            }
        }
        return { manifest, filePaths };
    }
    async function fetchReplacementMap() {
        try {
            const replacements = await getModuleReplacements();
            return new Map(
                replacements.map((replacement) => [
                    replacement.moduleName,
                    replacement,
                ])
            );
        } catch (error) {
            console.warn(
                "[npm-enhancer] Could not load package alternatives:",
                error
            );
            return /* @__PURE__ */ new Map();
        }
    }
    async function fetchVulnerablePackages(cards) {
        if (cards.length === 0) return /* @__PURE__ */ new Set();
        const cacheKey = cards
            .map(
                (card) =>
                    `${card.packageName}@${card.manifest.version || "latest"}`
            )
            .sort()
            .join("|");
        try {
            const result = await Promise.resolve(
                cacheResult(`searchVulnerabilities:${cacheKey}`, 300, () =>
                    fetchJson("https://api.osv.dev/v1/querybatch", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            queries: cards.map((card) => ({
                                package: {
                                    name: card.packageName,
                                    ecosystem: "npm",
                                },
                                version: card.manifest.version,
                            })),
                        }),
                    })
                )
            );
            const vulnerable = /* @__PURE__ */ new Set();
            result.results?.forEach((entry, index) => {
                if (entry.vulns?.length)
                    vulnerable.add(cards[index].packageName);
            });
            return vulnerable;
        } catch (error) {
            console.warn(
                "[npm-enhancer] Could not load search vulnerability badges:",
                error
            );
            return /* @__PURE__ */ new Set();
        }
    }
    function parsePackageName(href) {
        if (!href?.startsWith("/package/")) return void 0;
        const raw = href.slice("/package/".length).split(/[?#]/, 1)[0];
        if (!raw) return void 0;
        try {
            return decodeURIComponent(raw);
        } catch {
            return raw;
        }
    }
    function isSearchPage() {
        return location.pathname === "/search";
    }
    function createConcurrencyLimit(limit) {
        const queue = [];
        let active = 0;
        return function runLimited(task) {
            return new Promise((resolve, reject) => {
                const run24 = () => {
                    active++;
                    task()
                        .then(resolve, reject)
                        .finally(() => {
                            active--;
                            queue.shift()?.();
                        });
                };
                if (active < limit) run24();
                else queue.push(run24);
            });
        };
    }
    var description15, observer, enrichQueued, requestManifest;
    var init_search_results = __esm({
        "src/features/search-results.ts"() {
            init_enhancement_settings();
            init_utils_cache();
            init_utils_fetch();
            init_utils();
            init_utils_ui();
            init_package_metadata();
            init_helpful_links();
            init_module_replacements();
            description15 =
                "Add configurable package badges and helpful links to npm search results without opening package pages.";
            enrichQueued = false;
            requestManifest = createConcurrencyLimit(4);
        },
    });

    // src/features/show-binary-label.ts
    var show_binary_label_exports = {};
    __export(show_binary_label_exports, {
        description: () => description16,
        run: () => run14,
        runPre: () => runPre13,
        teardown: () => teardown8,
    });
    function teardown8(previousUrl) {
        if (isSamePackagePage(previousUrl)) return;
        document
            .querySelectorAll(".npm-userscript-binary-label")
            .forEach((el) => el.remove());
    }
    function runPre13() {
        addPackageLabelStyle();
    }
    async function run14() {
        if (!isValidPackagePage()) return;
        if (document.querySelector(".npm-userscript-binary-label")) return;
        const packageJson = await fetchPackageJson();
        if (!packageJson) return;
        if (!badgeVisibility.binary.get()) return;
        if (publishesNativeBinaries2(packageJson)) {
            const label = addPackageLabel(
                "show-binary-label",
                "Has binaries",
                "info",
                "span",
                "binary"
            );
            label.classList.add("npm-userscript-binary-label");
            label.title =
                "This package publishes prebuilt native binaries via optional dependencies";
            return;
        }
        const nativeInfo = isNativeBinary(packageJson);
        if (nativeInfo) {
            const label = addPackageLabel(
                "show-binary-label",
                `${nativeInfo} binary`,
                "info",
                "span",
                "binary"
            );
            label.classList.add("npm-userscript-binary-label");
            label.title = `This package publishes prebuilt native binary for ${nativeInfo}`;
        }
    }
    function publishesNativeBinaries2(packageJson) {
        const optionalDependencies = Object.keys(
            packageJson.optionalDependencies || {}
        );
        if (optionalDependencies.length <= 0) return false;
        let matchCount = 0;
        for (const dep of optionalDependencies) {
            if (
                popularOs.some((os) => dep.includes(os)) &&
                popularArch.some((arch) => dep.includes(arch)) &&
                ++matchCount >= 2
            ) {
                return true;
            }
        }
        return false;
    }
    function isNativeBinary(packageJson) {
        const os = packageJson.os ?? [];
        if (os.length === 0) return false;
        let str = os.join(", ");
        const cpu = packageJson.cpu ?? [];
        if (cpu.length > 0) {
            str += ` ${cpu.join(", ")}`;
        }
        return str;
    }
    var description16, popularOs, popularArch;
    var init_show_binary_label = __esm({
        "src/features/show-binary-label.ts"() {
            init_utils_fetch();
            init_enhancement_settings();
            init_utils_ui();
            init_utils();
            description16 = `Adds a label for packages that publish prebuilt native binaries.
`;
            popularOs = [
                "linux",
                "darwin",
                "win32",
            ];
            popularArch = [
                "x64",
                "arm64",
                "ia32",
            ];
        },
    });

    // src/features/show-cli-label-and-command.ts
    var show_cli_label_and_command_exports = {};
    __export(show_cli_label_and_command_exports, {
        description: () => description17,
        run: () => run15,
        runPre: () => runPre14,
        teardown: () => teardown9,
    });
    function teardown9(previousUrl) {
        if (isSamePackagePage(previousUrl)) return;
        document.querySelector(".npm-userscript-cli-label")?.remove();
    }
    function runPre14() {
        addPackageLabelStyle();
    }
    async function run15() {
        if (!isValidPackagePage()) return;
        if (document.querySelector(".npm-userscript-cli-label")) return;
        const packageName = getPackageName();
        const packageVersion = getPackageVersion();
        if (!packageName || !packageVersion) return;
        const isLatest =
            getNpmContext().context.packument.distTags.latest ===
            packageVersion;
        if (
            packageName.startsWith("create-") ||
            /^@.+\/create-/.test(packageName)
        ) {
            if (badgeVisibility.cli.get()) {
                const label = addPackageLabel(
                    "show-cli-label-and-command",
                    "CLI",
                    "info",
                    "span",
                    "cli"
                );
                label.classList.add("npm-userscript-cli-label");
                label.title = "This package is a template CLI";
            }
            const atVersion = isLatest ? "@latest" : `@${packageVersion}`;
            updateCodeBlock(
                `npm create ${packageName.slice("create-".length)}${atVersion}`
            );
            return;
        }
        const packageJson = await fetchPackageJson();
        if (!packageJson) return;
        const binNames = getBinNames(packageJson.bin, packageName);
        if (binNames.length === 0) return;
        if (badgeVisibility.cli.get()) {
            const label = addPackageLabel(
                "show-cli-label-and-command",
                "CLI",
                "info",
                "span",
                "cli"
            );
            label.classList.add("npm-userscript-cli-label");
            label.title = `This package publishes the ${binNames.map((n2) => `"${n2}"`).join(", ")} command`;
        }
        if (
            !packageJson.main &&
            !packageJson.exports &&
            !packageJson.browser &&
            !packageJson.module
        ) {
            const atVersion = isLatest ? "" : `@${packageVersion}`;
            updateCodeBlock(`npx ${packageName}${atVersion}`);
        }
    }
    function getBinNames(binField, packageName) {
        if (typeof binField === "string") {
            return [
                packageName.startsWith("@")
                    ? packageName.split("/")[1]
                    : packageName,
            ];
        } else if (typeof binField === "object" && binField !== null) {
            return Object.keys(binField);
        } else {
            return [];
        }
    }
    function updateCodeBlock(command) {
        const codeBlock = document.querySelector(
            '[aria-label="Package sidebar"] code'
        );
        if (!codeBlock) return;
        codeBlock.textContent = command;
    }
    var description17;
    var init_show_cli_label_and_command = __esm({
        "src/features/show-cli-label-and-command.ts"() {
            init_utils_fetch();
            init_enhancement_settings();
            init_utils_npm_context();
            init_utils_ui();
            init_utils();
            description17 = `Adds a label if the package publishes a CLI via the package.json "bin" field, and update the install
command to "npm create" or "npx" accordingly.
`;
        },
    });

    // src/features/show-engine-label.ts
    var show_engine_label_exports = {};
    __export(show_engine_label_exports, {
        description: () => description18,
        run: () => run16,
        runPre: () => runPre15,
        teardown: () => teardown10,
    });
    function teardown10(previousUrl) {
        if (isSamePackagePage(previousUrl)) return;
        document.querySelector(".npm-userscript-engine-label")?.remove();
    }
    function runPre15() {
        addPackageLabelStyle();
    }
    async function run16() {
        if (!isValidPackagePage()) return;
        if (document.querySelector(".npm-userscript-engine-label")) return;
        const packageJson = await fetchPackageJson();
        if (!packageJson) return;
        const engines = packageJson.engines;
        if (!engines || Object.keys(engines).length === 0) return;
        if (engines.node && badgeVisibility.node.get()) {
            const label = addPackageLabel(
                "show-engine-label",
                `Node.js ${engines.node}`,
                "info",
                "span",
                "node"
            );
            label.classList.add("npm-userscript-engine-label");
            label.title = `This package requires Node.js ${engines.node}`;
        }
    }
    var description18;
    var init_show_engine_label = __esm({
        "src/features/show-engine-label.ts"() {
            init_utils_fetch();
            init_enhancement_settings();
            init_utils_ui();
            init_utils();
            description18 = `Adds a label of the engine versions (e.g. Node.js) that a package supports.
`;
        },
    });

    // src/features/show-file-types-label.ts
    var show_file_types_label_exports = {};
    __export(show_file_types_label_exports, {
        description: () => description19,
        run: () => run17,
        runPre: () => runPre16,
        teardown: () => teardown11,
    });
    function teardown11(previousUrl) {
        if (isSamePackagePage(previousUrl)) return;
        document
            .querySelectorAll(".npm-userscript-file-types-label")
            .forEach((el) => el.remove());
    }
    function runPre16() {
        addPackageLabelStyle();
    }
    async function run17() {
        if (!isValidPackagePage()) return;
        if (document.querySelector(".npm-userscript-file-types-label")) return;
        const data = await fetchPackageFilesData();
        if (!data) return;
        const packageJson = await fetchPackageJson();
        if (!packageJson) return;
        const fileNames = Object.keys(data.files).sort();
        const fileTypes = await detectFileTypes(
            fileNames,
            data.files,
            packageJson
        );
        if (fileTypes.hasEsm && badgeVisibility.esm.get()) {
            const label = addPackageLabel(
                "show-file-types-label",
                "ESM",
                "info",
                "span",
                "esm"
            );
            label.classList.add("npm-userscript-file-types-label");
            label.title = "This package publishes ECMAScript Modules (ESM)";
        }
        if (fileTypes.hasCjs && badgeVisibility.cjs.get()) {
            const label = addPackageLabel(
                "show-file-types-label",
                "CJS",
                "info",
                "span",
                "cjs"
            );
            label.classList.add("npm-userscript-file-types-label");
            label.title = "This package publishes CommonJS modules (CJS)";
        }
    }
    async function detectFileTypes(fileNames, files, rootPackageJson) {
        let hasEsm = false;
        let hasCjs = false;
        for (const fileName of fileNames) {
            if (fileName.endsWith(".mjs")) {
                hasEsm = true;
            } else if (fileName.endsWith(".cjs")) {
                hasCjs = true;
            }
            if (hasEsm && hasCjs) break;
        }
        if (hasEsm && hasCjs) {
            return { hasEsm, hasCjs };
        }
        for (const fileName of fileNames) {
            if (fileName.endsWith(".js")) {
                const packageJson = await getNearesetPackageJson(fileName);
                if (packageJson?.type === "module") {
                    hasEsm = true;
                } else {
                    hasCjs = true;
                }
                if (hasEsm && hasCjs) break;
            }
        }
        return { hasEsm, hasCjs };
        async function getNearesetPackageJson(path) {
            const parts = path.split("/");
            while (parts.length > 0) {
                parts.pop();
                const candidatePath = parts.join("/") + "/package.json";
                if (candidatePath === "/package.json") {
                    return rootPackageJson;
                } else if (files[candidatePath]) {
                    return await fetchPackageFileContent(
                        files[candidatePath].hex
                    );
                }
            }
        }
    }
    var description19;
    var init_show_file_types_label = __esm({
        "src/features/show-file-types-label.ts"() {
            init_utils_fetch();
            init_enhancement_settings();
            init_utils_ui();
            init_utils();
            description19 = `Show ESM or CJS labels if the package publishes them.
`;
        },
    });

    // src/features/show-lifecycle-scripts-label.ts
    var show_lifecycle_scripts_label_exports = {};
    __export(show_lifecycle_scripts_label_exports, {
        description: () => description20,
        run: () => run18,
        runPre: () => runPre17,
        teardown: () => teardown12,
    });
    function teardown12(previousUrl) {
        if (isSamePackagePage(previousUrl)) return;
        document
            .querySelector(".npm-userscript-lifecycle-scripts-label")
            ?.remove();
    }
    function runPre17() {
        addPackageLabelStyle();
    }
    async function run18() {
        if (!isValidPackagePage()) return;
        if (document.querySelector(".npm-userscript-lifecycle-scripts-label"))
            return;
        const packageJson = await fetchPackageJson();
        if (!packageJson) return;
        if (!badgeVisibility.lifecycle.get()) return;
        const scriptNames = Object.keys(packageJson.scripts || {});
        const matchedScripts = LIFECYCLE_SCRIPTS.filter((script) =>
            scriptNames.includes(script)
        );
        if (matchedScripts.length === 0) return;
        const label = addPackageLabel(
            "show-lifecycle-scripts-label",
            `Runs script on install`,
            "warning",
            "span",
            "lifecycle"
        );
        label.classList.add("npm-userscript-lifecycle-scripts-label");
        label.title = `This package defines lifecycle scripts that run on install: ${matchedScripts.map((s2) => `"${s2}"`).join(", ")}`;
    }
    var description20, LIFECYCLE_SCRIPTS;
    var init_show_lifecycle_scripts_label = __esm({
        "src/features/show-lifecycle-scripts-label.ts"() {
            init_utils_fetch();
            init_enhancement_settings();
            init_utils_ui();
            init_utils();
            description20 = `Adds a label if the package defines lifecycle scripts in its package.json.
`;
            LIFECYCLE_SCRIPTS = [
                "postinstall",
                "preinstall",
                "install",
            ];
        },
    });

    // src/features/show-types-label.ts
    var show_types_label_exports = {};
    __export(show_types_label_exports, {
        description: () => description21,
        run: () => run19,
        runPre: () => runPre18,
        teardown: () => teardown13,
    });
    function teardown13(previousUrl) {
        if (isSamePackagePage(previousUrl)) return;
        document.querySelector(".npm-userscript-types-label")?.remove();
    }
    function runPre18() {
        addPackageLabelStyle();
        addStyle(`
    h1 > div[data-nosnippet="true"] {
      display: none !important;
    }
  `);
    }
    async function run19() {
        if (!isValidPackagePage()) return;
        if (document.querySelector(".npm-userscript-types-label")) return;
        const packageName = getPackageName();
        if (!packageName) return;
        if (
            packageName.startsWith("create-") ||
            /^@.+\/create-/.test(packageName)
        ) {
        }
        const typesInfo = parseNpmTypes();
        if (typesInfo.type === "none") {
            const data = await fetchPackageFilesData();
            if (
                Object.keys(data?.files ?? {}).some(
                    (p2) =>
                        p2.endsWith(".d.ts") ||
                        p2.endsWith(".d.mts") ||
                        p2.endsWith(".d.cts")
                )
            ) {
                typesInfo.type = "bundled";
            } else {
                let hasJsFiles = function (value) {
                    if (typeof value === "string") {
                        return (
                            value.endsWith(".js") ||
                            value.endsWith(".mjs") ||
                            value.endsWith(".cjs")
                        );
                    } else if (Array.isArray(value)) {
                        return value.some(hasJsFiles);
                    } else if (typeof value === "object" && value !== null) {
                        return Object.values(value).some(hasJsFiles);
                    }
                    return false;
                };
                const packageJson = await fetchPackageJson();
                if (
                    !hasJsFiles(packageJson?.main) &&
                    !hasJsFiles(packageJson?.exports)
                ) {
                    return;
                }
            }
        }
        let label;
        if (typesInfo.type === "none") {
            if (!badgeVisibility.untyped.get()) return;
            label = addPackageLabel(
                "show-types-label",
                "Untyped",
                "warning",
                "span",
                "untyped"
            );
            label.title = "This package does not publish TypeScript types";
        } else if (typesInfo.type === "bundled") {
            if (!badgeVisibility.dts.get()) return;
            label = addPackageLabel(
                "show-types-label",
                "DTS",
                "info",
                "span",
                "dts"
            );
            label.title = "This package publishes TypeScript types";
        } else if (typesInfo.type === "package") {
            if (!badgeVisibility.dts.get()) return;
            label = addPackageLabel(
                "show-types-label",
                `DTS: <a href="https://www.npmjs.com/package/${typesInfo.packageName}">${typesInfo.packageName}</a>`,
                "info",
                "span",
                "dts"
            );
            label.title = `This package relies on ${typesInfo.packageName} for TypeScript types`;
        } else {
            console.warn(
                "[npm-userscript:show-types-label] unable to determine types info"
            );
        }
        label?.classList.add("npm-userscript-types-label");
    }
    function parseNpmTypes() {
        const npmTypes = getNpmContext().context.capsule.types;
        if (npmTypes.typescript == null) {
            return { type: "none" };
        }
        if (npmTypes.typescript.bundled) {
            return { type: "bundled" };
        }
        if (npmTypes.typescript.package) {
            return {
                type: "package",
                packageName: npmTypes.typescript.package,
            };
        }
        return { type: "unknown" };
    }
    var description21;
    var init_show_types_label = __esm({
        "src/features/show-types-label.ts"() {
            init_utils_fetch();
            init_enhancement_settings();
            init_utils_npm_context();
            init_utils_ui();
            init_utils();
            description21 = `Adds a label for packages that publish TypeScript types. This is similar to npm's own DT / TS icon but
with a more consistent UI. It is also more accurate if the package publishes types but isn't detectable
in the package.json.
`;
        },
    });

    // node_modules/.pnpm/ae-cvss-calculator@1.0.12/node_modules/ae-cvss-calculator/dist/ae-cvss-calculator.js
    var require_ae_cvss_calculator = __commonJS({
        "node_modules/.pnpm/ae-cvss-calculator@1.0.12/node_modules/ae-cvss-calculator/dist/ae-cvss-calculator.js"(
            exports,
            module
        ) {
            !(function (e3, t2) {
                "object" == typeof exports && "object" == typeof module
                    ? (module.exports = t2())
                    : "function" == typeof define && define.amd
                      ? define([], t2)
                      : "object" == typeof exports
                        ? (exports.CvssCalculator = t2())
                        : (e3.CvssCalculator = t2());
            })(exports, () =>
                (() => {
                    "use strict";
                    var e3 = {
                            154: (e4, t3) => {
                                (Object.defineProperty(t3, "__esModule", {
                                    value: true,
                                }),
                                    (t3.CvssVector = void 0));
                                class o2 {
                                    constructor(e5, t4, o3) {
                                        ((this.vector = e5),
                                            (this.normalize = t4),
                                            (this.scores = o3));
                                    }
                                    isUpToDate(e5, t4) {
                                        return (
                                            this.vector === e5 &&
                                            this.normalize === t4
                                        );
                                    }
                                    getScores() {
                                        return this.scores;
                                    }
                                }
                                t3.CvssVector = class {
                                    constructor(e5) {
                                        ((this.vectorChangedListeners = []),
                                            (this.components =
                                                /* @__PURE__ */ new Map()),
                                            this.clearComponents(),
                                            e5 && this.applyVector(e5));
                                    }
                                    calculateScores(e5 = false) {
                                        const t4 = this.toString(true);
                                        if (
                                            this.cachedScores &&
                                            this.cachedScores.isUpToDate(t4, e5)
                                        )
                                            return this.cachedScores.getScores();
                                        const a2 =
                                            this.calculateScoresInternal(e5);
                                        return (
                                            (this.cachedScores = new o2(
                                                t4,
                                                e5,
                                                a2
                                            )),
                                            a2
                                        );
                                    }
                                    fillBaseMetrics() {
                                        for (const [
                                            e5,
                                            t4,
                                        ] of this.getRegisteredComponents())
                                            if ("base" === e5.name) {
                                                for (const e6 of t4) {
                                                    const t5 = e6.values[1];
                                                    t5 &&
                                                        this.applyComponent(
                                                            e6,
                                                            t5
                                                        );
                                                }
                                                return;
                                            }
                                        throw new Error(
                                            "No base category found"
                                        );
                                    }
                                    getComponents() {
                                        return this.components;
                                    }
                                    clearComponents() {
                                        this.getRegisteredComponents().forEach(
                                            (e5, t4) => {
                                                e5.forEach((e6) =>
                                                    this.components.set(
                                                        e6,
                                                        e6.values[0]
                                                    )
                                                );
                                            }
                                        );
                                    }
                                    clearSpecifiedComponents(e5) {
                                        e5.forEach((e6) =>
                                            this.components.set(
                                                e6,
                                                e6.values[0]
                                            )
                                        );
                                    }
                                    addVectorChangedListener(e5) {
                                        this.vectorChangedListeners.push(e5);
                                    }
                                    normalizeVector(e5) {
                                        return e5
                                            .replace(/\(/g, "")
                                            .replace(/\)/g, "")
                                            .replace(/CVSS:\d+\.?\d?/g, "")
                                            .replace(/\s/g, "")
                                            .replace(/\\/g, "")
                                            .replace(/^\//g, "")
                                            .replace(/\/$/g, "")
                                            .trim();
                                    }
                                    findComponent(e5) {
                                        for (const t4 of this.getRegisteredComponents().values()) {
                                            const o3 = t4.find(
                                                (t5) =>
                                                    t5.name === e5 ||
                                                    t5.shortName === e5
                                            );
                                            if (o3) return o3;
                                        }
                                        return Array.from(
                                            this.components.keys()
                                        ).find(
                                            (t4) =>
                                                t4.name === e5 ||
                                                t4.shortName === e5
                                        );
                                    }
                                    applyVector(e5) {
                                        this.applyVectorCount(e5);
                                    }
                                    applyVectorCount(e5) {
                                        const t4 =
                                            this.normalizeVector(e5).split("/");
                                        let o3 = 0;
                                        return (
                                            t4.forEach((e6) => {
                                                if (0 === e6.length) return;
                                                const [t5, a2] = e6.split(":");
                                                0 !== t5.length &&
                                                0 !== a2.length
                                                    ? this.applyComponentString(
                                                          t5,
                                                          a2,
                                                          false
                                                      ) && o3++
                                                    : console.warn(
                                                          "Invalid component/value pair",
                                                          e6
                                                      );
                                            }),
                                            this.vectorChangedListeners.forEach(
                                                (e6) => e6(this)
                                            ),
                                            o3
                                        );
                                    }
                                    applyComponentString(e5, t4, o3 = true) {
                                        const a2 = this.findComponent(e5);
                                        if (a2) {
                                            const i2 = a2.values.find(
                                                (e6) =>
                                                    e6.name === t4 ||
                                                    e6.shortName === t4
                                            );
                                            if (i2)
                                                return (
                                                    this.components.get(a2) !==
                                                        i2 &&
                                                    (this.applyComponent(
                                                        a2,
                                                        i2
                                                    ),
                                                    o3 &&
                                                        this.vectorChangedListeners.forEach(
                                                            (e6) => e6(this)
                                                        ),
                                                    true)
                                                );
                                            throw new Error(
                                                `Unknown component value ${t4} for component ${e5}`
                                            );
                                        }
                                        throw new Error(
                                            `Unknown component ${e5} when setting value ${t4}`
                                        );
                                    }
                                    applyComponentStringSilent(
                                        e5,
                                        t4,
                                        o3 = true
                                    ) {
                                        try {
                                            return this.applyComponentString(
                                                e5,
                                                t4,
                                                o3
                                            );
                                        } catch (e6) {
                                            return false;
                                        }
                                    }
                                    applyComponent(e5, t4, o3 = true) {
                                        (this.components.set(e5, t4),
                                            o3 &&
                                                this.vectorChangedListeners.forEach(
                                                    (e6) => e6(this)
                                                ));
                                    }
                                    applyVectorPartsIf(e5, t4, o3) {
                                        if (!e5) return 0;
                                        const a2 = this.normalizeVector(e5);
                                        if (0 === a2.length) return 0;
                                        const i2 = a2.split("/");
                                        let s2 = 0;
                                        for (const e6 of i2) {
                                            if (!e6) continue;
                                            const a3 = e6.split(":", 2),
                                                i3 = this.clone(),
                                                n2 = t4(i3);
                                            if (2 === a3.length) {
                                                i3.applyComponentStringSilent(
                                                    a3[0],
                                                    a3[1]
                                                );
                                                const e7 = t4(i3);
                                                o3
                                                    ? e7 <= n2 &&
                                                      (s2 +=
                                                          this.applyComponentStringSilent(
                                                              a3[0],
                                                              a3[1]
                                                          )
                                                              ? 1
                                                              : 0)
                                                    : e7 >= n2 &&
                                                      (s2 +=
                                                          this.applyComponentStringSilent(
                                                              a3[0],
                                                              a3[1]
                                                          )
                                                              ? 1
                                                              : 0);
                                            } else
                                                console.warn(
                                                    "Unknown vector argument:",
                                                    e6
                                                );
                                        }
                                        return s2;
                                    }
                                    applyVectorPartsIfLower(e5, t4) {
                                        return this.applyVectorPartsIf(
                                            e5,
                                            t4,
                                            true
                                        );
                                    }
                                    applyVectorPartsIfHigher(e5, t4) {
                                        return this.applyVectorPartsIf(
                                            e5,
                                            t4,
                                            false
                                        );
                                    }
                                    applyVectorPartsIfLowerVector(e5, t4) {
                                        return this.applyVectorPartsIf(
                                            e5.toStringDefinedParts(),
                                            t4,
                                            true
                                        );
                                    }
                                    applyVectorPartsIfHigherVector(e5, t4) {
                                        return this.applyVectorPartsIf(
                                            e5.toStringDefinedParts(),
                                            t4,
                                            false
                                        );
                                    }
                                    getComponent(e5) {
                                        const t4 = this.components.get(e5);
                                        if (!t4)
                                            throw new Error(
                                                `Unknown component: ${e5.name}`
                                            );
                                        return t4;
                                    }
                                    getComponentByString(e5) {
                                        const t4 = this.findComponent(e5);
                                        if (!t4)
                                            throw new Error(
                                                `Unknown component: ${e5}`
                                            );
                                        const o3 = this.components.get(t4);
                                        if (!o3)
                                            throw new Error(
                                                `Unknown component: ${e5}`
                                            );
                                        return o3;
                                    }
                                    getComponentByStringOpt(e5) {
                                        try {
                                            return this.getComponentByString(
                                                e5
                                            );
                                        } catch (e6) {
                                            return null;
                                        }
                                    }
                                    size() {
                                        return Array.from(
                                            this.components.values()
                                        ).filter(this.isComponentValueDefined)
                                            .length;
                                    }
                                    getFirstDefinedComponent(e5) {
                                        return e5
                                            .map((e6) =>
                                                this.components.get(e6)
                                            )
                                            .find(this.isComponentValueDefined);
                                    }
                                    toString(
                                        e5 = false,
                                        t4 = this.getRegisteredComponents(),
                                        o3 = false
                                    ) {
                                        let a2 = "";
                                        for (const [i2, s2] of t4)
                                            if (
                                                e5 ||
                                                this.isCategoryPartiallyDefined(
                                                    i2
                                                )
                                            )
                                                for (const e6 of s2) {
                                                    const t5 =
                                                        this.components.get(e6);
                                                    if (t5) {
                                                        if (
                                                            o3 &&
                                                            !this.isComponentValueDefined(
                                                                t5
                                                            )
                                                        )
                                                            continue;
                                                        a2 += `${e6.shortName}:${t5.shortName}/`;
                                                    }
                                                }
                                        return (
                                            this.getVectorPrefix() +
                                            a2.slice(0, -1)
                                        );
                                    }
                                    toStringDefinedParts() {
                                        return this.toString(
                                            false,
                                            this.getRegisteredComponents(),
                                            true
                                        );
                                    }
                                    isCategoryFullyDefined(e5) {
                                        const t4 =
                                            this.getRegisteredComponents().get(
                                                e5
                                            );
                                        return (
                                            !!t4 &&
                                            t4.every(
                                                (e6) =>
                                                    void 0 !==
                                                        this.components.get(
                                                            e6
                                                        ) &&
                                                    "ND" !==
                                                        this.components.get(e6)
                                                            .shortName &&
                                                    "X" !==
                                                        this.components.get(e6)
                                                            .shortName
                                            )
                                        );
                                    }
                                    isCategoryPartiallyDefined(e5) {
                                        const t4 =
                                            this.getRegisteredComponents().get(
                                                e5
                                            );
                                        return (
                                            !!t4 &&
                                            t4.some(
                                                (e6) =>
                                                    void 0 !==
                                                        this.components.get(
                                                            e6
                                                        ) &&
                                                    "ND" !==
                                                        this.components.get(e6)
                                                            .shortName &&
                                                    "X" !==
                                                        this.components.get(e6)
                                                            .shortName
                                            )
                                        );
                                    }
                                    round(e5, t4) {
                                        let o3 = Math.pow(10, t4);
                                        return Math.round(e5 * o3) / o3;
                                    }
                                    roundUp(e5) {
                                        let t4 = Math.round(1e5 * e5);
                                        return t4 % 1e4 == 0
                                            ? t4 / 1e5
                                            : (Math.floor(t4 / 1e4) + 1) / 10;
                                    }
                                    normalizeScore(e5, t4) {
                                        return 10 === t4
                                            ? e5
                                            : this.round(
                                                  this.mapRange(
                                                      e5,
                                                      0,
                                                      t4,
                                                      0,
                                                      10
                                                  ),
                                                  1
                                              );
                                    }
                                    mapRange(e5, t4, o3, a2, i2) {
                                        return (
                                            ((e5 - t4) / (o3 - t4)) *
                                                (i2 - a2) +
                                            a2
                                        );
                                    }
                                    pickRandomDefinedComponentValue(e5) {
                                        for (let t4 = 0; t4 < 999999; t4++) {
                                            const t5 =
                                                e5.values[
                                                    Math.floor(
                                                        Math.random() *
                                                            e5.values.length
                                                    )
                                                ];
                                            if (
                                                "X" !== t5.shortName &&
                                                "ND" !== t5.shortName &&
                                                !t5.hide
                                            )
                                                return t5;
                                        }
                                    }
                                    clone() {
                                        const e5 = new this.constructor();
                                        return (
                                            (e5.components = new Map(
                                                this.components
                                            )),
                                            e5
                                        );
                                    }
                                    diffVector(e5) {
                                        const t4 = new this.constructor();
                                        for (const [
                                            o3,
                                            a2,
                                        ] of this.getRegisteredComponents())
                                            for (const o4 of a2) {
                                                const a3 =
                                                        this.components.get(o4),
                                                    i2 = e5.components.get(o4),
                                                    s2 =
                                                        this.isComponentValueDefined(
                                                            a3
                                                        ),
                                                    n2 =
                                                        this.isComponentValueDefined(
                                                            i2
                                                        );
                                                (s2 &&
                                                    n2 &&
                                                    a3.shortName !==
                                                        i2.shortName) ||
                                                (!s2 && n2)
                                                    ? t4.applyComponent(o4, i2)
                                                    : s2 &&
                                                      !n2 &&
                                                      t4.applyComponent(o4, a3);
                                            }
                                        return t4;
                                    }
                                    applyEnvironmentalMetricsOntoBase() {
                                        for (const [
                                            e5,
                                            t4,
                                        ] of this.getRegisteredComponents())
                                            for (const e6 of t4) {
                                                const t5 =
                                                    this.components.get(e6);
                                                t5 &&
                                                    e6.baseMetricEquivalent &&
                                                    this.isComponentValueDefined(
                                                        t5
                                                    ) &&
                                                    (e6.baseMetricEquivalentMapper
                                                        ? this.applyComponentString(
                                                              e6
                                                                  .baseMetricEquivalent
                                                                  .shortName,
                                                              e6.baseMetricEquivalentMapper(
                                                                  t5
                                                              ).shortName,
                                                              false
                                                          )
                                                        : this.applyComponentString(
                                                              e6
                                                                  .baseMetricEquivalent
                                                                  .shortName,
                                                              t5.shortName,
                                                              false
                                                          ),
                                                    this.applyComponent(
                                                        e6,
                                                        e6.values[0],
                                                        false
                                                    ));
                                            }
                                        this.vectorChangedListeners.forEach(
                                            (e5) => e5(this)
                                        );
                                    }
                                    isComponentValueDefined(e5) {
                                        return (
                                            void 0 !== e5 &&
                                            "ND" !== e5.shortName &&
                                            "X" !== e5.shortName
                                        );
                                    }
                                    static _reorderAttributeSeverityOrder(e5) {
                                        const t4 = [];
                                        return (
                                            e5.forEach((e6, o3) => {
                                                t4.push([e6]);
                                            }),
                                            t4
                                        );
                                    }
                                };
                            },
                            156: function (e4, t3, o2) {
                                var a2 =
                                        (this && this.__createBinding) ||
                                        (Object.create
                                            ? function (e5, t4, o3, a3) {
                                                  void 0 === a3 && (a3 = o3);
                                                  var i3 =
                                                      Object.getOwnPropertyDescriptor(
                                                          t4,
                                                          o3
                                                      );
                                                  ((i3 &&
                                                      !("get" in i3
                                                          ? !t4.__esModule
                                                          : i3.writable ||
                                                            i3.configurable)) ||
                                                      (i3 = {
                                                          enumerable: true,
                                                          get: function () {
                                                              return t4[o3];
                                                          },
                                                      }),
                                                      Object.defineProperty(
                                                          e5,
                                                          a3,
                                                          i3
                                                      ));
                                              }
                                            : function (e5, t4, o3, a3) {
                                                  (void 0 === a3 && (a3 = o3),
                                                      (e5[a3] = t4[o3]));
                                              }),
                                    i2 =
                                        (this && this.__exportStar) ||
                                        function (e5, t4) {
                                            for (var o3 in e5)
                                                "default" === o3 ||
                                                    Object.prototype.hasOwnProperty.call(
                                                        t4,
                                                        o3
                                                    ) ||
                                                    a2(t4, e5, o3);
                                        };
                                (Object.defineProperty(t3, "__esModule", {
                                    value: true,
                                }),
                                    (t3.Cvss4P0 =
                                        t3.Cvss3P0 =
                                        t3.Cvss3P1 =
                                        t3.Cvss2 =
                                        t3.CvssVector =
                                            void 0));
                                var s2 = o2(154);
                                (Object.defineProperty(t3, "CvssVector", {
                                    enumerable: true,
                                    get: function () {
                                        return s2.CvssVector;
                                    },
                                }),
                                    i2(o2(564), t3));
                                var n2 = o2(475);
                                Object.defineProperty(t3, "Cvss2", {
                                    enumerable: true,
                                    get: function () {
                                        return n2.Cvss2;
                                    },
                                });
                                var r2 = o2(371);
                                Object.defineProperty(t3, "Cvss3P1", {
                                    enumerable: true,
                                    get: function () {
                                        return r2.Cvss3P1;
                                    },
                                });
                                var c2 = o2(623);
                                Object.defineProperty(t3, "Cvss3P0", {
                                    enumerable: true,
                                    get: function () {
                                        return c2.Cvss3P0;
                                    },
                                });
                                var l2 = o2(987);
                                Object.defineProperty(t3, "Cvss4P0", {
                                    enumerable: true,
                                    get: function () {
                                        return l2.Cvss4P0;
                                    },
                                });
                            },
                            331: (e4, t3) => {
                                var o2;
                                (Object.defineProperty(t3, "__esModule", {
                                    value: true,
                                }),
                                    (t3.Cvss3P0Components = void 0));
                                class a2 {}
                                ((t3.Cvss3P0Components = a2),
                                    (o2 = a2),
                                    (a2.CONFIDENTIALITY_IMPACT_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 0,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "There is no loss of confidentiality within the impacted component.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.22,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "There is some loss of confidentiality. Access to some restricted information is obtained, but the attacker does not have control over what information is obtained, or the amount or kind of loss is limited. The information disclosure does not cause a direct, serious loss to the impacted component.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 0.56,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "There is a total loss of confidentiality, resulting in all resources within the impacted component being divulged to the attacker. Alternatively, access to only some restricted information is obtained, but the disclosed information presents a direct, serious impact. For example, an attacker steals the administrator's password, or private encryption keys of a web server.",
                                        },
                                    }),
                                    (a2.CONFIDENTIALITY_IMPACT = [
                                        o2.CONFIDENTIALITY_IMPACT_VALUES.X,
                                        o2.CONFIDENTIALITY_IMPACT_VALUES.N,
                                        o2.CONFIDENTIALITY_IMPACT_VALUES.L,
                                        o2.CONFIDENTIALITY_IMPACT_VALUES.H,
                                    ]),
                                    (a2.INTEGRITY_IMPACT_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 0,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "There is no loss of integrity within the impacted component.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.22,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Modification of data is possible, but the attacker does not have control over the consequence of a modification, or the amount of modification is limited. The data modification does not have a direct, serious impact on the impacted component.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 0.56,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "There is a total loss of integrity, or a complete loss of protection. For example, the attacker is able to modify any/all files protected by the impacted component. Alternatively, only some files can be modified, but malicious modification would present a direct, serious consequence to the impacted component.",
                                        },
                                    }),
                                    (a2.INTEGRITY_IMPACT = [
                                        o2.INTEGRITY_IMPACT_VALUES.X,
                                        o2.INTEGRITY_IMPACT_VALUES.N,
                                        o2.INTEGRITY_IMPACT_VALUES.L,
                                        o2.INTEGRITY_IMPACT_VALUES.H,
                                    ]),
                                    (a2.AVAILABILITY_IMPACT_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 0,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "There is no impact to availability within the impacted component.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.22,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Performance is reduced or there are interruptions in resource availability. Even if repeated exploitation of the vulnerability is possible, the attacker does not have the ability to completely deny service to legitimate users. The resources in the impacted component are either partially available all of the time, or fully available only some of the time, but overall there is no direct, serious consequence to the impacted component.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 0.56,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "There is a total loss of availability, resulting in the attacker being able to fully deny access to resources in the impacted component; this loss is either sustained (while the attacker continues to deliver the attack) or persistent (the condition persists even after the attack has completed). Alternatively, the attacker has the ability to deny some availability, but the loss of availability presents a direct, serious consequence to the impacted component (e.g., the attacker cannot disrupt existing connections, but can prevent new connections; the attacker can repeatedly exploit a vulnerability that, in each instance of a successful attack, leaks a only small amount of memory, but after repeated exploitation causes a service to become completely unavailable).",
                                        },
                                    }),
                                    (a2.AVAILABILITY_IMPACT = [
                                        o2.AVAILABILITY_IMPACT_VALUES.X,
                                        o2.AVAILABILITY_IMPACT_VALUES.N,
                                        o2.AVAILABILITY_IMPACT_VALUES.L,
                                        o2.AVAILABILITY_IMPACT_VALUES.H,
                                    ]),
                                    (a2.CONFIDENTIALITY_REQUIREMENT_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Environmental Score, i.e., it has the same effect on scoring as assigning Medium.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.5,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Loss of Confidentiality is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        M: {
                                            shortName: "M",
                                            value: 1,
                                            name: "Medium",
                                            jsonSchemaName: "MEDIUM",
                                            description:
                                                "Loss of Confidentiality is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 1.5,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "Loss of Confidentiality is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                    }),
                                    (a2.CONFIDENTIALITY_REQUIREMENT = [
                                        o2.CONFIDENTIALITY_REQUIREMENT_VALUES.X,
                                        o2.CONFIDENTIALITY_REQUIREMENT_VALUES.L,
                                        o2.CONFIDENTIALITY_REQUIREMENT_VALUES.M,
                                        o2.CONFIDENTIALITY_REQUIREMENT_VALUES.H,
                                    ]),
                                    (a2.INTEGRITY_REQUIREMENT_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Environmental Score, i.e., it has the same effect on scoring as assigning Medium.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.5,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Loss of Integrity is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        M: {
                                            shortName: "M",
                                            value: 1,
                                            name: "Medium",
                                            jsonSchemaName: "MEDIUM",
                                            description:
                                                "Loss of Integrity is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 1.5,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "Loss of Integrity is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                    }),
                                    (a2.INTEGRITY_REQUIREMENT = [
                                        o2.INTEGRITY_REQUIREMENT_VALUES.X,
                                        o2.INTEGRITY_REQUIREMENT_VALUES.L,
                                        o2.INTEGRITY_REQUIREMENT_VALUES.M,
                                        o2.INTEGRITY_REQUIREMENT_VALUES.H,
                                    ]),
                                    (a2.AVAILABILITY_REQUIREMENT_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Environmental Score, i.e., it has the same effect on scoring as assigning Medium.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.5,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Loss of Availability is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        M: {
                                            shortName: "M",
                                            value: 1,
                                            name: "Medium",
                                            jsonSchemaName: "MEDIUM",
                                            description:
                                                "Loss of Availability is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 1.5,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "Loss of Availability is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                    }),
                                    (a2.AVAILABILITY_REQUIREMENT = [
                                        o2.AVAILABILITY_REQUIREMENT_VALUES.X,
                                        o2.AVAILABILITY_REQUIREMENT_VALUES.L,
                                        o2.AVAILABILITY_REQUIREMENT_VALUES.M,
                                        o2.AVAILABILITY_REQUIREMENT_VALUES.H,
                                    ]),
                                    (a2.TEMPLATE_CIA_REQUIREMENT_MODIFIED_VALUES =
                                        {
                                            X: {
                                                shortName: "X",
                                                value: 1,
                                                name: "Not Defined",
                                                abbreviatedName: "Not Def.",
                                                jsonSchemaName: "NOT_DEFINED",
                                                description:
                                                    "Component is not defined.",
                                            },
                                            L: {
                                                shortName: "L",
                                                value: 0.5,
                                                name: "Low",
                                                jsonSchemaName: "LOW",
                                                description:
                                                    "There is no impact to the integrity of the system.",
                                            },
                                            M: {
                                                shortName: "M",
                                                value: 1,
                                                name: "Medium",
                                                jsonSchemaName: "MEDIUM",
                                                description:
                                                    "There is a partial compromise of system integrity.",
                                            },
                                            H: {
                                                shortName: "H",
                                                value: 1.5,
                                                name: "High",
                                                jsonSchemaName: "HIGH",
                                                description:
                                                    "There is a total compromise of system integrity.",
                                            },
                                        }),
                                    (a2.TEMPLATE_CIA_REQUIREMENT_MODIFIED = [
                                        o2
                                            .TEMPLATE_CIA_REQUIREMENT_MODIFIED_VALUES
                                            .X,
                                        o2
                                            .TEMPLATE_CIA_REQUIREMENT_MODIFIED_VALUES
                                            .L,
                                        o2
                                            .TEMPLATE_CIA_REQUIREMENT_MODIFIED_VALUES
                                            .M,
                                        o2
                                            .TEMPLATE_CIA_REQUIREMENT_MODIFIED_VALUES
                                            .H,
                                    ]),
                                    (a2.BASE_CATEGORY = {
                                        name: "base",
                                        description:
                                            "This metric reflects the qualities of a vulnerability that are constant over time and across user environments.",
                                    }),
                                    (a2.AV_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0.85,
                                            name: "Network",
                                            abbreviatedName: "Netw.",
                                            jsonSchemaName: "NETWORK",
                                            description:
                                                "The vulnerable component is bound to the network stack and the set of possible attackers extends beyond the other options listed below, up to and including the entire Internet.",
                                        },
                                        A: {
                                            shortName: "A",
                                            value: 0.62,
                                            name: "Adjacent Network",
                                            abbreviatedName: "Adj. Network",
                                            jsonSchemaName: "ADJACENT_NETWORK",
                                            description:
                                                "The vulnerable component is bound to the network stack, but the attack is limited at the protocol level to a logically adjacent topology.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.55,
                                            name: "Local",
                                            jsonSchemaName: "LOCAL",
                                            description:
                                                "The vulnerable component is not bound to the network stack and the attacker's path is via read/write/execute capabilities.",
                                        },
                                        P: {
                                            shortName: "P",
                                            value: 0.2,
                                            name: "Physical",
                                            abbreviatedName: "Phys.",
                                            jsonSchemaName: "PHYSICAL",
                                            description:
                                                "The attack requires the attacker to physically touch or manipulate the vulnerable component.",
                                        },
                                    }),
                                    (a2.AV = {
                                        name: "Attack Vector",
                                        shortName: "AV",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric reflects the context by which vulnerability exploitation is possible. The more remote an attacker can be to attack a host, the greater the vulnerability score.",
                                        values: [
                                            o2.AV_VALUES.X,
                                            o2.AV_VALUES.N,
                                            o2.AV_VALUES.A,
                                            o2.AV_VALUES.L,
                                            o2.AV_VALUES.P,
                                        ],
                                    }),
                                    (a2.AC_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.77,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Specialized access conditions or extenuating circumstances do not exist. An attacker can expect repeatable success when attacking the vulnerable component.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 0.44,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "A successful attack depends on conditions beyond the attacker's control. That is, a successful attack cannot be accomplished at will, but requires the attacker to invest in some measurable amount of effort in preparation or execution against the vulnerable component before a successful attack can be expected.",
                                        },
                                    }),
                                    (a2.AC = {
                                        name: "Attack Complexity",
                                        shortName: "AC",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric describes the conditions beyond the attacker's control that must exist in order to exploit the vulnerability.",
                                        values: [
                                            o2.AC_VALUES.X,
                                            o2.AC_VALUES.L,
                                            o2.AC_VALUES.H,
                                        ],
                                    }),
                                    (a2.PR_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            changedValue: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0.85,
                                            changedValue: 0.85,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "The attacker is unauthorized prior to attack, and therefore does not require any access to settings or files of the vulnerable system to carry out an attack.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.62,
                                            changedValue: 0.68,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "The attacker requires privileges that provide basic user capabilities that could normally affect only settings and files owned by a user. Alternatively, an attacker with Low privileges has the ability to access only non-sensitive resources.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 0.27,
                                            changedValue: 0.5,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "The attacker requires privileges that provide significant (e.g., administrative) control over the vulnerable component allowing access to component-wide settings and files.",
                                        },
                                    }),
                                    (a2.PR = {
                                        name: "Privileges Required",
                                        shortName: "PR",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability.",
                                        values: [
                                            o2.PR_VALUES.X,
                                            o2.PR_VALUES.N,
                                            o2.PR_VALUES.L,
                                            o2.PR_VALUES.H,
                                        ],
                                    }),
                                    (a2.UI_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0.85,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "The vulnerable system can be exploited without interaction from any user.",
                                        },
                                        R: {
                                            shortName: "R",
                                            value: 0.62,
                                            name: "Required",
                                            abbreviatedName: "Req.",
                                            jsonSchemaName: "REQUIRED",
                                            description:
                                                "Successful exploitation of this vulnerability requires a user to take some action before the vulnerability can be exploited. For example, a successful exploit may only be possible during the installation of an application by a system administrator.",
                                        },
                                    }),
                                    (a2.UI = {
                                        name: "User Interaction",
                                        shortName: "UI",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric captures the requirement for a user, other than the attacker, to participate in the successful compromise of the vulnerable component.",
                                        values: [
                                            o2.UI_VALUES.X,
                                            o2.UI_VALUES.N,
                                            o2.UI_VALUES.R,
                                        ],
                                    }),
                                    (a2.S_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: false,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        U: {
                                            shortName: "U",
                                            value: false,
                                            name: "Unchanged",
                                            abbreviatedName: "Unchang.",
                                            jsonSchemaName: "UNCHANGED",
                                            description:
                                                "An exploited vulnerability can only affect resources managed by the same authority.",
                                        },
                                        C: {
                                            shortName: "C",
                                            value: true,
                                            name: "Changed",
                                            jsonSchemaName: "CHANGED",
                                            description:
                                                "An exploited vulnerability can affect resources beyond the authorization privileges intended by the vulnerable system's design.",
                                        },
                                    }),
                                    (a2.S = {
                                        name: "Scope",
                                        shortName: "S",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "Can an exploit of the vulnerability be accomplished remotely?",
                                        values: [
                                            o2.S_VALUES.X,
                                            o2.S_VALUES.U,
                                            o2.S_VALUES.C,
                                        ],
                                    }),
                                    (a2.C = {
                                        name: "Confidentiality Impact",
                                        shortName: "C",
                                        subCategory: "Impact Metrics",
                                        description:
                                            "This metric measures the impact to the confidentiality of the information resources managed by a software component due to a successfully exploited vulnerability.",
                                        values: o2.CONFIDENTIALITY_IMPACT,
                                    }),
                                    (a2.I = {
                                        name: "Integrity Impact",
                                        shortName: "I",
                                        subCategory: "Impact Metrics",
                                        description:
                                            "This metric measures the impact to integrity of a successfully exploited vulnerability.",
                                        values: o2.INTEGRITY_IMPACT,
                                    }),
                                    (a2.A = {
                                        name: "Availability Impact",
                                        shortName: "A",
                                        subCategory: "Impact Metrics",
                                        description:
                                            "This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability.",
                                        values: o2.AVAILABILITY_IMPACT,
                                    }),
                                    (a2.BASE_CATEGORY_VALUES = [
                                        o2.AV,
                                        o2.AC,
                                        o2.PR,
                                        o2.UI,
                                        o2.S,
                                        o2.C,
                                        o2.I,
                                        o2.A,
                                    ]),
                                    (a2.TEMPORAL_CATEGORY = {
                                        name: "temporal",
                                        description:
                                            "This metric reflects the current state of exploit techniques or code availability.",
                                    }),
                                    (a2.E_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        U: {
                                            shortName: "U",
                                            value: 0.91,
                                            name: "Unproven",
                                            abbreviatedName: "Unproven",
                                            description:
                                                "No exploit code is available, or an exploit is theoretical.",
                                        },
                                        P: {
                                            shortName: "P",
                                            value: 0.94,
                                            name: "Proof-of-Concept",
                                            abbreviatedName: "Proof-of-conc.",
                                            jsonSchemaName: "PROOF_OF_CONCEPT",
                                            description:
                                                "Proof-of-concept exploit code is available, or an attack demonstration is not practical for most systems. The code or technique is not functional in all situations and may require substantial modification by a skilled attacker.",
                                        },
                                        F: {
                                            shortName: "F",
                                            value: 0.97,
                                            name: "Functional",
                                            jsonSchemaName: "FUNCTIONAL",
                                            description:
                                                "Functional exploit code is available. The code works in most situations where the vulnerability exists.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 1,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "Functional exploit code is available. The code is widespread and automated and works in all situations where the vulnerability exists.",
                                        },
                                    }),
                                    (a2.E = {
                                        name: "Exploit Code Maturity",
                                        shortName: "E",
                                        description:
                                            "This metric measures the likelihood of the vulnerability being attacked, and is typically based on the current state of exploit techniques, exploit code availability, or active, successful exploitation of the vulnerability.",
                                        values: [
                                            o2.E_VALUES.X,
                                            o2.E_VALUES.U,
                                            o2.E_VALUES.P,
                                            o2.E_VALUES.F,
                                            o2.E_VALUES.H,
                                        ],
                                    }),
                                    (a2.RL_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        O: {
                                            shortName: "O",
                                            value: 0.95,
                                            name: "Official Fix",
                                            abbreviatedName: "Off. Fix",
                                            jsonSchemaName: "OFFICIAL_FIX",
                                            description:
                                                "A complete vendor solution is available. Either the vendor has issued an official patch, or an upgrade is available.",
                                        },
                                        T: {
                                            shortName: "T",
                                            value: 0.96,
                                            name: "Temporary Fix",
                                            abbreviatedName: "Temp. Fix",
                                            jsonSchemaName: "TEMPORARY_FIX",
                                            description:
                                                "There is an official but temporary fix available. This includes instances where the vendor issues a temporary hotfix, tool, or workaround.",
                                        },
                                        W: {
                                            shortName: "W",
                                            value: 0.97,
                                            name: "Workaround",
                                            jsonSchemaName: "WORKAROUND",
                                            description:
                                                "There is an unofficial, non-vendor solution available. In some cases, users of the affected technology will create a patch of their own or provide steps to work around or otherwise mitigate the vulnerability.",
                                        },
                                        U: {
                                            shortName: "U",
                                            value: 1,
                                            name: "Unavailable",
                                            jsonSchemaName: "UNAVAILABLE",
                                            description:
                                                "There is either no solution available or it is impossible to apply.",
                                        },
                                    }),
                                    (a2.RL = {
                                        name: "Remediation Level",
                                        shortName: "RL",
                                        description:
                                            "This metric describes the remediation level for a vulnerability in an affected resource.",
                                        values: [
                                            o2.RL_VALUES.X,
                                            o2.RL_VALUES.O,
                                            o2.RL_VALUES.T,
                                            o2.RL_VALUES.W,
                                            o2.RL_VALUES.U,
                                        ],
                                    }),
                                    (a2.RC_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        U: {
                                            shortName: "U",
                                            value: 0.92,
                                            name: "Unknown",
                                            description:
                                                "Report confidence is unknown.",
                                        },
                                        R: {
                                            shortName: "R",
                                            value: 0.96,
                                            name: "Reasonable",
                                            jsonSchemaName: "REASONABLE",
                                            description:
                                                "Reasonable confidence exists, or the reported vulnerability is in a component not typically used by a target or not having a large installed base.",
                                        },
                                        C: {
                                            shortName: "C",
                                            value: 1,
                                            name: "Confirmed",
                                            jsonSchemaName: "CONFIRMED",
                                            description:
                                                "Confirmed confidence exists, or the exploit is functional in the environment where the vulnerability exists.",
                                        },
                                    }),
                                    (a2.RC = {
                                        name: "Report Confidence",
                                        shortName: "RC",
                                        description:
                                            "This metric describes the level of confidence in the existence of the vulnerability and the credibility of the known technical details.",
                                        values: [
                                            o2.RC_VALUES.X,
                                            o2.RC_VALUES.U,
                                            o2.RC_VALUES.R,
                                            o2.RC_VALUES.C,
                                        ],
                                    }),
                                    (a2.TEMPORAL_CATEGORY_VALUES = [
                                        o2.E,
                                        o2.RL,
                                        o2.RC,
                                    ]),
                                    (a2.ENVIRONMENTAL_CATEGORY = {
                                        name: "environmental",
                                        description:
                                            "This metric reflects the characteristics of a vulnerability that are relevant and unique to a particular user's environment. This metric can greatly improve the accuracy of a score.",
                                    }),
                                    (a2.MAV_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0.85,
                                            name: "Network",
                                            abbreviatedName: "Netw.",
                                            jsonSchemaName: "NETWORK",
                                            description:
                                                "The vulnerable component is bound to the network stack and the set of possible attackers extends beyond the other options listed below, up to and including the entire Internet.",
                                        },
                                        A: {
                                            shortName: "A",
                                            value: 0.62,
                                            name: "Adjacent Network",
                                            abbreviatedName: "Adj. Network",
                                            jsonSchemaName: "ADJACENT_NETWORK",
                                            description:
                                                "The vulnerable component is bound to the network stack, but the attack is limited at the protocol level to a logically adjacent topology.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.55,
                                            name: "Local",
                                            jsonSchemaName: "LOCAL",
                                            description:
                                                "The vulnerable component is not bound to the network stack and the attacker's path is via read/write/execute capabilities.",
                                        },
                                        P: {
                                            shortName: "P",
                                            value: 0.2,
                                            name: "Physical",
                                            abbreviatedName: "Phys.",
                                            jsonSchemaName: "PHYSICAL",
                                            description:
                                                "The attack requires the attacker to physically touch or manipulate the vulnerable component.",
                                        },
                                    }),
                                    (a2.MAV = {
                                        name: "Modified Attack Vector",
                                        shortName: "MAV",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric reflects the context by which vulnerability exploitation is possible. The more remote an attacker can be to attack a host, the greater the vulnerability score.",
                                        baseMetricEquivalent: o2.AV,
                                        values: [
                                            o2.MAV_VALUES.X,
                                            o2.MAV_VALUES.N,
                                            o2.MAV_VALUES.A,
                                            o2.MAV_VALUES.L,
                                            o2.MAV_VALUES.P,
                                        ],
                                    }),
                                    (a2.MAC_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.77,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Specialized access conditions or extenuating circumstances do not exist. An attacker can expect repeatable success when attacking the vulnerable component.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 0.44,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "A successful attack depends on conditions beyond the attacker's control. That is, a successful attack cannot be accomplished at will, but requires the attacker to invest in some measurable amount of effort in preparation or execution against the vulnerable component before a successful attack can be expected.",
                                        },
                                    }),
                                    (a2.MAC = {
                                        name: "Modified Attack Complexity",
                                        shortName: "MAC",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric describes the conditions beyond the attacker's control that must exist in order to exploit the vulnerability.",
                                        baseMetricEquivalent: o2.AC,
                                        values: [
                                            o2.MAC_VALUES.X,
                                            o2.MAC_VALUES.L,
                                            o2.MAC_VALUES.H,
                                        ],
                                    }),
                                    (a2.MPR_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            changedValue: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0.85,
                                            changedValue: 0.85,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "The attacker is unauthorized prior to attack, and therefore does not require any access to settings or files of the vulnerable system to carry out an attack.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.62,
                                            changedValue: 0.68,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "The attacker requires privileges that provide basic user capabilities that could normally affect only settings and files owned by a user. Alternatively, an attacker with Low privileges has the ability to access only non-sensitive resources.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 0.27,
                                            changedValue: 0.5,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "The attacker requires privileges that provide significant (e.g., administrative) control over the vulnerable component allowing access to component-wide settings and files.",
                                        },
                                    }),
                                    (a2.MPR = {
                                        name: "Modified Privileges Required",
                                        shortName: "MPR",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability.",
                                        baseMetricEquivalent: o2.PR,
                                        values: [
                                            o2.MPR_VALUES.X,
                                            o2.MPR_VALUES.N,
                                            o2.MPR_VALUES.L,
                                            o2.MPR_VALUES.H,
                                        ],
                                    }),
                                    (a2.MUI_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0.85,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "The vulnerable system can be exploited without interaction from any user.",
                                        },
                                        R: {
                                            shortName: "R",
                                            value: 0.62,
                                            name: "Required",
                                            jsonSchemaName: "REQUIRED",
                                            description:
                                                "Successful exploitation of this vulnerability requires a user to take some action before the vulnerability can be exploited. For example, a successful exploit may only be possible during the installation of an application by a system administrator.",
                                        },
                                    }),
                                    (a2.MUI = {
                                        name: "Modified User Interaction",
                                        shortName: "MUI",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric captures the requirement for a user, other than the attacker, to participate in the successful compromise of the vulnerable component.",
                                        baseMetricEquivalent: o2.UI,
                                        values: [
                                            o2.MUI_VALUES.X,
                                            o2.MUI_VALUES.N,
                                            o2.MUI_VALUES.R,
                                        ],
                                    }),
                                    (a2.MS_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: false,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        U: {
                                            shortName: "U",
                                            value: false,
                                            name: "Unchanged",
                                            abbreviatedName: "Unchang.",
                                            jsonSchemaName: "UNCHANGED",
                                            description:
                                                "An exploited vulnerability can only affect resources managed by the same authority.",
                                        },
                                        C: {
                                            shortName: "C",
                                            value: true,
                                            name: "Changed",
                                            jsonSchemaName: "CHANGED",
                                            description:
                                                "An exploited vulnerability can affect resources beyond the authorization privileges intended by the vulnerable system's design.",
                                        },
                                    }),
                                    (a2.MS = {
                                        name: "Modified Scope",
                                        shortName: "MS",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "Can an exploit of the vulnerability be accomplished remotely?",
                                        baseMetricEquivalent: o2.S,
                                        values: [
                                            o2.MS_VALUES.X,
                                            o2.MS_VALUES.U,
                                            o2.MS_VALUES.C,
                                        ],
                                    }),
                                    (a2.MC = {
                                        name: "Confidentiality Impact",
                                        shortName: "MC",
                                        subCategory: "Modified Impact",
                                        description:
                                            "This metric measures the impact to the confidentiality of the information resources managed by a software component due to a successfully exploited vulnerability.",
                                        baseMetricEquivalent: o2.C,
                                        values: o2.CONFIDENTIALITY_IMPACT,
                                    }),
                                    (a2.MI = {
                                        name: "Integrity Impact",
                                        shortName: "MI",
                                        subCategory: "Modified Impact",
                                        description:
                                            "This metric measures the impact to integrity of a successfully exploited vulnerability.",
                                        baseMetricEquivalent: o2.I,
                                        values: o2.INTEGRITY_IMPACT,
                                    }),
                                    (a2.MA = {
                                        name: "Availability Impact",
                                        shortName: "MA",
                                        subCategory: "Modified Impact",
                                        description:
                                            "This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability.",
                                        baseMetricEquivalent: o2.A,
                                        values: o2.AVAILABILITY_IMPACT,
                                    }),
                                    (a2.CR = {
                                        name: "Confidentiality Requirement",
                                        shortName: "CR",
                                        subCategory:
                                            "Modified Requirement (Impact Subscore) Modifiers",
                                        description:
                                            "This metric describes the remediation level for a vulnerability in an affected resource.",
                                        values: o2.CONFIDENTIALITY_REQUIREMENT,
                                    }),
                                    (a2.IR = {
                                        name: "Integrity Requirement",
                                        shortName: "IR",
                                        subCategory:
                                            "Modified Requirement (Impact Subscore) Modifiers",
                                        description:
                                            "This metric describes the remediation level for a vulnerability in an affected resource.",
                                        values: o2.INTEGRITY_REQUIREMENT,
                                    }),
                                    (a2.AR = {
                                        name: "Availability Requirement",
                                        shortName: "AR",
                                        subCategory:
                                            "Modified Requirement (Impact Subscore) Modifiers",
                                        description:
                                            "This metric describes the remediation level for a vulnerability in an affected resource.",
                                        values: o2.AVAILABILITY_REQUIREMENT,
                                    }),
                                    (a2.ENVIRONMENTAL_CATEGORY_VALUES = [
                                        o2.CR,
                                        o2.IR,
                                        o2.AR,
                                        o2.MAV,
                                        o2.MAC,
                                        o2.MPR,
                                        o2.MUI,
                                        o2.MS,
                                        o2.MC,
                                        o2.MI,
                                        o2.MA,
                                    ]),
                                    (a2.REGISTERED_COMPONENTS =
                                        /* @__PURE__ */ new Map()),
                                    o2.REGISTERED_COMPONENTS.set(
                                        o2.BASE_CATEGORY,
                                        o2.BASE_CATEGORY_VALUES
                                    ),
                                    o2.REGISTERED_COMPONENTS.set(
                                        o2.TEMPORAL_CATEGORY,
                                        o2.TEMPORAL_CATEGORY_VALUES
                                    ),
                                    o2.REGISTERED_COMPONENTS.set(
                                        o2.ENVIRONMENTAL_CATEGORY,
                                        o2.ENVIRONMENTAL_CATEGORY_VALUES
                                    ),
                                    (a2.ATTRIBUTE_SEVERITY_ORDER = [
                                        [o2.S_VALUES.U, o2.MS_VALUES.U],
                                        [
                                            o2.CONFIDENTIALITY_IMPACT_VALUES.N,
                                            o2.INTEGRITY_IMPACT_VALUES.N,
                                            o2.AVAILABILITY_IMPACT_VALUES.N,
                                        ],
                                        [o2.AV_VALUES.P, o2.MAV_VALUES.P],
                                        [
                                            o2.CONFIDENTIALITY_IMPACT_VALUES.L,
                                            o2.INTEGRITY_IMPACT_VALUES.L,
                                            o2.AVAILABILITY_IMPACT_VALUES.L,
                                        ],
                                        [o2.PR_VALUES.H, o2.MPR_VALUES.H],
                                        [o2.AC_VALUES.H, o2.MAC_VALUES.H],
                                        [
                                            o2
                                                .CONFIDENTIALITY_REQUIREMENT_VALUES
                                                .L,
                                            o2.INTEGRITY_REQUIREMENT_VALUES.L,
                                            o2.AVAILABILITY_REQUIREMENT_VALUES
                                                .L,
                                        ],
                                        [o2.AV_VALUES.L, o2.MAV_VALUES.L],
                                        [
                                            o2.CONFIDENTIALITY_IMPACT_VALUES.H,
                                            o2.INTEGRITY_IMPACT_VALUES.H,
                                            o2.AVAILABILITY_IMPACT_VALUES.H,
                                        ],
                                        [o2.AV_VALUES.A, o2.MAV_VALUES.A],
                                        [o2.UI_VALUES.R, o2.MUI_VALUES.R],
                                        [o2.PR_VALUES.L, o2.MPR_VALUES.L],
                                        [o2.AC_VALUES.L, o2.MAC_VALUES.L],
                                        [o2.AV_VALUES.N, o2.MAV_VALUES.N],
                                        [o2.PR_VALUES.N, o2.MPR_VALUES.N],
                                        [o2.UI_VALUES.N, o2.MUI_VALUES.N],
                                        [o2.E_VALUES.U],
                                        [o2.E_VALUES.P],
                                        [o2.E_VALUES.F],
                                        [o2.E_VALUES.H],
                                        [o2.E_VALUES.X],
                                        [o2.RC_VALUES.U],
                                        [o2.RL_VALUES.O],
                                        [o2.RL_VALUES.T],
                                        [o2.RC_VALUES.R],
                                        [o2.RL_VALUES.W],
                                        [o2.AV_VALUES.X, o2.MAV_VALUES.X],
                                        [o2.AC_VALUES.X, o2.MAC_VALUES.X],
                                        [o2.PR_VALUES.X, o2.MPR_VALUES.X],
                                        [o2.UI_VALUES.X, o2.MUI_VALUES.X],
                                        [o2.S_VALUES.C, o2.MS_VALUES.C],
                                        [o2.S_VALUES.X, o2.MS_VALUES.X],
                                        [o2.CONFIDENTIALITY_IMPACT_VALUES.X],
                                        [o2.INTEGRITY_IMPACT_VALUES.X],
                                        [o2.AVAILABILITY_IMPACT_VALUES.X],
                                        [o2.RL_VALUES.U],
                                        [o2.RL_VALUES.X],
                                        [o2.RC_VALUES.C],
                                        [o2.RC_VALUES.X],
                                        [
                                            o2
                                                .CONFIDENTIALITY_REQUIREMENT_VALUES
                                                .M,
                                            o2.INTEGRITY_REQUIREMENT_VALUES.M,
                                            o2.AVAILABILITY_REQUIREMENT_VALUES
                                                .M,
                                        ],
                                        [
                                            o2
                                                .CONFIDENTIALITY_REQUIREMENT_VALUES
                                                .X,
                                            o2.INTEGRITY_REQUIREMENT_VALUES.X,
                                            o2.AVAILABILITY_REQUIREMENT_VALUES
                                                .X,
                                        ],
                                        [
                                            o2
                                                .CONFIDENTIALITY_REQUIREMENT_VALUES
                                                .H,
                                            o2.INTEGRITY_REQUIREMENT_VALUES.H,
                                            o2.AVAILABILITY_REQUIREMENT_VALUES
                                                .H,
                                        ],
                                    ]));
                            },
                            371: (e4, t3, o2) => {
                                (Object.defineProperty(t3, "__esModule", {
                                    value: true,
                                }),
                                    (t3.Cvss3P1 = void 0));
                                const a2 = o2(154),
                                    i2 = o2(951);
                                class s2 extends a2.CvssVector {
                                    constructor(e5) {
                                        super(e5);
                                    }
                                    getRegisteredComponents() {
                                        return i2.Cvss3P1Components
                                            .REGISTERED_COMPONENTS;
                                    }
                                    getVectorPrefix() {
                                        return "CVSS:3.1/";
                                    }
                                    getVectorName() {
                                        return "CVSS:3.1";
                                    }
                                    fillAverageVector() {
                                        this.applyVector(
                                            "AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:L"
                                        );
                                    }
                                    fillRandomBaseVector() {
                                        this.fillRandomComponentsForCategory(
                                            i2.Cvss3P1Components.BASE_CATEGORY
                                        );
                                    }
                                    fillRandomTemporalVector() {
                                        this.fillRandomComponentsForCategory(
                                            i2.Cvss3P1Components
                                                .TEMPORAL_CATEGORY
                                        );
                                    }
                                    fillRandomEnvironmentalVector() {
                                        this.fillRandomComponentsForCategory(
                                            i2.Cvss3P1Components
                                                .ENVIRONMENTAL_CATEGORY
                                        );
                                    }
                                    fillRandomComponentsForCategory(e5) {
                                        const t4 =
                                            i2.Cvss3P1Components.REGISTERED_COMPONENTS.get(
                                                e5
                                            );
                                        if (t4)
                                            for (
                                                let e6 = 0;
                                                e6 < t4.length;
                                                e6++
                                            ) {
                                                const o3 = t4[e6],
                                                    a3 =
                                                        super.pickRandomDefinedComponentValue(
                                                            o3
                                                        );
                                                if (!a3)
                                                    return (
                                                        console.warn(
                                                            "Failed to pick random vector component for",
                                                            o3
                                                        ),
                                                        void this.fillAverageVector()
                                                    );
                                                this.applyComponent(o3, a3);
                                            }
                                        else
                                            console.warn(
                                                "Failed to pick random vector components for",
                                                e5
                                            );
                                    }
                                    calculateScoresInternal(e5 = false) {
                                        const t4 = this.isBaseFullyDefined(),
                                            o3 = this.isAnyTemporalDefined(),
                                            a3 =
                                                this.isAnyEnvironmentalDefined();
                                        return {
                                            normalized: e5,
                                            base: t4
                                                ? super.round(
                                                      this.calculateExactBaseScore(),
                                                      1
                                                  )
                                                : void 0,
                                            impact: t4
                                                ? super.normalizeScore(
                                                      super.round(
                                                          this.calculateImpactScore(),
                                                          1
                                                      ),
                                                      e5 ? 6 : 10
                                                  )
                                                : void 0,
                                            exploitability: t4
                                                ? super.normalizeScore(
                                                      super.round(
                                                          this.calculateExactExploitabilityScore(),
                                                          1
                                                      ),
                                                      e5 ? 3.9 : 10
                                                  )
                                                : void 0,
                                            temporal:
                                                t4 && o3
                                                    ? super.round(
                                                          this.calculateExactTemporalScore(),
                                                          1
                                                      )
                                                    : void 0,
                                            environmental:
                                                t4 && a3
                                                    ? super.round(
                                                          this.calculateExactEnvironmentalScore(),
                                                          1
                                                      )
                                                    : void 0,
                                            modifiedImpact:
                                                t4 && a3
                                                    ? super.normalizeScore(
                                                          super.round(
                                                              Math.max(
                                                                  0,
                                                                  this.calculateExactAdjustedImpactScore()
                                                              ),
                                                              1
                                                          ),
                                                          e5 ? 6.1 : 10
                                                      )
                                                    : void 0,
                                            overall: super.round(
                                                this.calculateExactOverallScore(),
                                                1
                                            ),
                                            vector: this.toString(),
                                        };
                                    }
                                    calculateExactBaseScore() {
                                        if (!this.isBaseFullyDefined())
                                            return 0;
                                        let e5 =
                                            this.calculateExactImpactScore();
                                        if (e5 <= 0) return 0;
                                        let t4 =
                                            this.calculateExactExploitabilityScore();
                                        return this.getComponent(
                                            i2.Cvss3P1Components.S
                                        ).value
                                            ? super.roundUp(
                                                  Math.min(
                                                      s2.SCOPE_COEFFICIENT *
                                                          (e5 + t4),
                                                      10
                                                  )
                                              )
                                            : super.roundUp(
                                                  Math.min(e5 + t4, 10)
                                              );
                                    }
                                    calculateImpactScore() {
                                        const e5 =
                                            this.calculateExactImpactScore();
                                        return e5 <= 0 ? 0 : e5;
                                    }
                                    calculateExactImpactScore() {
                                        let e5 = this.calculateExactISSScore();
                                        return this.getComponent(
                                            i2.Cvss3P1Components.S
                                        ).value
                                            ? s2.SCOPE_CHANGED_FACTOR *
                                                  (e5 - 0.029) -
                                                  3.25 * Math.pow(e5 - 0.02, 15)
                                            : s2.SCOPE_UNCHANGED_FACTOR * e5;
                                    }
                                    calculateExactISSScore() {
                                        return (
                                            1 -
                                            (1 -
                                                this.getComponent(
                                                    i2.Cvss3P1Components.C
                                                ).value) *
                                                (1 -
                                                    this.getComponent(
                                                        i2.Cvss3P1Components.I
                                                    ).value) *
                                                (1 -
                                                    this.getComponent(
                                                        i2.Cvss3P1Components.A
                                                    ).value)
                                        );
                                    }
                                    calculateExactMISSScore() {
                                        let e5,
                                            t4,
                                            o3,
                                            a3,
                                            s3,
                                            n2,
                                            r2 = this.getComponent(
                                                i2.Cvss3P1Components.MC
                                            ),
                                            c2 = this.getComponent(
                                                i2.Cvss3P1Components.MI
                                            ),
                                            l2 = this.getComponent(
                                                i2.Cvss3P1Components.MA
                                            ),
                                            m = this.getComponent(
                                                i2.Cvss3P1Components.C
                                            ),
                                            E2 = this.getComponent(
                                                i2.Cvss3P1Components.I
                                            ),
                                            h2 = this.getComponent(
                                                i2.Cvss3P1Components.A
                                            ),
                                            u2 = this.getComponent(
                                                i2.Cvss3P1Components.CR
                                            ),
                                            d2 = this.getComponent(
                                                i2.Cvss3P1Components.IR
                                            ),
                                            p2 = this.getComponent(
                                                i2.Cvss3P1Components.AR
                                            );
                                        return (
                                            (e5 =
                                                r2 ===
                                                i2.Cvss3P1Components.MC
                                                    .values[0]
                                                    ? m.value
                                                    : r2.value),
                                            (t4 =
                                                c2 ===
                                                i2.Cvss3P1Components.MI
                                                    .values[0]
                                                    ? E2.value
                                                    : c2.value),
                                            (o3 =
                                                l2 ===
                                                i2.Cvss3P1Components.MA
                                                    .values[0]
                                                    ? h2.value
                                                    : l2.value),
                                            i2.Cvss3P1Components.CR.values[0],
                                            (a3 = u2.value),
                                            i2.Cvss3P1Components.IR.values[0],
                                            (s3 = d2.value),
                                            i2.Cvss3P1Components.AR.values[0],
                                            (n2 = p2.value),
                                            Math.min(
                                                1 -
                                                    (1 - a3 * e5) *
                                                        (1 - s3 * t4) *
                                                        (1 - n2 * o3),
                                                0.915
                                            )
                                        );
                                    }
                                    calculateExactExploitabilityScore() {
                                        const e5 = this.getComponent(
                                                i2.Cvss3P1Components.AV
                                            ).value,
                                            t4 = this.getComponent(
                                                i2.Cvss3P1Components.AC
                                            ).value,
                                            o3 = this.getComponent(
                                                i2.Cvss3P1Components.UI
                                            ).value;
                                        let a3;
                                        return (
                                            (a3 = this.getComponent(
                                                i2.Cvss3P1Components.S
                                            ).value
                                                ? this.getComponent(
                                                      i2.Cvss3P1Components.PR
                                                  ).changedValue
                                                : this.getComponent(
                                                      i2.Cvss3P1Components.PR
                                                  ).value),
                                            s2.EXPLOITABILITY_COEFFICIENT *
                                                e5 *
                                                t4 *
                                                a3 *
                                                o3
                                        );
                                    }
                                    calculateExactTemporalScore() {
                                        if (!this.isBaseFullyDefined())
                                            return 0;
                                        if (!this.isAnyTemporalDefined())
                                            return 0;
                                        let e5 = this.getComponent(
                                                i2.Cvss3P1Components.E
                                            ).value,
                                            t4 = this.getComponent(
                                                i2.Cvss3P1Components.RL
                                            ).value,
                                            o3 = this.getComponent(
                                                i2.Cvss3P1Components.RC
                                            ).value,
                                            a3 = this.calculateExactBaseScore();
                                        return super.roundUp(a3 * e5 * t4 * o3);
                                    }
                                    calculateExactEnvironmentalScore() {
                                        if (!this.isBaseFullyDefined())
                                            return 0;
                                        if (!this.isAnyEnvironmentalDefined())
                                            return 0;
                                        let e5 =
                                            this.calculateExactAdjustedImpactScore();
                                        if (e5 <= 0) return 0;
                                        let t4 =
                                                this.calculateAdjustedExploitability(),
                                            o3 = this.getComponent(
                                                i2.Cvss3P1Components.E
                                            ).value,
                                            a3 = this.getComponent(
                                                i2.Cvss3P1Components.RL
                                            ).value,
                                            n2 = this.getComponent(
                                                i2.Cvss3P1Components.RC
                                            ).value;
                                        if (this.isModifiedScope()) {
                                            let i3 = super.roundUp(
                                                Math.min(e5 + t4, 10)
                                            );
                                            return super.roundUp(
                                                i3 * o3 * a3 * n2
                                            );
                                        }
                                        {
                                            let i3 = super.roundUp(
                                                Math.min(
                                                    s2.SCOPE_COEFFICIENT *
                                                        (e5 + t4),
                                                    10
                                                )
                                            );
                                            return super.roundUp(
                                                i3 * o3 * a3 * n2
                                            );
                                        }
                                    }
                                    calculateExactAdjustedImpactScore() {
                                        if (!this.isBaseFullyDefined())
                                            return 0;
                                        if (!this.isAnyEnvironmentalDefined())
                                            return 0;
                                        let e5 = this.calculateExactMISSScore();
                                        return this.isModifiedScope()
                                            ? s2.SCOPE_UNCHANGED_FACTOR * e5
                                            : s2.SCOPE_CHANGED_FACTOR *
                                                  (e5 - 0.029) -
                                                  3.25 *
                                                      Math.pow(
                                                          0.9731 * e5 - 0.02,
                                                          13
                                                      );
                                    }
                                    calculateAdjustedExploitability() {
                                        let e5,
                                            t4 = this.getFirstDefinedComponent([
                                                i2.Cvss3P1Components.MAV,
                                                i2.Cvss3P1Components.AV,
                                            ]).value,
                                            o3 = this.getFirstDefinedComponent([
                                                i2.Cvss3P1Components.MAC,
                                                i2.Cvss3P1Components.AC,
                                            ]).value,
                                            a3 = this.getFirstDefinedComponent([
                                                i2.Cvss3P1Components.MUI,
                                                i2.Cvss3P1Components.UI,
                                            ]).value,
                                            n2 = this.getFirstDefinedComponent([
                                                i2.Cvss3P1Components.MPR,
                                                i2.Cvss3P1Components.PR,
                                            ]);
                                        return (
                                            (e5 = this.isModifiedScope()
                                                ? n2.value
                                                : n2.changedValue),
                                            s2.EXPLOITABILITY_COEFFICIENT *
                                                t4 *
                                                o3 *
                                                e5 *
                                                a3
                                        );
                                    }
                                    isModifiedScope() {
                                        let e5 = this.getComponent(
                                                i2.Cvss3P1Components.S
                                            ),
                                            t4 = this.getComponent(
                                                i2.Cvss3P1Components.MS
                                            );
                                        return t4 ===
                                            i2.Cvss3P1Components.MS.values[0]
                                            ? !e5.value
                                            : !t4.value;
                                    }
                                    calculateExactOverallScore() {
                                        return this.isAnyEnvironmentalDefined()
                                            ? this.calculateExactEnvironmentalScore()
                                            : this.isAnyTemporalDefined()
                                              ? this.calculateExactTemporalScore()
                                              : this.calculateExactBaseScore();
                                    }
                                    isBaseFullyDefined() {
                                        return super.isCategoryFullyDefined(
                                            i2.Cvss3P1Components.BASE_CATEGORY
                                        );
                                    }
                                    isTemporalFullyDefined() {
                                        return super.isCategoryFullyDefined(
                                            i2.Cvss3P1Components
                                                .TEMPORAL_CATEGORY
                                        );
                                    }
                                    isEnvironmentalFullyDefined() {
                                        return super.isCategoryFullyDefined(
                                            i2.Cvss3P1Components
                                                .ENVIRONMENTAL_CATEGORY
                                        );
                                    }
                                    isAnyBaseDefined() {
                                        return super.isCategoryPartiallyDefined(
                                            i2.Cvss3P1Components.BASE_CATEGORY
                                        );
                                    }
                                    isAnyTemporalDefined() {
                                        return super.isCategoryPartiallyDefined(
                                            i2.Cvss3P1Components
                                                .TEMPORAL_CATEGORY
                                        );
                                    }
                                    isAnyEnvironmentalDefined() {
                                        return super.isCategoryPartiallyDefined(
                                            i2.Cvss3P1Components
                                                .ENVIRONMENTAL_CATEGORY
                                        );
                                    }
                                    getJsonSchemaSeverity(e5) {
                                        return 0 === e5 || isNaN(e5)
                                            ? "NONE"
                                            : e5 <= 3.9
                                              ? "LOW"
                                              : e5 <= 6.9
                                                ? "MEDIUM"
                                                : e5 <= 8.9
                                                  ? "HIGH"
                                                  : "CRITICAL";
                                    }
                                    createJsonSchema() {
                                        const e5 = this.calculateScores();
                                        return {
                                            version: "3.1",
                                            vectorString: this.toString(),
                                            baseScore: e5.base,
                                            temporalScore: e5.temporal,
                                            environmentalScore:
                                                e5.environmental,
                                            baseSeverity:
                                                this.getJsonSchemaSeverity(
                                                    e5.base
                                                ),
                                            temporalSeverity: e5.temporal
                                                ? this.getJsonSchemaSeverity(
                                                      e5.temporal
                                                  )
                                                : void 0,
                                            environmentalSeverity:
                                                e5.environmental
                                                    ? this.getJsonSchemaSeverity(
                                                          e5.environmental
                                                      )
                                                    : void 0,
                                            attackVector: this.getComponent(
                                                i2.Cvss3P1Components.AV
                                            ).jsonSchemaName,
                                            attackComplexity: this.getComponent(
                                                i2.Cvss3P1Components.AC
                                            ).jsonSchemaName,
                                            privilegesRequired:
                                                this.getComponent(
                                                    i2.Cvss3P1Components.PR
                                                ).jsonSchemaName,
                                            userInteraction: this.getComponent(
                                                i2.Cvss3P1Components.UI
                                            ).jsonSchemaName,
                                            scope: this.getComponent(
                                                i2.Cvss3P1Components.S
                                            ).jsonSchemaName,
                                            confidentialityImpact:
                                                this.getComponent(
                                                    i2.Cvss3P1Components.C
                                                ).jsonSchemaName,
                                            integrityImpact: this.getComponent(
                                                i2.Cvss3P1Components.I
                                            ).jsonSchemaName,
                                            availabilityImpact:
                                                this.getComponent(
                                                    i2.Cvss3P1Components.A
                                                ).jsonSchemaName,
                                            exploitCodeMaturity:
                                                this.getComponent(
                                                    i2.Cvss3P1Components.E
                                                ).jsonSchemaName,
                                            remediationLevel: this.getComponent(
                                                i2.Cvss3P1Components.RL
                                            ).jsonSchemaName,
                                            reportConfidence: this.getComponent(
                                                i2.Cvss3P1Components.RC
                                            ).jsonSchemaName,
                                            confidentialityRequirement:
                                                this.getComponent(
                                                    i2.Cvss3P1Components.CR
                                                ).jsonSchemaName,
                                            integrityRequirement:
                                                this.getComponent(
                                                    i2.Cvss3P1Components.IR
                                                ).jsonSchemaName,
                                            availabilityRequirement:
                                                this.getComponent(
                                                    i2.Cvss3P1Components.AR
                                                ).jsonSchemaName,
                                            modifiedAttackVector:
                                                this.getComponent(
                                                    i2.Cvss3P1Components.MAV
                                                ).jsonSchemaName,
                                            modifiedAttackComplexity:
                                                this.getComponent(
                                                    i2.Cvss3P1Components.MAC
                                                ).jsonSchemaName,
                                            modifiedPrivilegesRequired:
                                                this.getComponent(
                                                    i2.Cvss3P1Components.MPR
                                                ).jsonSchemaName,
                                            modifiedUserInteraction:
                                                this.getComponent(
                                                    i2.Cvss3P1Components.MUI
                                                ).jsonSchemaName,
                                            modifiedScope: this.getComponent(
                                                i2.Cvss3P1Components.MS
                                            ).jsonSchemaName,
                                            modifiedConfidentialityImpact:
                                                this.getComponent(
                                                    i2.Cvss3P1Components.MC
                                                ).jsonSchemaName,
                                            modifiedIntegrityImpact:
                                                this.getComponent(
                                                    i2.Cvss3P1Components.MI
                                                ).jsonSchemaName,
                                            modifiedAvailabilityImpact:
                                                this.getComponent(
                                                    i2.Cvss3P1Components.MA
                                                ).jsonSchemaName,
                                        };
                                    }
                                }
                                ((t3.Cvss3P1 = s2),
                                    (s2.SCOPE_CHANGED_FACTOR = 7.52),
                                    (s2.SCOPE_UNCHANGED_FACTOR = 6.42),
                                    (s2.EXPLOITABILITY_COEFFICIENT = 8.22),
                                    (s2.SCOPE_COEFFICIENT = 1.08));
                            },
                            475: (e4, t3, o2) => {
                                (Object.defineProperty(t3, "__esModule", {
                                    value: true,
                                }),
                                    (t3.Cvss2 = void 0));
                                const a2 = o2(154),
                                    i2 = o2(479);
                                class s2 extends a2.CvssVector {
                                    constructor(e5) {
                                        super(e5);
                                    }
                                    getRegisteredComponents() {
                                        return i2.Cvss2Components
                                            .REGISTERED_COMPONENTS;
                                    }
                                    getVectorPrefix() {
                                        return "";
                                    }
                                    getVectorName() {
                                        return "CVSS:2.0";
                                    }
                                    fillAverageVector() {
                                        this.applyVector(
                                            "AV:A/AC:M/Au:N/C:P/I:P/A:P"
                                        );
                                    }
                                    fillRandomBaseVector() {
                                        const e5 =
                                            i2.Cvss2Components
                                                .BASE_CATEGORY_VALUES;
                                        for (let t4 = 0; t4 < e5.length; t4++) {
                                            const o3 = e5[t4],
                                                a3 =
                                                    super.pickRandomDefinedComponentValue(
                                                        o3
                                                    );
                                            if (!a3)
                                                return (
                                                    console.warn(
                                                        "Failed to pick random vector component for",
                                                        o3
                                                    ),
                                                    void this.fillAverageVector()
                                                );
                                            this.applyComponent(o3, a3);
                                        }
                                    }
                                    calculateScoresInternal(e5 = false) {
                                        const t4 = this.isBaseFullyDefined(),
                                            o3 = this.isAnyTemporalDefined(),
                                            a3 =
                                                this.isAnyEnvironmentalDefined();
                                        return {
                                            normalized: e5,
                                            base: t4
                                                ? super.round(
                                                      this.calculateExactBaseScore(),
                                                      1
                                                  )
                                                : void 0,
                                            impact: t4
                                                ? super.round(
                                                      this.calculateExactImpactScore(),
                                                      1
                                                  )
                                                : void 0,
                                            exploitability: t4
                                                ? super.round(
                                                      this.calculateExactExploitabilityScore(),
                                                      1
                                                  )
                                                : void 0,
                                            temporal:
                                                t4 && o3
                                                    ? super.round(
                                                          this.calculateExactTemporalScore(),
                                                          1
                                                      )
                                                    : void 0,
                                            environmental:
                                                t4 && a3
                                                    ? super.round(
                                                          this.calculateExactEnvironmentalScore(),
                                                          1
                                                      )
                                                    : void 0,
                                            modifiedImpact:
                                                t4 && a3
                                                    ? super.round(
                                                          this.calculateExactAdjustedImpactScore(),
                                                          1
                                                      )
                                                    : void 0,
                                            overall: super.round(
                                                this.calculateExactOverallScore(),
                                                1
                                            ),
                                            vector: this.toString(),
                                        };
                                    }
                                    calculateExactBaseScore() {
                                        if (!this.isBaseFullyDefined())
                                            return 0;
                                        let e5 =
                                            this.calculateExactImpactScore();
                                        return (
                                            (0.6 * e5 +
                                                0.4 *
                                                    this.calculateExactExploitabilityScore() -
                                                1.5) *
                                            this.f(e5)
                                        );
                                    }
                                    calculateExactImpactScore() {
                                        return this.isBaseFullyDefined()
                                            ? 10.41 *
                                                  (1 -
                                                      (1 -
                                                          this.getComponent(
                                                              i2.Cvss2Components
                                                                  .C
                                                          ).value) *
                                                          (1 -
                                                              this.getComponent(
                                                                  i2
                                                                      .Cvss2Components
                                                                      .I
                                                              ).value) *
                                                          (1 -
                                                              this.getComponent(
                                                                  i2
                                                                      .Cvss2Components
                                                                      .A
                                                              ).value))
                                            : 0;
                                    }
                                    calculateExactExploitabilityScore() {
                                        return this.isBaseFullyDefined()
                                            ? 20 *
                                                  this.getComponent(
                                                      i2.Cvss2Components.AC
                                                  ).value *
                                                  this.getComponent(
                                                      i2.Cvss2Components.Au
                                                  ).value *
                                                  this.getComponent(
                                                      i2.Cvss2Components.AV
                                                  ).value
                                            : 0;
                                    }
                                    calculateExactTemporalScore() {
                                        return this.isAnyTemporalDefined()
                                            ? super.round(
                                                  this.calculateExactBaseScore(),
                                                  1
                                              ) *
                                                  this.getComponent(
                                                      i2.Cvss2Components.E
                                                  ).value *
                                                  this.getComponent(
                                                      i2.Cvss2Components.RL
                                                  ).value *
                                                  this.getComponent(
                                                      i2.Cvss2Components.RC
                                                  ).value
                                            : 0;
                                    }
                                    calculateExactAdjustedBaseScore() {
                                        let e5 =
                                                this.calculateExactAdjustedImpactScore(),
                                            t4 =
                                                this.calculateExactExploitabilityScore();
                                        return (
                                            (t4 = this.round(t4, 1)),
                                            (0.6 * e5 + 0.4 * t4 - 1.5) *
                                                this.f(e5)
                                        );
                                    }
                                    calculateExactAdjustedTemporalScore() {
                                        return (
                                            this.calculateExactAdjustedBaseScore() *
                                            this.getComponent(
                                                i2.Cvss2Components.E
                                            ).value *
                                            this.getComponent(
                                                i2.Cvss2Components.RL
                                            ).value *
                                            this.getComponent(
                                                i2.Cvss2Components.RC
                                            ).value
                                        );
                                    }
                                    calculateExactEnvironmentalScore() {
                                        if (!this.isAnyEnvironmentalDefined())
                                            return 0;
                                        let e5 =
                                            this.calculateExactAdjustedTemporalScore();
                                        return (
                                            (e5 +
                                                (10 - e5) *
                                                    this.getComponent(
                                                        i2.Cvss2Components.CDP
                                                    ).value) *
                                            this.getComponent(
                                                i2.Cvss2Components.TD
                                            ).value
                                        );
                                    }
                                    calculateExactAdjustedImpactScore() {
                                        if (!this.isAnyEnvironmentalDefined())
                                            return 0;
                                        let e5 = this.getComponent(
                                                i2.Cvss2Components.C
                                            ).value,
                                            t4 = this.getComponent(
                                                i2.Cvss2Components.I
                                            ).value,
                                            o3 = this.getComponent(
                                                i2.Cvss2Components.A
                                            ).value,
                                            a3 = this.getComponent(
                                                i2.Cvss2Components.CR
                                            ).value,
                                            s3 = this.getComponent(
                                                i2.Cvss2Components.IR
                                            ).value,
                                            n2 = this.getComponent(
                                                i2.Cvss2Components.AR
                                            ).value;
                                        return Math.min(
                                            10,
                                            10.41 *
                                                (1 -
                                                    (1 - e5 * a3) *
                                                        (1 - t4 * s3) *
                                                        (1 - o3 * n2))
                                        );
                                    }
                                    calculateExactOverallScore() {
                                        return this.isAnyEnvironmentalDefined()
                                            ? this.calculateExactEnvironmentalScore()
                                            : this.isAnyTemporalDefined()
                                              ? this.calculateExactTemporalScore()
                                              : this.calculateExactBaseScore();
                                    }
                                    isBaseFullyDefined() {
                                        return super.isCategoryFullyDefined(
                                            i2.Cvss2Components.BASE_CATEGORY
                                        );
                                    }
                                    isTemporalFullyDefined() {
                                        return super.isCategoryFullyDefined(
                                            i2.Cvss2Components.TEMPORAL_CATEGORY
                                        );
                                    }
                                    isEnvironmentalFullyDefined() {
                                        return super.isCategoryFullyDefined(
                                            i2.Cvss2Components
                                                .ENVIRONMENTAL_CATEGORY
                                        );
                                    }
                                    isAnyBaseDefined() {
                                        return super.isCategoryPartiallyDefined(
                                            i2.Cvss2Components.BASE_CATEGORY
                                        );
                                    }
                                    isAnyTemporalDefined() {
                                        return super.isCategoryPartiallyDefined(
                                            i2.Cvss2Components.TEMPORAL_CATEGORY
                                        );
                                    }
                                    isAnyEnvironmentalDefined() {
                                        return super.isCategoryPartiallyDefined(
                                            i2.Cvss2Components
                                                .ENVIRONMENTAL_CATEGORY
                                        );
                                    }
                                    f(e5) {
                                        return 0 === e5 ? 0 : 1.176;
                                    }
                                    createJsonSchema() {
                                        const e5 = this.calculateScores();
                                        return {
                                            version: "2.0",
                                            vectorString: this.toString(),
                                            baseScore: e5.base,
                                            temporalScore: e5.temporal,
                                            environmentalScore:
                                                e5.environmental,
                                            accessVector: this.getComponent(
                                                i2.Cvss2Components.AV
                                            ).jsonSchemaName,
                                            accessComplexity: this.getComponent(
                                                i2.Cvss2Components.AC
                                            ).jsonSchemaName,
                                            authentication: this.getComponent(
                                                i2.Cvss2Components.Au
                                            ).jsonSchemaName,
                                            confidentialityImpact:
                                                this.getComponent(
                                                    i2.Cvss2Components.C
                                                ).jsonSchemaName,
                                            integrityImpact: this.getComponent(
                                                i2.Cvss2Components.I
                                            ).jsonSchemaName,
                                            availabilityImpact:
                                                this.getComponent(
                                                    i2.Cvss2Components.A
                                                ).jsonSchemaName,
                                            exploitability: this.getComponent(
                                                i2.Cvss2Components.E
                                            ).jsonSchemaName,
                                            remediationLevel: this.getComponent(
                                                i2.Cvss2Components.RL
                                            ).jsonSchemaName,
                                            reportConfidence: this.getComponent(
                                                i2.Cvss2Components.RC
                                            ).jsonSchemaName,
                                            collateralDamagePotential:
                                                this.getComponent(
                                                    i2.Cvss2Components.CDP
                                                ).jsonSchemaName,
                                            targetDistribution:
                                                this.getComponent(
                                                    i2.Cvss2Components.TD
                                                ).jsonSchemaName,
                                            confidentialityRequirement:
                                                this.getComponent(
                                                    i2.Cvss2Components.CR
                                                ).jsonSchemaName,
                                            integrityRequirement:
                                                this.getComponent(
                                                    i2.Cvss2Components.IR
                                                ).jsonSchemaName,
                                            availabilityRequirement:
                                                this.getComponent(
                                                    i2.Cvss2Components.AR
                                                ).jsonSchemaName,
                                        };
                                    }
                                }
                                t3.Cvss2 = s2;
                            },
                            479: (e4, t3, o2) => {
                                var a2;
                                (Object.defineProperty(t3, "__esModule", {
                                    value: true,
                                }),
                                    (t3.Cvss2Components = void 0));
                                const i2 = o2(154);
                                class s2 {}
                                ((t3.Cvss2Components = s2),
                                    (a2 = s2),
                                    (s2.BASE_CATEGORY = {
                                        name: "base",
                                        description:
                                            "Represents the intrinsic and fundamental characteristics of a vulnerability that are constant over time and user environments.",
                                    }),
                                    (s2.AV_VALUES = {
                                        ND: {
                                            shortName: "ND",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value to the metric will result in no score being calculated.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.395,
                                            name: "Local",
                                            jsonSchemaName: "LOCAL",
                                            description:
                                                "A vulnerability exploitable with only local access requires the attacker to have either physical access to the vulnerable system or a local (shell) account. Examples of locally exploitable vulnerabilities are peripheral attacks such as Firewire/USB DMA attacks, and local privilege escalations (e.g., sudo).",
                                        },
                                        A: {
                                            shortName: "A",
                                            value: 0.646,
                                            name: "Adjacent Network",
                                            abbreviatedName: "Adj. Network",
                                            jsonSchemaName: "ADJACENT_NETWORK",
                                            description:
                                                "A vulnerability exploitable with adjacent network access requires the attacker to have access to either the broadcast or collision domain of the vulnerable software.  Examples of local networks include local IP subnet, Bluetooth, IEEE 802.11, and local Ethernet segment.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 1,
                                            name: "Network",
                                            jsonSchemaName: "NETWORK",
                                            description:
                                                'A vulnerability exploitable with network access means the vulnerable software is bound to the network stack and the attacker does not require local network access or local access. Such a vulnerability is often termed "remotely exploitable". An example of a network attack is an RPC buffer overflow.',
                                        },
                                    }),
                                    (s2.AV = {
                                        name: "Access Vector",
                                        shortName: "AV",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric reflects how the vulnerability is exploited. The more remote an attacker can be to attack a host, the greater the vulnerability score.",
                                        values: [
                                            a2.AV_VALUES.ND,
                                            a2.AV_VALUES.L,
                                            a2.AV_VALUES.A,
                                            a2.AV_VALUES.N,
                                        ],
                                    }),
                                    (s2.AC_VALUES = {
                                        ND: {
                                            shortName: "ND",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value to the metric will result in no score being calculated.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 0.35,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "Specialized access conditions exist. For example, an attacker can only exploit the vulnerability under very specialized conditions.",
                                        },
                                        M: {
                                            shortName: "M",
                                            value: 0.61,
                                            name: "Medium",
                                            jsonSchemaName: "MEDIUM",
                                            description:
                                                "The access conditions are somewhat specialized. For example, the attacker can only exploit the vulnerability under certain conditions.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.71,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Specialized access conditions or extenuating circumstances do not exist. For example, an attacker can exploit the vulnerability under most conditions.",
                                        },
                                    }),
                                    (s2.AC = {
                                        name: "Access Complexity",
                                        shortName: "AC",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            'This metric measures the complexity of the attack required to exploit the vulnerability once an attacker has gained access to the target system. For example, consider a buffer overflow in an Internet service: If the vulnerability is exploitable only once a user has been authenticated by the service, the vulnerability is only "Medium" complexity. If, however, the vulnerability can be exploited anonymously, it is "Low" complexity.',
                                        values: [
                                            a2.AC_VALUES.ND,
                                            a2.AC_VALUES.H,
                                            a2.AC_VALUES.M,
                                            a2.AC_VALUES.L,
                                        ],
                                    }),
                                    (s2.Au_VALUES = {
                                        ND: {
                                            shortName: "ND",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value to the metric will result in no score being calculated.",
                                        },
                                        M: {
                                            shortName: "M",
                                            value: 0.45,
                                            name: "Multiple",
                                            jsonSchemaName: "MULTIPLE",
                                            description:
                                                "Exploiting the vulnerability requires that the attacker authenticate two or more times, even if the same credentials are used each time. An example is an attacker authenticating to an operating system in addition to providing credentials to access an application hosted on that system.",
                                        },
                                        S: {
                                            shortName: "S",
                                            value: 0.56,
                                            name: "Single",
                                            jsonSchemaName: "SINGLE",
                                            description:
                                                "The vulnerability requires an attacker to be logged into the system (such as at a command line or via a desktop session or web interface).",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0.704,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "Authentication is not required to exploit the vulnerability.",
                                        },
                                    }),
                                    (s2.Au = {
                                        name: "Authentication",
                                        shortName: "Au",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            'This metric measures the number of times an attacker must authenticate to a target in order to exploit a vulnerability. "Multiple" means that the attacker must authenticate two or more times, "Single" means that the attacker must authenticate once, and "None" means that the attacker need not authenticate at all to exploit the vulnerability.',
                                        values: [
                                            a2.Au_VALUES.ND,
                                            a2.Au_VALUES.M,
                                            a2.Au_VALUES.S,
                                            a2.Au_VALUES.N,
                                        ],
                                    }),
                                    (s2.C_VALUES = {
                                        ND: {
                                            shortName: "ND",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value to the metric will result in no score being calculated.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "There is no impact to the confidentiality of the system.",
                                        },
                                        P: {
                                            shortName: "P",
                                            value: 0.275,
                                            name: "Partial",
                                            jsonSchemaName: "PARTIAL",
                                            description:
                                                "There is considerable informational disclosure. Access to some system files is possible, but the attacker does not have control over what is obtained, or the scope of the loss is constrained. An example is a vulnerability that divulges only certain tables in a database.",
                                        },
                                        C: {
                                            shortName: "C",
                                            value: 0.66,
                                            name: "Complete",
                                            jsonSchemaName: "COMPLETE",
                                            description:
                                                "There is total information disclosure, resulting in all system files being revealed. The attacker is able to read all of the system's data (memory, files, etc.)",
                                        },
                                    }),
                                    (s2.C = {
                                        name: "Confidentiality Impact",
                                        shortName: "C",
                                        subCategory: "Impact Metrics",
                                        description:
                                            "This metric measures the impact to the confidentiality of the information resources managed by a software component due to a successfully exploited vulnerability. Confidentiality refers to limiting information access and disclosure to only authorized users, as well as preventing access by, or disclosure to, unauthorized ones.",
                                        values: [
                                            a2.C_VALUES.ND,
                                            a2.C_VALUES.N,
                                            a2.C_VALUES.P,
                                            a2.C_VALUES.C,
                                        ],
                                    }),
                                    (s2.I_VALUES = {
                                        ND: {
                                            shortName: "ND",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value to the metric will result in no score being calculated.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "There is no impact to the integrity of the system.",
                                        },
                                        P: {
                                            shortName: "P",
                                            value: 0.275,
                                            name: "Partial",
                                            jsonSchemaName: "PARTIAL",
                                            description:
                                                "Modification of some system files or information is possible, but the attacker does not have control over what can be modified, or the scope of what the attacker can affect is limited. For example, system or application files may be overwritten or modified, but either the attacker has no control over which files are affected or the attacker can modify files within only a limited context or scope.",
                                        },
                                        C: {
                                            shortName: "C",
                                            value: 0.66,
                                            name: "Complete",
                                            jsonSchemaName: "COMPLETE",
                                            description:
                                                "There is a total compromise of system integrity. There is a complete loss of system protection, resulting in the entire system being compromised. The attacker is able to modify any files on the target system.",
                                        },
                                    }),
                                    (s2.I = {
                                        name: "Integrity Impact",
                                        shortName: "I",
                                        subCategory: "Impact Metrics",
                                        description:
                                            "This metric measures the impact to integrity of a successfully exploited vulnerability. Integrity refers to the trustworthiness and guaranteed veracity of information.",
                                        values: [
                                            a2.I_VALUES.ND,
                                            a2.I_VALUES.N,
                                            a2.I_VALUES.P,
                                            a2.I_VALUES.C,
                                        ],
                                    }),
                                    (s2.A_VALUES = {
                                        ND: {
                                            shortName: "ND",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value to the metric will result in no score being calculated.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "There is no impact to availability within the impacted component.",
                                        },
                                        P: {
                                            shortName: "P",
                                            value: 0.275,
                                            name: "Partial",
                                            jsonSchemaName: "PARTIAL",
                                            description:
                                                "There is reduced performance or interruptions in resource availability. An example is a network-based flood attack that permits a limited number of successful connections to an Internet service.",
                                        },
                                        C: {
                                            shortName: "C",
                                            value: 0.66,
                                            name: "Complete",
                                            jsonSchemaName: "COMPLETE",
                                            description:
                                                "There is a total shutdown of the affected resource. The attacker can render the resource completely unavailable.",
                                        },
                                    }),
                                    (s2.A = {
                                        name: "Availability Impact",
                                        shortName: "A",
                                        subCategory: "Impact Metrics",
                                        description:
                                            "This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability. While the Confidentiality and Integrity impact metrics apply to the loss of confidentiality or integrity of data (e.g., information, files) used by the impacted component, this metric refers to the loss of availability of the impacted component itself, such as a networked service (e.g., web, database, email). Since availability refers to the accessibility of information resources, attacks that consume network bandwidth, processor cycles, or disk space all impact the availability of an impacted component. This metric considers only the availability of the impacted component itself.",
                                        values: [
                                            a2.A_VALUES.ND,
                                            a2.A_VALUES.N,
                                            a2.A_VALUES.P,
                                            a2.A_VALUES.C,
                                        ],
                                    }),
                                    (s2.BASE_CATEGORY_VALUES = [
                                        a2.AV,
                                        a2.AC,
                                        a2.Au,
                                        a2.C,
                                        a2.I,
                                        a2.A,
                                    ]),
                                    (s2.TEMPORAL_CATEGORY = {
                                        name: "temporal",
                                        description:
                                            "The threat posed by a vulnerability may change over time. Three such factors that CVSS captures are: confirmation of the technical details of a vulnerability, the remediation status of the vulnerability, and the availability of exploit code or techniques. Since temporal metrics are optional they each include a metric value that has no effect on the score.",
                                    }),
                                    (s2.E_VALUES = {
                                        ND: {
                                            shortName: "ND",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.",
                                        },
                                        U: {
                                            shortName: "U",
                                            value: 0.85,
                                            name: "Unproven",
                                            jsonSchemaName: "UNPROVEN",
                                            description:
                                                "No exploit code is available, or an exploit is entirely theoretical.",
                                        },
                                        POC: {
                                            shortName: "POC",
                                            value: 0.9,
                                            name: "Proof-of-concept",
                                            abbreviatedName: "Proof-of-conc.",
                                            jsonSchemaName: "PROOF_OF_CONCEPT",
                                            description:
                                                "Proof-of-concept exploit code or an attack demonstration that is not practical for most systems is available. The code or technique is not functional in all situations and may require substantial modification by a skilled attacker.",
                                        },
                                        F: {
                                            shortName: "F",
                                            value: 0.95,
                                            name: "Functional",
                                            jsonSchemaName: "FUNCTIONAL",
                                            description:
                                                "Functional exploit code is available. The code works in most situations where the vulnerability exists.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 1,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "Either the vulnerability is exploitable by functional mobile autonomous code, or no exploit is required (manual trigger) and details are widely available. The code works in every situation, or is actively being delivered via a mobile autonomous agent (such as a worm or virus).",
                                        },
                                    }),
                                    (s2.E = {
                                        name: "Exploitability",
                                        shortName: "E",
                                        description:
                                            'This metric measures the current state of exploit techniques or code availability. "Unproven that exploit exists" is the lowest impact and "Proof-of-concept code" is the highest impact.',
                                        values: [
                                            a2.E_VALUES.ND,
                                            a2.E_VALUES.U,
                                            a2.E_VALUES.POC,
                                            a2.E_VALUES.F,
                                            a2.E_VALUES.H,
                                        ],
                                    }),
                                    (s2.RL_VALUES = {
                                        ND: {
                                            shortName: "ND",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.",
                                        },
                                        OF: {
                                            shortName: "OF",
                                            value: 0.87,
                                            name: "Official Fix",
                                            abbreviatedName: "Off. Fix",
                                            jsonSchemaName: "OFFICIAL_FIX",
                                            description:
                                                "A complete vendor solution is available. Either the vendor has issued an official patch, or an upgrade is available.",
                                        },
                                        TF: {
                                            shortName: "TF",
                                            value: 0.9,
                                            name: "Temporary Fix",
                                            abbreviatedName: "Temp. Fix",
                                            jsonSchemaName: "TEMPORARY_FIX",
                                            description:
                                                "There is an official but temporary fix available. This includes instances where the vendor issues a temporary hotfix, tool, or workaround.",
                                        },
                                        W: {
                                            shortName: "W",
                                            value: 0.95,
                                            name: "Workaround",
                                            jsonSchemaName: "WORKAROUND",
                                            description:
                                                "There is an unofficial, non-vendor solution available. In some cases, users of the affected technology will create a patch of their own or provide steps to work around or otherwise mitigate the vulnerability.",
                                        },
                                        U: {
                                            shortName: "U",
                                            value: 1,
                                            name: "Unavailable",
                                            jsonSchemaName: "UNAVAILABLE",
                                            description:
                                                "There is either no solution available or it is impossible to apply.",
                                        },
                                    }),
                                    (s2.RL = {
                                        name: "Remediation Level",
                                        shortName: "RL",
                                        description:
                                            'This metric measures the remediation level of a vulnerability. "Official fix" is the lowest impact and "Unavailable" is the highest impact.',
                                        values: [
                                            a2.RL_VALUES.ND,
                                            a2.RL_VALUES.OF,
                                            a2.RL_VALUES.TF,
                                            a2.RL_VALUES.W,
                                            a2.RL_VALUES.U,
                                        ],
                                    }),
                                    (s2.RC_VALUES = {
                                        ND: {
                                            shortName: "ND",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.",
                                        },
                                        UC: {
                                            shortName: "UC",
                                            value: 0.9,
                                            name: "Unconfirmed",
                                            jsonSchemaName: "UNCONFIRMED",
                                            description:
                                                "There is little confidence in the existence of this vulnerability. The report is unconfirmed, or the source is not known.",
                                        },
                                        UR: {
                                            shortName: "UR",
                                            value: 0.95,
                                            name: "Uncorroborated",
                                            jsonSchemaName: "UNCORROBORATED",
                                            description:
                                                "There is reasonable confidence in the existence of this vulnerability, but the technical details are not known publicly. The report is unconfirmed.",
                                        },
                                        C: {
                                            shortName: "C",
                                            value: 1,
                                            name: "Confirmed",
                                            jsonSchemaName: "CONFIRMED",
                                            description:
                                                "The existence of this vulnerability is confirmed, but the details are not known publicly. An exploit has been observed, or proof-of-concept exploit code is available. The bugtraq ID or CVE ID has been made public.",
                                        },
                                    }),
                                    (s2.RC = {
                                        name: "Report Confidence",
                                        shortName: "RC",
                                        description:
                                            'This metric measures the degree of confidence in the existence of the vulnerability and the credibility of the known technical details. "Unconfirmed" is the lowest confidence and "Confirmed" is the highest.',
                                        values: [
                                            a2.RC_VALUES.ND,
                                            a2.RC_VALUES.UC,
                                            a2.RC_VALUES.UR,
                                            a2.RC_VALUES.C,
                                        ],
                                    }),
                                    (s2.TEMPORAL_CATEGORY_VALUES = [
                                        a2.E,
                                        a2.RL,
                                        a2.RC,
                                    ]),
                                    (s2.ENVIRONMENTAL_CATEGORY = {
                                        name: "environmental",
                                        description:
                                            "Different environments can have an immense bearing on the risk that a vulnerability poses to an organization and its stakeholders. The CVSS environmental metric group captures the characteristics of a vulnerability that are associated with a user's IT environment. Since environmental metrics are optional they each include a metric value that has no effect on the score.",
                                    }),
                                    (s2.CDP_VALUES = {
                                        ND: {
                                            shortName: "ND",
                                            value: 0,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "There is no potential for loss of life, physical assets, productivity or revenue.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.1,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "A successful exploit of this vulnerability may result in slight physical or property damage. Or, there may be a slight loss of revenue or productivity to the organization.",
                                        },
                                        LM: {
                                            shortName: "LM",
                                            value: 0.3,
                                            name: "Low-Medium",
                                            abbreviatedName: "Low-Med.",
                                            jsonSchemaName: "LOW_MEDIUM",
                                            description:
                                                "A successful exploit of this vulnerability may result in moderate physical or property damage. Or, there may be a moderate loss of revenue or productivity to the organization.",
                                        },
                                        MH: {
                                            shortName: "MH",
                                            value: 0.4,
                                            name: "Medium-High",
                                            abbreviatedName: "Med.-High",
                                            jsonSchemaName: "MEDIUM_HIGH",
                                            description:
                                                "A successful exploit of this vulnerability may result in significant physical or property damage or loss. Or, there may be a significant loss of revenue or productivity.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 0.5,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "A successful exploit of this vulnerability may result in catastrophic physical or property damage and loss. Or, there may be a catastrophic loss of revenue or productivity.",
                                        },
                                    }),
                                    (s2.CDP = {
                                        name: "Collateral Damage Potential",
                                        shortName: "CDP",
                                        subCategory: "General Modifiers",
                                        description:
                                            'This metric measures the potential for loss of life or physical assets resulting from a vulnerability. "None" is the lowest impact and "High" is the highest impact.',
                                        values: [
                                            a2.CDP_VALUES.ND,
                                            a2.CDP_VALUES.N,
                                            a2.CDP_VALUES.L,
                                            a2.CDP_VALUES.LM,
                                            a2.CDP_VALUES.MH,
                                            a2.CDP_VALUES.H,
                                        ],
                                    }),
                                    (s2.TD_VALUES = {
                                        ND: {
                                            shortName: "ND",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "There is no (0%) target distribution.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.25,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "There is a small (< 25%) target distribution.",
                                        },
                                        M: {
                                            shortName: "M",
                                            value: 0.75,
                                            name: "Medium",
                                            jsonSchemaName: "MEDIUM",
                                            description:
                                                "There is a medium (26-75%) target distribution.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 1,
                                            name: "High",
                                            description:
                                                "There is a high (> 75%) target distribution.",
                                        },
                                    }),
                                    (s2.TD = {
                                        name: "Target Distribution",
                                        shortName: "TD",
                                        subCategory: "General Modifiers",
                                        description:
                                            'This metric measures the proportion of vulnerable systems that could be affected by an attack. It is meant to represent the proportion of vulnerable systems that an attacker can expect to target. "None" is the lowest impact and "High" is the highest impact.',
                                        values: [
                                            a2.TD_VALUES.ND,
                                            a2.TD_VALUES.N,
                                            a2.TD_VALUES.L,
                                            a2.TD_VALUES.M,
                                            a2.TD_VALUES.H,
                                        ],
                                    }),
                                    (s2.CR_VALUES = {
                                        ND: {
                                            shortName: "ND",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.5,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Loss of confidentiality is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        M: {
                                            shortName: "M",
                                            value: 1,
                                            name: "Medium",
                                            jsonSchemaName: "MEDIUM",
                                            description:
                                                "Loss of confidentiality is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 1.51,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "Loss of confidentiality is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                    }),
                                    (s2.CR = {
                                        name: "Confidentiality Requirement",
                                        shortName: "CR",
                                        subCategory:
                                            "Modified Requirement (Impact Subscore) Modifiers",
                                        description:
                                            'This metric measures the need for confidentiality of the vulnerable component to the user. For example, an attacker that exploits a vulnerability that exists on a network boundary and requires no privileges has a low need for the confidentiality of the vulnerable component. Conversely, an attacker that exploits a vulnerability that exists on the same system as the vulnerable component and requires Privileged access to the system in order to exploit it has a high need for confidentiality. "Not Defined" is the lowest impact and "High" is the highest impact.',
                                        values: [
                                            a2.CR_VALUES.ND,
                                            a2.CR_VALUES.L,
                                            a2.CR_VALUES.M,
                                            a2.CR_VALUES.H,
                                        ],
                                    }),
                                    (s2.IR_VALUES = {
                                        ND: {
                                            shortName: "ND",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.5,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Loss of integrity is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        M: {
                                            shortName: "M",
                                            value: 1,
                                            name: "Medium",
                                            jsonSchemaName: "MEDIUM",
                                            description:
                                                "Loss of integrity is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 1.51,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "Loss of integrity is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                    }),
                                    (s2.IR = {
                                        name: "Integrity Requirement",
                                        shortName: "IR",
                                        subCategory:
                                            "Modified Requirement (Impact Subscore) Modifiers",
                                        description:
                                            'This metric measures the need for integrity of the vulnerable component to a user. For example, an attacker that exploits a vulnerability that exists on a network boundary and requires no privileges has a low need for the integrity of the vulnerable component. Conversely, an attacker that exploits a vulnerability that exists on the same system as the vulnerable component and requires Privileged access to the system in order to exploit it has a high need for integrity. "Not Defined" is the lowest impact and "High" is the highest impact.',
                                        values: [
                                            a2.IR_VALUES.ND,
                                            a2.IR_VALUES.L,
                                            a2.IR_VALUES.M,
                                            a2.IR_VALUES.H,
                                        ],
                                    }),
                                    (s2.AR_VALUES = {
                                        ND: {
                                            shortName: "ND",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.5,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Loss of availability is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        M: {
                                            shortName: "M",
                                            value: 1,
                                            name: "Medium",
                                            jsonSchemaName: "MEDIUM",
                                            description:
                                                "Loss of availability is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 1.51,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "Loss of availability is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                    }),
                                    (s2.AR = {
                                        name: "Availability Requirement",
                                        shortName: "AR",
                                        subCategory:
                                            "Modified Requirement (Impact Subscore) Modifiers",
                                        description:
                                            'This metric measures the need for availability of the vulnerable component to a user. For example, an attacker that exploits a vulnerability that exists on a network boundary and requires no privileges has a low need for the availability of the vulnerable component. Conversely, an attacker that exploits a vulnerability that exists on the same system as the vulnerable component and requires Privileged access to the system in order to exploit it has a high need for availability. "Not Defined" is the lowest impact and "High" is the highest impact.',
                                        values: [
                                            a2.AR_VALUES.ND,
                                            a2.AR_VALUES.L,
                                            a2.AR_VALUES.M,
                                            a2.AR_VALUES.H,
                                        ],
                                    }),
                                    (s2.ENVIRONMENTAL_CATEGORY_VALUES = [
                                        a2.CDP,
                                        a2.TD,
                                        a2.CR,
                                        a2.IR,
                                        a2.AR,
                                    ]),
                                    (s2.REGISTERED_COMPONENTS =
                                        /* @__PURE__ */ new Map()),
                                    a2.REGISTERED_COMPONENTS.set(
                                        a2.BASE_CATEGORY,
                                        a2.BASE_CATEGORY_VALUES
                                    ),
                                    a2.REGISTERED_COMPONENTS.set(
                                        a2.TEMPORAL_CATEGORY,
                                        a2.TEMPORAL_CATEGORY_VALUES
                                    ),
                                    a2.REGISTERED_COMPONENTS.set(
                                        a2.ENVIRONMENTAL_CATEGORY,
                                        a2.ENVIRONMENTAL_CATEGORY_VALUES
                                    ),
                                    (s2.ATTRIBUTE_SEVERITY_ORDER =
                                        i2.CvssVector._reorderAttributeSeverityOrder(
                                            [
                                                a2.AC_VALUES.ND,
                                                a2.AV_VALUES.ND,
                                                a2.Au_VALUES.ND,
                                                a2.C_VALUES.ND,
                                                a2.I_VALUES.ND,
                                                a2.A_VALUES.ND,
                                                a2.C_VALUES.N,
                                                a2.I_VALUES.N,
                                                a2.A_VALUES.N,
                                                a2.CDP_VALUES.N,
                                                a2.CDP_VALUES.ND,
                                                a2.TD_VALUES.N,
                                                a2.CDP_VALUES.L,
                                                a2.TD_VALUES.L,
                                                a2.C_VALUES.P,
                                                a2.I_VALUES.P,
                                                a2.A_VALUES.P,
                                                a2.CDP_VALUES.LM,
                                                a2.AC_VALUES.H,
                                                a2.AV_VALUES.L,
                                                a2.CDP_VALUES.MH,
                                                a2.Au_VALUES.M,
                                                a2.CDP_VALUES.H,
                                                a2.Au_VALUES.S,
                                                a2.AC_VALUES.M,
                                                a2.AV_VALUES.A,
                                                a2.C_VALUES.C,
                                                a2.I_VALUES.C,
                                                a2.A_VALUES.C,
                                                a2.Au_VALUES.N,
                                                a2.AC_VALUES.L,
                                                a2.TD_VALUES.M,
                                                a2.E_VALUES.U,
                                                a2.RL_VALUES.OF,
                                                a2.E_VALUES.POC,
                                                a2.RL_VALUES.TF,
                                                a2.RL_VALUES.W,
                                                a2.RC_VALUES.UC,
                                                a2.AV_VALUES.N,
                                                a2.E_VALUES.F,
                                                a2.E_VALUES.H,
                                                a2.E_VALUES.ND,
                                                a2.RL_VALUES.U,
                                                a2.RL_VALUES.ND,
                                                a2.RC_VALUES.UR,
                                                a2.RC_VALUES.C,
                                                a2.RC_VALUES.ND,
                                                a2.TD_VALUES.H,
                                                a2.TD_VALUES.ND,
                                                a2.CR_VALUES.L,
                                                a2.CR_VALUES.M,
                                                a2.IR_VALUES.L,
                                                a2.IR_VALUES.M,
                                                a2.AR_VALUES.L,
                                                a2.AR_VALUES.M,
                                                a2.CR_VALUES.ND,
                                                a2.IR_VALUES.ND,
                                                a2.AR_VALUES.ND,
                                                a2.CR_VALUES.H,
                                                a2.IR_VALUES.H,
                                                a2.AR_VALUES.H,
                                            ]
                                        )));
                            },
                            564: (e4, t3, o2) => {
                                (Object.defineProperty(t3, "__esModule", {
                                    value: true,
                                }),
                                    (t3.applyVectorPartsIfMetricsHigher =
                                        t3.applyVectorPartsIfMetricsLower =
                                        t3.fromVector =
                                            void 0));
                                const a2 = o2(475),
                                    i2 = o2(623),
                                    s2 = o2(371),
                                    n2 = o2(987),
                                    r2 = o2(479),
                                    c2 = o2(331),
                                    l2 = o2(951),
                                    m = o2(759),
                                    E2 = {
                                        "CVSS:2.0": a2.Cvss2,
                                        "2.0": a2.Cvss2,
                                        "CVSS:3.0": i2.Cvss3P0,
                                        "3.0": i2.Cvss3P0,
                                        "CVSS:3.1": s2.Cvss3P1,
                                        3.1: s2.Cvss3P1,
                                        "CVSS:4.0": n2.Cvss4P0,
                                        "4.0": n2.Cvss4P0,
                                    };
                                function h2(e5, t4, o3) {
                                    if (!t4) return 0;
                                    const a3 = e5.normalizeVector(t4);
                                    if (0 === a3.length) return 0;
                                    const i3 = a3.split("/");
                                    let s3 = 0;
                                    for (const t5 of i3) {
                                        if (!t5) continue;
                                        const a4 = t5.split(":", 2);
                                        if (2 === a4.length) {
                                            const t6 = a4[0],
                                                i4 = a4[1],
                                                n3 =
                                                    e5.getComponentByStringOpt(
                                                        t6
                                                    ),
                                                r3 = t6.startsWith("M"),
                                                c3 = r3
                                                    ? t6.replace("M", "")
                                                    : t6,
                                                l3 =
                                                    e5.getComponentByStringOpt(
                                                        c3
                                                    ),
                                                m2 = r3 ? t6 : `M${t6}`,
                                                E3 =
                                                    e5.getComponentByStringOpt(
                                                        m2
                                                    ),
                                                h3 =
                                                    (null == n3
                                                        ? void 0
                                                        : n3.shortName) || "X",
                                                u3 =
                                                    e5.applyComponentStringSilent(
                                                        t6,
                                                        i4
                                                    ),
                                                d3 =
                                                    e5.getComponentByStringOpt(
                                                        t6
                                                    );
                                            u3 && o3(n3, l3, E3, d3, r3)
                                                ? s3++
                                                : e5.applyComponentStringSilent(
                                                      t6,
                                                      h3
                                                  );
                                        } else
                                            console.warn(
                                                "Unknown vector argument:",
                                                t5
                                            );
                                    }
                                    return s3;
                                }
                                function u2(e5, t4, o3, a3, i3) {
                                    const s3 =
                                        null != o3 &&
                                        "NOT_DEFINED" !== o3.name &&
                                        "NULL" !== o3.name &&
                                        "X" !== o3.shortName;
                                    return {
                                        oldSeverity: d2(e5, i3 && s3 ? o3 : t4),
                                        newSeverity: d2(e5, a3),
                                    };
                                }
                                function d2(e5, t4) {
                                    if (!t4) return -1;
                                    let o3 = [];
                                    if (
                                        (e5 instanceof a2.Cvss2
                                            ? (o3 =
                                                  r2.Cvss2Components
                                                      .ATTRIBUTE_SEVERITY_ORDER)
                                            : e5 instanceof i2.Cvss3P0
                                              ? (o3 =
                                                    c2.Cvss3P0Components
                                                        .ATTRIBUTE_SEVERITY_ORDER)
                                              : e5 instanceof s2.Cvss3P1
                                                ? (o3 =
                                                      l2.Cvss3P1Components
                                                          .ATTRIBUTE_SEVERITY_ORDER)
                                                : e5 instanceof n2.Cvss4P0 &&
                                                  (o3 =
                                                      m.Cvss4P0Components
                                                          .ATTRIBUTE_SEVERITY_ORDER),
                                        0 === o3.length)
                                    )
                                        return (
                                            console.warn(
                                                "Unknown",
                                                e5.getVectorName(),
                                                "severity order list for attribute type:",
                                                t4
                                            ),
                                            -1
                                        );
                                    for (let e6 = 0; e6 < o3.length; e6++)
                                        if (o3[e6].includes(t4)) return e6;
                                    return (
                                        console.warn(
                                            "Unknown",
                                            e5.getVectorName(),
                                            "attribute type:",
                                            t4
                                        ),
                                        -1
                                    );
                                }
                                ((t3.fromVector = function (e5, t4 = void 0) {
                                    if (t4) {
                                        const o4 = E2[t4];
                                        if (o4) return new o4(e5);
                                    }
                                    const o3 = E2[e5];
                                    if (o3) return new o3();
                                    for (let t5 in E2) {
                                        const o4 = E2[t5];
                                        if (e5.startsWith(t5))
                                            try {
                                                return new o4(e5);
                                            } catch (e6) {}
                                    }
                                    for (let t5 in E2) {
                                        const o4 = E2[t5];
                                        try {
                                            return new o4(e5);
                                        } catch (e6) {}
                                    }
                                    return null;
                                }),
                                    (t3.applyVectorPartsIfMetricsLower =
                                        function (e5, t4) {
                                            return t4
                                                ? h2(
                                                      e5,
                                                      t4,
                                                      (t5, o3, a3, i3, s3) => {
                                                          const n3 = u2(
                                                              e5,
                                                              o3,
                                                              a3,
                                                              i3,
                                                              s3
                                                          );
                                                          return (
                                                              n3.newSeverity <=
                                                              n3.oldSeverity
                                                          );
                                                      }
                                                  )
                                                : 0;
                                        }),
                                    (t3.applyVectorPartsIfMetricsHigher =
                                        function (e5, t4) {
                                            return t4
                                                ? h2(
                                                      e5,
                                                      t4,
                                                      (t5, o3, a3, i3, s3) => {
                                                          const n3 = u2(
                                                              e5,
                                                              o3,
                                                              a3,
                                                              i3,
                                                              s3
                                                          );
                                                          return (
                                                              n3.newSeverity >=
                                                              n3.oldSeverity
                                                          );
                                                      }
                                                  )
                                                : 0;
                                        }));
                            },
                            623: (e4, t3, o2) => {
                                (Object.defineProperty(t3, "__esModule", {
                                    value: true,
                                }),
                                    (t3.Cvss3P0 = void 0));
                                const a2 = o2(154),
                                    i2 = o2(331);
                                class s2 extends a2.CvssVector {
                                    constructor(e5) {
                                        super(e5);
                                    }
                                    getRegisteredComponents() {
                                        return i2.Cvss3P0Components
                                            .REGISTERED_COMPONENTS;
                                    }
                                    getVectorPrefix() {
                                        return "CVSS:3.0/";
                                    }
                                    getVectorName() {
                                        return "CVSS:3.0";
                                    }
                                    fillAverageVector() {
                                        this.applyVector(
                                            "AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:L/A:L"
                                        );
                                    }
                                    fillRandomBaseVector() {
                                        this.fillRandomComponentsForCategory(
                                            i2.Cvss3P0Components.BASE_CATEGORY
                                        );
                                    }
                                    fillRandomTemporalVector() {
                                        this.fillRandomComponentsForCategory(
                                            i2.Cvss3P0Components
                                                .TEMPORAL_CATEGORY
                                        );
                                    }
                                    fillRandomEnvironmentalVector() {
                                        this.fillRandomComponentsForCategory(
                                            i2.Cvss3P0Components
                                                .ENVIRONMENTAL_CATEGORY
                                        );
                                    }
                                    fillRandomComponentsForCategory(e5) {
                                        const t4 =
                                            i2.Cvss3P0Components.REGISTERED_COMPONENTS.get(
                                                e5
                                            );
                                        if (t4)
                                            for (
                                                let e6 = 0;
                                                e6 < t4.length;
                                                e6++
                                            ) {
                                                const o3 = t4[e6],
                                                    a3 =
                                                        super.pickRandomDefinedComponentValue(
                                                            o3
                                                        );
                                                if (!a3)
                                                    return (
                                                        console.warn(
                                                            "Failed to pick random vector component for",
                                                            o3
                                                        ),
                                                        void this.fillAverageVector()
                                                    );
                                                this.applyComponent(o3, a3);
                                            }
                                        else
                                            console.warn(
                                                "Failed to pick random vector components for",
                                                e5
                                            );
                                    }
                                    calculateScoresInternal(e5 = false) {
                                        const t4 = this.isBaseFullyDefined(),
                                            o3 = this.isAnyTemporalDefined(),
                                            a3 =
                                                this.isAnyEnvironmentalDefined();
                                        return {
                                            normalized: e5,
                                            base: t4
                                                ? super.round(
                                                      this.calculateExactBaseScore(),
                                                      1
                                                  )
                                                : void 0,
                                            impact: t4
                                                ? super.normalizeScore(
                                                      super.round(
                                                          this.calculateImpactScore(),
                                                          1
                                                      ),
                                                      e5 ? 6 : 10
                                                  )
                                                : void 0,
                                            exploitability: t4
                                                ? super.normalizeScore(
                                                      super.round(
                                                          this.calculateExactExploitabilityScore(),
                                                          1
                                                      ),
                                                      e5 ? 3.9 : 10
                                                  )
                                                : void 0,
                                            temporal:
                                                t4 && o3
                                                    ? super.round(
                                                          this.calculateExactTemporalScore(),
                                                          1
                                                      )
                                                    : void 0,
                                            environmental:
                                                t4 && a3
                                                    ? super.round(
                                                          this.calculateExactEnvironmentalScore(),
                                                          1
                                                      )
                                                    : void 0,
                                            modifiedImpact:
                                                t4 && a3
                                                    ? super.normalizeScore(
                                                          super.round(
                                                              Math.max(
                                                                  0,
                                                                  this.calculateExactAdjustedImpactScore()
                                                              ),
                                                              1
                                                          ),
                                                          e5 ? 6.1 : 10
                                                      )
                                                    : void 0,
                                            overall: super.round(
                                                this.calculateExactOverallScore(),
                                                1
                                            ),
                                            vector: this.toString(),
                                        };
                                    }
                                    calculateExactBaseScore() {
                                        if (!this.isBaseFullyDefined())
                                            return 0;
                                        let e5 =
                                            this.calculateExactImpactScore();
                                        if (e5 <= 0) return 0;
                                        let t4 =
                                            this.calculateExactExploitabilityScore();
                                        return this.getComponent(
                                            i2.Cvss3P0Components.S
                                        ).value
                                            ? this.roundUp1(
                                                  Math.min(
                                                      s2.SCOPE_COEFFICIENT *
                                                          (e5 + t4),
                                                      10
                                                  )
                                              )
                                            : this.roundUp1(
                                                  Math.min(e5 + t4, 10)
                                              );
                                    }
                                    calculateImpactScore() {
                                        const e5 =
                                            this.calculateExactImpactScore();
                                        return e5 <= 0 ? 0 : e5;
                                    }
                                    calculateExactImpactScore() {
                                        let e5 = this.calculateExactISSScore();
                                        return this.getComponent(
                                            i2.Cvss3P0Components.S
                                        ).value
                                            ? s2.SCOPE_CHANGED_FACTOR *
                                                  (e5 - 0.029) -
                                                  3.25 * Math.pow(e5 - 0.02, 15)
                                            : s2.SCOPE_UNCHANGED_FACTOR * e5;
                                    }
                                    calculateExactISSScore() {
                                        return (
                                            1 -
                                            (1 -
                                                this.getComponent(
                                                    i2.Cvss3P0Components.C
                                                ).value) *
                                                (1 -
                                                    this.getComponent(
                                                        i2.Cvss3P0Components.I
                                                    ).value) *
                                                (1 -
                                                    this.getComponent(
                                                        i2.Cvss3P0Components.A
                                                    ).value)
                                        );
                                    }
                                    calculateExactMISSScore() {
                                        let e5,
                                            t4,
                                            o3,
                                            a3,
                                            s3,
                                            n2,
                                            r2 = this.getComponent(
                                                i2.Cvss3P0Components.MC
                                            ),
                                            c2 = this.getComponent(
                                                i2.Cvss3P0Components.MI
                                            ),
                                            l2 = this.getComponent(
                                                i2.Cvss3P0Components.MA
                                            ),
                                            m = this.getComponent(
                                                i2.Cvss3P0Components.C
                                            ),
                                            E2 = this.getComponent(
                                                i2.Cvss3P0Components.I
                                            ),
                                            h2 = this.getComponent(
                                                i2.Cvss3P0Components.A
                                            ),
                                            u2 = this.getComponent(
                                                i2.Cvss3P0Components.CR
                                            ),
                                            d2 = this.getComponent(
                                                i2.Cvss3P0Components.IR
                                            ),
                                            p2 = this.getComponent(
                                                i2.Cvss3P0Components.AR
                                            );
                                        return (
                                            (e5 =
                                                r2 ===
                                                i2.Cvss3P0Components.MC
                                                    .values[0]
                                                    ? m.value
                                                    : r2.value),
                                            (t4 =
                                                c2 ===
                                                i2.Cvss3P0Components.MI
                                                    .values[0]
                                                    ? E2.value
                                                    : c2.value),
                                            (o3 =
                                                l2 ===
                                                i2.Cvss3P0Components.MA
                                                    .values[0]
                                                    ? h2.value
                                                    : l2.value),
                                            i2.Cvss3P0Components.CR.values[0],
                                            (a3 = u2.value),
                                            i2.Cvss3P0Components.IR.values[0],
                                            (s3 = d2.value),
                                            i2.Cvss3P0Components.AR.values[0],
                                            (n2 = p2.value),
                                            Math.min(
                                                1 -
                                                    (1 - a3 * e5) *
                                                        (1 - s3 * t4) *
                                                        (1 - n2 * o3),
                                                0.915
                                            )
                                        );
                                    }
                                    calculateExactExploitabilityScore() {
                                        const e5 = this.getComponent(
                                                i2.Cvss3P0Components.AV
                                            ).value,
                                            t4 = this.getComponent(
                                                i2.Cvss3P0Components.AC
                                            ).value,
                                            o3 = this.getComponent(
                                                i2.Cvss3P0Components.UI
                                            ).value;
                                        let a3;
                                        return (
                                            (a3 = this.getComponent(
                                                i2.Cvss3P0Components.S
                                            ).value
                                                ? this.getComponent(
                                                      i2.Cvss3P0Components.PR
                                                  ).changedValue
                                                : this.getComponent(
                                                      i2.Cvss3P0Components.PR
                                                  ).value),
                                            s2.EXPLOITABILITY_COEFFICIENT *
                                                e5 *
                                                t4 *
                                                a3 *
                                                o3
                                        );
                                    }
                                    calculateExactTemporalScore() {
                                        if (!this.isBaseFullyDefined())
                                            return 0;
                                        if (!this.isAnyTemporalDefined())
                                            return 0;
                                        let e5 = this.getComponent(
                                                i2.Cvss3P0Components.E
                                            ).value,
                                            t4 = this.getComponent(
                                                i2.Cvss3P0Components.RL
                                            ).value,
                                            o3 = this.getComponent(
                                                i2.Cvss3P0Components.RC
                                            ).value,
                                            a3 = this.calculateExactBaseScore();
                                        return this.roundUp1(a3 * e5 * t4 * o3);
                                    }
                                    calculateExactEnvironmentalScore() {
                                        if (!this.isBaseFullyDefined())
                                            return 0;
                                        if (!this.isAnyEnvironmentalDefined())
                                            return 0;
                                        let e5 =
                                            this.calculateExactAdjustedImpactScore();
                                        if (e5 <= 0) return 0;
                                        let t4 =
                                                this.calculateAdjustedExploitability(),
                                            o3 = this.getComponent(
                                                i2.Cvss3P0Components.E
                                            ).value,
                                            a3 = this.getComponent(
                                                i2.Cvss3P0Components.RL
                                            ).value,
                                            n2 = this.getComponent(
                                                i2.Cvss3P0Components.RC
                                            ).value;
                                        if (this.isModifiedScope()) {
                                            let i3 = this.roundUp1(
                                                Math.min(e5 + t4, 10)
                                            );
                                            return this.roundUp1(
                                                i3 * o3 * a3 * n2
                                            );
                                        }
                                        {
                                            let i3 = this.roundUp1(
                                                Math.min(
                                                    s2.SCOPE_COEFFICIENT *
                                                        (e5 + t4),
                                                    10
                                                )
                                            );
                                            return this.roundUp1(
                                                i3 * o3 * a3 * n2
                                            );
                                        }
                                    }
                                    calculateExactAdjustedImpactScore() {
                                        if (!this.isBaseFullyDefined())
                                            return 0;
                                        if (!this.isAnyEnvironmentalDefined())
                                            return 0;
                                        let e5 = this.calculateExactMISSScore();
                                        return this.isModifiedScope()
                                            ? s2.SCOPE_UNCHANGED_FACTOR * e5
                                            : s2.SCOPE_CHANGED_FACTOR *
                                                  (e5 - 0.029) -
                                                  3.25 *
                                                      Math.pow(e5 - 0.02, 15);
                                    }
                                    calculateAdjustedExploitability() {
                                        let e5,
                                            t4 = this.getFirstDefinedComponent([
                                                i2.Cvss3P0Components.MAV,
                                                i2.Cvss3P0Components.AV,
                                            ]).value,
                                            o3 = this.getFirstDefinedComponent([
                                                i2.Cvss3P0Components.MAC,
                                                i2.Cvss3P0Components.AC,
                                            ]).value,
                                            a3 = this.getFirstDefinedComponent([
                                                i2.Cvss3P0Components.MUI,
                                                i2.Cvss3P0Components.UI,
                                            ]).value,
                                            n2 = this.getFirstDefinedComponent([
                                                i2.Cvss3P0Components.MPR,
                                                i2.Cvss3P0Components.PR,
                                            ]);
                                        return (
                                            (e5 = this.isModifiedScope()
                                                ? n2.value
                                                : n2.changedValue),
                                            s2.EXPLOITABILITY_COEFFICIENT *
                                                t4 *
                                                o3 *
                                                e5 *
                                                a3
                                        );
                                    }
                                    isModifiedScope() {
                                        let e5 = this.getComponent(
                                                i2.Cvss3P0Components.S
                                            ),
                                            t4 = this.getComponent(
                                                i2.Cvss3P0Components.MS
                                            );
                                        return t4 ===
                                            i2.Cvss3P0Components.MS.values[0]
                                            ? !e5.value
                                            : !t4.value;
                                    }
                                    calculateExactOverallScore() {
                                        return this.isAnyEnvironmentalDefined()
                                            ? this.calculateExactEnvironmentalScore()
                                            : this.isAnyTemporalDefined()
                                              ? this.calculateExactTemporalScore()
                                              : this.calculateExactBaseScore();
                                    }
                                    isBaseFullyDefined() {
                                        return super.isCategoryFullyDefined(
                                            i2.Cvss3P0Components.BASE_CATEGORY
                                        );
                                    }
                                    isTemporalFullyDefined() {
                                        return super.isCategoryFullyDefined(
                                            i2.Cvss3P0Components
                                                .TEMPORAL_CATEGORY
                                        );
                                    }
                                    isEnvironmentalFullyDefined() {
                                        return super.isCategoryFullyDefined(
                                            i2.Cvss3P0Components
                                                .ENVIRONMENTAL_CATEGORY
                                        );
                                    }
                                    isAnyBaseDefined() {
                                        return super.isCategoryPartiallyDefined(
                                            i2.Cvss3P0Components.BASE_CATEGORY
                                        );
                                    }
                                    isAnyTemporalDefined() {
                                        return super.isCategoryPartiallyDefined(
                                            i2.Cvss3P0Components
                                                .TEMPORAL_CATEGORY
                                        );
                                    }
                                    isAnyEnvironmentalDefined() {
                                        return super.isCategoryPartiallyDefined(
                                            i2.Cvss3P0Components
                                                .ENVIRONMENTAL_CATEGORY
                                        );
                                    }
                                    roundUp1(e5) {
                                        return Math.ceil(10 * e5) / 10;
                                    }
                                    getJsonSchemaSeverity(e5) {
                                        return 0 === e5 || isNaN(e5)
                                            ? "NONE"
                                            : e5 <= 3.9
                                              ? "LOW"
                                              : e5 <= 6.9
                                                ? "MEDIUM"
                                                : e5 <= 8.9
                                                  ? "HIGH"
                                                  : "CRITICAL";
                                    }
                                    createJsonSchema() {
                                        const e5 = this.calculateScores();
                                        return {
                                            version: "3.0",
                                            vectorString: this.toString(),
                                            baseScore: e5.base,
                                            temporalScore: e5.temporal,
                                            environmentalScore:
                                                e5.environmental,
                                            baseSeverity:
                                                this.getJsonSchemaSeverity(
                                                    e5.base
                                                ),
                                            temporalSeverity: e5.temporal
                                                ? this.getJsonSchemaSeverity(
                                                      e5.temporal
                                                  )
                                                : void 0,
                                            environmentalSeverity:
                                                e5.environmental
                                                    ? this.getJsonSchemaSeverity(
                                                          e5.environmental
                                                      )
                                                    : void 0,
                                            attackVector: this.getComponent(
                                                i2.Cvss3P0Components.AV
                                            ).jsonSchemaName,
                                            attackComplexity: this.getComponent(
                                                i2.Cvss3P0Components.AC
                                            ).jsonSchemaName,
                                            privilegesRequired:
                                                this.getComponent(
                                                    i2.Cvss3P0Components.PR
                                                ).jsonSchemaName,
                                            userInteraction: this.getComponent(
                                                i2.Cvss3P0Components.UI
                                            ).jsonSchemaName,
                                            scope: this.getComponent(
                                                i2.Cvss3P0Components.S
                                            ).jsonSchemaName,
                                            confidentialityImpact:
                                                this.getComponent(
                                                    i2.Cvss3P0Components.C
                                                ).jsonSchemaName,
                                            integrityImpact: this.getComponent(
                                                i2.Cvss3P0Components.I
                                            ).jsonSchemaName,
                                            availabilityImpact:
                                                this.getComponent(
                                                    i2.Cvss3P0Components.A
                                                ).jsonSchemaName,
                                            exploitCodeMaturity:
                                                this.getComponent(
                                                    i2.Cvss3P0Components.E
                                                ).jsonSchemaName,
                                            remediationLevel: this.getComponent(
                                                i2.Cvss3P0Components.RL
                                            ).jsonSchemaName,
                                            reportConfidence: this.getComponent(
                                                i2.Cvss3P0Components.RC
                                            ).jsonSchemaName,
                                            confidentialityRequirement:
                                                this.getComponent(
                                                    i2.Cvss3P0Components.CR
                                                ).jsonSchemaName,
                                            integrityRequirement:
                                                this.getComponent(
                                                    i2.Cvss3P0Components.IR
                                                ).jsonSchemaName,
                                            availabilityRequirement:
                                                this.getComponent(
                                                    i2.Cvss3P0Components.AR
                                                ).jsonSchemaName,
                                            modifiedAttackVector:
                                                this.getComponent(
                                                    i2.Cvss3P0Components.MAV
                                                ).jsonSchemaName,
                                            modifiedAttackComplexity:
                                                this.getComponent(
                                                    i2.Cvss3P0Components.MAC
                                                ).jsonSchemaName,
                                            modifiedPrivilegesRequired:
                                                this.getComponent(
                                                    i2.Cvss3P0Components.MPR
                                                ).jsonSchemaName,
                                            modifiedUserInteraction:
                                                this.getComponent(
                                                    i2.Cvss3P0Components.MUI
                                                ).jsonSchemaName,
                                            modifiedScope: this.getComponent(
                                                i2.Cvss3P0Components.MS
                                            ).jsonSchemaName,
                                            modifiedConfidentialityImpact:
                                                this.getComponent(
                                                    i2.Cvss3P0Components.MC
                                                ).jsonSchemaName,
                                            modifiedIntegrityImpact:
                                                this.getComponent(
                                                    i2.Cvss3P0Components.MI
                                                ).jsonSchemaName,
                                            modifiedAvailabilityImpact:
                                                this.getComponent(
                                                    i2.Cvss3P0Components.MA
                                                ).jsonSchemaName,
                                        };
                                    }
                                }
                                ((t3.Cvss3P0 = s2),
                                    (s2.SCOPE_CHANGED_FACTOR = 7.52),
                                    (s2.SCOPE_UNCHANGED_FACTOR = 6.42),
                                    (s2.EXPLOITABILITY_COEFFICIENT = 8.22),
                                    (s2.SCOPE_COEFFICIENT = 1.08));
                            },
                            730: (e4, t3) => {
                                (Object.defineProperty(t3, "__esModule", {
                                    value: true,
                                }),
                                    (t3.EQ = void 0));
                                class o2 {
                                    constructor(e5, t4, o3, a2) {
                                        ((this.highestSeverityVectors = []),
                                            (this.level = e5),
                                            (this.vectorDepth = t4),
                                            (this.highestSeverityVectorsUnparsed =
                                                o3),
                                            (this.predicate = a2));
                                    }
                                    getLevel() {
                                        return this.level;
                                    }
                                    getLevelAsInt() {
                                        return parseInt(this.level);
                                    }
                                    getVectorDepth() {
                                        return this.vectorDepth;
                                    }
                                    getHighestSeverityVectors() {
                                        return (
                                            0 ===
                                                this.highestSeverityVectors
                                                    .length &&
                                                (this.highestSeverityVectors =
                                                    this.highestSeverityVectorsUnparsed.map(
                                                        (e5) =>
                                                            o2.createCvssInstance(
                                                                e5
                                                            )
                                                    )),
                                            this.highestSeverityVectors
                                        );
                                    }
                                    getHighestSeverityVectorsUnparsed() {
                                        return this
                                            .highestSeverityVectorsUnparsed;
                                    }
                                    matchesConstraints(e5) {
                                        return this.predicate(e5);
                                    }
                                }
                                t3.EQ = o2;
                            },
                            759: (e4, t3) => {
                                (Object.defineProperty(t3, "__esModule", {
                                    value: true,
                                }),
                                    (t3.Cvss4P0Components = void 0));
                                class o2 {}
                                ((t3.Cvss4P0Components = o2),
                                    (o2.VULNERABLE_SYSTEM_CONFIDENTIALITY_BASE_VALUES =
                                        {
                                            X: {
                                                shortName: "X",
                                                name: "Not Defined",
                                                abbreviatedName: "Not Def.",
                                                jsonSchemaName: "NOT_DEFINED",
                                                description:
                                                    "Component is not defined.",
                                            },
                                            H: {
                                                shortName: "H",
                                                name: "High",
                                                jsonSchemaName: "HIGH",
                                                description:
                                                    "There is a total loss of confidentiality, resulting in all information within the Vulnerable System being divulged to the attacker. Alternatively, access to only some restricted information is obtained, but the disclosed information presents a direct, serious impact.",
                                            },
                                            L: {
                                                shortName: "L",
                                                name: "Low",
                                                jsonSchemaName: "LOW",
                                                description:
                                                    "There is some loss of confidentiality. Access to some restricted information is obtained, but the attacker does not have control over what information is obtained, or the amount or kind of loss is limited. The information disclosure does not cause a direct, serious loss to the Vulnerable System.",
                                            },
                                            N: {
                                                shortName: "N",
                                                name: "None",
                                                jsonSchemaName: "NONE",
                                                description:
                                                    "There is no loss of confidentiality within the Vulnerable System.",
                                            },
                                        }),
                                    (o2.VULNERABLE_SYSTEM_CONFIDENTIALITY_BASE =
                                        [
                                            o2
                                                .VULNERABLE_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .X,
                                            o2
                                                .VULNERABLE_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .H,
                                            o2
                                                .VULNERABLE_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .L,
                                            o2
                                                .VULNERABLE_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .N,
                                        ]),
                                    (o2.VULNERABLE_SYSTEM_INTEGRITY_BASE_VALUES =
                                        {
                                            X: {
                                                shortName: "X",
                                                name: "Not Defined",
                                                abbreviatedName: "Not Def.",
                                                jsonSchemaName: "NOT_DEFINED",
                                                description:
                                                    "Component is not defined.",
                                            },
                                            H: {
                                                shortName: "H",
                                                name: "High",
                                                jsonSchemaName: "HIGH",
                                                description:
                                                    "There is a total loss of integrity, or a complete loss of protection. For example, the attacker is able to modify any/all files protected by the Vulnerable System. Alternatively, only some files can be modified, but malicious modification would present a direct, serious consequence to the Vulnerable System.",
                                            },
                                            L: {
                                                shortName: "L",
                                                name: "Low",
                                                jsonSchemaName: "LOW",
                                                description:
                                                    "Modification of data is possible, but the attacker does not have control over the consequence of a modification, or the amount of modification is limited. The data modification does not have a direct, serious impact to the Vulnerable System.",
                                            },
                                            N: {
                                                shortName: "N",
                                                name: "None",
                                                jsonSchemaName: "NONE",
                                                description:
                                                    "There is no loss of integrity within the Vulnerable System.",
                                            },
                                        }),
                                    (o2.VULNERABLE_SYSTEM_INTEGRITY_BASE = [
                                        o2
                                            .VULNERABLE_SYSTEM_INTEGRITY_BASE_VALUES
                                            .X,
                                        o2
                                            .VULNERABLE_SYSTEM_INTEGRITY_BASE_VALUES
                                            .H,
                                        o2
                                            .VULNERABLE_SYSTEM_INTEGRITY_BASE_VALUES
                                            .L,
                                        o2
                                            .VULNERABLE_SYSTEM_INTEGRITY_BASE_VALUES
                                            .N,
                                    ]),
                                    (o2.VULNERABLE_SYSTEM_AVAILABILITY_BASE_VALUES =
                                        {
                                            X: {
                                                shortName: "X",
                                                name: "Not Defined",
                                                abbreviatedName: "Not Def.",
                                                jsonSchemaName: "NOT_DEFINED",
                                                description:
                                                    "Component is not defined.",
                                            },
                                            H: {
                                                shortName: "H",
                                                name: "High",
                                                jsonSchemaName: "HIGH",
                                                description:
                                                    "There is a total loss of availability, resulting in the attacker being able to fully deny access to resources in the Vulnerable System; this loss is either sustained (while the attacker continues to deliver the attack) or persistent (the condition persists even after the attack has completed). Alternatively, the attacker has the ability to deny some availability, but the loss of availability presents a direct, serious consequence to the Vulnerable System (e.g., the attacker cannot disrupt existing connections, but can prevent new connections; the attacker can repeatedly exploit a vulnerability that, in each instance of a successful attack, leaks a only small amount of memory, but after repeated exploitation causes a service to become completely unavailable).",
                                            },
                                            L: {
                                                shortName: "L",
                                                name: "Low",
                                                jsonSchemaName: "LOW",
                                                description:
                                                    "Performance is reduced or there are interruptions in resource availability. Even if repeated exploitation of the vulnerability is possible, the attacker does not have the ability to completely deny service to legitimate users. The resources in the Vulnerable System are either partially available all of the time, or fully available only some of the time, but overall there is no direct, serious consequence to the Vulnerable System.",
                                            },
                                            N: {
                                                shortName: "N",
                                                name: "None",
                                                jsonSchemaName: "NONE",
                                                description:
                                                    "There is no impact to availability within the Vulnerable System.",
                                            },
                                        }),
                                    (o2.VULNERABLE_SYSTEM_AVAILABILITY_BASE = [
                                        o2
                                            .VULNERABLE_SYSTEM_AVAILABILITY_BASE_VALUES
                                            .X,
                                        o2
                                            .VULNERABLE_SYSTEM_AVAILABILITY_BASE_VALUES
                                            .H,
                                        o2
                                            .VULNERABLE_SYSTEM_AVAILABILITY_BASE_VALUES
                                            .L,
                                        o2
                                            .VULNERABLE_SYSTEM_AVAILABILITY_BASE_VALUES
                                            .N,
                                    ]),
                                    (o2.SUBSEQUENT_SYSTEM_CONFIDENTIALITY_BASE_VALUES =
                                        {
                                            X: {
                                                shortName: "X",
                                                name: "Not Defined",
                                                abbreviatedName: "Not Def.",
                                                jsonSchemaName: "NOT_DEFINED",
                                                description:
                                                    "Component is not defined.",
                                            },
                                            S: {
                                                shortName: "S",
                                                name: "Safety",
                                                jsonSchemaName: "SAFETY",
                                                description:
                                                    "! NOT A VALID VALUE FOR Safety (S), REQUIRED FOR CALCULATION OF SCORE !",
                                                hide: true,
                                            },
                                            H: {
                                                shortName: "H",
                                                name: "High",
                                                jsonSchemaName: "HIGH",
                                                description:
                                                    "There is a total loss of confidentiality, resulting in all resources within the Subsequent System being divulged to the attacker. Alternatively, access to only some restricted information is obtained, but the disclosed information presents a direct, serious impact.",
                                            },
                                            L: {
                                                shortName: "L",
                                                name: "Low",
                                                jsonSchemaName: "LOW",
                                                description:
                                                    "There is some loss of confidentiality. Access to some restricted information is obtained, but the attacker does not have control over what information is obtained, or the amount or kind of loss is limited. The information disclosure does not cause a direct, serious loss to the Subsequent System.",
                                            },
                                            N: {
                                                shortName: "N",
                                                name: "None",
                                                jsonSchemaName: "NONE",
                                                description:
                                                    "There is no loss of confidentiality within the Subsequent System or all confidentiality impact is constrained to the Vulnerable System.",
                                            },
                                        }),
                                    (o2.SUBSEQUENT_SYSTEM_CONFIDENTIALITY_BASE =
                                        [
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .X,
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .S,
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .H,
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .L,
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .N,
                                        ]),
                                    (o2.SUBSEQUENT_SYSTEM_INTEGRITY_BASE_VALUES =
                                        {
                                            X: {
                                                shortName: "X",
                                                name: "Not Defined",
                                                abbreviatedName: "Not Def.",
                                                jsonSchemaName: "NOT_DEFINED",
                                                description:
                                                    "Component is not defined.",
                                            },
                                            S: {
                                                shortName: "S",
                                                name: "Safety",
                                                jsonSchemaName: "SAFETY",
                                                description:
                                                    "! NOT A VALID VALUE FOR Safety (S), REQUIRED FOR CALCULATION OF SCORE !",
                                                hide: true,
                                            },
                                            H: {
                                                shortName: "H",
                                                name: "High",
                                                jsonSchemaName: "HIGH",
                                                description:
                                                    "There is a total loss of integrity, or a complete loss of protection. For example, the attacker is able to modify any/all files protected by the Subsequent System. Alternatively, only some files can be modified, but malicious modification would present a direct, serious consequence to the Subsequent System.",
                                            },
                                            L: {
                                                shortName: "L",
                                                name: "Low",
                                                jsonSchemaName: "LOW",
                                                description:
                                                    "Modification of data is possible, but the attacker does not have control over the consequence of a modification, or the amount of modification is limited. The data modification does not have a direct, serious impact to the Subsequent System.",
                                            },
                                            N: {
                                                shortName: "N",
                                                name: "None",
                                                jsonSchemaName: "NONE",
                                                description:
                                                    "There is no loss of integrity within the Subsequent System or all integrity impact is constrained to the Vulnerable System.",
                                            },
                                        }),
                                    (o2.SUBSEQUENT_SYSTEM_INTEGRITY_BASE = [
                                        o2
                                            .SUBSEQUENT_SYSTEM_INTEGRITY_BASE_VALUES
                                            .X,
                                        o2
                                            .SUBSEQUENT_SYSTEM_INTEGRITY_BASE_VALUES
                                            .S,
                                        o2
                                            .SUBSEQUENT_SYSTEM_INTEGRITY_BASE_VALUES
                                            .H,
                                        o2
                                            .SUBSEQUENT_SYSTEM_INTEGRITY_BASE_VALUES
                                            .L,
                                        o2
                                            .SUBSEQUENT_SYSTEM_INTEGRITY_BASE_VALUES
                                            .N,
                                    ]),
                                    (o2.SUBSEQUENT_SYSTEM_AVAILABILITY_BASE_VALUES =
                                        {
                                            X: {
                                                shortName: "X",
                                                name: "Not Defined",
                                                abbreviatedName: "Not Def.",
                                                jsonSchemaName: "NOT_DEFINED",
                                                description:
                                                    "Component is not defined.",
                                            },
                                            S: {
                                                shortName: "S",
                                                name: "Safety",
                                                jsonSchemaName: "SAFETY",
                                                description:
                                                    "! NOT A VALID VALUE FOR Safety (S), REQUIRED FOR CALCULATION OF SCORE !",
                                                hide: true,
                                            },
                                            H: {
                                                shortName: "H",
                                                name: "High",
                                                jsonSchemaName: "HIGH",
                                                description:
                                                    "There is a total loss of availability, resulting in the attacker being able to fully deny access to resources in the Subsequent System; this loss is either sustained (while the attacker continues to deliver the attack) or persistent (the condition persists even after the attack has completed). Alternatively, the attacker has the ability to deny some availability, but the loss of availability presents a direct, serious consequence to the Subsequent System (e.g., the attacker cannot disrupt existing connections, but can prevent new connections; the attacker can repeatedly exploit a vulnerability that, in each instance of a successful attack, leaks a only small amount of memory, but after repeated exploitation causes a service to become completely unavailable).",
                                            },
                                            L: {
                                                shortName: "L",
                                                name: "Low",
                                                jsonSchemaName: "LOW",
                                                description:
                                                    "Performance is reduced or there are interruptions in resource availability. Even if repeated exploitation of the vulnerability is possible, the attacker does not have the ability to completely deny service to legitimate users. The resources in the Subsequent System are either partially available all of the time, or fully available only some of the time, but overall there is no direct, serious consequence to the Subsequent System.",
                                            },
                                            N: {
                                                shortName: "N",
                                                name: "None",
                                                jsonSchemaName: "NONE",
                                                description:
                                                    "There is no impact to availability within the Subsequent System or all availability impact is constrained to the Vulnerable System.",
                                            },
                                        }),
                                    (o2.SUBSEQUENT_SYSTEM_AVAILABILITY_BASE = [
                                        o2
                                            .SUBSEQUENT_SYSTEM_AVAILABILITY_BASE_VALUES
                                            .X,
                                        o2
                                            .SUBSEQUENT_SYSTEM_AVAILABILITY_BASE_VALUES
                                            .S,
                                        o2
                                            .SUBSEQUENT_SYSTEM_AVAILABILITY_BASE_VALUES
                                            .H,
                                        o2
                                            .SUBSEQUENT_SYSTEM_AVAILABILITY_BASE_VALUES
                                            .L,
                                        o2
                                            .SUBSEQUENT_SYSTEM_AVAILABILITY_BASE_VALUES
                                            .N,
                                    ]),
                                    (o2.SUBSEQUENT_SYSTEM_CONFIDENTIALITY_MODIFIED_VALUES =
                                        {
                                            X: {
                                                shortName: "X",
                                                name: "Not Defined",
                                                abbreviatedName: "Not Def.",
                                                jsonSchemaName: "NOT_DEFINED",
                                                description:
                                                    "Component is not defined.",
                                            },
                                            H: {
                                                shortName: "H",
                                                name: "High",
                                                jsonSchemaName: "HIGH",
                                                description:
                                                    "There is a total loss of confidentiality, resulting in all resources within the Subsequent System being divulged to the attacker. Alternatively, access to only some restricted information is obtained, but the disclosed information presents a direct, serious impact.",
                                            },
                                            L: {
                                                shortName: "L",
                                                name: "Low",
                                                jsonSchemaName: "LOW",
                                                description:
                                                    "There is some loss of confidentiality. Access to some restricted information is obtained, but the attacker does not have control over what information is obtained, or the amount or kind of loss is limited. The information disclosure does not cause a direct, serious loss to the Subsequent System.",
                                            },
                                            N: {
                                                shortName: "N",
                                                name: "Negligible",
                                                abbreviatedName: "Negl.",
                                                jsonSchemaName: "NEGLIGIBLE",
                                                description:
                                                    "There is no loss of confidentiality within the Subsequent System or all confidentiality impact is constrained to the Vulnerable System.",
                                            },
                                        }),
                                    (o2.SUBSEQUENT_SYSTEM_CONFIDENTIALITY_MODIFIED =
                                        [
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_MODIFIED_VALUES
                                                .X,
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_MODIFIED_VALUES
                                                .H,
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_MODIFIED_VALUES
                                                .L,
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_MODIFIED_VALUES
                                                .N,
                                        ]),
                                    (o2.SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED_VALUES =
                                        {
                                            X: {
                                                shortName: "X",
                                                name: "Not Defined",
                                                abbreviatedName: "Not Def.",
                                                jsonSchemaName: "NOT_DEFINED",
                                                description:
                                                    "Component is not defined.",
                                            },
                                            S: {
                                                shortName: "S",
                                                name: "Safety",
                                                jsonSchemaName: "SAFETY",
                                                description:
                                                    'The exploited vulnerability will result in integrity impacts that could cause serious injury or worse (categories of "Marginal" or worse as described in IEC 61508) to a human actor or participant.',
                                            },
                                            H: {
                                                shortName: "H",
                                                name: "High",
                                                jsonSchemaName: "HIGH",
                                                description:
                                                    "There is a total loss of integrity, or a complete loss of protection. For example, the attacker is able to modify any/all files protected by the Subsequent System. Alternatively, only some files can be modified, but malicious modification would present a direct, serious consequence to the Subsequent System.",
                                            },
                                            L: {
                                                shortName: "L",
                                                name: "Low",
                                                jsonSchemaName: "LOW",
                                                description:
                                                    "Modification of data is possible, but the attacker does not have control over the consequence of a modification, or the amount of modification is limited. The data modification does not have a direct, serious impact to the Subsequent System.",
                                            },
                                            N: {
                                                shortName: "N",
                                                name: "Negligible",
                                                abbreviatedName: "Negl.",
                                                jsonSchemaName: "NEGLIGIBLE",
                                                description:
                                                    "There is no loss of integrity within the Subsequent System or all integrity impact is constrained to the Vulnerable System.",
                                            },
                                        }),
                                    (o2.SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED = [
                                        o2
                                            .SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED_VALUES
                                            .X,
                                        o2
                                            .SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED_VALUES
                                            .S,
                                        o2
                                            .SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED_VALUES
                                            .H,
                                        o2
                                            .SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED_VALUES
                                            .L,
                                        o2
                                            .SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED_VALUES
                                            .N,
                                    ]),
                                    (o2.SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED_VALUES =
                                        {
                                            X: {
                                                shortName: "X",
                                                name: "Not Defined",
                                                abbreviatedName: "Not Def.",
                                                jsonSchemaName: "NOT_DEFINED",
                                                description:
                                                    "Component is not defined.",
                                            },
                                            S: {
                                                shortName: "S",
                                                name: "Safety",
                                                jsonSchemaName: "SAFETY",
                                                description:
                                                    'The exploited vulnerability will result in availability impacts that could cause serious injury or worse (categories of "Marginal" or worse as described in IEC 61508) to a human actor or participant.',
                                            },
                                            H: {
                                                shortName: "H",
                                                name: "High",
                                                jsonSchemaName: "HIGH",
                                                description:
                                                    "There is a total loss of availability, resulting in the attacker being able to fully deny access to resources in the Subsequent System; this loss is either sustained (while the attacker continues to deliver the attack) or persistent (the condition persists even after the attack has completed). Alternatively, the attacker has the ability to deny some availability, but the loss of availability presents a direct, serious consequence to the Subsequent System (e.g., the attacker cannot disrupt existing connections, but can prevent new connections; the attacker can repeatedly exploit a vulnerability that, in each instance of a successful attack, leaks a only small amount of memory, but after repeated exploitation causes a service to become completely unavailable).",
                                            },
                                            L: {
                                                shortName: "L",
                                                name: "Low",
                                                jsonSchemaName: "LOW",
                                                description:
                                                    "Performance is reduced or there are interruptions in resource availability. Even if repeated exploitation of the vulnerability is possible, the attacker does not have the ability to completely deny service to legitimate users. The resources in the Subsequent System are either partially available all of the time, or fully available only some of the time, but overall there is no direct, serious consequence to the Subsequent System.",
                                            },
                                            N: {
                                                shortName: "N",
                                                name: "Negligible",
                                                abbreviatedName: "Negl.",
                                                jsonSchemaName: "NEGLIGIBLE",
                                                description:
                                                    "There is no impact to availability within the Subsequent System or all availability impact is constrained to the Vulnerable System.",
                                            },
                                        }),
                                    (o2.SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED =
                                        [
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED_VALUES
                                                .X,
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED_VALUES
                                                .S,
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED_VALUES
                                                .H,
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED_VALUES
                                                .L,
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED_VALUES
                                                .N,
                                        ]),
                                    (o2.REQUIREMENT_CONFIDENTIALITY_MODIFIED_VALUES =
                                        {
                                            X: {
                                                shortName: "X",
                                                name: "Not Defined",
                                                abbreviatedName: "Not Def.",
                                                jsonSchemaName: "NOT_DEFINED",
                                                description:
                                                    "Component is not defined.",
                                            },
                                            H: {
                                                shortName: "H",
                                                name: "High",
                                                jsonSchemaName: "HIGH",
                                                description:
                                                    "Loss of Confidentiality is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                            },
                                            M: {
                                                shortName: "M",
                                                name: "Medium",
                                                jsonSchemaName: "MEDIUM",
                                                description:
                                                    "Loss of Confidentiality is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                            },
                                            L: {
                                                shortName: "L",
                                                name: "Low",
                                                jsonSchemaName: "LOW",
                                                description:
                                                    "Loss of Confidentiality is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                            },
                                        }),
                                    (o2.REQUIREMENT_CONFIDENTIALITY_MODIFIED = [
                                        o2
                                            .REQUIREMENT_CONFIDENTIALITY_MODIFIED_VALUES
                                            .X,
                                        o2
                                            .REQUIREMENT_CONFIDENTIALITY_MODIFIED_VALUES
                                            .H,
                                        o2
                                            .REQUIREMENT_CONFIDENTIALITY_MODIFIED_VALUES
                                            .M,
                                        o2
                                            .REQUIREMENT_CONFIDENTIALITY_MODIFIED_VALUES
                                            .L,
                                    ]),
                                    (o2.REQUIREMENT_INTEGRITY_MODIFIED_VALUES =
                                        {
                                            X: {
                                                shortName: "X",
                                                name: "Not Defined",
                                                abbreviatedName: "Not Def.",
                                                jsonSchemaName: "NOT_DEFINED",
                                                description:
                                                    "Component is not defined.",
                                            },
                                            H: {
                                                shortName: "H",
                                                name: "High",
                                                jsonSchemaName: "HIGH",
                                                description:
                                                    "Loss of Integrity is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                            },
                                            M: {
                                                shortName: "M",
                                                name: "Medium",
                                                jsonSchemaName: "MEDIUM",
                                                description:
                                                    "Loss of Integrity is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                            },
                                            L: {
                                                shortName: "L",
                                                name: "Low",
                                                jsonSchemaName: "LOW",
                                                description:
                                                    "Loss of Integrity is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                            },
                                        }),
                                    (o2.REQUIREMENT_INTEGRITY_MODIFIED = [
                                        o2.REQUIREMENT_INTEGRITY_MODIFIED_VALUES
                                            .X,
                                        o2.REQUIREMENT_INTEGRITY_MODIFIED_VALUES
                                            .H,
                                        o2.REQUIREMENT_INTEGRITY_MODIFIED_VALUES
                                            .M,
                                        o2.REQUIREMENT_INTEGRITY_MODIFIED_VALUES
                                            .L,
                                    ]),
                                    (o2.REQUIREMENT_AVAILABILITY_MODIFIED_VALUES =
                                        {
                                            X: {
                                                shortName: "X",
                                                name: "Not Defined",
                                                abbreviatedName: "Not Def.",
                                                jsonSchemaName: "NOT_DEFINED",
                                                description:
                                                    "Component is not defined.",
                                            },
                                            H: {
                                                shortName: "H",
                                                name: "High",
                                                jsonSchemaName: "HIGH",
                                                description:
                                                    "Loss of Availability is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                            },
                                            M: {
                                                shortName: "M",
                                                name: "Medium",
                                                jsonSchemaName: "MEDIUM",
                                                description:
                                                    "Loss of Availability is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                            },
                                            L: {
                                                shortName: "L",
                                                name: "Low",
                                                jsonSchemaName: "LOW",
                                                description:
                                                    "Loss of Availability is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                            },
                                        }),
                                    (o2.REQUIREMENT_AVAILABILITY_MODIFIED = [
                                        o2
                                            .REQUIREMENT_AVAILABILITY_MODIFIED_VALUES
                                            .X,
                                        o2
                                            .REQUIREMENT_AVAILABILITY_MODIFIED_VALUES
                                            .H,
                                        o2
                                            .REQUIREMENT_AVAILABILITY_MODIFIED_VALUES
                                            .M,
                                        o2
                                            .REQUIREMENT_AVAILABILITY_MODIFIED_VALUES
                                            .L,
                                    ]),
                                    (o2.AV_VALUES = {
                                        X: {
                                            shortName: "X",
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description: "Not Defined",
                                        },
                                        N: {
                                            shortName: "N",
                                            name: "Network",
                                            jsonSchemaName: "NETWORK",
                                            description:
                                                "The vulnerable system is bound to the network stack and the set of possible attackers extends beyond the other options listed below, up to and including the entire Internet. Such a vulnerability is often termed \u201Cremotely exploitable\u201D and can be thought of as an attack being exploitable at the protocol level one or more network hops away (e.g., across one or more routers). An example of a network attack is an attacker causing a denial of service (DoS) by sending a specially crafted TCP packet across a wide area network.",
                                        },
                                        A: {
                                            shortName: "A",
                                            name: "Adjacent Network",
                                            abbreviatedName: "Adj. Network",
                                            jsonSchemaName: "ADJACENT",
                                            description:
                                                "The vulnerable system is bound to a protocol stack, but the attack is limited at the protocol level to a logically adjacent topology. This can mean an attack must be launched from the same shared proximity (e.g., Bluetooth, NFC, or IEEE 802.11) or logical network (e.g., local IP subnet), or from within a secure or otherwise limited administrative domain (e.g., MPLS, secure VPN within an administrative network zone). One example of an Adjacent attack would be an ARP (IPv4) or neighbor discovery (IPv6) flood leading to a denial of service on the local LAN segment.",
                                        },
                                        L: {
                                            shortName: "L",
                                            name: "Local",
                                            jsonSchemaName: "LOCAL",
                                            description:
                                                "The vulnerable system is not bound to the network stack and the attacker\u2019s path is via read/write/execute capabilities. Either: the attacker exploits the vulnerability by accessing the target system locally (e.g., keyboard, console), or through terminal emulation (e.g., SSH); or the attacker relies on User Interaction by another person to perform actions required to exploit the vulnerability (e.g., using social engineering techniques to trick a legitimate user into opening a malicious document).",
                                        },
                                        P: {
                                            shortName: "P",
                                            name: "Physical",
                                            abbreviatedName: "Phys.",
                                            jsonSchemaName: "PHYSICAL",
                                            description:
                                                "The attack requires the attacker to physically touch or manipulate the vulnerable system. Physical interaction may be brief (e.g., evil maid attack) or persistent. An example of such an attack is a cold boot attack in which an attacker gains access to disk encryption keys after physically accessing the target system. Other examples include peripheral attacks via FireWire/USB Direct Memory Access (DMA).",
                                        },
                                    }),
                                    (o2.AV = {
                                        name: "Attack Vector",
                                        shortName: "AV",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric reflects the context by which vulnerability exploitation is possible.",
                                        values: [
                                            o2.AV_VALUES.X,
                                            o2.AV_VALUES.N,
                                            o2.AV_VALUES.A,
                                            o2.AV_VALUES.L,
                                            o2.AV_VALUES.P,
                                        ],
                                        worseCaseValue: o2.AV_VALUES.N,
                                    }),
                                    (o2.AC_VALUES = {
                                        X: {
                                            shortName: "X",
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description: "Not Defined",
                                        },
                                        L: {
                                            shortName: "L",
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "The attacker must take no measurable action to exploit the vulnerability. The attack requires no target-specific circumvention to exploit the vulnerability. An attacker can expect repeatable success against the vulnerable system.",
                                        },
                                        H: {
                                            shortName: "H",
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "successful attack depends on the evasion or circumvention of security-enhancing techniques in place that would otherwise hinder the attack. The attacker must have additional methods available to bypass security measures in place.",
                                        },
                                    }),
                                    (o2.AC = {
                                        name: "Attack Complexity",
                                        shortName: "AC",
                                        subCategory: "Exploitability Metrics",
                                        description: "",
                                        values: [
                                            o2.AC_VALUES.X,
                                            o2.AC_VALUES.L,
                                            o2.AC_VALUES.H,
                                        ],
                                        worseCaseValue: o2.AC_VALUES.L,
                                    }),
                                    (o2.AT_VALUES = {
                                        X: {
                                            shortName: "X",
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description: "Not Defined",
                                        },
                                        N: {
                                            shortName: "N",
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "The successful attack does not depend on the deployment and execution conditions of the vulnerable system. The attacker can expect to be able to reach the vulnerability and execute the exploit under all or most instances of the vulnerability.",
                                        },
                                        P: {
                                            shortName: "P",
                                            name: "Present",
                                            jsonSchemaName: "PRESENT",
                                            description:
                                                "The successful attack depends on the presence of specific deployment and execution conditions of the vulnerable system that enable the attack. The successfulness of the attack is conditioned on execution conditions that are not under full control of the attacker. The attack may need to be launched multiple times against a single target before being successful. Network injection. The attacker must inject themselves into the logical network path between the target and the resource requested by the victim (e.g. vulnerabilities requiring an on-path attacker).",
                                        },
                                    }),
                                    (o2.AT = {
                                        name: "Attack Requirements",
                                        shortName: "AT",
                                        subCategory: "Exploitability Metrics",
                                        description: "",
                                        values: [
                                            o2.AT_VALUES.X,
                                            o2.AT_VALUES.N,
                                            o2.AT_VALUES.P,
                                        ],
                                        worseCaseValue: o2.AT_VALUES.N,
                                    }),
                                    (o2.PR_VALUES = {
                                        X: {
                                            shortName: "X",
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description: "Not Defined",
                                        },
                                        N: {
                                            shortName: "N",
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "The attacker is unauthenticated prior to attack, and therefore does not require any access to settings or files of the vulnerable system to carry out an attack.",
                                        },
                                        L: {
                                            shortName: "L",
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "The attacker requires privileges that provide basic capabilities that are typically limited to settings and resources owned by a single low-privileged user. Alternatively, an attacker with Low privileges has the ability to access only non-sensitive resources.",
                                        },
                                        H: {
                                            shortName: "H",
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "The attacker requires privileges that provide significant (e.g., administrative) control over the vulnerable system allowing full access to the vulnerable system\u2019s settings and files.",
                                        },
                                    }),
                                    (o2.PR = {
                                        name: "Privileges Required",
                                        shortName: "PR",
                                        subCategory: "Exploitability Metrics",
                                        description: "",
                                        values: [
                                            o2.PR_VALUES.X,
                                            o2.PR_VALUES.N,
                                            o2.PR_VALUES.L,
                                            o2.PR_VALUES.H,
                                        ],
                                        worseCaseValue: o2.PR_VALUES.N,
                                    }),
                                    (o2.UI_VALUES = {
                                        X: {
                                            shortName: "X",
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description: "Not Defined",
                                        },
                                        N: {
                                            shortName: "N",
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "The vulnerable system can be exploited without interaction from any human user, other than the attacker. Examples include: a remote attacker is able to send packets to a target system a locally authenticated attacker executes code to elevate privileges",
                                        },
                                        P: {
                                            shortName: "P",
                                            name: "Passive",
                                            jsonSchemaName: "PASSIVE",
                                            description:
                                                "Successful exploitation of this vulnerability requires limited interaction by the targeted user with the vulnerable system and the attacker\u2019s payload. These interactions would be considered involuntary and do not require that the user actively subvert protections built into the vulnerable system.",
                                        },
                                        A: {
                                            shortName: "A",
                                            name: "Active",
                                            jsonSchemaName: "ACTIVE",
                                            description:
                                                "Successful exploitation of this vulnerability requires a targeted user to perform specific, conscious interactions with the vulnerable system and the attacker\u2019s payload, or the user\u2019s interactions would actively subvert protection mechanisms which would lead to exploitation of the vulnerability.",
                                        },
                                    }),
                                    (o2.UI = {
                                        name: "User Interaction",
                                        shortName: "UI",
                                        subCategory: "Exploitability Metrics",
                                        description: "",
                                        values: [
                                            o2.UI_VALUES.X,
                                            o2.UI_VALUES.N,
                                            o2.UI_VALUES.P,
                                            o2.UI_VALUES.A,
                                        ],
                                        worseCaseValue: o2.UI_VALUES.N,
                                    }),
                                    (o2.VC = {
                                        name: "Confidentiality",
                                        shortName: "VC",
                                        subCategory: "Vulnerable System Impact",
                                        description: "",
                                        values: o2.VULNERABLE_SYSTEM_CONFIDENTIALITY_BASE,
                                        worseCaseValue:
                                            o2
                                                .VULNERABLE_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .H,
                                    }),
                                    (o2.VI = {
                                        name: "Integrity",
                                        shortName: "VI",
                                        subCategory: "Vulnerable System Impact",
                                        description: "",
                                        values: o2.VULNERABLE_SYSTEM_INTEGRITY_BASE,
                                        worseCaseValue:
                                            o2
                                                .VULNERABLE_SYSTEM_INTEGRITY_BASE_VALUES
                                                .H,
                                    }),
                                    (o2.VA = {
                                        name: "Availability",
                                        shortName: "VA",
                                        subCategory: "Vulnerable System Impact",
                                        description: "",
                                        values: o2.VULNERABLE_SYSTEM_AVAILABILITY_BASE,
                                        worseCaseValue:
                                            o2
                                                .VULNERABLE_SYSTEM_AVAILABILITY_BASE_VALUES
                                                .H,
                                    }),
                                    (o2.SC = {
                                        name: "Confidentiality",
                                        shortName: "SC",
                                        subCategory: "Subsequent System Impact",
                                        description: "",
                                        values: o2.SUBSEQUENT_SYSTEM_CONFIDENTIALITY_BASE,
                                        worseCaseValue:
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .H,
                                    }),
                                    (o2.SI = {
                                        name: "Integrity",
                                        shortName: "SI",
                                        subCategory: "Subsequent System Impact",
                                        description: "",
                                        values: o2.SUBSEQUENT_SYSTEM_INTEGRITY_BASE,
                                        worseCaseValue:
                                            o2
                                                .SUBSEQUENT_SYSTEM_INTEGRITY_BASE_VALUES
                                                .H,
                                    }),
                                    (o2.SA = {
                                        name: "Availability",
                                        shortName: "SA",
                                        subCategory: "Subsequent System Impact",
                                        description: "",
                                        values: o2.SUBSEQUENT_SYSTEM_AVAILABILITY_BASE,
                                        worseCaseValue:
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_BASE_VALUES
                                                .H,
                                    }),
                                    (o2.S_VALUES = {
                                        X: {
                                            shortName: "X",
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "The metric has not been evaluated.",
                                        },
                                        N: {
                                            shortName: "N",
                                            name: "Negligible",
                                            abbreviatedName: "Negl.",
                                            jsonSchemaName: "NEGLIGIBLE",
                                            description:
                                                'Consequences of the vulnerability meet definition of IEC 61508 consequence categories of "marginal," "critical," or "catastrophic."',
                                        },
                                        P: {
                                            shortName: "P",
                                            name: "Present",
                                            jsonSchemaName: "PRESENT",
                                            description:
                                                'Consequences of the vulnerability meet definition of IEC 61508 consequence category "negligible."',
                                        },
                                    }),
                                    (o2.S = {
                                        name: "Safety",
                                        shortName: "S",
                                        description: "",
                                        values: [
                                            o2.S_VALUES.X,
                                            o2.S_VALUES.N,
                                            o2.S_VALUES.P,
                                        ],
                                        worseCaseValue: o2.S_VALUES.P,
                                    }),
                                    (o2.AU_VALUES = {
                                        X: {
                                            shortName: "X",
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "The metric has not been evaluated.",
                                        },
                                        N: {
                                            shortName: "N",
                                            name: "No",
                                            jsonSchemaName: "NO",
                                            description:
                                                "Attackers cannot reliably automate all 4 steps of the kill chain for this vulnerability for some reason. These steps are reconnaissance, weaponization, delivery, and exploitation.",
                                        },
                                        Y: {
                                            shortName: "Y",
                                            name: "Yes",
                                            jsonSchemaName: "YES",
                                            description:
                                                "Attackers can reliably automate all 4 steps of the kill chain. These steps are reconnaissance, weaponization, delivery, and exploitation (e.g., the vulnerability is \u201Cwormable\u201D).",
                                        },
                                    }),
                                    (o2.AU = {
                                        name: "Automated",
                                        shortName: "AU",
                                        description: "",
                                        values: [
                                            o2.AU_VALUES.X,
                                            o2.AU_VALUES.N,
                                            o2.AU_VALUES.Y,
                                        ],
                                        worseCaseValue: o2.AU_VALUES.Y,
                                    }),
                                    (o2.R_VALUES = {
                                        X: {
                                            shortName: "X",
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "The metric has not been evaluated.",
                                        },
                                        A: {
                                            shortName: "A",
                                            name: "Automatic",
                                            abbreviatedName: "Automat.",
                                            jsonSchemaName: "AUTOMATIC",
                                            description:
                                                "The system recovers services automatically after an attack has been performed.",
                                        },
                                        U: {
                                            shortName: "U",
                                            name: "User",
                                            jsonSchemaName: "USER",
                                            description:
                                                "The system requires manual intervention by the user to recover services, after an attack has been performed.",
                                        },
                                        I: {
                                            shortName: "I",
                                            name: "Irrecoverable",
                                            abbreviatedName: "Irrecov.",
                                            jsonSchemaName: "IRRECOVERABLE",
                                            description:
                                                "The system services are irrecoverable by the user, after an attack has been performed.",
                                        },
                                    }),
                                    (o2.R = {
                                        name: "Recovery",
                                        shortName: "R",
                                        description: "",
                                        values: [
                                            o2.R_VALUES.X,
                                            o2.R_VALUES.A,
                                            o2.R_VALUES.U,
                                            o2.R_VALUES.I,
                                        ],
                                        worseCaseValue: o2.R_VALUES.I,
                                    }),
                                    (o2.V_VALUES = {
                                        X: {
                                            shortName: "X",
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "The metric has not been evaluated.",
                                        },
                                        D: {
                                            shortName: "D",
                                            name: "Diffuse",
                                            jsonSchemaName: "DIFFUSE",
                                            description:
                                                "The vulnerable system has limited resources. That is, the resources that the attacker will gain control over with a single exploitation event are relatively small. An example of Diffuse (think: limited) Value Density would be an attack on a single email client vulnerability.",
                                        },
                                        C: {
                                            shortName: "C",
                                            name: "Concentrated",
                                            abbreviatedName: "Concentr.",
                                            jsonSchemaName: "CONCENTRATED",
                                            description:
                                                "The vulnerable system is rich in resources. Heuristically, such systems are often the direct responsibility of \u201Csystem operators\u201D rather than users. An example of Concentrated (think: broad) Value Density would be an attack on a central email server.",
                                        },
                                    }),
                                    (o2.V = {
                                        name: "Value Density",
                                        shortName: "V",
                                        description: "",
                                        values: [
                                            o2.V_VALUES.X,
                                            o2.V_VALUES.D,
                                            o2.V_VALUES.C,
                                        ],
                                        worseCaseValue: o2.V_VALUES.C,
                                    }),
                                    (o2.RE_VALUES = {
                                        X: {
                                            shortName: "X",
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "The metric has not been evaluated.",
                                        },
                                        L: {
                                            shortName: "L",
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "The effort required to respond to a vulnerability is low/trivial. Examples include: communication on better documentation, configuration workarounds, or guidance from the vendor that does not require an immediate update, upgrade, or replacement by the consuming entity, such as firewall filter configuration.",
                                        },
                                        M: {
                                            shortName: "M",
                                            name: "Moderate",
                                            abbreviatedName: "Moder.",
                                            jsonSchemaName: "MODERATE",
                                            description:
                                                "The actions required to respond to a vulnerability require some effort on behalf of the consumer and could cause minimal service impact to implement. Examples include: simple remote update, disabling of a subsystem, or a low-touch software upgrade such as a driver update.",
                                        },
                                        H: {
                                            shortName: "H",
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "The actions required to respond to a vulnerability are significant and/or difficult, and may possibly lead to an extended, scheduled service impact. This would need to be considered for scheduling purposes including honoring any embargo on deployment of the selected response. Alternatively, response to the vulnerability in the field is not possible remotely. The only resolution to the vulnerability involves physical replacement (e.g. units deployed would have to be recalled for a depot level repair or replacement).",
                                        },
                                    }),
                                    (o2.RE = {
                                        name: "Vulnerability Response Effort",
                                        shortName: "RE",
                                        description: "",
                                        values: [
                                            o2.RE_VALUES.X,
                                            o2.RE_VALUES.L,
                                            o2.RE_VALUES.M,
                                            o2.RE_VALUES.H,
                                        ],
                                        worseCaseValue: o2.RE_VALUES.H,
                                    }),
                                    (o2.U_VALUES = {
                                        X: {
                                            shortName: "X",
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "The metric has not been evaluated.",
                                        },
                                        Clear: {
                                            shortName: "Clear",
                                            name: "Clear",
                                            jsonSchemaName: "CLEAR",
                                            description:
                                                "Provider has assessed the impact of this vulnerability as having the highest urgency.",
                                        },
                                        Green: {
                                            shortName: "Green",
                                            name: "Green",
                                            jsonSchemaName: "GREEN",
                                            description:
                                                "Provider has assessed the impact of this vulnerability as having a moderate urgency.",
                                        },
                                        Amber: {
                                            shortName: "Amber",
                                            name: "Amber",
                                            jsonSchemaName: "AMBER",
                                            description:
                                                "Provider has assessed the impact of this vulnerability as having a reduced urgency.",
                                        },
                                        Red: {
                                            shortName: "Red",
                                            name: "Red",
                                            jsonSchemaName: "RED",
                                            description:
                                                "Provider has assessed the impact of this vulnerability as having no urgency (Informational).",
                                        },
                                    }),
                                    (o2.U = {
                                        name: "Provider Urgency",
                                        shortName: "U",
                                        description: "",
                                        values: [
                                            o2.U_VALUES.X,
                                            o2.U_VALUES.Clear,
                                            o2.U_VALUES.Green,
                                            o2.U_VALUES.Amber,
                                            o2.U_VALUES.Red,
                                        ],
                                        worseCaseValue: o2.U_VALUES.Red,
                                    }),
                                    (o2.MAV = {
                                        name: "Modified Attack Vector",
                                        shortName: "MAV",
                                        subCategory: "Exploitability Metrics",
                                        description: "",
                                        baseMetricEquivalent: o2.AV,
                                        values: o2.AV.values,
                                        worseCaseValue: o2.AV_VALUES.N,
                                    }),
                                    (o2.MAC = {
                                        name: "Modified Attack Complexity",
                                        shortName: "MAC",
                                        subCategory: "Exploitability Metrics",
                                        description: "",
                                        baseMetricEquivalent: o2.AC,
                                        values: o2.AC.values,
                                        worseCaseValue: o2.AC_VALUES.L,
                                    }),
                                    (o2.MAT = {
                                        name: "Modified Attack Requirements",
                                        shortName: "MAT",
                                        subCategory: "Exploitability Metrics",
                                        description: "",
                                        baseMetricEquivalent: o2.AT,
                                        values: o2.AT.values,
                                        worseCaseValue: o2.AT_VALUES.P,
                                    }),
                                    (o2.MPR = {
                                        name: "Modified Privileges Required",
                                        shortName: "MPR",
                                        subCategory: "Exploitability Metrics",
                                        description: "",
                                        baseMetricEquivalent: o2.PR,
                                        values: o2.PR.values,
                                        worseCaseValue: o2.PR_VALUES.N,
                                    }),
                                    (o2.MUI = {
                                        name: "Modified User Interaction",
                                        shortName: "MUI",
                                        subCategory: "Exploitability Metrics",
                                        description: "",
                                        baseMetricEquivalent: o2.UI,
                                        values: o2.UI.values,
                                        worseCaseValue: o2.UI_VALUES.N,
                                    }),
                                    (o2.MVC = {
                                        name: "Modified Confidentiality",
                                        shortName: "MVC",
                                        subCategory: "Vulnerable System Impact",
                                        description: "",
                                        baseMetricEquivalent: o2.VC,
                                        values: o2.VULNERABLE_SYSTEM_CONFIDENTIALITY_BASE,
                                        worseCaseValue:
                                            o2
                                                .VULNERABLE_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .H,
                                    }),
                                    (o2.MVI = {
                                        name: "Modified Integrity",
                                        shortName: "MVI",
                                        subCategory: "Vulnerable System Impact",
                                        description: "",
                                        baseMetricEquivalent: o2.VI,
                                        values: o2.VULNERABLE_SYSTEM_INTEGRITY_BASE,
                                        worseCaseValue:
                                            o2
                                                .VULNERABLE_SYSTEM_INTEGRITY_BASE_VALUES
                                                .H,
                                    }),
                                    (o2.MVA = {
                                        name: "Modified Availability",
                                        shortName: "MVA",
                                        subCategory: "Vulnerable System Impact",
                                        description: "",
                                        baseMetricEquivalent: o2.VA,
                                        values: o2.VULNERABLE_SYSTEM_AVAILABILITY_BASE,
                                        worseCaseValue:
                                            o2
                                                .VULNERABLE_SYSTEM_AVAILABILITY_BASE_VALUES
                                                .H,
                                    }),
                                    (o2.MSC = {
                                        name: "Modified Confidentiality",
                                        shortName: "MSC",
                                        subCategory: "Subsequent System Impact",
                                        description: "",
                                        baseMetricEquivalent: o2.SC,
                                        values: o2.SUBSEQUENT_SYSTEM_CONFIDENTIALITY_MODIFIED,
                                        worseCaseValue:
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_MODIFIED_VALUES
                                                .H,
                                    }),
                                    (o2.MSI = {
                                        name: "Modified Integrity",
                                        shortName: "MSI",
                                        subCategory: "Subsequent System Impact",
                                        description: "",
                                        baseMetricEquivalent: o2.SI,
                                        baseMetricEquivalentMapper: (e5) =>
                                            e5 ===
                                            o2
                                                .SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED_VALUES
                                                .S
                                                ? o2
                                                      .SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED_VALUES
                                                      .H
                                                : e5,
                                        values: o2.SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED,
                                        worseCaseValue:
                                            o2
                                                .SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED_VALUES
                                                .H,
                                    }),
                                    (o2.MSA = {
                                        name: "Modified Availability",
                                        shortName: "MSA",
                                        subCategory: "Subsequent System Impact",
                                        description: "",
                                        baseMetricEquivalent: o2.SA,
                                        baseMetricEquivalentMapper: (e5) =>
                                            e5 ===
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED_VALUES
                                                .S
                                                ? o2
                                                      .SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED_VALUES
                                                      .H
                                                : e5,
                                        values: o2.SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED,
                                        worseCaseValue:
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED_VALUES
                                                .H,
                                    }),
                                    (o2.CR = {
                                        name: "Confidentiality Requirement",
                                        shortName: "CR",
                                        description: "",
                                        values: o2.REQUIREMENT_CONFIDENTIALITY_MODIFIED,
                                        worseCaseValue:
                                            o2
                                                .REQUIREMENT_CONFIDENTIALITY_MODIFIED_VALUES
                                                .H,
                                    }),
                                    (o2.IR = {
                                        name: "Integrity Requirement",
                                        shortName: "IR",
                                        description: "",
                                        values: o2.REQUIREMENT_INTEGRITY_MODIFIED,
                                        worseCaseValue:
                                            o2
                                                .REQUIREMENT_INTEGRITY_MODIFIED_VALUES
                                                .H,
                                    }),
                                    (o2.AR = {
                                        name: "Availability Requirement",
                                        shortName: "AR",
                                        description: "",
                                        values: o2.REQUIREMENT_AVAILABILITY_MODIFIED,
                                        worseCaseValue:
                                            o2
                                                .REQUIREMENT_AVAILABILITY_MODIFIED_VALUES
                                                .H,
                                    }),
                                    (o2.E_VALUES = {
                                        X: {
                                            shortName: "X",
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Reliable threat intelligence is not available to determine Exploit Maturity characteristics. This is the default value and is equivalent to Attacked (A) for the purposes of the calculation of the score by assuming the worst case.",
                                        },
                                        A: {
                                            shortName: "A",
                                            name: "Attacked",
                                            jsonSchemaName: "ATTACKED",
                                            description:
                                                "Based on available threat intelligence either of the following must apply: Attacks targeting this vulnerability (attempted or successful) have been reported Solutions to simplify attempts to exploit the vulnerability are publicly or privately available (such as exploit toolkits)",
                                        },
                                        P: {
                                            shortName: "P",
                                            name: "POC",
                                            jsonSchemaName: "PROOF_OF_CONCEPT",
                                            description:
                                                "Based on available threat intelligence each of the following must apply: Proof-of-concept exploit code is publicly available No knowledge of reported attempts to exploit this vulnerability No knowledge of publicly available solutions used to simplify attempts to exploit the vulnerability (i.e., the \u201CAttacked\u201D value does not apply)",
                                        },
                                        U: {
                                            shortName: "U",
                                            name: "Unreported",
                                            jsonSchemaName: "UNREPORTED",
                                            description:
                                                "Based on available threat intelligence each of the following must apply: No knowledge of publicly available proof-of-concept exploit code No knowledge of reported attempts to exploit this vulnerability No knowledge of publicly available solutions used to simplify attempts to exploit the vulnerability (i.e., neither the \u201CPOC\u201D nor \u201CAttacked\u201D values apply)",
                                        },
                                    }),
                                    (o2.E = {
                                        name: "Exploit Maturity",
                                        shortName: "E",
                                        description: "",
                                        values: [
                                            o2.E_VALUES.X,
                                            o2.E_VALUES.A,
                                            o2.E_VALUES.P,
                                            o2.E_VALUES.U,
                                        ],
                                        worseCaseValue: o2.E_VALUES.A,
                                    }),
                                    (o2.BASE_CATEGORY = {
                                        name: "base",
                                        description: "Base Metrics",
                                    }),
                                    (o2.SUPPLEMENTAL_CATEGORY = {
                                        name: "supplemental",
                                        description: "Supplemental Metrics",
                                    }),
                                    (o2.ENVIRONMENTAL_MODIFIED_BASE_CATEGORY = {
                                        name: "environmental-base",
                                        description:
                                            "Environmental Metrics (Modified Base)",
                                    }),
                                    (o2.ENVIRONMENTAL_SECURITY_REQUIREMENT_CATEGORY =
                                        {
                                            name: "environmental-security-requirement",
                                            description:
                                                "Environmental Metrics (Security Requirements)",
                                        }),
                                    (o2.THREAT_CATEGORY = {
                                        name: "threat",
                                        description: "Threat Metrics",
                                    }),
                                    (o2.BASE_CATEGORY_VALUES = [
                                        o2.AV,
                                        o2.AC,
                                        o2.AT,
                                        o2.PR,
                                        o2.UI,
                                        o2.VC,
                                        o2.VI,
                                        o2.VA,
                                        o2.SC,
                                        o2.SI,
                                        o2.SA,
                                    ]),
                                    (o2.SUPPLEMENTAL_CATEGORY_VALUES = [
                                        o2.S,
                                        o2.AU,
                                        o2.R,
                                        o2.V,
                                        o2.RE,
                                        o2.U,
                                    ]),
                                    (o2.ENVIRONMENTAL_MODIFIED_BASE_CATEGORY_VALUES =
                                        [
                                            o2.MAV,
                                            o2.MAC,
                                            o2.MAT,
                                            o2.MPR,
                                            o2.MUI,
                                            o2.MVC,
                                            o2.MVI,
                                            o2.MVA,
                                            o2.MSC,
                                            o2.MSI,
                                            o2.MSA,
                                        ]),
                                    (o2.ENVIRONMENTAL_SECURITY_REQUIREMENT_CATEGORY_VALUES =
                                        [
                                            o2.CR,
                                            o2.IR,
                                            o2.AR,
                                        ]),
                                    (o2.THREAT_CATEGORY_VALUES = [o2.E]),
                                    (o2.REGISTERED_COMPONENTS_EDITOR_ORDER =
                                        /* @__PURE__ */ new Map()),
                                    (o2.REGISTERED_COMPONENTS_VECTOR_STRING_ORDER =
                                        /* @__PURE__ */ new Map()),
                                    o2.REGISTERED_COMPONENTS_EDITOR_ORDER.set(
                                        o2.BASE_CATEGORY,
                                        o2.BASE_CATEGORY_VALUES
                                    ),
                                    o2.REGISTERED_COMPONENTS_EDITOR_ORDER.set(
                                        o2.SUPPLEMENTAL_CATEGORY,
                                        o2.SUPPLEMENTAL_CATEGORY_VALUES
                                    ),
                                    o2.REGISTERED_COMPONENTS_EDITOR_ORDER.set(
                                        o2.ENVIRONMENTAL_MODIFIED_BASE_CATEGORY,
                                        o2.ENVIRONMENTAL_MODIFIED_BASE_CATEGORY_VALUES
                                    ),
                                    o2.REGISTERED_COMPONENTS_EDITOR_ORDER.set(
                                        o2.ENVIRONMENTAL_SECURITY_REQUIREMENT_CATEGORY,
                                        o2.ENVIRONMENTAL_SECURITY_REQUIREMENT_CATEGORY_VALUES
                                    ),
                                    o2.REGISTERED_COMPONENTS_EDITOR_ORDER.set(
                                        o2.THREAT_CATEGORY,
                                        o2.THREAT_CATEGORY_VALUES
                                    ),
                                    o2.REGISTERED_COMPONENTS_VECTOR_STRING_ORDER.set(
                                        o2.BASE_CATEGORY,
                                        o2.BASE_CATEGORY_VALUES
                                    ),
                                    o2.REGISTERED_COMPONENTS_VECTOR_STRING_ORDER.set(
                                        o2.THREAT_CATEGORY,
                                        o2.THREAT_CATEGORY_VALUES
                                    ),
                                    o2.REGISTERED_COMPONENTS_VECTOR_STRING_ORDER.set(
                                        o2.ENVIRONMENTAL_SECURITY_REQUIREMENT_CATEGORY,
                                        o2.ENVIRONMENTAL_SECURITY_REQUIREMENT_CATEGORY_VALUES
                                    ),
                                    o2.REGISTERED_COMPONENTS_VECTOR_STRING_ORDER.set(
                                        o2.ENVIRONMENTAL_MODIFIED_BASE_CATEGORY,
                                        o2.ENVIRONMENTAL_MODIFIED_BASE_CATEGORY_VALUES
                                    ),
                                    o2.REGISTERED_COMPONENTS_VECTOR_STRING_ORDER.set(
                                        o2.SUPPLEMENTAL_CATEGORY,
                                        o2.SUPPLEMENTAL_CATEGORY_VALUES
                                    ),
                                    (o2.MV_LOOKUP = {
                                        "000000": 10,
                                        "000001": 9.9,
                                        "000010": 9.8,
                                        "000011": 9.5,
                                        "000020": 9.5,
                                        "000021": 9.2,
                                        "000100": 10,
                                        "000101": 9.6,
                                        "000110": 9.3,
                                        "000111": 8.7,
                                        "000120": 9.1,
                                        "000121": 8.1,
                                        "000200": 9.3,
                                        "000201": 9,
                                        "000210": 8.9,
                                        "000211": 8,
                                        "000220": 8.1,
                                        "000221": 6.8,
                                        "001000": 9.8,
                                        "001001": 9.5,
                                        "001010": 9.5,
                                        "001011": 9.2,
                                        "001020": 9,
                                        "001021": 8.4,
                                        "001100": 9.3,
                                        "001101": 9.2,
                                        "001110": 8.9,
                                        "001111": 8.1,
                                        "001120": 8.1,
                                        "001121": 6.5,
                                        "001200": 8.8,
                                        "001201": 8,
                                        "001210": 7.8,
                                        "001211": 7,
                                        "001220": 6.9,
                                        "001221": 4.8,
                                        "002001": 9.2,
                                        "002011": 8.2,
                                        "002021": 7.2,
                                        "002101": 7.9,
                                        "002111": 6.9,
                                        "002121": 5,
                                        "002201": 6.9,
                                        "002211": 5.5,
                                        "002221": 2.7,
                                        "010000": 9.9,
                                        "010001": 9.7,
                                        "010010": 9.5,
                                        "010011": 9.2,
                                        "010020": 9.2,
                                        "010021": 8.5,
                                        "010100": 9.5,
                                        "010101": 9.1,
                                        "010110": 9,
                                        "010111": 8.3,
                                        "010120": 8.4,
                                        "010121": 7.1,
                                        "010200": 9.2,
                                        "010201": 8.1,
                                        "010210": 8.2,
                                        "010211": 7.1,
                                        "010220": 7.2,
                                        "010221": 5.3,
                                        "011000": 9.5,
                                        "011001": 9.3,
                                        "011010": 9.2,
                                        "011011": 8.5,
                                        "011020": 8.5,
                                        "011021": 7.3,
                                        "011100": 9.2,
                                        "011101": 8.2,
                                        "011110": 8,
                                        "011111": 7.2,
                                        "011120": 7,
                                        "011121": 5.9,
                                        "011200": 8.4,
                                        "011201": 7,
                                        "011210": 7.1,
                                        "011211": 5.2,
                                        "011220": 5,
                                        "011221": 3,
                                        "012001": 8.6,
                                        "012011": 7.5,
                                        "012021": 5.2,
                                        "012101": 7.1,
                                        "012111": 5.2,
                                        "012121": 2.9,
                                        "012201": 6.3,
                                        "012211": 2.9,
                                        "012221": 1.7,
                                        1e5: 9.8,
                                        100001: 9.5,
                                        100010: 9.4,
                                        100011: 8.7,
                                        100020: 9.1,
                                        100021: 8.1,
                                        100100: 9.4,
                                        100101: 8.9,
                                        100110: 8.6,
                                        100111: 7.4,
                                        100120: 7.7,
                                        100121: 6.4,
                                        100200: 8.7,
                                        100201: 7.5,
                                        100210: 7.4,
                                        100211: 6.3,
                                        100220: 6.3,
                                        100221: 4.9,
                                        101e3: 9.4,
                                        101001: 8.9,
                                        101010: 8.8,
                                        101011: 7.7,
                                        101020: 7.6,
                                        101021: 6.7,
                                        101100: 8.6,
                                        101101: 7.6,
                                        101110: 7.4,
                                        101111: 5.8,
                                        101120: 5.9,
                                        101121: 5,
                                        101200: 7.2,
                                        101201: 5.7,
                                        101210: 5.7,
                                        101211: 5.2,
                                        101220: 5.2,
                                        101221: 2.5,
                                        102001: 8.3,
                                        102011: 7,
                                        102021: 5.4,
                                        102101: 6.5,
                                        102111: 5.8,
                                        102121: 2.6,
                                        102201: 5.3,
                                        102211: 2.1,
                                        102221: 1.3,
                                        11e4: 9.5,
                                        110001: 9,
                                        110010: 8.8,
                                        110011: 7.6,
                                        110020: 7.6,
                                        110021: 7,
                                        110100: 9,
                                        110101: 7.7,
                                        110110: 7.5,
                                        110111: 6.2,
                                        110120: 6.1,
                                        110121: 5.3,
                                        110200: 7.7,
                                        110201: 6.6,
                                        110210: 6.8,
                                        110211: 5.9,
                                        110220: 5.2,
                                        110221: 3,
                                        111e3: 8.9,
                                        111001: 7.8,
                                        111010: 7.6,
                                        111011: 6.7,
                                        111020: 6.2,
                                        111021: 5.8,
                                        111100: 7.4,
                                        111101: 5.9,
                                        111110: 5.7,
                                        111111: 5.7,
                                        111120: 4.7,
                                        111121: 2.3,
                                        111200: 6.1,
                                        111201: 5.2,
                                        111210: 5.7,
                                        111211: 2.9,
                                        111220: 2.4,
                                        111221: 1.6,
                                        112001: 7.1,
                                        112011: 5.9,
                                        112021: 3,
                                        112101: 5.8,
                                        112111: 2.6,
                                        112121: 1.5,
                                        112201: 2.3,
                                        112211: 1.3,
                                        112221: 0.6,
                                        2e5: 9.3,
                                        200001: 8.7,
                                        200010: 8.6,
                                        200011: 7.2,
                                        200020: 7.5,
                                        200021: 5.8,
                                        200100: 8.6,
                                        200101: 7.4,
                                        200110: 7.4,
                                        200111: 6.1,
                                        200120: 5.6,
                                        200121: 3.4,
                                        200200: 7,
                                        200201: 5.4,
                                        200210: 5.2,
                                        200211: 4,
                                        200220: 4,
                                        200221: 2.2,
                                        201e3: 8.5,
                                        201001: 7.5,
                                        201010: 7.4,
                                        201011: 5.5,
                                        201020: 6.2,
                                        201021: 5.1,
                                        201100: 7.2,
                                        201101: 5.7,
                                        201110: 5.5,
                                        201111: 4.1,
                                        201120: 4.6,
                                        201121: 1.9,
                                        201200: 5.3,
                                        201201: 3.6,
                                        201210: 3.4,
                                        201211: 1.9,
                                        201220: 1.9,
                                        201221: 0.8,
                                        202001: 6.4,
                                        202011: 5.1,
                                        202021: 2,
                                        202101: 4.7,
                                        202111: 2.1,
                                        202121: 1.1,
                                        202201: 2.4,
                                        202211: 0.9,
                                        202221: 0.4,
                                        21e4: 8.8,
                                        210001: 7.5,
                                        210010: 7.3,
                                        210011: 5.3,
                                        210020: 6,
                                        210021: 5,
                                        210100: 7.3,
                                        210101: 5.5,
                                        210110: 5.9,
                                        210111: 4,
                                        210120: 4.1,
                                        210121: 2,
                                        210200: 5.4,
                                        210201: 4.3,
                                        210210: 4.5,
                                        210211: 2.2,
                                        210220: 2,
                                        210221: 1.1,
                                        211e3: 7.5,
                                        211001: 5.5,
                                        211010: 5.8,
                                        211011: 4.5,
                                        211020: 4,
                                        211021: 2.1,
                                        211100: 6.1,
                                        211101: 5.1,
                                        211110: 4.8,
                                        211111: 1.8,
                                        211120: 2,
                                        211121: 0.9,
                                        211200: 4.6,
                                        211201: 1.8,
                                        211210: 1.7,
                                        211211: 0.7,
                                        211220: 0.8,
                                        211221: 0.2,
                                        212001: 5.3,
                                        212011: 2.4,
                                        212021: 1.4,
                                        212101: 2.4,
                                        212111: 1.2,
                                        212121: 0.5,
                                        212201: 1,
                                        212211: 0.3,
                                        212221: 0.1,
                                    }),
                                    (o2.ATTRIBUTE_SEVERITY_ORDER = [
                                        [o2.AT_VALUES.P, o2.AT_VALUES.P],
                                        [o2.AT_VALUES.N, o2.AT_VALUES.N],
                                        [o2.AT_VALUES.X, o2.AT_VALUES.X],
                                        [o2.S_VALUES.X],
                                        [o2.S_VALUES.N],
                                        [o2.S_VALUES.P],
                                        [o2.AU_VALUES.X],
                                        [o2.AU_VALUES.N],
                                        [o2.AU_VALUES.Y],
                                        [o2.V_VALUES.X],
                                        [o2.V_VALUES.D],
                                        [o2.V_VALUES.C],
                                        [o2.AC_VALUES.H, o2.AC_VALUES.H],
                                        [o2.AC_VALUES.L, o2.AC_VALUES.L],
                                        [o2.AC_VALUES.X, o2.AC_VALUES.X],
                                        [o2.PR_VALUES.H, o2.PR_VALUES.H],
                                        [o2.PR_VALUES.L, o2.PR_VALUES.L],
                                        [o2.PR_VALUES.N, o2.PR_VALUES.N],
                                        [o2.PR_VALUES.X, o2.PR_VALUES.X],
                                        [o2.UI_VALUES.A, o2.UI_VALUES.A],
                                        [o2.UI_VALUES.P, o2.UI_VALUES.P],
                                        [o2.UI_VALUES.N, o2.UI_VALUES.N],
                                        [o2.UI_VALUES.X, o2.UI_VALUES.X],
                                        [
                                            o2
                                                .VULNERABLE_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .X,
                                            o2
                                                .VULNERABLE_SYSTEM_INTEGRITY_BASE_VALUES
                                                .X,
                                            o2
                                                .VULNERABLE_SYSTEM_AVAILABILITY_BASE_VALUES
                                                .X,
                                        ],
                                        [
                                            o2
                                                .VULNERABLE_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .N,
                                            o2
                                                .VULNERABLE_SYSTEM_INTEGRITY_BASE_VALUES
                                                .N,
                                            o2
                                                .VULNERABLE_SYSTEM_AVAILABILITY_BASE_VALUES
                                                .N,
                                        ],
                                        [
                                            o2
                                                .VULNERABLE_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .L,
                                            o2
                                                .VULNERABLE_SYSTEM_INTEGRITY_BASE_VALUES
                                                .L,
                                            o2
                                                .VULNERABLE_SYSTEM_AVAILABILITY_BASE_VALUES
                                                .L,
                                        ],
                                        [
                                            o2
                                                .VULNERABLE_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .H,
                                            o2
                                                .VULNERABLE_SYSTEM_INTEGRITY_BASE_VALUES
                                                .H,
                                            o2
                                                .VULNERABLE_SYSTEM_AVAILABILITY_BASE_VALUES
                                                .H,
                                        ],
                                        [
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_MODIFIED_VALUES
                                                .X,
                                            o2
                                                .SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED_VALUES
                                                .X,
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED_VALUES
                                                .X,
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .X,
                                            o2
                                                .SUBSEQUENT_SYSTEM_INTEGRITY_BASE_VALUES
                                                .X,
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_BASE_VALUES
                                                .X,
                                        ],
                                        [
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_MODIFIED_VALUES
                                                .N,
                                            o2
                                                .SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED_VALUES
                                                .N,
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED_VALUES
                                                .N,
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .N,
                                            o2
                                                .SUBSEQUENT_SYSTEM_INTEGRITY_BASE_VALUES
                                                .N,
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_BASE_VALUES
                                                .N,
                                        ],
                                        [
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_MODIFIED_VALUES
                                                .L,
                                            o2
                                                .SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED_VALUES
                                                .L,
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED_VALUES
                                                .L,
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .L,
                                            o2
                                                .SUBSEQUENT_SYSTEM_INTEGRITY_BASE_VALUES
                                                .L,
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_BASE_VALUES
                                                .L,
                                        ],
                                        [
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_MODIFIED_VALUES
                                                .H,
                                            o2
                                                .SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED_VALUES
                                                .H,
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED_VALUES
                                                .H,
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .H,
                                            o2
                                                .SUBSEQUENT_SYSTEM_INTEGRITY_BASE_VALUES
                                                .H,
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_BASE_VALUES
                                                .H,
                                        ],
                                        [
                                            o2
                                                .SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED_VALUES
                                                .S,
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED_VALUES
                                                .S,
                                            o2
                                                .SUBSEQUENT_SYSTEM_CONFIDENTIALITY_BASE_VALUES
                                                .S,
                                            o2
                                                .SUBSEQUENT_SYSTEM_INTEGRITY_BASE_VALUES
                                                .S,
                                            o2
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_BASE_VALUES
                                                .S,
                                        ],
                                        [
                                            o2
                                                .REQUIREMENT_CONFIDENTIALITY_MODIFIED_VALUES
                                                .L,
                                            o2
                                                .REQUIREMENT_AVAILABILITY_MODIFIED_VALUES
                                                .L,
                                            o2
                                                .REQUIREMENT_INTEGRITY_MODIFIED_VALUES
                                                .L,
                                        ],
                                        [
                                            o2
                                                .REQUIREMENT_CONFIDENTIALITY_MODIFIED_VALUES
                                                .M,
                                            o2
                                                .REQUIREMENT_AVAILABILITY_MODIFIED_VALUES
                                                .M,
                                            o2
                                                .REQUIREMENT_INTEGRITY_MODIFIED_VALUES
                                                .M,
                                        ],
                                        [
                                            o2
                                                .REQUIREMENT_CONFIDENTIALITY_MODIFIED_VALUES
                                                .H,
                                            o2
                                                .REQUIREMENT_AVAILABILITY_MODIFIED_VALUES
                                                .H,
                                            o2
                                                .REQUIREMENT_INTEGRITY_MODIFIED_VALUES
                                                .H,
                                        ],
                                        [
                                            o2
                                                .REQUIREMENT_CONFIDENTIALITY_MODIFIED_VALUES
                                                .X,
                                            o2
                                                .REQUIREMENT_AVAILABILITY_MODIFIED_VALUES
                                                .X,
                                            o2
                                                .REQUIREMENT_INTEGRITY_MODIFIED_VALUES
                                                .X,
                                        ],
                                        [o2.E_VALUES.U],
                                        [o2.E_VALUES.P],
                                        [o2.E_VALUES.A],
                                        [o2.E_VALUES.X],
                                        [o2.R_VALUES.X],
                                        [o2.R_VALUES.A],
                                        [o2.R_VALUES.U],
                                        [o2.R_VALUES.I],
                                        [o2.RE_VALUES.X],
                                        [o2.RE_VALUES.L],
                                        [o2.RE_VALUES.M],
                                        [o2.RE_VALUES.H],
                                        [o2.U_VALUES.X],
                                        [o2.U_VALUES.Clear],
                                        [o2.U_VALUES.Green],
                                        [o2.U_VALUES.Amber],
                                        [o2.U_VALUES.Red],
                                        [o2.AV_VALUES.X, o2.AV_VALUES.X],
                                        [o2.AV_VALUES.P, o2.AV_VALUES.P],
                                        [o2.AV_VALUES.L, o2.AV_VALUES.L],
                                        [o2.AV_VALUES.A, o2.AV_VALUES.A],
                                        [o2.AV_VALUES.N, o2.AV_VALUES.N],
                                    ]));
                            },
                            904: (e4, t3) => {
                                (Object.defineProperty(t3, "__esModule", {
                                    value: true,
                                }),
                                    (t3.EqOperations36 =
                                        t3.EqOperations5 =
                                        t3.EqOperations4 =
                                        t3.EqOperations2 =
                                        t3.EqOperations1 =
                                        t3.EqOperations1245 =
                                        t3.getEqImplementations =
                                            void 0),
                                    (t3.getEqImplementations = () => [
                                        a2.getInstance(),
                                        i2.getInstance(),
                                        s2.getInstance(),
                                        n2.getInstance(),
                                        r2.getInstance(),
                                    ]));
                                class o2 {
                                    deriveNextLowerMacro(e5) {
                                        return [
                                            e5.deriveNextLower(
                                                this.getEqNumber()
                                            ),
                                        ];
                                    }
                                    lookupScoresForNextLowerMacro(e5) {
                                        return e5[0].getLookupTableScore();
                                    }
                                    getHighestSeverityVectors(e5) {
                                        return this.getEq(
                                            e5
                                        ).getHighestSeverityVectorsUnparsed();
                                    }
                                    lookupMacroVectorDepth(e5) {
                                        return this.getEq(e5).getVectorDepth();
                                    }
                                }
                                t3.EqOperations1245 = o2;
                                class a2 extends o2 {
                                    getEq(e5) {
                                        return e5.getEq1();
                                    }
                                    getRelevantAttributes() {
                                        return [
                                            "AV",
                                            "PR",
                                            "UI",
                                        ];
                                    }
                                    getEqNumber() {
                                        return 1;
                                    }
                                    static getInstance() {
                                        return a2.instance;
                                    }
                                }
                                ((t3.EqOperations1 = a2),
                                    (a2.instance = new a2()));
                                class i2 extends o2 {
                                    getEq(e5) {
                                        return e5.getEq2();
                                    }
                                    getRelevantAttributes() {
                                        return ["AC", "AT"];
                                    }
                                    getEqNumber() {
                                        return 2;
                                    }
                                    static getInstance() {
                                        return i2.instance;
                                    }
                                }
                                ((t3.EqOperations2 = i2),
                                    (i2.instance = new i2()));
                                class s2 extends o2 {
                                    getEq(e5) {
                                        return e5.getEq4();
                                    }
                                    getRelevantAttributes() {
                                        return [
                                            "SC",
                                            "SI",
                                            "SA",
                                        ];
                                    }
                                    getEqNumber() {
                                        return 4;
                                    }
                                    static getInstance() {
                                        return s2.instance;
                                    }
                                }
                                ((t3.EqOperations4 = s2),
                                    (s2.instance = new s2()));
                                class n2 extends o2 {
                                    getEq(e5) {
                                        return e5.getEq5();
                                    }
                                    getRelevantAttributes() {
                                        return [];
                                    }
                                    getEqNumber() {
                                        return 5;
                                    }
                                    static getInstance() {
                                        return n2.instance;
                                    }
                                }
                                ((t3.EqOperations5 = n2),
                                    (n2.instance = new n2()));
                                class r2 {
                                    static getInstance() {
                                        return r2.instance;
                                    }
                                    getHighestSeverityVectors(e5) {
                                        return e5
                                            .getJointEq3AndEq6()
                                            .getHighestSeverityVectorsUnparsed();
                                    }
                                    getRelevantAttributes() {
                                        return [
                                            "VC",
                                            "VI",
                                            "VA",
                                            "CR",
                                            "IR",
                                            "AR",
                                        ];
                                    }
                                    deriveNextLowerMacro(e5) {
                                        const t4 = e5.getEq3().getLevelAsInt(),
                                            o3 = e5.getEq6().getLevelAsInt();
                                        return (1 === t4 && 1 === o3) ||
                                            (0 === t4 && 1 === o3)
                                            ? [e5.deriveNextLower(3)]
                                            : 1 === t4 && 0 === o3
                                              ? [e5.deriveNextLower(6)]
                                              : 0 === t4 && 0 === o3
                                                ? [
                                                      e5.deriveNextLower(3),
                                                      e5.deriveNextLower(6),
                                                  ]
                                                : [
                                                      e5
                                                          .deriveNextLower(3)
                                                          .deriveNextLower(6),
                                                  ];
                                    }
                                    lookupScoresForNextLowerMacro(e5) {
                                        let t4 = NaN,
                                            o3 = NaN;
                                        return (
                                            e5.length > 0 &&
                                                null != e5[0] &&
                                                (t4 =
                                                    e5[0].getLookupTableScore()),
                                            e5.length > 1 &&
                                                null != e5[1] &&
                                                (o3 =
                                                    e5[1].getLookupTableScore()),
                                            isNaN(t4) || isNaN(o3)
                                                ? isNaN(t4)
                                                    ? o3
                                                    : t4
                                                : Math.max(t4, o3)
                                        );
                                    }
                                    lookupMacroVectorDepth(e5) {
                                        return e5
                                            .getJointEq3AndEq6()
                                            .getVectorDepth();
                                    }
                                }
                                ((t3.EqOperations36 = r2),
                                    (r2.instance = new r2()));
                            },
                            951: (e4, t3) => {
                                var o2;
                                (Object.defineProperty(t3, "__esModule", {
                                    value: true,
                                }),
                                    (t3.Cvss3P1Components = void 0));
                                class a2 {}
                                ((t3.Cvss3P1Components = a2),
                                    (o2 = a2),
                                    (a2.CONFIDENTIALITY_IMPACT_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 0,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "There is no loss of confidentiality within the impacted component.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.22,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "There is some loss of confidentiality. Access to some restricted information is obtained, but the attacker does not have control over what information is obtained, or the amount or kind of loss is limited. The information disclosure does not cause a direct, serious loss to the impacted component.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 0.56,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "There is a total loss of confidentiality, resulting in all resources within the impacted component being divulged to the attacker. Alternatively, access to only some restricted information is obtained, but the disclosed information presents a direct, serious impact. For example, an attacker steals the administrator's password, or private encryption keys of a web server.",
                                        },
                                    }),
                                    (a2.CONFIDENTIALITY_IMPACT = [
                                        o2.CONFIDENTIALITY_IMPACT_VALUES.X,
                                        o2.CONFIDENTIALITY_IMPACT_VALUES.N,
                                        o2.CONFIDENTIALITY_IMPACT_VALUES.L,
                                        o2.CONFIDENTIALITY_IMPACT_VALUES.H,
                                    ]),
                                    (a2.INTEGRITY_IMPACT_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 0,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "There is no loss of integrity within the impacted component.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.22,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Modification of data is possible, but the attacker does not have control over the consequence of a modification, or the amount of modification is limited. The data modification does not have a direct, serious impact on the impacted component.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 0.56,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "There is a total loss of integrity, or a complete loss of protection. For example, the attacker is able to modify any/all files protected by the impacted component. Alternatively, only some files can be modified, but malicious modification would present a direct, serious consequence to the impacted component.",
                                        },
                                    }),
                                    (a2.INTEGRITY_IMPACT = [
                                        o2.INTEGRITY_IMPACT_VALUES.X,
                                        o2.INTEGRITY_IMPACT_VALUES.N,
                                        o2.INTEGRITY_IMPACT_VALUES.L,
                                        o2.INTEGRITY_IMPACT_VALUES.H,
                                    ]),
                                    (a2.AVAILABILITY_IMPACT_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 0,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "There is no impact to availability within the impacted component.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.22,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Performance is reduced or there are interruptions in resource availability. Even if repeated exploitation of the vulnerability is possible, the attacker does not have the ability to completely deny service to legitimate users. The resources in the impacted component are either partially available all of the time, or fully available only some of the time, but overall there is no direct, serious consequence to the impacted component.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 0.56,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "There is a total loss of availability, resulting in the attacker being able to fully deny access to resources in the impacted component; this loss is either sustained (while the attacker continues to deliver the attack) or persistent (the condition persists even after the attack has completed). Alternatively, the attacker has the ability to deny some availability, but the loss of availability presents a direct, serious consequence to the impacted component (e.g., the attacker cannot disrupt existing connections, but can prevent new connections; the attacker can repeatedly exploit a vulnerability that, in each instance of a successful attack, leaks a only small amount of memory, but after repeated exploitation causes a service to become completely unavailable).",
                                        },
                                    }),
                                    (a2.AVAILABILITY_IMPACT = [
                                        o2.AVAILABILITY_IMPACT_VALUES.X,
                                        o2.AVAILABILITY_IMPACT_VALUES.N,
                                        o2.AVAILABILITY_IMPACT_VALUES.L,
                                        o2.AVAILABILITY_IMPACT_VALUES.H,
                                    ]),
                                    (a2.CONFIDENTIALITY_REQUIREMENT_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Environmental Score, i.e., it has the same effect on scoring as assigning Medium.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.5,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Loss of Confidentiality is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        M: {
                                            shortName: "M",
                                            value: 1,
                                            name: "Medium",
                                            jsonSchemaName: "MEDIUM",
                                            description:
                                                "Loss of Confidentiality is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 1.5,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "Loss of Confidentiality is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                    }),
                                    (a2.CONFIDENTIALITY_REQUIREMENT = [
                                        o2.CONFIDENTIALITY_REQUIREMENT_VALUES.X,
                                        o2.CONFIDENTIALITY_REQUIREMENT_VALUES.L,
                                        o2.CONFIDENTIALITY_REQUIREMENT_VALUES.M,
                                        o2.CONFIDENTIALITY_REQUIREMENT_VALUES.H,
                                    ]),
                                    (a2.INTEGRITY_REQUIREMENT_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Environmental Score, i.e., it has the same effect on scoring as assigning Medium.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.5,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Loss of Integrity is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        M: {
                                            shortName: "M",
                                            value: 1,
                                            name: "Medium",
                                            jsonSchemaName: "MEDIUM",
                                            description:
                                                "Loss of Integrity is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 1.5,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "Loss of Integrity is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                    }),
                                    (a2.INTEGRITY_REQUIREMENT = [
                                        o2.INTEGRITY_REQUIREMENT_VALUES.X,
                                        o2.INTEGRITY_REQUIREMENT_VALUES.L,
                                        o2.INTEGRITY_REQUIREMENT_VALUES.M,
                                        o2.INTEGRITY_REQUIREMENT_VALUES.H,
                                    ]),
                                    (a2.AVAILABILITY_REQUIREMENT_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Assigning this value indicates there is insufficient information to choose one of the other values, and has no impact on the overall Environmental Score, i.e., it has the same effect on scoring as assigning Medium.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.5,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Loss of Availability is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        M: {
                                            shortName: "M",
                                            value: 1,
                                            name: "Medium",
                                            jsonSchemaName: "MEDIUM",
                                            description:
                                                "Loss of Availability is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 1.5,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "Loss of Availability is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).",
                                        },
                                    }),
                                    (a2.AVAILABILITY_REQUIREMENT = [
                                        o2.AVAILABILITY_REQUIREMENT_VALUES.X,
                                        o2.AVAILABILITY_REQUIREMENT_VALUES.L,
                                        o2.AVAILABILITY_REQUIREMENT_VALUES.M,
                                        o2.AVAILABILITY_REQUIREMENT_VALUES.H,
                                    ]),
                                    (a2.TEMPLATE_CIA_REQUIREMENT_MODIFIED_VALUES =
                                        {
                                            X: {
                                                shortName: "X",
                                                value: 1,
                                                name: "Not Defined",
                                                abbreviatedName: "Not Def.",
                                                jsonSchemaName: "NOT_DEFINED",
                                                description:
                                                    "Component is not defined.",
                                            },
                                            L: {
                                                shortName: "L",
                                                value: 0.5,
                                                name: "Low",
                                                jsonSchemaName: "LOW",
                                                description:
                                                    "There is no impact to the integrity of the system.",
                                            },
                                            M: {
                                                shortName: "M",
                                                value: 1,
                                                name: "Medium",
                                                jsonSchemaName: "MEDIUM",
                                                description:
                                                    "There is a partial compromise of system integrity.",
                                            },
                                            H: {
                                                shortName: "H",
                                                value: 1.5,
                                                name: "High",
                                                jsonSchemaName: "HIGH",
                                                description:
                                                    "There is a total compromise of system integrity.",
                                            },
                                        }),
                                    (a2.TEMPLATE_CIA_REQUIREMENT_MODIFIED = [
                                        o2
                                            .TEMPLATE_CIA_REQUIREMENT_MODIFIED_VALUES
                                            .X,
                                        o2
                                            .TEMPLATE_CIA_REQUIREMENT_MODIFIED_VALUES
                                            .L,
                                        o2
                                            .TEMPLATE_CIA_REQUIREMENT_MODIFIED_VALUES
                                            .M,
                                        o2
                                            .TEMPLATE_CIA_REQUIREMENT_MODIFIED_VALUES
                                            .H,
                                    ]),
                                    (a2.BASE_CATEGORY = {
                                        name: "base",
                                        description:
                                            "This metric reflects the qualities of a vulnerability that are constant over time and across user environments.",
                                    }),
                                    (a2.AV_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0.85,
                                            name: "Network",
                                            abbreviatedName: "Netw.",
                                            jsonSchemaName: "NETWORK",
                                            description:
                                                "The vulnerable component is bound to the network stack and the set of possible attackers extends beyond the other options listed below, up to and including the entire Internet.",
                                        },
                                        A: {
                                            shortName: "A",
                                            value: 0.62,
                                            name: "Adjacent Network",
                                            abbreviatedName: "Adj. Network",
                                            jsonSchemaName: "ADJACENT_NETWORK",
                                            description:
                                                "The vulnerable component is bound to the network stack, but the attack is limited at the protocol level to a logically adjacent topology.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.55,
                                            name: "Local",
                                            jsonSchemaName: "LOCAL",
                                            description:
                                                "The vulnerable component is not bound to the network stack and the attacker's path is via read/write/execute capabilities.",
                                        },
                                        P: {
                                            shortName: "P",
                                            value: 0.2,
                                            name: "Physical",
                                            abbreviatedName: "Phys.",
                                            jsonSchemaName: "PHYSICAL",
                                            description:
                                                "The attack requires the attacker to physically touch or manipulate the vulnerable component.",
                                        },
                                    }),
                                    (a2.AV = {
                                        name: "Attack Vector",
                                        shortName: "AV",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric reflects the context by which vulnerability exploitation is possible. The more remote an attacker can be to attack a host, the greater the vulnerability score.",
                                        values: [
                                            o2.AV_VALUES.X,
                                            o2.AV_VALUES.N,
                                            o2.AV_VALUES.A,
                                            o2.AV_VALUES.L,
                                            o2.AV_VALUES.P,
                                        ],
                                    }),
                                    (a2.AC_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.77,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Specialized access conditions or extenuating circumstances do not exist. An attacker can expect repeatable success when attacking the vulnerable component.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 0.44,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "A successful attack depends on conditions beyond the attacker's control. That is, a successful attack cannot be accomplished at will, but requires the attacker to invest in some measurable amount of effort in preparation or execution against the vulnerable component before a successful attack can be expected.",
                                        },
                                    }),
                                    (a2.AC = {
                                        name: "Attack Complexity",
                                        shortName: "AC",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric describes the conditions beyond the attacker's control that must exist in order to exploit the vulnerability.",
                                        values: [
                                            o2.AC_VALUES.X,
                                            o2.AC_VALUES.L,
                                            o2.AC_VALUES.H,
                                        ],
                                    }),
                                    (a2.PR_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            changedValue: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0.85,
                                            changedValue: 0.85,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "The attacker is unauthorized prior to attack, and therefore does not require any access to settings or files of the vulnerable system to carry out an attack.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.62,
                                            changedValue: 0.68,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "The attacker requires privileges that provide basic user capabilities that could normally affect only settings and files owned by a user. Alternatively, an attacker with Low privileges has the ability to access only non-sensitive resources.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 0.27,
                                            changedValue: 0.5,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "The attacker requires privileges that provide significant (e.g., administrative) control over the vulnerable component allowing access to component-wide settings and files.",
                                        },
                                    }),
                                    (a2.PR = {
                                        name: "Privileges Required",
                                        shortName: "PR",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability.",
                                        values: [
                                            o2.PR_VALUES.X,
                                            o2.PR_VALUES.N,
                                            o2.PR_VALUES.L,
                                            o2.PR_VALUES.H,
                                        ],
                                    }),
                                    (a2.UI_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0.85,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "The vulnerable system can be exploited without interaction from any user.",
                                        },
                                        R: {
                                            shortName: "R",
                                            value: 0.62,
                                            name: "Required",
                                            abbreviatedName: "Req.",
                                            jsonSchemaName: "REQUIRED",
                                            description:
                                                "Successful exploitation of this vulnerability requires a user to take some action before the vulnerability can be exploited. For example, a successful exploit may only be possible during the installation of an application by a system administrator.",
                                        },
                                    }),
                                    (a2.UI = {
                                        name: "User Interaction",
                                        shortName: "UI",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric captures the requirement for a user, other than the attacker, to participate in the successful compromise of the vulnerable component.",
                                        values: [
                                            o2.UI_VALUES.X,
                                            o2.UI_VALUES.N,
                                            o2.UI_VALUES.R,
                                        ],
                                    }),
                                    (a2.S_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: false,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        U: {
                                            shortName: "U",
                                            value: false,
                                            name: "Unchanged",
                                            abbreviatedName: "Unchang.",
                                            jsonSchemaName: "UNCHANGED",
                                            description:
                                                "An exploited vulnerability can only affect resources managed by the same authority.",
                                        },
                                        C: {
                                            shortName: "C",
                                            value: true,
                                            name: "Changed",
                                            jsonSchemaName: "CHANGED",
                                            description:
                                                "An exploited vulnerability can affect resources beyond the authorization privileges intended by the vulnerable system's design.",
                                        },
                                    }),
                                    (a2.S = {
                                        name: "Scope",
                                        shortName: "S",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "Can an exploit of the vulnerability be accomplished remotely?",
                                        values: [
                                            o2.S_VALUES.X,
                                            o2.S_VALUES.U,
                                            o2.S_VALUES.C,
                                        ],
                                    }),
                                    (a2.C = {
                                        name: "Confidentiality Impact",
                                        shortName: "C",
                                        subCategory: "Impact Metrics",
                                        description:
                                            "This metric measures the impact to the confidentiality of the information resources managed by a software component due to a successfully exploited vulnerability.",
                                        values: o2.CONFIDENTIALITY_IMPACT,
                                    }),
                                    (a2.I = {
                                        name: "Integrity Impact",
                                        shortName: "I",
                                        subCategory: "Impact Metrics",
                                        description:
                                            "This metric measures the impact to integrity of a successfully exploited vulnerability.",
                                        values: o2.INTEGRITY_IMPACT,
                                    }),
                                    (a2.A = {
                                        name: "Availability Impact",
                                        shortName: "A",
                                        subCategory: "Impact Metrics",
                                        description:
                                            "This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability.",
                                        values: o2.AVAILABILITY_IMPACT,
                                    }),
                                    (a2.BASE_CATEGORY_VALUES = [
                                        o2.AV,
                                        o2.AC,
                                        o2.PR,
                                        o2.UI,
                                        o2.S,
                                        o2.C,
                                        o2.I,
                                        o2.A,
                                    ]),
                                    (a2.TEMPORAL_CATEGORY = {
                                        name: "temporal",
                                        description:
                                            "This metric reflects the current state of exploit techniques or code availability.",
                                    }),
                                    (a2.E_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        U: {
                                            shortName: "U",
                                            value: 0.91,
                                            name: "Unproven",
                                            abbreviatedName: "Unproven",
                                            description:
                                                "No exploit code is available, or an exploit is theoretical.",
                                        },
                                        P: {
                                            shortName: "P",
                                            value: 0.94,
                                            name: "Proof-of-Concept",
                                            abbreviatedName: "Proof-of-conc.",
                                            jsonSchemaName: "PROOF_OF_CONCEPT",
                                            description:
                                                "Proof-of-concept exploit code is available, or an attack demonstration is not practical for most systems. The code or technique is not functional in all situations and may require substantial modification by a skilled attacker.",
                                        },
                                        F: {
                                            shortName: "F",
                                            value: 0.97,
                                            name: "Functional",
                                            jsonSchemaName: "FUNCTIONAL",
                                            description:
                                                "Functional exploit code is available. The code works in most situations where the vulnerability exists.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 1,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "Functional exploit code is available. The code is widespread and automated and works in all situations where the vulnerability exists.",
                                        },
                                    }),
                                    (a2.E = {
                                        name: "Exploit Code Maturity",
                                        shortName: "E",
                                        description:
                                            "This metric measures the likelihood of the vulnerability being attacked, and is typically based on the current state of exploit techniques, exploit code availability, or active, successful exploitation of the vulnerability.",
                                        values: [
                                            o2.E_VALUES.X,
                                            o2.E_VALUES.U,
                                            o2.E_VALUES.P,
                                            o2.E_VALUES.F,
                                            o2.E_VALUES.H,
                                        ],
                                    }),
                                    (a2.RL_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        O: {
                                            shortName: "O",
                                            value: 0.95,
                                            name: "Official Fix",
                                            abbreviatedName: "Off. Fix",
                                            jsonSchemaName: "OFFICIAL_FIX",
                                            description:
                                                "A complete vendor solution is available. Either the vendor has issued an official patch, or an upgrade is available.",
                                        },
                                        T: {
                                            shortName: "T",
                                            value: 0.96,
                                            name: "Temporary Fix",
                                            abbreviatedName: "Temp. Fix",
                                            jsonSchemaName: "TEMPORARY_FIX",
                                            description:
                                                "There is an official but temporary fix available. This includes instances where the vendor issues a temporary hotfix, tool, or workaround.",
                                        },
                                        W: {
                                            shortName: "W",
                                            value: 0.97,
                                            name: "Workaround",
                                            jsonSchemaName: "WORKAROUND",
                                            description:
                                                "There is an unofficial, non-vendor solution available. In some cases, users of the affected technology will create a patch of their own or provide steps to work around or otherwise mitigate the vulnerability.",
                                        },
                                        U: {
                                            shortName: "U",
                                            value: 1,
                                            name: "Unavailable",
                                            jsonSchemaName: "UNAVAILABLE",
                                            description:
                                                "There is either no solution available or it is impossible to apply.",
                                        },
                                    }),
                                    (a2.RL = {
                                        name: "Remediation Level",
                                        shortName: "RL",
                                        description:
                                            "This metric describes the remediation level for a vulnerability in an affected resource.",
                                        values: [
                                            o2.RL_VALUES.X,
                                            o2.RL_VALUES.O,
                                            o2.RL_VALUES.T,
                                            o2.RL_VALUES.W,
                                            o2.RL_VALUES.U,
                                        ],
                                    }),
                                    (a2.RC_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        U: {
                                            shortName: "U",
                                            value: 0.92,
                                            name: "Unknown",
                                            description:
                                                "Report confidence is unknown.",
                                        },
                                        R: {
                                            shortName: "R",
                                            value: 0.96,
                                            name: "Reasonable",
                                            jsonSchemaName: "REASONABLE",
                                            description:
                                                "Reasonable confidence exists, or the reported vulnerability is in a component not typically used by a target or not having a large installed base.",
                                        },
                                        C: {
                                            shortName: "C",
                                            value: 1,
                                            name: "Confirmed",
                                            jsonSchemaName: "CONFIRMED",
                                            description:
                                                "Confirmed confidence exists, or the exploit is functional in the environment where the vulnerability exists.",
                                        },
                                    }),
                                    (a2.RC = {
                                        name: "Report Confidence",
                                        shortName: "RC",
                                        description:
                                            "This metric describes the level of confidence in the existence of the vulnerability and the credibility of the known technical details.",
                                        values: [
                                            o2.RC_VALUES.X,
                                            o2.RC_VALUES.U,
                                            o2.RC_VALUES.R,
                                            o2.RC_VALUES.C,
                                        ],
                                    }),
                                    (a2.TEMPORAL_CATEGORY_VALUES = [
                                        o2.E,
                                        o2.RL,
                                        o2.RC,
                                    ]),
                                    (a2.ENVIRONMENTAL_CATEGORY = {
                                        name: "environmental",
                                        description:
                                            "This metric reflects the characteristics of a vulnerability that are relevant and unique to a particular user's environment. This metric can greatly improve the accuracy of a score.",
                                    }),
                                    (a2.MAV_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0.85,
                                            name: "Network",
                                            abbreviatedName: "Netw.",
                                            jsonSchemaName: "NETWORK",
                                            description:
                                                "The vulnerable component is bound to the network stack and the set of possible attackers extends beyond the other options listed below, up to and including the entire Internet.",
                                        },
                                        A: {
                                            shortName: "A",
                                            value: 0.62,
                                            name: "Adjacent Network",
                                            abbreviatedName: "Adj. Network",
                                            jsonSchemaName: "ADJACENT_NETWORK",
                                            description:
                                                "The vulnerable component is bound to the network stack, but the attack is limited at the protocol level to a logically adjacent topology.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.55,
                                            name: "Local",
                                            jsonSchemaName: "LOCAL",
                                            description:
                                                "The vulnerable component is not bound to the network stack and the attacker's path is via read/write/execute capabilities.",
                                        },
                                        P: {
                                            shortName: "P",
                                            value: 0.2,
                                            name: "Physical",
                                            abbreviatedName: "Phys.",
                                            jsonSchemaName: "PHYSICAL",
                                            description:
                                                "The attack requires the attacker to physically touch or manipulate the vulnerable component.",
                                        },
                                    }),
                                    (a2.MAV = {
                                        name: "Modified Attack Vector",
                                        shortName: "MAV",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric reflects the context by which vulnerability exploitation is possible. The more remote an attacker can be to attack a host, the greater the vulnerability score.",
                                        baseMetricEquivalent: o2.AV,
                                        values: [
                                            o2.MAV_VALUES.X,
                                            o2.MAV_VALUES.N,
                                            o2.MAV_VALUES.A,
                                            o2.MAV_VALUES.L,
                                            o2.MAV_VALUES.P,
                                        ],
                                    }),
                                    (a2.MAC_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.77,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "Specialized access conditions or extenuating circumstances do not exist. An attacker can expect repeatable success when attacking the vulnerable component.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 0.44,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "A successful attack depends on conditions beyond the attacker's control. That is, a successful attack cannot be accomplished at will, but requires the attacker to invest in some measurable amount of effort in preparation or execution against the vulnerable component before a successful attack can be expected.",
                                        },
                                    }),
                                    (a2.MAC = {
                                        name: "Modified Attack Complexity",
                                        shortName: "MAC",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric describes the conditions beyond the attacker's control that must exist in order to exploit the vulnerability.",
                                        baseMetricEquivalent: o2.AC,
                                        values: [
                                            o2.MAC_VALUES.X,
                                            o2.MAC_VALUES.L,
                                            o2.MAC_VALUES.H,
                                        ],
                                    }),
                                    (a2.MPR_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            changedValue: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0.85,
                                            changedValue: 0.85,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "The attacker is unauthorized prior to attack, and therefore does not require any access to settings or files of the vulnerable system to carry out an attack.",
                                        },
                                        L: {
                                            shortName: "L",
                                            value: 0.62,
                                            changedValue: 0.68,
                                            name: "Low",
                                            jsonSchemaName: "LOW",
                                            description:
                                                "The attacker requires privileges that provide basic user capabilities that could normally affect only settings and files owned by a user. Alternatively, an attacker with Low privileges has the ability to access only non-sensitive resources.",
                                        },
                                        H: {
                                            shortName: "H",
                                            value: 0.27,
                                            changedValue: 0.5,
                                            name: "High",
                                            jsonSchemaName: "HIGH",
                                            description:
                                                "The attacker requires privileges that provide significant (e.g., administrative) control over the vulnerable component allowing access to component-wide settings and files.",
                                        },
                                    }),
                                    (a2.MPR = {
                                        name: "Modified Privileges Required",
                                        shortName: "MPR",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability.",
                                        baseMetricEquivalent: o2.PR,
                                        values: [
                                            o2.MPR_VALUES.X,
                                            o2.MPR_VALUES.N,
                                            o2.MPR_VALUES.L,
                                            o2.MPR_VALUES.H,
                                        ],
                                    }),
                                    (a2.MUI_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: 1,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        N: {
                                            shortName: "N",
                                            value: 0.85,
                                            name: "None",
                                            jsonSchemaName: "NONE",
                                            description:
                                                "The vulnerable system can be exploited without interaction from any user.",
                                        },
                                        R: {
                                            shortName: "R",
                                            value: 0.62,
                                            name: "Required",
                                            jsonSchemaName: "REQUIRED",
                                            description:
                                                "Successful exploitation of this vulnerability requires a user to take some action before the vulnerability can be exploited. For example, a successful exploit may only be possible during the installation of an application by a system administrator.",
                                        },
                                    }),
                                    (a2.MUI = {
                                        name: "Modified User Interaction",
                                        shortName: "MUI",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "This metric captures the requirement for a user, other than the attacker, to participate in the successful compromise of the vulnerable component.",
                                        baseMetricEquivalent: o2.UI,
                                        values: [
                                            o2.MUI_VALUES.X,
                                            o2.MUI_VALUES.N,
                                            o2.MUI_VALUES.R,
                                        ],
                                    }),
                                    (a2.MS_VALUES = {
                                        X: {
                                            shortName: "X",
                                            value: false,
                                            name: "Not Defined",
                                            abbreviatedName: "Not Def.",
                                            jsonSchemaName: "NOT_DEFINED",
                                            description:
                                                "Component is not defined.",
                                        },
                                        U: {
                                            shortName: "U",
                                            value: false,
                                            name: "Unchanged",
                                            abbreviatedName: "Unchang.",
                                            jsonSchemaName: "UNCHANGED",
                                            description:
                                                "An exploited vulnerability can only affect resources managed by the same authority.",
                                        },
                                        C: {
                                            shortName: "C",
                                            value: true,
                                            name: "Changed",
                                            jsonSchemaName: "CHANGED",
                                            description:
                                                "An exploited vulnerability can affect resources beyond the authorization privileges intended by the vulnerable system's design.",
                                        },
                                    }),
                                    (a2.MS = {
                                        name: "Modified Scope",
                                        shortName: "MS",
                                        subCategory: "Exploitability Metrics",
                                        description:
                                            "Can an exploit of the vulnerability be accomplished remotely?",
                                        baseMetricEquivalent: o2.S,
                                        values: [
                                            o2.MS_VALUES.X,
                                            o2.MS_VALUES.U,
                                            o2.MS_VALUES.C,
                                        ],
                                    }),
                                    (a2.MC = {
                                        name: "Confidentiality Impact",
                                        shortName: "MC",
                                        subCategory: "Modified Impact",
                                        description:
                                            "This metric measures the impact to the confidentiality of the information resources managed by a software component due to a successfully exploited vulnerability.",
                                        baseMetricEquivalent: o2.C,
                                        values: o2.CONFIDENTIALITY_IMPACT,
                                    }),
                                    (a2.MI = {
                                        name: "Integrity Impact",
                                        shortName: "MI",
                                        subCategory: "Modified Impact",
                                        description:
                                            "This metric measures the impact to integrity of a successfully exploited vulnerability.",
                                        baseMetricEquivalent: o2.I,
                                        values: o2.INTEGRITY_IMPACT,
                                    }),
                                    (a2.MA = {
                                        name: "Availability Impact",
                                        shortName: "MA",
                                        subCategory: "Modified Impact",
                                        description:
                                            "This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability.",
                                        baseMetricEquivalent: o2.A,
                                        values: o2.AVAILABILITY_IMPACT,
                                    }),
                                    (a2.CR = {
                                        name: "Confidentiality Requirement",
                                        shortName: "CR",
                                        subCategory:
                                            "Modified Requirement (Impact Subscore) Modifiers",
                                        description:
                                            "This metric describes the remediation level for a vulnerability in an affected resource.",
                                        values: o2.CONFIDENTIALITY_REQUIREMENT,
                                    }),
                                    (a2.IR = {
                                        name: "Integrity Requirement",
                                        shortName: "IR",
                                        subCategory:
                                            "Modified Requirement (Impact Subscore) Modifiers",
                                        description:
                                            "This metric describes the remediation level for a vulnerability in an affected resource.",
                                        values: o2.INTEGRITY_REQUIREMENT,
                                    }),
                                    (a2.AR = {
                                        name: "Availability Requirement",
                                        shortName: "AR",
                                        subCategory:
                                            "Modified Requirement (Impact Subscore) Modifiers",
                                        description:
                                            "This metric describes the remediation level for a vulnerability in an affected resource.",
                                        values: o2.AVAILABILITY_REQUIREMENT,
                                    }),
                                    (a2.ENVIRONMENTAL_CATEGORY_VALUES = [
                                        o2.CR,
                                        o2.IR,
                                        o2.AR,
                                        o2.MAV,
                                        o2.MAC,
                                        o2.MPR,
                                        o2.MUI,
                                        o2.MS,
                                        o2.MC,
                                        o2.MI,
                                        o2.MA,
                                    ]),
                                    (a2.REGISTERED_COMPONENTS =
                                        /* @__PURE__ */ new Map()),
                                    o2.REGISTERED_COMPONENTS.set(
                                        o2.BASE_CATEGORY,
                                        o2.BASE_CATEGORY_VALUES
                                    ),
                                    o2.REGISTERED_COMPONENTS.set(
                                        o2.TEMPORAL_CATEGORY,
                                        o2.TEMPORAL_CATEGORY_VALUES
                                    ),
                                    o2.REGISTERED_COMPONENTS.set(
                                        o2.ENVIRONMENTAL_CATEGORY,
                                        o2.ENVIRONMENTAL_CATEGORY_VALUES
                                    ),
                                    (a2.ATTRIBUTE_SEVERITY_ORDER = [
                                        [o2.S_VALUES.U, o2.MS_VALUES.U],
                                        [
                                            o2.CONFIDENTIALITY_IMPACT_VALUES.N,
                                            o2.INTEGRITY_IMPACT_VALUES.N,
                                            o2.AVAILABILITY_IMPACT_VALUES.N,
                                        ],
                                        [o2.AV_VALUES.P, o2.MAV_VALUES.P],
                                        [
                                            o2.CONFIDENTIALITY_IMPACT_VALUES.L,
                                            o2.INTEGRITY_IMPACT_VALUES.L,
                                            o2.AVAILABILITY_IMPACT_VALUES.L,
                                        ],
                                        [o2.PR_VALUES.H, o2.MPR_VALUES.H],
                                        [o2.AC_VALUES.H, o2.MAC_VALUES.H],
                                        [
                                            o2
                                                .CONFIDENTIALITY_REQUIREMENT_VALUES
                                                .L,
                                            o2.INTEGRITY_REQUIREMENT_VALUES.L,
                                            o2.AVAILABILITY_REQUIREMENT_VALUES
                                                .L,
                                        ],
                                        [o2.AV_VALUES.L, o2.MAV_VALUES.L],
                                        [
                                            o2.CONFIDENTIALITY_IMPACT_VALUES.H,
                                            o2.INTEGRITY_IMPACT_VALUES.H,
                                            o2.AVAILABILITY_IMPACT_VALUES.H,
                                        ],
                                        [o2.AV_VALUES.A, o2.MAV_VALUES.A],
                                        [o2.UI_VALUES.R, o2.MUI_VALUES.R],
                                        [o2.PR_VALUES.L, o2.MPR_VALUES.L],
                                        [o2.AC_VALUES.L, o2.MAC_VALUES.L],
                                        [o2.AV_VALUES.N, o2.MAV_VALUES.N],
                                        [o2.PR_VALUES.N, o2.MPR_VALUES.N],
                                        [o2.UI_VALUES.N, o2.MUI_VALUES.N],
                                        [o2.E_VALUES.U],
                                        [o2.E_VALUES.P],
                                        [o2.E_VALUES.F],
                                        [o2.E_VALUES.H],
                                        [o2.E_VALUES.X],
                                        [o2.RC_VALUES.U],
                                        [o2.RL_VALUES.O],
                                        [o2.RL_VALUES.T],
                                        [o2.RC_VALUES.R],
                                        [o2.RL_VALUES.W],
                                        [o2.AV_VALUES.X, o2.MAV_VALUES.X],
                                        [o2.AC_VALUES.X, o2.MAC_VALUES.X],
                                        [o2.PR_VALUES.X, o2.MPR_VALUES.X],
                                        [o2.UI_VALUES.X, o2.MUI_VALUES.X],
                                        [o2.S_VALUES.C, o2.MS_VALUES.C],
                                        [o2.S_VALUES.X, o2.MS_VALUES.X],
                                        [o2.CONFIDENTIALITY_IMPACT_VALUES.X],
                                        [o2.INTEGRITY_IMPACT_VALUES.X],
                                        [o2.AVAILABILITY_IMPACT_VALUES.X],
                                        [o2.RL_VALUES.U],
                                        [o2.RL_VALUES.X],
                                        [o2.RC_VALUES.C],
                                        [o2.RC_VALUES.X],
                                        [
                                            o2
                                                .CONFIDENTIALITY_REQUIREMENT_VALUES
                                                .M,
                                            o2.INTEGRITY_REQUIREMENT_VALUES.M,
                                            o2.AVAILABILITY_REQUIREMENT_VALUES
                                                .M,
                                        ],
                                        [
                                            o2
                                                .CONFIDENTIALITY_REQUIREMENT_VALUES
                                                .X,
                                            o2.INTEGRITY_REQUIREMENT_VALUES.X,
                                            o2.AVAILABILITY_REQUIREMENT_VALUES
                                                .X,
                                        ],
                                        [
                                            o2
                                                .CONFIDENTIALITY_REQUIREMENT_VALUES
                                                .H,
                                            o2.INTEGRITY_REQUIREMENT_VALUES.H,
                                            o2.AVAILABILITY_REQUIREMENT_VALUES
                                                .H,
                                        ],
                                    ]));
                            },
                            972: (e4, t3, o2) => {
                                var a2;
                                (Object.defineProperty(t3, "__esModule", {
                                    value: true,
                                }),
                                    (t3.Cvss4P0MacroVector = void 0));
                                const i2 = o2(730),
                                    s2 = o2(759);
                                class n2 {
                                    constructor(e5, t4, o3, a3, i3, s3, n3) {
                                        ((this.eq1 = e5),
                                            (this.eq2 = t4),
                                            (this.eq3 = o3),
                                            (this.eq4 = a3),
                                            (this.eq5 = i3),
                                            (this.eq6 = s3),
                                            (this.jointEq3AndEq6 = n3));
                                    }
                                    static fromVector(e5) {
                                        const t4 = a2.findMatchingEQ(
                                                "1",
                                                a2.EQ1_DEFINITIONS,
                                                e5
                                            ),
                                            o3 = a2.findMatchingEQ(
                                                "2",
                                                a2.EQ2_DEFINITIONS,
                                                e5
                                            ),
                                            i3 = a2.findMatchingEQ(
                                                "3",
                                                a2.EQ3_DEFINITIONS,
                                                e5
                                            ),
                                            s3 = a2.findMatchingEQ(
                                                "4",
                                                a2.EQ4_DEFINITIONS,
                                                e5
                                            ),
                                            n3 = a2.findMatchingEQ(
                                                "5",
                                                a2.EQ5_DEFINITIONS,
                                                e5
                                            ),
                                            r2 = a2.findMatchingEQ(
                                                "6",
                                                a2.EQ6_DEFINITIONS,
                                                e5
                                            ),
                                            c2 = a2.findMatchingEQ(
                                                "3,6",
                                                a2.JOINT_EQ3_EQ6_DEFINITIONS,
                                                e5
                                            );
                                        return new a2(
                                            t4,
                                            o3,
                                            i3,
                                            s3,
                                            n3,
                                            r2,
                                            c2
                                        );
                                    }
                                    static findMatchingEQ(e5, t4, o3) {
                                        for (let e6 of t4)
                                            if (e6.matchesConstraints(o3))
                                                return e6;
                                        throw new Error(
                                            "No matching EQ found for " +
                                                e5 +
                                                " and vector " +
                                                o3
                                        );
                                    }
                                    getEq1() {
                                        return this.eq1;
                                    }
                                    getEq2() {
                                        return this.eq2;
                                    }
                                    getEq3() {
                                        return this.eq3;
                                    }
                                    getEq4() {
                                        return this.eq4;
                                    }
                                    getEq5() {
                                        return this.eq5;
                                    }
                                    getEq6() {
                                        return this.eq6;
                                    }
                                    getJointEq3AndEq6() {
                                        return this.jointEq3AndEq6;
                                    }
                                    getEQ(e5) {
                                        switch (e5) {
                                            case 1:
                                                return this.eq1;
                                            case 2:
                                                return this.eq2;
                                            case 3:
                                                return this.eq3;
                                            case 4:
                                                return this.eq4;
                                            case 5:
                                                return this.eq5;
                                            case 6:
                                                return this.eq6;
                                            case 7:
                                                return this.jointEq3AndEq6;
                                            default:
                                                throw new Error(
                                                    "Invalid EQ index: " + e5
                                                );
                                        }
                                    }
                                    getLookupTableScore() {
                                        return a2.getMacroVectorScore(this);
                                    }
                                    static getMacroVectorScore(e5) {
                                        const t4 = e5.toString(),
                                            o3 =
                                                s2.Cvss4P0Components.MV_LOOKUP[
                                                    t4
                                                ];
                                        return void 0 === o3 ? NaN : o3;
                                    }
                                    toString() {
                                        return (
                                            this.eq1.getLevel() +
                                            this.eq2.getLevel() +
                                            this.eq3.getLevel() +
                                            this.eq4.getLevel() +
                                            this.eq5.getLevel() +
                                            this.eq6.getLevel()
                                        );
                                    }
                                    deriveNextLower(e5) {
                                        const t4 =
                                                1 !== e5
                                                    ? this.eq1
                                                    : this.getNextLower(
                                                          a2.EQ1_DEFINITIONS,
                                                          this.eq1
                                                      ),
                                            o3 =
                                                2 !== e5
                                                    ? this.eq2
                                                    : this.getNextLower(
                                                          a2.EQ2_DEFINITIONS,
                                                          this.eq2
                                                      ),
                                            i3 =
                                                3 !== e5
                                                    ? this.eq3
                                                    : this.getNextLower(
                                                          a2.EQ3_DEFINITIONS,
                                                          this.eq3
                                                      ),
                                            s3 =
                                                4 !== e5
                                                    ? this.eq4
                                                    : this.getNextLower(
                                                          a2.EQ4_DEFINITIONS,
                                                          this.eq4
                                                      ),
                                            n3 =
                                                5 !== e5
                                                    ? this.eq5
                                                    : this.getNextLower(
                                                          a2.EQ5_DEFINITIONS,
                                                          this.eq5
                                                      ),
                                            r2 =
                                                6 !== e5
                                                    ? this.eq6
                                                    : this.getNextLower(
                                                          a2.EQ6_DEFINITIONS,
                                                          this.eq6
                                                      ),
                                            c2 =
                                                7 !== e5
                                                    ? this.jointEq3AndEq6
                                                    : this.getNextLower(
                                                          a2.JOINT_EQ3_EQ6_DEFINITIONS,
                                                          this.jointEq3AndEq6
                                                      );
                                        return new a2(
                                            t4,
                                            o3,
                                            i3,
                                            s3,
                                            n3,
                                            r2,
                                            c2
                                        );
                                    }
                                    static getIndexInDefinitions(e5, t4) {
                                        for (let o3 = 0; o3 < e5.length; o3++)
                                            if (e5[o3] === t4) return o3;
                                        throw new Error(
                                            "EQ not found in definitions: " + t4
                                        );
                                    }
                                    getNextLower(e5, t4) {
                                        const o3 = a2.getIndexInDefinitions(
                                            e5,
                                            t4
                                        );
                                        return e5.length > o3 + 1
                                            ? e5[o3 + 1]
                                            : a2.EQ_ERROR_DEFINITION;
                                    }
                                    static is(e5, t4, o3) {
                                        return (
                                            o3 ===
                                            a2.getComparisonMetric(e5, t4)
                                                .shortName
                                        );
                                    }
                                    static getComparisonMetricComponent(
                                        e5,
                                        t4
                                    ) {
                                        return a2.getComparisonMetric(
                                            e5,
                                            t4.shortName
                                        );
                                    }
                                    static getComparisonMetric(e5, t4) {
                                        const o3 = e5.getComponentByString(t4);
                                        if (
                                            "E" === t4 &&
                                            s2.Cvss4P0Components.E_VALUES.X ===
                                                o3
                                        )
                                            return s2.Cvss4P0Components.E_VALUES
                                                .A;
                                        if (
                                            "CR" === t4 &&
                                            s2.Cvss4P0Components
                                                .REQUIREMENT_CONFIDENTIALITY_MODIFIED_VALUES
                                                .X === o3
                                        )
                                            return s2.Cvss4P0Components
                                                .REQUIREMENT_CONFIDENTIALITY_MODIFIED_VALUES
                                                .H;
                                        if (
                                            "IR" === t4 &&
                                            s2.Cvss4P0Components
                                                .REQUIREMENT_INTEGRITY_MODIFIED_VALUES
                                                .X === o3
                                        )
                                            return s2.Cvss4P0Components
                                                .REQUIREMENT_INTEGRITY_MODIFIED_VALUES
                                                .H;
                                        if (
                                            "AR" === t4 &&
                                            s2.Cvss4P0Components
                                                .REQUIREMENT_AVAILABILITY_MODIFIED_VALUES
                                                .X === o3
                                        )
                                            return s2.Cvss4P0Components
                                                .REQUIREMENT_AVAILABILITY_MODIFIED_VALUES
                                                .H;
                                        if (
                                            "MSI" === t4 &&
                                            s2.Cvss4P0Components
                                                .SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED_VALUES
                                                .X === o3 &&
                                            "S" ===
                                                e5.getComponentByString("SI")
                                                    .shortName
                                        )
                                            return s2.Cvss4P0Components
                                                .SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED_VALUES
                                                .H;
                                        if (
                                            "MSA" === t4 &&
                                            s2.Cvss4P0Components
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED_VALUES
                                                .X === o3 &&
                                            "S" ===
                                                e5.getComponentByString("SA")
                                                    .shortName
                                        )
                                            return s2.Cvss4P0Components
                                                .SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED_VALUES
                                                .H;
                                        try {
                                            const o4 = e5.getComponentByString(
                                                    (t4.startsWith("M")
                                                        ? ""
                                                        : "M") + t4
                                                ),
                                                a3 = o4.shortName;
                                            if (null != a3 && "X" !== a3)
                                                return o4;
                                        } catch (e6) {}
                                        return o3;
                                    }
                                }
                                ((t3.Cvss4P0MacroVector = n2),
                                    (a2 = n2),
                                    (n2.EQ_ERROR_DEFINITION = new i2.EQ(
                                        "9",
                                        -1,
                                        [],
                                        () => true
                                    )),
                                    (n2.EQ1_DEFINITIONS = [
                                        new i2.EQ(
                                            "0",
                                            1,
                                            ["AV:N/PR:N/UI:N"],
                                            (e5) =>
                                                a2.is(e5, "AV", "N") &&
                                                a2.is(e5, "PR", "N") &&
                                                a2.is(e5, "UI", "N")
                                        ),
                                        new i2.EQ(
                                            "1",
                                            4,
                                            [
                                                "AV:A/PR:N/UI:N",
                                                "AV:N/PR:L/UI:N",
                                                "AV:N/PR:N/UI:P",
                                            ],
                                            (e5) =>
                                                (a2.is(e5, "AV", "N") ||
                                                    a2.is(e5, "PR", "N") ||
                                                    a2.is(e5, "UI", "N")) &&
                                                !(
                                                    a2.is(e5, "AV", "N") &&
                                                    a2.is(e5, "PR", "N") &&
                                                    a2.is(e5, "UI", "N")
                                                ) &&
                                                !a2.is(e5, "AV", "P")
                                        ),
                                        new i2.EQ(
                                            "2",
                                            5,
                                            [
                                                "AV:P/PR:N/UI:N",
                                                "AV:A/PR:L/UI:P",
                                            ],
                                            (e5) =>
                                                a2.is(e5, "AV", "P") ||
                                                !(
                                                    a2.is(e5, "AV", "N") ||
                                                    a2.is(e5, "PR", "N") ||
                                                    a2.is(e5, "UI", "N")
                                                )
                                        ),
                                    ]),
                                    (n2.EQ2_DEFINITIONS = [
                                        new i2.EQ(
                                            "0",
                                            1,
                                            ["AC:L/AT:N"],
                                            (e5) =>
                                                a2.is(e5, "AC", "L") &&
                                                a2.is(e5, "AT", "N")
                                        ),
                                        new i2.EQ(
                                            "1",
                                            2,
                                            ["AC:H/AT:N", "AC:L/AT:P"],
                                            (e5) =>
                                                !(
                                                    a2.is(e5, "AC", "L") &&
                                                    a2.is(e5, "AT", "N")
                                                )
                                        ),
                                    ]),
                                    (n2.EQ3_DEFINITIONS = [
                                        new i2.EQ(
                                            "0",
                                            -1,
                                            ["VC:H/VI:H/VA:H"],
                                            (e5) =>
                                                a2.is(e5, "VC", "H") &&
                                                a2.is(e5, "VI", "H")
                                        ),
                                        new i2.EQ(
                                            "1",
                                            -1,
                                            [
                                                "VC:L/VI:H/VA:H",
                                                "VC:H/VI:L/VA:H",
                                            ],
                                            (e5) =>
                                                !(
                                                    a2.is(e5, "VC", "H") &&
                                                    a2.is(e5, "VI", "H")
                                                ) &&
                                                (a2.is(e5, "VC", "H") ||
                                                    a2.is(e5, "VI", "H") ||
                                                    a2.is(e5, "VA", "H"))
                                        ),
                                        new i2.EQ(
                                            "2",
                                            -1,
                                            ["VC:L/VI:L/VA:L"],
                                            (e5) =>
                                                !(
                                                    a2.is(e5, "VC", "H") ||
                                                    a2.is(e5, "VI", "H") ||
                                                    a2.is(e5, "VA", "H")
                                                )
                                        ),
                                    ]),
                                    (n2.EQ4_DEFINITIONS = [
                                        new i2.EQ(
                                            "0",
                                            6,
                                            ["SC:H/SI:S/SA:S"],
                                            (e5) =>
                                                a2.is(e5, "MSI", "S") ||
                                                a2.is(e5, "MSA", "S")
                                        ),
                                        new i2.EQ(
                                            "1",
                                            5,
                                            ["SC:H/SI:H/SA:H"],
                                            (e5) =>
                                                !(
                                                    a2.is(e5, "MSI", "S") &&
                                                    a2.is(e5, "MSA", "S")
                                                ) &&
                                                (a2.is(e5, "SC", "H") ||
                                                    a2.is(e5, "SI", "H") ||
                                                    a2.is(e5, "SA", "H"))
                                        ),
                                        new i2.EQ(
                                            "2",
                                            4,
                                            ["SC:L/SI:L/SA:L"],
                                            (e5) =>
                                                !(
                                                    (a2.is(e5, "MSI", "S") &&
                                                        a2.is(
                                                            e5,
                                                            "MSA",
                                                            "S"
                                                        )) ||
                                                    a2.is(e5, "SC", "H") ||
                                                    a2.is(e5, "SI", "H") ||
                                                    a2.is(e5, "SA", "H")
                                                )
                                        ),
                                    ]),
                                    (n2.EQ5_DEFINITIONS = [
                                        new i2.EQ("0", 1, ["E:A"], (e5) =>
                                            a2.is(e5, "E", "A")
                                        ),
                                        new i2.EQ("1", 1, ["E:P"], (e5) =>
                                            a2.is(e5, "E", "P")
                                        ),
                                        new i2.EQ("2", 1, ["E:U"], (e5) =>
                                            a2.is(e5, "E", "U")
                                        ),
                                    ]),
                                    (n2.EQ6_DEFINITIONS = [
                                        new i2.EQ(
                                            "0",
                                            -1,
                                            ["AV:N/PR:N/UI:N"],
                                            (e5) =>
                                                (a2.is(e5, "CR", "H") &&
                                                    a2.is(e5, "VC", "H")) ||
                                                (a2.is(e5, "IR", "H") &&
                                                    a2.is(e5, "VI", "H")) ||
                                                (a2.is(e5, "AR", "H") &&
                                                    a2.is(e5, "VA", "H"))
                                        ),
                                        new i2.EQ(
                                            "1",
                                            -1,
                                            [
                                                "VC:H/VI:H/VA:H/CR:M/IR:M/AR:M",
                                                "VC:H/VI:H/VA:L/CR:M/IR:M/AR:H",
                                                "VC:H/VI:L/VA:H/CR:M/IR:H/AR:M",
                                                "VC:H/VI:L/VA:L/CR:M/IR:H/AR:H",
                                                "VC:L/VI:H/VA:H/CR:H/IR:M/AR:M",
                                                "VC:L/VI:H/VA:L/CR:H/IR:M/AR:H",
                                                "VC:L/VI:L/VA:H/CR:H/IR:H/AR:M",
                                                "VC:L/VI:L/VA:L/CR:H/IR:H/AR:H",
                                            ],
                                            (e5) =>
                                                !(
                                                    (a2.is(e5, "CR", "H") &&
                                                        a2.is(e5, "VC", "H")) ||
                                                    (a2.is(e5, "IR", "H") &&
                                                        a2.is(e5, "VI", "H")) ||
                                                    (a2.is(e5, "AR", "H") &&
                                                        a2.is(e5, "VA", "H"))
                                                )
                                        ),
                                    ]),
                                    (n2.JOINT_EQ3_EQ6_DEFINITIONS = [
                                        new i2.EQ(
                                            "00",
                                            7,
                                            ["VC:H/VI:H/VA:H/CR:H/IR:H/AR:H"],
                                            (e5) =>
                                                a2.is(e5, "VC", "H") &&
                                                a2.is(e5, "VI", "H") &&
                                                (a2.is(e5, "CR", "H") ||
                                                    a2.is(e5, "IR", "H") ||
                                                    (a2.is(e5, "AR", "H") &&
                                                        a2.is(e5, "VA", "H")))
                                        ),
                                        new i2.EQ(
                                            "01",
                                            6,
                                            [
                                                "VC:H/VI:H/VA:L/CR:M/IR:M/AR:H",
                                                "VC:H/VI:H/VA:H/CR:M/IR:M/AR:M",
                                            ],
                                            (e5) =>
                                                a2.is(e5, "VC", "H") &&
                                                a2.is(e5, "VI", "H") &&
                                                !(
                                                    a2.is(e5, "CR", "H") ||
                                                    a2.is(e5, "IR", "H")
                                                ) &&
                                                !(
                                                    a2.is(e5, "AR", "H") &&
                                                    a2.is(e5, "VA", "H")
                                                )
                                        ),
                                        new i2.EQ(
                                            "10",
                                            8,
                                            [
                                                "VC:L/VI:H/VA:H/CR:H/IR:H/AR:H",
                                                "VC:H/VI:L/VA:H/CR:H/IR:H/AR:H",
                                            ],
                                            (e5) =>
                                                !(
                                                    a2.is(e5, "VC", "H") &&
                                                    a2.is(e5, "VI", "H")
                                                ) &&
                                                (a2.is(e5, "VC", "H") ||
                                                    a2.is(e5, "VI", "H") ||
                                                    a2.is(e5, "VA", "H")) &&
                                                ((a2.is(e5, "CR", "H") &&
                                                    a2.is(e5, "VC", "H")) ||
                                                    (a2.is(e5, "IR", "H") &&
                                                        a2.is(e5, "VI", "H")) ||
                                                    (a2.is(e5, "AR", "H") &&
                                                        a2.is(e5, "VA", "H")))
                                        ),
                                        new i2.EQ(
                                            "11",
                                            8,
                                            [
                                                "VC:L/VI:H/VA:L/CR:H/IR:M/AR:H",
                                                "VC:L/VI:H/VA:H/CR:H/IR:M/AR:M",
                                                "VC:H/VI:L/VA:H/CR:M/IR:H/AR:M",
                                                "VC:H/VI:L/VA:L/CR:M/IR:H/AR:H",
                                                "VC:L/VI:L/VA:H/CR:H/IR:H/AR:M",
                                            ],
                                            (e5) =>
                                                !(
                                                    a2.is(e5, "VC", "H") &&
                                                    a2.is(e5, "VI", "H")
                                                ) &&
                                                (a2.is(e5, "VC", "H") ||
                                                    a2.is(e5, "VI", "H") ||
                                                    a2.is(e5, "VA", "H")) &&
                                                !(
                                                    a2.is(e5, "CR", "H") &&
                                                    a2.is(e5, "VC", "H")
                                                ) &&
                                                !(
                                                    a2.is(e5, "IR", "H") &&
                                                    a2.is(e5, "VI", "H")
                                                ) &&
                                                !(
                                                    a2.is(e5, "AR", "H") &&
                                                    a2.is(e5, "VA", "H")
                                                )
                                        ),
                                        new i2.EQ("20", 0, [], (e5) => false),
                                        new i2.EQ(
                                            "21",
                                            10,
                                            ["VC:L/VI:L/VA:L/CR:H/IR:H/AR:H"],
                                            (e5) =>
                                                !(
                                                    a2.is(e5, "VC", "H") ||
                                                    a2.is(e5, "VI", "H") ||
                                                    a2.is(e5, "VA", "H") ||
                                                    (a2.is(e5, "CR", "H") &&
                                                        a2.is(e5, "VC", "H")) ||
                                                    (a2.is(e5, "IR", "H") &&
                                                        a2.is(e5, "VI", "H")) ||
                                                    (a2.is(e5, "AR", "H") &&
                                                        a2.is(e5, "VA", "H"))
                                                )
                                        ),
                                    ]));
                            },
                            987: (e4, t3, o2) => {
                                (Object.defineProperty(t3, "__esModule", {
                                    value: true,
                                }),
                                    (t3.Cvss4P0 = void 0));
                                const a2 = o2(154),
                                    i2 = o2(972),
                                    s2 = o2(904),
                                    n2 = o2(759),
                                    r2 = o2(730),
                                    c2 = o2(951);
                                class l2 extends a2.CvssVector {
                                    constructor(e5) {
                                        (super(e5),
                                            (this.ROUNDING_EPSILON = Math.pow(
                                                10,
                                                -6
                                            )));
                                    }
                                    getRegisteredComponents() {
                                        return n2.Cvss4P0Components
                                            .REGISTERED_COMPONENTS_EDITOR_ORDER;
                                    }
                                    getVectorStringOrderProperties() {
                                        return n2.Cvss4P0Components
                                            .REGISTERED_COMPONENTS_VECTOR_STRING_ORDER;
                                    }
                                    getVectorPrefix() {
                                        return "CVSS:4.0/";
                                    }
                                    getVectorName() {
                                        return "CVSS:4.0";
                                    }
                                    fillAverageVector() {
                                        this.applyVector(
                                            "AV:A/AC:L/AT:N/PR:N/UI:N/VC:L/VI:L/VA:L/SC:L/SI:L/SA:L"
                                        );
                                    }
                                    fillRandomBaseVector() {
                                        const e5 =
                                            n2.Cvss4P0Components
                                                .BASE_CATEGORY_VALUES;
                                        for (let t4 = 0; t4 < e5.length; t4++) {
                                            const o3 = e5[t4],
                                                a3 =
                                                    super.pickRandomDefinedComponentValue(
                                                        o3
                                                    );
                                            if (!a3)
                                                return (
                                                    console.warn(
                                                        "Failed to pick random vector component for",
                                                        o3,
                                                        ", filling average vector instead"
                                                    ),
                                                    void this.fillAverageVector()
                                                );
                                            this.applyComponent(o3, a3);
                                        }
                                    }
                                    calculateScoresInternal(e5 = false) {
                                        const t4 =
                                                this.isAnyEnvironmentalDefined(),
                                            o3 = this.isAnyThreatDefined(),
                                            a3 = this.calculateOverallScore();
                                        let i3, s3, r3;
                                        if (t4 || o3) {
                                            const e6 = this.clone();
                                            (e6.clearSpecifiedComponents(
                                                n2.Cvss4P0Components
                                                    .THREAT_CATEGORY_VALUES
                                            ),
                                                e6.clearSpecifiedComponents(
                                                    n2.Cvss4P0Components
                                                        .ENVIRONMENTAL_MODIFIED_BASE_CATEGORY_VALUES
                                                ),
                                                e6.clearSpecifiedComponents(
                                                    n2.Cvss4P0Components
                                                        .ENVIRONMENTAL_SECURITY_REQUIREMENT_CATEGORY_VALUES
                                                ),
                                                (i3 =
                                                    e6.calculateOverallScore()));
                                        } else i3 = a3;
                                        if (t4)
                                            if (o3) {
                                                const e6 = this.clone();
                                                (e6.clearSpecifiedComponents(
                                                    n2.Cvss4P0Components
                                                        .THREAT_CATEGORY_VALUES
                                                ),
                                                    (s3 =
                                                        e6.calculateOverallScore()));
                                            } else s3 = a3;
                                        if (o3)
                                            if (t4) {
                                                const e6 = this.clone();
                                                (e6.clearSpecifiedComponents(
                                                    n2.Cvss4P0Components
                                                        .ENVIRONMENTAL_MODIFIED_BASE_CATEGORY_VALUES
                                                ),
                                                    e6.clearSpecifiedComponents(
                                                        n2.Cvss4P0Components
                                                            .ENVIRONMENTAL_SECURITY_REQUIREMENT_CATEGORY_VALUES
                                                    ),
                                                    (r3 =
                                                        e6.calculateOverallScore()));
                                            } else r3 = a3;
                                        return {
                                            normalized: e5,
                                            overall: a3,
                                            base: a3,
                                            baseMetricsOnly: i3,
                                            environmental: s3,
                                            threat: r3,
                                            vector: this.toString(),
                                        };
                                    }
                                    toString(
                                        e5 = false,
                                        t4 = this.getVectorStringOrderProperties(),
                                        o3 = false
                                    ) {
                                        return super.toString(e5, t4, o3);
                                    }
                                    calculateOverallScore() {
                                        if (!this.isBaseFullyDefined())
                                            return 0;
                                        if (
                                            [
                                                "VC",
                                                "VI",
                                                "VA",
                                                "SC",
                                                "SI",
                                                "SA",
                                            ]
                                                .map((e6) =>
                                                    i2.Cvss4P0MacroVector.getComparisonMetric(
                                                        this,
                                                        e6
                                                    )
                                                )
                                                .every(
                                                    (e6) => "N" === e6.shortName
                                                )
                                        )
                                            return 0;
                                        const e5 = this.getMacroVector(),
                                            t4 = e5.getLookupTableScore(),
                                            o3 = (0, s2.getEqImplementations)();
                                        (
                                            e5.getEq3().getLevel() +
                                            e5.getEq6().getLevel()
                                        ).toLowerCase() !==
                                            e5
                                                .getJointEq3AndEq6()
                                                .getLevel()
                                                .toLowerCase() &&
                                            console.warn(
                                                `CVSS 4.0: Joint Eq3 and Eq6 level [${e5.getJointEq3AndEq6().getLevel()}] does not match Eq3 [${e5.getEq3().getLevel()}] and Eq6 [${e5.getEq6().getLevel()}]`
                                            );
                                        const a3 = o3.map((t5) =>
                                                t5.getHighestSeverityVectors(e5)
                                            ),
                                            n3 = this.generateCvssPermutations(
                                                a3[0],
                                                a3[1],
                                                a3[2],
                                                a3[3],
                                                a3[4]
                                            );
                                        if (0 === n3.length)
                                            return (
                                                console.warn(
                                                    `No max vectors found for ${e5}`
                                                ),
                                                0
                                            );
                                        const r3 =
                                                this.calculateSeverityDistancesByComparingToHighestSeverityVectors(
                                                    n3
                                                ),
                                            c3 = new m();
                                        for (const a4 of o3) {
                                            const o4 =
                                                    a4.deriveNextLowerMacro(e5),
                                                i3 =
                                                    t4 -
                                                    a4.lookupScoresForNextLowerMacro(
                                                        o4
                                                    ),
                                                s3 =
                                                    a4.lookupMacroVectorDepth(
                                                        e5
                                                    ),
                                                n4 = a4
                                                    .getRelevantAttributes()
                                                    .map(
                                                        (e6) => r3.get(e6) || 0
                                                    )
                                                    .reduce(
                                                        (e6, t5) => e6 + t5,
                                                        0
                                                    );
                                            if (!isNaN(i3) && 0 !== s3) {
                                                const e6 = (n4 / s3) * i3;
                                                c3.add(e6);
                                            }
                                        }
                                        const l3 = t4 - c3.get(0);
                                        return l3 < 0
                                            ? 0
                                            : l3 > 10
                                              ? 10
                                              : this.roundToDecimalPlaces(l3);
                                    }
                                    roundToDecimalPlaces(e5) {
                                        return (
                                            Math.round(
                                                10 *
                                                    (e5 + this.ROUNDING_EPSILON)
                                            ) / 10
                                        );
                                    }
                                    generateCvssPermutations(
                                        e5,
                                        t4,
                                        o3,
                                        a3,
                                        i3
                                    ) {
                                        const s3 = [];
                                        return (
                                            e5.forEach((e6) => {
                                                t4.forEach((t5) => {
                                                    o3.forEach((o4) => {
                                                        a3.forEach((a4) => {
                                                            i3.forEach((i4) => {
                                                                const n3 = `${e6}/${t5}/${o4}/${a4}/${i4}`;
                                                                s3.push(
                                                                    new l2(n3)
                                                                );
                                                            });
                                                        });
                                                    });
                                                });
                                            }),
                                            s3
                                        );
                                    }
                                    severityDistance(e5, t4, o3, a3) {
                                        const i3 =
                                                "X" === t4.shortName
                                                    ? void 0 ===
                                                      e5.worseCaseValue
                                                        ? t4
                                                        : e5.worseCaseValue
                                                    : t4,
                                            s3 =
                                                "X" === a3.shortName
                                                    ? void 0 ===
                                                      o3.worseCaseValue
                                                        ? a3
                                                        : o3.worseCaseValue
                                                    : a3;
                                        let n3, r3, c3, l3;
                                        if (e5 !== o3) {
                                            const t5 =
                                                    e5.name.startsWith(
                                                        "Modified"
                                                    ),
                                                a4 =
                                                    o3.name.startsWith(
                                                        "Modified"
                                                    );
                                            if (t5 && !a4) {
                                                const t6 = e5.values.find(
                                                    (e6) =>
                                                        e6.shortName ===
                                                        s3.shortName
                                                );
                                                if (!t6)
                                                    throw new Error(
                                                        "Cannot find modified value for " +
                                                            s3
                                                    );
                                                ((r3 = i3),
                                                    (l3 = t6),
                                                    (n3 = e5),
                                                    (c3 = e5));
                                            } else {
                                                if (t5 || !a4)
                                                    return (
                                                        console.warn(
                                                            `Cannot compute severity distance for [${i3}] and [${s3}], assuming distance is 0`
                                                        ),
                                                        0
                                                    );
                                                {
                                                    const e6 = o3.values.find(
                                                        (e7) =>
                                                            e7.shortName ===
                                                            i3.shortName
                                                    );
                                                    if (!e6)
                                                        throw new Error(
                                                            "Cannot find modified value for " +
                                                                i3
                                                        );
                                                    ((r3 = e6),
                                                        (l3 = s3),
                                                        (n3 = o3),
                                                        (c3 = o3));
                                                }
                                            }
                                        } else
                                            ((r3 = i3),
                                                (l3 = s3),
                                                (n3 = e5),
                                                (c3 = o3));
                                        return (
                                            n3.values.indexOf(r3) -
                                            c3.values.indexOf(l3)
                                        );
                                    }
                                    severityDistanceBetweenComponents(
                                        e5,
                                        t4,
                                        o3,
                                        a3
                                    ) {
                                        const i3 = e5.values.find(
                                                (e6) =>
                                                    e6.shortName ===
                                                    t4.shortName
                                            ),
                                            s3 = o3.values.find(
                                                (e6) =>
                                                    e6.shortName ===
                                                    a3.shortName
                                            );
                                        if (!i3)
                                            throw new Error(
                                                `Cannot find component values for ${e5.name} with short name ${t4.shortName} in ${e5.values.map((e6) => e6.shortName).join(", ")}`
                                            );
                                        if (!s3)
                                            throw new Error(
                                                `Cannot find component values for ${o3.name} with short name ${a3.shortName} in ${o3.values.map((e6) => e6.shortName).join(", ")}`
                                            );
                                        return (
                                            e5.values.indexOf(i3) -
                                            o3.values.indexOf(s3)
                                        );
                                    }
                                    severityDistanceToVector(e5) {
                                        let t4 = 0;
                                        return (
                                            n2.Cvss4P0Components.REGISTERED_COMPONENTS_EDITOR_ORDER.forEach(
                                                (o3) => {
                                                    o3.forEach((o4) => {
                                                        const a3 =
                                                                this.getComponent(
                                                                    o4
                                                                ),
                                                            i3 =
                                                                e5.getComponent(
                                                                    o4
                                                                );
                                                        t4 +=
                                                            this.severityDistanceBetweenComponents(
                                                                o4,
                                                                a3,
                                                                o4,
                                                                i3
                                                            );
                                                    });
                                                }
                                            ),
                                            t4
                                        );
                                    }
                                    calculateSeverityDistancesByComparingToHighestSeverityVectors(
                                        e5
                                    ) {
                                        const t4 = /* @__PURE__ */ new Map();
                                        for (const o3 of e5) {
                                            (t4.set(
                                                "AV",
                                                this.severityDistanceBetweenComponents(
                                                    n2.Cvss4P0Components.AV,
                                                    i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                        this,
                                                        n2.Cvss4P0Components.AV
                                                    ),
                                                    n2.Cvss4P0Components.AV,
                                                    i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                        o3,
                                                        n2.Cvss4P0Components.AV
                                                    )
                                                )
                                            ),
                                                t4.set(
                                                    "PR",
                                                    this.severityDistanceBetweenComponents(
                                                        n2.Cvss4P0Components.PR,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            this,
                                                            n2.Cvss4P0Components
                                                                .PR
                                                        ),
                                                        n2.Cvss4P0Components.PR,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            o3,
                                                            n2.Cvss4P0Components
                                                                .PR
                                                        )
                                                    )
                                                ),
                                                t4.set(
                                                    "UI",
                                                    this.severityDistanceBetweenComponents(
                                                        n2.Cvss4P0Components.UI,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            this,
                                                            n2.Cvss4P0Components
                                                                .UI
                                                        ),
                                                        n2.Cvss4P0Components.UI,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            o3,
                                                            n2.Cvss4P0Components
                                                                .UI
                                                        )
                                                    )
                                                ),
                                                t4.set(
                                                    "AC",
                                                    this.severityDistanceBetweenComponents(
                                                        n2.Cvss4P0Components.AC,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            this,
                                                            n2.Cvss4P0Components
                                                                .AC
                                                        ),
                                                        n2.Cvss4P0Components.AC,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            o3,
                                                            n2.Cvss4P0Components
                                                                .AC
                                                        )
                                                    )
                                                ),
                                                t4.set(
                                                    "AT",
                                                    this.severityDistanceBetweenComponents(
                                                        n2.Cvss4P0Components.AT,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            this,
                                                            n2.Cvss4P0Components
                                                                .AT
                                                        ),
                                                        n2.Cvss4P0Components.AT,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            o3,
                                                            n2.Cvss4P0Components
                                                                .AT
                                                        )
                                                    )
                                                ),
                                                t4.set(
                                                    "VC",
                                                    this.severityDistanceBetweenComponents(
                                                        n2.Cvss4P0Components.VC,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            this,
                                                            n2.Cvss4P0Components
                                                                .VC
                                                        ),
                                                        n2.Cvss4P0Components.VC,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            o3,
                                                            n2.Cvss4P0Components
                                                                .VC
                                                        )
                                                    )
                                                ),
                                                t4.set(
                                                    "VI",
                                                    this.severityDistanceBetweenComponents(
                                                        n2.Cvss4P0Components.VI,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            this,
                                                            n2.Cvss4P0Components
                                                                .VI
                                                        ),
                                                        n2.Cvss4P0Components.VI,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            o3,
                                                            n2.Cvss4P0Components
                                                                .VI
                                                        )
                                                    )
                                                ),
                                                t4.set(
                                                    "VA",
                                                    this.severityDistanceBetweenComponents(
                                                        n2.Cvss4P0Components.VA,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            this,
                                                            n2.Cvss4P0Components
                                                                .VA
                                                        ),
                                                        n2.Cvss4P0Components.VA,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            o3,
                                                            n2.Cvss4P0Components
                                                                .VA
                                                        )
                                                    )
                                                ),
                                                t4.set(
                                                    "SC",
                                                    this.severityDistanceBetweenComponents(
                                                        n2.Cvss4P0Components.SC,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            this,
                                                            n2.Cvss4P0Components
                                                                .SC
                                                        ),
                                                        n2.Cvss4P0Components.SC,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            o3,
                                                            n2.Cvss4P0Components
                                                                .SC
                                                        )
                                                    )
                                                ),
                                                t4.set(
                                                    "CR",
                                                    this.severityDistanceBetweenComponents(
                                                        n2.Cvss4P0Components.CR,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            this,
                                                            n2.Cvss4P0Components
                                                                .CR
                                                        ),
                                                        n2.Cvss4P0Components.CR,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            o3,
                                                            n2.Cvss4P0Components
                                                                .CR
                                                        )
                                                    )
                                                ),
                                                t4.set(
                                                    "IR",
                                                    this.severityDistanceBetweenComponents(
                                                        n2.Cvss4P0Components.IR,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            this,
                                                            n2.Cvss4P0Components
                                                                .IR
                                                        ),
                                                        n2.Cvss4P0Components.IR,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            o3,
                                                            n2.Cvss4P0Components
                                                                .IR
                                                        )
                                                    )
                                                ),
                                                t4.set(
                                                    "AR",
                                                    this.severityDistanceBetweenComponents(
                                                        n2.Cvss4P0Components.AR,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            this,
                                                            n2.Cvss4P0Components
                                                                .AR
                                                        ),
                                                        n2.Cvss4P0Components.AR,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            o3,
                                                            n2.Cvss4P0Components
                                                                .AR
                                                        )
                                                    )
                                                ));
                                            const e6 =
                                                    this.getComponent(
                                                        n2.Cvss4P0Components.SI
                                                    ) ===
                                                    n2.Cvss4P0Components
                                                        .SUBSEQUENT_SYSTEM_INTEGRITY_MODIFIED_VALUES
                                                        .S
                                                        ? "MSI"
                                                        : "SI",
                                                a3 =
                                                    this.getComponent(
                                                        n2.Cvss4P0Components.SA
                                                    ) ===
                                                    n2.Cvss4P0Components
                                                        .SUBSEQUENT_SYSTEM_AVAILABILITY_MODIFIED_VALUES
                                                        .S
                                                        ? "MSA"
                                                        : "SA";
                                            if (
                                                (t4.set(
                                                    e6,
                                                    this.severityDistanceBetweenComponents(
                                                        n2.Cvss4P0Components.SI,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            this,
                                                            n2.Cvss4P0Components
                                                                .SI
                                                        ),
                                                        n2.Cvss4P0Components.SI,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            o3,
                                                            n2.Cvss4P0Components
                                                                .SI
                                                        )
                                                    )
                                                ),
                                                t4.set(
                                                    a3,
                                                    this.severityDistanceBetweenComponents(
                                                        n2.Cvss4P0Components.SA,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            this,
                                                            n2.Cvss4P0Components
                                                                .SA
                                                        ),
                                                        n2.Cvss4P0Components.SA,
                                                        i2.Cvss4P0MacroVector.getComparisonMetricComponent(
                                                            o3,
                                                            n2.Cvss4P0Components
                                                                .SA
                                                        )
                                                    )
                                                ),
                                                !Array.from(t4.values()).some(
                                                    (e7) => e7 < 0
                                                ))
                                            )
                                                break;
                                            t4.clear();
                                        }
                                        return (
                                            0 === t4.size &&
                                                console.warn(
                                                    `No severity distances found for [${this.toString()}]`
                                                ),
                                            t4
                                        );
                                    }
                                    getNomenclature() {
                                        let e5 = "CVSS-B";
                                        return (
                                            this.isCategoryPartiallyDefined(
                                                n2.Cvss4P0Components
                                                    .THREAT_CATEGORY
                                            ) && (e5 += "T"),
                                            (this.isCategoryPartiallyDefined(
                                                n2.Cvss4P0Components
                                                    .ENVIRONMENTAL_MODIFIED_BASE_CATEGORY
                                            ) ||
                                                this.isCategoryPartiallyDefined(
                                                    n2.Cvss4P0Components
                                                        .ENVIRONMENTAL_SECURITY_REQUIREMENT_CATEGORY
                                                )) &&
                                                (e5 += "E"),
                                            e5
                                        );
                                    }
                                    getMacroVector() {
                                        return i2.Cvss4P0MacroVector.fromVector(
                                            this
                                        );
                                    }
                                    isBaseFullyDefined() {
                                        return super.isCategoryFullyDefined(
                                            n2.Cvss4P0Components.BASE_CATEGORY
                                        );
                                    }
                                    isAnyBaseDefined() {
                                        return super.isCategoryPartiallyDefined(
                                            c2.Cvss3P1Components.BASE_CATEGORY
                                        );
                                    }
                                    isThreatFullyDefined() {
                                        return super.isCategoryFullyDefined(
                                            n2.Cvss4P0Components.THREAT_CATEGORY
                                        );
                                    }
                                    isAnyThreatDefined() {
                                        return super.isCategoryPartiallyDefined(
                                            n2.Cvss4P0Components.THREAT_CATEGORY
                                        );
                                    }
                                    isAnyEnvironmentalDefined() {
                                        return (
                                            super.isCategoryPartiallyDefined(
                                                n2.Cvss4P0Components
                                                    .ENVIRONMENTAL_MODIFIED_BASE_CATEGORY
                                            ) ||
                                            super.isCategoryPartiallyDefined(
                                                n2.Cvss4P0Components
                                                    .ENVIRONMENTAL_SECURITY_REQUIREMENT_CATEGORY
                                            )
                                        );
                                    }
                                    getJsonSchemaSeverity(e5) {
                                        return 0 === e5 || isNaN(e5)
                                            ? "NONE"
                                            : e5 <= 3.9
                                              ? "LOW"
                                              : e5 <= 6.9
                                                ? "MEDIUM"
                                                : e5 <= 8.9
                                                  ? "HIGH"
                                                  : "CRITICAL";
                                    }
                                    createJsonSchema() {
                                        const e5 = this.calculateScores();
                                        return {
                                            version: "4.0",
                                            vectorString: this.toString(),
                                            baseScore: e5.overall,
                                            baseSeverity:
                                                this.getJsonSchemaSeverity(
                                                    e5.overall
                                                ),
                                            attackVector: this.getComponent(
                                                n2.Cvss4P0Components.AV
                                            ).jsonSchemaName,
                                            attackComplexity: this.getComponent(
                                                n2.Cvss4P0Components.AC
                                            ).jsonSchemaName,
                                            attackRequirements:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.AT
                                                ).jsonSchemaName,
                                            privilegesRequired:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.PR
                                                ).jsonSchemaName,
                                            userInteraction: this.getComponent(
                                                n2.Cvss4P0Components.UI
                                            ).jsonSchemaName,
                                            vulnConfidentialityImpact:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.VC
                                                ).jsonSchemaName,
                                            vulnIntegrityImpact:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.VI
                                                ).jsonSchemaName,
                                            vulnAvailabilityImpact:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.VA
                                                ).jsonSchemaName,
                                            subConfidentialityImpact:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.SC
                                                ).jsonSchemaName,
                                            subIntegrityImpact:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.SI
                                                ).jsonSchemaName,
                                            subAvailabilityImpact:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.SA
                                                ).jsonSchemaName,
                                            exploitMaturity: this.getComponent(
                                                n2.Cvss4P0Components.E
                                            ).jsonSchemaName,
                                            confidentialityRequirement:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.CR
                                                ).jsonSchemaName,
                                            integrityRequirement:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.IR
                                                ).jsonSchemaName,
                                            availabilityRequirement:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.AR
                                                ).jsonSchemaName,
                                            modifiedAttackVector:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.MAV
                                                ).jsonSchemaName,
                                            modifiedAttackComplexity:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.MAC
                                                ).jsonSchemaName,
                                            modifiedAttackRequirements:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.MAT
                                                ).jsonSchemaName,
                                            modifiedPrivilegesRequired:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.MPR
                                                ).jsonSchemaName,
                                            modifiedUserInteraction:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.MUI
                                                ).jsonSchemaName,
                                            modifiedVulnConfidentialityImpact:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.MVC
                                                ).jsonSchemaName,
                                            modifiedVulnIntegrityImpact:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.MVI
                                                ).jsonSchemaName,
                                            modifiedVulnAvailabilityImpact:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.MVA
                                                ).jsonSchemaName,
                                            modifiedSubConfidentialityImpact:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.MSC
                                                ).jsonSchemaName,
                                            modifiedSubIntegrityImpact:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.MSI
                                                ).jsonSchemaName,
                                            modifiedSubAvailabilityImpact:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.MSA
                                                ).jsonSchemaName,
                                            Safety: this.getComponent(
                                                n2.Cvss4P0Components.S
                                            ).jsonSchemaName,
                                            Automatable: this.getComponent(
                                                n2.Cvss4P0Components.AU
                                            ).jsonSchemaName,
                                            Recovery: this.getComponent(
                                                n2.Cvss4P0Components.R
                                            ).jsonSchemaName,
                                            valueDensity: this.getComponent(
                                                n2.Cvss4P0Components.V
                                            ).jsonSchemaName,
                                            vulnerabilityResponseEffort:
                                                this.getComponent(
                                                    n2.Cvss4P0Components.RE
                                                ).jsonSchemaName,
                                            providerUrgency: this.getComponent(
                                                n2.Cvss4P0Components.U
                                            ).jsonSchemaName,
                                        };
                                    }
                                }
                                ((t3.Cvss4P0 = l2),
                                    (r2.EQ.createCvssInstance = (e5) =>
                                        new l2(e5)));
                                class m {
                                    constructor() {
                                        ((this.sum = 0), (this.count = 0));
                                    }
                                    add(e5) {
                                        ((this.sum += e5), this.count++);
                                    }
                                    get(e5) {
                                        return 0 == this.count
                                            ? e5
                                            : this.sum / this.count;
                                    }
                                }
                            },
                        },
                        t2 = {};
                    return (function o2(a2) {
                        var i2 = t2[a2];
                        if (void 0 !== i2) return i2.exports;
                        var s2 = (t2[a2] = { exports: {} });
                        return (
                            e3[a2].call(s2.exports, s2, s2.exports, o2),
                            s2.exports
                        );
                    })(156);
                })()
            );
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/internal/debug.js
    var require_debug = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/internal/debug.js"(
            exports,
            module
        ) {
            "use strict";
            var debug =
                typeof process === "object" &&
                process.env &&
                process.env.NODE_DEBUG &&
                /\bsemver\b/i.test(process.env.NODE_DEBUG)
                    ? (...args) => console.error("SEMVER", ...args)
                    : () => {};
            module.exports = debug;
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/internal/constants.js
    var require_constants = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/internal/constants.js"(
            exports,
            module
        ) {
            "use strict";
            var SEMVER_SPEC_VERSION = "2.0.0";
            var MAX_LENGTH = 256;
            var MAX_SAFE_INTEGER =
                Number.MAX_SAFE_INTEGER /* istanbul ignore next */ ||
                9007199254740991;
            var MAX_SAFE_COMPONENT_LENGTH = 16;
            var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
            var RELEASE_TYPES = [
                "major",
                "premajor",
                "minor",
                "preminor",
                "patch",
                "prepatch",
                "prerelease",
            ];
            module.exports = {
                MAX_LENGTH,
                MAX_SAFE_COMPONENT_LENGTH,
                MAX_SAFE_BUILD_LENGTH,
                MAX_SAFE_INTEGER,
                RELEASE_TYPES,
                SEMVER_SPEC_VERSION,
                FLAG_INCLUDE_PRERELEASE: 1,
                FLAG_LOOSE: 2,
            };
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/internal/re.js
    var require_re = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/internal/re.js"(
            exports,
            module
        ) {
            "use strict";
            var {
                MAX_SAFE_COMPONENT_LENGTH,
                MAX_SAFE_BUILD_LENGTH,
                MAX_LENGTH,
            } = require_constants();
            var debug = require_debug();
            exports = module.exports = {};
            var re2 = (exports.re = []);
            var safeRe = (exports.safeRe = []);
            var src = (exports.src = []);
            var safeSrc = (exports.safeSrc = []);
            var t2 = (exports.t = {});
            var R2 = 0;
            var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
            var safeRegexReplacements = [
                ["\\s", 1],
                ["\\d", MAX_LENGTH],
                [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH],
            ];
            var makeSafeRegex = (value) => {
                for (const [token, max2] of safeRegexReplacements) {
                    value = value
                        .split(`${token}*`)
                        .join(`${token}{0,${max2}}`)
                        .split(`${token}+`)
                        .join(`${token}{1,${max2}}`);
                }
                return value;
            };
            var createToken = (name, value, isGlobal) => {
                const safe = makeSafeRegex(value);
                const index = R2++;
                debug(name, index, value);
                t2[name] = index;
                src[index] = value;
                safeSrc[index] = safe;
                re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
                safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
            };
            createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
            createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
            createToken(
                "NONNUMERICIDENTIFIER",
                `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`
            );
            createToken(
                "MAINVERSION",
                `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`
            );
            createToken(
                "MAINVERSIONLOOSE",
                `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`
            );
            createToken(
                "PRERELEASEIDENTIFIER",
                `(?:${src[t2.NONNUMERICIDENTIFIER]}|${src[t2.NUMERICIDENTIFIER]})`
            );
            createToken(
                "PRERELEASEIDENTIFIERLOOSE",
                `(?:${src[t2.NONNUMERICIDENTIFIER]}|${src[t2.NUMERICIDENTIFIERLOOSE]})`
            );
            createToken(
                "PRERELEASE",
                `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`
            );
            createToken(
                "PRERELEASELOOSE",
                `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`
            );
            createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
            createToken(
                "BUILD",
                `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`
            );
            createToken(
                "FULLPLAIN",
                `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`
            );
            createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
            createToken(
                "LOOSEPLAIN",
                `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`
            );
            createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
            createToken("GTLT", "((?:<|>)?=?)");
            createToken(
                "XRANGEIDENTIFIERLOOSE",
                `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`
            );
            createToken(
                "XRANGEIDENTIFIER",
                `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`
            );
            createToken(
                "XRANGEPLAIN",
                `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`
            );
            createToken(
                "XRANGEPLAINLOOSE",
                `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`
            );
            createToken(
                "XRANGE",
                `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`
            );
            createToken(
                "XRANGELOOSE",
                `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`
            );
            createToken(
                "COERCEPLAIN",
                `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`
            );
            createToken("COERCE", `${src[t2.COERCEPLAIN]}(?:$|[^\\d])`);
            createToken(
                "COERCEFULL",
                src[t2.COERCEPLAIN] +
                    `(?:${src[t2.PRERELEASE]})?(?:${src[t2.BUILD]})?(?:$|[^\\d])`
            );
            createToken("COERCERTL", src[t2.COERCE], true);
            createToken("COERCERTLFULL", src[t2.COERCEFULL], true);
            createToken("LONETILDE", "(?:~>?)");
            createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
            exports.tildeTrimReplace = "$1~";
            createToken(
                "TILDE",
                `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`
            );
            createToken(
                "TILDELOOSE",
                `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`
            );
            createToken("LONECARET", "(?:\\^)");
            createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
            exports.caretTrimReplace = "$1^";
            createToken(
                "CARET",
                `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`
            );
            createToken(
                "CARETLOOSE",
                `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`
            );
            createToken(
                "COMPARATORLOOSE",
                `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`
            );
            createToken(
                "COMPARATOR",
                `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`
            );
            createToken(
                "COMPARATORTRIM",
                `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`,
                true
            );
            exports.comparatorTrimReplace = "$1$2$3";
            createToken(
                "HYPHENRANGE",
                `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`
            );
            createToken(
                "HYPHENRANGELOOSE",
                `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`
            );
            createToken("STAR", "(<|>)?=?\\s*\\*");
            createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
            createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/internal/parse-options.js
    var require_parse_options = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/internal/parse-options.js"(
            exports,
            module
        ) {
            "use strict";
            var looseOption = Object.freeze({ loose: true });
            var emptyOpts = Object.freeze({});
            var parseOptions = (options) => {
                if (!options) {
                    return emptyOpts;
                }
                if (typeof options !== "object") {
                    return looseOption;
                }
                return options;
            };
            module.exports = parseOptions;
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/internal/identifiers.js
    var require_identifiers = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/internal/identifiers.js"(
            exports,
            module
        ) {
            "use strict";
            var numeric = /^[0-9]+$/;
            var compareIdentifiers = (a2, b2) => {
                if (typeof a2 === "number" && typeof b2 === "number") {
                    return a2 === b2 ? 0 : a2 < b2 ? -1 : 1;
                }
                const anum = numeric.test(a2);
                const bnum = numeric.test(b2);
                if (anum && bnum) {
                    a2 = +a2;
                    b2 = +b2;
                }
                return a2 === b2
                    ? 0
                    : anum && !bnum
                      ? -1
                      : bnum && !anum
                        ? 1
                        : a2 < b2
                          ? -1
                          : 1;
            };
            var rcompareIdentifiers = (a2, b2) => compareIdentifiers(b2, a2);
            module.exports = {
                compareIdentifiers,
                rcompareIdentifiers,
            };
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/classes/semver.js
    var require_semver = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/classes/semver.js"(
            exports,
            module
        ) {
            "use strict";
            var debug = require_debug();
            var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
            var { safeRe: re2, t: t2 } = require_re();
            var parseOptions = require_parse_options();
            var { compareIdentifiers } = require_identifiers();
            var SemVer = class _SemVer {
                constructor(version, options) {
                    options = parseOptions(options);
                    if (version instanceof _SemVer) {
                        if (
                            version.loose === !!options.loose &&
                            version.includePrerelease ===
                                !!options.includePrerelease
                        ) {
                            return version;
                        } else {
                            version = version.version;
                        }
                    } else if (typeof version !== "string") {
                        throw new TypeError(
                            `Invalid version. Must be a string. Got type "${typeof version}".`
                        );
                    }
                    if (version.length > MAX_LENGTH) {
                        throw new TypeError(
                            `version is longer than ${MAX_LENGTH} characters`
                        );
                    }
                    debug("SemVer", version, options);
                    this.options = options;
                    this.loose = !!options.loose;
                    this.includePrerelease = !!options.includePrerelease;
                    const m = version
                        .trim()
                        .match(options.loose ? re2[t2.LOOSE] : re2[t2.FULL]);
                    if (!m) {
                        throw new TypeError(`Invalid Version: ${version}`);
                    }
                    this.raw = version;
                    this.major = +m[1];
                    this.minor = +m[2];
                    this.patch = +m[3];
                    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
                        throw new TypeError("Invalid major version");
                    }
                    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
                        throw new TypeError("Invalid minor version");
                    }
                    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
                        throw new TypeError("Invalid patch version");
                    }
                    if (!m[4]) {
                        this.prerelease = [];
                    } else {
                        this.prerelease = m[4].split(".").map((id) => {
                            if (/^[0-9]+$/.test(id)) {
                                const num = +id;
                                if (num >= 0 && num < MAX_SAFE_INTEGER) {
                                    return num;
                                }
                            }
                            return id;
                        });
                    }
                    this.build = m[5] ? m[5].split(".") : [];
                    this.format();
                }
                format() {
                    this.version = `${this.major}.${this.minor}.${this.patch}`;
                    if (this.prerelease.length) {
                        this.version += `-${this.prerelease.join(".")}`;
                    }
                    return this.version;
                }
                toString() {
                    return this.version;
                }
                compare(other) {
                    debug("SemVer.compare", this.version, this.options, other);
                    if (!(other instanceof _SemVer)) {
                        if (
                            typeof other === "string" &&
                            other === this.version
                        ) {
                            return 0;
                        }
                        other = new _SemVer(other, this.options);
                    }
                    if (other.version === this.version) {
                        return 0;
                    }
                    return this.compareMain(other) || this.comparePre(other);
                }
                compareMain(other) {
                    if (!(other instanceof _SemVer)) {
                        other = new _SemVer(other, this.options);
                    }
                    if (this.major < other.major) {
                        return -1;
                    }
                    if (this.major > other.major) {
                        return 1;
                    }
                    if (this.minor < other.minor) {
                        return -1;
                    }
                    if (this.minor > other.minor) {
                        return 1;
                    }
                    if (this.patch < other.patch) {
                        return -1;
                    }
                    if (this.patch > other.patch) {
                        return 1;
                    }
                    return 0;
                }
                comparePre(other) {
                    if (!(other instanceof _SemVer)) {
                        other = new _SemVer(other, this.options);
                    }
                    if (this.prerelease.length && !other.prerelease.length) {
                        return -1;
                    } else if (
                        !this.prerelease.length &&
                        other.prerelease.length
                    ) {
                        return 1;
                    } else if (
                        !this.prerelease.length &&
                        !other.prerelease.length
                    ) {
                        return 0;
                    }
                    let i2 = 0;
                    do {
                        const a2 = this.prerelease[i2];
                        const b2 = other.prerelease[i2];
                        debug("prerelease compare", i2, a2, b2);
                        if (a2 === void 0 && b2 === void 0) {
                            return 0;
                        } else if (b2 === void 0) {
                            return 1;
                        } else if (a2 === void 0) {
                            return -1;
                        } else if (a2 === b2) {
                            continue;
                        } else {
                            return compareIdentifiers(a2, b2);
                        }
                    } while (++i2);
                }
                compareBuild(other) {
                    if (!(other instanceof _SemVer)) {
                        other = new _SemVer(other, this.options);
                    }
                    let i2 = 0;
                    do {
                        const a2 = this.build[i2];
                        const b2 = other.build[i2];
                        debug("build compare", i2, a2, b2);
                        if (a2 === void 0 && b2 === void 0) {
                            return 0;
                        } else if (b2 === void 0) {
                            return 1;
                        } else if (a2 === void 0) {
                            return -1;
                        } else if (a2 === b2) {
                            continue;
                        } else {
                            return compareIdentifiers(a2, b2);
                        }
                    } while (++i2);
                }
                // preminor will bump the version up to the next minor release, and immediately
                // down to pre-release. premajor and prepatch work the same way.
                inc(release, identifier, identifierBase) {
                    if (release.startsWith("pre")) {
                        if (!identifier && identifierBase === false) {
                            throw new Error(
                                "invalid increment argument: identifier is empty"
                            );
                        }
                        if (identifier) {
                            const match = `-${identifier}`.match(
                                this.options.loose
                                    ? re2[t2.PRERELEASELOOSE]
                                    : re2[t2.PRERELEASE]
                            );
                            if (!match || match[1] !== identifier) {
                                throw new Error(
                                    `invalid identifier: ${identifier}`
                                );
                            }
                        }
                    }
                    switch (release) {
                        case "premajor":
                            this.prerelease.length = 0;
                            this.patch = 0;
                            this.minor = 0;
                            this.major++;
                            this.inc("pre", identifier, identifierBase);
                            break;
                        case "preminor":
                            this.prerelease.length = 0;
                            this.patch = 0;
                            this.minor++;
                            this.inc("pre", identifier, identifierBase);
                            break;
                        case "prepatch":
                            this.prerelease.length = 0;
                            this.inc("patch", identifier, identifierBase);
                            this.inc("pre", identifier, identifierBase);
                            break;
                        // If the input is a non-prerelease version, this acts the same as
                        // prepatch.
                        case "prerelease":
                            if (this.prerelease.length === 0) {
                                this.inc("patch", identifier, identifierBase);
                            }
                            this.inc("pre", identifier, identifierBase);
                            break;
                        case "release":
                            if (this.prerelease.length === 0) {
                                throw new Error(
                                    `version ${this.raw} is not a prerelease`
                                );
                            }
                            this.prerelease.length = 0;
                            break;
                        case "major":
                            if (
                                this.minor !== 0 ||
                                this.patch !== 0 ||
                                this.prerelease.length === 0
                            ) {
                                this.major++;
                            }
                            this.minor = 0;
                            this.patch = 0;
                            this.prerelease = [];
                            break;
                        case "minor":
                            if (
                                this.patch !== 0 ||
                                this.prerelease.length === 0
                            ) {
                                this.minor++;
                            }
                            this.patch = 0;
                            this.prerelease = [];
                            break;
                        case "patch":
                            if (this.prerelease.length === 0) {
                                this.patch++;
                            }
                            this.prerelease = [];
                            break;
                        // This probably shouldn't be used publicly.
                        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
                        case "pre": {
                            const base = Number(identifierBase) ? 1 : 0;
                            if (this.prerelease.length === 0) {
                                this.prerelease = [base];
                            } else {
                                let i2 = this.prerelease.length;
                                while (--i2 >= 0) {
                                    if (
                                        typeof this.prerelease[i2] === "number"
                                    ) {
                                        this.prerelease[i2]++;
                                        i2 = -2;
                                    }
                                }
                                if (i2 === -1) {
                                    if (
                                        identifier ===
                                            this.prerelease.join(".") &&
                                        identifierBase === false
                                    ) {
                                        throw new Error(
                                            "invalid increment argument: identifier already exists"
                                        );
                                    }
                                    this.prerelease.push(base);
                                }
                            }
                            if (identifier) {
                                let prerelease = [identifier, base];
                                if (identifierBase === false) {
                                    prerelease = [identifier];
                                }
                                if (
                                    compareIdentifiers(
                                        this.prerelease[0],
                                        identifier
                                    ) === 0
                                ) {
                                    if (isNaN(this.prerelease[1])) {
                                        this.prerelease = prerelease;
                                    }
                                } else {
                                    this.prerelease = prerelease;
                                }
                            }
                            break;
                        }
                        default:
                            throw new Error(
                                `invalid increment argument: ${release}`
                            );
                    }
                    this.raw = this.format();
                    if (this.build.length) {
                        this.raw += `+${this.build.join(".")}`;
                    }
                    return this;
                }
            };
            module.exports = SemVer;
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/functions/compare.js
    var require_compare = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/functions/compare.js"(
            exports,
            module
        ) {
            "use strict";
            var SemVer = require_semver();
            var compare = (a2, b2, loose) =>
                new SemVer(a2, loose).compare(new SemVer(b2, loose));
            module.exports = compare;
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/functions/gte.js
    var require_gte = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/functions/gte.js"(
            exports,
            module
        ) {
            "use strict";
            var compare = require_compare();
            var gte = (a2, b2, loose) => compare(a2, b2, loose) >= 0;
            module.exports = gte;
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/functions/lt.js
    var require_lt = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/functions/lt.js"(
            exports,
            module
        ) {
            "use strict";
            var compare = require_compare();
            var lt = (a2, b2, loose) => compare(a2, b2, loose) < 0;
            module.exports = lt;
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/functions/lte.js
    var require_lte = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/functions/lte.js"(
            exports,
            module
        ) {
            "use strict";
            var compare = require_compare();
            var lte = (a2, b2, loose) => compare(a2, b2, loose) <= 0;
            module.exports = lte;
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/internal/lrucache.js
    var require_lrucache = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/internal/lrucache.js"(
            exports,
            module
        ) {
            "use strict";
            var LRUCache = class {
                constructor() {
                    this.max = 1e3;
                    this.map = /* @__PURE__ */ new Map();
                }
                get(key) {
                    const value = this.map.get(key);
                    if (value === void 0) {
                        return void 0;
                    } else {
                        this.map.delete(key);
                        this.map.set(key, value);
                        return value;
                    }
                }
                delete(key) {
                    return this.map.delete(key);
                }
                set(key, value) {
                    const deleted = this.delete(key);
                    if (!deleted && value !== void 0) {
                        if (this.map.size >= this.max) {
                            const firstKey = this.map.keys().next().value;
                            this.delete(firstKey);
                        }
                        this.map.set(key, value);
                    }
                    return this;
                }
            };
            module.exports = LRUCache;
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/functions/eq.js
    var require_eq = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/functions/eq.js"(
            exports,
            module
        ) {
            "use strict";
            var compare = require_compare();
            var eq = (a2, b2, loose) => compare(a2, b2, loose) === 0;
            module.exports = eq;
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/functions/neq.js
    var require_neq = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/functions/neq.js"(
            exports,
            module
        ) {
            "use strict";
            var compare = require_compare();
            var neq = (a2, b2, loose) => compare(a2, b2, loose) !== 0;
            module.exports = neq;
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/functions/gt.js
    var require_gt = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/functions/gt.js"(
            exports,
            module
        ) {
            "use strict";
            var compare = require_compare();
            var gt = (a2, b2, loose) => compare(a2, b2, loose) > 0;
            module.exports = gt;
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/functions/cmp.js
    var require_cmp = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/functions/cmp.js"(
            exports,
            module
        ) {
            "use strict";
            var eq = require_eq();
            var neq = require_neq();
            var gt = require_gt();
            var gte = require_gte();
            var lt = require_lt();
            var lte = require_lte();
            var cmp = (a2, op, b2, loose) => {
                switch (op) {
                    case "===":
                        if (typeof a2 === "object") {
                            a2 = a2.version;
                        }
                        if (typeof b2 === "object") {
                            b2 = b2.version;
                        }
                        return a2 === b2;
                    case "!==":
                        if (typeof a2 === "object") {
                            a2 = a2.version;
                        }
                        if (typeof b2 === "object") {
                            b2 = b2.version;
                        }
                        return a2 !== b2;
                    case "":
                    case "=":
                    case "==":
                        return eq(a2, b2, loose);
                    case "!=":
                        return neq(a2, b2, loose);
                    case ">":
                        return gt(a2, b2, loose);
                    case ">=":
                        return gte(a2, b2, loose);
                    case "<":
                        return lt(a2, b2, loose);
                    case "<=":
                        return lte(a2, b2, loose);
                    default:
                        throw new TypeError(`Invalid operator: ${op}`);
                }
            };
            module.exports = cmp;
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/classes/comparator.js
    var require_comparator = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/classes/comparator.js"(
            exports,
            module
        ) {
            "use strict";
            var ANY = /* @__PURE__ */ Symbol("SemVer ANY");
            var Comparator = class _Comparator {
                static get ANY() {
                    return ANY;
                }
                constructor(comp, options) {
                    options = parseOptions(options);
                    if (comp instanceof _Comparator) {
                        if (comp.loose === !!options.loose) {
                            return comp;
                        } else {
                            comp = comp.value;
                        }
                    }
                    comp = comp.trim().split(/\s+/).join(" ");
                    debug("comparator", comp, options);
                    this.options = options;
                    this.loose = !!options.loose;
                    this.parse(comp);
                    if (this.semver === ANY) {
                        this.value = "";
                    } else {
                        this.value = this.operator + this.semver.version;
                    }
                    debug("comp", this);
                }
                parse(comp) {
                    const r2 = this.options.loose
                        ? re2[t2.COMPARATORLOOSE]
                        : re2[t2.COMPARATOR];
                    const m = comp.match(r2);
                    if (!m) {
                        throw new TypeError(`Invalid comparator: ${comp}`);
                    }
                    this.operator = m[1] !== void 0 ? m[1] : "";
                    if (this.operator === "=") {
                        this.operator = "";
                    }
                    if (!m[2]) {
                        this.semver = ANY;
                    } else {
                        this.semver = new SemVer(m[2], this.options.loose);
                    }
                }
                toString() {
                    return this.value;
                }
                test(version) {
                    debug("Comparator.test", version, this.options.loose);
                    if (this.semver === ANY || version === ANY) {
                        return true;
                    }
                    if (typeof version === "string") {
                        try {
                            version = new SemVer(version, this.options);
                        } catch (er) {
                            return false;
                        }
                    }
                    return cmp(
                        version,
                        this.operator,
                        this.semver,
                        this.options
                    );
                }
                intersects(comp, options) {
                    if (!(comp instanceof _Comparator)) {
                        throw new TypeError("a Comparator is required");
                    }
                    if (this.operator === "") {
                        if (this.value === "") {
                            return true;
                        }
                        return new Range(comp.value, options).test(this.value);
                    } else if (comp.operator === "") {
                        if (comp.value === "") {
                            return true;
                        }
                        return new Range(this.value, options).test(comp.semver);
                    }
                    options = parseOptions(options);
                    if (
                        options.includePrerelease &&
                        (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")
                    ) {
                        return false;
                    }
                    if (
                        !options.includePrerelease &&
                        (this.value.startsWith("<0.0.0") ||
                            comp.value.startsWith("<0.0.0"))
                    ) {
                        return false;
                    }
                    if (
                        this.operator.startsWith(">") &&
                        comp.operator.startsWith(">")
                    ) {
                        return true;
                    }
                    if (
                        this.operator.startsWith("<") &&
                        comp.operator.startsWith("<")
                    ) {
                        return true;
                    }
                    if (
                        this.semver.version === comp.semver.version &&
                        this.operator.includes("=") &&
                        comp.operator.includes("=")
                    ) {
                        return true;
                    }
                    if (
                        cmp(this.semver, "<", comp.semver, options) &&
                        this.operator.startsWith(">") &&
                        comp.operator.startsWith("<")
                    ) {
                        return true;
                    }
                    if (
                        cmp(this.semver, ">", comp.semver, options) &&
                        this.operator.startsWith("<") &&
                        comp.operator.startsWith(">")
                    ) {
                        return true;
                    }
                    return false;
                }
            };
            module.exports = Comparator;
            var parseOptions = require_parse_options();
            var { safeRe: re2, t: t2 } = require_re();
            var cmp = require_cmp();
            var debug = require_debug();
            var SemVer = require_semver();
            var Range = require_range();
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/classes/range.js
    var require_range = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/classes/range.js"(
            exports,
            module
        ) {
            "use strict";
            var SPACE_CHARACTERS = /\s+/g;
            var Range = class _Range {
                constructor(range, options) {
                    options = parseOptions(options);
                    if (range instanceof _Range) {
                        if (
                            range.loose === !!options.loose &&
                            range.includePrerelease ===
                                !!options.includePrerelease
                        ) {
                            return range;
                        } else {
                            return new _Range(range.raw, options);
                        }
                    }
                    if (range instanceof Comparator) {
                        this.raw = range.value;
                        this.set = [[range]];
                        this.formatted = void 0;
                        return this;
                    }
                    this.options = options;
                    this.loose = !!options.loose;
                    this.includePrerelease = !!options.includePrerelease;
                    this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
                    this.set = this.raw
                        .split("||")
                        .map((r2) => this.parseRange(r2.trim()))
                        .filter((c2) => c2.length);
                    if (!this.set.length) {
                        throw new TypeError(
                            `Invalid SemVer Range: ${this.raw}`
                        );
                    }
                    if (this.set.length > 1) {
                        const first = this.set[0];
                        this.set = this.set.filter((c2) => !isNullSet(c2[0]));
                        if (this.set.length === 0) {
                            this.set = [first];
                        } else if (this.set.length > 1) {
                            for (const c2 of this.set) {
                                if (c2.length === 1 && isAny(c2[0])) {
                                    this.set = [c2];
                                    break;
                                }
                            }
                        }
                    }
                    this.formatted = void 0;
                }
                get range() {
                    if (this.formatted === void 0) {
                        this.formatted = "";
                        for (let i2 = 0; i2 < this.set.length; i2++) {
                            if (i2 > 0) {
                                this.formatted += "||";
                            }
                            const comps = this.set[i2];
                            for (let k2 = 0; k2 < comps.length; k2++) {
                                if (k2 > 0) {
                                    this.formatted += " ";
                                }
                                this.formatted += comps[k2].toString().trim();
                            }
                        }
                    }
                    return this.formatted;
                }
                format() {
                    return this.range;
                }
                toString() {
                    return this.range;
                }
                parseRange(range) {
                    const memoOpts =
                        (this.options.includePrerelease &&
                            FLAG_INCLUDE_PRERELEASE) |
                        (this.options.loose && FLAG_LOOSE);
                    const memoKey = memoOpts + ":" + range;
                    const cached = cache2.get(memoKey);
                    if (cached) {
                        return cached;
                    }
                    const loose = this.options.loose;
                    const hr = loose
                        ? re2[t2.HYPHENRANGELOOSE]
                        : re2[t2.HYPHENRANGE];
                    range = range.replace(
                        hr,
                        hyphenReplace(this.options.includePrerelease)
                    );
                    debug("hyphen replace", range);
                    range = range.replace(
                        re2[t2.COMPARATORTRIM],
                        comparatorTrimReplace
                    );
                    debug("comparator trim", range);
                    range = range.replace(re2[t2.TILDETRIM], tildeTrimReplace);
                    debug("tilde trim", range);
                    range = range.replace(re2[t2.CARETTRIM], caretTrimReplace);
                    debug("caret trim", range);
                    let rangeList = range
                        .split(" ")
                        .map((comp) => parseComparator(comp, this.options))
                        .join(" ")
                        .split(/\s+/)
                        .map((comp) => replaceGTE0(comp, this.options));
                    if (loose) {
                        rangeList = rangeList.filter((comp) => {
                            debug("loose invalid filter", comp, this.options);
                            return !!comp.match(re2[t2.COMPARATORLOOSE]);
                        });
                    }
                    debug("range list", rangeList);
                    const rangeMap = /* @__PURE__ */ new Map();
                    const comparators = rangeList.map(
                        (comp) => new Comparator(comp, this.options)
                    );
                    for (const comp of comparators) {
                        if (isNullSet(comp)) {
                            return [comp];
                        }
                        rangeMap.set(comp.value, comp);
                    }
                    if (rangeMap.size > 1 && rangeMap.has("")) {
                        rangeMap.delete("");
                    }
                    const result = [...rangeMap.values()];
                    cache2.set(memoKey, result);
                    return result;
                }
                intersects(range, options) {
                    if (!(range instanceof _Range)) {
                        throw new TypeError("a Range is required");
                    }
                    return this.set.some((thisComparators) => {
                        return (
                            isSatisfiable(thisComparators, options) &&
                            range.set.some((rangeComparators) => {
                                return (
                                    isSatisfiable(rangeComparators, options) &&
                                    thisComparators.every((thisComparator) => {
                                        return rangeComparators.every(
                                            (rangeComparator) => {
                                                return thisComparator.intersects(
                                                    rangeComparator,
                                                    options
                                                );
                                            }
                                        );
                                    })
                                );
                            })
                        );
                    });
                }
                // if ANY of the sets match ALL of its comparators, then pass
                test(version) {
                    if (!version) {
                        return false;
                    }
                    if (typeof version === "string") {
                        try {
                            version = new SemVer(version, this.options);
                        } catch (er) {
                            return false;
                        }
                    }
                    for (let i2 = 0; i2 < this.set.length; i2++) {
                        if (testSet(this.set[i2], version, this.options)) {
                            return true;
                        }
                    }
                    return false;
                }
            };
            module.exports = Range;
            var LRU = require_lrucache();
            var cache2 = new LRU();
            var parseOptions = require_parse_options();
            var Comparator = require_comparator();
            var debug = require_debug();
            var SemVer = require_semver();
            var {
                safeRe: re2,
                t: t2,
                comparatorTrimReplace,
                tildeTrimReplace,
                caretTrimReplace,
            } = require_re();
            var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants();
            var isNullSet = (c2) => c2.value === "<0.0.0-0";
            var isAny = (c2) => c2.value === "";
            var isSatisfiable = (comparators, options) => {
                let result = true;
                const remainingComparators = comparators.slice();
                let testComparator = remainingComparators.pop();
                while (result && remainingComparators.length) {
                    result = remainingComparators.every((otherComparator) => {
                        return testComparator.intersects(
                            otherComparator,
                            options
                        );
                    });
                    testComparator = remainingComparators.pop();
                }
                return result;
            };
            var parseComparator = (comp, options) => {
                comp = comp.replace(re2[t2.BUILD], "");
                debug("comp", comp, options);
                comp = replaceCarets(comp, options);
                debug("caret", comp);
                comp = replaceTildes(comp, options);
                debug("tildes", comp);
                comp = replaceXRanges(comp, options);
                debug("xrange", comp);
                comp = replaceStars(comp, options);
                debug("stars", comp);
                return comp;
            };
            var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
            var replaceTildes = (comp, options) => {
                return comp
                    .trim()
                    .split(/\s+/)
                    .map((c2) => replaceTilde(c2, options))
                    .join(" ");
            };
            var replaceTilde = (comp, options) => {
                const r2 = options.loose ? re2[t2.TILDELOOSE] : re2[t2.TILDE];
                return comp.replace(r2, (_2, M, m, p2, pr) => {
                    debug("tilde", comp, _2, M, m, p2, pr);
                    let ret;
                    if (isX(M)) {
                        ret = "";
                    } else if (isX(m)) {
                        ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
                    } else if (isX(p2)) {
                        ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
                    } else if (pr) {
                        debug("replaceTilde pr", pr);
                        ret = `>=${M}.${m}.${p2}-${pr} <${M}.${+m + 1}.0-0`;
                    } else {
                        ret = `>=${M}.${m}.${p2} <${M}.${+m + 1}.0-0`;
                    }
                    debug("tilde return", ret);
                    return ret;
                });
            };
            var replaceCarets = (comp, options) => {
                return comp
                    .trim()
                    .split(/\s+/)
                    .map((c2) => replaceCaret(c2, options))
                    .join(" ");
            };
            var replaceCaret = (comp, options) => {
                debug("caret", comp, options);
                const r2 = options.loose ? re2[t2.CARETLOOSE] : re2[t2.CARET];
                const z = options.includePrerelease ? "-0" : "";
                return comp.replace(r2, (_2, M, m, p2, pr) => {
                    debug("caret", comp, _2, M, m, p2, pr);
                    let ret;
                    if (isX(M)) {
                        ret = "";
                    } else if (isX(m)) {
                        ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
                    } else if (isX(p2)) {
                        if (M === "0") {
                            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
                        } else {
                            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
                        }
                    } else if (pr) {
                        debug("replaceCaret pr", pr);
                        if (M === "0") {
                            if (m === "0") {
                                ret = `>=${M}.${m}.${p2}-${pr} <${M}.${m}.${+p2 + 1}-0`;
                            } else {
                                ret = `>=${M}.${m}.${p2}-${pr} <${M}.${+m + 1}.0-0`;
                            }
                        } else {
                            ret = `>=${M}.${m}.${p2}-${pr} <${+M + 1}.0.0-0`;
                        }
                    } else {
                        debug("no pr");
                        if (M === "0") {
                            if (m === "0") {
                                ret = `>=${M}.${m}.${p2}${z} <${M}.${m}.${+p2 + 1}-0`;
                            } else {
                                ret = `>=${M}.${m}.${p2}${z} <${M}.${+m + 1}.0-0`;
                            }
                        } else {
                            ret = `>=${M}.${m}.${p2} <${+M + 1}.0.0-0`;
                        }
                    }
                    debug("caret return", ret);
                    return ret;
                });
            };
            var replaceXRanges = (comp, options) => {
                debug("replaceXRanges", comp, options);
                return comp
                    .split(/\s+/)
                    .map((c2) => replaceXRange(c2, options))
                    .join(" ");
            };
            var replaceXRange = (comp, options) => {
                comp = comp.trim();
                const r2 = options.loose ? re2[t2.XRANGELOOSE] : re2[t2.XRANGE];
                return comp.replace(r2, (ret, gtlt, M, m, p2, pr) => {
                    debug("xRange", comp, ret, gtlt, M, m, p2, pr);
                    const xM = isX(M);
                    const xm = xM || isX(m);
                    const xp = xm || isX(p2);
                    const anyX = xp;
                    if (gtlt === "=" && anyX) {
                        gtlt = "";
                    }
                    pr = options.includePrerelease ? "-0" : "";
                    if (xM) {
                        if (gtlt === ">" || gtlt === "<") {
                            ret = "<0.0.0-0";
                        } else {
                            ret = "*";
                        }
                    } else if (gtlt && anyX) {
                        if (xm) {
                            m = 0;
                        }
                        p2 = 0;
                        if (gtlt === ">") {
                            gtlt = ">=";
                            if (xm) {
                                M = +M + 1;
                                m = 0;
                                p2 = 0;
                            } else {
                                m = +m + 1;
                                p2 = 0;
                            }
                        } else if (gtlt === "<=") {
                            gtlt = "<";
                            if (xm) {
                                M = +M + 1;
                            } else {
                                m = +m + 1;
                            }
                        }
                        if (gtlt === "<") {
                            pr = "-0";
                        }
                        ret = `${gtlt + M}.${m}.${p2}${pr}`;
                    } else if (xm) {
                        ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
                    } else if (xp) {
                        ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
                    }
                    debug("xRange return", ret);
                    return ret;
                });
            };
            var replaceStars = (comp, options) => {
                debug("replaceStars", comp, options);
                return comp.trim().replace(re2[t2.STAR], "");
            };
            var replaceGTE0 = (comp, options) => {
                debug("replaceGTE0", comp, options);
                return comp
                    .trim()
                    .replace(
                        re2[options.includePrerelease ? t2.GTE0PRE : t2.GTE0],
                        ""
                    );
            };
            var hyphenReplace =
                (incPr) =>
                ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
                    if (isX(fM)) {
                        from = "";
                    } else if (isX(fm)) {
                        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
                    } else if (isX(fp)) {
                        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
                    } else if (fpr) {
                        from = `>=${from}`;
                    } else {
                        from = `>=${from}${incPr ? "-0" : ""}`;
                    }
                    if (isX(tM)) {
                        to = "";
                    } else if (isX(tm)) {
                        to = `<${+tM + 1}.0.0-0`;
                    } else if (isX(tp)) {
                        to = `<${tM}.${+tm + 1}.0-0`;
                    } else if (tpr) {
                        to = `<=${tM}.${tm}.${tp}-${tpr}`;
                    } else if (incPr) {
                        to = `<${tM}.${tm}.${+tp + 1}-0`;
                    } else {
                        to = `<=${to}`;
                    }
                    return `${from} ${to}`.trim();
                };
            var testSet = (set, version, options) => {
                for (let i2 = 0; i2 < set.length; i2++) {
                    if (!set[i2].test(version)) {
                        return false;
                    }
                }
                if (version.prerelease.length && !options.includePrerelease) {
                    for (let i2 = 0; i2 < set.length; i2++) {
                        debug(set[i2].semver);
                        if (set[i2].semver === Comparator.ANY) {
                            continue;
                        }
                        if (set[i2].semver.prerelease.length > 0) {
                            const allowed = set[i2].semver;
                            if (
                                allowed.major === version.major &&
                                allowed.minor === version.minor &&
                                allowed.patch === version.patch
                            ) {
                                return true;
                            }
                        }
                    }
                    return false;
                }
                return true;
            };
        },
    });

    // node_modules/.pnpm/semver@7.7.4/node_modules/semver/ranges/max-satisfying.js
    var require_max_satisfying = __commonJS({
        "node_modules/.pnpm/semver@7.7.4/node_modules/semver/ranges/max-satisfying.js"(
            exports,
            module
        ) {
            "use strict";
            var SemVer = require_semver();
            var Range = require_range();
            var maxSatisfying = (versions, range, options) => {
                let max2 = null;
                let maxSV = null;
                let rangeObj = null;
                try {
                    rangeObj = new Range(range, options);
                } catch (er) {
                    return null;
                }
                versions.forEach((v2) => {
                    if (rangeObj.test(v2)) {
                        if (!max2 || maxSV.compare(v2) === -1) {
                            max2 = v2;
                            maxSV = new SemVer(max2, options);
                        }
                    }
                });
                return max2;
            };
            module.exports = maxSatisfying;
        },
    });

    // src/features/show-vulnerabilities.ts
    var show_vulnerabilities_exports = {};
    __export(show_vulnerabilities_exports, {
        description: () => description22,
        run: () => run20,
        runPre: () => runPre19,
        teardown: () => teardown14,
    });
    function teardown14(previousUrl) {
        if (isSamePackagePage(previousUrl)) return;
        document.querySelector(".npm-userscript-vulnerability-label")?.remove();
        document
            .querySelectorAll(".npm-userscript-vulnerability-tag")
            .forEach((el) => el.remove());
        document
            .querySelectorAll(".npm-userscript-vulnerability-popup")
            .forEach((el) => el.remove());
    }
    function runPre19() {
        addPackageLabelStyle();
        addStyle(`
    .npm-userscript-vulnerability-tag {
      background: none;
      border: none;
      padding: 0;
      margin-left: 8px;
      cursor: pointer;
      vertical-align: middle;
    }
    .npm-userscript-vulnerability-popup {
      display: none;
      z-index: 1000;
      overflow-y: auto;
      position: absolute;
      top: 0;
      left: 0;
      background: var(--background-color);
      color: black;
      font-size: 90%;
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid #aaa;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .npm-userscript-vulnerability-popup ul {
      margin: 0;
      padding: 0 0 0 16px;
      font-size: 1em
    }
    .npm-userscript-vulnerability-popup li {
      margin: 6px 0;
    }
  `);
    }
    async function run20() {
        if (!isValidPackagePage()) return;
        if (!badgeVisibility.vulnerable.get()) return;
        if (
            document.querySelector(".npm-userscript-vulnerability-label") &&
            document.querySelector(".npm-userscript-vulnerability-tag")
        )
            return;
        const packageName = getPackageName();
        const packageVersion = getPackageVersion();
        if (!packageName || !packageVersion) return;
        const vulnerabilities = await fetchVulnerabilities(packageName);
        if (vulnerabilities.length === 0) return;
        if (!document.querySelector(".npm-userscript-vulnerability-label")) {
            const vulnsForVersion = getVulnerabilitiesForVersion(
                packageVersion,
                vulnerabilities
            );
            const injectParent = document.querySelector(
                "#top > div:first-child"
            );
            if (vulnsForVersion && injectParent) {
                const label = addPackageLabel(
                    "show-vulnerabilities",
                    "VULNERABLE",
                    "error",
                    "button",
                    "vulnerable"
                );
                label.classList.add("npm-userscript-vulnerability-label");
                const popup = createPopup(vulnsForVersion, label);
                injectParent.appendChild(popup);
            }
        }
        if (
            new URLSearchParams(location.search).get("activeTab") === "versions"
        ) {
            await addVulnerabilityTagToTable(vulnerabilities);
        }
    }
    async function fetchVulnerabilities(packageName) {
        const result = await fetchJson("https://api.osv.dev/v1/query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                package: { name: packageName, ecosystem: "npm" },
            }),
        });
        const vulnerabilities = (result.vulns || [])
            .sort(
                (left, right) =>
                    new Date(right.published || 0).getTime() -
                    new Date(left.published || 0).getTime()
            )
            .map((vulnerability) =>
                normalizeVulnerability(vulnerability, packageName)
            )
            .filter((vulnerability) => vulnerability !== void 0);
        return dedupeVulnerabilities(vulnerabilities);
    }
    function dedupeVulnerabilities(vulnerabilities) {
        const deduplicated = /* @__PURE__ */ new Map();
        for (const vulnerability of vulnerabilities) {
            const existing = deduplicated.get(vulnerability.id);
            if (!existing) {
                deduplicated.set(vulnerability.id, vulnerability);
                continue;
            }
            const rangeKeys = new Set(
                existing.affected.map(
                    (range) =>
                        `${range.introduced}|${range.fixed || ""}|${range.lastAffected || ""}`
                )
            );
            for (const range of vulnerability.affected) {
                const key = `${range.introduced}|${range.fixed || ""}|${range.lastAffected || ""}`;
                if (!rangeKeys.has(key)) {
                    existing.affected.push(range);
                    rangeKeys.add(key);
                }
            }
            existing.score = Math.max(existing.score, vulnerability.score);
        }
        return [...deduplicated.values()];
    }
    function normalizeVulnerability(vulnerability, packageName) {
        const affected = getAffectedRanges(vulnerability.affected, packageName);
        if (affected.length === 0) return void 0;
        const id =
            vulnerability.aliases?.find((alias) =>
                typeof alias === "string" ? alias.startsWith("CVE-") : false
            ) || vulnerability.id;
        if (typeof id !== "string") return void 0;
        const references = Array.isArray(vulnerability.references)
            ? vulnerability.references
            : [];
        const linkCandidate =
            references.find((reference) =>
                reference.url?.includes(vulnerability.id)
            )?.url ||
            references.find((reference) => reference.url?.includes(id))?.url ||
            references.find((reference) => reference.type === "ADVISORY")
                ?.url ||
            references[0]?.url;
        const link =
            normalizeHttpUrl3(linkCandidate) ||
            `https://osv.dev/vulnerability/${encodeURIComponent(vulnerability.id)}`;
        return {
            id,
            link,
            score: getVulnerabilityScore(vulnerability),
            affected,
        };
    }
    function getAffectedRanges(value, packageName) {
        if (!Array.isArray(value)) return [];
        const affectedRanges = [];
        for (const affected of value) {
            if (
                affected?.package?.ecosystem !== "npm" ||
                affected.package.name !== packageName
            )
                continue;
            if (!Array.isArray(affected.ranges)) continue;
            for (const range of affected.ranges) {
                if (range?.type !== "SEMVER" || !Array.isArray(range.events))
                    continue;
                let introduced;
                for (const event of range.events) {
                    if (typeof event.introduced === "string")
                        introduced = padVersion(event.introduced);
                    if (introduced && typeof event.fixed === "string") {
                        affectedRanges.push({
                            introduced,
                            fixed: padVersion(event.fixed),
                        });
                        introduced = void 0;
                    } else if (
                        introduced &&
                        typeof event.last_affected === "string"
                    ) {
                        affectedRanges.push({
                            introduced,
                            lastAffected: padVersion(event.last_affected),
                        });
                        introduced = void 0;
                    }
                }
                if (introduced) affectedRanges.push({ introduced });
            }
        }
        return affectedRanges;
    }
    function getVulnerabilityScore(vulnerability) {
        for (const severity2 of vulnerability.severity || []) {
            if (
                typeof severity2?.score !== "string" ||
                !severity2.score.startsWith("CVSS:")
            )
                continue;
            try {
                return (0, import_ae_cvss_calculator.fromVector)(
                    severity2.score
                ).calculateScores().overall;
            } catch {}
        }
        const severity = String(
            vulnerability.database_specific?.severity || ""
        ).toUpperCase();
        const severityScores = {
            CRITICAL: 9,
            HIGH: 7,
            MODERATE: 4,
            MEDIUM: 4,
            LOW: 1,
        };
        return severityScores[severity] || 0;
    }
    function normalizeHttpUrl3(value) {
        if (typeof value !== "string") return void 0;
        try {
            const url = new URL(value);
            return url.protocol === "https:" || url.protocol === "http:"
                ? url.href
                : void 0;
        } catch {
            return void 0;
        }
    }
    async function addVulnerabilityTagToTable(vulns) {
        if (document.querySelector(".npm-userscript-vulnerability-tag")) return;
        const featureSettings2 = await getFeatureSettings3();
        if (featureSettings2["better-versions"].get() === true) {
            await waitForElement('[aria-labelledby="cumulated-versions"]');
        }
        const allVersions = Object.keys(
            getNpmContext().context.versionsDownloads
        );
        document.querySelectorAll("table tr").forEach((row) => {
            const versionEl =
                row.querySelector("td a") ?? row.querySelector("td span");
            if (!versionEl) return;
            let version = versionEl.textContent;
            if (version.endsWith(".x")) {
                const matched = (0, import_max_satisfying.default)(
                    allVersions,
                    version
                );
                if (!matched) return;
                version = matched;
            }
            const vulnsForVersion = getVulnerabilitiesForVersion(
                version,
                vulns
            );
            if (!vulnsForVersion) return;
            const button = document.createElement("button");
            button.className = "npm-userscript-vulnerability-tag ml2";
            button.innerHTML = warningSvg;
            button.style.color = vulnerabilityScoreToColor(
                Math.max(...vulnsForVersion.map((v2) => v2.score))
            );
            const popup = createPopup(vulnsForVersion, button);
            versionEl.insertAdjacentElement("afterend", button);
            versionEl.insertAdjacentElement("afterend", popup);
        });
    }
    function createPopup(vulns, ref) {
        const popup = document.createElement("div");
        popup.className = "npm-userscript-vulnerability-popup";
        let inited2 = false;
        computeFloatingUI(ref, popup, {
            onBeforeOpen() {
                if (inited2) return;
                inited2 = true;
                const description26 = document.createElement("p");
                description26.className = "mt1 mb2";
                description26.textContent = "This version is vulnerable:";
                const list = document.createElement("ul");
                for (const vulnerability of vulns) {
                    const item = document.createElement("li");
                    const link = document.createElement("a");
                    link.className = "black-60 code";
                    link.href = vulnerability.link;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    link.textContent = vulnerability.id;
                    const severity = document.createElement("span");
                    severity.style.color = vulnerabilityScoreToColor(
                        vulnerability.score
                    );
                    severity.textContent = vulnerabilityScoreToText(
                        vulnerability.score
                    );
                    item.append(
                        link,
                        ` - ${vulnerability.score} (`,
                        severity,
                        document.createTextNode(")")
                    );
                    list.appendChild(item);
                }
                popup.replaceChildren(description26, list);
            },
        });
        return popup;
    }
    function getVulnerabilitiesForVersion(version, vulnerabilities) {
        const matched = [];
        for (const vuln of vulnerabilities) {
            for (const affected of vuln.affected) {
                try {
                    if (affected.lastAffected) {
                        if (
                            (0, import_gte.default)(
                                version,
                                affected.introduced
                            ) &&
                            (0, import_lte.default)(
                                version,
                                affected.lastAffected
                            )
                        ) {
                            matched.push(vuln);
                            break;
                        }
                    } else if (affected.fixed) {
                        if (
                            (0, import_gte.default)(
                                version,
                                affected.introduced
                            ) &&
                            (0, import_lt.default)(version, affected.fixed)
                        ) {
                            matched.push(vuln);
                            break;
                        }
                    } else if (
                        (0, import_gte.default)(version, affected.introduced)
                    ) {
                        matched.push(vuln);
                        break;
                    }
                } catch {}
            }
        }
        return matched.length > 0 ? matched : void 0;
    }
    function padVersion(v2) {
        if (v2 === "0") return "0.0.0";
        const parts = v2.split(".");
        while (parts.length < 3) {
            parts.push("0");
        }
        return parts.join(".");
    }
    function vulnerabilityScoreToText(score) {
        if (score >= 9) return "Critical";
        if (score >= 7) return "High";
        if (score >= 4) return "Medium";
        if (score > 0) return "Low";
        return "None";
    }
    function vulnerabilityScoreToColor(score) {
        if (score >= 9) return "var(--color-fg-danger)";
        if (score >= 7) return "#d15704";
        if (score >= 4) return "var(--color-fg-attention)";
        if (score > 0) return "var(--color-fg-accent)";
        return "var(--color-fg-subtle)";
    }
    async function getFeatureSettings3() {
        const settings = await Promise.resolve().then(
            () => (init_settings(), settings_exports)
        );
        return settings.featureSettings;
    }
    var import_ae_cvss_calculator,
        import_gte,
        import_lt,
        import_lte,
        import_max_satisfying,
        description22,
        warningSvg;
    var init_show_vulnerabilities = __esm({
        "src/features/show-vulnerabilities.ts"() {
            import_ae_cvss_calculator = __toESM(
                require_ae_cvss_calculator(),
                1
            );
            import_gte = __toESM(require_gte(), 1);
            import_lt = __toESM(require_lt(), 1);
            import_lte = __toESM(require_lte(), 1);
            import_max_satisfying = __toESM(require_max_satisfying(), 1);
            init_enhancement_settings();
            init_utils_fetch();
            init_utils_npm_context();
            init_utils_ui();
            init_utils();
            description22 = `Adds a label if a package is vulnerable in the header and versions table. The core vulnerability data
is powered by https://osv.dev.
`;
            warningSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`;
        },
    });

    // src/features/stars.ts
    var stars_exports = {};
    __export(stars_exports, {
        description: () => description23,
        run: () => run21,
        runPre: () => runPre20,
        teardown: () => teardown15,
    });
    function teardown15(previousUrl) {
        if (isSamePackagePage(previousUrl)) return;
        document.querySelector(".npm-userscript-stars-column")?.remove();
    }
    async function runPre20() {
        if (!isValidPackagePage()) return;
        if ((await getFeatureSettings4())["repository-card"].get() === true)
            return;
        addStyle(`
    .npm-userscript-stars-link {
      text-decoration: none;
    }

    .npm-userscript-stars-link:focus,
    .npm-userscript-stars-link:hover {
      text-decoration: underline;
      color: #cb3837;
    }
  `);
    }
    async function run21() {
        if (!isValidPackagePage()) return;
        if ((await getFeatureSettings4())["repository-card"].get() === true)
            return;
        if (document.querySelector(".npm-userscript-stars-column")) return;
        const sidebarColumns = document.querySelectorAll(
            '[aria-label="Package sidebar"] > div:has(> h3)'
        );
        const ref = Array.from(sidebarColumns).find(
            (col) => col.querySelector("h3")?.textContent === "Total Files"
        );
        if (!ref) return;
        const data = await fetchGitHubRepoData();
        if (!data) return;
        const link = `https://github.com/${data.full_name}/stargazers`;
        const count = data.stargazers_count.toLocaleString();
        const cloned = ref.cloneNode(true);
        cloned.classList.add("npm-userscript-stars-column");
        cloned.classList.remove("w-100");
        cloned.querySelector("h3").textContent = "Stars";
        const linkHtml = `<a class="npm-userscript-stars-link" href="${link}">${count}</a>`;
        cloned.querySelector("p").innerHTML = linkHtml;
        ref.insertAdjacentElement("afterend", cloned);
    }
    async function getFeatureSettings4() {
        const settings = await Promise.resolve().then(
            () => (init_settings(), settings_exports)
        );
        return settings.featureSettings;
    }
    var description23;
    var init_stars = __esm({
        "src/features/stars.ts"() {
            init_utils_fetch();
            init_utils();
            description23 = `Display a "Stars" column in the package sidebar for GitHub repos.
`;
        },
    });

    // src/features/tarball-size.ts
    var tarball_size_exports = {};
    __export(tarball_size_exports, {
        description: () => description24,
        run: () => run22,
        teardown: () => teardown16,
    });
    function teardown16(previousUrl) {
        if (isSamePackagePage(previousUrl)) return;
        document.querySelector(".npm-userscript-tarball-size-column")?.remove();
    }
    async function run22() {
        if (!isValidPackagePage()) return;
        if (document.querySelector(".npm-userscript-tarball-size-column"))
            return;
        const tarballSize = await getTarballSize();
        if (!tarballSize) return;
        const columnToInsertAfter = await getColumnToInsertAfter();
        if (!columnToInsertAfter) return;
        const tarballSizeColumn = columnToInsertAfter.cloneNode(true);
        tarballSizeColumn.classList.add("npm-userscript-tarball-size-column");
        tarballSizeColumn.querySelector("h3").textContent = "Tarball Size";
        tarballSizeColumn.querySelector("p").textContent = tarballSize;
        columnToInsertAfter.insertAdjacentElement(
            "afterend",
            tarballSizeColumn
        );
    }
    async function getTarballSize() {
        const packageJson = await fetchPackageJson();
        const tarballUrl = packageJson?.dist?.tarball;
        if (typeof tarballUrl !== "string") return;
        return prettyBytes(await fetchContentLength(tarballUrl));
    }
    async function getColumnToInsertAfter() {
        const column = getColumnByName("Unpacked Size");
        if (column) return column;
        const featureSettings2 = await getFeatureSettings5();
        if (featureSettings2["unpacked-size-and-total-files"].get() === true) {
            return waitForColumnByName("Unpacked Size");
        } else {
            const column2 = getColumnByName("License");
            return column2;
        }
    }
    function waitForColumnByName(name) {
        return new Promise((resolve) => {
            const timeout = window.setTimeout(() => {
                observer2.disconnect();
                resolve(void 0);
            }, 5e3);
            const observer2 = new MutationObserver(() => {
                const column = getColumnByName(name);
                if (!column) return;
                window.clearTimeout(timeout);
                observer2.disconnect();
                resolve(column);
            });
            const sidebar = document.querySelector(
                '[aria-label="Package sidebar"]'
            );
            if (!sidebar) {
                window.clearTimeout(timeout);
                resolve(void 0);
                return;
            }
            observer2.observe(sidebar, { childList: true, subtree: true });
        });
    }
    function getColumnByName(name) {
        const sidebarColumns = document.querySelectorAll(
            '[aria-label="Package sidebar"] > div:has(> h3)'
        );
        return Array.from(sidebarColumns).find(
            (col) => col.querySelector("h3")?.textContent === name
        );
    }
    async function getFeatureSettings5() {
        const settings = await Promise.resolve().then(
            () => (init_settings(), settings_exports)
        );
        return settings.featureSettings;
    }
    var description24;
    var init_tarball_size = __esm({
        "src/features/tarball-size.ts"() {
            init_utils_fetch();
            init_utils();
            description24 = `Display the tarball size of the package.
`;
        },
    });

    // src/features/unpacked-size-and-total-files.ts
    var unpacked_size_and_total_files_exports = {};
    __export(unpacked_size_and_total_files_exports, {
        description: () => description25,
        run: () => run23,
        teardown: () => teardown17,
    });
    function teardown17(previousUrl) {
        if (isSamePackagePage(previousUrl)) return;
        document
            .querySelector(".npm-userscript-unpacked-size-column")
            ?.remove();
        document.querySelector(".npm-userscript-total-files-column")?.remove();
    }
    async function run23() {
        if (!isValidPackagePage()) return;
        if (
            document.querySelector(".npm-userscript-unpacked-size-column") ||
            document.querySelector(".npm-userscript-total-files-column")
        )
            return;
        const sidebarColumns = document.querySelectorAll(
            '[aria-label="Package sidebar"] > div:has(> h3)'
        );
        const licenseColumn = Array.from(sidebarColumns).find(
            (col) => col.querySelector("h3")?.textContent === "License"
        );
        if (!licenseColumn) return;
        const unpackedSizeColumn = Array.from(sidebarColumns).find(
            (col) => col.querySelector("h3")?.textContent === "Unpacked Size"
        );
        const totalFilesColumn = Array.from(sidebarColumns).find(
            (col) => col.querySelector("h3")?.textContent === "Total Files"
        );
        if (unpackedSizeColumn && totalFilesColumn) return;
        const data = await fetchPackageFilesData();
        if (!data) return;
        if (!totalFilesColumn) {
            const newTotalFilesColumn = licenseColumn.cloneNode(true);
            newTotalFilesColumn.classList.add(
                "npm-userscript-total-files-column"
            );
            newTotalFilesColumn.querySelector("h3").textContent = "Total Files";
            newTotalFilesColumn.querySelector("p").textContent =
                data.fileCount.toString();
            licenseColumn.insertAdjacentElement(
                "afterend",
                newTotalFilesColumn
            );
        }
        if (!unpackedSizeColumn) {
            const newUnpackedSizeColumn = licenseColumn.cloneNode(true);
            newUnpackedSizeColumn.classList.add(
                "npm-userscript-unpacked-size-column"
            );
            newUnpackedSizeColumn.querySelector("h3").textContent =
                "Unpacked Size";
            newUnpackedSizeColumn.querySelector("p").textContent = prettyBytes(
                data.totalSize
            );
            licenseColumn.insertAdjacentElement(
                "afterend",
                newUnpackedSizeColumn
            );
        }
    }
    var description25;
    var init_unpacked_size_and_total_files = __esm({
        "src/features/unpacked-size-and-total-files.ts"() {
            init_utils_fetch();
            init_utils();
            description25 = `Display the "Unpacked Size" and "Total Files" columns for older packages that lack the data.
`;
        },
    });

    // src/all-features.ts
    var allFeatures;
    var init_all_features = __esm({
        "src/all-features.ts"() {
            init_better_dependencies();
            init_better_versions();
            init_compact_navigation();
            init_fix_highlight_styles();
            init_fix_issue_pr_count();
            init_fix_styles();
            init_helpful_links();
            init_module_replacements();
            init_move_funding();
            init_no_code_beta();
            init_remember_banner();
            init_remove_redundant_homepage();
            init_repository_card();
            init_repository_directory();
            init_search_results();
            init_show_binary_label();
            init_show_cli_label_and_command();
            init_show_engine_label();
            init_show_file_types_label();
            init_show_lifecycle_scripts_label();
            init_show_types_label();
            init_show_vulnerabilities();
            init_stars();
            init_tarball_size();
            init_unpacked_size_and_total_files();
            allFeatures = {
                "better-dependencies": better_dependencies_exports,
                "better-versions": better_versions_exports,
                "compact-navigation": compact_navigation_exports,
                "fix-highlight-styles": fix_highlight_styles_exports,
                "fix-issue-pr-count": fix_issue_pr_count_exports,
                "fix-styles": fix_styles_exports,
                "helpful-links": helpful_links_exports,
                "module-replacements": module_replacements_exports,
                "move-funding": move_funding_exports,
                "no-code-beta": no_code_beta_exports,
                "remember-banner": remember_banner_exports,
                "remove-redundant-homepage": remove_redundant_homepage_exports,
                "repository-card": repository_card_exports,
                "repository-directory": repository_directory_exports,
                "search-results": search_results_exports,
                "show-binary-label": show_binary_label_exports,
                "show-cli-label": show_cli_label_and_command_exports,
                "show-engine-label": show_engine_label_exports,
                "show-file-types-label": show_file_types_label_exports,
                "show-lifecycle-scripts-label":
                    show_lifecycle_scripts_label_exports,
                "show-types-label": show_types_label_exports,
                "show-vulnerabilities": show_vulnerabilities_exports,
                stars: stars_exports,
                "tarball-size": tarball_size_exports,
                "unpacked-size-and-total-files":
                    unpacked_size_and_total_files_exports,
            };
        },
    });

    // src/index.ts
    init_all_features();
    init_settings();
    init_utils_cache();

    // src/utils-navigation.ts
    async function waitForDocumentPartiallyReady() {
        if (document.body) return;
        await new Promise((resolve, reject) => {
            const timeout = window.setTimeout(() => {
                document.removeEventListener("DOMContentLoaded", onReady);
                reject(
                    new Error(
                        "[npm-userscript] Document took too long to be ready"
                    )
                );
            }, 1e4);
            function onReady() {
                window.clearTimeout(timeout);
                resolve();
            }
            document.addEventListener("DOMContentLoaded", onReady, {
                once: true,
            });
        });
    }
    async function waitForPageReady() {
        if (document.readyState === "loading") {
            await new Promise((resolve) => {
                document.addEventListener("DOMContentLoaded", () => resolve(), {
                    once: true,
                });
            });
        }
        if (!location.pathname.startsWith("/package/")) return;
        if (
            document.querySelector("main h1") &&
            document.querySelector('aside[aria-label="Package sidebar"]')
        ) {
            return;
        }
        await new Promise((resolve, reject) => {
            const timeout = window.setTimeout(() => {
                observer2.disconnect();
                reject(
                    new Error(
                        "[npm-userscript] npm package page took too long to render"
                    )
                );
            }, 1e4);
            const observer2 = new MutationObserver(() => {
                if (
                    document.querySelector("main h1") &&
                    document.querySelector(
                        'aside[aria-label="Package sidebar"]'
                    )
                ) {
                    window.clearTimeout(timeout);
                    observer2.disconnect();
                    resolve();
                }
            });
            observer2.observe(document.documentElement, {
                childList: true,
                subtree: true,
            });
        });
    }
    var onNavigateListeners = [];
    var lastHref = location.href;
    var navigationCheckQueued = false;
    function checkForNavigation() {
        navigationCheckQueued = false;
        if (location.href === lastHref) return;
        const previousUrl = lastHref;
        lastHref = location.href;
        onNavigateListeners.forEach((listener) => listener(previousUrl));
    }
    function queueNavigationCheck() {
        if (navigationCheckQueued) return;
        navigationCheckQueued = true;
        requestAnimationFrame(checkForNavigation);
    }
    function listenNavigate(listener) {
        if (onNavigateListeners.length === 0) {
            const observer2 = new MutationObserver(queueNavigationCheck);
            observer2.observe(document.documentElement, {
                childList: true,
                subtree: true,
            });
            window.addEventListener("popstate", queueNavigationCheck);
            window.addEventListener("hashchange", queueNavigationCheck);
            document.addEventListener("click", queueNavigationCheck, {
                capture: true,
            });
        }
        onNavigateListeners.push(listener);
    }

    // src/index.ts
    init_utils_npm_context();
    init_utils();
    main();
    async function main() {
        await waitForDocumentPartiallyReady();
        listenNpmContext();
        let sequencePromise = runFeatures().then(() => runNotImportantStuff());
        let teardownQueue = 0;
        listenNavigate(async (previousUrl) => {
            teardownQueue++;
            sequencePromise = sequencePromise.then(async () => {
                await runTeardown(previousUrl);
                if (teardownQueue-- > 1) return;
                await runFeatures();
                if (teardownQueue === 0) sequencePromise = Promise.resolve();
            });
        });
    }
    async function runTeardown(previousUrl) {
        const promises = [];
        for (const feature in allFeatures) {
            if (featureSettings[feature].get() === false) continue;
            const promise = allFeatures[feature]
                .teardown?.(previousUrl)
                ?.catch((err) => {
                    console.error(
                        `Error running teardown for feature "${feature}":`,
                        err
                    );
                });
            if (promise) promises.push(promise);
        }
        await Promise.all(promises);
        teardownSidebarBalance();
    }
    async function runFeatures() {
        const promises = [];
        for (const feature in allFeatures) {
            if (featureSettings[feature].get() === false) continue;
            const promise = allFeatures[feature].runPre?.()?.catch((err) => {
                console.error(
                    `Error running pre for feature "${feature}":`,
                    err
                );
            });
            if (promise) promises.push(promise);
        }
        await Promise.all(promises);
        promises.length = 0;
        consolidateStyles();
        await waitForPageReady();
        await waitForNpmContextReady();
        for (const feature in allFeatures) {
            if (featureSettings[feature].get() === false) continue;
            const promise = allFeatures[feature].run?.()?.catch((err) => {
                console.error(`Error running feature "${feature}":`, err);
            });
            if (promise) promises.push(promise);
        }
        await Promise.all(promises);
        promises.length = 0;
        consolidateStyles();
        ensureSidebarBalance();
        injectSettingsTrigger();
    }
    function runNotImportantStuff() {
        cache.clearExpired();
        clearOutdatedSettings();
    }
})();
/*!
 * Based on npm-userscript by Bjorn Lu: https://github.com/bluwy/npm-userscript
 *
 * MIT License
 *
 * Copyright (c) 2026 Bjorn Lu
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
