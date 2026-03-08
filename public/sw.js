// Kill-switch service worker to remove old PWA cache and unregister itself.

self.addEventListener('install', (event) => {
  // Take control immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Clear all caches belonging to this origin
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));

      // Unregister this service worker so future loads are not controlled
      await self.registration.unregister();

      // Reload all open clients so they pick up the non‑PWA version
      const clients = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });
      for (const client of clients) {
        client.navigate(client.url);
      }
    })()
  );
});

