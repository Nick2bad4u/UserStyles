// ==UserScript==
// @name         Dependabot PR Merge Assistant
// @namespace    nick2bad4u.github.io
// @version      3.0.0
// @description  Adds a safe, configurable merge assistant to Dependabot pull requests while keeping GitHub's native checks and confirmation flow in control.
// @author       Nick2bad4u
// @match        https://github.com/*/*/pull/*
// @run-at       document-idle
// @noframes
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @license      UnLicense
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @downloadURL  https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/AutoMergeDependabotPRs.user.js
// @updateURL    https://github.com/Nick2bad4u/UserStyles/raw/refs/heads/main/AutoMergeDependabotPRs.user.js
// ==/UserScript==

(function () {
    "use strict";

    const LOG_PREFIX = "[Dependabot Merge Assistant]";
    const ROOT_ID = "dependabot-merge-assistant-root";
    const LEGACY_WARNING_ID = "dependabot-merge-assistant-legacy-warning";
    const SETTINGS_KEY = "dependabot-merge-assistant-settings-v3";
    const LEGACY_COOKIE_NAME = "github_token";
    const DEPENDABOT_LOGIN = "dependabot[bot]";
    const AUTOMATION_START_DELAY = 400;
    const AUTO_CONFIRM_DELAY = 3_000;

    const AUTOMATION_MODES = new Set([
        "manual",
        "open",
        "confirm",
    ]);
    const MERGE_METHODS = new Set([
        "default",
        "merge",
        "squash",
        "rebase",
    ]);
    const UPDATE_LEVELS = [
        "patch",
        "minor",
        "major",
        "unknown",
    ];
    const UPDATE_RANK = Object.freeze({
        patch: 0,
        minor: 1,
        major: 2,
        unknown: 3,
    });
    const UPDATE_LABELS = Object.freeze({
        patch: "Patch-level",
        minor: "Minor-level",
        major: "Major or breaking",
        unknown: "Unknown update type",
    });
    const PRIMARY_ACTION_LABELS = [
        "Enable auto-merge",
        "Merge when ready",
        "Add to merge queue",
        "Merge pull request",
        "Squash and merge",
        "Rebase and merge",
    ];
    const CONFIRM_ACTION_LABELS = [
        "Confirm auto-merge",
        "Confirm merge when ready",
        "Confirm merge",
        "Confirm squash and merge",
        "Confirm rebase and merge",
    ];
    const METHOD_MENU_LABELS = Object.freeze({
        merge: "Create a merge commit",
        squash: "Squash and merge",
        rebase: "Rebase and merge",
    });
    const METHOD_PRIMARY_LABELS = Object.freeze({
        merge: "Merge pull request",
        squash: "Squash and merge",
        rebase: "Rebase and merge",
    });
    const DEFAULT_SETTINGS = Object.freeze({
        allowedUpdates: Object.freeze({
            major: false,
            minor: true,
            patch: true,
            unknown: false,
        }),
        automation: "manual",
        markNotificationDone: true,
        mergeMethod: "default",
    });

    const state = {
        autoAttemptedPageKey: "",
        autoConfirmation: null,
        context: null,
        panelOpen: true,
        renderTimer: 0,
        settings: loadSettings(),
        settingsOpen: false,
        ui: null,
    };

    function normalizeText(value) {
        return String(value ?? "")
            .replace(/\s+/g, " ")
            .trim();
    }

    function createElement(tagName, options = {}, children = []) {
        const element = document.createElement(tagName);
        if (options.className) element.className = options.className;
        if (options.text !== undefined) element.textContent = options.text;
        if (options.id) element.id = options.id;
        if (options.type) element.type = options.type;
        if (options.value !== undefined) element.value = options.value;
        if (options.name) element.name = options.name;
        if (options.href) element.href = options.href;
        if (options.title) element.title = options.title;
        if (options.checked !== undefined) element.checked = options.checked;
        if (options.disabled !== undefined) element.disabled = options.disabled;
        if (options.hidden !== undefined) element.hidden = options.hidden;
        if (options.attributes) {
            for (const [name, value] of Object.entries(options.attributes)) {
                element.setAttribute(name, String(value));
            }
        }
        for (const child of children) {
            element.append(child);
        }
        return element;
    }

    function cloneDefaults() {
        return {
            allowedUpdates: { ...DEFAULT_SETTINGS.allowedUpdates },
            automation: DEFAULT_SETTINGS.automation,
            markNotificationDone: DEFAULT_SETTINGS.markNotificationDone,
            mergeMethod: DEFAULT_SETTINGS.mergeMethod,
        };
    }

    function getStoredValue(key, fallback) {
        if (typeof GM_getValue !== "function") return fallback;
        try {
            return GM_getValue(key, fallback);
        } catch (error) {
            console.warn(
                `${LOG_PREFIX} Could not read userscript settings.`,
                error
            );
            return fallback;
        }
    }

    function setStoredValue(key, value) {
        if (typeof GM_setValue !== "function") return;
        try {
            const result = GM_setValue(key, value);
            if (result && typeof result.catch === "function") {
                result.catch((error) => {
                    console.warn(
                        `${LOG_PREFIX} Could not save userscript settings.`,
                        error
                    );
                });
            }
        } catch (error) {
            console.warn(
                `${LOG_PREFIX} Could not save userscript settings.`,
                error
            );
        }
    }

    function sanitizeSettings(candidate) {
        const settings = cloneDefaults();
        const hasCompleteShape =
            candidate &&
            typeof candidate === "object" &&
            !Array.isArray(candidate) &&
            AUTOMATION_MODES.has(candidate.automation) &&
            MERGE_METHODS.has(candidate.mergeMethod) &&
            typeof candidate.markNotificationDone === "boolean" &&
            candidate.allowedUpdates &&
            typeof candidate.allowedUpdates === "object" &&
            UPDATE_LEVELS.every(
                (level) => typeof candidate.allowedUpdates[level] === "boolean"
            );
        if (!hasCompleteShape) {
            return settings;
        }

        settings.automation = candidate.automation;
        settings.mergeMethod = candidate.mergeMethod;
        settings.markNotificationDone = candidate.markNotificationDone;
        for (const level of UPDATE_LEVELS) {
            settings.allowedUpdates[level] = candidate.allowedUpdates[level];
        }
        return settings;
    }

    function loadSettings() {
        return sanitizeSettings(getStoredValue(SETTINGS_KEY, cloneDefaults()));
    }

    function saveSettings() {
        setStoredValue(SETTINGS_KEY, state.settings);
    }

    function parsePullRequestLocation() {
        const match = globalThis.location.pathname.match(
            /^\/([^/]+)\/([^/]+)\/pull\/(\d+)(?:\/|$)/
        );
        if (!match) return null;
        return {
            number: Number(match[3]),
            owner: decodeURIComponent(match[1]),
            pageKey: `${match[1]}/${match[2]}#${match[3]}`,
            repo: decodeURIComponent(match[2]),
        };
    }

    function isElementVisible(element) {
        if (!(element instanceof Element)) return false;
        if (element.hidden || element.getAttribute("aria-hidden") === "true") {
            return false;
        }
        const style = globalThis.getComputedStyle?.(element);
        return (
            !style ||
            (style.display !== "none" && style.visibility !== "hidden")
        );
    }

    function getControlLabel(element) {
        return normalizeText(
            element.getAttribute("aria-label") ||
                (element instanceof HTMLInputElement
                    ? element.value
                    : element.textContent)
        );
    }

    function findExactControl(labels, root = document) {
        const acceptedLabels = new Set(labels);
        const controls = root.querySelectorAll(
            'button, [role="button"], [role="menuitem"], input[type="button"], input[type="submit"]'
        );
        return (
            Array.from(controls).find((control) => {
                if (control.closest(`#${ROOT_ID}`)) return false;
                if (
                    control.disabled ||
                    control.getAttribute("aria-disabled") === "true"
                ) {
                    return false;
                }
                return (
                    isElementVisible(control) &&
                    acceptedLabels.has(getControlLabel(control))
                );
            }) ?? null
        );
    }

    function findDependabotAuthorLink() {
        const links = document.querySelectorAll(
            `main a[href="/${DEPENDABOT_LOGIN}"], main a[href="/${encodeURIComponent(
                DEPENDABOT_LOGIN
            )}"]`
        );
        for (const link of links) {
            let container = link.parentElement;
            for (let depth = 0; container && depth < 4; depth += 1) {
                const summary = normalizeText(
                    container.textContent
                ).toLowerCase();
                if (summary.includes("wants to merge")) return link;
                if (summary.length > 700 || container.tagName === "MAIN") break;
                container = container.parentElement;
            }
        }
        return null;
    }

    function getMergeBox() {
        const heading = Array.from(document.querySelectorAll("main h2")).find(
            (element) => normalizeText(element.textContent) === "Merge info"
        );
        if (heading?.parentElement) return heading.parentElement;

        const action = findExactControl(PRIMARY_ACTION_LABELS);
        return action?.closest("form") ?? action?.parentElement ?? null;
    }

    function getMergeSummaries(mergeBox) {
        if (!mergeBox) return [];
        return Array.from(mergeBox.querySelectorAll("h3"))
            .map((heading) => normalizeText(heading.textContent))
            .filter(Boolean);
    }

    function getAvailableAction(mergeBox = getMergeBox()) {
        const control = findExactControl(
            PRIMARY_ACTION_LABELS,
            mergeBox ?? document
        );
        if (!control) return null;
        const label = getControlLabel(control);
        const queued = [
            "Enable auto-merge",
            "Merge when ready",
            "Add to merge queue",
        ].includes(label);
        return { control, kind: queued ? "queued" : "direct", label };
    }

    function hasAutoMergeEnabled(mergeBox = getMergeBox()) {
        if (!mergeBox) return false;
        return Boolean(
            findExactControl(
                ["Disable auto-merge", "Remove from merge queue"],
                mergeBox
            )
        );
    }

    function parseVersion(value) {
        const parts = String(value)
            .split(".")
            .slice(0, 3)
            .map((part) => Number(part));
        if (
            parts.length === 0 ||
            parts.some((part) => !Number.isSafeInteger(part) || part < 0)
        ) {
            return null;
        }
        while (parts.length < 3) parts.push(0);
        return parts;
    }

    function classifyVersionPair(fromValue, toValue) {
        const from = parseVersion(fromValue);
        const to = parseVersion(toValue);
        if (!from || !to) return "unknown";
        if (to[0] < from[0] || (to[0] === from[0] && to[1] < from[1])) {
            return "unknown";
        }
        if (to[0] > from[0]) return "major";
        if (from[0] === 0 && to[1] > from[1]) return "major";
        if (to[1] > from[1]) return "minor";
        if (to[2] > from[2]) return "patch";
        return "unknown";
    }

    function classifyDependabotUpdate() {
        const title = normalizeText(
            document.querySelector("main h1")?.textContent
        );
        const candidateParagraphs = Array.from(
            document.querySelectorAll("main p")
        )
            .filter((paragraph) => {
                const text = normalizeText(paragraph.textContent).toLowerCase();
                return text.includes(" from ") && text.includes(" to ");
            })
            .slice(0, 50)
            .map((paragraph) => normalizeText(paragraph.textContent));
        const source = [title, ...candidateParagraphs].join("\n");
        const levels = [];
        const seenPairs = new Set();
        const lowerSource = source.toLowerCase();
        let cursor = 0;
        while (cursor < lowerSource.length) {
            const fromIndex = lowerSource.indexOf(" from ", cursor);
            if (fromIndex === -1) break;
            const valueStart = fromIndex + 6;
            const toIndex = lowerSource.indexOf(" to ", valueStart);
            if (toIndex === -1) break;
            const fromVersion = extractLeadingVersion(
                source.slice(valueStart, toIndex)
            );
            const toVersion = extractLeadingVersion(source.slice(toIndex + 4));
            const pairKey = `${fromVersion}->${toVersion}`;
            if (fromVersion && toVersion && !seenPairs.has(pairKey)) {
                seenPairs.add(pairKey);
                levels.push(classifyVersionPair(fromVersion, toVersion));
            }
            cursor = toIndex + 4;
        }
        if (levels.length === 0) {
            return { count: 0, level: "unknown" };
        }
        const level = levels.reduce((highest, candidate) =>
            UPDATE_RANK[candidate] > UPDATE_RANK[highest] ? candidate : highest
        );
        return { count: levels.length, level };
    }

    function extractLeadingVersion(value) {
        let version = "";
        let started = false;
        for (const character of String(value)) {
            const isDigit = character >= "0" && character <= "9";
            if (isDigit) {
                started = true;
                version += character;
                continue;
            }
            if (started && character === "." && !version.endsWith(".")) {
                version += character;
                continue;
            }
            if (started) break;
        }
        return version.endsWith(".") ? version.slice(0, -1) : version;
    }

    function getPageContext() {
        const location = parsePullRequestLocation();
        if (!location) return null;
        const authorLink = findDependabotAuthorLink();
        if (!authorLink) return null;
        return {
            ...location,
            author: DEPENDABOT_LOGIN,
            mergeBox: getMergeBox(),
            title: normalizeText(
                document.querySelector("main h1")?.textContent
            ),
            update: classifyDependabotUpdate(),
        };
    }

    function getAutomaticSafety(
        context,
        action = getAvailableAction(context.mergeBox)
    ) {
        if (!action) {
            return {
                safe: false,
                reason: "GitHub has not exposed a merge action yet.",
            };
        }
        if (!state.settings.allowedUpdates[context.update.level]) {
            return {
                safe: false,
                reason: `${UPDATE_LABELS[context.update.level]} updates are not allowed by your automatic-action rules.`,
            };
        }
        if (action.kind === "queued") {
            return {
                safe: true,
                reason: "GitHub will wait for all repository merge requirements.",
            };
        }

        const summaries = getMergeSummaries(context.mergeBox);
        const unsafeSummary = summaries.find((summary) => {
            const normalized = summary.toLowerCase();
            if (normalized.startsWith("no conflicts")) return false;
            return /not successful|fail|cancel|pending|in progress|waiting|running|expected|not completed|conflict|changes requested|merge blocked/.test(
                normalized
            );
        });
        if (unsafeSummary) {
            return {
                safe: false,
                reason: `Automatic confirmation is blocked: ${unsafeSummary}.`,
            };
        }
        return {
            safe: true,
            reason: "GitHub currently exposes a direct merge action with no visible blocking status.",
        };
    }

    function waitFor(getter, timeout = 2_500) {
        const existing = getter();
        if (existing) return Promise.resolve(existing);
        return new Promise((resolve) => {
            let settled = false;
            const finish = (value) => {
                if (settled) return;
                settled = true;
                observer.disconnect();
                globalThis.clearTimeout(timeoutId);
                resolve(value);
            };
            const observer = new MutationObserver(() => {
                const value = getter();
                if (value) finish(value);
            });
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true,
            });
            const timeoutId = globalThis.setTimeout(
                () => finish(null),
                timeout
            );
        });
    }

    async function selectPreferredMergeMethod() {
        const method = state.settings.mergeMethod;
        if (method === "default") return true;

        const mergeBox = getMergeBox();
        const currentAction = getAvailableAction(mergeBox);
        if (currentAction?.label === METHOD_PRIMARY_LABELS[method]) return true;

        const menuButton = findExactControl(
            ["Select merge method"],
            mergeBox ?? document
        );
        if (!menuButton) return false;
        menuButton.click();

        const menuItem = await waitFor(() =>
            findExactControl([METHOD_MENU_LABELS[method]], document)
        );
        if (!menuItem) return false;
        menuItem.click();

        if (currentAction?.kind === "queued") return true;

        return Boolean(
            await waitFor(() => {
                const action = getAvailableAction(getMergeBox());
                return action?.label === METHOD_PRIMARY_LABELS[method]
                    ? action
                    : null;
            })
        );
    }

    function announce(message, tone = "neutral") {
        if (!state.ui) return;
        state.ui.message.textContent = message;
        state.ui.message.dataset.tone = tone;
        state.ui.live.textContent = message;
    }

    function setBusy(isBusy) {
        if (!state.ui) return;
        state.ui.primary.disabled =
            isBusy || !getAvailableAction(getMergeBox());
        state.ui.primary.dataset.busy = String(isBusy);
        state.ui.refresh.disabled = isBusy;
    }

    async function openNativeConfirmation({ automatic = false } = {}) {
        setBusy(true);
        announce("Preparing GitHub’s merge controls…");
        try {
            const selected = await selectPreferredMergeMethod();
            if (!selected && state.settings.mergeMethod !== "default") {
                announce(
                    "Your preferred method is unavailable here. Using the repository’s current method.",
                    "warning"
                );
            }
            const action = getAvailableAction(getMergeBox());
            if (!action) {
                announce(
                    "GitHub has not exposed a merge action for this pull request.",
                    "warning"
                );
                return null;
            }
            action.control.click();
            const confirmation = await waitFor(() =>
                findExactControl(
                    CONFIRM_ACTION_LABELS,
                    getMergeBox() ?? document
                )
            );
            if (!confirmation) {
                if (hasAutoMergeEnabled(getMergeBox())) {
                    announce(
                        "GitHub auto-merge is already enabled.",
                        "success"
                    );
                } else {
                    announce(
                        "GitHub opened the merge flow. Review the native merge box to continue.",
                        "success"
                    );
                }
                return null;
            }
            announce(
                automatic
                    ? "GitHub’s confirmation is ready."
                    : "Review the details in GitHub’s native confirmation, then confirm there.",
                "success"
            );
            return confirmation;
        } catch (error) {
            console.error(
                `${LOG_PREFIX} Could not open GitHub's merge flow.`,
                error
            );
            announce(
                "Could not open GitHub’s merge flow. Refresh the page and try again.",
                "danger"
            );
            return null;
        } finally {
            setBusy(false);
            updatePanel();
        }
    }

    function cancelAutomaticConfirmation(
        message = "Automatic confirmation cancelled."
    ) {
        const pending = state.autoConfirmation;
        if (!pending) return;
        pending.cancelled = true;
        globalThis.clearInterval(pending.intervalId);
        globalThis.clearTimeout(pending.timeoutId);
        state.autoConfirmation = null;
        if (state.ui) state.ui.cancel.hidden = true;
        announce(message, "warning");
    }

    function markNotificationDone() {
        if (!state.settings.markNotificationDone) return false;
        const doneButton = findExactControl(["Done"], document);
        if (!doneButton) return false;
        const containerText = normalizeText(
            doneButton.closest(
                '[role="alert"], [role="status"], .flash, .js-flash-container'
            )?.textContent
        ).toLowerCase();
        if (
            !containerText ||
            !/notification|subscription|marked as done/.test(containerText)
        ) {
            return false;
        }
        doneButton.click();
        return true;
    }

    function beginAutomaticConfirmation() {
        cancelAutomaticConfirmation("");
        const pending = {
            cancelled: false,
            intervalId: 0,
            timeoutId: 0,
        };
        state.autoConfirmation = pending;
        if (state.ui) state.ui.cancel.hidden = false;

        const startedAt = Date.now();
        const updateCountdown = () => {
            if (pending.cancelled) return;
            const remaining = Math.max(
                1,
                Math.ceil(
                    (AUTO_CONFIRM_DELAY - (Date.now() - startedAt)) / 1_000
                )
            );
            if (state.ui) {
                state.ui.cancel.textContent = `Cancel automatic confirmation (${remaining}s)`;
            }
            announce(
                `Automatic confirmation in ${remaining} second${remaining === 1 ? "" : "s"}…`,
                "warning"
            );
        };
        updateCountdown();
        pending.intervalId = globalThis.setInterval(updateCountdown, 250);
        pending.timeoutId = globalThis.setTimeout(() => {
            if (pending.cancelled) return;
            globalThis.clearInterval(pending.intervalId);
            state.autoConfirmation = null;
            if (state.ui) state.ui.cancel.hidden = true;

            const confirmation = findExactControl(
                CONFIRM_ACTION_LABELS,
                getMergeBox() ?? document
            );
            if (!confirmation) {
                announce(
                    "GitHub’s confirmation expired before it could be submitted.",
                    "warning"
                );
                return;
            }
            confirmation.click();
            announce(
                "Confirmation submitted to GitHub. GitHub will enforce the repository’s merge rules.",
                "success"
            );
            globalThis.setTimeout(() => {
                markNotificationDone();
                scheduleRender();
            }, 800);
        }, AUTO_CONFIRM_DELAY);
    }

    async function maybeRunAutomation(context) {
        if (state.settings.automation === "manual") return;
        if (state.autoAttemptedPageKey === context.pageKey) return;
        state.autoAttemptedPageKey = context.pageKey;

        const action = getAvailableAction(context.mergeBox);
        const safety = getAutomaticSafety(context, action);
        if (!safety.safe) {
            announce(safety.reason, "warning");
            return;
        }

        const confirmation = await openNativeConfirmation({ automatic: true });
        if (state.settings.automation === "confirm" && confirmation) {
            const latestContext = getPageContext();
            const latestSafety =
                latestContext?.pageKey === context.pageKey
                    ? getAutomaticSafety(latestContext, action)
                    : { safe: false, reason: "The pull request page changed." };
            if (!latestSafety.safe) {
                announce(latestSafety.reason, "warning");
                return;
            }
            beginAutomaticConfirmation();
        }
    }

    function createOption(value, label) {
        return createElement("option", { text: label, value });
    }

    function createCheckbox(id, label, checked) {
        const input = createElement("input", { checked, id, type: "checkbox" });
        const labelElement = createElement(
            "label",
            { className: "checkbox", attributes: { for: id } },
            [input, createElement("span", { text: label })]
        );
        return { input, label: labelElement };
    }

    function createStatusItem(label, value, role) {
        const valueElement = createElement("strong", {
            className: "status-value",
            text: value,
        });
        const item = createElement("div", { className: "status-item" }, [
            createElement("span", { className: "status-label", text: label }),
            valueElement,
        ]);
        item.dataset.role = role;
        return { item, value: valueElement };
    }

    function buildAssistantUI(host) {
        const shadow = host.attachShadow({ mode: "open" });
        const style = createElement("style", { text: ASSISTANT_CSS });
        const launcher = createElement(
            "button",
            {
                className: "launcher",
                title: "Open Dependabot merge assistant",
                type: "button",
                attributes: { "aria-label": "Open Dependabot merge assistant" },
            },
            [
                createElement("span", {
                    className: "launcher-icon",
                    text: "D",
                }),
                createElement("span", {
                    className: "launcher-text",
                    text: "Merge assistant",
                }),
            ]
        );
        const close = createElement("button", {
            className: "icon-button",
            text: "−",
            title: "Minimize",
            type: "button",
            attributes: { "aria-label": "Minimize Dependabot merge assistant" },
        });
        const settingsToggle = createElement("button", {
            className: "icon-button",
            text: "⚙",
            title: "Automation settings",
            type: "button",
            attributes: {
                "aria-expanded": "false",
                "aria-label": "Toggle automation settings",
            },
        });
        const title = createElement("h2", {
            text: "Dependabot merge assistant",
        });
        const subtitle = createElement("p", { className: "subtitle" });
        const verified = createStatusItem(
            "Author",
            "Dependabot verified",
            "author"
        );
        const update = createStatusItem("Update", "Inspecting…", "update");
        const github = createStatusItem(
            "GitHub",
            "Loading controls…",
            "github"
        );
        const message = createElement("p", {
            className: "message",
            text: "Inspecting this pull request…",
            attributes: { role: "status" },
        });
        const method = createElement(
            "select",
            {
                id: "dma-merge-method",
                attributes: { "aria-label": "Preferred merge method" },
            },
            [
                createOption("default", "Repository default"),
                createOption("squash", "Squash and merge"),
                createOption("rebase", "Rebase and merge"),
                createOption("merge", "Create a merge commit"),
            ]
        );
        const primary = createElement("button", {
            className: "primary",
            text: "Open GitHub merge confirmation",
            type: "button",
        });
        const refresh = createElement("button", {
            className: "secondary",
            text: "Refresh status",
            type: "button",
        });
        const cancel = createElement("button", {
            className: "danger-outline",
            hidden: true,
            text: "Cancel automatic confirmation",
            type: "button",
        });
        const automation = createElement(
            "select",
            {
                id: "dma-automation",
                attributes: { "aria-label": "Automatic behavior" },
            },
            [
                createOption("manual", "Manual only (recommended)"),
                createOption("open", "Open GitHub confirmation automatically"),
                createOption(
                    "confirm",
                    "Confirm automatically after countdown"
                ),
            ]
        );
        const patch = createCheckbox("dma-allow-patch", "Patch updates", true);
        const minor = createCheckbox("dma-allow-minor", "Minor updates", true);
        const major = createCheckbox(
            "dma-allow-major",
            "Major / breaking updates",
            false
        );
        const unknown = createCheckbox(
            "dma-allow-unknown",
            "Unknown or unparsed updates",
            false
        );
        const markDone = createCheckbox(
            "dma-mark-done",
            "Mark a matching notification as done after confirmation",
            true
        );
        const acknowledgement = createCheckbox(
            "dma-acknowledge",
            "I understand that automatic confirmation can merge pull requests without another click.",
            false
        );
        acknowledgement.label.classList.add("acknowledgement");
        const warning = createElement(
            "div",
            { className: "settings-warning", hidden: true },
            [
                createElement("strong", {
                    text: "Automatic confirmation is powerful.",
                }),
                createElement("p", {
                    text: "The assistant still requires an exact Dependabot author, an allowed update type, and a safe visible GitHub status. GitHub remains the final authority.",
                }),
                acknowledgement.label,
            ]
        );
        const save = createElement("button", {
            className: "primary small",
            text: "Save automation settings",
            type: "button",
        });
        const reset = createElement("button", {
            className: "secondary small",
            text: "Reset safe defaults",
            type: "button",
        });
        const settings = createElement(
            "section",
            {
                className: "settings",
                hidden: true,
                attributes: { "aria-label": "Automation settings" },
            },
            [
                createElement("label", { className: "field" }, [
                    createElement("span", { text: "Automatic behavior" }),
                    automation,
                ]),
                createElement("fieldset", {}, [
                    createElement("legend", {
                        text: "Allow automatic actions for",
                    }),
                    createElement("div", { className: "checkbox-grid" }, [
                        patch.label,
                        minor.label,
                        major.label,
                        unknown.label,
                    ]),
                ]),
                markDone.label,
                warning,
                createElement("div", { className: "button-row" }, [
                    save,
                    reset,
                ]),
            ]
        );
        const live = createElement("span", {
            className: "sr-only",
            attributes: { "aria-live": "polite" },
        });
        const panel = createElement(
            "section",
            {
                className: "panel",
                attributes: {
                    "aria-label": "Dependabot pull request merge assistant",
                },
            },
            [
                createElement("header", {}, [
                    createElement("div", { className: "brand" }, [
                        createElement("span", {
                            className: "brand-icon",
                            text: "D",
                        }),
                        createElement("div", {}, [title, subtitle]),
                    ]),
                    createElement("div", { className: "header-actions" }, [
                        settingsToggle,
                        close,
                    ]),
                ]),
                createElement("div", { className: "status-grid" }, [
                    verified.item,
                    update.item,
                    github.item,
                ]),
                message,
                createElement("label", { className: "field" }, [
                    createElement("span", { text: "Preferred merge strategy" }),
                    method,
                ]),
                createElement("div", { className: "button-stack" }, [
                    primary,
                    createElement("div", { className: "button-row" }, [
                        refresh,
                        cancel,
                    ]),
                ]),
                settings,
                createElement("footer", {}, [
                    createElement("span", { className: "shield", text: "✓" }),
                    createElement("span", {
                        text: "No token stored. GitHub’s session and native controls are used.",
                    }),
                ]),
                live,
            ]
        );
        const wrapper = createElement("div", { className: "wrapper" }, [
            launcher,
            panel,
        ]);
        shadow.append(style, wrapper);

        return {
            acknowledgement: acknowledgement.input,
            automation,
            cancel,
            close,
            github: github.value,
            launcher,
            live,
            major: major.input,
            markDone: markDone.input,
            message,
            method,
            minor: minor.input,
            panel,
            patch: patch.input,
            primary,
            refresh,
            reset,
            save,
            settings,
            settingsToggle,
            subtitle,
            unknown: unknown.input,
            update: update.value,
            warning,
        };
    }

    function setPanelOpen(open) {
        const wasOpen = state.ui ? !state.ui.panel.hidden : false;
        state.panelOpen = open;
        if (!state.ui) return;
        state.ui.panel.hidden = !open;
        state.ui.launcher.hidden = open;
        if (open && !wasOpen) state.ui.primary.focus({ preventScroll: true });
        if (!open && wasOpen) state.ui.launcher.focus({ preventScroll: true });
    }

    function setSettingsOpen(open) {
        state.settingsOpen = open;
        if (!state.ui) return;
        state.ui.settings.hidden = !open;
        state.ui.settingsToggle.setAttribute("aria-expanded", String(open));
        state.ui.settingsToggle.textContent = open ? "×" : "⚙";
        if (open) populateSettingsForm();
    }

    function updateAutomaticWarning() {
        if (!state.ui) return;
        const needsAcknowledgement = state.ui.automation.value === "confirm";
        state.ui.warning.hidden = !needsAcknowledgement;
        state.ui.save.disabled =
            needsAcknowledgement && !state.ui.acknowledgement.checked;
    }

    function populateSettingsForm() {
        if (!state.ui) return;
        state.ui.automation.value = state.settings.automation;
        state.ui.patch.checked = state.settings.allowedUpdates.patch;
        state.ui.minor.checked = state.settings.allowedUpdates.minor;
        state.ui.major.checked = state.settings.allowedUpdates.major;
        state.ui.unknown.checked = state.settings.allowedUpdates.unknown;
        state.ui.markDone.checked = state.settings.markNotificationDone;
        state.ui.acknowledgement.checked = false;
        updateAutomaticWarning();
    }

    function saveSettingsFromForm() {
        if (!state.ui) return;
        const automation = state.ui.automation.value;
        if (automation === "confirm" && !state.ui.acknowledgement.checked) {
            announce(
                "Acknowledge the automatic-confirmation warning before saving.",
                "warning"
            );
            return;
        }
        state.settings = sanitizeSettings({
            allowedUpdates: {
                major: state.ui.major.checked,
                minor: state.ui.minor.checked,
                patch: state.ui.patch.checked,
                unknown: state.ui.unknown.checked,
            },
            automation,
            markNotificationDone: state.ui.markDone.checked,
            mergeMethod: state.ui.method.value,
        });
        saveSettings();
        state.autoAttemptedPageKey = "";
        setSettingsOpen(false);
        announce("Automation settings saved.", "success");
        updatePanel();
        if (state.context && state.settings.automation !== "manual") {
            globalThis.setTimeout(
                () => void maybeRunAutomation(state.context),
                AUTOMATION_START_DELAY
            );
        }
    }

    function resetSettings() {
        cancelAutomaticConfirmation("");
        state.settings = cloneDefaults();
        saveSettings();
        state.autoAttemptedPageKey = "";
        populateSettingsForm();
        updatePanel();
        announce(
            "Safe defaults restored. Automatic actions are off.",
            "success"
        );
    }

    function bindUIEvents() {
        if (!state.ui) return;
        state.ui.launcher.addEventListener("click", () => setPanelOpen(true));
        state.ui.close.addEventListener("click", () => setPanelOpen(false));
        state.ui.settingsToggle.addEventListener("click", () =>
            setSettingsOpen(!state.settingsOpen)
        );
        state.ui.refresh.addEventListener("click", () => {
            state.context = getPageContext();
            updatePanel();
            announce(
                "Status refreshed from GitHub’s current page state.",
                "success"
            );
        });
        state.ui.primary.addEventListener("click", () => {
            cancelAutomaticConfirmation("");
            void openNativeConfirmation();
        });
        state.ui.cancel.addEventListener("click", () =>
            cancelAutomaticConfirmation()
        );
        state.ui.method.addEventListener("change", () => {
            state.settings.mergeMethod = MERGE_METHODS.has(
                state.ui.method.value
            )
                ? state.ui.method.value
                : "default";
            saveSettings();
            announce("Preferred merge strategy saved.", "success");
        });
        state.ui.automation.addEventListener("change", updateAutomaticWarning);
        state.ui.acknowledgement.addEventListener(
            "change",
            updateAutomaticWarning
        );
        state.ui.save.addEventListener("click", saveSettingsFromForm);
        state.ui.reset.addEventListener("click", resetSettings);
        state.ui.panel.addEventListener("keydown", (event) => {
            if (event.key !== "Escape") return;
            event.preventDefault();
            if (state.settingsOpen) {
                setSettingsOpen(false);
                state.ui.settingsToggle.focus({ preventScroll: true });
            } else {
                setPanelOpen(false);
            }
        });
    }

    function describeGitHubState(context) {
        if (hasAutoMergeEnabled(context.mergeBox)) {
            return { label: "Auto-merge enabled", tone: "success" };
        }
        const action = getAvailableAction(context.mergeBox);
        if (!action) return { label: "No action available", tone: "warning" };
        return {
            label:
                action.kind === "queued"
                    ? "Queue available"
                    : "Merge action ready",
            tone: "success",
        };
    }

    function updatePanel() {
        if (!state.ui || !state.context) return;
        const context = getPageContext() ?? state.context;
        state.context = context;
        context.mergeBox = getMergeBox();
        context.update = classifyDependabotUpdate();

        const githubState = describeGitHubState(context);
        const action = getAvailableAction(context.mergeBox);
        const safety = getAutomaticSafety(context, action);
        const updateCount = context.update.count
            ? ` · ${context.update.count} change${context.update.count === 1 ? "" : "s"}`
            : "";

        state.ui.subtitle.textContent = `${context.owner}/${context.repo} #${context.number}`;
        state.ui.update.textContent = `${UPDATE_LABELS[context.update.level]}${updateCount}`;
        state.ui.update.dataset.tone =
            context.update.level === "patch"
                ? "success"
                : context.update.level === "minor"
                  ? "neutral"
                  : "warning";
        state.ui.github.textContent = githubState.label;
        state.ui.github.dataset.tone = githubState.tone;
        state.ui.method.value = state.settings.mergeMethod;
        state.ui.primary.disabled = !action;

        if (!action && hasAutoMergeEnabled(context.mergeBox)) {
            announce(
                "GitHub auto-merge is already enabled for this pull request.",
                "success"
            );
        } else if (!action) {
            announce(
                "GitHub has not exposed a merge action. The PR may be closed, blocked, or still loading.",
                "warning"
            );
        } else if (state.settings.automation === "manual") {
            announce(
                safety.safe
                    ? "Ready. The button below opens GitHub’s native confirmation; it does not skip it."
                    : `${safety.reason} Manual confirmation remains available.`,
                safety.safe ? "neutral" : "warning"
            );
        } else if (!safety.safe) {
            announce(safety.reason, "warning");
        } else {
            announce(safety.reason, "success");
        }
    }

    function ensureAssistant(context) {
        let host = document.getElementById(ROOT_ID);
        if (!host) {
            host = createElement("div", { id: ROOT_ID });
            host.dataset.dependabotMergeAssistant = "true";
            document.body.append(host);
            state.ui = buildAssistantUI(host);
            bindUIEvents();
        }
        state.context = context;
        setPanelOpen(state.panelOpen);
        updatePanel();
    }

    function removeAssistant() {
        cancelAutomaticConfirmation("");
        document.getElementById(ROOT_ID)?.remove();
        state.context = null;
        state.settingsOpen = false;
        state.ui = null;
    }

    function clearLegacyTokenCookie() {
        const cookieExists = document.cookie
            .split(";")
            .some((part) =>
                normalizeText(part).startsWith(`${LEGACY_COOKIE_NAME}=`)
            );
        if (!cookieExists) return false;
        document.cookie = `${LEGACY_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax; Secure`;
        return true;
    }

    function showLegacyTokenWarning() {
        if (document.getElementById(LEGACY_WARNING_ID)) return;
        const host = createElement("div", { id: LEGACY_WARNING_ID });
        const shadow = host.attachShadow({ mode: "open" });
        const close = createElement("button", {
            text: "×",
            title: "Dismiss",
            type: "button",
            attributes: { "aria-label": "Dismiss legacy token warning" },
        });
        const link = createElement("a", {
            href: "https://github.com/settings/tokens",
            text: "Review and revoke legacy tokens",
            attributes: { rel: "noopener noreferrer", target: "_blank" },
        });
        const warning = createElement(
            "aside",
            {
                attributes: {
                    "aria-label": "Legacy GitHub token security warning",
                },
            },
            [
                createElement("strong", {
                    text: "Insecure legacy token cookie removed",
                }),
                createElement("p", {
                    text: "The previous script stored a GitHub token in a site-wide cookie. This version never stores a token. Revoke that token because it may already have been exposed.",
                }),
                link,
                close,
            ]
        );
        shadow.append(
            createElement("style", { text: LEGACY_WARNING_CSS }),
            warning
        );
        document.body.append(host);
        close.addEventListener("click", () => host.remove());
    }

    function syncPage() {
        state.renderTimer = 0;
        const context = getPageContext();
        if (!context) {
            removeAssistant();
            return;
        }
        if (
            state.context?.pageKey &&
            state.context.pageKey !== context.pageKey
        ) {
            state.autoAttemptedPageKey = "";
            cancelAutomaticConfirmation("");
        }
        ensureAssistant(context);
        if (state.settings.automation !== "manual") {
            globalThis.setTimeout(
                () => void maybeRunAutomation(context),
                AUTOMATION_START_DELAY
            );
        }
    }

    function scheduleRender() {
        if (state.renderTimer) return;
        state.renderTimer = globalThis.setTimeout(syncPage, 120);
    }

    function registerMenuCommand() {
        if (typeof GM_registerMenuCommand !== "function") return;
        try {
            GM_registerMenuCommand(
                "Open Dependabot merge assistant settings",
                () => {
                    const context = getPageContext();
                    if (!context) return;
                    ensureAssistant(context);
                    setPanelOpen(true);
                    setSettingsOpen(true);
                }
            );
        } catch (error) {
            console.warn(
                `${LOG_PREFIX} Could not register the settings menu command.`,
                error
            );
        }
    }

    const ASSISTANT_CSS = `
        :host {
            color-scheme: light dark;
            --dma-accent: #2da44e;
            --dma-accent-hover: #2c974b;
            --dma-bg: var(--bgColor-default, #ffffff);
            --dma-bg-muted: var(--bgColor-muted, #f6f8fa);
            --dma-border: var(--borderColor-default, #d0d7de);
            --dma-danger: var(--fgColor-danger, #cf222e);
            --dma-fg: var(--fgColor-default, #1f2328);
            --dma-muted: var(--fgColor-muted, #656d76);
            --dma-shadow: 0 12px 36px rgb(31 35 40 / 18%), 0 3px 10px rgb(31 35 40 / 10%);
            --dma-warning: var(--fgColor-attention, #9a6700);
            font: 13px/1.45 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        *, *::before, *::after { box-sizing: border-box; }
        button, select, input { font: inherit; }
        button, select { min-height: 36px; }
        button { cursor: pointer; }
        button:disabled { cursor: not-allowed; opacity: 0.55; }
        button:focus-visible, select:focus-visible, input:focus-visible, a:focus-visible {
            outline: 2px solid var(--focus-outlineColor, #0969da);
            outline-offset: 2px;
        }
        [hidden] { display: none !important; }
        .wrapper {
            bottom: 20px;
            max-width: calc(100vw - 24px);
            position: fixed;
            right: 20px;
            width: 390px;
            z-index: 2147483000;
        }
        .launcher {
            align-items: center;
            background: var(--dma-bg);
            border: 1px solid var(--dma-border);
            border-radius: 999px;
            box-shadow: var(--dma-shadow);
            color: var(--dma-fg);
            display: flex;
            gap: 8px;
            margin-left: auto;
            padding: 7px 13px 7px 7px;
        }
        .launcher:hover { background: var(--dma-bg-muted); }
        .launcher-icon, .brand-icon {
            align-items: center;
            background: linear-gradient(145deg, #54d876, #218b42);
            border-radius: 50%;
            color: #ffffff;
            display: inline-flex;
            font-weight: 800;
            justify-content: center;
        }
        .launcher-icon { height: 30px; width: 30px; }
        .launcher-text { font-weight: 600; }
        .panel {
            background: var(--dma-bg);
            background: color-mix(in srgb, var(--dma-bg) 96%, transparent);
            border: 1px solid var(--dma-border);
            border-radius: 14px;
            box-shadow: var(--dma-shadow);
            color: var(--dma-fg);
            max-height: min(720px, calc(100vh - 40px));
            overflow: auto;
            padding: 16px;
        }
        header, .brand, .header-actions, .button-row, footer {
            align-items: center;
            display: flex;
        }
        header { justify-content: space-between; }
        .brand { gap: 10px; min-width: 0; }
        .brand-icon { flex: 0 0 auto; height: 38px; width: 38px; }
        h2 { font-size: 15px; line-height: 1.25; margin: 0; }
        .subtitle { color: var(--dma-muted); margin: 2px 0 0; overflow-wrap: anywhere; }
        .header-actions { gap: 4px; }
        .icon-button {
            background: transparent;
            border: 0;
            border-radius: 7px;
            color: var(--dma-muted);
            font-size: 18px;
            height: 36px;
            padding: 0;
            width: 36px;
        }
        .icon-button:hover { background: var(--dma-bg-muted); color: var(--dma-fg); }
        .status-grid {
            display: grid;
            gap: 7px;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            margin: 15px 0 12px;
        }
        .status-item {
            background: var(--dma-bg-muted);
            border: 1px solid color-mix(in srgb, var(--dma-border) 75%, transparent);
            border-radius: 9px;
            min-width: 0;
            padding: 8px;
        }
        .status-label {
            color: var(--dma-muted);
            display: block;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.06em;
            margin-bottom: 3px;
            text-transform: uppercase;
        }
        .status-value { display: block; font-size: 11px; overflow-wrap: anywhere; }
        .status-value[data-tone="success"] { color: var(--dma-accent); }
        .status-value[data-tone="warning"] { color: var(--dma-warning); }
        .message {
            background: color-mix(in srgb, var(--dma-bg-muted) 80%, transparent);
            border-left: 3px solid var(--dma-border);
            border-radius: 6px;
            margin: 0 0 13px;
            padding: 9px 10px;
        }
        .message[data-tone="success"] { border-left-color: var(--dma-accent); }
        .message[data-tone="warning"] { border-left-color: var(--dma-warning); }
        .message[data-tone="danger"] { border-left-color: var(--dma-danger); }
        .field { display: grid; gap: 5px; margin-bottom: 12px; }
        .field > span, legend { color: var(--dma-muted); font-size: 12px; font-weight: 600; }
        select {
            background: var(--dma-bg);
            border: 1px solid var(--dma-border);
            border-radius: 7px;
            color: var(--dma-fg);
            padding: 6px 28px 6px 9px;
            width: 100%;
        }
        .button-stack { display: grid; gap: 8px; }
        .button-row { gap: 8px; }
        .button-row > * { flex: 1; }
        .primary, .secondary, .danger-outline {
            border-radius: 7px;
            font-weight: 600;
            padding: 7px 12px;
        }
        .primary {
            background: var(--dma-accent);
            border: 1px solid rgb(27 31 36 / 15%);
            color: #ffffff;
            width: 100%;
        }
        .primary:hover:not(:disabled) { background: var(--dma-accent-hover); }
        .primary[data-busy="true"] { cursor: progress; }
        .secondary, .danger-outline {
            background: var(--button-default-bgColor-rest, var(--dma-bg-muted));
            border: 1px solid var(--dma-border);
            color: var(--dma-fg);
        }
        .secondary:hover:not(:disabled) { background: var(--button-default-bgColor-hover, #f3f4f6); }
        .danger-outline { color: var(--dma-danger); }
        .small { min-height: 34px; padding: 6px 10px; }
        .settings {
            border-top: 1px solid var(--dma-border);
            margin-top: 14px;
            padding-top: 14px;
        }
        fieldset { border: 0; margin: 0 0 12px; padding: 0; }
        legend { margin-bottom: 7px; }
        .checkbox-grid { display: grid; gap: 7px; grid-template-columns: 1fr 1fr; }
        .checkbox { align-items: flex-start; display: flex; gap: 7px; }
        .checkbox input { flex: 0 0 auto; margin: 3px 0 0; }
        .settings-warning {
            background: color-mix(in srgb, var(--dma-warning) 10%, var(--dma-bg));
            border: 1px solid color-mix(in srgb, var(--dma-warning) 40%, var(--dma-border));
            border-radius: 8px;
            margin: 12px 0;
            padding: 10px;
        }
        .settings-warning p { margin: 4px 0 9px; }
        .acknowledgement { font-weight: 600; }
        footer {
            border-top: 1px solid var(--dma-border);
            color: var(--dma-muted);
            font-size: 11px;
            gap: 6px;
            margin-top: 14px;
            padding-top: 11px;
        }
        .shield { color: var(--dma-accent); font-weight: 800; }
        .sr-only {
            clip: rect(0, 0, 0, 0);
            clip-path: inset(50%);
            height: 1px;
            overflow: hidden;
            position: absolute;
            white-space: nowrap;
            width: 1px;
        }
        @media (max-width: 480px) {
            .wrapper { bottom: 12px; left: 12px; max-width: none; right: 12px; width: auto; }
            .panel { max-height: calc(100vh - 24px); }
            .status-grid { grid-template-columns: 1fr; }
            .checkbox-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { scroll-behavior: auto !important; transition: none !important; }
        }
        @media (forced-colors: active) {
            .panel, .launcher, .status-item, .message, .settings-warning {
                border: 1px solid CanvasText;
                forced-color-adjust: auto;
            }
            .primary, .launcher-icon, .brand-icon { forced-color-adjust: none; }
        }
    `;

    const LEGACY_WARNING_CSS = `
        :host { color-scheme: light dark; font: 13px/1.45 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
        aside {
            background: var(--bgColor-default, #ffffff);
            border: 1px solid var(--borderColor-danger-muted, #ff818266);
            border-left: 4px solid var(--fgColor-danger, #cf222e);
            border-radius: 8px;
            bottom: 16px;
            box-shadow: 0 8px 28px rgb(31 35 40 / 20%);
            color: var(--fgColor-default, #1f2328);
            max-width: calc(100vw - 32px);
            padding: 12px 42px 12px 14px;
            position: fixed;
            right: 16px;
            width: 420px;
            z-index: 2147483646;
        }
        strong { display: block; margin-bottom: 3px; }
        p { color: var(--fgColor-muted, #656d76); margin: 0 0 7px; }
        a { color: var(--fgColor-accent, #0969da); font-weight: 600; }
        button {
            background: transparent;
            border: 0;
            color: var(--fgColor-muted, #656d76);
            cursor: pointer;
            font-size: 20px;
            height: 32px;
            position: absolute;
            right: 7px;
            top: 7px;
            width: 32px;
        }
        button:focus-visible, a:focus-visible { outline: 2px solid #0969da; outline-offset: 2px; }
    `;

    if (clearLegacyTokenCookie()) showLegacyTokenWarning();
    registerMenuCommand();

    const pageObserver = new MutationObserver(scheduleRender);
    pageObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
    globalThis.addEventListener("popstate", scheduleRender);
    document.addEventListener("turbo:load", scheduleRender);
    document.addEventListener("pjax:end", scheduleRender);
    scheduleRender();
})();
