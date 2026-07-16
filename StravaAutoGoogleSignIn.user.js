// ==UserScript==
// @name         Auto Click Google Sign-In Button
// @namespace    nick2bad4u.github.io
// @version      1.4
// @description  Automatically clicks the Google sign-in button on Strava's login page
// @author       Nick2bad4u
// @match        https://www.strava.com/login*
// @grant        none
// @run-at       document-start
// @license      UnLicense
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @icon         https://www.google.com/s2/favicons?sz=64&domain=strava.com
// @downloadURL  https://update.greasyfork.org/scripts/531638/Auto%20Click%20Google%20Sign-In%20Button.user.js
// @updateURL    https://update.greasyfork.org/scripts/531638/Auto%20Click%20Google%20Sign-In%20Button.meta.js
// ==/UserScript==

(function () {
    "use strict";

    let clicked = false;

    const findGoogleSignIn = () => {
        const testIdButton = document.querySelector(
            'button[data-testid="google_auth_btn"]'
        );
        if (testIdButton) {
            return testIdButton;
        }

        return Array.from(document.querySelectorAll("button, a")).find(
            (element) =>
                element.textContent?.trim().toLowerCase() ===
                "sign in with google"
        );
    };

    const clickGoogleSignIn = () => {
        if (clicked) {
            return true;
        }

        const googleButton = findGoogleSignIn();
        if (!(googleButton instanceof HTMLElement)) {
            return false;
        }

        clicked = true;
        googleButton.click();
        return true;
    };

    if (!clickGoogleSignIn()) {
        const observer = new MutationObserver(() => {
            if (clickGoogleSignIn()) {
                observer.disconnect();
            }
        });

        observer.observe(document, { childList: true, subtree: true });
    }
})();
