var Hapi = require('hapi');
var routes = require('./routes');

var config = { };
var server = new Hapi.createServer('localhost', 8000, config);
server.pack.require({ lout: { endpoint: '/docs' } }, function (err) {
    if (err) {
        console.log('Failed loading plugins');
    }
});

server.addRoutes(routes);

server.start();