const fs = require("node:fs");
const path = require("node:path");

const { JSDOM, VirtualConsole } = require("jsdom");

const script = fs.readFileSync(
    path.join(__dirname, "..", "..", "NPM-Package-and-Search-Enhancer.user.js"),
    "utf8"
);
const moreInstallButtonsScript = fs.readFileSync(
    path.join(__dirname, "..", "..", "NPM-More-Install-Buttons.user.js"),
    "utf8"
);
const packageSizeScript = fs.readFileSync(
    path.join(__dirname, "..", "..", "NPM-Bundlephobia-Package-Size.user.js"),
    "utf8"
);

const FEATURE_NAMES = [
    "better-dependencies",
    "better-versions",
    "compact-navigation",
    "fix-highlight-styles",
    "fix-issue-pr-count",
    "fix-styles",
    "helpful-links",
    "install-commands",
    "module-replacements",
    "move-funding",
    "no-code-beta",
    "remember-banner",
    "remove-redundant-homepage",
    "repository-card",
    "repository-directory",
    "package-size",
    "search-results",
    "show-binary-label",
    "show-cli-label",
    "show-engine-label",
    "show-file-types-label",
    "show-lifecycle-scripts-label",
    "show-types-label",
    "show-vulnerabilities",
    "stars",
];

function createPage(body, url) {
    const virtualConsole = new VirtualConsole();
    if (process.env.DEBUG_NPM_ENHANCER_HARNESS) {
        virtualConsole.on("error", (...arguments_) =>
            console.error(...arguments_)
        );
        virtualConsole.on("jsdomError", (error) => console.error(error));
        virtualConsole.on("warn", (...arguments_) =>
            console.error(...arguments_)
        );
    }
    const dom = new JSDOM(body, {
        pretendToBeVisual: true,
        runScripts: "outside-only",
        url,
        virtualConsole,
    });
    dom.window.Headers = global.Headers;
    dom.window.Request = global.Request;
    dom.window.structuredClone = global.structuredClone;
    dom.window.requestAnimationFrame = (callback) =>
        dom.window.setTimeout(() => callback(Date.now()), 0);
    dom.window.cancelAnimationFrame = (id) => dom.window.clearTimeout(id);
    return dom;
}

function installGm(dom, respond) {
    const commands = [];
    const requests = [];
    const requestOptions = [];
    const values = new Map();

    dom.window.GM = {
        registerMenuCommand(label, callback) {
            commands.push({ callback, label });
            return 1;
        },
        xmlHttpRequest(options) {
            requests.push(options.url);
            requestOptions.push(options);
            dom.window.queueMicrotask(async () => {
                try {
                    const result = await respond(options.url, options);
                    const isExplicitResponse = result?.__gmResponse === true;
                    const response = isExplicitResponse ? result.body : result;
                    const status = isExplicitResponse
                        ? result.status
                        : options.url.endsWith(".tgz")
                          ? 206
                          : 200;
                    const responseHeaders = isExplicitResponse
                        ? result.responseHeaders
                        : options.url.endsWith(".tgz")
                          ? "content-range: bytes 0-0/3200"
                          : "content-type: application/json";
                    options.onreadystatechange?.({
                        readyState: 2,
                        status,
                    });
                    options.onload?.({
                        readyState: 4,
                        response,
                        responseHeaders,
                        responseText: JSON.stringify(response),
                        status,
                        statusText: isExplicitResponse
                            ? result.statusText
                            : "OK",
                    });
                } catch (error) {
                    options.onerror?.(error);
                }
            });
        },
    };
    dom.window.GM_getValue = (key, defaultValue) =>
        values.has(key) ? values.get(key) : defaultValue;
    dom.window.GM_registerMenuCommand = (label, callback) =>
        dom.window.GM.registerMenuCommand(label, callback);
    dom.window.GM_setClipboard = () => {};
    dom.window.GM_setValue = (key, value) => values.set(key, value);
    dom.window.GM_xmlhttpRequest = (options) =>
        dom.window.GM.xmlHttpRequest(options);

    return { commands, requestOptions, requests, values };
}

function runScript(dom) {
    dom.window.eval(script);
    dom.window.document.dispatchEvent(
        new dom.window.Event("DOMContentLoaded", { bubbles: true })
    );
}

async function waitFor(check, timeout = 3_000) {
    const started = Date.now();
    while (Date.now() - started < timeout) {
        const value = check();
        if (value) return value;
        await new Promise((resolve) => setTimeout(resolve, 10));
    }
    throw new Error(
        "Timed out waiting for the userscript to update the fixture"
    );
}

function createSearchCards(names) {
    return names
        .map(
            (name) => `
                <section>
                    <div>
                        <div><a href="/package/${name}"><h3>${name}</h3></a></div>
                        <p>Package description</p>
                    </div>
                    <div><span aria-label="Download statistics">1,000</span></div>
                </section>
            `
        )
        .join("");
}

function setFeatures(dom, enabledFeatures) {
    const enabled = new Set(enabledFeatures);
    for (const name of FEATURE_NAMES) {
        dom.window.localStorage.setItem(
            `npm-userscript:settings:feature:${name}`,
            JSON.stringify(enabled.has(name))
        );
    }
}

function setOnlyFeature(dom, enabledFeature) {
    setFeatures(dom, [enabledFeature]);
}

async function runDefaultSearchScenario() {
    const dom = createPage(
        `<title>Search | npm</title><main>${createSearchCards(["alpha", "beta"])}</main>`,
        "https://www.npmjs.com/search?q=example"
    );
    const gm = installGm(dom, async (url) => {
        if (!url.includes("/-/v1/search")) {
            throw new Error(`Unexpected request: ${url}`);
        }
        return {
            objects: ["alpha", "beta"].map((name) => ({
                package: {
                    links: {
                        homepage: `https://example.test/${name}`,
                        repository: `https://github.com/example/${name}`,
                    },
                    name,
                    version: "1.0.0",
                },
            })),
        };
    });

    try {
        runScript(dom);
        await waitFor(
            () =>
                dom.window.document.querySelectorAll(
                    '[data-npm-enhancer-links="search"]'
                ).length === 2
        );
        gm.commands
            .find((command) => command.label === "Open NPM Enhancer settings")
            .callback();
        const dialog = dom.window.document.querySelector(
            "#npm-userscript-settings"
        );
        const settingInputs = Array.from(
            dialog.querySelectorAll('.setting input[type="checkbox"]')
        );
        const enabledSetting = settingInputs.find((input) => input.checked);
        const disabledSetting = settingInputs.find((input) => !input.checked);
        return {
            commandLabels: gm.commands.map((command) => command.label),
            dialogTitle: dialog.querySelector("h2").textContent,
            requests: gm.requests,
            searchBadgeRows: dom.window.document.querySelectorAll(
                ".npm-userscript-search-badges"
            ).length,
            searchBadgesChecked: Array.from(
                dialog.querySelectorAll('.setting input[type="checkbox"]')
            ).find(
                (input) =>
                    input.nextElementSibling?.textContent.trim() ===
                    "Enhanced badges in search results"
            )?.checked,
            enhancedBadgesLabel: Array.from(
                dialog.querySelectorAll(".setting > span")
            ).some(
                (element) =>
                    element.textContent.trim() ===
                    "Enhanced badges in search results"
            ),
            linkAndBadgeSectionsOpen: ["Badges", "Links"].every((label) =>
                Array.from(dialog.querySelectorAll("details[open] > summary"))
                    .map((summary) => summary.textContent.trim())
                    .includes(label)
            ),
            previewCount: dialog.querySelectorAll(".setting-preview").length,
            customIconHelp: dialog.querySelector(".custom-help").textContent,
            versionLimitChecked: Array.from(
                dialog.querySelectorAll('.setting input[type="checkbox"]')
            ).find(
                (input) =>
                    input.nextElementSibling?.textContent.trim() ===
                    "Limit long version histories"
            )?.checked,
            dependencyTableLayoutChecked: Array.from(
                dialog.querySelectorAll('.setting input[type="checkbox"]')
            ).find(
                (input) =>
                    input.nextElementSibling?.textContent.trim() ===
                    "Tabbed dependency tables"
            )?.checked,
            enabledSettingColor:
                dom.window.getComputedStyle(enabledSetting).backgroundColor,
            disabledSettingColor:
                dom.window.getComputedStyle(disabledSetting).backgroundColor,
            versionLimitValue: dialog.querySelector(".inline-number")?.value,
            nativeDownloadsStayPut: Array.from(
                dom.window.document.querySelectorAll(
                    '[aria-label="Download statistics"]'
                )
            ).every(
                (download) =>
                    download.parentElement?.parentElement?.tagName === "SECTION"
            ),
            searchLinkRows: dom.window.document.querySelectorAll(
                '[data-npm-enhancer-links="search"]'
            ).length,
        };
    } finally {
        dom.window.close();
    }
}

