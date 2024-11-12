// ==UserScript==
// @name         YouTube Volume Display
// @namespace    https://github.com/Nick2bad4u/UserStyles
// @version      1.2
// @description  Display current YouTube volume level in the UI
// @match        *://www.youtube.com/*
// @grant        none
// @author       Nick2bad4u
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @license      UnLicense
// @downloadURL  https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeVolumeDisplay.user.js
// @updateURL    https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeVolumeDisplay.user.js
// ==/UserScript==

(function() {
    'use strict';

    const playerReady = setInterval(() => {
        const videoPlayer = document.querySelector('video');
        const leftControls = document.querySelector('.ytp-left-controls');

        if (videoPlayer && leftControls) {
            clearInterval(playerReady);

            // Create an input element to display volume level
            const volumeDisplay = document.createElement('input');
            volumeDisplay.type = 'text';
            volumeDisplay.value = videoPlayer.muted ? '0' : Math.round(videoPlayer.volume * 100);
            volumeDisplay.readOnly = true;

            // Style the display element
            Object.assign(volumeDisplay.style, {
                width: '40px',
                marginLeft: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.0)',
                color: 'white',
                border: '0px solid rgba(255, 255, 255, 0.0)',
                borderRadius: '4px',
                zIndex: 9999,
                height: '24px',
                fontSize: '16px',
                padding: '0 4px',
                position: 'relative',
                top: '13px',
            });

            // Update display when volume changes
            videoPlayer.addEventListener('volumechange', () => {
                volumeDisplay.value = videoPlayer.muted ? '0' : Math.round(videoPlayer.volume * 100);
            });

            // Insert the display element into the left controls
            leftControls.appendChild(volumeDisplay);
        }
    }, 500);
})();
