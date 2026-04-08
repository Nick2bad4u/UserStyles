chrome.runtime.onInstalled.addListener(() => {
	const ytVolumeObject = {
		data: JSON.stringify({
			volume: 1, // Volume from 0 to 100
			muted: false,
		}),
		expiration: Date.now() + 2592000000, // Expires in 30 days
		creation: Date.now(),
	};
	const ytVolumeString = JSON.stringify(ytVolumeObject);

	// Set the yt-player-volume in chrome.storage.local
	chrome.storage.local.set({ 'yt-player-volume': ytVolumeString }, () => {
		console.log('yt-player-volume set in chrome.storage.local');
	});

	// Set the default volume using chrome.storage.sync
	chrome.storage.sync.set(
		{
			youtubeVolume: 1,
		},
		() => {
			console.log('Default volume set to 1');
		},
	);
});
