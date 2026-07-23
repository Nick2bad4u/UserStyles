// ==UserScript==
// @name         Auto Click Google Sign-In Button
// @namespace    nick2bad4u.github.io
// @version      7.0
// @description  Automatically clicks the Google sign-in button on Strava's login page
// @author       Nick2bad4u
// @match        https://www.strava.com/login*
// @match        https://www.strava.com/oauth/authorize*
// @match        https://www.strava.com
// @grant        none
// @license      UnLicense
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @icon         https://www.google.com/s2/favicons?sz=64&domain=strava.com
// @downloadURL  https://update.greasyfork.org/scripts/531638/Auto%20Click%20Google%20Sign-In%20Button.user.js
// @updateURL    https://update.greasyfork.org/scripts/531638/Auto%20Click%20Google%20Sign-In%20Button.meta.js
// @run-at       document-idle
// ==/UserScript==

(function () {
    "use strict";

    let attempts = 0;
    const MAX_ATTEMPTS = 120; // ~15 seconds

    function getGoogleBtn() {
        return document.querySelector('button[data-testid="google_auth_btn"]');
    }

    function isReactHydrated(btn) {
        if (!btn) return false;

        // React attaches internal props like __reactProps$xxxx
        const keys = Object.keys(btn);
        const reactKey = keys.find((k) => k.startsWith("__reactProps$"));

        // Must have a React props object AND a click handler
        return reactKey && typeof btn.onclick === "function";
    }

    function tryClick() {
        attempts++;

        const btn = getGoogleBtn();
        if (!btn) return false;

        // Wait until React hydration is complete
        if (!isReactHydrated(btn)) {
            console.log("[Strava-Google] Button found but React not ready yet");
            return false;
        }

        console.log("[Strava-Google] React hydrated, clicking:", btn);

        btn.dispatchEvent(
            new MouseEvent("click", { bubbles: true, cancelable: true })
        );
        btn.click();

        return true;
    }

    const interval = setInterval(() => {
        if (tryClick()) {
            clearInterval(interval);
            console.log("[Strava-Google] Success!");
        } else if (attempts >= MAX_ATTEMPTS) {
            clearInterval(interval);
            console.warn("[Strava-Google] Failed: hydration never completed.");
        }
    }, 125);
})();
