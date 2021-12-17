let CACHE_NAME = "my-site-cache-v1";
// add complete site to cache

const urlsToCache = [
	"/",
	"/index.html",
	"/index.js",
	"/index.css",
	"/manifest.json",
	"/images/icon-192x192.png",
	"/images/icon-512x512.png",
	"/static/js/bundle.js",
	"/static/js/vendors~main.chunk.js",
	"/static/js/main.chunk.js",
	"/images/Liked.svg",
	// "/images/Facebook.svg",
	// "/images/Twitter.svg",
	// "/images/Google.svg",
	// "/images/NotLiked.svg",
];
self.addEventListener("install", function (event) {
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(urlsToCache);
		})
	);
});
self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches.match(event.request).then(function (response) {
			if (response) {
				return response;
			}
			return fetch(event.request);
		})
	);
	self.skipWaiting();
});

// set update on reload true

// custom install event
