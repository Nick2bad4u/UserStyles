// ==UserScript==
// @name         Auto-Merge Dependabot PRs
// @namespace    nick2bad4u.github.io
// @version      6.9
// @description  Merges Dependabot PRs in any of your repositories - pulls the PRs into a table and lets you select which ones to merge.
// @author       Nick2bad4u
// @match        https://github.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        window.onurlchange
// @connect      api.github.com
// @license      UnLicense
// @tag          github
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @homepageURL  https://github.com/Nick2bad4u/UserStyles
// @homepage     https://github.com/Nick2bad4u/UserStyles
// @supportURL   https://github.com/Nick2bad4u/UserStyles/issues

// @downloadURL  https://update.greasyfork.org/scripts/525498/Auto-Merge%20Dependabot%20PRs.user.js
// @updateURL    https://update.greasyfork.org/scripts/525498/Auto-Merge%20Dependabot%20PRs.meta.js
// ==/UserScript==

// @var          number merge_delay "Delay between merge requests in milliseconds" 2000

// Utility wrappers for GM_* APIs with graceful fallback to localStorage
function safeGM_getValue(key, defaultValue) {
	if (typeof GM_getValue === 'function') {
		try {
			return GM_getValue(key, defaultValue);
		} catch (e) {
			console.warn('[Auto-Merge Dependabot PRs] GM_getValue failed, falling back to localStorage:', e);
		}
	}
	try {
		const val = localStorage.getItem(key);
		return val !== null ? JSON.parse(val) : defaultValue;
	} catch (e) {
		console.error('[Auto-Merge Dependabot PRs] localStorage getItem failed:', e);
		return defaultValue;
	}
}

function safeGM_setValue(key, value) {
	if (typeof GM_setValue === 'function') {
		try {
			return GM_setValue(key, value);
		} catch (e) {
			console.warn('[Auto-Merge Dependabot PRs] GM_setValue failed, falling back to localStorage:', e);
		}
	}
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (e) {
		console.error('[Auto-Merge Dependabot PRs] localStorage setItem failed:', e);
	}
}

function safeGM_addStyle(css) {
	if (typeof GM_addStyle === 'function') {
		try {
			GM_addStyle(css);
			return;
		} catch (e) {
			console.warn('[Auto-Merge Dependabot PRs] GM_addStyle failed, falling back to <style>:', e);
		}
	}
	try {
		const fallbackStyle = document.createElement('style');
		fallbackStyle.textContent = css;
		document.head.appendChild(fallbackStyle);
	} catch (e) {
		console.error('[Auto-Merge Dependabot PRs] Fallback <style> injection failed:', e);
	}
}