async function runVersionsScenario() {
    const leadingVersions = [
        "1.0.0",
        "1.0.0+build.2",
        "1.0.0-beta.10",
        "1.0.0-beta.2",
        "1.0.0-alpha.1",
        "0.9.2",
        "0.9.1",
    ];
    const versions = [
        ...leadingVersions,
        ...Array.from({ length: 868 }, (_, index) => `0.8.${867 - index}`),
    ];
    const rows = versions
        .map(
            (version, index) =>
                `<tr><td><a href="/package/example/v/${version}">${version}</a></td><td>100</td><td><time datetime="${new Date(
                    Date.UTC(2026, 0, 31) - index * 86_400_000
                ).toISOString()}">recently</time></td></tr>`
        )
        .join("");
    const dom = createPage(
        `<title>example - npm</title><main><h1>example</h1>
            <section id="tabpanel-versions"></section>
            <aside aria-label="Package sidebar"><div><h3>Version</h3><p>7.0.0</p></div></aside>
        </main>`,
        "https://www.npmjs.com/package/example?activeTab=versions"
    );
    setOnlyFeature(dom, "better-versions");
    dom.window.localStorage.setItem(
        "npm-enhancer:settings:version-limit",
        "25"
    );
    const gm = installGm(dom, async (url) => {
        if (/\/(?:example|other)\/7\.0\.0$/u.test(url)) {
            return { version: "7.0.0" };
        }
        if (/\/(?:example|other)$/u.test(url)) {
            return {
                "dist-tags": { latest: "7.0.0" },
                time: Object.fromEntries(
                    versions.map((version, index) => [
                        version,
                        new Date(Date.UTC(2026, 0, 7 - index)).toISOString(),
                    ])
                ),
                versions: Object.fromEntries(
                    versions.map((version) => [version, {}])
                ),
            };
        }
        throw new Error(`Unexpected request: ${url}`);
    });

    try {
        runScript(dom);
        const summaryBeforeNative = await waitFor(() =>
            dom.window.document.querySelector(".npm-userscript-version-summary")
        );
        const shellStateBeforeNative = summaryBeforeNative.dataset.state;
        const versionsPanel =
            dom.window.document.querySelector("#tabpanel-versions");
        versionsPanel.insertAdjacentHTML(
            "beforeend",
            `<table aria-labelledby="current-tags"><tbody></tbody></table>
                <h3 id="version-history">Version History</h3>
                <table aria-labelledby="version-history"><thead><tr><th>Version</th><th>Downloads</th><th>Published</th></tr></thead><tbody>${rows}</tbody></table>`
        );
        const tabs = await waitFor(() => {
            const candidate = dom.window.document.querySelector(
                ".npm-userscript-version-tabs"
            );
            return candidate &&
                Array.from(candidate.querySelectorAll("button")).every(
                    (button) => !button.disabled
                )
                ? candidate
                : null;
        }, 5_000);
        const shellWasProgressive =
            shellStateBeforeNative === "loading" &&
            summaryBeforeNative.dataset.state === "ready";
        const summaryTable = dom.window.document.querySelector(
            ".npm-userscript-version-summary table"
        );
        const patchTab = Array.from(tabs.querySelectorAll("button")).find(
            (button) => button.dataset.versionLevel === "patch"
        );
        patchTab.click();
        const selectedViewHeading = dom.window.document.querySelector(
            ".npm-userscript-version-view-heading"
        )?.textContent;
        const selectedTabWeight =
            dom.window.getComputedStyle(patchTab).fontWeight;
        const summaryPanel = summaryTable.closest(
            ".npm-userscript-version-summary-panel"
        );
        const summaryTableStyle = dom.window.getComputedStyle(summaryTable);
        const nativeTable = dom.window.document.querySelector(
            'table[aria-labelledby="version-history"]'
        );
        await waitFor(() => {
            const hidden = nativeTable.querySelectorAll(
                ".npm-userscript-version-limit-hidden"
            ).length;
            return hidden === versions.length - 25;
        }, 5_000);
        const hiddenBeforeShowAll = nativeTable.querySelectorAll(
            ".npm-userscript-version-limit-hidden"
        ).length;
        const showAll = dom.window.document.querySelector(
            ".npm-userscript-version-limit-note button"
        );
        showAll.click();
        versionsPanel.append(
            Object.assign(dom.window.document.createElement("div"), {
                textContent: "Unrelated React update",
            })
        );
        await waitFor(
            () =>
                nativeTable.querySelectorAll(
                    ".npm-userscript-version-limit-hidden"
                ).length === 0 &&
                !dom.window.document.querySelector(
                    ".npm-userscript-version-limit-note"
                ),
            5_000
        );
        versionsPanel.append(
            Object.assign(dom.window.document.createElement("span"), {
                textContent: "Another unrelated mutation",
            })
        );
        await new Promise((resolve) => setTimeout(resolve, 25));
        const remainsShownAfterMutation =
            nativeTable.querySelectorAll(".npm-userscript-version-limit-hidden")
                .length === 0;
        dom.window.history.pushState(
            {},
            "",
            "/package/other?activeTab=versions"
        );
        dom.window.dispatchEvent(new dom.window.PopStateEvent("popstate"));
        versionsPanel.replaceChildren();
        await new Promise((resolve) => setTimeout(resolve, 5));
        const replacementPanel = dom.window.document.createElement("section");
        replacementPanel.id = "tabpanel-versions";
        replacementPanel.innerHTML = `
            <table aria-labelledby="current-tags"><tbody></tbody></table>
            <h3 id="version-history">Version History</h3>
            <table aria-labelledby="version-history"><thead><tr><th>Version</th><th>Downloads</th><th>Published</th></tr></thead><tbody>${rows}</tbody></table>
        `;
        versionsPanel.replaceWith(replacementPanel);
        const replacementNativeTable = replacementPanel.querySelector(
            'table[aria-labelledby="version-history"]'
        );
        await waitFor(
            () =>
                replacementNativeTable.querySelectorAll(
                    ".npm-userscript-version-limit-hidden"
                ).length ===
                    versions.length - 25 &&
                replacementPanel.querySelector(
                    ".npm-userscript-version-summary[data-state='ready']"
                ),
            5_000
        );
        const selectedPatch = patchTab.classList.contains(
            "npm-userscript-selected-tab"
        );
        return {
            renderedBeforeNativeHistory: Boolean(summaryBeforeNative),
            shellWasProgressive,
            packumentRequests: gm.requests.filter(
                (url) =>
                    url === "https://registry.npmjs.org/example" ||
                    url === "https://registry.npmjs.org/other"
            ).length,
            normalPackumentRequests: gm.requestOptions.filter(
                (options) =>
                    /registry\.npmjs\.org\/(?:example|other)$/u.test(
                        options.url
                    ) && !options.headers?.Accept
            ).length,
            versionDownloadRequests: gm.requests.filter((url) =>
                url.includes("api.npmjs.org/versions/")
            ).length,
            hiddenBeforeShowAll,
            hiddenAfterNavigation: replacementNativeTable.querySelectorAll(
                ".npm-userscript-version-limit-hidden"
            ).length,
            summaryRestoredAfterPanelReplacement: Boolean(
                replacementPanel.querySelector(
                    ".npm-userscript-version-summary[data-state='ready']"
                )
            ),
            remainsShownAfterMutation,
            selectedPatch,
            selectedTabWeight,
            selectedViewHeading,
            summaryPanelCentered:
                dom.window.getComputedStyle(summaryPanel).justifyItems ===
                "center",
            summaryTableMarginLeft: summaryTableStyle.marginLeft,
            summaryTableMarginRight: summaryTableStyle.marginRight,
            summaryTableRole: summaryTable
                .closest('[role="tabpanel"]')
                ?.getAttribute("role"),
            patchRows: summaryTable.querySelectorAll("tbody tr").length,
            patchLabels: Array.from(
                summaryTable.querySelectorAll("tbody tr td:first-child")
            ).map((cell) => cell.textContent),
            tabLabels: Array.from(tabs.querySelectorAll("button")).map(
                (button) => button.textContent
            ),
            selectorRole: tabs.getAttribute("role"),
            usesSemanticTabs: Array.from(tabs.querySelectorAll("button")).every(
                (button) =>
                    button.getAttribute("role") === "tab" &&
                    button.hasAttribute("aria-selected") &&
                    button.getAttribute("aria-controls") ===
                        "npm-userscript-version-summary-panel"
            ),
        };
    } finally {
        dom.window.close();
    }
}

