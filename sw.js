// Service worker de Cinemateca
const CACHE = 'cinemateca-v1';
const IMG_CACHE = 'cinemateca-img-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== IMG_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  if (u.origin === location.origin) {
    // App shell: caché primero, actualización en segundo plano
    e.respondWith(
      caches.match(e.request).then(cached => {
        const fresh = fetch(e.request).then(res => {
          if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          return res;
        }).catch(() => cached);
        return cached || fresh;
      })
    );
  } else if (u.hostname === 'image.tmdb.org') {
    // Pósters: caché permanente (stale-while-revalidate ligero)
    e.respondWith(
      caches.open(IMG_CACHE).then(async c => {
        const cached = await c.match(e.request);
        if (cached) return cached;
        try {
          const res = await fetch(e.request);
          if (res.ok) c.put(e.request, res.clone());
          return res;
        } catch (err) {
          return cached || Response.error();
        }
      })
    );
  }
  // API (TMDB/OMDb/Supabase): siempre red, sin caché
});
