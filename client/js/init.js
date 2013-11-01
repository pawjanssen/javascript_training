/**
 * Applicatie initialisatie script
 */

// RequireJS configuratie
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

// Function om scoping te regelen (module pattern)
(function(){
    // Object met configuratie voor de history states
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

    // Initialiseer de applicatie, injecteer daarbij de twee te gebruiker controllers
    require([historyState.todos.controller, historyState.gebruikers.controller], function(TodoController, GebruikersController) {
        function loadController(historyState, doSetState) {
            if (doSetState) {
                history.pushState(historyState, null, '#' + historyState.id);
            }
            switch (historyState.id) {
                case 'todos':
                    TodoController.init();
                    break;
                case 'gebruikers':
                    GebruikersController.init();
                    break;
            }
        };

        // Popstate event wordt door de browser afgevuurd bij een history even (browser back buttons)
        window.addEventListener ('popstate', function (event) {
            loadController(history.state, false);
        });

        document.getElementById("gebruikers").addEventListener("click", function(event){
            event.preventDefault ();
            loadController(historyState.gebruikers, true);
        });

        document.getElementById("todos").addEventListener("click", function(event){
            event.preventDefault ();
            loadController(historyState.todos, true);
        });

        // Controleer of bij initiele load een hash met pagina id is gevuld, zo ja, load die controller, anders de default
        if (location.hash !== '') {
            loadController(historyState[location.hash.replace("#","")], true);
        } else {
            loadController(historyState.todos, true);
        }
    });

})();