async function runVersionsFallbackScenario() {
    const versions = [
        "3.0.0",
        "2.1.0",
        "2.0.0",
    ];
    const dom = createPage(
        `<title>fallback - npm</title><main><h1>fallback</h1>
            <section id="tabpanel-versions"></section>
            <aside aria-label="Package sidebar"><div><h3>Version</h3><p>3.0.0</p></div></aside>
        </main>`,
        "https://www.npmjs.com/package/fallback?activeTab=versions"
    );
    setOnlyFeature(dom, "better-versions");
    const gm = installGm(dom, async (url) => {
        if (url.endsWith("/fallback/3.0.0")) return { version: "3.0.0" };
        if (url.endsWith("/fallback")) {
            return {
                "dist-tags": { latest: "3.0.0" },
                time: Object.fromEntries(
                    versions.map((version, index) => [
                        version,
                        new Date(Date.UTC(2026, 1, 3 - index)).toISOString(),
                    ])
                ),
                versions: Object.fromEntries(
                    versions.map((version) => [version, { version }])
                ),
            };
        }
        throw new Error(`Unexpected request: ${url}`);
    });

    try {
        runScript(dom);
        const summary = await waitFor(() => {
            const candidate = dom.window.document.querySelector(
                ".npm-userscript-version-summary"
            );
            return candidate?.dataset.state === "ready" ? candidate : null;
        }, 4_000);
        return {
            abbreviatedRequest: gm.requestOptions.some(
                (options) =>
                    options.url === "https://registry.npmjs.org/fallback" &&
                    options.headers?.Accept ===
                        "application/vnd.npm.install-v1+json"
            ),
            labels: Array.from(
                summary.querySelectorAll(".npm-userscript-version-tab")
            ).map((button) => button.textContent),
            normalPackumentRequests: gm.requestOptions.filter(
                (options) =>
                    options.url === "https://registry.npmjs.org/fallback" &&
                    !options.headers?.Accept
            ).length,
            state: summary.dataset.state,
        };
    } finally {
        dom.window.close();
    }
}

async function runVersionSidebarScenario() {
    const dom = createPage(
        `<title>example - npm</title><main><h1>example</h1>
            <aside aria-label="Package sidebar">
                <div id="version-section">
                    <h3>Version</h3>
                    <p>3.2.1</p>
                    <button type="button" aria-label="View provenance details"><svg aria-hidden="true"></svg></button>
                </div>
                <div id="license-section">
                    <h3><a href="https://example.test/license">License</a></h3>
                    <p>MIT</p>
                </div>
                <div id="publish-section">
                    <h3>Last publish</h3>
                    <p><time datetime="2026-01-01T00:00:00.000Z">2 months ago</time></p>
                </div>
            </aside>
        </main>`,
        "https://www.npmjs.com/package/example"
    );
    setOnlyFeature(dom, "better-versions");
    installGm(dom, async (url) => {
        if (url.endsWith("/example/3.2.1")) return { version: "3.2.1" };
        if (url.endsWith("/example")) {
            return {
                "dist-tags": { latest: "3.2.1" },
                versions: {
                    "1.0.0": {},
                    "2.0.0": {},
                    "3.0.0": {},
                    "3.1.0": {},
                    "3.2.1": {},
                },
            };
        }
        if (url.includes("api.npmjs.org/versions/")) {
            return { downloads: {} };
        }
        throw new Error(`Unexpected request: ${url}`);
    });

    try {
        runScript(dom);
        const row = await waitFor(() => {
            const candidate = dom.window.document.querySelector(
                ".npm-userscript-version-sidebar-row"
            );
            return candidate &&
                dom.window.document.querySelector(
                    ".npm-userscript-version-total-count"
                )?.textContent === "5"
                ? candidate
                : null;
        });
        const provenance = row.querySelector(
            '[aria-label="View provenance details"]'
        );
        const versionValue = row.querySelector("p");
        const totalLink = dom.window.document.querySelector(
            ".npm-userscript-version-total"
        );
        const totalLabel = totalLink.querySelector(
            ".npm-userscript-version-total-label"
        );
        const totalCount = totalLink.querySelector(
            ".npm-userscript-version-total-count"
        );
        const enhanced = {
            fieldKinds: Array.from(
                dom.window.document.querySelectorAll(
                    "[data-npm-userscript-meta-field]"
                )
            ).map((field) => field.dataset.npmUserscriptMetaField),
            iconKinds: Array.from(
                dom.window.document.querySelectorAll(
                    ".npm-userscript-package-meta-icon"
                )
            ).map((icon) => icon.dataset.metaIcon),
            lastPublishValue: dom.window.document
                .querySelector("#publish-section time")
                .textContent.trim(),
            licenseHref: dom.window.document.querySelector(
                "#license-section h3 a"
            ).href,
            provenanceBesideVersion:
                provenance.parentElement === versionValue.parentElement,
            totalCount: totalCount.textContent,
            totalCountFontSize:
                dom.window.getComputedStyle(totalCount).fontSize,
            totalHref: totalLink.href,
            totalLabel: totalLabel.textContent,
            totalLabelFontSize:
                dom.window.getComputedStyle(totalLabel).fontSize,
            totalIsOwnCell: totalLink.parentElement.id === "version-section",
            licenseHeight: dom.window.getComputedStyle(
                dom.window.document.querySelector("#license-section")
            ).height,
            licenseRadius: dom.window.getComputedStyle(
                dom.window.document.querySelector("#license-section")
            ).borderRadius,
            publishHeight: dom.window.getComputedStyle(
                dom.window.document.querySelector("#publish-section")
            ).height,
            publishRadius: dom.window.getComputedStyle(
                dom.window.document.querySelector("#publish-section")
            ).borderRadius,
            versionValue: versionValue.textContent,
        };
        dom.window.history.pushState({}, "", "/search?q=example");
        dom.window.dispatchEvent(new dom.window.PopStateEvent("popstate"));
        await waitFor(
            () =>
                !dom.window.document.querySelector(
                    ".npm-userscript-package-meta-field"
                )
        );
        return {
            ...enhanced,
            restoredAfterNavigation:
                dom.window.document.querySelector("#version-section > p")
                    ?.textContent === "3.2.1" &&
                dom.window.document.querySelectorAll(
                    ".npm-userscript-package-meta-icon"
                ).length === 0,
        };
    } finally {
        dom.window.close();
    }
}

async function runDependenciesScenario() {
    const dom = createPage(
        `<title>example - npm</title><main><h1>example</h1>
            <section id="tabpanel-dependencies">
                <h2>Dependencies (1)</h2>
                <ul aria-label="Dependencies"><li><a href="/package/alpha">alpha</a></li></ul>
            </section>
            <aside aria-label="Package sidebar"><div><h3>Version</h3><p>1.0.0</p></div></aside>
        </main>`,
        "https://www.npmjs.com/package/example?activeTab=dependencies"
    );
    setOnlyFeature(dom, "better-dependencies");
    installGm(dom, async (url) => {
        if (url.includes("registry.npmjs.org/example/1.0.0")) {
            return {
                dependencies: { alpha: "^1.0.0" },
                devDependencies: { delta: "~4.0.0" },
                optionalDependencies: { gamma: ">=3" },
                peerDependencies: { beta: "^2.0.0", theta: "^8.0.0" },
                peerDependenciesMeta: { theta: { optional: true } },
                version: "1.0.0",
            };
        }
        throw new Error(`Unexpected request: ${url}`);
    });

    try {
        runScript(dom);
        const view = await waitFor(() =>
            dom.window.document.querySelector(".npm-userscript-dependency-view")
        );
        const nativeSection = dom.window.document.querySelector(
            "#tabpanel-dependencies"
        );
        const peerButton = view.querySelector('[data-dependency-group="peer"]');
        peerButton.click();
        const peerPanel = view.querySelector(
            '.npm-userscript-dependency-panel[data-dependency-group="peer"]'
        );
        const result = {
            countsAreSeparateSecondLineElements: Array.from(
                view.querySelectorAll(".npm-userscript-dependency-tab")
            ).every((button) => {
                const label = button.querySelector(
                    ".npm-userscript-dependency-tab-label"
                );
                const count = button.querySelector(
                    ".npm-userscript-dependency-tab-count"
                );
                return (
                    label?.parentElement === button &&
                    count?.parentElement === button &&
                    label.nextElementSibling === count
                );
            }),
            nativeLayoutHidden:
                nativeSection.dataset.npmUserscriptDependencyTable === "true",
            peerIsSelected:
                peerButton.getAttribute("aria-selected") === "true" &&
                peerButton.classList.contains("npm-userscript-selected-tab") &&
                peerButton.tabIndex === 0 &&
                !peerPanel.hidden,
            peerSelectedWeight:
                dom.window.getComputedStyle(peerButton).fontWeight,
            peerRows: peerPanel.querySelectorAll("tbody tr").length,
            peerRange: peerPanel.querySelector(
                ".npm-userscript-dependency-range"
            )?.textContent,
            semanticTabs:
                view
                    .querySelector(".npm-userscript-dependency-tabs")
                    ?.getAttribute("role") === "tablist" &&
                Array.from(
                    view.querySelectorAll(".npm-userscript-dependency-tab")
                ).every((button) => {
                    const panel = view.querySelector(
                        `#${button.getAttribute("aria-controls")}`
                    );
                    return (
                        button.getAttribute("role") === "tab" &&
                        panel?.getAttribute("role") === "tabpanel" &&
                        panel.getAttribute("aria-labelledby") === button.id
                    );
                }),
            tableHeaders: Array.from(peerPanel.querySelectorAll("th")).map(
                (heading) => heading.textContent
            ),
            tabLabels: Array.from(
                view.querySelectorAll(".npm-userscript-dependency-tab")
            ).map(
                (button) =>
                    button.querySelector(".npm-userscript-dependency-tab-label")
                        ?.textContent
            ),
            tabCounts: Array.from(
                view.querySelectorAll(".npm-userscript-dependency-tab")
            ).map(
                (button) =>
                    button.querySelector(".npm-userscript-dependency-tab-count")
                        ?.textContent
            ),
        };
        view.querySelector(".npm-userscript-dependency-native-button").click();
        const layoutSwitcher = await waitFor(() =>
            nativeSection.querySelector(
                ".npm-userscript-dependency-layout-switcher"
            )
        );
        result.nativeLayoutRestored =
            !nativeSection.hasAttribute(
                "data-npm-userscript-dependency-table"
            ) &&
            !nativeSection.querySelector(".npm-userscript-dependency-view");
        result.layoutSwitcherText = layoutSwitcher
            .querySelector(".npm-userscript-dependency-layout-switcher-copy")
            .textContent.replace(/\s+/g, " ")
            .trim();
        const enhancerButton = layoutSwitcher.querySelector(
            ".npm-userscript-dependency-enhancer-button"
        );
        result.enhancerButtonLabel = enhancerButton.textContent;
        enhancerButton.click();
        result.enhancerLayoutRestored = Boolean(
            await waitFor(() =>
                nativeSection.querySelector(".npm-userscript-dependency-view")
            )
        );
        return result;
    } finally {
        dom.window.close();
    }
}

