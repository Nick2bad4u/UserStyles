/* eslint-disable no-undef */

document.addEventListener('DOMContentLoaded', function () {
	console.log('Document loaded');

	// Fetch and display cookies
	refreshCookies();

	// Load saved preferences
	const disableSteamCommunityCheckbox = document.getElementById(
		'disableSteamCommunity',
	);
	const disableStoreCheckbox = document.getElementById('disableStore');
	const disableFetchCheckbox = document.getElementById('disableFetch');
	const fetchIntervalInput = document.getElementById('fetchInterval');
	const enableNotificationsCheckbox = document.getElementById(
		'enableNotifications',
	);
	const saveIndicator = document.getElementById('saveIndicator');
	//	const lastFetchedElement = document.getElementById('lastFetched');
	const importExportArea = document.getElementById('importExportArea');

	chrome.storage.sync.get(
		[
			'disableSteamCommunity',
			'disableStore',
			'disableFetch',
			'fetchInterval',
			'enableNotifications',
		],
		(result) => {
			if (chrome.runtime.lastError) {
				console.error('Error loading preferences:', chrome.runtime.lastError);
			} else {
				disableSteamCommunityCheckbox.checked =
					result.disableSteamCommunity || false;
				disableStoreCheckbox.checked = result.disableStore || false;
				disableFetchCheckbox.checked = result.disableFetch || false;
				fetchIntervalInput.value = result.fetchInterval || 60;
				enableNotificationsCheckbox.checked =
					result.enableNotifications || false;
				console.log('Preferences loaded:', result);
			}
		},
	);

	// Show save indicator
	function showSaveIndicator() {
		saveIndicator.style.display = 'block';
		setTimeout(() => {
			saveIndicator.style.display = 'none';
		}, 2000);
	}

	// Save preferences when checkboxes are clicked
	function addSaveListener(element, key) {
		element.addEventListener('change', () => {
			const value =
				element.type === 'checkbox' ? element.checked : element.value;
			chrome.storage.sync.set({ [key]: value }, () => {
				if (chrome.runtime.lastError) {
					console.error(`Error saving ${key}:`, chrome.runtime.lastError);
				} else {
					console.log(`Saved ${key}:`, value);
					showSaveIndicator();
				}
			});
		});
	}

	addSaveListener(disableSteamCommunityCheckbox, 'disableSteamCommunity');
	addSaveListener(disableStoreCheckbox, 'disableStore');
	addSaveListener(disableFetchCheckbox, 'disableFetch');
	addSaveListener(fetchIntervalInput, 'fetchInterval');
	addSaveListener(enableNotificationsCheckbox, 'enableNotifications');

	// Save preferences when fetch interval input is changed
	fetchIntervalInput.addEventListener('input', () => {
		const value = fetchIntervalInput.value;
		chrome.storage.sync.set({ fetchInterval: value }, () => {
			if (chrome.runtime.lastError) {
				console.error('Error saving fetchInterval:', chrome.runtime.lastError);
			} else {
				console.log('Saved fetchInterval:', value);
				showSaveIndicator();
			}
		});
	});

	// Clear cookies
	document.getElementById('clearCookies').addEventListener('click', () => {
		chrome.storage.local.remove('steamCookies', () => {
			if (chrome.runtime.lastError) {
				console.error('Error clearing cookies:', chrome.runtime.lastError);
			} else {
				console.log('Cookies cleared');
				refreshCookies();
			}
		});
	});

	// Export cookies
	document.getElementById('exportCookies').addEventListener('click', () => {
		chrome.storage.local.get('steamCookies', (data) => {
			if (chrome.runtime.lastError) {
				console.error(
					'Error getting cookies for export:',
					chrome.runtime.lastError,
				);
			} else {
				importExportArea.value = JSON.stringify(data.steamCookies, null, 2);
				console.log('Cookies exported:', data.steamCookies);
			}
		});
	});

	// Import cookies
	document.getElementById('importCookies').addEventListener('click', () => {
		try {
			const cookies = JSON.parse(importExportArea.value);
			chrome.storage.local.set({ steamCookies: cookies }, () => {
				if (chrome.runtime.lastError) {
					console.error('Error importing cookies:', chrome.runtime.lastError);
				} else {
					console.log('Cookies imported:', cookies);
					refreshCookies();
				}
			});
		} catch (error) {
			console.error('Error parsing cookies for import:', error);
		}
	});
});

// Function to refresh and display cookies
function refreshCookies() {
	chrome.storage.local.get('steamCookies', (data) => {
		if (chrome.runtime.lastError) {
			console.error('Error getting cookies:', chrome.runtime.lastError);
		} else {
			const { store, community, lastFetched } = data.steamCookies || {};

			const storeSteamLoginSecure = store
				? store.find((cookie) => cookie.name === 'steamLoginSecure')
				: null;
			const storeSessionid = store
				? store.find((cookie) => cookie.name === 'sessionid')
				: null;
			const communitySteamLoginSecure = community
				? community.find((cookie) => cookie.name === 'steamLoginSecure')
				: null;
			const communitySessionid = community
				? community.find((cookie) => cookie.name === 'sessionid')
				: null;

			document.getElementById('storeSteamLoginSecure').value =
				storeSteamLoginSecure ? storeSteamLoginSecure.value : 'Not found';
			document.getElementById('storeSessionid').value = storeSessionid
				? storeSessionid.value
				: 'Not found';
			document.getElementById('communitySteamLoginSecure').value =
				communitySteamLoginSecure
					? communitySteamLoginSecure.value
					: 'Not found';
			document.getElementById('communitySessionid').value = communitySessionid
				? communitySessionid.value
				: 'Not found';
			document.getElementById('lastFetched').textContent =
				`Last fetched: ${lastFetched ? new Date(lastFetched).toLocaleString() : 'N/A'}`;

			console.log('Store cookies fetched:', {
				storeSteamLoginSecure,
				storeSessionid,
			});
			console.log('Community cookies fetched:', {
				communitySteamLoginSecure,
				communitySessionid,
			});
		}
	});
}

// Update cookies in UI in real-time
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'updateCookies') {
		const { store, community, lastFetched } = request.cookies;

		const storeSteamLoginSecure = store.find(
			(cookie) => cookie.name === 'steamLoginSecure',
		);
		const storeSessionid = store.find((cookie) => cookie.name === 'sessionid');
		const communitySteamLoginSecure = community.find(
			(cookie) => cookie.name === 'steamLoginSecure',
		);
		const communitySessionid = community.find(
			(cookie) => cookie.name === 'sessionid',
		);

		document.getElementById('storeSteamLoginSecure').value =
			storeSteamLoginSecure ? storeSteamLoginSecure.value : 'Not found';
		document.getElementById('storeSessionid').value = storeSessionid
			? storeSessionid.value
			: 'Not found';
		document.getElementById('communitySteamLoginSecure').value =
			communitySteamLoginSecure ? communitySteamLoginSecure.value : 'Not found';
		document.getElementById('communitySessionid').value = communitySessionid
			? communitySessionid.value
			: 'Not found';
		document.getElementById('lastFetched').textContent =
			`Last fetched: ${new Date(lastFetched).toLocaleString()}`;

		console.log('Cookies updated in real-time:', {
			storeSteamLoginSecure,
			storeSessionid,
			communitySteamLoginSecure,
			communitySessionid,
		});
		sendResponse({ status: 'updated' });
	}
});
