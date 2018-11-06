(function(){

    //Strict: Modo estrito, quebra de codigos legados 
    'use strict'; 

    //REGISTRO DE SERVICE WORKER
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registrado com sucesso: ', registration.scope);
          }).catch(function(err) {
            console.log('ServiceWorker registrado com falha: ', err);
          });
        });
    }
})();