async function runDependentsScenario() {
    const dom = createPage(
        `<title>example - npm</title><main><h1>example</h1>
            <section id="tabpanel-dependents">
                <div class="dependent-list">
                    <article><a href="/package/alpha">alpha</a></article>
                    <article><a href="/package/beta">beta</a></article>
                    <article><a href="/package/gamma">gamma</a></article>
                </div>
            </section>
            <aside aria-label="Package sidebar"><div><h3>Version</h3><p>1.0.0</p></div></aside>
        </main>`,
        "https://www.npmjs.com/package/example?activeTab=dependents"
    );
    setOnlyFeature(dom, "better-dependencies");
    installGm(dom, async (url) => {
        if (url.includes("registry.npmjs.org/example/1.0.0")) {
            return { version: "1.0.0" };
        }
        throw new Error(`Unexpected request: ${url}`);
    });

    try {
        runScript(dom);
        const toolbar = await waitFor(() =>
            dom.window.document.querySelector(
                ".npm-userscript-dependents-toolbar"
            )
        );
        const search = toolbar.querySelector(
            ".npm-userscript-dependents-search"
        );
        search.value = "beta";
        search.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
        const filteredCount = toolbar.querySelector(
            ".npm-userscript-dependents-count"
        ).textContent;
        search.value = "";
        search.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
        const checkboxes = dom.window.document.querySelectorAll(
            ".npm-userscript-dependent-select"
        );
        for (const checkbox of Array.from(checkboxes).slice(0, 2)) {
            checkbox.checked = true;
            checkbox.dispatchEvent(
                new dom.window.Event("change", { bubbles: true })
            );
        }
        const compareLink = toolbar.querySelector(
            ".npm-userscript-dependents-compare"
        );
        const list = dom.window.document.querySelector(
            ".npm-userscript-dependents-list"
        );
        const header = dom.window.document.querySelector(
            ".npm-userscript-dependents-list-header"
        );
        return {
            checkboxCount: checkboxes.length,
            compareHref: compareLink.href,
            compareIsEnabled:
                compareLink.getAttribute("aria-disabled") === "false",
            filteredCount,
            headerText: header.textContent.replace(/\s+/g, " ").trim(),
            listColumns: dom.window.getComputedStyle(list).gridTemplateColumns,
            listDisplay: dom.window.getComputedStyle(list).display,
            rowCount: list.querySelectorAll(".npm-userscript-dependent-row")
                .length,
            totalCount: toolbar.querySelector(
                ".npm-userscript-dependents-count"
            ).textContent,
        };
    } finally {
        dom.window.close();
    }
}

async function runRepositoryCardScenario() {
    const dom = createPage(
        `<title>example - npm</title><main><h1>example</h1><aside aria-label="Package sidebar">
            <div><h3 id="repository">Repository</h3><p><a aria-labelledby="repository-link" href="https://github.com/example/example"><span id="repository-link">example/example</span></a></p></div>
            <div id="native-homepage"><h3 id="homePage">Homepage</h3><p><a href="https://example.test/docs">Docs</a></p></div>
            <div id="native-issues"><h3>Issues</h3><p>5</p></div>
            <div id="native-pulls"><h3>Pull Requests</h3><p>2</p></div>
            <div id="weekly-downloads"><h3>Weekly Downloads</h3><div id="weekly-chart"></div></div>
            <div><h3 id="collaborators">Collaborators</h3></div>
            <div><h3 id="license">License</h3><p>MIT</p></div>
            <div><h3>Keywords</h3><p>example</p></div>
            <div><h3>Version</h3><p>1.0.0</p></div>
        </aside></main>`,
        "https://www.npmjs.com/package/example"
    );
    setOnlyFeature(dom, "repository-card");
    const sidebar = dom.window.document.querySelector(
        '[aria-label="Package sidebar"]'
    );
    const issues = dom.window.document.querySelector("#native-issues");
    const pulls = dom.window.document.querySelector("#native-pulls");
    const homepage = dom.window.document.querySelector("#native-homepage");
    const gm = installGm(dom, async (url) => {
        if (url.includes("api.github.com/search/issues")) {
            return { total_count: 2 };
        }
        if (url.endsWith("api.github.com/repos/example/example/license")) {
            return {
                html_url:
                    "https://github.com/example/example/blob/main/LICENSE",
            };
        }
        if (url.includes("api.github.com/repos/example/example/contents")) {
            return {};
        }
        if (url.endsWith("api.github.com/repos/example/example")) {
            return {
                default_branch: "main",
                full_name: "example/example",
                html_url: "https://github.com/example/example",
                open_issues_count: 7,
                organization: null,
                owner: { avatar_url: "https://example.test/avatar.png" },
                stargazers_count: 1234,
            };
        }
        if (url.includes("registry.npmjs.org/example/1.0.0")) {
            return {
                repository: {
                    directory: "packages/example",
                    type: "git",
                    url: "git+https://github.com/example/example.git",
                },
                version: "1.0.0",
            };
        }
        throw new Error(`Unexpected request: ${url}`);
    });

    try {
        runScript(dom);
        const card = await waitFor(() => {
            const candidate = dom.window.document.querySelector(
                ".npm-userscript-repository-card"
            );
            return candidate &&
                !candidate.classList.contains(
                    "npm-userscript-repository-card-loading"
                ) &&
                candidate.querySelector('[data-metric="changelog"]')
                ? candidate
                : null;
        });
        const insights = await waitFor(() =>
            dom.window.document.querySelector(
                ".npm-userscript-package-insights"
            )
        );
        const starHistory = insights.querySelector(
            ".npm-userscript-star-history"
        );
        dom.window.document.querySelector("#weekly-chart").innerHTML =
            '<svg aria-label="Weekly download chart"></svg>';
        const weeklyChartLink = await waitFor(() =>
            dom.window.document.querySelector(
                ".npm-userscript-weekly-downloads-link"
            )
        );
        const initialResult = {
            nativeColumnsStayConnected:
                issues.parentElement === sidebar &&
                pulls.parentElement === sidebar,
            nativeColumnsHiddenByClass:
                issues.classList.contains(
                    "npm-userscript-repository-card-superseded"
                ) &&
                pulls.classList.contains(
                    "npm-userscript-repository-card-superseded"
                ) &&
                homepage.classList.contains(
                    "npm-userscript-repository-card-superseded"
                ),
            homepageHref: card.querySelector('[data-metric="homepage"]')?.href,
            collaboratorsHref:
                dom.window.document.querySelector("#collaborators a")?.href,
            licenseHref: dom.window.document.querySelector("#license a")?.href,
            trendsHref: insights.querySelector(
                ".npm-userscript-package-insights-link"
            )?.href,
            insightsBeforeCollaborators:
                insights.nextElementSibling?.querySelector("#collaborators") !==
                null,
            starHistoryCount: starHistory.querySelector(
                ".npm-userscript-star-history-count"
            )?.textContent,
            starHistoryHint: starHistory.querySelector(
                ".npm-userscript-star-history-copy small"
            )?.textContent,
            starHistoryHref: starHistory.href,
            weeklyChartHref: weeklyChartLink.href,
            metricKinds: Array.from(card.querySelectorAll("[data-metric]")).map(
                (metric) => metric.dataset.metric
            ),
        };
        const requestsBeforeSidebarReplacement = gm.requests.length;
        const replacementSidebar = sidebar.cloneNode(true);
        replacementSidebar
            .querySelector(".npm-userscript-repository-card")
            ?.remove();
        replacementSidebar
            .querySelector(".npm-userscript-package-insights")
            ?.remove();
        sidebar.replaceWith(replacementSidebar);
        const restoredReadyCard = await waitFor(() => {
            const candidate = replacementSidebar.querySelector(
                ".npm-userscript-repository-card:not(.npm-userscript-repository-card-loading)"
            );
            return candidate?.querySelector('[data-metric="homepage"]')
                ? candidate
                : null;
        });
        return {
            ...initialResult,
            readyCardRestoredAfterSidebarReplacement:
                restoredReadyCard.parentElement === replacementSidebar,
            recoveryAddedRequests:
                gm.requests.length - requestsBeforeSidebarReplacement,
            restoredHomepageHref: restoredReadyCard.querySelector(
                '[data-metric="homepage"]'
            )?.href,
        };
    } finally {
        dom.window.close();
    }
}

