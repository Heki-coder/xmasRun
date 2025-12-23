const cacheName = "DefaultCompany-Christmas Run-1.0";
const contentToCache = [
    "Build/4fb3b3c9e6a5b23775b03332c88676b7.loader.js",
    "Build/96471e92190397fbd7033d6881327651.framework.js.unityweb",
    "Build/217826925e06aa653d410198985c8b84.data.unityweb",
    "Build/dfe956a7ba1bfc2b8b09bbb8c61c6b70.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
