/* eslint-disable no-undef */

// Function to fetch and display cookies
function fetchAndDisplayCookies(cookieName) {
	chrome.cookies.get(
		{
			url: 'https://store.steampowered.com',
			name: cookieName,
		},
		function (cookie) {
			if (chrome.runtime.lastError) {
				console.error(
					`Error fetching ${cookieName}:`,
					chrome.runtime.lastError,
				);
			} else {
				document.getElementById(cookieName).value = cookie
					? cookie.value
					: 'Not found';
				console.log(
					`${cookieName} cookie fetched:`,
					cookie ? cookie.value : 'Not found',
				);
			}
		},
	);
}

// Function to load preferences from Chrome storage
function loadPreferences() {
	const disableSteamCommunityCheckbox = document.getElementById(
		'disableSteamCommunity',
	);
	const disableStoreCheckbox = document.getElementById('disableStore');
	const disableFetchCheckbox = document.getElementById('disableFetch');
	const fetchIntervalInput = document.getElementById('fetchInterval');
	//	const saveIndicator = document.getElementById('saveIndicator');

	chrome.storage.sync.get(
		['disableSteamCommunity', 'disableStore', 'disableFetch', 'fetchInterval'],
		(result) => {
			if (chrome.runtime.lastError) {
				console.error('Error loading preferences:', chrome.runtime.lastError);
			} else {
				disableSteamCommunityCheckbox.checked =
					result.disableSteamCommunity || false;
				disableStoreCheckbox.checked = result.disableStore || false;
				disableFetchCheckbox.checked = result.disableFetch || false;
				fetchIntervalInput.value = result.fetchInterval || 6;
				console.log('Preferences loaded:', result);
			}
		},
	);
}

// Function to show save indicator
function showSaveIndicator() {
	const saveIndicator = document.getElementById('saveIndicator');
	saveIndicator.style.display = 'block';
	setTimeout(() => {
		saveIndicator.style.display = 'none';
	}, 2000);
}

// Function to save a preference to Chrome storage
function savePreference(key, value) {
	chrome.storage.sync.set({ [key]: value }, () => {
		if (chrome.runtime.lastError) {
			console.error(`Error saving ${key}:`, chrome.runtime.lastError);
		} else {
			console.log(`Saved ${key}:`, value);
			showSaveIndicator();
		}
	});
}

// Function to add event listener to save preference
function addSaveListener(element, key) {
	element.addEventListener('change', () => {
		const value = element.type === 'checkbox' ? element.checked : element.value;
		savePreference(key, value);
	});
}

// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function () {
	console.log('Document loaded');

	// Fetch and display cookies
	['steamLoginSecure', 'sessionid'].forEach(fetchAndDisplayCookies);

	// Load saved preferences
	loadPreferences();

	// Add event listeners to save preferences
	addSaveListener(
		document.getElementById('disableSteamCommunity'),
		'disableSteamCommunity',
	);
	addSaveListener(document.getElementById('disableStore'), 'disableStore');
	addSaveListener(document.getElementById('disableFetch'), 'disableFetch');
	addSaveListener(document.getElementById('fetchInterval'), 'fetchInterval');

	// Save preferences when fetch interval input is changed
	document
		.getElementById('fetchInterval')
		.addEventListener('input', (event) => {
			const value = event.target.value;
			savePreference('fetchInterval', value);
		});
});
