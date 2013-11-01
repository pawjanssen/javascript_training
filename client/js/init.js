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

(function(){
    var historyState = {
        todos: {
            id: 'todos',
            controller: "app/controller/TodoController"
        },
        gebruikers: {
            id: 'gebruikers',
            controller: "app/controller/GebruikersController"
        }
    };

    require([historyState.todos.controller, historyState.gebruikers.controller], function(TodoController, GebruikersController) {

        window.addEventListener ('popstate', function (event) {
            var state = history.state;

            switch (state.id) {
                case 'todos':
                    TodoController.init();
                    break;
                case 'gebruikers':
                    GebruikersController.init();
                    break;
            }
        });

        document.getElementById("gebruikers").addEventListener("click", function(event){
            event.preventDefault ();
            history.pushState(historyState.gebruikers, null, '#gebruikers');
            GebruikersController.init();
        });

        document.getElementById("todos").addEventListener("click", function(event){
            event.preventDefault ();
            history.pushState(historyState.todos, null, '#todos');
            TodoController.init();
        });

        TodoController.init();
    });

})();