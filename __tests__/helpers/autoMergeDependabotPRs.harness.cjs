const fs = require("node:fs");
const path = require("node:path");

const { JSDOM, VirtualConsole } = require("jsdom");

const script = fs.readFileSync(
    path.join(__dirname, "..", "..", "AutoMergeDependabotPRs.user.js"),
    "utf8"
);

const SETTINGS_KEY = "dependabot-merge-assistant-settings-v3";
const ROOT_ID = "dependabot-merge-assistant-root";
const WARNING_ID = "dependabot-merge-assistant-legacy-warning";

function createPage({
    action = "Squash and merge",
    author = "dependabot[bot]",
    status = "All checks have passed",
    title = "Bump example from 1.2.3 to 1.2.4",
    url = "https://github.com/Nick2bad4u/example/pull/42",
} = {}) {
    const virtualConsole = new VirtualConsole();
    if (process.env.DEBUG_DEPENDABOT_ASSISTANT_HARNESS) {
        virtualConsole.on("jsdomError", (error) => console.error(error));
        virtualConsole.on("error", (...arguments_) =>
            console.error(...arguments_)
        );
        virtualConsole.on("warn", (...arguments_) =>
            console.error(...arguments_)
        );
    }
    const authorSummary =
        author === "dependabot[bot]"
            ? `<div><a href="/dependabot[bot]">dependabot[bot]</a> wants to merge 1 commit into main</div>`
            : `<div><a href="/${author}">${author}</a> wants to merge 1 commit into main</div>`;
    const actionMarkup = action
        ? `<button id="native-primary" type="button">${action}</button>`
        : "";
    return new JSDOM(
        `<!doctype html>
        <html>
            <body>
                <main>
                    <h1>${title} #42</h1>
                    ${authorSummary}
                    <div id="merge-box">
                        <h2>Merge info</h2>
                        <section><h3>${status}</h3></section>
                        <section><h3>No conflicts with base branch</h3></section>
                        ${actionMarkup}
                        <button id="method-menu" type="button">Select merge method</button>
                    </div>
                </main>
            </body>
        </html>`,
        {
            pretendToBeVisual: true,
            runScripts: "outside-only",
            url,
            virtualConsole,
        }
    );
}

function installUserscriptApis(dom, initialSettings) {
    const values = new Map();
    if (initialSettings !== undefined)
        values.set(SETTINGS_KEY, initialSettings);
    const commands = [];
    dom.window.GM_getValue = (key, fallback) =>
        values.has(key) ? values.get(key) : fallback;
    dom.window.GM_setValue = (key, value) => values.set(key, value);
    dom.window.GM_registerMenuCommand = (label, callback) => {
        commands.push({ callback, label });
        return commands.length;
    };
    return { commands, values };
}

function runScript(dom) {
    dom.window.eval(script);
}

async function waitFor(check, timeout = 3_000) {
    const started = Date.now();
    while (Date.now() - started < timeout) {
        const value = check();
        if (value) return value;
        await new Promise((resolve) => setTimeout(resolve, 10));
    }
    throw new Error("Timed out waiting for the Dependabot merge assistant");
}

async function getAssistant(dom) {
    const host = await waitFor(() =>
        dom.window.document.getElementById(ROOT_ID)
    );
    return host.shadowRoot;
}

function safeSettings(overrides = {}) {
    return {
        allowedUpdates: {
            major: false,
            minor: true,
            patch: true,
            unknown: false,
        },
        automation: overrides.automation ?? "manual",
        markNotificationDone: true,
        mergeMethod: overrides.mergeMethod ?? "default",
    };
}

async function renderScenario() {
    const dom = createPage({
        url: "https://github.com/Nick2bad4u/example/pull/42/files",
    });
    try {
        const api = installUserscriptApis(dom);
        runScript(dom);
        const shadow = await getAssistant(dom);
        dom.window.document
            .querySelector("main")
            .append(
                dom.window.document.createElement("div"),
                dom.window.document.createElement("div")
            );
        await new Promise((resolve) => setTimeout(resolve, 250));
        return {
            accessible: Boolean(
                shadow.querySelector(
                    '[aria-label="Dependabot pull request merge assistant"]'
                )
            ),
            author: shadow.querySelector('[data-role="author"] strong')
                .textContent,
            commandLabels: api.commands.map(({ label }) => label),
            rootCount: dom.window.document.querySelectorAll(`#${ROOT_ID}`)
                .length,
            subtitle: shadow.querySelector(".subtitle").textContent,
            update: shadow.querySelector('[data-role="update"] strong')
                .textContent,
        };
    } finally {
        dom.window.close();
    }
}

