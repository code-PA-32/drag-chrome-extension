chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    const currentUrl = tab.url ?? "";
    void chrome.storage.local.set({currentUrl});
    if (currentUrl.includes("https://manojkukreja.followupboss.com/2/") || currentUrl.includes("https://manojkukreja.followupboss.com/2/people/view")) {
      chrome.runtime.onMessage.addListener((messageSc, _, __) => {
        if (messageSc.scriptList) {
          console.log(messageSc.scriptList)
          const scriptList = messageSc.scriptList;
          void chrome.storage.local.set({scriptList});
        }
      });
    }
  });
});

chrome.tabs.onUpdated.addListener((_, change, tab) => {
  if (tab.active && change.url) {
    void chrome.storage.local.set({currentUrl: change.url});
    if (change.url.includes("https://manojkukreja.followupboss.com/2/") || change.url.includes("https://manojkukreja.followupboss.com/2/people/view")) {
      chrome.runtime.onMessage.addListener((messageKs, _, __) => {
        if (messageKs.scriptList) {
          console.log(messageKs.scriptList)
          const scriptList = messageKs.scriptList;
          void chrome.storage.local.set({scriptList});
        }
      });
    }
  }
});

chrome.runtime.onMessage.addListener((message, _, __) => {
  if (message.userEmail || message.listingMls || message.listingId) {
    const metaData = {
      userEmail: message.userEmail,
      listingMls: message.listingMls,
      listingId: message.listingId
    }
    void chrome.storage.local.set({
      metaData
    });
  }
});

