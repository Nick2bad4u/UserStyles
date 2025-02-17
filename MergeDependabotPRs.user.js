// ==UserScript==
// @name         Auto-Merge Dependabot PRs
// @namespace    typpi.online
// @version      4.4
// @description  Merges Dependabot PRs in any of your repositories - pulls the PRs into a table and lets you select which ones to merge.
// @author       Nick2bad4u
// @match        https://github.com/notifications
// @match        https://github.com/*/*/pull/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @connect      api.github.com
// @license      UnLicense
// @tag          github
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues
// ==/UserScript==
/* global GM_getValue, GM_setValue, GM_xmlhttpRequest */
// @var          number merge_delay "Delay between merge requests in milliseconds" 2000

(async function () {
	'use strict';

	// Delay between each merge request in milliseconds, default is 2000ms
	let delay = GM_getValue('merge_delay', 2000);
	if (isNaN(delay) || Number(delay) <= 0) {
		delay = 2000; // default value if invalid
	} else {
		delay = Number(delay);
	}

	async function initialize() {
		let token;
		try {
			// Attempt to retrieve and decrypt the GitHub token
			token = await retrieveAndDecryptToken();
		} catch (error) {
			console.error('Failed to retrieve and decrypt token:', error);
			alert('Failed to retrieve and decrypt token. Please check the console for more details.');
			return;
		}

		// Prompt the user for the token if it was not successfully retrieved
		if (!token) {
			while (!token) {
				token = prompt('Please enter your GitHub token:');
				if (!token) {
					alert('GitHub token is required.');
				}
			}
			// Encrypt and store the token if it was provided
			if (token) {
				try {
					await encryptAndStoreToken(token);
				} catch (error) {
					console.error('Failed to encrypt and store token:', error);
					alert('Failed to encrypt and store token. Please check the console for more details.');
					return;
				}
			} else {
				alert('GitHub token is required.');
				return;
			}
		}

		// Retrieve the GitHub username from storage or prompt the user for it
		let username = GM_getValue('github_username') || '';
		while (!username || username.trim() === '') {
			username = prompt('Please enter your GitHub username:');
			if (username && username.trim() !== '') {
				GM_setValue('github_username', username);
			} else {
				alert('GitHub username is required.');
			}
		}
	}

	await initialize();

	async function encryptAndStoreToken(token) {
		try {
			// Create a new TextEncoder instance to encode the token
			const textEncoder = new TextEncoder();
			const encodedToken = textEncoder.encode(token);

			let key;
			// Retrieve the stored encryption key from storage
			const storedKey = GM_getValue('encryption_key', null);
			if (storedKey) {
				// If a key is already stored, import it for use
				key = await crypto.subtle.importKey(
					'jwk',
					JSON.parse(storedKey),
					{
						name: 'AES-GCM',
					},
					true,
					['encrypt', 'decrypt'],
				);
			} else {
				// If no key is stored, generate a new one
				key = await crypto.subtle.generateKey(
					{
						name: 'AES-GCM',
						length: 256,
					},
					true,
					['encrypt', 'decrypt'],
				);
				// Store the newly generated key
				GM_setValue('encryption_key', JSON.stringify(await crypto.subtle.exportKey('jwk', key)));
			}

			// Create a random initialization vector (iv)
			const iv = crypto.getRandomValues(new Uint8Array(12));
			// Encrypt the token using the imported or generated key and the iv
			const encryptedToken = await crypto.subtle.encrypt(
				{
					name: 'AES-GCM',
					iv: iv,
				},
				key,
				encodedToken,
			);

			// Store the encrypted token and iv in storage
			GM_setValue(
				'github_token',
				JSON.stringify({
					iv: Array.from(iv),
					token: Array.from(new Uint8Array(encryptedToken)),
				}),
			);
		} catch (error) {
			console.error('Failed to encrypt and store token:', error);
		}
	}

	async function retrieveAndDecryptToken() {
		try {
			// Retrieve the stored encrypted token and encryption key from storage
			const storedData = GM_getValue('github_token', null);
			if (!storedData) return '';

			// Parse the stored data to extract the initialization vector (iv) and the token
			const { iv, token } = JSON.parse(storedData);
			const key = GM_getValue('encryption_key', null);

			if (!key) {
				throw new Error('Encryption key is missing.');
			}

			// Import the encryption key for decryption
			const importedKey = await crypto.subtle.importKey(
				'jwk',
				JSON.parse(key),
				{
					name: 'AES-GCM',
				},
				true,
				['decrypt'],
			);

			// Decrypt the token using the imported key and initialization vector
			const decryptedToken = await crypto.subtle.decrypt(
				{
					name: 'AES-GCM',
					iv: new Uint8Array(iv),
				},
				importedKey,
				new Uint8Array(token),
			);

			// Decode the decrypted token into a string and return it
			const textDecoder = new TextDecoder();
			return textDecoder.decode(decryptedToken);
		} catch (error) {
			console.error('Failed to retrieve and decrypt token:', error);
			return '';
		}
	}

	async function fetchAllRepositories(username, token) {
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: 'GET',
				url: `https://api.github.com/users/${username}/repos?per_page=100`,
				headers: {
					Authorization: `token ${token}`,
				},
				onload: function (response) {
					if (response.status === 200) {
						const repos = JSON.parse(response.responseText);
						resolve(repos);
					} else {
						reject(new Error(`Failed to fetch repositories: ${response.responseText}`));
					}
				},
				onerror: function (error) {
					reject(error);
				},
			});
		});
	}

	async function fetchDependabotPRs(username, repo, token) {
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: 'GET',
				url: `https://api.github.com/repos/${username}/${repo}/pulls?per_page=100&state=open&user=dependabot[bot]`,
				headers: {
					Authorization: `token ${token}`,
				},
				onload: function (response) {
					if (response.status === 200) {
						const pulls = JSON.parse(response.responseText);
						resolve(pulls);
					} else {
						reject(new Error(`Failed to fetch pull requests: ${response.responseText}`));
					}
				},
				onerror: function (error) {
					reject(error);
				},
			});
		});
	}

	async function mergeDependabotPRs(prs, username, repo, token) {
		const statusContainer = document.getElementById('merge-status');
		let index = 0;

		async function processNextPR() {
			if (index < prs.length) {
				const pr = prs[index];
				try {
					await mergePR(pr, username, repo, token);
					const messageElement = document.createElement('div');
					messageElement.innerHTML = `PR #${pr.number} merged successfully!<br>`;
					messageElement.id = `merge-status-${pr.number}`;
					statusContainer.appendChild(messageElement);
					setTimeout(() => messageElement.remove(), 7000);
				} catch (error) {
					const messageElement = document.createElement('div');
					messageElement.innerHTML = `Failed to merge PR #${pr.number}: ${error.message}<br>`;
					messageElement.id = `merge-status-${pr.number}`;
					statusContainer.appendChild(messageElement);
					setTimeout(() => messageElement.remove(), 7000);
				}
				index++;
				setTimeout(processNextPR, delay);
			} else {
				// Remove status container after processing all PRs
				setTimeout(() => statusContainer.remove(), 10000);
			}
		}

		processNextPR();
	}

	function mergePR(pr, username, repo, token) {
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: 'PUT',
				url: `https://api.github.com/repos/${username}/${repo}/pulls/${pr.number}/merge`,
				headers: {
					Authorization: `token ${token}`,
					'Content-Type': 'application/json',
				},
				data: JSON.stringify({
					commit_title: `Merge PR #${pr.number}`,
					merge_method: 'merge',
				}),
				onload: function (response) {
					if (response.status === 200) {
						resolve();
					} else {
						reject(new Error(response.responseText));
					}
				},
				onerror: function (error) {
					reject(error);
				},
			});
		});
	}

	function addButton() {
		const mergeButton = document.createElement('mergebutton');
		mergeButton.textContent = 'Merge Dependabot PRs';
		mergeButton.classList.add('merge-button');
		mergeButton.addEventListener('click', async () => {
			try {
				let token = await retrieveAndDecryptToken();
				if (!token) {
					alert('Invalid or missing GitHub token. Please check your settings.');
					return;
				}
				const username = GM_getValue('github_username');
				const statusElement = getStatusElement();
				updateStatusElement(statusElement, 'Fetching repositories...');
				const repos = await fetchAllRepositories(username, token);

				let allPRs = [];
				for (const repo of repos) {
					if (repo.archived) {
						updateStatusElement(statusElement, `Skipping archived repo: ${repo.name}`);
						continue;
					}
					updateStatusElement(statusElement, `Fetching PRs for repo: ${repo.name}`);
					const prs = await fetchDependabotPRs(username, repo.name, token);
					allPRs = allPRs.concat(prs.map((pr) => ({ ...pr, repo: repo.name })));
				}
				if (allPRs.length > 0) {
					updateStatusElement(statusElement, 'Displaying PR selection...');
					displayPRSelection(allPRs, username, token);
				} else {
					updateStatusElement(statusElement, 'No Dependabot PRs found to merge.');
					displayNoPRsMessage();
				}
				setTimeout(() => {
					statusElement.innerHTML = '';
					statusElement.remove();
				}, 10000);
			} catch (error) {
				console.error('Error during merge operation:', error);
			}
		});
		document.body.appendChild(mergeButton);
	}

	function getStatusElement() {
		let statusElement = document.getElementById('merge-status');
		if (!statusElement) {
			statusElement = document.createElement('div');
			statusElement.id = 'merge-status';
			statusElement.classList.add('merge-status');
			document.body.appendChild(statusElement);
		}
		return statusElement;
	}

	function updateStatusElement(element, message) {
		element.innerHTML = message;
	}

	function displayPRSelection(prs, username, token) {
		const container = document.createElement('div');
		style.textContent += `
			.pr-selection-container {
				position: fixed;
				bottom: 50px;
				right: 10px;
				z-index: 1000;
				background-color: #79e4f2;
				color: #000000;
				padding: 10px;
				border: 1px solid #ccc;
				max-height: 300px;
				overflow-y: auto;
			}
		`;
		container.classList.add('pr-selection-container');

		const prList = document.createElement('div');
		prs.forEach((pr) => {
			const prItem = document.createElement('div');
			const checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.value = pr.number;

			const label = document.createElement('label');
			label.textContent = `Repo: ${pr.repo} - PR #${pr.number}: ${pr.title}`;
			label.style = 'margin-left: 5px;';

			prItem.appendChild(checkbox);
			prItem.appendChild(label);
			prList.appendChild(prItem);
		});

		const mergeSelectedButton = document.createElement('button');
		mergeSelectedButton.textContent = 'Merge Selected PRs';
		mergeSelectedButton.addEventListener('click', async () => {
			const selectedPRs = Array.from(prList.querySelectorAll('input:checked')).map((input) => prs.find((pr) => pr.number == input.value));
			if (selectedPRs.length > 0) {
				container.innerHTML = '<div id="merge-status">Merging PRs...<br></div>';
				const groupedPRs = selectedPRs.reduce((acc, pr) => {
					if (!acc[pr.repo]) {
						acc[pr.repo] = [];
					}
					acc[pr.repo].push(pr);
					return acc;
				}, {});
				for (const [repo, prs] of Object.entries(groupedPRs)) {
					await mergeDependabotPRs(prs, username, repo, token);
				}
			} else {
				container.innerHTML = 'No PRs selected for merging.';
			}
		});

		container.appendChild(prList);
		container.appendChild(mergeSelectedButton);
		document.body.appendChild(container);
	}

	function displayNoPRsMessage() {
		const container = document.createElement('div');
		container.classList.add('pr-container');
		container.textContent = 'No Dependabot PRs found to merge.';
		document.body.appendChild(container);

		// Automatically hide the message after 5 seconds (5000 milliseconds)
		setTimeout(() => {
			container.remove();
			// Also remove the merge-status container
			const statusContainer = document.getElementById('merge-status');
			if (statusContainer) {
				statusContainer.remove();
			}
		}, 5000);
	}

	const style = document.createElement('style');
	document.head.appendChild(style);
	style.textContent = `
			.merge-button, mergebutton, body > div.pr-selection-container > button {
				position: fixed;
				bottom: 10px;
				right: 10px;
				z-index: 1000;
				background-color: #2ea44f;
				color: #ffffff;
				border: none;
				padding: 10px;
				border-radius: 5px;
				cursor: pointer;
			}
			.merge-button:hover, mergebutton:hover {
				background-color: #79e4f2;
				color: #ffffff;
				border: none;
				padding: 10px;
				border-radius: 5px;
				cursor: pointer;
			}
			#merge-status, .merge-status {
				position: fixed;
				bottom: 90px;
				right: 10px;
				z-index: 1000;
				background-color: #79e4f2;
				padding: 10px;
				border: 1px solid #ccc;
				margin-top: 10px;
				font-size: 0.9em;
				color: #333;
				max-width: 300px;
				overflow-wrap: break-word;
			}
			#merge-status > div {
				margin-bottom: 5px;
			}
			.pr-container {
				background-color: #ff0000;
				color: #ffffff;
				position: fixed;
				bottom: 130px;
				right: 10px;
				z-index: 1000;
				padding: 10px;
				border: 1px solid #cccccc;
			}
	`;
	window.addEventListener('load', addButton);
})();
