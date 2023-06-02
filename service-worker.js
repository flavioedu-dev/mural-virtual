// service-worker.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('cache-name')
      .then((cache) => {
        return cache.addAll([
          '/',
          './css',
          './scripts',
          './img/board-logo-128px.png',
          './img/board-logo-512px.png'
        ]);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