async function runDeferredRepositoryCardScenario() {
    const dom = createPage(
        `<title>example - npm</title><main><h1>example</h1><aside aria-label="Package sidebar">
            <div id="deferred-repository"><h3 id="repository">Repository</h3><p><a aria-labelledby="repository-link" href="https://github.com/example/example"><span id="repository-link">example/example</span></a></p></div>
            <div id="deferred-homepage"><h3 id="homePage">Homepage</h3><p><a href="https://example.test/docs">Docs</a></p></div>
        </aside></main>`,
        "https://www.npmjs.com/package/example"
    );
    setOnlyFeature(dom, "repository-card");
    let releaseData;
    const dataGate = new Promise((resolve) => {
        releaseData = resolve;
    });
    const gm = installGm(dom, async (url) => {
        await dataGate;
        if (url.includes("api.github.com/search/issues")) {
            return { total_count: 2 };
        }
        if (url.endsWith("api.github.com/repos/example/example/license")) {
            return {
                html_url:
                    "https://github.com/example/example/blob/main/LICENSE",
            };
        }
        if (url.includes("api.github.com/repos/example/example/contents")) {
            return {};
        }
        if (url.endsWith("api.github.com/repos/example/example")) {
            return {
                default_branch: "main",
                full_name: "example/example",
                html_url: "https://github.com/example/example",
                open_issues_count: 7,
                organization: null,
                owner: { avatar_url: "https://example.test/avatar.png" },
                stargazers_count: 1234,
            };
        }
        if (url.includes("registry.npmjs.org/example/")) {
            return {
                homepage: "https://example.test/docs",
                repository: {
                    type: "git",
                    url: "git+https://github.com/example/example.git",
                },
                version: "1.0.0",
            };
        }
        throw new Error(`Unexpected request: ${url}`);
    });

    try {
        runScript(dom);
        const shell = await waitFor(
            () =>
                dom.window.document.querySelector(
                    ".npm-userscript-repository-card-loading"
                ),
            1_000
        );
        await waitFor(
            () =>
                gm.requests.includes(
                    "https://registry.npmjs.org/example/latest"
                ),
            1_000
        );
        shell.remove();
        const restoredShell = await waitFor(() => {
            const candidate = dom.window.document.querySelector(
                ".npm-userscript-repository-card-loading"
            );
            return candidate && candidate !== shell ? candidate : null;
        }, 1_000);
        const repository = dom.window.document.querySelector(
            "#deferred-repository"
        );
        const homepage =
            dom.window.document.querySelector("#deferred-homepage");
        const beforeData = {
            ariaBusy: restoredShell.getAttribute("aria-busy"),
            homepageHref: restoredShell.querySelector(
                '[data-metric="homepage"]'
            )?.href,
            homepageHidden: homepage.classList.contains(
                "npm-userscript-repository-card-pending"
            ),
            minHeight: dom.window.getComputedStyle(restoredShell).minHeight,
            repositoryHidden: repository.classList.contains(
                "npm-userscript-repository-card-pending"
            ),
            repositoryMetricSlots: restoredShell.querySelectorAll(
                '[data-metric="stars"], [data-metric="issues"], [data-metric="pulls"]'
            ).length,
            status: restoredShell.querySelector(
                ".npm-userscript-repository-card-status"
            )?.textContent,
            insightsSummary: dom.window.document.querySelector(
                ".npm-userscript-star-history-count"
            )?.textContent,
        };
        releaseData();
        const enrichedCard = await waitFor(() => {
            const card = dom.window.document.querySelector(
                ".npm-userscript-repository-card:not(.npm-userscript-repository-card-loading)"
            );
            return card?.querySelector('[data-metric="stars"]') ? card : null;
        });
        return {
            beforeData,
            finalMetricKinds: Array.from(
                enrichedCard.querySelectorAll("[data-metric]")
            ).map((metric) => metric.dataset.metric),
            latestRequestStartedBeforeData:
                gm.requests[0] === "https://registry.npmjs.org/example/latest",
            nativeColumnsHiddenAfterData:
                repository.classList.contains(
                    "npm-userscript-repository-card-superseded"
                ) &&
                homepage.classList.contains(
                    "npm-userscript-repository-card-superseded"
                ),
            shellRestoredBeforeData: true,
        };
    } finally {
        releaseData();
        dom.window.close();
    }
}

