const addDiv = () => {
  const currentDiv = document.getElementById('my-app-div')
  if (currentDiv) {
    return
  }
  const div = document.createElement('div')
  div.style.position = 'fixed'
  div.style.top = '0'
  div.style.zIndex = '214748364'
  div.id = 'my-app-div'
  document.body.appendChild(div)
}


chrome.action.onClicked.addListener((tab) => {
  if (tab.id !== undefined) {
    void chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      func: addDiv,
    }, () => {
      void chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        files: ['popup.js'],
      })
    })
  }
})

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    const currentUrl = tab.url ?? ''
    void chrome.storage.local.set({ currentUrl })
  })
})

chrome.tabs.onUpdated.addListener((_, change, tab) => {
  if (tab.active && change.url) {
    void chrome.storage.local.set({ currentUrl: change.url })
  }
})
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    void chrome.storage.local.set({ currentUrl: 'chrome://extensions/' })
  } else if (details.reason === 'update') {
    chrome.tabs.onActivated.addListener((activeInfo) => {
      chrome.tabs.get(activeInfo.tabId, (tab) => {
        const currentUrl = tab.url ?? ''
        void chrome.storage.local.set({ currentUrl })
      })
    })
  }
})

chrome.tabs.onUpdated.addListener((_, change, tab) => {
  if (tab.active && change.url) {
    chrome.runtime.onMessage.addListener((message, _, __) => {
      if (message.listingMls || message.listingId) {
        const metaData = {
          listingMls: message.listingMls,
          listingId: message.listingId,
        }
        void chrome.storage.local.set({
          metaData,
        })
      }
    })
  }
})
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.runtime.onMessage.addListener((message, _, __) => {
      if (message.listingMls || message.listingId) {
        const metaData = {
          listingMls: message.listingMls,
          listingId: message.listingId,
        }
        void chrome.storage.local.set({
          metaData,
        })
      }
    })
  } else if (details.reason === 'update') {
    chrome.runtime.onMessage.addListener((message, _, __) => {
      if (message.listingMls || message.listingId) {
        const metaData = {
          listingMls: message.listingMls,
          listingId: message.listingId,
        }
        void chrome.storage.local.set({
          metaData,
        })
      }
    })
  }
})

chrome.runtime.onMessage.addListener((message, _, __) => {
  if (message.listingMls || message.listingId) {
    const metaData = {
      listingMls: message.listingMls,
      listingId: message.listingId,
    }
    void chrome.storage.local.set({
      metaData,
    })
  }
})

chrome.runtime.onMessage.addListener(
  function(request, _, __) {
    if (request.action == "showNotification") {
      chrome.notifications.create('testNotification', {
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Notification Title',
        message: 'You clicked the button!',
        priority: 2
      }, () => {
        console.log('Notification created')
      });
    }
  }
);