async function nonDependabotScenario() {
    const dom = createPage({ author: "octocat" });
    try {
        installUserscriptApis(dom);
        runScript(dom);
        await new Promise((resolve) => setTimeout(resolve, 250));
        return {
            hasAssistant: Boolean(dom.window.document.getElementById(ROOT_ID)),
        };
    } finally {
        dom.window.close();
    }
}

async function keyboardDismissalScenario() {
    const dom = createPage();
    try {
        installUserscriptApis(dom);
        runScript(dom);
        const shadow = await getAssistant(dom);
        const panel = shadow.querySelector(".panel");
        const launcher = shadow.querySelector(".launcher");
        panel.dispatchEvent(
            new dom.window.KeyboardEvent("keydown", {
                bubbles: true,
                key: "Escape",
            })
        );
        return {
            focusRestored: shadow.activeElement === launcher,
            launcherVisible: !launcher.hidden,
            panelHidden: panel.hidden,
        };
    } finally {
        dom.window.close();
    }
}

function addConfirmation(dom, onConfirm) {
    const confirmation = dom.window.document.createElement("button");
    confirmation.id = "native-confirm";
    confirmation.textContent = "Confirm squash and merge";
    confirmation.addEventListener("click", onConfirm);
    dom.window.document.querySelector("#merge-box").append(confirmation);
}

async function manualScenario() {
    const dom = createPage();
    let nativeClicks = 0;
    let confirmationClicks = 0;
    try {
        installUserscriptApis(dom);
        dom.window.document
            .querySelector("#native-primary")
            .addEventListener("click", () => {
                nativeClicks += 1;
                addConfirmation(dom, () => {
                    confirmationClicks += 1;
                });
            });
        runScript(dom);
        const shadow = await getAssistant(dom);
        shadow.querySelector("button.primary").click();
        await waitFor(() => nativeClicks === 1);
        await waitFor(() =>
            dom.window.document.querySelector("#native-confirm")
        );
        return {
            confirmationClicks,
            message: shadow.querySelector(".message").textContent,
            nativeClicks,
        };
    } finally {
        dom.window.close();
    }
}

async function automaticOpenScenario() {
    const dom = createPage();
    let nativeClicks = 0;
    let confirmationClicks = 0;
    try {
        installUserscriptApis(dom, safeSettings({ automation: "open" }));
        dom.window.document
            .querySelector("#native-primary")
            .addEventListener("click", () => {
                nativeClicks += 1;
                addConfirmation(dom, () => {
                    confirmationClicks += 1;
                });
            });
        runScript(dom);
        await getAssistant(dom);
        await waitFor(() => nativeClicks === 1);
        await new Promise((resolve) => setTimeout(resolve, 100));
        return { confirmationClicks, nativeClicks };
    } finally {
        dom.window.close();
    }
}

async function automaticConfirmScenario({ cancel = false } = {}) {
    const dom = createPage();
    let nativeClicks = 0;
    let confirmationClicks = 0;
    try {
        installUserscriptApis(dom, safeSettings({ automation: "confirm" }));
        dom.window.document
            .querySelector("#native-primary")
            .addEventListener("click", () => {
                nativeClicks += 1;
                addConfirmation(dom, () => {
                    confirmationClicks += 1;
                });
            });
        runScript(dom);
        const shadow = await getAssistant(dom);
        await waitFor(() => nativeClicks === 1);
        const cancelButton = await waitFor(() => {
            const button = shadow.querySelector("button.danger-outline");
            return button && !button.hidden ? button : null;
        });
        if (cancel) {
            cancelButton.click();
            await new Promise((resolve) => setTimeout(resolve, 100));
        } else {
            await waitFor(() => confirmationClicks === 1, 5_000);
        }
        return { confirmationClicks, nativeClicks };
    } finally {
        dom.window.close();
    }
}