async function runCoexistenceScenario() {
    async function runInstallOrder(standaloneFirst) {
        const dom = createPage(
            `<title>example - npm</title><main><h1>example</h1><aside aria-label="Package sidebar">
                <h3>Install</h3><div><button aria-label="Copy install command line"><code>npm i example</code></button></div>
                <div><h3>Version</h3><p>1.0.0</p></div>
            </aside></main>`,
            "https://www.npmjs.com/package/example"
        );
        setOnlyFeature(dom, "install-commands");
        const gm = installGm(dom, async (url) => {
            if (url.includes("registry.npmjs.org/example/1.0.0")) {
                return { version: "1.0.0" };
            }
            throw new Error(`Unexpected request: ${url}`);
        });
        try {
            if (standaloneFirst) dom.window.eval(moreInstallButtonsScript);
            runScript(dom);
            await waitFor(() =>
                dom.window.document.querySelector(
                    "[data-npm-more-install-buttons]"
                )
            );
            if (!standaloneFirst) dom.window.eval(moreInstallButtonsScript);
            await new Promise((resolve) => setTimeout(resolve, 20));
            const mainSettingsCommand = gm.commands
                .filter(
                    (command) => command.label === "Configure install commands…"
                )
                .at(-1);
            mainSettingsCommand.callback();
            dom.window.document
                .querySelector(".mib-settings-form")
                .dispatchEvent(
                    new dom.window.Event("submit", {
                        bubbles: true,
                        cancelable: true,
                    })
                );
            await new Promise((resolve) => setTimeout(resolve, 20));
            const lists = dom.window.document.querySelectorAll(
                "[data-npm-more-install-buttons]"
            );
            return {
                count: lists.length,
                owner: lists[0]?.dataset.npmEnhancementOwner,
                ownerAfterMainSettingsSave:
                    lists[0]?.dataset.npmEnhancementOwner,
            };
        } finally {
            dom.window.close();
        }
    }

    async function runSizeOrder(standaloneFirst) {
        const dom = createPage(
            `<title>example - npm</title><main><h1>example</h1><aside aria-label="Package sidebar">
                <div><h3>Version</h3>
                    <div class="npm-userscript-version-sidebar-row">
                        <div class="npm-userscript-version-sidebar-current"><p>1.0.0</p></div>
                        <a class="npm-userscript-version-total" href="?activeTab=versions">
                            <span class="npm-userscript-version-total-label">Total versions</span>
                            <strong class="npm-userscript-version-total-count">5</strong>
                        </a>
                    </div>
                </div>
                <a href="https://bundlephobia.com/package/example@1.0.0">Bundlephobia</a>
            </aside></main>`,
            "https://www.npmjs.com/package/example"
        );
        setOnlyFeature(dom, "package-size");
        installGm(dom, async (url) => {
            if (url.includes("bundlephobia.com/api/size")) {
                return {
                    dependencyCount: 0,
                    dependencySizes: [],
                    gzip: 800,
                    name: "example",
                    size: 1600,
                    version: "1.0.0",
                };
            }
            if (url.includes("registry.npmjs.org/example/1.0.0")) {
                return {
                    dist: {
                        fileCount: 12,
                        tarball:
                            "https://registry.npmjs.org/example/-/example-1.0.0.tgz",
                        unpackedSize: 6400,
                    },
                    version: "1.0.0",
                };
            }
            if (url.endsWith("example-1.0.0.tgz")) return {};
            throw new Error(`Unexpected request: ${url}`);
        });
        try {
            if (standaloneFirst) dom.window.eval(packageSizeScript);
            runScript(dom);
            const card = await waitFor(() =>
                dom.window.document.querySelector(
                    "[data-npm-bundlephobia-size]"
                )
            );
            await waitFor(() => !card.hasAttribute("aria-busy"));
            if (!standaloneFirst) dom.window.eval(packageSizeScript);
            await new Promise((resolve) => setTimeout(resolve, 20));
            const cards = dom.window.document.querySelectorAll(
                "[data-npm-bundlephobia-size]"
            );
            return {
                bundlephobiaHref: cards[0]?.querySelector(".nbps-title")?.href,
                count: cards.length,
                owner: cards[0]?.dataset.npmEnhancementOwner,
                packageMetricLabels: Array.from(
                    cards[0]?.querySelectorAll(".nbps-metric-label") || []
                ).map((label) => label.textContent),
                analysisTime: cards[0]
                    ?.querySelector(".nbps-details")
                    ?.textContent.trim(),
                badgeCount:
                    cards[0]?.querySelectorAll(".nbps-badge").length || 0,
                compositionCount:
                    cards[0]?.querySelectorAll(".nbps-composition").length || 0,
                metricCount:
                    cards[0]?.querySelectorAll(".nbps-metric").length || 0,
                packedRatio: Array.from(
                    cards[0]?.querySelectorAll(".nbps-metric") || []
                )
                    .find(
                        (metric) =>
                            metric.querySelector(".nbps-metric-label")
                                ?.textContent === "Packed ratio"
                    )
                    ?.querySelector(".nbps-metric-value")?.textContent,
                versionLabel:
                    cards[0]?.querySelector(".nbps-version")?.textContent,
            };
        } finally {
            dom.window.close();
        }
    }

    async function runTarballErrorScenario() {
        const dom = createPage(
            `<title>example - npm</title><main><h1>example</h1><aside aria-label="Package sidebar">
                <div><h3>Version</h3><p>1.0.0</p></div>
                <a href="https://bundlephobia.com/package/example@1.0.0">Bundlephobia</a>
            </aside></main>`,
            "https://www.npmjs.com/package/example"
        );
        setOnlyFeature(dom, "package-size");
        installGm(dom, async (url) => {
            if (url.includes("bundlephobia.com/api/size")) {
                return {
                    dependencyCount: 0,
                    dependencySizes: [],
                    gzip: 800,
                    name: "example",
                    size: 1600,
                    version: "1.0.0",
                };
            }
            if (url.includes("registry.npmjs.org/example/1.0.0")) {
                return {
                    dist: {
                        tarball:
                            "https://registry.npmjs.org/example/-/example-1.0.0.tgz",
                    },
                    version: "1.0.0",
                };
            }
            if (url.endsWith("example-1.0.0.tgz")) {
                return {
                    __gmResponse: true,
                    body: "Not Found",
                    responseHeaders: "content-length: 4321",
                    status: 404,
                    statusText: "Not Found",
                };
            }
            throw new Error(`Unexpected request: ${url}`);
        });
        try {
            runScript(dom);
            const card = await waitFor(() => {
                const candidate = dom.window.document.querySelector(
                    "[data-npm-bundlephobia-size]"
                );
                return candidate && !candidate.hasAttribute("aria-busy")
                    ? candidate
                    : null;
            });
            const tarball = Array.from(
                card.querySelectorAll(".nbps-metric")
            ).find(
                (metric) =>
                    metric.querySelector(".nbps-metric-label")?.textContent ===
                    "Tarball"
            );
            return (
                tarball?.querySelector(".nbps-metric-value")?.textContent ===
                "Unavailable"
            );
        } finally {
            dom.window.close();
        }
    }

    async function runBundleShellStateScenario(shouldFail) {
        const dom = createPage(
            `<title>example - npm</title><main><h1>example</h1><aside aria-label="Package sidebar">
                <div><h3>Version</h3><p>1.0.0</p></div>
                <div><h3>License</h3><p>MIT</p></div>
                <div id="publish"><h3>Last publish</h3><p>today</p></div>
            </aside></main>`,
            "https://www.npmjs.com/package/example"
        );
        setOnlyFeature(dom, "package-size");
        let releaseBundleRequest;
        const bundleGate = new Promise((resolve) => {
            releaseBundleRequest = resolve;
        });
        let bundleRequestStarted = false;
        installGm(dom, async (url) => {
            if (url.includes("bundlephobia.com/api/size")) {
                bundleRequestStarted = true;
                await bundleGate;
                if (shouldFail) throw new Error("Bundlephobia unavailable");
                return {
                    dependencyCount: 2,
                    dependencySizes: [{ approximateSize: 200 }],
                    gzip: 800,
                    hasJSModule: true,
                    hasSideEffects: false,
                    name: "example",
                    size: 1600,
                    version: "1.0.0",
                };
            }
            if (url.includes("registry.npmjs.org/example/1.0.0")) {
                return {
                    dist: {
                        fileCount: 12,
                        tarball:
                            "https://registry.npmjs.org/example/-/example-1.0.0.tgz",
                        unpackedSize: 6400,
                    },
                    version: "1.0.0",
                };
            }
            if (url.endsWith("example-1.0.0.tgz")) return {};
            throw new Error(`Unexpected request: ${url}`);
        });
        const inventory = (card) => ({
            badges: Array.from(card.querySelectorAll("[data-badge]")).map(
                (badge) => badge.dataset.badge
            ),
            compositions: card.querySelectorAll(".nbps-composition").length,
            footers: card.querySelectorAll(".nbps-footer").length,
            metrics: Array.from(card.querySelectorAll("[data-metric]")).map(
                (metric) => metric.dataset.metric
            ),
            sections: Array.from(
                card.querySelectorAll(".nbps-section-label")
            ).map((section) => section.textContent),
        });

        try {
            runScript(dom);
            const card = await waitFor(() => {
                const candidate = dom.window.document.querySelector(
                    "[data-npm-bundlephobia-size]"
                );
                return candidate?.hasAttribute("aria-busy") &&
                    bundleRequestStarted
                    ? candidate
                    : null;
            });
            const loadingInventory = inventory(card);
            const loadingHeight = card.getBoundingClientRect().height;
            const loadingPlaceholders = Array.from(
                card.querySelectorAll(".nbps-metric-value")
            ).every((value) => value.textContent === "—");
            releaseBundleRequest();
            await waitFor(() => !card.hasAttribute("aria-busy"));
            const finalInventory = inventory(card);
            const finalHeight = card.getBoundingClientRect().height;
            return {
                analysisTime: card
                    .querySelector(".nbps-details")
                    ?.textContent.trim(),
                badgesCentered:
                    dom.window.getComputedStyle(
                        card.querySelector(".nbps-badges")
                    ).display === "grid" &&
                    Array.from(card.querySelectorAll(".nbps-badge")).every(
                        (badge) => {
                            const badgeStyle =
                                dom.window.getComputedStyle(badge);
                            const iconStyle = dom.window.getComputedStyle(
                                badge.querySelector(".nbps-badge-icon")
                            );
                            return (
                                badgeStyle.justifyItems === "center" &&
                                badgeStyle.textAlign === "center" &&
                                iconStyle.justifySelf === "center"
                            );
                        }
                    ),
                finalHeight,
                finalInventory,
                loadingHeight,
                loadingInventory,
                loadingPlaceholders,
                placement: card.dataset.placement,
                retryVisible: !card.querySelector(".nbps-retry").hidden,
                statusState: card.querySelector(".nbps-status")?.dataset.state,
            };
        } finally {
            releaseBundleRequest();
            dom.window.close();
        }
    }

    return {
        bundleError: await runBundleShellStateScenario(true),
        bundleSuccess: await runBundleShellStateScenario(false),
        installMainFirst: await runInstallOrder(false),
        installStandaloneFirst: await runInstallOrder(true),
        sizeMainFirst: await runSizeOrder(false),
        sizeStandaloneFirst: await runSizeOrder(true),
        tarballErrorIgnored: await runTarballErrorScenario(),
    };
}

