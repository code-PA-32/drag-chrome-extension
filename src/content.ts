const head = document.head;
const metaTags = Array.from(head.querySelectorAll('meta')).map(meta => ({
  name: meta.getAttribute('name'),
  content: meta.getAttribute('content')
}));

const userEmailMeta = metaTags.find(meta => meta.name === 'fb4s-auth-user-email');
const listingIdMeta = metaTags.find(meta => meta.name === 'fb4s-listing-mls');

const userEmail = userEmailMeta ? userEmailMeta.content : null;
const listingId = listingIdMeta ? listingIdMeta.content : null;

void chrome.runtime.sendMessage({ userEmail, listingId });
