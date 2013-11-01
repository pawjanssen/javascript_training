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

// Initialiseer de applicatie, injecteer daarbij de twee te gebruiker controllers
require(["app/util/Navigatie", "app/util/Settings"], function(Navigatie, Settings) {

    // Popstate event wordt door de browser afgevuurd bij een history even (browser back buttons)
    window.addEventListener ('popstate', function (event) {
        Navigatie.loadController(history.state, false);
    });

    document.getElementById("gebruikers").addEventListener("click", function(event){
        event.preventDefault();
        Navigatie.loadController(Navigatie.historyState.gebruikers, true);
    });

    document.getElementById("todos").addEventListener("click", function(event){
        event.preventDefault ();
        Navigatie.loadController(Navigatie.historyState.todos, true);
    });

    // Controleer of bij initiele load een hash met pagina id is gevuld, zo ja, load die controller, anders de default
    if (location.hash !== '' && Settings.currentUser != null) {
        Navigatie.loadController(Navigatie.historyState[location.hash.replace("#","")], true);
    } else {
        Navigatie.loadController(Navigatie.historyState.gebruikerselectie, true);
    }
});