async function runSidebarIntegrationScenario() {
    const homepageUrl =
        "https://github.com/eslint/js/blob/main/packages/eslint-visitor-keys/README.md";
    const dom = createPage(
        `<title>example - npm</title><main><h1>example</h1>
            <aside id="package-sidebar" aria-label="Package sidebar" style="width: 360px">
                <div id="install-section">
                    <h3>Install</h3>
                    <div><button aria-label="Copy install command line"><code>npm i example</code></button></div>
                </div>
                <div id="repository-section" class="w-50">
                    <h3 id="repository">Repository</h3>
                    <p><a aria-labelledby="repository-link" href="https://github.com/example/example"><span aria-hidden="true"><svg></svg></span><span id="repository-link">example/example</span></a></p>
                </div>
                <div id="homepage-section" class="w-50">
                    <h3 id="homePage">Homepage</h3>
                    <p><a aria-labelledby="homePage-link" href="${homepageUrl}"><span aria-hidden="true"><svg></svg></span><span id="homePage-link">${homepageUrl}</span></a></p>
                </div>
                <div id="weekly-section">
                    <button style="width: 480px">
                        <h3>Weekly Downloads</h3>
                        <div id="weekly-chart">
                            <svg width="480" height="140"></svg>
                            <p data-testid="weekly-download-count" style="overflow-wrap: anywhere">123,456,789</p>
                        </div>
                    </button>
                </div>
                <div id="version-section"><h3>Version</h3><p>1.0.0</p></div>
                <div id="license-section"><h3 id="license">License</h3><p>MIT</p></div>
                <div id="publish-section"><h3>Last publish</h3><p>today</p></div>
                <div id="unpacked-section" class="w-50"><h3>Unpacked Size</h3><p>6.4 kB</p></div>
                <div id="bundle-link-section"><div><a href="https://bundlephobia.com/package/example@1.0.0">Bundlephobia</a></div></div>
                <div id="funding-original"><a class="button" href="https://example.test/fund">Fund this package</a></div>
                <div id="collaborators-section"><h3 id="collaborators">Collaborators</h3></div>
            </aside>
        </main>`,
        "https://www.npmjs.com/package/example"
    );
    setFeatures(dom, [
        "fix-styles",
        "install-commands",
        "move-funding",
        "package-size",
        "repository-card",
    ]);
    let releaseSidebarData;
    const sidebarDataGate = new Promise((resolve) => {
        releaseSidebarData = resolve;
    });
    const gm = installGm(dom, async (url) => {
        if (url.includes("bundlephobia.com/api/size")) {
            await sidebarDataGate;
            return {
                dependencyCount: 0,
                dependencySizes: [],
                gzip: 800,
                name: "example",
                size: 1600,
                version: "1.0.0",
            };
        }
        if (url.includes("api.github.com/search/issues")) {
            await sidebarDataGate;
            return { total_count: 2 };
        }
        if (url.includes("api.github.com/repos/example/example/contents")) {
            await sidebarDataGate;
            return {};
        }
        if (url.endsWith("api.github.com/repos/example/example")) {
            await sidebarDataGate;
            return {
                default_branch: "main",
                full_name: "example/example",
                html_url: "https://github.com/example/example",
                open_issues_count: 7,
                organization: null,
                owner: { avatar_url: "https://example.test/avatar.png" },
                stargazers_count: 1234,
            };
        }
        if (url.includes("registry.npmjs.org/example/1.0.0")) {
            return {
                dist: {
                    fileCount: 12,
                    tarball:
                        "https://registry.npmjs.org/example/-/example-1.0.0.tgz",
                    unpackedSize: 6400,
                },
                funding: { url: "https://example.test/fund" },
                homepage: homepageUrl,
                repository: {
                    type: "git",
                    url: "git+https://github.com/example/example.git",
                },
                version: "1.0.0",
            };
        }
        if (url.endsWith("example-1.0.0.tgz")) return {};
        throw new Error(`Unexpected request: ${url}`);
    });
    gm.values.set("bundlephobiaSizeCardPlacement", "funding-button");

    try {
        runScript(dom);
        const sidebar = dom.window.document.querySelector("#package-sidebar");
        const installList = await waitFor(() =>
            sidebar.querySelector("[data-npm-more-install-buttons]")
        );
        const fundingButton = await waitFor(() =>
            sidebar.querySelector(".npm-userscript-funding-button")
        );
        const collaboratorsSection = sidebar.querySelector(
            "#collaborators-section"
        );
        const sizeCard = await waitFor(() => {
            const candidate = sidebar.querySelector(
                "[data-npm-bundlephobia-size]"
            );
            return candidate?.previousElementSibling?.id === "publish-section"
                ? candidate
                : null;
        });
        const repositoryCard = await waitFor(() =>
            sidebar.querySelector(".npm-userscript-repository-card-loading")
        );
        const insights = await waitFor(() =>
            sidebar.querySelector(".npm-userscript-package-insights")
        );
        const immediateFormatting = {
            collaborators: collaboratorsSection.classList.contains(
                "npm-userscript-collaborators-card"
            ),
            downloads: sidebar
                .querySelector("#weekly-section")
                .classList.contains("npm-userscript-downloads-card"),
            downloadsGraphConstrained: Boolean(
                sidebar.querySelector(
                    "#weekly-section .npm-userscript-weekly-downloads-link"
                )
            ),
            insightsPlaceholder:
                insights.querySelector(".npm-userscript-star-history-count")
                    ?.textContent === "— stars",
            repositoryMetricSlots: repositoryCard.querySelectorAll(
                '[data-metric="stars"], [data-metric="issues"], [data-metric="pulls"]'
            ).length,
            sizeMetricSlots: sizeCard.querySelectorAll("[data-metric]").length,
        };
        releaseSidebarData();
        await waitFor(
            () =>
                !sizeCard.hasAttribute("aria-busy") &&
                sidebar.querySelector(
                    ".npm-userscript-repository-card:not(.npm-userscript-repository-card-loading)"
                )
        );
        const readyRepositoryCard = sidebar.querySelector(
            ".npm-userscript-repository-card"
        );
        const homepageLink = sidebar.querySelector(
            '[aria-labelledby="homePage-link"]'
        );
        const homepageText = sidebar.querySelector("#homePage-link");
        const homepageLinkStyle = dom.window.getComputedStyle(homepageLink);
        const homepageTextStyle = dom.window.getComputedStyle(homepageText);
        const downloadsCard = sidebar.querySelector("#weekly-section");
        const downloadsButton = downloadsCard.querySelector("button");
        const downloadsValue = downloadsCard.querySelector(
            '[data-testid="weekly-download-count"]'
        );
        const downloadsGraphLink = downloadsCard.querySelector(
            ".npm-userscript-weekly-downloads-link"
        );
        const downloadsGraph = downloadsGraphLink.querySelector("svg");
        const downloadsInnerLayout = downloadsCard.querySelector(
            ".npm-userscript-weekly-downloads-layout"
        );
        const downloadsLayout = {
            buttonMaxWidth:
                dom.window.getComputedStyle(downloadsButton).maxWidth,
            buttonMinWidth:
                dom.window.getComputedStyle(downloadsButton).minWidth,
            buttonWidth: dom.window.getComputedStyle(downloadsButton).width,
            cardDisplay: dom.window.getComputedStyle(downloadsCard).display,
            cardMaxWidth: dom.window.getComputedStyle(downloadsCard).maxWidth,
            cardMinWidth: dom.window.getComputedStyle(downloadsCard).minWidth,
            cardOverflow: dom.window.getComputedStyle(downloadsCard).overflow,
            graphHeight: dom.window.getComputedStyle(downloadsGraph).height,
            graphMaxWidth: dom.window.getComputedStyle(downloadsGraph).maxWidth,
            graphWidth: dom.window.getComputedStyle(downloadsGraph).width,
            innerDisplay:
                dom.window.getComputedStyle(downloadsInnerLayout).display,
            innerGridTemplateColumns:
                dom.window.getComputedStyle(downloadsInnerLayout)
                    .gridTemplateColumns,
            linkGridColumn:
                dom.window.getComputedStyle(downloadsGraphLink).gridColumn,
            linkOverflow:
                dom.window.getComputedStyle(downloadsGraphLink).overflow,
            valueGridColumn:
                dom.window.getComputedStyle(downloadsValue).gridColumn,
            valueOverflow: dom.window.getComputedStyle(downloadsValue).overflow,
            valueTier: downloadsValue.dataset.downloadTier,
            valueTitle: downloadsValue.title,
            valueWhiteSpace:
                dom.window.getComputedStyle(downloadsValue).whiteSpace,
        };
        const originalCopyButton = sidebar.querySelector(
            'button[aria-label="Copy install command line"]'
        );
        const defaultInstallCommands = Array.from(
            installList.querySelectorAll(".mib-command code")
        ).map((code) => code.textContent);
        const installPlacement = {
            followsInstallSection:
                installList.previousElementSibling?.id === "install-section",
            nativeCopyButtonConnected: originalCopyButton.isConnected,
            parentIsSidebar: installList.parentElement === sidebar,
        };
        installList.querySelector(".mib-list-version-toggle").click();
        const pinnedInstallList = await waitFor(() => {
            const candidate = sidebar.querySelector(
                "[data-npm-more-install-buttons]"
            );
            return candidate !== installList &&
                candidate
                    ?.querySelector(".mib-command code")
                    ?.textContent.includes("example@1.0.0")
                ? candidate
                : null;
        });
        const exactVersionCommands = Array.from(
            pinnedInstallList.querySelectorAll(".mib-command code")
        ).every((code) => code.textContent.includes("example@1.0.0"));

        const describeColumn = (column) => {
            if (column.matches(".npm-userscript-repository-card"))
                return "repository";
            if (column.id === "weekly-section") return "downloads";
            if (column.id === "version-section") return "version";
            if (column.id === "license-section") return "license";
            if (column.id === "publish-section") return "publish";
            if (column.matches("[data-npm-bundlephobia-size]"))
                return "bundlephobia";
            if (column.matches(".npm-userscript-package-insights"))
                return "insights";
            if (column.id === "collaborators-section") return "collaborators";
            if (column === fundingButton || column.contains?.(fundingButton)) {
                return "funding";
            }
        };
        const directOrder = Array.from(sidebar.children)
            .map(describeColumn)
            .filter(Boolean);
        const placementCommands = gm.commands
            .map((command) => command.label)
            .filter((label) => label.startsWith("Bundlephobia: place"));
        const accentCommands = gm.commands
            .map((command) => command.label)
            .filter((label) => label === "Bundlephobia: change accent color…");

        const repurposedHeading = dom.window.document.createElement("h3");
        repurposedHeading.id = "react-reused-repository";
        repurposedHeading.textContent = "Repository";
        pinnedInstallList.replaceChildren(repurposedHeading);
        const repairedInstallList = await waitFor(() => {
            const candidate = sidebar.querySelector(
                "[data-npm-more-install-buttons]"
            );
            return candidate !== pinnedInstallList &&
                candidate?.querySelector(".mib-command")
                ? candidate
                : null;
        });
        const collaboratorHeading = collaboratorsSection.querySelector("h3");
        collaboratorHeading.textContent = "Weekly Downloads";
        await waitFor(
            () =>
                collaboratorsSection.classList.contains(
                    "npm-userscript-downloads-card"
                ) &&
                !collaboratorsSection.classList.contains(
                    "npm-userscript-collaborators-card"
                )
        );
        collaboratorHeading.textContent = "Collaborators";
        const collaboratorsRoleRestored = await waitFor(
            () =>
                collaboratorsSection.classList.contains(
                    "npm-userscript-collaborators-card"
                ) &&
                !collaboratorsSection.classList.contains(
                    "npm-userscript-downloads-card"
                )
        );
        const repositorySection = sidebar.querySelector("#repository-section");
        repositorySection.innerHTML = "<h3>License</h3><p>MIT reused node</p>";
        const staleRepositoryRoleRemoved = await waitFor(
            () =>
                repositorySection.classList.contains(
                    "npm-userscript-package-meta-license"
                ) &&
                !repositorySection.classList.contains(
                    "npm-userscript-repository-card-superseded"
                )
        );

        return {
            homepage: {
                display: homepageLinkStyle.display,
                minWidth: homepageTextStyle.minWidth,
                overflowWrap: homepageTextStyle.overflowWrap,
                text: homepageText.textContent,
                width: homepageLinkStyle.width,
            },
            downloadsLayout,
            install: {
                commandCount: defaultInstallCommands.length,
                defaultsToActiveTag: defaultInstallCommands.every(
                    (command) => !command.includes("example@1.0.0")
                ),
                exactVersionCommands,
                releasesReactRepurposedNode:
                    pinnedInstallList.isConnected &&
                    !pinnedInstallList.classList.contains("mib-list") &&
                    !pinnedInstallList.hasAttribute(
                        "data-npm-more-install-buttons"
                    ) &&
                    pinnedInstallList.firstElementChild === repurposedHeading,
                repairsAfterReactReuse:
                    repairedInstallList.parentElement === sidebar,
                ...installPlacement,
            },
            size: {
                avoidsNestedBundleLinkSection: !sidebar
                    .querySelector("#bundle-link-section")
                    .contains(sizeCard),
                accentCommandCount: accentCommands.length,
                directOrder,
                fixedAfterMetadata:
                    sizeCard.previousElementSibling?.id === "publish-section",
                immediateFormatting,
                legacyPlacementIgnored:
                    gm.values.get("bundlephobiaSizeCardPlacement") ===
                        "funding-button" &&
                    sizeCard.dataset.placement === "package-metadata",
                parentIsSidebar: sizeCard.parentElement === sidebar,
                placementCommandCount: placementCommands.length,
                reactsToReusedCollaboratorNode: Boolean(
                    collaboratorsRoleRestored
                ),
                repositoryCardIsDirectChild:
                    readyRepositoryCard.parentElement === sidebar,
                staleRepositoryRoleRemoved: Boolean(staleRepositoryRoleRemoved),
            },
        };
    } finally {
        releaseSidebarData();
        dom.window.close();
    }
}

