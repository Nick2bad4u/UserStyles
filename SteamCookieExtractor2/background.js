/* eslint-disable no-undef */

// Event listener for extension installation
chrome.runtime.onInstalled.addListener(() => {
	console.log('Extension installed');
	try {
		void initializeFetch();
	} catch (error) {
		console.error('Error initializing fetch on installation:', error);
	}
});

// Event listener for browser startup
chrome.runtime.onStartup.addListener(() => {
	console.log('Browser restarted');
	try {
		void initializeFetch();
	} catch (error) {
		console.error('Error initializing fetch on startup:', error);
	}
});

// Initialize fetch settings
async function initializeFetch() {
	try {
		const result = await getChromeStorage(['disableFetch', 'fetchInterval']);
		if (!result.disableFetch) {
			await fetchSteamCookies(); // Fetch cookies immediately upon installation/startup
			setFetchInterval(result.fetchInterval || 60); // Set up the interval for periodic fetching
		}
	} catch (error) {
		console.error('Error initializing fetch:', error);
	}
}

// Event listener for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log('Message received:', request);
	try {
		if (request.action === 'openPopup') {
			openPopupWindow();
		}
		sendResponse({ status: 'received' });
	} catch (error) {
		console.error('Error handling message:', error);
		sendResponse({ status: 'error', message: error.message });
	}
});

// Function to get data from Chrome storage
function getChromeStorage(keys) {
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
					resolve(result);
				}
			});
		} catch (error) {
			reject(error instanceof Error ? error : new Error(String(error)));
		}
	});
}

// Function to open a popup window
function openPopupWindow() {
	try {
		chrome.windows.create(
			{
				url: chrome.runtime.getURL('popup.html'),
				type: 'popup',
				width: 500,
				height: 600,
			},
			(window) => {
				console.log('Popup window created:', window);
				// Refresh cookies when the popup is opened
				void fetchSteamCookies();
			},
		);
	} catch (error) {
		console.error('Failed to open popup window:', error);
	}
}

// Function to fetch Steam cookies from both the store and community pages
async function fetchSteamCookies() {
	const tabsToClose = [];
	try {
		const storeTab = await createTab('https://store.steampowered.com');
		tabsToClose.push(storeTab.id);
		await waitForTabLoad(storeTab.id, 'store.steampowered.com');
		const storeCookies = await getCookies('store.steampowered.com');

		const communityTab = await createTab(
			'https://steamcommunity.com/id/TyppiLol',
		);
		tabsToClose.push(communityTab.id);
		await waitForTabLoad(communityTab.id, 'steamcommunity.com');
		const communityCookies = await getCookies('steamcommunity.com');

		const cookies = {
			store: storeCookies,
			community: communityCookies,
			lastFetched: new Date().toISOString(),
		};

		try {
			chrome.storage.local.set({ steamCookies: cookies }, () => {
				if (chrome.runtime.lastError) {
					console.error('Error setting cookies:', chrome.runtime.lastError);
				} else {
					console.log('Cookies set:', cookies);
					showNotification(
						'Cookies refreshed',
						'Steam cookies have been successfully refreshed.',
					);
					chrome.runtime.sendMessage({ action: 'updateCookies', cookies });
				}
			});
		} catch (storageError) {
			console.error('Error during chrome.storage.local.set:', storageError);
		}
	} catch (error) {
		console.error('Error fetching Steam cookies:', error);
	} finally {
		for (const tabId of tabsToClose) {
			try {
				await closeTab(tabId);
			} catch (closeTabError) {
				console.error('Error closing tab:', closeTabError);
			}
		}
	}
}

// Function to create a new tab
function createTab(url) {
	try {
		return new Promise((resolve, reject) => {
			try {
				chrome.tabs.create({ url, active: false }, (tab) => {
					if (chrome.runtime.lastError) {
						reject(
							new Error(
								chrome.runtime.lastError?.message ??
									String(chrome.runtime.lastError),
							),
						);
					} else {
						resolve(tab);
					}
				});
			} catch (error) {
				reject(error instanceof Error ? error : new Error(String(error)));
			}
		});
	} catch (error) {
		console.error('Error creating tab:', error);
		throw error;
	}
}

// Function to wait for a tab to load completely
function waitForTabLoad(tabId, urlFragment) {
	try {
		return new Promise((resolve) => {
			function handleTabUpdate(updatedTabId, info, updatedTab) {
				try {
					if (
						updatedTabId === tabId &&
						info.status === 'complete' &&
						updatedTab.url.includes(urlFragment)
					) {
						chrome.tabs.onUpdated.removeListener(handleTabUpdate);
						resolve();
					}
				} catch (error) {
					console.error('Error in handleTabUpdate:', error);
				}
			}

			chrome.tabs.onUpdated.addListener(handleTabUpdate);
		});
	} catch (error) {
		console.error('Error in waitForTabLoad:', error);
		throw error;
	}
}

// Function to get cookies for a specific domain
function getCookies(domain) {
	try {
		return new Promise((resolve, reject) => {
			try {
				chrome.cookies.getAll({ domain }, (cookies) => {
					if (chrome.runtime.lastError) {
						reject(
							new Error(
								chrome.runtime.lastError?.message ??
									String(chrome.runtime.lastError),
							),
						);
					} else {
						resolve(cookies);
					}
				});
			} catch (error) {
				reject(error instanceof Error ? error : new Error(String(error)));
			}
		});
	} catch (error) {
		console.error('Error in getCookies:', error);
		throw error;
	}
}

// Function to close a tab
function closeTab(tabId) {
	return new Promise((resolve, reject) => {
		try {
			chrome.tabs.remove(tabId, () => {
				if (chrome.runtime.lastError) {
					reject(
						new Error(
							chrome.runtime.lastError?.message ??
								String(chrome.runtime.lastError),
						),
					);
				} else {
					resolve();
				}
			});
		} catch (error) {
			reject(error instanceof Error ? error : new Error(String(error)));
		}
	});
}

// Function to set the fetch interval
function setFetchInterval(minutes) {
	const interval = minutes * 60 * 1000;
	setInterval(() => {
		void (async () => {
			try {
				const result = await getChromeStorage(['disableFetch']);
				if (!result.disableFetch) {
					await fetchSteamCookies();
				}
			} catch (error) {
				console.error('Error in fetch interval:', error);
			}
		})();
	}, interval);
}

// Function to show notifications
function showNotification(title, message) {
	try {
		chrome.storage.sync.get('enableNotifications', (result) => {
			try {
				if (result.enableNotifications) {
					chrome.notifications.create({
						type: 'basic',
						iconUrl: 'icons/icon128.png',
						title: title,
						message: message,
					});
				}
			} catch (error) {
				console.error('Error showing notification:', error);
			}
		});
	} catch (error) {
		console.error('Error getting enableNotifications from storage:', error);
	}
}
