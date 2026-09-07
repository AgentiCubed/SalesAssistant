/* ============================================================
   SALES ASSISTANT — NETWORK-FIRST SERVICE WORKER (v30)
   Always fetches fresh content when online, falls back to cache offline.
   ============================================================ */

const CACHE_NAME = "sales-assistant-v30";

const PRECACHE_URLS = [
  "./",
  "index.html",
  "css/styles.css?v=30",
  "js/data.js?v=30",
  "js/battlecards.js?v=30",
  "js/catalog.js?v=30",
  "js/route.js?v=30",
  "js/app.js?v=30",
  "vendor/leaflet/leaflet.css",
  "vendor/leaflet/leaflet.js",
  "manifest.webmanifest",
];

// Install: precache and skip waiting immediately
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn("Precache failed partially:", err);
      });
    })
  );
});

// Activate: purge ALL old caches and claim clients immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Purging old cache:", key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-First with Cache Fallback
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // If valid response, clone and update cache
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone).catch(() => {});
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Offline or network error: return cached version
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === "navigate") {
            return caches.match("index.html");
          }
        });
      })
  );
});
