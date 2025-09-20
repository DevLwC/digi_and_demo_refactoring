// Register the service worker for PWA support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/js/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful:', registration.scope);
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// You can add more global JS logic here as needed
