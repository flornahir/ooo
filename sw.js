const cacheName = "app-v3";
var dataCacheName = 'app-v3';
const cacheUrls = [
    "/",
    "https://flornahir.github.io/ooo/",
    "/index.html",
    "/js/app.js",
    "/css/style.css",
    "/img/heladoo.png",
    "/img/img1.jpg",
    "/img/img2.jpg",
    "/img/img3.jpg",
    "/img/img5.jpg",
    "/img/img7.jpg",
    "/img/svg/boton-del-logo-de-facebook.svg",
    "/img/svg/boton-de-logo-del-twitter.svg",
    "/img/svg/boton-de-logo-del-instagram.svg",
    "/img/svg/svg-color/002-ice-cream-17.svg",
    "/img/svg/svg-color/035-shop.svg",
    "/img/svg/svg-color/037-avatar.svg",
    "/img/svg/svg-color/043-ice-cream-3.svg"
];

self.addEventListener("instal", function(ev) {
    ev.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
            return cache.addAll(cacheUrls);
        })
    );
});

self.addEventListener("activate", function(ev) {
    const limpiarCachePr = caches.keys().then(function(name) {
        const limpiarViejosPr = name.map((name) => {
            if (cacheName !== name) return caches.delete(name);
        });
    });
    ev.waitUntil(limpiarCachePr);
});

self.addEventListener("fetch", function(ev) {
    ev.respondWith(
        caches.match(ev.request)
        .then(function(response) {
            return searchInCacheOrMakeRequest(ev.request);
        }).catch(function(err) {
            if (ev.request.mode == 'navigate') {
                return catches.match(ev.request);
            }
        })
    )
});

function searchInCacheOrMakeRequest(request) {
    const cachePromise = caches.open(cacheName);
    const matchPromise = cachePromise.then(function(cache) {
        return cache.match(request);
    })
    return Promise.all([cachePromise, matchPromise]).then(function([cache, cacheResponse]) {
        const fetchPromise = fetch(request).then(function(fetchResponse) {
            cache.put(request, fetchResponse.clone());

            return fetchPromise;
        })

        return catcheResponse || fetchResponse;
    })
}
