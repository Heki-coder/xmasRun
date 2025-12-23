const cacheName = "DefaultCompany-Christmas Run-1.0";
const contentToCache = [
    "Build/427e05ab29316764256488ab96b78642.loader.js",
    "Build/be345514d031976918f1b4e3f6d54979.framework.js.unityweb",
    "Build/bf98ce944be122d0eb72cb403533104c.data.unityweb",
    "Build/818b6ea0ebadf23df1a6372bc5e6b36f.wasm.unityweb",
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
