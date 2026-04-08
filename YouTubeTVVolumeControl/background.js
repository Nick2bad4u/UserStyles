chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set(
		{
			youtubeTVVolume: 5,
		},
		() => {
			console.log('Default volume set to 5');
		},
	);
});