async function failedChecksScenario() {
    const dom = createPage({ status: "Some checks were not successful" });
    let nativeClicks = 0;
    try {
        installUserscriptApis(dom, safeSettings({ automation: "confirm" }));
        dom.window.document
            .querySelector("#native-primary")
            .addEventListener("click", () => {
                nativeClicks += 1;
            });
        runScript(dom);
        const shadow = await getAssistant(dom);
        await new Promise((resolve) => setTimeout(resolve, 900));
        return {
            message: shadow.querySelector(".message").textContent,
            nativeClicks,
        };
    } finally {
        dom.window.close();
    }
}

async function preferredMethodScenario() {
    const dom = createPage({ action: "Rebase and merge" });
    let methodMenuClicks = 0;
    let nativeClicks = 0;
    try {
        installUserscriptApis(dom, safeSettings({ mergeMethod: "squash" }));
        const methodMenu = dom.window.document.querySelector("#method-menu");
        const nativePrimary =
            dom.window.document.querySelector("#native-primary");
        methodMenu.addEventListener("click", () => {
            methodMenuClicks += 1;
            const menuItem = dom.window.document.createElement("button");
            menuItem.textContent = "Squash and merge";
            menuItem.addEventListener("click", () => {
                nativePrimary.textContent = "Squash and merge";
                menuItem.remove();
            });
            dom.window.document.body.append(menuItem);
        });
        nativePrimary.addEventListener("click", () => {
            nativeClicks += 1;
            addConfirmation(dom, () => {});
        });
        runScript(dom);
        const shadow = await getAssistant(dom);
        shadow.querySelector("button.primary").click();
        await waitFor(() => nativeClicks === 1);
        return {
            methodMenuClicks,
            nativeClicks,
            nativeLabel: nativePrimary.textContent,
        };
    } finally {
        dom.window.close();
    }
}

async function legacyCookieScenario() {
    const dom = createPage({ author: "octocat" });
    try {
        installUserscriptApis(dom);
        dom.window.document.cookie = "github_token=legacy-secret; Path=/";
        runScript(dom);
        const warning = await waitFor(() =>
            dom.window.document.getElementById(WARNING_ID)
        );
        return {
            cookieRemoved:
                !dom.window.document.cookie.includes("github_token="),
            leakedValueRendered:
                warning.shadowRoot.textContent.includes("legacy-secret"),
            remediationUrl: warning.shadowRoot.querySelector("a").href,
            warningRendered: warning.shadowRoot.textContent.includes(
                "Insecure legacy token cookie removed"
            ),
        };
    } finally {
        dom.window.close();
    }
}

async function malformedSettingsScenario() {
    const dom = createPage();
    let nativeClicks = 0;
    try {
        installUserscriptApis(dom, {
            allowedUpdates: "all",
            automation: "confirm",
        });
        dom.window.document
            .querySelector("#native-primary")
            .addEventListener("click", () => {
                nativeClicks += 1;
            });
        runScript(dom);
        const shadow = await getAssistant(dom);
        await new Promise((resolve) => setTimeout(resolve, 700));
        shadow
            .querySelector('[aria-label="Toggle automation settings"]')
            .click();
        return {
            automation: shadow.querySelector("#dma-automation").value,
            majorAllowed: shadow.querySelector("#dma-allow-major").checked,
            nativeClicks,
            patchAllowed: shadow.querySelector("#dma-allow-patch").checked,
        };
    } finally {
        dom.window.close();
    }
}

async function main() {
    const results = {
        automaticConfirm: await automaticConfirmScenario(),
        automaticOpen: await automaticOpenScenario(),
        cancelAutomaticConfirm: await automaticConfirmScenario({
            cancel: true,
        }),
        failedChecks: await failedChecksScenario(),
        keyboardDismissal: await keyboardDismissalScenario(),
        legacyCookie: await legacyCookieScenario(),
        malformedSettings: await malformedSettingsScenario(),
        manual: await manualScenario(),
        nonDependabot: await nonDependabotScenario(),
        preferredMethod: await preferredMethodScenario(),
        render: await renderScenario(),
    };
    process.stdout.write(JSON.stringify(results));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
