/**
 * Service Worker for LocalStore Menu
 * Provides offline caching and faster repeat visits
 * 
 * Strategy: Stale-While-Revalidate for most resources
 * - Serve from cache immediately (fast)
 * - Fetch fresh version in background (up-to-date)
 */

const CACHE_NAME = 'localstore-menu-v1';

// Assets to cache on install
const STATIC_ASSETS = [
  '/manifest.json',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch event - stale-while-revalidate strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip API requests - always fetch fresh
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Skip Next.js internal requests in development
  if (url.pathname.startsWith('/_next/') && url.pathname.includes('webpack')) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(request);
      
      // Fetch fresh version in background
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          // Cache successful responses
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(() => {
          // Network failed, return cached or offline fallback
          return cachedResponse;
        });

      // Return cached response immediately, or wait for network
      return cachedResponse || fetchPromise;
    })
  );
});
