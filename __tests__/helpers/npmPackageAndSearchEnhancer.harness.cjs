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

    dom.window.GM = {
        registerMenuCommand(label, callback) {
            commands.push({ callback, label });
            return 1;
        },
        xmlHttpRequest(options) {
            requests.push(options.url);
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
    dom.window.GM_getValue = (_key, defaultValue) => defaultValue;
    dom.window.GM_registerMenuCommand = (label, callback) =>
        dom.window.GM.registerMenuCommand(label, callback);
    dom.window.GM_setClipboard = () => {};
    dom.window.GM_setValue = () => {};
    dom.window.GM_xmlhttpRequest = (options) =>
        dom.window.GM.xmlHttpRequest(options);

    return { commands, requests };
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
    const versions = [
        "1.0.0",
        "1.0.0+build.2",
        "1.0.0-beta.10",
        "1.0.0-beta.2",
        "1.0.0-alpha.1",
        "0.9.2",
        "0.9.1",
    ];
    const rows = versions
        .map(
            (version) =>
                `<tr><td><a href="/package/example/v/${version}">${version}</a></td><td>100</td><td>today</td></tr>`
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
    dom.window.localStorage.setItem("npm-enhancer:settings:version-limit", "5");
    const gm = installGm(dom, async (url) => {
        if (url.endsWith("/example/7.0.0")) return { version: "7.0.0" };
        if (url.endsWith("/example")) {
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
        if (url.includes("api.npmjs.org/versions/")) {
            return {
                downloads: Object.fromEntries(
                    versions.map((version) => [version, 100])
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
        const versionsPanel =
            dom.window.document.querySelector("#tabpanel-versions");
        versionsPanel.insertAdjacentHTML(
            "beforeend",
            `<table aria-labelledby="current-tags"><tbody></tbody></table>
                <h3 id="version-history">Version History</h3>
                <table aria-labelledby="version-history"><thead><tr><th>Version</th><th>Downloads</th><th>Published</th></tr></thead><tbody>${rows}</tbody></table>`
        );
        const tabs = await waitFor(() =>
            dom.window.document.querySelector(".npm-userscript-version-tabs")
        );
        const patchTab = Array.from(tabs.querySelectorAll("button")).find(
            (button) => button.dataset.versionLevel === "patch"
        );
        patchTab.click();
        const nativeTable = dom.window.document.querySelector(
            'table[aria-labelledby="version-history"]'
        );
        nativeTable.querySelector("tbody").outerHTML = `<tbody>${rows}</tbody>`;
        await waitFor(
            () =>
                nativeTable.querySelectorAll(
                    ".npm-userscript-version-limit-hidden"
                ).length === 2
        );
        return {
            renderedBeforeNativeHistory: Boolean(summaryBeforeNative),
            packumentRequests: gm.requests.filter(
                (url) => url === "https://registry.npmjs.org/example"
            ).length,
            versionDownloadRequests: gm.requests.filter((url) =>
                url.includes("api.npmjs.org/versions/")
            ).length,
            hiddenNativeRows: dom.window.document.querySelectorAll(
                ".npm-userscript-version-limit-hidden"
            ).length,
            patchRows: dom.window.document.querySelectorAll(
                ".npm-userscript-version-summary table tbody tr"
            ).length,
            patchLabels: Array.from(
                dom.window.document.querySelectorAll(
                    ".npm-userscript-version-summary table tbody tr td:first-child"
                )
            ).map((cell) => cell.textContent),
            tabLabels: Array.from(tabs.querySelectorAll("button")).map(
                (button) => button.textContent
            ),
            selectorRole: tabs.getAttribute("role"),
            usesPressedButtons: Array.from(
                tabs.querySelectorAll("button")
            ).every(
                (button) =>
                    button.getAttribute("role") === null &&
                    button.hasAttribute("aria-pressed")
            ),
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
            return candidate?.querySelector(
                ".npm-userscript-version-total-count"
            )?.textContent === "5"
                ? candidate
                : null;
        });
        const provenance = row.querySelector(
            '[aria-label="View provenance details"]'
        );
        const versionValue = row.querySelector("p");
        const totalLink = row.querySelector(".npm-userscript-version-total");
        return {
            provenanceBesideVersion:
                provenance.parentElement === versionValue.parentElement,
            totalCount: totalLink.querySelector(
                ".npm-userscript-version-total-count"
            ).textContent,
            totalHref: totalLink.href,
            totalLabel: totalLink.querySelector(
                ".npm-userscript-version-total-label"
            ).textContent,
            versionValue: versionValue.textContent,
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
            nativeLayoutHidden:
                nativeSection.dataset.npmUserscriptDependencyTable === "true",
            peerRows: peerPanel.querySelectorAll("tbody tr").length,
            peerRange: peerPanel.querySelector(
                ".npm-userscript-dependency-range"
            )?.textContent,
            tableHeaders: Array.from(peerPanel.querySelectorAll("th")).map(
                (heading) => heading.textContent
            ),
            tabLabels: Array.from(
                view.querySelectorAll(".npm-userscript-dependency-tab")
            ).map((button) => button.textContent),
        };
        view.querySelector(".npm-userscript-dependency-native-button").click();
        result.nativeLayoutRestored =
            !nativeSection.hasAttribute(
                "data-npm-userscript-dependency-table"
            ) &&
            !nativeSection.querySelector(".npm-userscript-dependency-view");
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
        return {
            checkboxCount: checkboxes.length,
            compareHref: compareLink.href,
            compareIsEnabled:
                compareLink.getAttribute("aria-disabled") === "false",
            filteredCount,
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
    installGm(dom, async (url) => {
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
                homepage: "https://example.test/docs",
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
        const card = await waitFor(() =>
            dom.window.document.querySelector(".npm-userscript-repository-card")
        );
        const insights = await waitFor(() =>
            dom.window.document.querySelector(
                ".npm-userscript-package-insights"
            )
        );
        const chart = insights.querySelector(
            ".npm-userscript-star-history-chart img"
        );
        const chartStartsLazy = !chart.hasAttribute("src");
        const chartDetails = insights.querySelector(
            ".npm-userscript-star-history"
        );
        chartDetails.open = true;
        chartDetails.dispatchEvent(new dom.window.Event("toggle"));
        dom.window.document.querySelector("#weekly-chart").innerHTML =
            '<svg aria-label="Weekly download chart"></svg>';
        const weeklyChartLink = await waitFor(() =>
            dom.window.document.querySelector(
                ".npm-userscript-weekly-downloads-link"
            )
        );
        return {
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
            chartStartsLazy,
            chartSrcAfterOpen: chart.src,
            insightsAtContentBottom:
                insights.nextElementSibling?.classList.contains(
                    "npm-userscript-settings-trigger"
                ) === true,
            weeklyChartHref: weeklyChartLink.href,
            metricKinds: Array.from(card.querySelectorAll("[data-metric]")).map(
                (metric) => metric.dataset.metric
            ),
        };
    } finally {
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
            await waitFor(() => card.textContent.includes("Unpacked"));
            if (!standaloneFirst) dom.window.eval(packageSizeScript);
            await new Promise((resolve) => setTimeout(resolve, 20));
            const cards = dom.window.document.querySelectorAll(
                "[data-npm-bundlephobia-size]"
            );
            return {
                count: cards.length,
                owner: cards[0]?.dataset.npmEnhancementOwner,
                packageMetricLabels: Array.from(
                    cards[0]?.querySelectorAll(".nbps-metric-label") || []
                ).map((label) => label.textContent),
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
                return candidate?.textContent.includes("Bundlephobia analyzed")
                    ? candidate
                    : null;
            });
            return !Array.from(
                card.querySelectorAll(".nbps-metric-label")
            ).some((label) => label.textContent === "Tarball");
        } finally {
            dom.window.close();
        }
    }

    return {
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
                <div id="version-section"><h3>Version</h3><p>1.0.0</p></div>
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
        if (url.includes("api.github.com/search/issues")) {
            return { total_count: 2 };
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

    try {
        runScript(dom);
        const sidebar = dom.window.document.querySelector("#package-sidebar");
        const installList = await waitFor(() =>
            sidebar.querySelector("[data-npm-more-install-buttons]")
        );
        const fundingButton = await waitFor(() =>
            sidebar.querySelector(".npm-userscript-funding-button")
        );
        const sizeCard = await waitFor(() => {
            const candidate = sidebar.querySelector(
                "[data-npm-bundlephobia-size]"
            );
            return candidate?.nextElementSibling === fundingButton
                ? candidate
                : null;
        });
        await waitFor(() =>
            sidebar.querySelector(".npm-userscript-repository-card")
        );
        const homepageLink = sidebar.querySelector(
            '[aria-labelledby="homePage-link"]'
        );
        const homepageText = sidebar.querySelector("#homePage-link");
        const homepageLinkStyle = dom.window.getComputedStyle(homepageLink);
        const homepageTextStyle = dom.window.getComputedStyle(homepageText);
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

        return {
            homepage: {
                display: homepageLinkStyle.display,
                minWidth: homepageTextStyle.minWidth,
                overflowWrap: homepageTextStyle.overflowWrap,
                text: homepageText.textContent,
                width: homepageLinkStyle.width,
            },
            install: {
                commandCount: defaultInstallCommands.length,
                defaultsToActiveTag: defaultInstallCommands.every(
                    (command) => !command.includes("example@1.0.0")
                ),
                exactVersionCommands: Array.from(
                    pinnedInstallList.querySelectorAll(".mib-command code")
                ).every((code) => code.textContent.includes("example@1.0.0")),
                ...installPlacement,
            },
            size: {
                avoidsNestedBundleLinkSection: !sidebar
                    .querySelector("#bundle-link-section")
                    .contains(sizeCard),
                parentIsSidebar: sizeCard.parentElement === sidebar,
                placement: sizeCard.dataset.placement,
                precedesFundingButton:
                    sizeCard.nextElementSibling === fundingButton,
            },
        };
    } finally {
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
        packagePage: await runPackageScenario(),
        repositoryCard: await runRepositoryCardScenario(),
        sidebarIntegration: await runSidebarIntegrationScenario(),
        versionSidebar: await runVersionSidebarScenario(),
        versions: await runVersionsScenario(),
    };
    process.stdout.write(JSON.stringify(results));
}

main().catch((error) => {
    process.stderr.write(`${error.stack || error}\n`);
    process.exitCode = 1;
});
