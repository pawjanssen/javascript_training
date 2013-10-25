var todos = require('./data').todos;
var Types = require('hapi').types;

module.exports = [
    {
        method: 'GET',
        path: '/todos',
        config: {
            handler: getTodos,
            validate: { query: { naam: Types.String() } }
        }
    },
    {
        method: 'POST',
        path: '/todos',
        config: {
            handler: addTodo,
            payload: 'parse',
            validate: { payload: { naam: Types.String().required().min(3) } }
        }
    },
    {
        method: 'GET',
        path: '/todos/{id}',
        config: {
            handler: getTodo
        }
    }
];

function getTodos(request) {
    request.reply(todos);
}

function addTodo(request) {

    var gebruiker = {
        id: todos[todos.length - 1].id + 1,
        naam: request.payload.naam,
        gebruikersnaam: request.payload.gebruikersnaam
    };

    todos.push(gebruiker);

    request.reply(gebruiker).code(201).header('Location,: /todos/' + gebruiker.id);
}

function getTodo(request) {

    var todo = todos.filter(function(p) {
        return p.id === parseInt(request.params.id);
    }).pop();

    request.reply(todo);
}