// ==UserScript==
// @name         YouTube Volume Control with Memory
// @namespace    nick2bad4u.github.io
// @version      5.0.0
// @description  Set YouTube volume manually on a scale of 1-100, remember last set volume, and inject the UI to the left of the volume slider on the video player.
// @author       Nick2bad4u
// @match        *://www.youtube.com/*
// @run-at       document-idle
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        GM.getValue
// @grant        GM.setValue
// @license      UnLicense
// @downloadURL  https://update.greasyfork.org/scripts/513759/YouTube%20Volume%20Control%20with%20Memory.user.js
// @updateURL    https://update.greasyfork.org/scripts/513759/YouTube%20Volume%20Control%20with%20Memory.meta.js
// @tag          youtube
// ==/UserScript==

void (async function () {
	'use strict';

	const STORAGE_KEY = 'youtubeVolume';
	const DEFAULT_VOLUME = 10;

	let player = null;
	let volumeInput = null;
	let volumePanel = null;
	let boundPlayer = null;
	let unbindPlayer = null;
	let suppressVolumeEvent = 0;
	let suppressionId = 0;
	let lastSetVolume = DEFAULT_VOLUME;
	let lastUnmutedVolume = DEFAULT_VOLUME;
	const initializedPlayers = new WeakSet();
	let rafScheduled = false;

	const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
	const parseVolume = (value) => {
		const parsed = Number.parseInt(value, 10);
		return Number.isNaN(parsed) ? null : clamp(parsed, 0, 100);
	};

	const setInputValue = (value) => {
		if (!volumeInput) {
			return;
		}
		volumeInput.value = String(clamp(value, 0, 100));
	};

	const persistVolume = (value) => {
		void GM.setValue(STORAGE_KEY, clamp(value, 0, 100)).catch(() => {});
	};

	const createVolumeInput = () => {
		const input = document.createElement('input');

		input.type = 'number';
		input.min = '0';
		input.max = '100';
		input.step = '1';
		input.inputMode = 'numeric';
		input.title = 'YouTube volume (0-100)';
		input.setAttribute('aria-label', 'YouTube volume (0-100)');
		Object.assign(input.style, {
			width: '38px',
			marginRight: '10px',
			backgroundColor: 'rgba(255, 255, 255, 0)',
			color: 'white',
			border: '0px solid rgba(255, 255, 255, 0)',
			borderRadius: '4px',
			zIndex: '9999',
			height: '24px',
			fontSize: '16px',
			padding: '0 4px',
			transition: 'border-color 0.3s, background-color 0.3s',
			outline: 'none',
			position: 'relative',
			top: '13px',
		});

		input.addEventListener('focus', () => {
			input.style.borderColor = 'rgba(255, 255, 255, 0.6)';
		});
		input.addEventListener('blur', () => {
			input.style.borderColor = 'rgba(255, 255, 255, 0.3)';
		});
		input.addEventListener('mouseenter', () => {
			input.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
		});
		input.addEventListener('mouseleave', () => {
			input.style.backgroundColor = 'rgba(255, 255, 255, 0)';
		});

		input.addEventListener('keydown', (event) => {
			event.stopPropagation();
		});

		input.addEventListener('input', () => {
			const parsed = parseVolume(input.value);
			if (parsed === null) {
				setInputValue(lastSetVolume);
				return;
			}
			applyVolume(parsed);
		});
		input.addEventListener('change', () => {
			if (!input.value) {
				setInputValue(lastSetVolume);
				return;
			}
			const parsed = parseVolume(input.value);
			if (parsed === null) {
				setInputValue(lastSetVolume);
				return;
			}
			applyVolume(parsed);
		});

		return input;
	};

	const applyVolume = (nextValue) => {
		if (!player) {
			return;
		}

		const volume = clamp(Math.round(nextValue), 0, 100);
		const seq = ++suppressionId;
		suppressVolumeEvent = seq;

		if (volume === 0) {
			player.volume = 0;
			player.muted = true;
		} else {
			player.volume = volume / 100;
			player.muted = false;
			lastUnmutedVolume = volume;
		}

		lastSetVolume = volume;
		setInputValue(volume);
		persistVolume(volume);

		requestAnimationFrame(() => {
			if (suppressVolumeEvent === seq) {
				suppressVolumeEvent = 0;
			}
		});
	};

	const onVolumeChange = () => {
		if (!player) {
			return;
		}

		if (suppressVolumeEvent) {
			suppressVolumeEvent = 0;
			setInputValue(player.muted ? 0 : clamp(Math.round(player.volume * 100), 0, 100));
			return;
		}

		const currentVolume = clamp(Math.round(player.volume * 100), 0, 100);

		if (player.muted || currentVolume === 0) {
			setInputValue(0);
			persistVolume(player.muted ? lastUnmutedVolume : currentVolume);
			return;
		}

		lastUnmutedVolume = currentVolume;
		lastSetVolume = currentVolume;
		setInputValue(currentVolume);
		persistVolume(currentVolume);
	};

	const bindPlayer = () => {
		if (!player || boundPlayer === player) {
			return;
		}
		const targetPlayer = player;

		if (unbindPlayer) {
			unbindPlayer();
		}

		targetPlayer.addEventListener('volumechange', onVolumeChange);
		boundPlayer = targetPlayer;
		unbindPlayer = () => {
			targetPlayer.removeEventListener('volumechange', onVolumeChange);
			unbindPlayer = null;
			boundPlayer = null;
		};

		if (!initializedPlayers.has(player)) {
			initializedPlayers.add(player);
			applyVolume(lastSetVolume);
		} else {
			onVolumeChange();
		}
	};

	const ensureInjected = () => {
		if (!volumeInput) {
			volumeInput = createVolumeInput();
			setInputValue(lastSetVolume);
		}

		if (!volumePanel || !volumePanel.parentNode) {
			return;
		}

		if (volumeInput.parentNode !== volumePanel.parentNode) {
			volumePanel.parentNode.insertBefore(volumeInput, volumePanel);
		}
	};

	const sync = () => {
		const nextPlayer = document.querySelector('video');
		const nextPanel = document.querySelector('.ytp-volume-panel');
		player = nextPlayer;
		volumePanel = nextPanel;

		if (!player || !volumePanel) {
			return;
		}

		ensureInjected();
		bindPlayer();
	};

	const scheduleSync = () => {
		if (rafScheduled) {
			return;
		}
		rafScheduled = true;
		requestAnimationFrame(() => {
			rafScheduled = false;
			sync();
		});
	};

	const observer = new MutationObserver(scheduleSync);
	observer.observe(document.body, { childList: true, subtree: true });

	window.addEventListener('yt-navigate-finish', scheduleSync);
	window.addEventListener('yt-page-data-updated', scheduleSync);
	window.addEventListener('load', scheduleSync);
	window.addEventListener('resize', scheduleSync);
	window.addEventListener('beforeunload', () => {
		observer.disconnect();
		if (unbindPlayer) {
			unbindPlayer();
		}
	});

	const initial = await GM.getValue(STORAGE_KEY, DEFAULT_VOLUME);
	const normalized = parseVolume(initial);
	if (normalized !== null) {
		lastSetVolume = normalized;
		if (normalized > 0) {
			lastUnmutedVolume = normalized;
		}
	}

	setInputValue(lastSetVolume);
	scheduleSync();
})();
