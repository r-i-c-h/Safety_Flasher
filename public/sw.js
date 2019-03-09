/*eslint-disable*/
let version = '1.02';
const NAME_VER = `safetyFlasher-${version}`;
const URL_CACHE_LIST = [
  '/',
  '/favicon.ico',
  '/styles.css',
  '/src.js',
  '/index.html',
  '/swInstallHelper.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css?family=Source+Sans+Pro'
];
/*eslint-enable*/

// I. GET STUFF
self.addEventListener('install', e => {
  e.waitUntil(
    caches
      .open(NAME_VER)
      .then(cache => {
        return cache.addAll(URL_CACHE_LIST);
      })
      .then(() => self.skipWaiting())
      .catch(err => {
        console.error('Install PROBLEM!:', err);
      })
  );
});

// II. CLEAN-UP
self.addEventListener('activate', e => {
  console.log(`Activating...`);
  e.waitUntil(
    caches
      .keys()
      .then(cacheKeysArr =>
        Promise.all(
          cacheKeysArr.map(cacheName => {
            if (!(cacheName === NAME_VER)) {
              console.log(`Updating ${cacheName} to ${NAME_VER}`);
              return caches.delete(cacheName);
            }
          })
        )
      )
      .catch(err => console.error('Install PROBLEM!:', err))
  );
  self.clients.claim(); // Any tab that can talk to me, talk to *ME*, not an earlier version
});

/* III. FETCH MANIPULATION */
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cacheResult => {
      if (cacheResult) {
        console.log(`Using cached-response for ${e.request.url}`);
        return cacheResult;
      } // Else...
      return fetch(e.request);
    })
  );
});
