chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    const currentUrl = tab.url ?? "";
    void chrome.storage.local.set({currentUrl});
  });
});

chrome.tabs.onUpdated.addListener((_, change, tab) => {
  if (tab.active && change.url) {
    void chrome.storage.local.set({currentUrl: change.url});
  }
});

chrome.runtime.onMessage.addListener((message, _, __) => {
  if (message.userEmail || message.listingId) {
    const metaData = {
      userEmail: message.userEmail,
      listingId: message.listingId
    }
    void chrome.storage.local.set({
      metaData
    });
  }
});