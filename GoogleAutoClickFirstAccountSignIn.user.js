// ==UserScript==
// @name         Automatically Select First Google Account to Sign In
// @namespace    nick2bad4u.github.io
// @version      1.9
// @description  Automatically selects the first Google account and continues the sign-in flow
// @author       Nick2bad4u
// @match        https://accounts.google.com/*
// @grant        none
// @license      UnLicense
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @downloadURL  https://update.greasyfork.org/scripts/531639/Automatically%20Select%20First%20Google%20Account%20to%20Sign%20In.user.js
// @updateURL    https://update.greasyfork.org/scripts/531639/Automatically%20Select%20First%20Google%20Account%20to%20Sign%20In.meta.js
// ==/UserScript==

(function () {
    "use strict";

    const CONFIG = {
        accountSelector: "[data-identifier], [data-email]",
        clickableSelector: 'a, button, [role="button"], [role="link"]',
        continueSelector:
            'button, [role="button"], input[type="button"], input[type="submit"]',
        emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/u,
        flowStateKey: "google-auto-first-account-flow-v1",
        flowStateTtlMs: 2 * 60 * 1000,
        initialDelayMs: 500,
        retryIntervalMs: 1000,
        minMutationRetryMs: 400,
        maxAttempts: 45,
    };

    let attempts = 0;
    let lastRunAt = 0;
    let observer;
    let retryTimer;
    let runTimer;
    let memoryFlowState = null;

    function visible(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return (
            rect.width > 0 &&
            rect.height > 0 &&
            style.visibility !== "hidden" &&
            style.display !== "none"
        );
    }

    function textOf(element) {
        return (element?.innerText || element?.textContent || "")
            .replace(/\s+/g, " ")
            .trim();
    }

    function getElementLabels(element) {
        return [
            textOf(element),
            element?.getAttribute?.("aria-label"),
            element?.getAttribute?.("title"),
            element?.getAttribute?.("value"),
        ].filter(Boolean);
    }

    function enabled(element) {
        return (
            visible(element) &&
            !element.disabled &&
            element.getAttribute("aria-disabled") !== "true"
        );
    }

    function findClickable(candidate) {
        const clickable = candidate.matches(CONFIG.clickableSelector)
            ? candidate
            : candidate.closest(CONFIG.clickableSelector) ||
              candidate.querySelector(CONFIG.clickableSelector);
        return enabled(clickable) ? clickable : null;
    }

    function getAccountIdentifier(candidate) {
        return (
            candidate.getAttribute("data-identifier") ||
            candidate.getAttribute("data-email") ||
            ""
        ).trim();
    }

    function findFirstAccountLink() {
        const candidates = document.querySelectorAll(CONFIG.accountSelector);
        for (const candidate of candidates) {
            const identifier = getAccountIdentifier(candidate);
            if (!CONFIG.emailPattern.test(identifier)) continue;

            const clickable = findClickable(candidate);
            if (clickable) return { clickable, identifier };
        }
        return null;
    }

    function findContinueButton() {
        const candidates = document.querySelectorAll(CONFIG.continueSelector);
        for (const candidate of candidates) {
            if (!enabled(candidate)) continue;
            const hasContinueLabel = getElementLabels(candidate).some(
                (label) => label.trim().toLowerCase() === "continue"
            );
            if (hasContinueLabel) {
                return candidate;
            }
        }
        return null;
    }

    function loadFlowState() {
        let state = memoryFlowState;
        try {
            state =
                JSON.parse(
                    window.sessionStorage.getItem(CONFIG.flowStateKey) || "null"
                ) || memoryFlowState;
        } catch {
            // Fall back to in-memory state when storage is unavailable.
        }

        if (
            !state ||
            typeof state.updatedAt !== "number" ||
            Date.now() - state.updatedAt > CONFIG.flowStateTtlMs
        ) {
            memoryFlowState = null;
            try {
                window.sessionStorage.removeItem(CONFIG.flowStateKey);
            } catch {
                // Storage is optional; the in-memory state is already cleared.
            }
            return null;
        }

        memoryFlowState = state;
        return state;
    }

    function saveFlowState(state) {
        const nextState = { ...state, updatedAt: Date.now() };
        memoryFlowState = nextState;
        try {
            window.sessionStorage.setItem(
                CONFIG.flowStateKey,
                JSON.stringify(nextState)
            );
        } catch {
            // The in-memory state still prevents repeat clicks on this page.
        }
    }

    function cleanup() {
        observer?.disconnect();
        window.clearTimeout(runTimer);
        window.clearInterval(retryTimer);
    }

    function scheduleRun(delayMs = CONFIG.minMutationRetryMs) {
        window.clearTimeout(runTimer);
        runTimer = window.setTimeout(run, delayMs);
    }

    function run() {
        const now = Date.now();
        if (now - lastRunAt < CONFIG.minMutationRetryMs) return;
        lastRunAt = now;

        if (attempts >= CONFIG.maxAttempts) {
            console.log(
                `Google account selector: account not found after ${CONFIG.maxAttempts} attempts.`
            );
            cleanup();
            return;
        }

        attempts += 1;
        const flowState = loadFlowState();

        if (flowState?.phase === "completed") {
            cleanup();
            return;
        }

        if (flowState?.phase === "account-selected") {
            const continueButton = findContinueButton();
            if (!continueButton) return;

            saveFlowState({
                ...flowState,
                phase: "completed",
                continueUrl: window.location.href,
            });
            cleanup();
            console.log("Google account selector: continuing sign-in flow.");
            continueButton.click();
            return;
        }

        const account = findFirstAccountLink();
        if (!account) return;

        saveFlowState({
            phase: "account-selected",
            identifier: account.identifier,
            pickerUrl: window.location.href,
        });
        console.log(
            `Google account selector: selecting ${account.identifier} on attempt ${attempts}.`
        );
        account.clickable.click();
    }

    function start() {
        const root = document.documentElement || document.body;
        if (!root) {
            window.setTimeout(start, CONFIG.initialDelayMs);
            return;
        }

        observer = new MutationObserver(() => scheduleRun());
        observer.observe(root, { childList: true, subtree: true });
        retryTimer = window.setInterval(run, CONFIG.retryIntervalMs);
        scheduleRun(CONFIG.initialDelayMs);
    }

    window.addEventListener("pagehide", cleanup, { once: true });
    start();
})();
