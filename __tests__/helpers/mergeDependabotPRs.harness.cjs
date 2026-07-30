const fs = require("node:fs");
const path = require("node:path");
const { TextDecoder, TextEncoder } = require("node:util");

const { JSDOM, VirtualConsole } = require("jsdom");

const script = fs.readFileSync(
    path.join(__dirname, "..", "..", "MergeDependabotPRs.user.js"),
    "utf8"
);

const BUTTON_CONTAINER_ID = "merge-dependabot-merge-button-container";
const BUTTON_ID = "merge-dependabot-merge-button";

function createPage() {
    const virtualConsole = new VirtualConsole();
    if (process.env.DEBUG_DEPENDABOT_MERGER_HARNESS) {
        virtualConsole.on("jsdomError", (error) => console.error(error));
        virtualConsole.on("error", (...arguments_) =>
            console.error(...arguments_)
        );
    }
    return new JSDOM("<!doctype html><html><body><main></main></body></html>", {
        pretendToBeVisual: true,
        runScripts: "outside-only",
        url: "https://github.com/",
        virtualConsole,
    });
}

function installUserscriptApis(dom) {
    const encryptedToken = JSON.stringify({
        iv: Array.from({ length: 12 }, () => 0),
        token: [1],
    });
    const values = new Map([
        ["encryption_key", "{}"],
        ["github_orgs", ""],
        ["github_token", encryptedToken],
        ["github_username", "Nick2bad4u"],
    ]);
    const alerts = [];

    dom.window.TextDecoder = TextDecoder;
    dom.window.TextEncoder = TextEncoder;
    dom.window.alert = (message) => alerts.push(message);
    dom.window.prompt = () => {
        throw new Error("The lifecycle test must not prompt for credentials");
    };
    dom.window.GM_addStyle = () => {};
    dom.window.GM_getValue = (key, fallback) =>
        values.has(key) ? values.get(key) : fallback;
    dom.window.GM_setValue = (key, value) => values.set(key, value);
    dom.window.GM_xmlhttpRequest = () => {
        throw new Error("The lifecycle test must not call the GitHub API");
    };
    Object.defineProperty(dom.window.crypto, "subtle", {
        configurable: true,
        value: {
            decrypt: async () => new TextEncoder().encode("test-token").buffer,
            importKey: async () => ({}),
        },
    });
    Object.defineProperty(dom.window, "onurlchange", {
        configurable: true,
        value: null,
        writable: true,
    });
    return { alerts };
}

async function waitFor(check, timeout = 3_000) {
    const started = Date.now();
    while (Date.now() - started < timeout) {
        const value = check();
        if (value) return value;
        await new Promise((resolve) => setTimeout(resolve, 10));
    }
    throw new Error("Timed out waiting for the batch merger lifecycle");
}

function navigate(dom, pathname) {
    dom.window.history.pushState({}, "", pathname);
    dom.window.dispatchEvent(new dom.window.Event("urlchange"));
}

async function main() {
    const dom = createPage();
    try {
        const api = installUserscriptApis(dom);
        dom.window.eval(script);
        await new Promise((resolve) => setTimeout(resolve, 100));
        const beforeNavigation = Boolean(
            dom.window.document.getElementById(BUTTON_ID)
        );

        navigate(dom, "/notifications");
        const notificationsButton = await waitFor(() =>
            dom.window.document.getElementById(BUTTON_ID)
        );
        dom.window.dispatchEvent(new dom.window.Event("urlchange"));
        await new Promise((resolve) => setTimeout(resolve, 100));
        const notificationButtonCount = dom.window.document.querySelectorAll(
            `#${BUTTON_ID}`
        ).length;

        navigate(dom, "/Nick2bad4u/example/pull/42");
        await waitFor(() => {
            const container =
                dom.window.document.getElementById(BUTTON_CONTAINER_ID);
            return container?.dataset.pageKind === "pull-request"
                ? container
                : null;
        });
        const pullButton = dom.window.document.getElementById(BUTTON_ID);
        const pullPosition = {
            bottom: pullButton.style.bottom,
            left: pullButton.style.left,
            right: pullButton.style.right,
        };

        navigate(dom, "/settings/profile");
        await waitFor(
            () => !dom.window.document.getElementById(BUTTON_CONTAINER_ID)
        );

        process.stdout.write(
            JSON.stringify({
                alertCount: api.alerts.length,
                beforeNavigation,
                notificationButtonCount,
                notificationsButtonVisible: Boolean(notificationsButton),
                pullPosition,
                removedAfterLeaving:
                    !dom.window.document.getElementById(BUTTON_CONTAINER_ID),
            })
        );
    } finally {
        dom.window.close();
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
