var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8001});
wss.broadcast = function(data) {
    for(var i in this.clients)
        this.clients[i].send(data);
};

module.exports.websocketServer = wss;