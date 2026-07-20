const fs = require("node:fs");
const path = require("node:path");

const { JSDOM, VirtualConsole } = require("jsdom");

const script = fs.readFileSync(
    path.join(__dirname, "..", "..", "NPM-Package-and-Search-Enhancer.user.js"),
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
    "module-replacements",
    "move-funding",
    "no-code-beta",
    "remember-banner",
    "remove-redundant-homepage",
    "repository-card",
    "repository-directory",
    "search-results",
    "show-binary-label",
    "show-cli-label",
    "show-engine-label",
    "show-file-types-label",
    "show-lifecycle-scripts-label",
    "show-types-label",
    "show-vulnerabilities",
    "stars",
    "tarball-size",
    "unpacked-size-and-total-files",
];

function createPage(body, url) {
    const dom = new JSDOM(body, {
        pretendToBeVisual: true,
        runScripts: "outside-only",
        url,
        virtualConsole: new VirtualConsole(),
    });
    dom.window.Headers = global.Headers;
    dom.window.Request = global.Request;
    dom.window.structuredClone = global.structuredClone;
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
                    const response = await respond(options.url, options);
                    options.onload?.({
                        readyState: 4,
                        response,
                        responseHeaders: "content-type: application/json",
                        responseText: JSON.stringify(response),
                        status: 200,
                        statusText: "OK",
                    });
                } catch (error) {
                    options.onerror?.(error);
                }
            });
        },
    };

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

function setOnlyFeature(dom, enabledFeature) {
    for (const name of FEATURE_NAMES) {
        dom.window.localStorage.setItem(
            `npm-userscript:settings:feature:${name}`,
            JSON.stringify(name === enabledFeature)
        );
    }
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
        gm.commands[0].callback();
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
            searchBadgesChecked: dialog.querySelector(
                '.setting-emphasis input[type="checkbox"]'
            ).checked,
            searchLinkRows: dom.window.document.querySelectorAll(
                '[data-npm-enhancer-links="search"]'
            ).length,
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
        defaultSearch: await runDefaultSearchScenario(),
        packagePage: await runPackageScenario(),
    };
    process.stdout.write(JSON.stringify(results));
}

main().catch((error) => {
    process.stderr.write(`${error.stack || error}\n`);
    process.exitCode = 1;
});
