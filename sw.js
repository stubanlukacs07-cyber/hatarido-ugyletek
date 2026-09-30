// Offline cache for the app shell. Exchange-rate and GitHub API calls always go to the network.
const CACHE = 'hatarido-v2';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // pages: always ask GitHub for the newest version (no stale browser cache); fall back to the saved copy when offline
  const isPage = e.request.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('.html');
  const net = isPage ? fetch(url.href, {cache: 'no-cache', credentials: 'same-origin'}) : fetch(e.request);
  e.respondWith(net.then(r => { if (r.ok && !url.search) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(isPage ? './index.html' : e.request, copy)); } return r; })
    .catch(() => caches.match(isPage ? './index.html' : e.request).then(m => m || caches.match('./index.html'))));
});
