// ==UserScript==
// @name         Garmin SSO Auto Sign In
// @namespace    nick2bad4u.github.io
// @version      1.1
// @description  Helps Garmin SSO sign in by selecting remember options and submitting once the browser/password manager has filled credentials.
// @author       Nick2bad4u
// @match        https://sso.garmin.com/*
// @grant        none
// @license      Unlicense
// @tag          garmin
// @icon         https://www.google.com/s2/favicons?sz=64&domain=garmin.com
// @run-at       document-idle
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// ==/UserScript==

(function () {
    "use strict";

    const CONFIG = {
        // Optional: set this to your Garmin email if Edge/Tampermonkey does not populate the username field.
        // Do not put your Garmin password in this script; let Edge or your password manager fill it.
        email: "",
        autoSubmitDelayMs: 1200,
        maxAttempts: 45,
        attemptIntervalMs: 1000,
        minMutationRetryMs: 400,
        clickCooldownMs: 2500,
        submitRetryMs: 8000,
    };

    let attempts = 0;
    let submitted = false;
    let submittedAt = 0;
    let lastRunAt = 0;
    let lastNextClickAt = 0;
    let runTimer;
    let intervalTimer;
    let observer;

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

    function findInput(selectors) {
        for (const selector of selectors) {
            const input = Array.from(document.querySelectorAll(selector)).find(
                visible
            );
            if (input) return input;
        }
        return null;
    }

    function findButtonByText(patterns) {
        const candidates = Array.from(
            document.querySelectorAll(
                'button, input[type="submit"], input[type="button"], [role="button"]'
            )
        );
        return candidates.find((element) => {
            if (
                !visible(element) ||
                element.disabled ||
                element.getAttribute("aria-disabled") === "true"
            )
                return false;
            const label = [
                textOf(element),
                element.value,
                element.getAttribute("aria-label"),
                element.getAttribute("title"),
            ]
                .filter(Boolean)
                .join(" ");
            return patterns.some((pattern) => pattern.test(label));
        });
    }

    function setNativeValue(input, value) {
        if (!input || input.value === value) return;
        const descriptor = Object.getOwnPropertyDescriptor(
            Object.getPrototypeOf(input),
            "value"
        );
        descriptor?.set?.call(input, value);
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function clickRememberOptions() {
        const inputs = Array.from(
            document.querySelectorAll('input[type="checkbox"]')
        ).filter(visible);
        for (const input of inputs) {
            const id = input.id
                ? document.querySelector(`label[for="${CSS.escape(input.id)}"]`)
                : null;
            const parentLabel = input.closest("label");
            const label =
                `${textOf(id)} ${textOf(parentLabel)} ${input.name || ""} ${input.id || ""}`.toLowerCase();
            if (
                !input.checked &&
                /\bremember\b|trust|stay signed|keep.*signed/.test(label)
            ) {
                input.click();
            }
        }
    }

    function clickCookieAcceptIfPresent() {
        const button = findButtonByText([
            /accept all/i,
            /^accept$/i,
            /agree/i,
        ]);
        if (
            button &&
            /cookie|privacy|consent/i.test(document.body?.innerText || "")
        ) {
            button.click();
        }
    }

    function clickNextWithCooldown(button) {
        const now = Date.now();
        if (now - lastNextClickAt < CONFIG.clickCooldownMs) return false;
        lastNextClickAt = now;
        button.click();
        return true;
    }

    function cleanup() {
        observer?.disconnect();
        window.clearTimeout(runTimer);
        window.clearInterval(intervalTimer);
    }

    function scheduleRun(delayMs = CONFIG.minMutationRetryMs) {
        window.clearTimeout(runTimer);
        runTimer = window.setTimeout(runAutoSignIn, delayMs);
    }

    function runAutoSignIn() {
        const now = Date.now();
        if (now - lastRunAt < CONFIG.minMutationRetryMs) return;
        lastRunAt = now;

        if (submitted && now - submittedAt < CONFIG.submitRetryMs) return;
        if (submitted && now - submittedAt >= CONFIG.submitRetryMs) {
            submitted = false;
            console.log(
                "Garmin SSO auto sign-in: retrying because the page is still on Garmin SSO after submit."
            );
        }

        if (attempts >= CONFIG.maxAttempts) {
            console.log(
                `Garmin SSO auto sign-in: stopped after ${CONFIG.maxAttempts} attempts.`
            );
            cleanup();
            return;
        }
        attempts += 1;

        clickCookieAcceptIfPresent();
        clickRememberOptions();

        const emailInput = findInput([
            'input[type="email"]',
            'input[name="username"]',
            'input[name="email"]',
            'input[autocomplete="username"]',
            'input[id*="username" i]',
            'input[id*="email" i]',
        ]);
        const passwordInput = findInput([
            'input[type="password"]',
            'input[name="password"]',
            'input[autocomplete="current-password"]',
            'input[id*="password" i]',
        ]);

        if (emailInput && CONFIG.email && !emailInput.value) {
            setNativeValue(emailInput, CONFIG.email);
        }

        const nextButton = findButtonByText([/^next$/i, /^continue$/i]);
        if (emailInput && emailInput.value && !passwordInput && nextButton) {
            clickNextWithCooldown(nextButton);
            return;
        }

        const signInButton = findButtonByText([
            /^sign in$/i,
            /^log in$/i,
            /^login$/i,
            /continue/i,
        ]);
        if (passwordInput?.value && signInButton) {
            submitted = true;
            submittedAt = Date.now();
            window.setTimeout(() => {
                if (
                    visible(signInButton) &&
                    signInButton.getAttribute("aria-disabled") !== "true" &&
                    !signInButton.disabled
                ) {
                    signInButton.click();
                }
            }, CONFIG.autoSubmitDelayMs);
        }
    }

    function start() {
        const root = document.documentElement || document.body;
        if (!root) {
            window.setTimeout(start, CONFIG.minMutationRetryMs);
            return;
        }

        observer = new MutationObserver(() => scheduleRun());
        observer.observe(root, { childList: true, subtree: true });
        intervalTimer = window.setInterval(
            runAutoSignIn,
            CONFIG.attemptIntervalMs
        );
        window.setTimeout(runAutoSignIn, 500);
    }

    start();
})();
