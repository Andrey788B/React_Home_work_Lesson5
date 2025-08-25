const CACHE_NAME = 'homeapp-cache-v1';
const ASSETS = [
  '/',                  
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/icons/icon-48-48.png',
  '/icons/icon-72-72.png',
  '/icons/icon-96-96.png',
  '/icons/icon-144-144.png',
  '/icons/icon-192-192.png',
  '/icons/icon-512-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys
        .filter((key) => key !== CACHE_NAME)
        .map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {

        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(()=>{});
        return res;
      }).catch(() => {

        return caches.match('/index.html');
      });
    })
  );
});