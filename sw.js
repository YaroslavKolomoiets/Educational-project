self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open("static")
            .then(function(cache){
                console.log("precaching");
                cache.add('/HomePage.html');
                cache.add('/');
            })
    )
  });
  self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ...', event);
    return self.clients.claim();
 });
   self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response)
                    return response;
                else
                    return fetch(event.request);
            })
    )
  });

  self.addEventListener('push', event => {
    const notification = event.data.text();
    self.registration.showNotification(notification, {});
 })
 function askPermission() {
    return new Promise(function (resolve, reject) {
        const permissionResult = Notification.requestPermission(function (result) {
            resolve(result);
        });


        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    })
        .then(function (permissionResult) {
if (permissionResult !== "granted")
                    throw new Error('We weren\'t granted permission.');
        });
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function () {
            console.log('Service worker registered!');
        });


}


navigator.serviceWorker.ready.then(registration => {
    if ('PushManager' in window) {
        document.querySelector('button.subscribe-for-push')
            .addEventListener('click', () => {
                if (confirm("Ви згодні отримувати повідомлення?") == true) {
                    askPermission();
                }
            });
    }
})
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('/sw.js')
    .then(function() {
        console.log('Service worker registered!'); // test
    });
}

 