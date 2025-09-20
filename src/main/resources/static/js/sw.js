self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('digidemo-cache').then(cache => {
            return cache.addAll([
                '/',
                '/css/bootstrap.min.css',
                '/js/app.js'
                // Add other static assets as needed
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