void (async function () {
	'use strict';

	const BUTTON_CONTAINER_ID = 'merge-dependabot-merge-button-container';
	const BUTTON_ID = 'merge-dependabot-merge-button';
	const STATUS_ID = 'merge-status';
	const API_REQUEST_TIMEOUT_MS = 30000;
	const MAX_MERGE_ATTEMPTS = 4;
	const MERGE_RETRY_BASE_DELAY_MS = 2000;
	let initializationPromise = null;
	let pageSyncTimer = 0;
	let batchRunning = false;
	const progressState = {
		active: false,
		completed: 0,
		details: [],
		failed: 0,
		message: '',
		phase: 'idle',
		skippedRepositories: 0,
		succeeded: 0,
		total: 0,
		visible: false,
	};

	// Delay between each merge request in milliseconds, configurable via the 'merge_delay' variable stored in safeGM_getValue (default is 2000ms)
	const configuredDelay = Number(safeGM_getValue('merge_delay', 2000));
	let delay = Number.isFinite(configuredDelay) ? Math.max(1000, configuredDelay) : 2000;

	/**
	 * Shows a modal dialog for secure GitHub token input.
	 * @returns {Promise<string>} The entered token.
	 */
	async function showSecureTokenInputModal() {
		return new Promise((resolve) => {
			let modal = document.getElementById('merge-dependabot-token-modal');
			if (!modal) {
				modal = document.createElement('div');
				modal.id = 'merge-dependabot-token-modal';
				modal.setAttribute('role', 'dialog');
				modal.setAttribute('aria-modal', 'true');
				modal.setAttribute('aria-labelledby', 'merge-dependabot-token-modal-title');
				modal.setAttribute('aria-describedby', 'merge-dependabot-token-modal-desc');
				modal.tabIndex = -1;
				modal.className = 'merge-dependabot-modal';
				modal.style = `
					position: fixed;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					background-color: white;
					border: 1px solid #ccc;
					padding: 20px;
					z-index: 1000;
					box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
				`;

				modal.innerHTML = `
					<h3 id="merge-dependabot-token-modal-title">Enter GitHub Token</h3>
					<p id="merge-dependabot-token-modal-desc">Please enter your GitHub token securely:</p>
					<input type="password" id="merge-dependabot-token-input" style="width: 100%; padding: 8px; margin-bottom: 10px;" aria-label="GitHub token" class="merge-dependabot-token-input" />
					<button id="merge-dependabot-submit-token" style="padding: 8px 16px;" class="merge-dependabot-btn">Submit</button>
					<button id="merge-dependabot-close-token-modal" aria-label="Close token modal" style="margin-left:10px;" class="merge-dependabot-btn">Close</button>
				`;

				document.body.appendChild(modal);

				const input = document.getElementById('merge-dependabot-token-input');
				const submitBtn = document.getElementById('merge-dependabot-submit-token');
				const closeBtn = document.getElementById('merge-dependabot-close-token-modal');

				// Focus management
				setTimeout(() => input.focus(), 0);
				const focusableEls = [input, submitBtn, closeBtn];
				let lastFocused = document.activeElement;

				function trapFocus(e) {
					if (e.key === 'Tab') {
						const idx = focusableEls.indexOf(document.activeElement);
						if (e.shiftKey) {
							if (idx === 0) {
								e.preventDefault();
								focusableEls[focusableEls.length - 1].focus();
							}
						} else {
							if (idx === focusableEls.length - 1) {
								e.preventDefault();
								focusableEls[0].focus();
							}
						}
					}
				}
				modal.addEventListener('keydown', trapFocus);

				submitBtn.addEventListener('click', () => {
					const tokenInput = input.value;
					console.log('[Auto-Merge Dependabot PRs] Token entered via modal.');
					modal.remove();
					if (lastFocused) lastFocused.focus();
					resolve(tokenInput);
				});
				closeBtn.addEventListener('click', () => {
					modal.remove();
					if (lastFocused) lastFocused.focus();
					resolve('');
				});
			}
		});
	}

	/**
	 * Initializes the script by ensuring a valid token and username are set.
	 */
	async function initialize() {
		let token;
		try {
			// Attempt to retrieve and decrypt the token
			token = await retrieveAndDecryptToken();
			console.log('[Auto-Merge Dependabot PRs] Token retrieved and decrypted.');
		} catch (error) {
			console.error('[Auto-Merge Dependabot PRs] Failed to retrieve and decrypt token:', error);
			alert('Failed to retrieve and decrypt token. Please check the console for more details.');
			throw error; // Stop further execution
		}

		if (!token) {
			while (!token) {
				token = await showSecureTokenInputModal();
				if (!token) {
					alert('GitHub token is required. Please enter a valid token.');
					token = null;
				} else {
					try {
						await validateGitHubToken(token);
						console.log('[Auto-Merge Dependabot PRs] GitHub token validated.');
					} catch (e) {
						console.error('[Auto-Merge Dependabot PRs] Invalid GitHub token:', e);
						alert('Invalid GitHub token. Please enter a valid token.');
						token = null;
					}
				}
			}
			try {
				await encryptAndStoreToken(token);
				console.log('[Auto-Merge Dependabot PRs] Token encrypted and stored.');
			} catch (error) {
				console.error('[Auto-Merge Dependabot PRs] Failed to encrypt and store token:', error);
				alert('Failed to encrypt and store token. Please check the console for more details.');
				throw error; // Stop further execution
			}
		}

		let username = safeGM_getValue('github_username') || '';
		if (typeof username !== 'string' || username.trim() === '' || /[^a-zA-Z0-9-_]/.test(username)) {
			username = ''; // Reset to empty if invalid
		}
		while (!username || username.trim() === '') {
			username = prompt('Please enter your GitHub username:');
			if (username && username.trim() !== '') {
				try {
					await validateGitHubUsername(username, token);
					safeGM_setValue('github_username', username);
					console.log('[Auto-Merge Dependabot PRs] GitHub username validated and saved.');
				} catch (e) {
					console.error('[Auto-Merge Dependabot PRs] Invalid GitHub username:', e);
					alert('Invalid GitHub username. Please enter a valid username.');
					username = '';
				}
			} else {
				alert('GitHub username is required.');
			}
		}
	}

	/**
	 * Validates the GitHub token by making an authenticated request.
	 * @param {string} token
	 */
	async function validateGitHubToken(token) {
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'https://api.github.com/user',
				headers: {
					Authorization: `token ${token}`,
				},
				onload: function (response) {
					if (response.status === 200) {
						resolve();
					} else {
						console.warn('[Auto-Merge Dependabot PRs] Token validation failed:', response.responseText);
						reject(new Error(`Token validation failed: ${response.responseText}`));
					}
				},
				onerror: function (error) {
					console.error('[Auto-Merge Dependabot PRs] Token validation error:', error);
					reject(error instanceof Error ? error : new Error(String(error)));
				},
			});
		});
	}

	/**
	 * Validates the GitHub username by making an authenticated request.
	 * @param {string} username
	 * @param {string} token
	 */
	async function validateGitHubUsername(username, token) {
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: 'GET',
				url: `https://api.github.com/users/${username}`,
				headers: {
					Authorization: `token ${token}`,
				},
				onload: function (response) {
					if (response.status === 200) {
						resolve();
					} else {
						console.warn('[Auto-Merge Dependabot PRs] Username validation failed:', response.responseText);
						reject(new Error(`GitHub username validation failed: ${response.responseText}`));
					}
				},
				onerror: function (error) {
					console.error('[Auto-Merge Dependabot PRs] Username validation error:', error);
					reject(error instanceof Error ? error : new Error(String(error)));
				},
			});
		});
	}

	async function encryptAndStoreToken(token) {
		try {
			const textEncoder = new TextEncoder();
			const encodedToken = textEncoder.encode(token);

			let key;
			const storedKey = safeGM_getValue('encryption_key', null);
			if (storedKey) {
				try {
					key = await crypto.subtle.importKey('jwk', JSON.parse(storedKey), { name: 'AES-GCM' }, true, ['encrypt', 'decrypt']);
				} catch (error) {
					console.error('Failed to parse or import encryption key:', error);
					alert('The stored encryption key is invalid or corrupted. Please reset your token and encryption key.');
					throw error; // Stop further execution
				}
			} else {
				key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
				safeGM_setValue('encryption_key', JSON.stringify(await crypto.subtle.exportKey('jwk', key)));
			}

			const iv = crypto.getRandomValues(new Uint8Array(12));
			const encryptedToken = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, encodedToken);

			safeGM_setValue(
				'github_token', // gitleaks:allow -- Encrypted storage key name, not a credential.
				JSON.stringify({
					iv: Array.from(iv),
					token: Array.from(new Uint8Array(encryptedToken)),
				}),
			);
		} catch (error) {
			console.error('Failed to encrypt and store token:', error);
			alert('An error occurred while encrypting and storing the token. Please check the console for details.');
			throw error; // Stop further execution
		}
	}

	async function retrieveAndDecryptToken() {
		try {
			const storedData = safeGM_getValue('github_token', null);
			if (!storedData) return '';

			let iv, token;
			try {
				({ iv, token } = JSON.parse(storedData));
			} catch (error) {
				console.error('Stored token is corrupted or invalid:', error);
				alert('The stored token is corrupted or invalid. Please reset your token.');
				return ''; // Return an empty string to indicate failure
			}
			const key = safeGM_getValue('encryption_key', null);

			if (!key) {
				throw new Error('Encryption key is missing.');
			}

			const importedKey = await crypto.subtle.importKey('jwk', JSON.parse(key), { name: 'AES-GCM' }, true, ['decrypt']);

			const decryptedToken = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(iv) }, importedKey, new Uint8Array(token));

			const textDecoder = new TextDecoder();
			return textDecoder.decode(decryptedToken);
		} catch (error) {
			console.error('Failed to retrieve and decrypt token:', error);
			alert('An error occurred while retrieving and decrypting the token. Please check the console for details.');
			return ''; // Return an empty string to indicate failure
		}
	}

	class GitHubApiError extends Error {
		constructor(message, { retryable = false, status = 0, stopBatch = false } = {}) {
			super(message);
			this.name = 'GitHubApiError';
			this.retryable = retryable;
			this.status = status;
			this.stopBatch = stopBatch;
		}
	}

	function wait(milliseconds) {
		return new Promise((resolve) => globalThis.setTimeout(resolve, milliseconds));
	}

	function getResponseHeader(response, headerName) {
		const normalizedName = headerName.toLowerCase();
		if (typeof response.headers?.get === 'function') {
			return response.headers.get(headerName);
		}
		if (response.headers && typeof response.headers === 'object') {
			for (const [name, value] of Object.entries(response.headers)) {
				if (name.toLowerCase() === normalizedName) return String(value);
			}
		}
		if (typeof response.responseHeaders === 'string') {
			for (const line of response.responseHeaders.split(/\r?\n/u)) {
				const separatorIndex = line.indexOf(':');
				if (separatorIndex === -1) continue;
				if (line.slice(0, separatorIndex).trim().toLowerCase() === normalizedName) {
					return line.slice(separatorIndex + 1).trim();
				}
			}
		}
		return null;
	}

	function parseResponseBody(response) {
		const responseText = typeof response.responseText === 'string' ? response.responseText : '';
		if (!responseText) return {};
		try {
			return JSON.parse(responseText);
		} catch {
			return { message: responseText };
		}
	}

	function createGitHubApiError(response, action) {
		const status = Number(response.status) || 0;
		const responseBody = parseResponseBody(response);
		const apiMessage = typeof responseBody.message === 'string' ? responseBody.message : 'Unknown GitHub API error';
		const rateLimitRemaining = getResponseHeader(response, 'x-ratelimit-remaining');
		const retryAfter = getResponseHeader(response, 'retry-after');
		const isRateLimited = (status === 403 || status === 429) && (rateLimitRemaining === '0' || retryAfter !== null || /rate limit/iu.test(apiMessage));

		let message = `${action} failed${status ? ` (HTTP ${status})` : ''}: ${apiMessage}`;
		if (isRateLimited) {
			const resetHeader = getResponseHeader(response, 'x-ratelimit-reset');
			const resetTime = resetHeader ? new Date(Number(resetHeader) * 1000) : null;
			if (retryAfter) {
				message += ` Retry after ${retryAfter} seconds.`;
			} else if (resetTime && !Number.isNaN(resetTime.getTime())) {
				message += ` Retry after ${resetTime.toLocaleTimeString()}.`;
			} else {
				message += ' Retry later.';
			}
		}

		return new GitHubApiError(message, {
			retryable:
				!isRateLimited &&
				[
					405,
					408,
					425,
					500,
					502,
					503,
					504,
				].includes(status),
			status,
			stopBatch: isRateLimited || status === 401,
		});
	}

	function createNetworkError(action, error) {
		const detail = error instanceof Error ? error.message : String(error || 'Network request failed');
		return new GitHubApiError(`${action} failed: ${detail}`, {
			retryable: true,
			stopBatch: true,
		});
	}

	async function fetchAllRepositories(username, token, orgs = []) {
		async function fetchPaginatedRepos(url, token) {
			let repos = [];
			let page = 1;
			while (true) {
				const response = await new Promise((resolve, reject) => {
					GM_xmlhttpRequest({
						method: 'GET',
						url: `${url}&page=${page}`,
						timeout: API_REQUEST_TIMEOUT_MS,
						headers: {
							Accept: 'application/vnd.github+json',
							Authorization: `token ${token}`,
						},
						onload: function (response) {
							if (response.status === 200) {
								resolve(response);
							} else {
								reject(createGitHubApiError(response, 'Fetching repositories'));
							}
						},
						onerror: function (error) {
							reject(createNetworkError('Fetching repositories', error));
						},
						ontimeout: function () {
							reject(new GitHubApiError('Fetching repositories timed out.', { retryable: true }));
						},
					});
				});
				const pageRepos = JSON.parse(response.responseText);
				if (pageRepos.length === 0) break;
				repos = repos.concat(pageRepos);
				page++;
			}
			return repos;
		}

		const [userRepos, orgRepos] = await Promise.all([
			fetchPaginatedRepos(`https://api.github.com/users/${username}/repos?per_page=100`, token),
			Promise.all(orgs.filter(Boolean).map((org) => fetchPaginatedRepos(`https://api.github.com/orgs/${org}/repos?per_page=100`, token))),
		]);
		const repositoriesByName = new Map();
		for (const repository of [...userRepos, ...orgRepos.flat()]) {
			const owner = repository.owner?.login || username;
			repositoriesByName.set(`${owner}/${repository.name}`.toLowerCase(), repository);
		}
		return [...repositoriesByName.values()];
	}

	const botUsernames = safeGM_getValue('dependabot_usernames', ['dependabot[bot]', 'dependabot-preview[bot]', 'github-actions[bot]'])
		.map((username) => username.trim())
		.filter(Boolean);

	async function fetchDependabotPRs(owner, repo, token) {
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: 'GET',
				url: `https://api.github.com/repos/${owner}/${repo}/pulls?per_page=100&state=open`,
				timeout: API_REQUEST_TIMEOUT_MS,
				headers: {
					Accept: 'application/vnd.github+json',
					Authorization: `token ${token}`,
				},
				onload: function (response) {
					if (response.status === 200) {
						const pulls = parseResponseBody(response);
						if (!Array.isArray(pulls)) {
							reject(new GitHubApiError(`Fetching PRs for ${owner}/${repo} returned an invalid response.`));
							return;
						}
						// Only keep PRs authored by the configured bot usernames
						const filtered = pulls.filter((pr) => pr.user && botUsernames.includes(pr.user.login));
						resolve(filtered);
					} else {
						reject(createGitHubApiError(response, `Fetching PRs for ${owner}/${repo}`));
					}
				},
				onerror: function (error) {
					reject(createNetworkError(`Fetching PRs for ${owner}/${repo}`, error));
				},
				ontimeout: function () {
					reject(new GitHubApiError(`Fetching PRs for ${owner}/${repo} timed out.`, { retryable: true, stopBatch: true }));
				},
			});
		});
	}

	async function mergeDependabotPRs(prs, token, onSettled) {
		for (const [index, pr] of prs.entries()) {
			const owner = pr.owner;
			const repo = pr.repo;
			let result;
			try {
				const attempts = await mergePR(pr, owner, repo, token);
				result = { attempts, owner, pr, repo, succeeded: true };
			} catch (error) {
				console.error(`[Auto-Merge Dependabot PRs] Failed to merge ${owner}/${repo}#${pr.number}:`, error);
				result = {
					attempts: error.attempts || 1,
					error,
					owner,
					pr,
					repo,
					succeeded: false,
				};
			}
			onSettled(result);
			if (!result.succeeded && result.error.stopBatch) {
				return {
					error: result.error,
					remaining: prs.length - index - 1,
					stopped: true,
				};
			}
			if (index < prs.length - 1) await wait(delay);
		}
		return { remaining: 0, stopped: false };
	}

	function sendMergeRequest(pr, owner, repo, token) {
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: 'PUT',
				url: `https://api.github.com/repos/${owner}/${repo}/pulls/${pr.number}/merge`,
				timeout: API_REQUEST_TIMEOUT_MS,
				headers: {
					Accept: 'application/vnd.github+json',
					Authorization: `token ${token}`,
					'Content-Type': 'application/json',
				},
				data: JSON.stringify({
					commit_title: `Merge PR #${pr.number}`,
					merge_method: 'merge',
				}),
				onload: function (response) {
					if (response.status === 200) {
						const responseBody = parseResponseBody(response);
						if (responseBody.merged === false) {
							reject(
								new GitHubApiError(
									`Merging ${owner}/${repo}#${pr.number} failed: ${responseBody.message || 'GitHub did not merge the pull request.'}`
								)
							);
							return;
						}
						resolve();
					} else {
						reject(createGitHubApiError(response, `Merging ${owner}/${repo}#${pr.number}`));
					}
				},
				onerror: function (error) {
					reject(createNetworkError(`Merging ${owner}/${repo}#${pr.number}`, error));
				},
				ontimeout: function () {
					reject(new GitHubApiError(`Merging ${owner}/${repo}#${pr.number} timed out.`, { retryable: true, stopBatch: true }));
				},
			});
		});
	}

	async function mergePR(pr, owner, repo, token) {
		let lastError;
		for (let attempt = 1; attempt <= MAX_MERGE_ATTEMPTS; attempt++) {
			try {
				await sendMergeRequest(pr, owner, repo, token);
				return attempt;
			} catch (error) {
				lastError = error instanceof Error ? error : new Error(String(error));
				lastError.attempts = attempt;
				if (!error?.retryable || attempt === MAX_MERGE_ATTEMPTS) throw lastError;

				const retryDelay = MERGE_RETRY_BASE_DELAY_MS * 2 ** (attempt - 1);
				const nextAttempt = attempt + 1;
				console.warn(
					`[Auto-Merge Dependabot PRs] ${owner}/${repo}#${pr.number} attempt ${attempt} failed. Retrying in ${retryDelay} ms (attempt ${nextAttempt} of ${MAX_MERGE_ATTEMPTS}).`,
					lastError
				);
				updateProgressState({
					message: `Retrying ${owner}/${repo}#${pr.number} in ${retryDelay / 1000} seconds (attempt ${nextAttempt} of ${MAX_MERGE_ATTEMPTS})...`,
				});
				await wait(retryDelay);
			}
		}
		throw lastError;
	}

	function getSupportedPageKind() {
		const { pathname } = globalThis.location;
		if (/^\/notifications(?:\/|$)/u.test(pathname)) return 'notifications';
		if (/^\/[^/]+\/[^/]+\/pull\/\d+(?:\/|$)/u.test(pathname)) return 'pull-request';
		return null;
	}

	function positionButtonContainer(container, pageKind) {
		const isPullRequest = pageKind === 'pull-request';
		container.dataset.pageKind = pageKind;
		for (const element of [container, container.querySelector(`#${BUTTON_ID}`)].filter(Boolean)) {
			element.style.bottom = isPullRequest ? '20px' : '10px';
			element.style.left = isPullRequest ? '20px' : 'auto';
			element.style.right = isPullRequest ? 'auto' : '10px';
		}
	}

	function removePageUi() {
		document.getElementById(BUTTON_CONTAINER_ID)?.remove();
		document.getElementById('merge-dependabot-config-panel')?.remove();
		document.querySelectorAll('.pr-container').forEach((element) => element.remove());
		removeAllPRSelectionContainers();
		if (!progressState.visible) document.getElementById(STATUS_ID)?.remove();
	}

	async function syncPage() {
		pageSyncTimer = 0;
		const pageKind = getSupportedPageKind();
		if (!pageKind) {
			removePageUi();
			if (progressState.visible) renderProgressState();
			return;
		}

		try {
			initializationPromise ??= initialize();
			await initializationPromise;
		} catch (error) {
			initializationPromise = null;
			console.error('[Auto-Merge Dependabot PRs] Initialization failed:', error);
			return;
		}

		if (getSupportedPageKind() !== pageKind) {
			schedulePageSync();
			return;
		}
		addButton(pageKind);
		if (progressState.visible) renderProgressState();
	}

	function schedulePageSync() {
		if (pageSyncTimer) return;
		pageSyncTimer = globalThis.setTimeout(() => void syncPage(), 50);
	}

	function startPageLifecycle() {
		globalThis.addEventListener('popstate', schedulePageSync);
		if (globalThis.onurlchange === null) {
			globalThis.addEventListener('urlchange', schedulePageSync);
		}
		document.addEventListener('turbo:load', schedulePageSync);
		document.addEventListener('pjax:end', schedulePageSync);

		const pageObserver = new MutationObserver(() => {
			if ((getSupportedPageKind() && !document.getElementById(BUTTON_ID)) || (progressState.visible && !document.getElementById(STATUS_ID))) {
				schedulePageSync();
			}
		});
		pageObserver.observe(document.documentElement, {
			childList: true,
			subtree: true,
		});

		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', schedulePageSync, { once: true });
		} else {
			schedulePageSync();
		}
	}

	function addButton(pageKind) {
		try {
			const existingButton = document.getElementById(BUTTON_ID);
			if (existingButton) {
				const existingContainer = existingButton.closest(`#${BUTTON_CONTAINER_ID}`);
				if (existingContainer) positionButtonContainer(existingContainer, pageKind);
				return;
			}

			const mergeButton = document.createElement('button');
			mergeButton.textContent = 'Merge Dependabot PRs';
			mergeButton.classList.add('merge-dependabot-merge-button', 'merge-button');
			mergeButton.id = BUTTON_ID;
			mergeButton.disabled = batchRunning;
			mergeButton.addEventListener('click', () => {
				void (async () => {
					if (batchRunning) {
						renderProgressState();
						document.getElementById(STATUS_ID)?.focus();
						return;
					}

					resetProgressState({
						message: 'Fetching repositories...',
						phase: 'discovery',
					});
					setBatchRunning(true);
					try {
						const token = await retrieveAndDecryptToken();
						if (!token) {
							updateProgressState({
								active: false,
								failed: 1,
								message: 'Invalid or missing GitHub token. Open settings and save a valid token.',
								phase: 'failed',
							});
							return;
						}
						const username = safeGM_getValue('github_username');
						const orgs = (safeGM_getValue('github_orgs', '') || '')
							.split(',')
							.map((s) => s.trim())
							.filter(Boolean);
						const repos = await fetchAllRepositories(username, token, orgs);
						updateProgressState({
							message: `Scanning ${repos.length} repositories...`,
							total: repos.length,
						});

						const allPRs = [];
						for (const [repoIndex, repo] of repos.entries()) {
							const owner = repo.owner?.login || username;
							const fullName = repo.full_name || `${owner}/${repo.name}`;
							if (repo.archived) {
								updateProgressState({
									completed: repoIndex + 1,
									message: `Skipping archived repository ${fullName}...`,
									skippedRepositories: progressState.skippedRepositories + 1,
								});
								continue;
							}
							updateProgressState({
								message: `Fetching PRs for ${fullName}...`,
							});
							try {
								const prs = await fetchDependabotPRs(owner, repo.name, token);
								allPRs.push(
									...prs.map((pr) => ({
										...pr,
										owner,
										repo: repo.name,
									}))
								);
								updateProgressState({
									succeeded: progressState.succeeded + 1,
								});
							} catch (error) {
								if (error?.stopBatch) throw error;
								const reason = error?.status === 404 ? 'deleted or no longer accessible' : error.message || 'Unknown error';
								console.warn(`[Auto-Merge Dependabot PRs] Skipping ${fullName}: ${reason}`);
								progressState.skippedRepositories++;
								addProgressDetail(`Skipped ${fullName}: ${reason}${reason.endsWith('.') ? '' : '.'}`, 'warning');
							}
							updateProgressState({ completed: repoIndex + 1 });
						}

						if (allPRs.length > 0) {
							updateProgressState({
								active: false,
								message: `Scan complete. Found ${allPRs.length} Dependabot PR${allPRs.length === 1 ? '' : 's'}; choose which ones to merge.`,
								phase: 'selection',
							});
							displayPRSelection(allPRs, token);
						} else {
							updateProgressState({
								active: false,
								message: 'Scan complete. No open Dependabot PRs were found.',
								phase: 'complete',
							});
						}
					} catch (error) {
						console.error('[Auto-Merge Dependabot PRs] Discovery failed:', error);
						addProgressDetail(error.message || 'Unknown discovery error.', 'error');
						updateProgressState({
							active: false,
							failed: progressState.failed + 1,
							message: 'Repository discovery stopped after an error. No merge requests were sent.',
							phase: 'failed',
						});
					} finally {
						setBatchRunning(false);
					}
				})();
			});
			const container = document.getElementById(BUTTON_CONTAINER_ID) || createMergeButtonContainer();
			container.appendChild(mergeButton);
			positionButtonContainer(container, pageKind);

			function createMergeButtonContainer() {
				const container = document.createElement('div');
				container.id = BUTTON_CONTAINER_ID;
				container.className = 'merge-dependabot-merge-button-container';
				container.style.position = 'fixed';
				container.style.zIndex = '1000';
				document.body.appendChild(container);
				return container;
			}

			// Add the cog icon to the merge button
			addCogToMergeButton();
		} catch (error) {
			console.error('Failed to add merge button:', error);
			alert('An error occurred while adding the merge button. Please check the console for details.');
		}
	}

	function getStatusElement() {
		let statusElement = document.getElementById(STATUS_ID);
		if (statusElement && !statusElement.querySelector('#merge-status-message')) {
			statusElement.remove();
			statusElement = null;
		}
		if (!statusElement) {
			statusElement = document.createElement('div');
			statusElement.id = STATUS_ID;
			statusElement.classList.add('merge-status');
			statusElement.setAttribute('aria-label', 'Dependabot batch progress');
			statusElement.setAttribute('role', 'region');
			statusElement.tabIndex = -1;

			const heading = document.createElement('strong');
			heading.textContent = 'Dependabot merge progress';
			heading.id = 'merge-status-title';
			statusElement.setAttribute('aria-labelledby', heading.id);

			const closeButton = document.createElement('button');
			closeButton.type = 'button';
			closeButton.id = 'merge-status-close';
			closeButton.className = 'merge-status-close';
			closeButton.textContent = '×';
			closeButton.setAttribute('aria-label', 'Dismiss completed Dependabot progress');
			closeButton.addEventListener('click', () => {
				if (progressState.active) return;
				progressState.visible = false;
				statusElement.remove();
			});

			const message = document.createElement('div');
			message.id = 'merge-status-message';
			message.setAttribute('aria-live', 'polite');
			message.setAttribute('role', 'status');

			const progress = document.createElement('progress');
			progress.id = 'merge-status-progress';
			progress.setAttribute('aria-label', 'Dependabot batch progress');

			const summary = document.createElement('div');
			summary.id = 'merge-status-summary';

			const details = document.createElement('ul');
			details.id = 'merge-status-details';

			statusElement.append(heading, closeButton, message, progress, summary, details);
			document.body.appendChild(statusElement);
		}
		return statusElement;
	}

	function renderProgressState() {
		if (!progressState.visible) return;
		const statusElement = getStatusElement();
		statusElement.dataset.phase = progressState.phase;
		const message = statusElement.querySelector('#merge-status-message');
		const progress = statusElement.querySelector('#merge-status-progress');
		const summary = statusElement.querySelector('#merge-status-summary');
		const details = statusElement.querySelector('#merge-status-details');
		const closeButton = statusElement.querySelector('#merge-status-close');

		message.textContent = progressState.message;
		progress.hidden = progressState.total === 0;
		progress.max = Math.max(progressState.total, 1);
		progress.value = Math.min(progressState.completed, progressState.total);
		const skippedLabel = `${progressState.skippedRepositories} ${progressState.skippedRepositories === 1 ? 'repository' : 'repositories'} skipped`;
		summary.textContent = progressState.total
			? `${progressState.completed} / ${progressState.total} complete · ${progressState.succeeded} succeeded · ${progressState.failed} failed · ${skippedLabel}`
			: `${progressState.succeeded} succeeded · ${progressState.failed} failed · ${skippedLabel}`;
		closeButton.disabled = progressState.active;
		closeButton.title = progressState.active ? 'Progress cannot be dismissed while the batch is running.' : 'Dismiss';

		details.replaceChildren();
		for (const detail of progressState.details) {
			const item = document.createElement('li');
			item.className = `merge-status-detail merge-status-detail-${detail.kind}`;
			item.textContent = detail.message;
			details.appendChild(item);
		}
		details.hidden = progressState.details.length === 0;
	}

	function updateProgressState(update) {
		Object.assign(progressState, update, { visible: true });
		renderProgressState();
	}

	function resetProgressState({ message, phase, total = 0 }, { preserveWarnings = false } = {}) {
		const details = preserveWarnings ? progressState.details.filter((detail) => detail.kind === 'warning') : [];
		const skippedRepositories = preserveWarnings ? progressState.skippedRepositories : 0;
		Object.assign(progressState, {
			active: true,
			completed: 0,
			details,
			failed: 0,
			message,
			phase,
			skippedRepositories,
			succeeded: 0,
			total,
			visible: true,
		});
		renderProgressState();
	}

	function addProgressDetail(message, kind = 'info') {
		progressState.details.push({ kind, message });
		renderProgressState();
	}

	function setBatchRunning(running) {
		batchRunning = running;
		progressState.active = running;
		const mergeButton = document.getElementById(BUTTON_ID);
		if (mergeButton) mergeButton.disabled = running;
		const mergeSelectedButton = document.getElementById('merge-dependabot-merge-selected-btn');
		if (mergeSelectedButton) mergeSelectedButton.disabled = running;
		if (progressState.visible) renderProgressState();
	}

	// Utility: Remove all lingering PR selection containers
	function removeAllPRSelectionContainers() {
		const containers = document.querySelectorAll('.merge-dependabot-pr-selection-container');
		containers.forEach((el) => el.remove());
	}

	function displayPRSelection(prs, token) {
		try {
			removeAllPRSelectionContainers(); // Clean up any old containers first
			const container = document.createElement('div');
			container.classList.add('merge-dependabot-pr-selection-container');
			container.setAttribute('role', 'dialog');
			container.setAttribute('aria-modal', 'true');
			container.setAttribute('aria-labelledby', 'merge-dependabot-pr-selection-title');
			container.tabIndex = -1;
			container.id = 'merge-dependabot-pr-selection-container';
			container.style.position = 'fixed';
			container.style.bottom = '50px';
			container.style.right = '10px';
			container.style.zIndex = '1000';
			container.style.backgroundColor = '#79e4f2';
			container.style.color = '#000000';
			container.style.padding = '10px';
			container.style.border = '1px solid #ccc';
			container.style.maxHeight = '300px';
			container.style.overflowY = 'auto';
			container.style.minWidth = '350px';
			container.style.boxSizing = 'border-box';
			container.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';

			// Add close (X) button
			const closeBtn = document.createElement('button');
			closeBtn.textContent = '×';
			closeBtn.className = 'merge-dependabot-pr-selection-close';
			closeBtn.title = 'Close';
			closeBtn.setAttribute('aria-label', 'Close PR selection dialog');
			closeBtn.id = 'merge-dependabot-pr-selection-close';
			closeBtn.onclick = () => {
				container.remove();
				removeAllPRSelectionContainers(); // Ensure all are removed
				if (container.lastFocused) container.lastFocused.focus();
			};
			container.appendChild(closeBtn);

			const title = document.createElement('h3');
			title.id = 'merge-dependabot-pr-selection-title';
			title.textContent = 'Select Dependabot PRs to Merge';
			container.appendChild(title);

			// Add Select All button
			const selectAllBtn = document.createElement('button');
			selectAllBtn.textContent = 'Select All';
			selectAllBtn.className = 'merge-dependabot-btn';
			selectAllBtn.style.marginBottom = '8px';
			selectAllBtn.style.marginRight = '8px';
			let allSelected = false;
			selectAllBtn.addEventListener('click', () => {
				const checkboxes = Array.from(prList.querySelectorAll('input[type="checkbox"]'));
				allSelected = !allSelected;
				checkboxes.forEach((cb) => {
					cb.checked = allSelected;
				});
				selectAllBtn.textContent = allSelected ? 'Deselect All' : 'Select All';
			});
			container.appendChild(selectAllBtn);

			const prList = document.createElement('div');
			prList.className = 'merge-dependabot-pr-list';
			prList.id = 'merge-dependabot-pr-list';
			let lastChecked = null; // Track the last clicked checkbox

			prs.forEach((pr, prIndex) => {
				const prItem = document.createElement('div');
				prItem.className = 'merge-dependabot-pr-item';
				const checkbox = document.createElement('input');
				checkbox.type = 'checkbox';
				checkbox.value = pr.number;
				checkbox.dataset.prIndex = String(prIndex);
				checkbox.id = `merge-dependabot-pr-checkbox-${prIndex}`;
				checkbox.className = 'merge-dependabot-pr-checkbox';

				const label = document.createElement('label');
				label.textContent = `Repo: ${pr.owner}/${pr.repo} - PR #${pr.number}: ${pr.title}`;
				label.style = 'margin-left: 5px;';
				label.setAttribute('for', checkbox.id);
				label.className = 'merge-dependabot-pr-label';

				// Add event listener for shift-click selection
				checkbox.addEventListener('click', (event) => {
					if (event.shiftKey && lastChecked) {
						const checkboxes = Array.from(prList.querySelectorAll('input[type="checkbox"]'));
						const start = Math.min(checkboxes.indexOf(lastChecked), checkboxes.indexOf(checkbox));
						const end = Math.max(checkboxes.indexOf(lastChecked), checkboxes.indexOf(checkbox));
						for (let i = start; i <= end; i++) {
							checkboxes[i].checked = lastChecked.checked;
						}
					}
					lastChecked = checkbox; // Update the last clicked checkbox
				});

				prItem.appendChild(checkbox);
				prItem.appendChild(label);
				prList.appendChild(prItem);
			});

			const mergeSelectedButton = document.createElement('button');
			mergeSelectedButton.textContent = 'Merge Selected PRs';
			mergeSelectedButton.setAttribute('aria-label', 'Merge selected pull requests');
			mergeSelectedButton.className = 'merge-dependabot-btn';
			mergeSelectedButton.id = 'merge-dependabot-merge-selected-btn';
			mergeSelectedButton.addEventListener('click', () => {
				void (async () => {
					if (batchRunning) return;
					// Get all selected checkboxes
					const selectedCheckboxes = Array.from(prList.querySelectorAll('input[type="checkbox"]:checked'));

					// Map selected checkboxes to their corresponding PRs
					const selectedPRs = selectedCheckboxes.map((checkbox) => prs[Number(checkbox.dataset.prIndex)]).filter(Boolean);

					if (selectedPRs.length > 0) {
						container.remove();
						removeAllPRSelectionContainers();
						resetProgressState(
							{
								message: `Merging ${selectedPRs.length} selected PR${selectedPRs.length === 1 ? '' : 's'}...`,
								phase: 'merge',
								total: selectedPRs.length,
							},
							{ preserveWarnings: true }
						);
						setBatchRunning(true);
						try {
							const batchResult = await mergeDependabotPRs(selectedPRs, token, (result) => {
								const reference = `${result.owner}/${result.repo}#${result.pr.number}`;
								progressState.completed++;
								if (result.succeeded) {
									progressState.succeeded++;
									const retrySummary = result.attempts > 1 ? ` after ${result.attempts} attempts` : '';
									addProgressDetail(`Merged ${reference}${retrySummary}.`, 'success');
								} else {
									progressState.failed++;
									const attemptSummary = result.attempts > 1 ? ` after ${result.attempts} attempts` : '';
									addProgressDetail(`Failed ${reference}${attemptSummary}: ${result.error.message || 'Unknown error'}`, 'error');
								}
								updateProgressState({
									message: `Processed ${progressState.completed} of ${progressState.total} selected PRs...`,
								});
							});
							if (batchResult.stopped) {
								if (batchResult.remaining > 0) {
									addProgressDetail(
										`${batchResult.remaining} remaining PR${batchResult.remaining === 1 ? ' was' : 's were'} not attempted.`,
										'warning'
									);
								}
								updateProgressState({
									active: false,
									message: `Stopped safely: ${progressState.succeeded} merged, ${progressState.failed} failed, and ${batchResult.remaining} not attempted.`,
									phase: 'failed',
								});
							} else {
								updateProgressState({
									active: false,
									message: `Finished: ${progressState.succeeded} merged and ${progressState.failed} failed. This result stays visible until you dismiss it.`,
									phase: progressState.failed > 0 ? 'complete-with-errors' : 'complete',
								});
							}
						} catch (error) {
							console.error('[Auto-Merge Dependabot PRs] Batch merge stopped unexpectedly:', error);
							addProgressDetail(error.message || 'Unknown batch error.', 'error');
							updateProgressState({
								active: false,
								message: 'The batch stopped unexpectedly. Completed results are retained below.',
								phase: 'failed',
							});
						} finally {
							setBatchRunning(false);
						}
					} else {
						updateProgressState({
							message: 'No PRs are selected. Select at least one PR to start a merge.',
						});
					}
				})();
			});

			container.appendChild(prList);
			container.appendChild(mergeSelectedButton);
			document.body.appendChild(container);

			// Focus management for modal
			const focusableEls = [closeBtn, selectAllBtn, mergeSelectedButton, ...Array.from(prList.querySelectorAll('input[type="checkbox"]'))];
			container.lastFocused = document.activeElement;
			setTimeout(() => mergeSelectedButton.focus(), 0);
			container.addEventListener('keydown', function (e) {
				if (e.key === 'Tab') {
					const idx = focusableEls.indexOf(document.activeElement);
					if (e.shiftKey) {
						if (idx === 0) {
							e.preventDefault();
							focusableEls[focusableEls.length - 1].focus();
						}
					} else {
						if (idx === focusableEls.length - 1) {
							e.preventDefault();
							focusableEls[0].focus();
						}
					}
				}
			});
		} catch (error) {
			console.error('Failed to display PR selection:', error);
			removeAllPRSelectionContainers(); // Clean up on error
			addProgressDetail(error.message || 'Unknown PR selection error.', 'error');
			updateProgressState({
				active: false,
				message: 'The PR selection dialog could not be displayed.',
				phase: 'failed',
			});
		}
	}

	const mainCSS = `
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
			.merge-button:disabled {
				cursor: wait;
				opacity: 0.7;
			}
			#merge-status, .merge-status {
				position: fixed;
				top: 80px;
				right: 10px;
				z-index: 1000;
				width: min(360px, calc(100vw - 20px));
				max-height: calc(100vh - 100px);
				overflow-y: auto;
				box-sizing: border-box;
				background-color: #f6f8fa;
				padding: 12px;
				border: 1px solid #8c959f;
				border-radius: 6px;
				box-shadow: 0 8px 24px rgba(140, 149, 159, 0.35);
				font-size: 0.9em;
				color: #24292f;
				overflow-wrap: break-word;
			}
			#merge-status-title {
				display: block;
				padding-right: 28px;
			}
			#merge-status-message, #merge-status-summary {
				margin-top: 8px;
			}
			#merge-status-progress {
				display: block;
				width: 100%;
				height: 12px;
				margin-top: 8px;
			}
			#merge-status-progress[hidden] {
				display: none;
			}
			#merge-status-details {
				margin: 8px 0 0;
				padding-left: 20px;
			}
			.merge-status-detail-error {
				color: #cf222e;
			}
			.merge-status-detail-success {
				color: #1a7f37;
			}
			.merge-status-detail-warning {
				color: #9a6700;
			}
			.merge-status-close {
				position: absolute;
				top: 5px;
				right: 7px;
				border: 0;
				background: transparent;
				color: inherit;
				font-size: 1.4rem;
				cursor: pointer;
			}
			.merge-status-close:disabled {
				cursor: not-allowed;
				opacity: 0.35;
			}
			.merge-button {
				transition: background-color 0.3s ease;
				}
			.merge-dependabot-pr-selection-container {
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
				min-width: 350px;
				box-sizing: border-box;
				box-shadow: 0 2px 8px rgba(0,0,0,0.15);
			}
			.merge-dependabot-pr-selection-close {
				display: inline-block;
				width: 32px;
				height: 32px;
				line-height: 32px;
				text-align: center;
				position: absolute;
				top: 2px;
				right: 6px;
				cursor: pointer;
				font-weight: bold;
				color: #333;
				background: none;
				border: none;
				font-size: 1.2em;
				padding: 0;
			}
	`;
	safeGM_addStyle(mainCSS);

	function showConfigPanel() {
		const configPanel = document.createElement('div');
		configPanel.setAttribute('role', 'dialog');
		configPanel.setAttribute('aria-modal', 'true');
		configPanel.setAttribute('aria-labelledby', 'merge-dependabot-config-panel-title');
		configPanel.tabIndex = -1;
		configPanel.id = 'merge-dependabot-config-panel';
		configPanel.className = 'merge-dependabot-modal';
		configPanel.style = `
			position: fixed;
			top: 10%;
			left: 50%;
			transform: translate(-50%, -10%);
			background-color: white;
			border: 1px solid #ccc;
			padding: 20px;
			z-index: 1000;
		`;
		configPanel.innerHTML = `
			<h3 id="merge-dependabot-config-panel-title">Configuration</h3>
			<label>GitHub Username: <input id="merge-dependabot-config-username" type="text" value="${safeGM_getValue('github_username', '')}" class="merge-dependabot-config-input" /></label><br>
			<label>Organizations (comma separated): <input id="merge-dependabot-config-orgs" type="text" value="${safeGM_getValue('github_orgs', '')}" class="merge-dependabot-config-input" /></label><br>
			<label>Merge Delay (ms, minimum 1000): <input id="merge-dependabot-config-merge-delay" type="number" min="1000" step="100" value="${safeGM_getValue('merge_delay', 2000)}" class="merge-dependabot-config-input" /></label><br>
			<label>Bot Usernames (comma separated): <input id="merge-dependabot-config-bot-usernames" type="text" value="${safeGM_getValue('dependabot_usernames', ['dependabot[bot]', 'dependabot-preview[bot]']).join(', ')}" class="merge-dependabot-config-input" /></label><br>
			<button id="merge-dependabot-save-config" class="merge-dependabot-btn">Save</button>
			<button id="merge-dependabot-reset-token" class="merge-dependabot-btn">Reset Token</button>
			<button id="merge-dependabot-close-config" aria-label="Close configuration panel" class="merge-dependabot-btn">Close</button>
		`;
		document.body.appendChild(configPanel);

		const saveBtn = document.getElementById('merge-dependabot-save-config');
		const resetBtn = document.getElementById('merge-dependabot-reset-token');
		const closeBtn = document.getElementById('merge-dependabot-close-config');
		const focusableEls = [saveBtn, resetBtn, closeBtn];
		let lastFocused = document.activeElement;
		setTimeout(() => saveBtn.focus(), 0);
		configPanel.addEventListener('keydown', function (e) {
			if (e.key === 'Tab') {
				const idx = focusableEls.indexOf(document.activeElement);
				if (e.shiftKey) {
					if (idx === 0) {
						e.preventDefault();
						focusableEls[focusableEls.length - 1].focus();
					}
				} else {
					if (idx === focusableEls.length - 1) {
						e.preventDefault();
						focusableEls[0].focus();
					}
				}
			}
		});

		document.getElementById('merge-dependabot-save-config').addEventListener('click', () => {
			const username = document.getElementById('merge-dependabot-config-username').value;
			const orgs = document.getElementById('merge-dependabot-config-orgs').value;
			const mergeDelay = parseInt(document.getElementById('merge-dependabot-config-merge-delay').value, 10);
			safeGM_setValue('github_username', username);
			safeGM_setValue('github_orgs', orgs);
			delay = Number.isFinite(mergeDelay) ? Math.max(1000, mergeDelay) : 2000;
			safeGM_setValue('merge_delay', delay);
			const botUsernamesInput = document.getElementById('merge-dependabot-config-bot-usernames').value;
			const botUsernames = botUsernamesInput
				.split(',')
				.map((username) => username.trim())
				.filter(Boolean);
			safeGM_setValue('dependabot_usernames', botUsernames);
			alert('Configuration saved!');
			configPanel.remove();
			if (lastFocused) lastFocused.focus();
		});

		document.getElementById('merge-dependabot-reset-token').addEventListener('click', () => {
			safeGM_setValue('github_token', null);
			safeGM_setValue('encryption_key', null);
			alert('Token and encryption key have been reset. Please reload and re-enter your token.');
			configPanel.remove();
			if (lastFocused) lastFocused.focus();
		});

		document.getElementById('merge-dependabot-close-config').addEventListener('click', () => {
			configPanel.remove();
			if (lastFocused) lastFocused.focus();
		});
	}

	function addCogToMergeButton() {
		const mergeButton = document.querySelector('.merge-dependabot-merge-button');
		if (mergeButton) {
			// Create the cog icon
			const cogIcon = document.createElement('span');
			cogIcon.textContent = '⚙️';
			cogIcon.style = `
				margin-left: 10px;
				cursor: pointer;
				font-size: 1.2em;
			`;
			cogIcon.title = 'Settings';

			// Attach the click event to open the configuration panel
			cogIcon.addEventListener('click', (event) => {
				event.stopPropagation(); // Prevent triggering the merge button click
				showConfigPanel();
			});

			// Append the cog icon to the merge button
			mergeButton.appendChild(cogIcon);
		}
	}

	startPageLifecycle();
})();
