/**
 * Applicatie initialisatie script
 */

require.config({
    baseUrl: "js/lib",
    shim: {
        "jquery.bootstrap": {
            deps: ['jquery']
        }
    },
    paths: {
        app: "../app",
        'jquery': "jquery-2.0.3.min",
        'jquery.bootstrap': 'bootstrap.min'
    }
});

var historyState = {
    todo: {
        loadController: function(){
            requirejs(["app/controller/TodoController"]);
        }
    },
    gebruikers:{
        loadController: function(){
            requirejs(["app/controller/GebruikersController"]);
        }
    }
};

window.addEventListener ('popstate', function (event) {
    var state = history.state;
    state.loadController();
});

document.getElementById("gebruikers").addEventListener("click", function(event){
    event.preventDefault ();
    history.pushState(historyState.gebruikers, null, '#gebruikers');
});

document.getElementById("todos").addEventListener("click", function(event){
    event.preventDefault ();
    history.pushState(historyState.todos, null, '#todos');
});

historyState.todo.loadController();

