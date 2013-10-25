var Hapi = require('hapi');
var config = { };
var server = new Hapi.createServer('localhost', 8000, config);

// REST documentatie plugin
server.pack.require({ lout: { endpoint: '/docs' } }, function (err) {
    if (err) {
        console.log('Failed loading plugins');
    }
});

// File server route
server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: { path: '../../client', listing: true, index: true }
    }
});

// REST Gebruikers API
var gebruikerRoutes = require('./gebruikerRoutes');
server.addRoutes(gebruikerRoutes);

// REST Todos API
var todoRoutes = require('./todoRoutes');
server.addRoutes(todoRoutes);

server.start();