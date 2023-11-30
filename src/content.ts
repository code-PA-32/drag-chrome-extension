const head = document.head;
const metaTags = Array.from(head.querySelectorAll('meta')).map(meta => ({
  name: meta.getAttribute('name'),
  content: meta.getAttribute('content')
}));

const userEmailMeta = metaTags.find(meta => meta.name === 'fb4s-auth-user-email');
const listingIdMeta = metaTags.find(meta => meta.name === 'fb4s-listing-mls');

const userEmail: string | null = userEmailMeta ? userEmailMeta.content : null;
const listingId: string | null = listingIdMeta ? listingIdMeta.content : null;
void chrome.runtime.sendMessage({userEmail, listingId});

const scriptList = Array.from(document.body.querySelectorAll('script')).map(script => ({
  innerText: script.innerText
}));
void chrome.runtime.sendMessage({scriptList});

setTimeout(() => {
  const scriptList = Array.from(document.body.querySelectorAll('script')).map(script => ({
    innerText: script.innerText
  }));
  void chrome.runtime.sendMessage({scriptList});
}, 5000)

document.addEventListener('DOMContentLoaded', () => {
  const scriptList1 = Array.from(document.body.querySelectorAll('script')).map(script => ({
    innerText: script.innerText
  }));
  void chrome.runtime.sendMessage({scriptList1});
});
