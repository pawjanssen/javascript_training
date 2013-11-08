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
            handler: addOrUpdateTodo,
            payload: 'parse',
            validate: {
                path: {
                    gebruikerID: Types.String().required().min(1)
                },
                payload: {
                    id: Types.String().required().min(1),
                    titel: Types.String().required().min(3),
                    priority: Types.String().required().min(3),
                    description: Types.String().required().min(3)
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/gebruikers/{huidigeGebruikersID}/todos',
        config: {
            handler: moveTodo,
            payload: 'parse',
            validate: {
                path: {
                    huidigeGebruikersID: Types.String().required().min(1)
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

function addOrUpdateTodo(request) {
    var gebruiker = gebruikers.filter(function(p) {
        return p.id === parseInt(request.params.gebruikerID);
    }).pop();

    var todo;
    if (request.payload.id) {
        todo = gebruiker.todos.filter(function(p){
            return p.id === parseInt(request.payload.id);
        })[0];

        updateTodo(todo, request);
    } else {
        todo = {
            id: gebruiker.todos[gebruiker.todos.length - 1].id + 1
        };
        updateTodo(todo, request);
        gebruiker.todos.push(todo);
    }


    websocketServer.broadcast(JSON.stringify({
        "eventtype": "gebruiker-todos",
        "gebruikerid": gebruiker.id,
        "data": gebruiker.todos
    }));

    request.reply(todo).code(201).header('Location,: /gebruikers/' + gebruiker.id + "/todos/" + todo.id);
}

function moveTodo(request) {
    var huidigeGebruiker = gebruikers.filter(function(p) {
        return p.id === parseInt(request.params.huidigeGebruikersID);
    }).pop();
    var nieuweGebruiker = gebruikers.filter(function(p) {
        return p.id === parseInt(request.payload.nieuweGebruikerID);
    }).pop();
    var todo = huidigeGebruiker.todos.filter(function(p){
        return p.id === parseInt(request.payload.todoID);
    }).pop();

    huidigeGebruiker.todos = huidigeGebruiker.todos.filter(function(p){
        return p.id !== parseInt(request.payload.todoID);
    });

    if (nieuweGebruiker.todos.length == 0) {
        todo.id = 1;
    } else {
        todo.id = nieuweGebruiker.todos[nieuweGebruiker.todos.length - 1].id + 1;
    }

    nieuweGebruiker.todos.push(todo);
    websocketServer.broadcast(JSON.stringify({
        "eventtype": "gebruiker-todos",
        "gebruikerid": huidigeGebruiker.id,
        "data": huidigeGebruiker.todos
    }));
    websocketServer.broadcast(JSON.stringify({
        "eventtype": "gebruiker-todos",
        "gebruikerid": nieuweGebruiker.id,
        "data": nieuweGebruiker.todos
    }));

    request.reply(huidigeGebruiker.todos).code(201).header('Location,: /gebruikers/' + huidigeGebruiker.id + "/todos/" + todo.id);
}

function getTodo(request) {
    var gebruiker = gebruikers.filter(function(p) {
        return p.id === parseInt(request.params.gebruikerID);
    }).pop()[0];


    var todo = gebruiker.todos.filter(function(p) {
        return p.id === parseInt(request.params.todoID);
    }).pop()[0];

    request.reply(todo);
}

function updateTodo(todo, request) {
    todo.titel = request.payload.titel;
    todo.priority = request.payload.priority;
    todo.description = request.payload.description;
}