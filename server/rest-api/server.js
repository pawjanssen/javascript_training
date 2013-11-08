var Hapi = require('hapi');
var config = { };
var server = new Hapi.createServer('localhost', 8000, config);

// REST documentatie plugin
server.pack.require({ lout: { endpoint: '/docs' } }, function (err) {
    if (err) {
        console.log('Failed loading plugins');
    }
});

server.route({
    method: 'GET',
    path: '/client/{path*}',
    handler: {
        directory: { path: '../../client', listing: true, index: true }
    }
});

server.route({
    method: 'GET',
    path: '/client-zonder-deps/{path*}',
    handler: {
        directory: { path: '../../client-zonder-deps', listing: true, index: true }
    }
});

server.route({
    method: 'GET',
    path: '/client-zonder-deps-met-jquery/{path*}',
    handler: {
        directory: { path: '../../client-zonder-deps-met-jquery', listing: true, index: true }
    }
});

server.route({
    method: 'GET',
    path: '/lib/{path*}',
    handler: {
        directory: { path: '../../client/js/lib', listing: true, index: true }
    }
});

server.route({
    method: 'GET',
    path: '/css/{path*}',
    handler: {
        directory: { path: '../../client/css', listing: true, index: true }
    }
});

// REST Gebruikers API
var gebruikerRoutes = require('./gebruikerRoutes');
server.addRoutes(gebruikerRoutes);

// REST Todos API
var todoRoutes = require('./todoRoutes');
server.addRoutes(todoRoutes);

server.start();