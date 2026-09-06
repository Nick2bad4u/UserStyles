document.addEventListener("DOMContentLoaded", function () {
    console.log("Document loaded");

    // Fetch and display cookies
    refreshCookies();

    // Load saved preferences
    const disableSteamCommunityCheckbox = document.getElementById(
        "disableSteamCommunity"
    );
    const disableStoreCheckbox = document.getElementById("disableStore");
    const disableFetchCheckbox = document.getElementById("disableFetch");
    const fetchIntervalInput = document.getElementById("fetchInterval");
    const enableNotificationsCheckbox = document.getElementById(
        "enableNotifications"
    );
    const saveIndicator = document.getElementById("saveIndicator");
    //	const lastFetchedElement = document.getElementById('lastFetched');
    const importExportArea = document.getElementById("importExportArea");

    chrome.storage.sync.get(
        [
            "disableSteamCommunity",
            "disableStore",
            "disableFetch",
            "fetchInterval",
            "enableNotifications",
        ],
        (result) => {
            if (chrome.runtime.lastError) {
                console.error(
                    "Error loading preferences:",
                    chrome.runtime.lastError
                );
            } else {
                disableSteamCommunityCheckbox.checked =
                    result.disableSteamCommunity || false;
                disableStoreCheckbox.checked = result.disableStore || false;
                disableFetchCheckbox.checked = result.disableFetch || false;
                fetchIntervalInput.value = result.fetchInterval || 60;
                enableNotificationsCheckbox.checked =
                    result.enableNotifications || false;
                console.log("Preferences loaded:", result);
            }
        }
    );

    // Show save indicator
    function showSaveIndicator() {
        saveIndicator.style.display = "block";
        setTimeout(() => {
            saveIndicator.style.display = "none";
        }, 2000);
    }

    // Save preferences when checkboxes are clicked
    function addSaveListener(element, key) {
        element.addEventListener("change", () => {
            const value =
                element.type === "checkbox" ? element.checked : element.value;
            chrome.storage.sync.set({ [key]: value }, () => {
                if (chrome.runtime.lastError) {
                    console.error(
                        `Error saving ${key}:`,
                        chrome.runtime.lastError
                    );
                } else {
                    console.log(`Saved ${key}:`, value);
                    showSaveIndicator();
                }
            });
        });
    }

    addSaveListener(disableSteamCommunityCheckbox, "disableSteamCommunity");
    addSaveListener(disableStoreCheckbox, "disableStore");
    addSaveListener(disableFetchCheckbox, "disableFetch");
    addSaveListener(fetchIntervalInput, "fetchInterval");
    addSaveListener(enableNotificationsCheckbox, "enableNotifications");

    // Save preferences when fetch interval input is changed
    fetchIntervalInput.addEventListener("input", () => {
        const value = fetchIntervalInput.value;
        chrome.storage.sync.set({ fetchInterval: value }, () => {
            if (chrome.runtime.lastError) {
                console.error(
                    "Error saving fetchInterval:",
                    chrome.runtime.lastError
                );
            } else {
                console.log("Saved fetchInterval:", value);
                showSaveIndicator();
            }
        });
    });

    // Clear cookies
    document.getElementById("clearCookies").addEventListener("click", () => {
        chrome.storage.local.remove("steamCookies", () => {
            if (chrome.runtime.lastError) {
                console.error(
                    "Error clearing cookies:",
                    chrome.runtime.lastError
                );
            } else {
                console.log("Cookies cleared");
                refreshCookies();
            }
        });
    });

    // Export cookies
    document.getElementById("exportCookies").addEventListener("click", () => {
        chrome.storage.local.get("steamCookies", (data) => {
            if (chrome.runtime.lastError) {
                console.error(
                    "Error getting cookies for export:",
                    chrome.runtime.lastError
                );
            } else {
                importExportArea.value = JSON.stringify(
                    data.steamCookies,
                    null,
                    2
                );
                console.log("Cookies exported");
            }
        });
    });

    // Import cookies
    document.getElementById("importCookies").addEventListener("click", () => {
        try {
            const cookies = JSON.parse(importExportArea.value);
            chrome.storage.local.set({ steamCookies: cookies }, () => {
                if (chrome.runtime.lastError) {
                    console.error(
                        "Error importing cookies:",
                        chrome.runtime.lastError
                    );
                } else {
                    console.log("Cookies imported");
                    refreshCookies();
                }
            });
        } catch {
            console.error("Invalid cookie import JSON");
        }
    });
});

// Render only the requested values; never log authentication cookies.
function renderCookies(cookies = {}) {
    for (const group of ["store", "community"]) {
        const entries = Array.isArray(cookies[group]) ? cookies[group] : [];
        for (const [name, suffix] of [
            ["steamLoginSecure", "SteamLoginSecure"],
            ["sessionid", "Sessionid"],
        ]) {
            document.getElementById(`${group}${suffix}`).value =
                entries.find((cookie) => cookie?.name === name)?.value ??
                "Not found";
        }
    }
    const fetched = cookies.lastFetched
        ? new Date(cookies.lastFetched).toLocaleString()
        : "N/A";
    document.getElementById("lastFetched").textContent =
        `Last fetched: ${fetched}`;
}

// Function to refresh and display cookies
function refreshCookies() {
    chrome.storage.local.get("steamCookies", (data) => {
        if (chrome.runtime.lastError) {
            console.error("Error getting cookies:", chrome.runtime.lastError);
        } else {
            renderCookies(data.steamCookies ?? {});
        }
    });
}

// Update cookies in UI in real-time
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateCookies") {
        renderCookies(request.cookies ?? {});
        sendResponse({ status: "updated" });
    }
});
