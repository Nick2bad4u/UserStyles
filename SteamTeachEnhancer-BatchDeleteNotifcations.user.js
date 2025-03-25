// ==UserScript==
// @name         SteamTrade Matcher Notification Deleter with Sequential Token Fetch
// @namespace    https://www.steamtradematcher.com/
// @version      2.5
// @description  Select notifications via UI, navigate to each page, fetch token, send POST, and continue sequentially
// @author       Nick
// @match        https://www.steamtradematcher.com/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	let selectedNotifications = [];
	let currentIndex = 0;

	// Create a UI panel
	const controlPanel = document.createElement('div');
	controlPanel.style.cssText = `
			position: fixed;
			top: 10px;
			right: 10px;
			background-color: #f4f4f4;
			border: 1px solid #ccc;
			padding: 10px;
			z-index: 10000;
	`;
	controlPanel.innerHTML = `
			<h4>Notification Deletion Tool</h4>
			<div>
					<button id="selectAllBtn">Select All</button>
					<button id="deselectAllBtn">Deselect All</button>
			</div>
			<button id="startProcessBtn" style="margin-top: 10px;">Start Deletion</button>
			<div id="status" style="margin-top: 10px; font-size: 12px;"></div>
	`;
	document.body.appendChild(controlPanel);

	// Add checkboxes to each notification
	const notifications = document.querySelectorAll('a[id^="notification_"]');
	notifications.forEach(notification => {
			const checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.style.marginRight = '5px';

			const parent = notification.parentNode;
			parent.insertBefore(checkbox, notification);
	});

	// Event listener for "Select All" button
	document.getElementById('selectAllBtn').addEventListener('click', () => {
			notifications.forEach(notification => {
					notification.previousSibling.checked = true; // Check all checkboxes
			});
	});

	// Event listener for "Deselect All" button
	document.getElementById('deselectAllBtn').addEventListener('click', () => {
			notifications.forEach(notification => {
					notification.previousSibling.checked = false; // Uncheck all checkboxes
			});
	});

	// Event listener for "Start Deletion" button
	document.getElementById('startProcessBtn').addEventListener('click', () => {
			selectedNotifications = Array.from(notifications).filter(notification =>
					notification.previousSibling.checked // Get selected notifications
			);

			if (selectedNotifications.length === 0) {
					alert('Please select notifications to delete.');
					return;
			}

			if (confirm(`Are you sure you want to delete ${selectedNotifications.length} notification(s)?`)) {
					document.getElementById('status').textContent = `Deleting ${selectedNotifications.length} notification(s)...`;
					navigateToNotification(selectedNotifications[currentIndex].href);
			}
	});

	// Navigate to the notification page
	function navigateToNotification(link) {
			console.log(`Navigating to ${link}`);
			window.location.href = link;
	}

	// Fetch token and delete the notification directly via POST
	function deleteNotificationDirectly() {
			const tokenElement = document.querySelector('input[name="_token"]'); // Fetch CSRF token
			const deleteForm = document.querySelector('form[action*="/notification/delete/"]');

			if (tokenElement && deleteForm) {
					const token = tokenElement.value; // Get token value
					const actionUrl = deleteForm.getAttribute('action'); // Get delete URL

					fetch(actionUrl, {
							method: 'POST',
							headers: {
									'Content-Type': 'application/x-www-form-urlencoded',
							},
							body: `_token=${encodeURIComponent(token)}`
					})
					.then(response => {
							if (response.ok) {
									console.log(`Notification deleted successfully!`);
							} else {
									console.error(`Failed to delete notification.`);
							}
					})
					.catch(error => {
							console.error('Error:', error);
					})
					.finally(() => {
							// Move to the next notification or finish
							currentIndex++;
							if (currentIndex < selectedNotifications.length) {
									setTimeout(() => {
											navigateToNotification(selectedNotifications[currentIndex].href);
									}, 1000); // Delay for navigation
							} else {
									alert('All selected notifications deleted.');
									console.log('Completed deleting all selected notifications.');
									window.location.href = '/notification'; // Return to notifications list
							}
					});
			} else {
					console.error('Token or delete form not found!');
					// Skip to the next notification if the form is missing
					currentIndex++;
					if (currentIndex < selectedNotifications.length) {
							setTimeout(() => {
									navigateToNotification(selectedNotifications[currentIndex].href);
							}, 1000); // Delay for navigation
					} else {
							alert('All selected notifications deleted.');
							console.log('Completed deleting all selected notifications.');
							window.location.href = '/notification'; // Return to notifications list
					}
			}
	}

	// Check if on a notification page and trigger deletion
	if (window.location.pathname.includes('/notification/show/')) {
			setTimeout(deleteNotificationDirectly, 1000); // Add a delay before calling deleteNotificationDirectly
	}
})();
