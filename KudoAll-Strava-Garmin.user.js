// ==UserScript==
// @name         Strava and Garmin Kudos All (Working)
// @namespace    typpi.online
// @version      2.1.0
// @description  Adds a button to give kudos to all visible activities on Strava and Garmin Connect.
// @author       Nick2bad4u
// @license      Unlicense
// @homepageURL  https://github.com/Nick2bad4u/UserStyles/
// @grant        none
// @run-at       document-end
// @include      https://www.strava.com/*
// @include      https://connect.garmin.com/modern/*
// @icon         https://i.gyazo.com/e2fabcfc9e9fd6d011e98215764c109c.png
// @tag          garmin
// @tag          strava
// @downloadURL  https://update.greasyfork.org/scripts/520059/Strava%20and%20Garmin%20Kudos%20All%20%28Working%29.user.js
// @updateURL    https://update.greasyfork.org/scripts/520059/Strava%20and%20Garmin%20Kudos%20All%20%28Working%29.meta.js
// ==/UserScript==

(function () {
	'use strict';

	// Function to get localized message
	function getMessage(messageName, substitutions) {
		const messages = {
			en: { kudo_all: 'Kudo All' },
			es: { kudo_all: 'Dar Kudos a Todos' },
			fr: { kudo_all: 'Féliciter Tout le Monde' },
			de: { kudo_all: 'Allen Kudos geben' },
			it: { kudo_all: 'Dai Kudos a Tutti' },
			pt: { kudo_all: 'Dar Kudos a Todos' },
			nl: { kudo_all: 'Geef Kudos aan Iedereen' },
			ru: { kudo_all: 'Похвалить всех' },
			zh: { kudo_all: '赞所有' },
			ja: { kudo_all: '全員にKudos' },
			ko: { kudo_all: '모두에게 칭찬하기' },
			ar: { kudo_all: 'إعطاء Kudos للجميع' },
			hi: { kudo_all: 'सभी को कुडोस दें' },
			bn: { kudo_all: 'সবাইকে কুডোস দিন' },
			te: { kudo_all: 'అన్నికి కుడోస్ ఇవ్వండి' },
			ta: { kudo_all: 'அனைத்துக்கும் குடோஸ் கொடுக்கவும்' },
			ml: { kudo_all: 'എല്ലാവര്‍ക്കും ക,ഡോസ് നല്‍കുക' },
			th: { kudo_all: 'ให้คุดดอกทุกคน' },
			vi: { kudo_all: 'Kudo Tất cả' },
			tr: { kudo_all: 'Herkese Kudos Ver' },
			pl: { kudo_all: 'Pochwal wszystkich' },
			cs: { kudo_all: 'Pošli Kudos všem' },
			sk: { kudo_all: 'Pošli Kudos všetkým' },
			hu: { kudo_all: 'Kudos Mindenkinek' },
			ro: { kudo_all: 'Felicită pe Toată Lumea' },
			hr: { kudo_all: 'Pošalji Kudos svima' },
			sr: { kudo_all: 'Пошаљи Кудос свима' },
			sl: { kudo_all: 'Pošlji Kudos vsem' },
			et: { kudo_all: 'Saada Kudos kõigile' },
			lv: { kudo_all: 'Sūtīt Kudos visiem' },
			lt: { kudo_all: 'Siųsti Kudos visiems' },
			bg: { kudo_all: 'Изпрати Кудос на всички' },
			el: { kudo_all: 'Στείλτε Kudos σε όλους' },
			uk: { kudo_all: 'Похвалити всіх' },
			be: { kudo_all: 'Пахваліць усіх' },
			hy: { kudo_all: 'Բոլորին տալ Kudos' },
			ka: { kudo_all: 'ყოფნა Kudos ყველი' },
			az: { kudo_all: 'Bütün Kudos göndər' },
		};

		const userLanguage = (navigator.language || navigator.userLanguage || 'en').split('-')[0]; // Get the user's language
		const messageSet = messages[userLanguage] || messages['en']; // Default to English if language not supported

		return messageSet[messageName] || (typeof substitutions === 'string' ? substitutions : '') || messageName;
	}

	const Strava = {
		getStravaContainer, // Retrieves the Strava container element
		findStravaKudosButtons, // Finds Strava kudos buttons within a specified container or the entire document
		createStravaFilter, // Creates a filter function for Strava activities based on an athlete's link
		getStravaKudosButtons, // Retrieves Strava kudos buttons based on athlete link and activity filtering
		createStravaButton, // Creates a Strava button element with a specified label
		stravaKudoAllHandler, // Handles the event to click all Strava kudos buttons on the page
		stravaStandBy, // Initiates the Strava standby mode
	};

	/**
	 * Retrieves the Strava container element.
	 *
	 * @returns {HTMLElement | null} The Strava container element, or null if not found.
	 */
	function getStravaContainer() {
		const container = document.querySelector('[class="user-nav nav-group"]');
		console.log('Strava: Found container:', container);
		return container;
	}

	/**
	 * Finds Strava kudos buttons within a specified container or the entire document.
	 * These buttons are identified by their data-testid attributes for 'kudos_button' and 'unfilled_kudos'.
	 *
	 * @param {HTMLElement} [container] - The HTML element to search within. If not provided, the entire document is searched.
	 * @returns {HTMLElement[]} An array of HTML elements representing the Strava kudos buttons found.
	 */
	function findStravaKudosButtons(container) {
		// Find Strava kudos buttons
		const kudosButtonSelector = "button[data-testid='kudos_button']"; // Define the selector for the kudos button
		const unfilledKudosSelector = "svg[data-testid='unfilled_kudos']"; // Define the selector for the unfilled kudos icon
		const selector = `${kudosButtonSelector} > ${unfilledKudosSelector}`; // Combine the selectors
		const buttons = container ? Array.from(container.querySelectorAll(selector)) : document.querySelectorAll(selector); // Find the kudos buttons
		console.log('Strava: Found kudos buttons:', buttons); // Log the found kudos buttons
		return buttons; // Return the found kudos buttons
	}

	/**
	 * Creates a filter function for Strava activities based on an athlete's link.
	 * The filter function checks if an activity item contains a link to the specified athlete.
	 * It utilizes caching to improve performance by storing the filter function and athlete link.
	 *
	 * @param {HTMLAnchorElement} athleteLink - The anchor element representing the athlete's link.
	 * @returns {function(HTMLElement): boolean} A filter function that returns true if the activity item does NOT contain a link to the specified athlete, false otherwise.
	 */
	let cachedAthleteLink = null; // Cache the athlete link
	let cachedFilterFunction = null; // Cache the filter function

	function createStravaFilter(athleteLink) {
		// Create a filter function for Strava activities
		const url = new URL(athleteLink.href); // Get the athlete link URL
		const href = url.pathname; // Get the pathname from the URL
		if (cachedAthleteLink === href) {
			// Check if the filter is already cached
			console.log('Strava: Using cached filter for athlete link:', href); // Log the cached filter
			return cachedFilterFunction; // Return the cached filter function
		}
		console.log('Strava: Filter created for athlete link:', href); // Log the new filter
		cachedAthleteLink = href; // Cache the athlete link
		cachedFilterFunction = (item) => !item.querySelector(`a[href^="${href}"]`); // Create the filter function
		return cachedFilterFunction; // Return the filter function
	}

	/**
	 * Finds the athlete link on the page. It first attempts to find the link in the athlete profile section.
	 * If not found, it falls back to searching for any link that starts with '/athletes'.
	 * As a last resort, it searches for any link that contains '/athletes'.
	 *
	 * @returns {HTMLAnchorElement | null} The athlete link element if found, otherwise null.
	 */
	function findAthleteLink() {
		// Find the athlete link
		// Attempt to find the athlete link in the profile or fallback locations
		let athleteLink = document.querySelector("#athlete-profile a[href^='/athletes']"); // Find the athlete link in the profile
		if (!athleteLink) {
			// If the athlete link is not found
			athleteLink = document.querySelector("a[href^='/athletes']"); // Find the athlete link in the feed
			console.log('Strava: Fallback athlete link:', athleteLink); // Log the fallback athlete link
			if (!athleteLink) {
				// If the fallback athlete link is not found
				athleteLink = document.querySelector("a[href*='/athletes']"); // Find the second fallback athlete link
				console.log('Strava: Second fallback athlete link:', athleteLink); // Log the second fallback athlete link
			}
		}
		console.log('Strava: Athlete link:', athleteLink); // Log the athlete link
		return athleteLink; // Return the athlete link
	}

	/**
	 * Finds Strava activities based on the presence of athlete links within feed entries.
	 *
	 * @returns {NodeListOf<HTMLAnchorElement>} A NodeList of anchor elements representing activities.
	 */
	function findActivities() {
		// Find activities based on the athlete link
		let activities = document.querySelectorAll("div[data-testid='web-feed-entry'] > div > div > div > a[href^='/athletes']"); // Find activities based on the athlete link
		console.log('Strava: Found activities:', activities); // Log the found activities
		return activities; // Return the found activities
	}

	/**
	 * Filters an array of activities based on a given athlete link.
	 *
	 * @param {string} athleteLink - The athlete link to filter activities by.
	 * @param {HTMLElement[]} activities - An array of activity elements to filter.
	 * @returns {HTMLElement[]} - A new array containing only the activities that match the athlete link.
	 */
	function filterActivities(athleteLink, activities) {
		// Filter activities based on athlete link
		activities = Array.from(activities).filter(createStravaFilter(athleteLink)); // Filter activities based on the athlete link
		console.log('Strava: Filtered activities:', activities); // Log the filtered activities
		return activities; // Return the filtered activities
	}

	/**
	 * Collects kudos buttons from a list of activities.
	 * It flattens the array of activities and finds Strava kudos buttons in each activity.
	 *
	 * @param {HTMLElement[]} activities - An array of HTML elements representing activities.
	 * @returns {HTMLButtonElement[]} - An array of HTML button elements representing the kudos buttons found in the activities.
	 */
	function collectKudosButtons(activities) {
		// Collect kudos buttons from the filtered activities
		const buttons = activities.flatMap((activity) => findStravaKudosButtons(activity)); // Collect kudos buttons from the filtered activities
		console.log('Strava: Final kudos buttons:', buttons); // Log the final kudos buttons
		return buttons; // Return the final kudos buttons
	}

	/**
	 * Retrieves Strava kudos buttons based on athlete link and activity filtering.
	 * It attempts to find kudos buttons associated with activities of a specific athlete.
	 * If athlete link or activities are not found, or if no activities remain after filtering,
	 * it falls back to the default method of finding Strava kudos buttons.
	 *
	 * @returns {NodeListOf<HTMLButtonElement> | undefined} A collection of kudos buttons,
	 * or undefined if no buttons are found.
	 */
	function getStravaKudosButtons() {
		const athleteLink = findAthleteLink(); // Find the athlete link

		// If athlete link is still not found, use the default kudos button finding method
		if (!athleteLink) {
			return findStravaKudosButtons(document); // Use the default kudos button finding method
		}

		const activities = findActivities(); // Find activities based on the athlete link

		// If no activities found, use the default kudos button finding method
		if (activities.length < 1) {
			return findStravaKudosButtons(); // Use the default kudos button finding method
		}

		const filteredActivities = filterActivities(athleteLink, activities); // Filter activities based on the athlete link

		// If no activities left after filtering, use the default kudos button finding method
		if (filteredActivities.length < 1) {
			return findStravaKudosButtons(); // Use the default kudos button finding method
		}

		return collectKudosButtons(filteredActivities); // Collect kudos buttons from the filtered activities
	}

	/**
	 * Creates a Strava button element with a specified label.
	 *
	 * @returns {HTMLLIElement} The created Strava button as an `li` element.
	 */
	function createStravaButton() {
		const label = getMessage('kudo_all', 'Kudo All'); // Get the localized message for the button label
		console.log('Strava: Creating button with label:', label); // Log the button label

		const navItemLi = document.createElement('li'); // Create the button element
		const navItemA = document.createElement('a'); // Create the button link element

		navItemLi.className = 'nav-item'; // Set the button class
		navItemLi.style.marginRight = '10px'; // Set the button margin

		navItemA.href = '#'; // Set the button link href
		navItemA.className = 'btn btn-default btn-sm empty'; // Set the button link class

		const navItemIcon = document.createElement('span'); // Create the button icon element
		navItemIcon.className = 'app-icon icon-kudo'; // Set the button icon class
		navItemIcon.style.marginRight = '5px'; // Set the button icon margin

		const navItemText = document.createElement('span'); // Create the button text element
		navItemText.className = 'ka-progress text-caption1'; // Set the button text class
		navItemText.textContent = label;

		navItemA.append(navItemIcon); // Append the icon to the button link
		navItemA.append(navItemText); // Append the text to the button link
		navItemLi.append(navItemA); // Append the link to the button

		return navItemLi; // Return the button element
	}

	/**
	 * Handles the event to click all Strava kudos buttons on the page.
	 *
	 * @param {Event} event - The event that triggered the handler (e.g., a button click).
	 * @returns {void}
	 */
	function stravaKudoAllHandler(event) {
		// Handle the event to click all kudos buttons
		event.preventDefault(); // Prevent the default event behavior

		const icons = getStravaKudosButtons(); // Get the Strava kudos buttons
		console.log('Strava: Clicking all kudos buttons, count:', icons.length); // Log the number of kudos buttons

		icons.forEach((item) => {
			// Click all kudos buttons
			const parentItem = item?.parentElement; // Get the parent element of the kudos button
			if (parentItem) {
				// If the parent element exists
				parentItem.click(); // Click the parent element
			}
		});
	}

	/**
	 * Initiates the Strava standby mode, which checks for the existence of a Kudo All button.
	 * If the button does not exist, it creates and prepends the button to the Strava container.
	 * The button is then attached with a click event listener to the stravaKudoAllHandler function.
	 */
	function stravaStandBy() {
		// Initiate the Strava standby mode
		console.log('Strava: Standby initiated'); // Log the initiation of the standby mode
		const buttonExisted = document.querySelector('div[class="ka-progress text-caption1"]'); // Check if the button already exists
		if (!buttonExisted) {
			// If the button does not exist
			console.log('Strava: Button does not exist, creating'); // Log the creation of the button

			const container = getStravaContainer(); // Get the Strava container

			if (container) {
				// If the container exists
				const button = createStravaButton(); // Create the button
				container.prepend(button); // Prepend the button to the container
				button.addEventListener('click', stravaKudoAllHandler); // Add a click event listener to the button
			}
		}
	}

	/**
	 * @namespace GC
	 * @description Namespace containing functions related to Garmin Connect integration.
	 * @property {function} getGarminContainer - Retrieves the Garmin container element.
	 * @property {function} findGarminKudosButtons - Finds Garmin kudos buttons within a specified container or the entire document.
	 * @property {function} createGarminButton - Creates a new kudos button for Garmin.
	 * @property {function} garminKudoAllHandler - Handles the "kudo all" action on Garmin.
	 * @property {function} executeGarmin - Executes the Garmin integration logic.
	 * @property {function} garminConnectStandBy - Sets up a standby observer for Garmin Connect.
	 */
	const GC = {
		getGarminContainer, // Retrieves the Garmin container element
		findGarminKudosButtons, // Finds Garmin kudos buttons within a specified container or the entire document
		createGarminButton, // Creates a new kudos button for Garmin
		garminKudoAllHandler, // Handles the "kudo all" action on Garmin
		executeGarmin, // Executes the Garmin integration logic
		garminConnectStandBy, // Sets up a standby observer for Garmin Connect
	};

	/**
	 * Retrieves the Garmin container element where the Kudo All button will be prepended.
	 * It searches for a div with the class "header-nav", creates a new div element with specific classes and styles,
	 * prepends it to the found container, and returns the newly created div element.
	 *
	 * @returns {HTMLElement|null} The newly created Kudo All navigation item element, or null if the container is not found.
	 */
	function getGarminContainer() {
		// Get the Garmin container
		const container = document.querySelector('div[class="header-nav"]'); // Find the Garmin container
		console.log('Garmin: Found container:', container); // Log the found container

		if (container) {
			const el = document.createElement('div'); // Create the new div element
			el.classList.add('kudo-all-nav-item', 'header-nav-item'); // Add classes to the new div element
			el.style.height = '60px'; // Set the height of the new div element
			el.style.width = '50px'; // Set the width of the new div element
			container.prepend(el); // Prepend the new div element to the container
			return document.querySelector('div[class^=kudo-all-nav-item]'); // Return the new div element
		}
		return null; // Return null if the container is not found
	}

	/**
	 * Finds Garmin kudos buttons within a specified container or the entire document.
	 *
	 * @param {HTMLElement} [container] - The container element to search within. If not provided, the entire document is searched.
	 * @returns {HTMLElement[]} An array of HTMLElement objects representing the Garmin kudos buttons found.
	 */
	function findGarminKudosButtons(container) {
		// Find Garmin kudos buttons
		const selector = `
		button[class^="CommentLikeSection_socialIconWrapper"] >
		div[class*="CommentLikeSection_animateBox"] >
		i[class*=icon-heart-inverted]
	`; // Define the selector for the kudos buttons
		const buttons = container ? Array.from(container.querySelectorAll(selector)) : Array.from(document.querySelectorAll(selector)); // Find the kudos buttons
		console.log('Garmin: Found kudos buttons:', buttons); // Log the found kudos buttons
		return buttons; // Return the found kudos buttons
	}

	/**
	 * Creates a Garmin-style button element.
	 *
	 * @returns {HTMLAnchorElement} The created Garmin-style button element.
	 */
	function createGarminButton() {
		// Create a Garmin-style button
		const label = getMessage('kudo_all', 'Kudo All'); // Get the localized message for the button label
		console.log('Garmin: Creating button with label:', label); // Log the button label

		const link = document.createElement('a'); // Create the button element
		link.href = '#'; // Set the button link href
		link.className = 'header-nav-link icon-heart-inverted'; // Set the button link class
		link.setAttribute('aria-label', label); // Set the button link aria-label
		link.setAttribute('data-original-title', label); // Set the button link data-original-title
		link.setAttribute('data-rel', 'tooltip'); // Set the button link data-rel
		return link;
	}

	/**
	 * Handles the event to give all kudos on the Garmin newsfeed page.
	 * Prevents default event behavior, checks if the current page is the newsfeed,
	 * finds all kudos buttons, and clicks them.
	 *
	 * @param {Event} event - The event that triggered the handler.
	 * @returns {void}
	 */
	function garminKudoAllHandler(event) {
		// Handle the event to give all kudos
		event.preventDefault(); // Prevent the default event behavior
		if (window.location.pathname !== '/modern/newsfeed') {
			// Check if the current page is the newsfeed
			console.log('Garmin: Not on the newsfeed page, redirecting'); // Log the redirect message
			window.location.href = 'https://connect.garmin.com/modern/newsfeed'; // Redirect to the newsfeed page
			return; // Abort the function
		}

		const icons = findGarminKudosButtons(); // Find all kudos buttons
		console.log('Garmin: Clicking all kudos buttons, count:', icons.length); // Log the number of kudos buttons

		let likedCount = 0; // Counter for the number of items liked

		icons.forEach((item) => {
			// Click all kudos buttons
			if (item) {
				item.click(); // Click the kudos button
				likedCount++; // Increment the counter
			}
		});

		// Show a popup with the number of items liked
		showPopup(`You liked ${likedCount} activities!`);
	}

	/**
	 * Executes the Garmin functionality by injecting a "Kudo All" button into the Garmin page.
	 * It first retrieves the container element where the button will be appended.
	 * If the container is found, it creates the button, appends it to the container,
	 * and attaches a click event listener to the button that triggers the garminKudoAllHandler function.
	 */
	function executeGarmin() {
		// Execute the Garmin functionality
		console.log('Garmin: Execute function called'); // Log the execution of the function
		const container = getGarminContainer(); // Get the Garmin container

		if (container) {
			// If the container exists
			const button = createGarminButton(); // Create the button
			container.append(button); // Append the button to the container
			button.addEventListener('click', garminKudoAllHandler); // Add a click event listener to the button
		}
	}

	/**
	 * @function garminConnectStandBy
	 * @description Initiates a standby mode for Garmin Connect, observing the DOM for the appearance of a specific element (`header-nav`) to trigger the execution of `executeGarmin`.
	 * @listens MutationObserver
	 * @returns {void}
	 */
	function garminConnectStandBy() {
		// Initiate the Garmin standby mode
		console.log('Garmin: Standby initiated'); // Log the initiation of the standby mode

		let loaded = false; // Set the loaded flag to false

		var observer = new MutationObserver(function (mutations) {
			// Create a new mutation observer
			mutations.forEach(function (mutation) {
				// For each mutation
				if (mutation.addedNodes.length > 0) {
					// If nodes are added
					mutation.addedNodes.forEach((node) => {
						if (
							// If the target element is loaded
							!loaded && // Ensure it's not already loaded
							node.nodeType === 1 && // Ensure it's an element
							node.className && // Ensure it has a class name
							typeof node.className === 'string' && // Ensure the class name is a string
							node.className.startsWith('header-nav') // Ensure the class name starts with 'header-nav'
						) {
							console.log('Garmin: Target element loaded, executing...'); // Log the execution of the function
							loaded = true; // Set the loaded flag to true
							executeGarmin(); // Execute the Garmin functionality
							observer.disconnect(); // Disconnect the observer
						}
					});
				}
			});
		});

		if (!loaded) {
			observer.observe(document.body, {
				// Observe the body for mutations
				childList: true, // Observe child nodes
				subtree: true, // Observe all descendants
			});
		}
	}

	// Check if the current host is Strava
	/**
	 * Checks if the current hostname matches a Strava domain pattern.
	 *
	 * @returns {boolean} True if the hostname is a Strava domain, false otherwise.
	 */
	function isHostStrava() {
		// Check if the current host is Strava
		const currentHostname = window.location.hostname; // Get the current hostname
		const stravaDomainPattern = /^.*\.strava\.com$/; // Define the Strava domain pattern
		const isStrava = stravaDomainPattern.test(currentHostname); // Check if the current hostname matches the Strava domain pattern
		console.log('Host check: Is Strava?', isStrava); // Log the result of the check
		return isStrava; // Return the result of the check
	}

	// Check if the current host is Garmin
	/**
	 * Checks if the current hostname matches a Garmin domain pattern.
	 *
	 * @returns {boolean} True if the hostname is a Garmin domain, false otherwise.
	 */
	function isHostGarmin() {
		// Check if the current host is Garmin Connect
		const currentHostname = window.location.hostname; // Get the current hostname
		const garminDomainPattern = /^.*\.garmin\.com$/; // Define the Garmin domain pattern
		const isGarmin = garminDomainPattern.test(currentHostname); // Check if the current hostname matches the Garmin domain pattern 	444444444444444442
		console.log('Host check: Is Garmin?', isGarmin); // Log the result of the check
		return isGarmin; // Return the result of the check
	}

	// Initialize script on window load
	window.onload = function () {
		console.log('Kudo All script initialization started.');
		/**
		 * Checks if the current host is Strava.
		 *
		 * @returns {boolean} True if the current host is Strava, false otherwise.
		 */
		const isStravaHost = isHostStrava(); // Check if the current host is Strava
		const isGarminHost = isHostGarmin(); // Check if the current host is Garmin Connect

		if (isStravaHost) {
			// If the current host is Strava
			console.log('Detected Strava domain. Initiating Strava standby...'); // Log the initiation of the Strava standby mode
			Strava.stravaStandBy(); // Initiate the Strava standby mode
		} else if (isGarminHost) {
			// If the current host is Garmin Connect
			console.log('Detected Garmin domain. Initiating Garmin standby...'); // Log the initiation of the Garmin standby mode
			GC.garminConnectStandBy(); // Initiate the Garmin standby mode
		} else {
			// If the current host is not recognized as Strava or Garmin
			console.log('Domain not recognized as Strava or Garmin. No actions will be performed.'); // Log the unrecognized domain
		}
	};

	function showPopup(message) {
		const popup = document.createElement('div');
		popup.textContent = message;
		popup.style = `
			position: fixed;
			top: 20px;
			right: 20px;
			background-color: #2ea44f;
			color: white;
			padding: 10px 20px;
			border-radius: 5px;
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
			z-index: 1000;
			font-size: 16px;
		`;
		document.body.appendChild(popup);

		// Automatically remove the popup after 3 seconds
		setTimeout(() => {
			popup.remove();
		}, 3000);
	}
})();
