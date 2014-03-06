/**
 * Globale applicatie settings definitie.
 */
define(function () {
    var ws = new WebSocket('ws://localhost:8001');
    var wsListeners = new Array();

    ws.onmessage = function(websocketEvent) {
        var websocketData = JSON.parse(websocketEvent.data);
        wsListeners.forEach(function(listener) {
            listener.call(websocketEvent, websocketData);
        });
    }

    ws.onopen = function (evt) {
        console.log('connectie geopend');
    };

    return {
        pageTitle: "Javascript training - DEMO App",
        currentUser: null,
        "addWebsocketListener": function (listener) {
            wsListeners.push(listener);
        }
    };
});