//Criação de cache
var CACHE_NAME = 'my-site-cache-v1';

//Arquivos para cache
var urlsToCache = [
    '/',
    '/img/mstile-150x150.png',
    '/img/apple-touch-icon.png',
    '/img/android-chrome-192x192.png',
    '/img/apple-touch-icon.png',
    '/img/favicon.ico',
    '/index.html'
];

//INSTALAR SERVICE WORKER
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME) //Instância o cache
            .then(function (cache) {
                console.log('Cache instânciado');
                return cache.addAll(urlsToCache); //Adiciona arquivos em cache
            })
    );
});

//CACHE E SOLICITAÇÕES DE RETORNO
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request) //Encontra todas os resultados armazenados em qualquer um dos caches criados  
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                
                var fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    function (response) {
                        //Verificação se a chamada é valida e é do tipo 'basic'.
                        //Isso significa que a solicitação de ativos de terceiros não são armazenadas no cache.
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        //Armazenamento de novas solicitações
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            }
        )
    );
});

//ATUALIZAR O SERVICE WORKER
self.addEventListener('activate', function(event) {

    var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
  
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });