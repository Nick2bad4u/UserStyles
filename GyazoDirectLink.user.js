// ==UserScript==
// @name         Gyazo Gif and Video Direct Link Button
// @namespace    typpi.online
// @version      3.1
// @description  Adds a link button to redirect to the direct video or gif link on Gyazo
// @author       Nick2bad4u
// @license      UnLicense
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// @match        https://gyazo.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gyazo.com
// @grant        none
// ==/UserScript==

(function () {
	'use strict';

	function createButtonElement() {
		console.log('Creating button element');
		const button = document.createElement('button');
		button.id = 'direct-video-link-button';
		button.classList.add('btn', 'explorer-action-btn', 'explorer-action-btn-dark');
		button.setAttribute('data-tooltip-content', 'Direct Link');

		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttribute('width', '24');
		svg.setAttribute('height', '24');
		svg.setAttribute('viewBox', '0 0 24 24');
		svg.setAttribute('class', 'icon-link');

		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttribute(
			'd',
			'M3.9 11.1c-.4.4-.4 1 0 1.4l6.6 6.6c.4.4 1 .4 1.4 0l3.6-3.6c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L10 16.6l-5.3-5.3 2.5-2.5c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-3.6 3.6zM20.1 3.9c-.4-.4-1-.4-1.4 0l-3.6 3.6c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0l2.5-2.5L14 10l-6.6-6.6c-.4-.4-1-.4-1.4 0l-3.6 3.6c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0L10 3.4l5.3 5.3-2.5 2.5c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0l3.6-3.6c.4-.4.4-1 0-1.4L13.6 2c-.4-.4-1-.4-1.4 0L4.6 9.6c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0l5.3-5.3L14 10l6.6-6.6c.4-.4.4-1 0-1.4z',
		);

		svg.appendChild(path);
		button.appendChild(svg);

		console.log('Button element created', button);
		return button;
	}

	function createTooltipElement() {
		console.log('Creating tooltip element');
		const tooltip = document.createElement('div');
		tooltip.id = 'tooltip-direct-video-link-button';
		tooltip.setAttribute('role', 'tooltip');
		tooltip.classList.add(
			'react-tooltip',
			'core-styles-module_tooltip__3vRRp',
			'styles-module_tooltip__mnnfp',
			'styles-module_dark__xNqje',
			'react-tooltip__place-bottom',
			'core-styles-module_show__Nt9eE',
			'react-tooltip__show',
		);
		tooltip.style.cssText = 'z-index: 2147483647; font-size: 14px; padding: 6px 10px; max-width: 250px; display: none; position: absolute;';
		tooltip.innerHTML =
			'Direct Link<div class="react-tooltip-arrow core-styles-module_arrow__cvMwQ styles-module_arrow__K0L3T" style="left: 38px; top: -4px;"></div>';

		document.body.appendChild(tooltip);

		console.log('Tooltip element created', tooltip);
		return tooltip;
	}

	function addTooltipListeners(button, tooltip) {
		console.log('Adding tooltip listeners');
		button.onmouseover = function () {
			console.log('Mouseover event on button');
			const rect = button.getBoundingClientRect();
			tooltip.style.left = rect.left + window.scrollX - 18.9453 + 'px';
			tooltip.style.top = rect.top + window.scrollY + 42 + 'px';
			tooltip.style.display = 'block';
			console.log('Tooltip displayed');
		};

		button.onmouseout = function () {
			console.log('Mouseout event on button');
			tooltip.style.display = 'none';
			console.log('Tooltip hidden');
		};
		console.log('Tooltip listeners added');
	}

	function extractDirectLink() {
		console.log('Extracting direct link');
		let directLink = '';
		const imgElement = document.querySelector('img.image-viewer');
		if (imgElement) {
			directLink = imgElement.src;
			console.log('Direct link extracted from image', directLink);
		} else {
			const sourceElement = document.querySelector('#gyazo-video-player > video > source');
			directLink = sourceElement ? sourceElement.src : '#';
			console.log('Direct link extracted from video source', directLink);
		}
		return directLink;
	}

	function addRedirectButton() {
		removeRedirectButton();
		console.log('Adding redirect button');
		const existingButton = document.getElementById('direct-video-link-button');
		if (existingButton) {
			console.log('Existing button found, removing it');
			existingButton.remove();
		}

		let targetElement = null;
		let attempts = 0;
		const maxAttempts = 10;
		const interval = 500;

		const findTargetElement = () => {
			targetElement = document.querySelector(
				'#react-root > div.header-block.explorer-header-block > div.explorer-action-btn-toolbar > div.explorer-action-btn-group',
			);

			if (targetElement) {
				console.log('Target element found');
				const button = createButtonElement();
				const tooltip = createTooltipElement();

				addTooltipListeners(button, tooltip);

				const directLink = extractDirectLink();
				button.onclick = function () {
					console.log('Button clicked, redirecting to', directLink);
					window.location.href = directLink;
				};

				targetElement.insertAdjacentElement('beforebegin', button);
				console.log('Redirect button added');
			} else if (attempts < maxAttempts) {
				attempts++;
				console.log(`Target element not found, retrying in ${interval}ms (attempt ${attempts}/${maxAttempts})`);
				setTimeout(findTargetElement, interval);
			} else {
				console.log('Target element not found after multiple attempts, exiting');
			}
		};

		findTargetElement();
	}

	function removeRedirectButton() {
		if (!location.href.includes('https://gyazo.com/captures')) {
			console.log('Not removing redirect button since not on captures page');
			return;
		}

		console.log('Removing redirect button');
		const existingButton = document.getElementById('direct-video-link-button');
		if (existingButton !== null) {
			console.log('Existing button found, removing it');
			existingButton.remove();
		}
		console.log('Redirect button removed');
	}

	function handlePageChange() {
		console.log('Handling page change');
		const currentUrl = location.href;
		if (currentUrl.includes('https://gyazo.com/captures')) {
			removeRedirectButton();
			console.log('On captures page, not adding button');
		} else {
			addRedirectButton();
		}
	}

	function initialize() {
		console.log('Initializing script');
		handlePageChange();

		const observer = new MutationObserver(() => {
			const currentUrl = location.href;
			if (currentUrl !== observer.lastUrl) {
				console.log('URL changed from', observer.lastUrl, 'to', currentUrl);
				observer.lastUrl = currentUrl;
				handlePageChange();
			}
		});

		observer.lastUrl = location.href;
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
		console.log('Mutation observer added');
	}

	window.addEventListener('load', initialize);
	window.addEventListener('popstate', () => {
		console.log('A soft navigation has been detected:', location.href);
		initialize();
	});
})();
