/* eslint-disable no-undef */
void (async function () {
	'use strict';

	// Check if chrome storage and sync are available
	if (
		typeof chrome !== 'undefined' &&
		chrome.storage &&
		chrome.storage.sync &&
		chrome.runtime
	) {
		try {
			const result = await getChromeStorage([
				'disableSteamCommunity',
				'disableStore',
			]);
			const url = window.location.href;

			// Check if the URL matches the conditions to not inject the UI
			if (
				(result.disableSteamCommunity && url.includes('steamcommunity.com')) ||
				(result.disableStore && url.includes('store.steampowered.com'))
			) {
				return; // Do not inject the UI
			}

			// Create and append the button
			createAndAppendButton();
			// Inject CSS styles
			injectStyles();
		} catch (error) {
			console.error('Error fetching chrome storage:', error); // Log error if fetching chrome storage fails
		}
	}

	// Cache to store chrome storage data to avoid redundant fetches
	let chromeStorageCache = null;

	// Listen for changes to Chrome storage and invalidate the cache
	if (
		typeof chrome !== 'undefined' &&
		chrome.storage &&
		chrome.storage.onChanged
	) {
		try {
			chrome.storage.onChanged.addListener(() => {
				chromeStorageCache = null;
			});
		} catch (error) {
			console.error('Error attaching storage listener:', error);
		}
	}

	// Function to get chrome storage data
	/**
	 * Retrieves data from Chrome storage.
	 * @param {Array<string>} keys - The keys to retrieve from Chrome storage.
	 * @returns {Promise<Object>} A promise that resolves to the retrieved data.
	 */
	function getChromeStorage(keys) {
		if (chromeStorageCache) {
			return Promise.resolve(chromeStorageCache);
		}
		return new Promise((resolve, reject) => {
			try {
				chrome.storage.sync.get(keys, (result) => {
					if (chrome.runtime.lastError) {
						reject(
							new Error(
								chrome.runtime.lastError?.message ??
									String(chrome.runtime.lastError),
							),
						);
					} else {
						chromeStorageCache = result;
						resolve(result);
					}
				});
			} catch (error) {
				reject(error instanceof Error ? error : new Error(String(error)));
			}
		});
	}

	// Function to create and append the button
	function createAndAppendButton() {
		const button = document.createElement('button');
		button.textContent = 'Show Steam Cookies';
		button.classList.add('steam-cookie-button');

		// Add click event to open the popup
		button.addEventListener('click', () => {
			try {
				chrome.runtime.sendMessage(
					{
						action: 'openPopup',
					},
					(response) => {
						if (chrome.runtime.lastError) {
							console.error('Error sending message:', chrome.runtime.lastError);
						} else {
							console.log('Popup opened:', response);
						}
					},
				);
			} catch (error) {
				console.error('Failed to send message:', error);
			}
		});

		// Append the button to the body
		try {
			document.body.appendChild(button);
		} catch (error) {
			console.error('Failed to append button:', error);
		}
	}

	/**
	 * Injects CSS styles dynamically into the document head.
	 */
	function injectStyles() {
		try {
			const style = document.createElement('style');
			style.textContent = `
				.steam-cookie-button {
					position: fixed;
					bottom: 10px;
					right: 10px;
					background-color: #333;
					color: #fff;
					padding: 10px;
					border: none;
					border-radius: 5px;
					cursor: pointer;
					z-index: 10000;
				}
			`;
			document.head.appendChild(style);
		} catch (error) {
			console.error('Failed to inject styles:', error);
		}
	}
})();
