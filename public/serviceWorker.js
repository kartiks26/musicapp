let CACHE_NAME = "my-site-cache-v1";
// add complete site to cache

const urlsToCache = [
	"/",
	"/index.html",
	// "/index.js",
	// "/index.css",
	"/manifest.json",
	// "/images/icon-192x192.png",
	// "/images/icon-512x512.png",
	"/static/js/bundle.js",
	"/static/js/main.02e965e1.chunk.js",
	"/static/js/index.js",
	"/static/js/App.js",
	"/static/js/2.2b27f9d8.chunk.js",
	"/static/js/context/*.js",
	"/static/js/components/*.js",
	"/static/css/main.e2c5ab1e.chunk.css",

	"/images/Liked.svg",
	"/images/NotLiked.svg",
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
