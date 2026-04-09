(() => {
	'use strict';

	const VOLUME_KEY = 'youtubeTVVolume';
	const DEFAULT_VOLUME = 5;

	const getValue = (key, defaultValue) => {
		return new Promise((resolve) => {
			chrome.storage.local.get([key], (result) => {
				resolve(result[key] !== undefined ? result[key] : defaultValue);
			});
		});
	};

	const setValue = (key, value) => {
		return new Promise((resolve) => {
			chrome.storage.local.set(
				{
					[key]: value,
				},
				() => {
					resolve();
				},
			);
		});
	};

	const createVolumeUI = async () => {
		const sliderContainer = document.querySelector(
			'.ytu-player-controls.style-scope.ypcs-volume-control-slot.ypcs-control .ytu-volume-slider.style-scope.volume-button-slot',
		);
		if (!sliderContainer) {
			console.error('Volume slider container not found, cannot create UI');
			return;
		}

		const savedVolume = await getValue(VOLUME_KEY, DEFAULT_VOLUME);

		// Create input box
		const volumeInput = document.createElement('input');
		volumeInput.type = 'number';
		volumeInput.min = 0;
		volumeInput.max = 100;
		volumeInput.value = savedVolume;
		volumeInput.style.width = '35px';
		volumeInput.style.height = '24px';
		volumeInput.style.marginLeft = '10px';
		volumeInput.style.marginRight = '10px';
		volumeInput.style.border = '1px solid #ccc';
		volumeInput.style.background = '#1c1c1c';
		volumeInput.style.color = '#fff';
		volumeInput.style.textAlign = 'center';
		volumeInput.style.borderRadius = '4px';
		volumeInput.style.outline = 'none';

		// Create a wrapper to position it properly
		const wrapper = document.createElement('div');
		wrapper.style.display = 'flex';
		wrapper.style.alignItems = 'center';
		wrapper.style.marginRight = '10px';

		// Insert the input box into the correct container
		wrapper.appendChild(volumeInput);
		sliderContainer.parentNode.insertBefore(wrapper, sliderContainer);

		// Prevent key events from propagating while typing
		volumeInput.addEventListener('keydown', (e) => {
			e.stopPropagation();
		});

		// Event listener for manual input changes
		volumeInput.addEventListener('input', (e) => {
			let newValue = parseFloat(e.target.value);
			if (newValue < 0) newValue = 0;
			if (newValue > 100) newValue = 100;
			void setVolume(newValue);
		});

		// Function to update input when slider moves
		const slider = document.querySelector(
			'tp-yt-paper-slider[role="slider"].ytu-volume-slider',
		);
		const updateInput = () => {
			volumeInput.value = slider.getAttribute('value');
		};

		// Observe slider changes
		const observer = new MutationObserver(updateInput);
		observer.observe(slider, {
			attributes: true,
			attributeFilter: ['value'],
		});
	};

	const setVolume = async (value) => {
		const slider = document.querySelector(
			'tp-yt-paper-slider[role="slider"].ytu-volume-slider',
		);
		if (slider) {
			console.log(`Setting volume to: ${value}`);
			slider.value = value;
			slider.setAttribute('value', value);
			slider.dispatchEvent(
				new Event('input', {
					bubbles: true,
				}),
			);
			slider.dispatchEvent(
				new Event('change', {
					bubbles: true,
				}),
			);
		} else {
			console.error('Volume slider not found');
		}
		await setValue(VOLUME_KEY, value);
	};

	const loadSavedVolume = async () => {
		const savedVolume = await getValue(VOLUME_KEY, DEFAULT_VOLUME);
		const slider = document.querySelector(
			'tp-yt-paper-slider[role="slider"].ytu-volume-slider',
		);
		if (slider) {
			console.log(`Applying saved volume: ${savedVolume}`);
			void setVolume(savedVolume);
		} else {
			console.log('Slider not ready, retrying in 500ms');
			setTimeout(() => {
				void loadSavedVolume();
			}, 500);
		}
	};

	const tryLoadVolume = () => {
		const slider = document.querySelector(
			'tp-yt-paper-slider[role="slider"].ytu-volume-slider',
		);
		const sliderContainer = document.querySelector(
			'.ytu-player-controls.style-scope.ypcs-volume-control-slot.ypcs-control .ytu-volume-slider.style-scope.volume-button-slot',
		);

		if (slider && sliderContainer) {
			void loadSavedVolume().then(createVolumeUI);
		} else {
			console.error(
				'Volume slider or container not found, retrying in 3 seconds',
			);
			setTimeout(tryLoadVolume, 3000);
		}
	};

	const observeSliderChanges = () => {
		const slider = document.querySelector(
			'tp-yt-paper-slider[role="slider"].ytu-volume-slider',
		);
		if (slider) {
			console.log('Observing the volume slider for changes');
			const observer = new MutationObserver((mutationsList) => {
				void (async () => {
					for (const mutation of mutationsList) {
						if (
							mutation.type === 'attributes' &&
							mutation.attributeName === 'value'
						) {
							const currentValue = slider.getAttribute('value');
							console.log(`Current volume changed to: ${currentValue}`);
							await setValue(VOLUME_KEY, currentValue);
							// Update the volume in the UI based on currentValue
						}
					}
				})();
			});
			observer.observe(slider, {
				attributes: true,
				attributeFilter: ['value'],
			});
		} else {
			console.error('Volume slider not found during initialization');
			setTimeout(observeSliderChanges, 1000);
		}
	};

	window.addEventListener('load', () => {
		console.log('YouTube TV Volume Rememberer script with UI loaded');
		setTimeout(() => {
			tryLoadVolume();
			observeSliderChanges();
		}, 1000);
	});

	window.addEventListener('keydown', (event) => {
		const slider = document.querySelector(
			'tp-yt-paper-slider[role="slider"].ytu-volume-slider',
		);
		if (!slider) return;

		const isShiftPressed = event.shiftKey;

		if (isShiftPressed && event.key === 'ArrowUp') {
			const newValue = Math.min(parseFloat(slider.value) + 5, 100);
			void setVolume(newValue);
		} else if (isShiftPressed && event.key === 'ArrowDown') {
			const newValue = Math.max(parseFloat(slider.value) - 5, 0);
			void setVolume(newValue);
		}
	});
})();
