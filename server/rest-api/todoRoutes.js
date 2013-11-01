var gebruikers = require('./data').gebruikers;
var Types = require('hapi').types;
var websocketServer = require('./websocketserver').websocketServer;

module.exports = [
    {
        method: 'GET',
        path: '/gebruikers/{gebruikerID}/todos',
        config: {
            handler: getTodos,
            payload: 'parse',
            validate: { payload: {
                gebruikerID: Types.String().required().min(3)
            } }
        }
    },
    {
        method: 'POST',
        path: '/gebruikers/{gebruikerID}/todos',
        config: {
            handler: addTodo,
            payload: 'parse',
            validate: {
                path: {
                    gebruikerID: Types.String().required().min(1)
                },
                payload: {
                    titel: Types.String().required().min(3)
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/gebruikers/{gebruikerID}/todos',
        config: {
            handler: moveTodo,
            payload: 'parse',
            validate: {
                path: {
                    gebruikerID: Types.String().required().min(1)
                },
                payload: {
                    nieuweGebruikerID: Types.String().required().min(1),
                    todoID: Types.String().required().min(1)
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/gebruikers/{gebruikerID}/todos/{todoID}',
        config: {
            handler: getTodo,
            payload: 'parse',
            validate: { payload: {
                gebruikerID: Types.String().required().min(3),
                todoID: Types.String().required().min(3)
            } }
        }
    }
];

function getTodos(request) {
    var gebruiker = gebruikers.filter(function(p) {
        return p.id === parseInt(request.params.gebruikerID);
    }).pop();

    request.reply(gebruiker.todos);
}

function addTodo(request) {
    var gebruiker = gebruikers.filter(function(p) {
        return p.id === parseInt(request.params.gebruikerID);
    }).pop();

    var todo = {
        id: gebruiker.todos[gebruiker.todos.length - 1].id + 1,
        titel: request.payload.titel
    };

    gebruiker.todos.push(todo);
    websocketServer.broadcast(JSON.stringify(todo));

    request.reply(gebruiker).code(201).header('Location,: /gebruiker/' + gebruiker.id + "/todos/" + todo.id);
}

function moveTodo(request) {
    var nieuweGebruiker = gebruikers.filter(function(p) {
        return p.id === parseInt(request.params.nieuweGebruikerID);
    }).pop();
    var oudeGebruiker = gebruikers.filter(function(p) {
        return p.id === parseInt(request.payload.gebruikerID);
    }).pop();
    var todo = oudeGebruiker.todos.filter(function(p){
        return p.id === parseInt(request.payload.todoID);
    });

    oudeGebruiker.todos = oudeGebruiker.todos.filter(function(p){
        return p.id !== parseInt(request.payload.todoID);
    });

    todo.id = nieuweGebruiker.todos[nieuweGebruiker.todos.length - 1].id + 1;

    nieuweGebruiker.todos.push(todo);
    websocketServer.broadcast(JSON.stringify(todo));

    request.reply(nieuweGebruiker).code(201).header('Location,: /nieuweGebruiker/' + nieuweGebruiker.id + "/todos/" + todo.id);
}

function getTodo(request) {
    var gebruiker = gebruikers.filter(function(p) {
        return p.id === parseInt(request.params.gebruikerID);
    }).pop();


    var todo = gebruiker.todos.filter(function(p) {
        return p.id === parseInt(request.params.todoID);
    }).pop();

    request.reply(todo);
}