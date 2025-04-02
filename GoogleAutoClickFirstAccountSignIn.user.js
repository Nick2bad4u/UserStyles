// ==UserScript==
// @name         Automatically Select First Google Account to Sign In
// @namespace    typpi.online
// @version      1.2
// @description  Selects the first Google account in the Google account selector page
// @author       Nick2bad4u
// @match        https://accounts.google.com/*
// @grant        none
// @license      Unlicense
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @downloadURL  https://update.greasyfork.org/scripts/531638/Automatically%20Select%20First%20Google%20Account%20to%20Sign%20In.user.js
// @updateURL    https://update.greasyfork.org/scripts/531638/Automatically%20Select%20First%20Google%20Account%20to%20Sign%20In.meta.js
// ==/UserScript==

(function() {
	'use strict';

	// Function to select the first account
	const selectFirstAccount = () => {
			const firstAccount = document.querySelector('li.aZvCDf');
			if (firstAccount) {
					const firstLink = firstAccount.querySelector('div[role="link"]');
					if (firstLink) {
							firstLink.click();
					} else {
							console.log('First account link not found.');
					}
			} else {
					console.log('First account not found on the page.');
			}
	};

	// Set up a MutationObserver to wait for dynamic content
	const observer = new MutationObserver(() => {
			if (document.querySelector('li.aZvCDf')) {
					selectFirstAccount();
					observer.disconnect(); // Stop observing once the element is found
			}
	});

	// Observe changes in the document body
	observer.observe(document.body, { childList: true, subtree: true });
})();
