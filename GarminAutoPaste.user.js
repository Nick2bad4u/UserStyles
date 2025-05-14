// ==UserScript==
// @name         Garmin Connect - Auto-Paste on Right Click
// @namespace    typpi.online
// @version      1.5
// @description  Automatically pastes clipboard content into specific input fields on right-click
// @author       Nick2bad4u
// @match        *://connect.garmin.com/*
// @license      UnLicense
// @tag          garmin
// @icon         https://www.google.com/s2/favicons?sz=64&domain=connect.garmin.com
// @grant        none
// @run-at       document-end
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues

// @downloadURL  https://update.greasyfork.org/scripts/536012/Garmin%20Connect%20-%20Auto-Paste%20on%20Right%20Click.user.js
// @updateURL    https://update.greasyfork.org/scripts/536012/Garmin%20Connect%20-%20Auto-Paste%20on%20Right%20Click.meta.js
// ==/UserScript==

(function() {
    'use strict';

    document.body.addEventListener('contextmenu', async function(event) {
        const target = event.target;

        // Check if right-clicked element is one of the target input fields
        if (target.matches('input[name="elev-gain"], input[name="elev-loss"], input[name="youtubeUrl"]')) {
            event.preventDefault(); // Prevent default right-click menu

            try {
                // Use clipboard API to read the text and paste it
                const clipboardText = await navigator.clipboard.readText();
                target.value = clipboardText; // Paste clipboard content into the field
            } catch (err) {
                console.error('Clipboard read error:', err);
                alert('Failed to access clipboard. Try using Ctrl+V manually.');
            }
        }
    });
})();
