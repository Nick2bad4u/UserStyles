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
const STATUS_ID = "merge-status";

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

function installUserscriptApis(
    dom,
    { accelerateTimers = false, orgs = "", requestHandler } = {}
) {
    const encryptedToken = JSON.stringify({
        iv: Array.from({ length: 12 }, () => 0),
        token: [1],
    });
    const values = new Map([
        ["encryption_key", "{}"],
        ["github_orgs", orgs],
        ["github_token", encryptedToken],
        ["github_username", "Nick2bad4u"],
    ]);
    const alerts = [];
    const requests = [];

    if (accelerateTimers) {
        const nativeSetTimeout = dom.window.setTimeout.bind(dom.window);
        dom.window.setTimeout = (callback, milliseconds = 0, ...arguments_) =>
            nativeSetTimeout(
                callback,
                Math.min(Number(milliseconds) || 0, 5),
                ...arguments_
            );
    }

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
    dom.window.GM_xmlhttpRequest = (options) => {
        requests.push({ method: options.method, url: options.url });
        if (!requestHandler) {
            throw new Error("The lifecycle test must not call the GitHub API");
        }
        const outcome = requestHandler(options, requests);
        dom.window.queueMicrotask(() => {
            if (outcome.type === "error") {
                options.onerror(outcome.error || new Error("Network error"));
                return;
            }
            options.onload({
                responseHeaders: outcome.responseHeaders || "",
                responseText: JSON.stringify(outcome.body ?? {}),
                status: outcome.status,
            });
        });
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
    return { alerts, requests };
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

function createBatchRequestHandler() {
    const repository = (owner, name) => ({
        archived: false,
        full_name: `${owner}/${name}`,
        name,
        owner: { login: owner },
    });
    const pull = (number, title) => ({
        number,
        title,
        user: { login: "dependabot[bot]" },
    });

    return (options) => {
        const url = new URL(options.url);
        const page = url.searchParams.get("page");

        if (url.pathname === "/users/Nick2bad4u/repos") {
            return {
                body:
                    page === "1"
                        ? [
                              repository("Nick2bad4u", "deleted-repo"),
                              repository("Nick2bad4u", "retry-repo"),
                          ]
                        : [],
                status: 200,
            };
        }
        if (url.pathname === "/orgs/Acme/repos") {
            return {
                body: page === "1" ? [repository("Acme", "success-repo")] : [],
                status: 200,
            };
        }
        if (url.pathname === "/repos/Nick2bad4u/deleted-repo/pulls") {
            return { body: { message: "Not Found" }, status: 404 };
        }
        if (url.pathname === "/repos/Nick2bad4u/retry-repo/pulls") {
            return { body: [pull(5, "Retry exhaustion")], status: 200 };
        }
        if (url.pathname === "/repos/Acme/success-repo/pulls") {
            return {
                body: [pull(5, "Successful organization merge")],
                status: 200,
            };
        }
        if (
            options.method === "PUT" &&
            url.pathname === "/repos/Nick2bad4u/retry-repo/pulls/5/merge"
        ) {
            return {
                body: { message: "Pull Request is not mergeable" },
                status: 405,
            };
        }
        if (
            options.method === "PUT" &&
            url.pathname === "/repos/Acme/success-repo/pulls/5/merge"
        ) {
            return {
                body: {
                    merged: true,
                    message: "Pull Request successfully merged",
                },
                status: 200,
            };
        }

        throw new Error(`Unhandled ${options.method} request: ${options.url}`);
    };
}

async function lifecycleScenario() {
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

        return {
            alertCount: api.alerts.length,
            beforeNavigation,
            notificationButtonCount,
            notificationsButtonVisible: Boolean(notificationsButton),
            pullPosition,
            removedAfterLeaving:
                !dom.window.document.getElementById(BUTTON_CONTAINER_ID),
        };
    } finally {
        dom.window.close();
    }
}

async function batchScenario() {
    const dom = createPage();
    try {
        const api = installUserscriptApis(dom, {
            accelerateTimers: true,
            orgs: "Acme",
            requestHandler: createBatchRequestHandler(),
        });
        dom.window.eval(script);
        navigate(dom, "/notifications");
        const mergeButton = await waitFor(() =>
            dom.window.document.getElementById(BUTTON_ID)
        );
        mergeButton.click();

        const selection = await waitFor(() =>
            dom.window.document.getElementById(
                "merge-dependabot-pr-selection-container"
            )
        );
        const scanDetails = Array.from(
            dom.window.document.querySelectorAll("#merge-status-details li")
        ).map((element) => element.textContent);

        selection
            .querySelector(".merge-dependabot-btn")
            .dispatchEvent(
                new dom.window.MouseEvent("click", { bubbles: true })
            );
        selection
            .querySelector("#merge-dependabot-merge-selected-btn")
            .dispatchEvent(
                new dom.window.MouseEvent("click", { bubbles: true })
            );

        const activePanel = dom.window.document.getElementById(STATUS_ID);
        const closeWasDisabledDuringMerge = activePanel.querySelector(
            "#merge-status-close"
        ).disabled;
        activePanel.remove();
        const recreatedPanel = await waitFor(() => {
            const panel = dom.window.document.getElementById(STATUS_ID);
            return panel && panel !== activePanel ? panel : null;
        });
        const completedPanel = await waitFor(() => {
            const panel = dom.window.document.getElementById(STATUS_ID);
            const message = panel?.querySelector("#merge-status-message");
            return message?.textContent.startsWith("Finished:") ? panel : null;
        });
        const requestCountAtCompletion = api.requests.length;
        await new Promise((resolve) => setTimeout(resolve, 100));

        const persistentPanel = dom.window.document.getElementById(STATUS_ID);
        const progress = persistentPanel.querySelector(
            "#merge-status-progress"
        );
        const details = Array.from(
            persistentPanel.querySelectorAll("#merge-status-details li")
        ).map((element) => element.textContent);
        const retryMergeUrl =
            "https://api.github.com/repos/Nick2bad4u/retry-repo/pulls/5/merge";
        const organizationMergeUrl =
            "https://api.github.com/repos/Acme/success-repo/pulls/5/merge";
        const deletedPullUrl =
            "https://api.github.com/repos/Nick2bad4u/deleted-repo/pulls?per_page=100&state=open";

        completedPanel.querySelector("#merge-status-close").click();

        return {
            alertCount: api.alerts.length,
            closeWasDisabledDuringMerge,
            deletedRepositoryFetches: api.requests.filter(
                (request) => request.url === deletedPullUrl
            ).length,
            details,
            dismissedManually: !dom.window.document.getElementById(STATUS_ID),
            organizationMergeRequests: api.requests.filter(
                (request) => request.url === organizationMergeUrl
            ).length,
            panelPersistedAfterCompletion: Boolean(persistentPanel),
            panelRecreatedAfterDomRemoval: Boolean(recreatedPanel),
            progress: {
                max: progress.max,
                value: progress.value,
            },
            requestCountStable:
                api.requests.length === requestCountAtCompletion,
            retryMergeRequests: api.requests.filter(
                (request) => request.url === retryMergeUrl
            ).length,
            scanDetails,
            summary: persistentPanel.querySelector("#merge-status-summary")
                .textContent,
        };
    } finally {
        dom.window.close();
    }
}

async function main() {
    const result =
        process.argv[2] === "batch"
            ? await batchScenario()
            : await lifecycleScenario();
    process.stdout.write(JSON.stringify(result));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
