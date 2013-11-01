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
    todo: { controller: 'blaat'},
    gebruikers: {controller: 'blaat2' }
};

window.addEventListener ('popstate', function (event) {
    var hs = history.state;
    console.log(hs);
});

document.getElementById("gebruikers").addEventListener("click", function(event){
    var el = event.target;
    event.preventDefault ();

    history.pushState(historyState.gebruikers, null, '#gebruikers');
});

requirejs(["app/controller/TodoController"]);