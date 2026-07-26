/**
 * VibeCafe service worker.
 *
 * Chrome will not fire `beforeinstallprompt` unless a service worker with a
 * fetch handler is controlling the page, so without this the in-app install
 * button never appears on Android or desktop Chrome.
 *
 * This deliberately caches as little as possible. An earlier version of the app
 * shipped an aggressive caching worker that served stale builds, which is why
 * the previous file here was a kill-switch. The `activate` handler below still
 * does that cleanup: it deletes every cache that is not the current one.
 *
 * Bump CACHE to invalidate everything.
 */
const CACHE = 'vibecafe-v1';

// The shell needed to boot offline. Hashed build assets are not listed -- they
// are picked up opportunistically by the fetch handler instead, so this list
// never goes out of date with the build.
const SHELL = ['/', '/index.html', '/manifest.webmanifest', '/icon-192.png', '/favicon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Music streams from the Internet Archive, analytics, and anything else
  // cross-origin are left entirely alone. Caching audio here would blow through
  // storage quota and break range requests, which is how seeking works.
  if (url.origin !== self.location.origin) return;

  // Navigations: network first, so a new deploy is picked up immediately. The
  // cached shell is only a fallback for being offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(CACHE);
          cache.put('/index.html', fresh.clone());
          return fresh;
        } catch {
          return (await caches.match('/index.html')) ?? Response.error();
        }
      })(),
    );
    return;
  }

  // Build output under /assets is content-hashed, so a cache hit can never be
  // stale -- a changed file has a different filename.
  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const fresh = await fetch(request);
        if (fresh.ok && fresh.type === 'basic') {
          const cache = await caches.open(CACHE);
          cache.put(request, fresh.clone());
        }
        return fresh;
      } catch {
        return Response.error();
      }
    })(),
  );
});
