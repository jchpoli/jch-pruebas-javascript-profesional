const VERSION = 'V1';

self.addEventListener('install', (event) => {
  //Primero se agrega en cache los que necesitemos
  event.waitUntil(precache())
})

self.addEventListener('fetch', event => {
  //Cuando ocurran peticiones, se interceptan
  const request = event.request;
  //solo los GET se cachean
  if (request.method !== 'GET') {
    return;
  }
  event.respondWith(cacheResponse(request))

  //Actualizar el cache, si falla, es porque no está en linea
  event.waitUntil(updateCache(request))
})

async function precache() {
  //open devuelve una promesa
  const cache = await caches.open(VERSION)
  cache.addAll([
/*     '/',
    '/index.html',
    '/assets/index.js',
    '/assets/MediaPlayer.js',
    '/assets/plugins/AutoPlay.js',
    '/assets/plugins/AutoPause.js',
    '/assets/index.css',
    '/assets/BigBuckBunny.mp4', */
  ])

}

async function cacheResponse(request) {
  const cache = await caches.open(VERSION)
  const response = await cache.match(request)
  //Si no está en cache, se hace la petición normal
  return response || fetch(request)

}

async function updateCache(request) {
  const cache = await caches.open(VERSION)
  const response = await fetch(request)
  return cache.put(request, response)
}

