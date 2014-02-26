/**
 * Globale applicatie settings definitie.
 */
define(function(){
   var ws = new WebSocket('ws://localhost:8001');

    ws.onopen = function(evt) {
        console.log('connectie geopend');
    };

   return {
       pageTitle: "Javascript training - DEMO App",
       currentUser: null,
       webSocket: ws
   };
});