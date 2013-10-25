var gebruikers = require('./data').gebruikers;
var Types = require('hapi').types;

module.exports = [
    { method: 'GET', path: '/gebruikers', config: { handler: getGebruikers, validate: { query: { naam: Types.String() } } } },
    { method: 'POST', path: '/gebruikers', config: { handler: addGebruiker, payload: 'parse', validate: { payload: { naam: Types.String().required().min(3) } } } },
    { method: 'GET', path: '/gebruikers/{id}', config: { handler: getGebruiker } }
];

function getGebruikers(request) {
    request.reply(gebruikers);
}

function addGebruiker(request) {

    var gebruiker = {
        id: gebruikers[gebruikers.length - 1].id + 1,
        naam: request.payload.naam,
        gebruikersnaam: request.payload.gebruikersnaam
    };

    gebruikers.push(gebruiker);

    request.reply(gebruiker).code(201).header('Location,: /gebruikers/' + gebruiker.id);
}

function getGebruiker(request) {

    var gebruiker = gebruikers.filter(function(p) {
        return p.id === parseInt(request.params.id);
    }).pop();

    request.reply(gebruiker);
}