async function runPackageScenario() {
    const dom = createPage(
        `
            <title>example - npm</title>
            <main>
                <h1>example</h1>
                <aside aria-label="Package sidebar">
                    <h3 data-mib-heading="Install"><span aria-hidden="true">◆</span>Install</h3>
                    <div><button aria-label="Copy install command line">npm i example</button></div>
                    <h3>Version</h3>
                    <p>1.2.3</p>
                </aside>
            </main>
        `,
        "https://www.npmjs.com/package/example"
    );
    setOnlyFeature(dom, "helpful-links");
    const gm = installGm(dom, async (url) => {
        if (!url.includes("registry.npmjs.org/example/1.2.3")) {
            throw new Error(`Unexpected request: ${url}`);
        }
        return {
            homepage: "https://example.test/",
            repository: "https://github.com/example/example.git",
            version: "1.2.3",
        };
    });

    try {
        runScript(dom);
        const firstRow = await waitFor(() =>
            dom.window.document.querySelector(
                '[data-npm-enhancer-links="package"]'
            )
        );
        const installHeading = dom.window.document.querySelector(
            '[data-mib-heading="Install"]'
        );
        const initial = {
            hasLegacySharedClass: firstRow.classList.contains(
                "npm-userscript-helpful-links"
            ),
            hasOwnedClass: firstRow.classList.contains(
                "npm-enhancer-package-links"
            ),
            rowImmediatelyBeforeInstall:
                firstRow.nextElementSibling === installHeading,
        };

        firstRow.remove();
        const restoredRow = await waitFor(() => {
            const candidate = dom.window.document.querySelector(
                '[data-npm-enhancer-links="package"]'
            );
            return candidate && candidate !== firstRow ? candidate : null;
        });
        return {
            ...initial,
            requests: gm.requests,
            restoredAfterRemoval:
                restoredRow.nextElementSibling === installHeading,
        };
    } finally {
        dom.window.close();
    }
}

async function runAdvancedSearchScenario() {
    const names = [
        "alpha",
        "beta",
        "gamma",
        "delta",
    ];
    const dom = createPage(
        `<title>Search | npm</title><main>${createSearchCards(names)}</main>`,
        "https://www.npmjs.com/search?q=example"
    );
    dom.window.localStorage.setItem(
        "npm-enhancer:settings:search-badges",
        "true"
    );
    dom.window.localStorage.setItem(
        "npm-userscript:settings:feature:module-replacements",
        "false"
    );
    dom.window.localStorage.setItem(
        "npm-userscript:settings:feature:show-vulnerabilities",
        "false"
    );

    let activeManifests = 0;
    let maximumActiveManifests = 0;
    const gm = installGm(dom, async (url) => {
        if (url.includes("/-/v1/search")) {
            return {
                objects: names.map((name) => ({
                    package: { name, version: "1.0.0" },
                })),
            };
        }
        if (url.endsWith("/latest")) {
            activeManifests += 1;
            maximumActiveManifests = Math.max(
                maximumActiveManifests,
                activeManifests
            );
            await new Promise((resolve) => setTimeout(resolve, 25));
            activeManifests -= 1;
            const name = decodeURIComponent(url.split("/").at(-2));
            return {
                engines: { node: ">=22" },
                name,
                type: "module",
                types: "index.d.ts",
                version: "1.0.0",
            };
        }
        throw new Error(`Unexpected request: ${url}`);
    });

    try {
        runScript(dom);
        await waitFor(
            () =>
                dom.window.document.querySelectorAll(
                    ".npm-userscript-search-badges"
                ).length === names.length
        );
        const firstBadgeIcon = dom.window.document.querySelector(
            ".npm-userscript-package-label-icon"
        );
        return {
            badgeIconFontFamily:
                dom.window.getComputedStyle(firstBadgeIcon).fontFamily,
            badgeIcons: Array.from(
                dom.window.document.querySelectorAll(
                    ".npm-userscript-package-label-icon"
                )
            ).map((icon) => icon.textContent),
            manifestRequests: gm.requests.filter((url) =>
                url.endsWith("/latest")
            ).length,
            maximumActiveManifests,
            requestedJsDelivrFileLists: gm.requests.some((url) =>
                url.includes("data.jsdelivr.com")
            ),
            searchBadgeRows: dom.window.document.querySelectorAll(
                ".npm-userscript-search-badges"
            ).length,
        };
    } finally {
        dom.window.close();
    }
}

async function main() {
    const results = {
        advancedSearch: await runAdvancedSearchScenario(),
        coexistence: await runCoexistenceScenario(),
        defaultSearch: await runDefaultSearchScenario(),
        dependencies: await runDependenciesScenario(),
        dependents: await runDependentsScenario(),
        deferredRepositoryCard: await runDeferredRepositoryCardScenario(),
        packagePage: await runPackageScenario(),
        repositoryCard: await runRepositoryCardScenario(),
        sidebarIntegration: await runSidebarIntegrationScenario(),
        versionSidebar: await runVersionSidebarScenario(),
        versions: await runVersionsScenario(),
        versionsFallback: await runVersionsFallbackScenario(),
    };
    process.stdout.write(JSON.stringify(results));
}

main().catch((error) => {
    process.stderr.write(`${error.stack || error}\n`);
    process.exitCode = 1;
});
