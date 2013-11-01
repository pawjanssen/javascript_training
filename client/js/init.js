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
        'jquery-ui': "jquery-ui-1.10.3.custom.min",
        'jquery.bootstrap': 'bootstrap.min'
    }
});

// Object met configuratie voor de history states
var historyState = {
    todos: {
        id: 'todos'
    },
    gebruikers: {
        id: 'gebruikers'
    }
};

// Initialiseer de applicatie, injecteer daarbij de twee te gebruiker controllers
require(["app/controller/TodoController", "app/controller/GebruikersController"], function(TodoController, GebruikersController) {

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

//var ws = new WebSocket('ws://localhost:8001');
//ws.onopen = function(evt) {
//    console.log('connectie geopend');
//    ws.send("test");
//};
//
//ws.onmessage = function(evt) {
//    console.log(evt.data);
//};
