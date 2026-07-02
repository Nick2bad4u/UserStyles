// ==UserScript==
// @name         Automatically Select First Google Account to Sign In
// @namespace    nick2bad4u.github.io
// @version      1.8
// @description  Automatically selects the first Google account in the Google account selector page
// @author       Nick2bad4u
// @match        https://accounts.google.com/*
// @grant        none
// @license      Unlicense
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
        accountPattern: /@gmail\.com\b/i,
        initialDelayMs: 500,
        retryIntervalMs: 1000,
        minMutationRetryMs: 400,
        maxAttempts: 45,
        clickCooldownMs: 3000,
    };

    let attempts = 0;
    let lastClickAt = 0;
    let lastRunAt = 0;
    let observer;
    let retryTimer;
    let runTimer;

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

    function getElementLabel(element) {
        return [
            textOf(element),
            element?.getAttribute?.("aria-label"),
            element?.getAttribute?.("data-email"),
            element?.getAttribute?.("data-identifier"),
            element?.getAttribute?.("title"),
        ]
            .filter(Boolean)
            .join(" ");
    }

    function findClickableAccount(candidate) {
        if (!candidate) return null;
        const clickable = candidate.matches(
            'a, button, [role="button"], [role="link"]'
        )
            ? candidate
            : candidate.querySelector(
                  'a, button, [role="button"], [role="link"]'
              ) ||
              candidate.closest('a, button, [role="button"], [role="link"]');
        return visible(clickable) &&
            clickable.getAttribute("aria-disabled") !== "true"
            ? clickable
            : null;
    }

    function findFirstAccountLink() {
        const candidates = Array.from(
            document.querySelectorAll(
                'li, [data-email], [data-identifier], [role="link"], a, button'
            )
        );
        for (const candidate of candidates) {
            if (
                !visible(candidate) ||
                !CONFIG.accountPattern.test(getElementLabel(candidate))
            )
                continue;
            const clickable = findClickableAccount(candidate);
            if (clickable) return clickable;
        }
        return null;
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
        const accountLink = findFirstAccountLink();
        if (!accountLink) return;

        if (now - lastClickAt < CONFIG.clickCooldownMs) return;
        lastClickAt = now;
        console.log(
            `Google account selector: selecting first matching account on attempt ${attempts}.`
        );
        accountLink.click();
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
        window.setTimeout(run, CONFIG.initialDelayMs);
    }

    start();
})();
