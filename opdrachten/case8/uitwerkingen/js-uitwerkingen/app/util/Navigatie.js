/**
 * Globale applicatie settings definitie.
 */

// Voor Opdracht 1 heb je hier ook nog de GebruikersController bij staan
// Voor Opdracht 2, lazy loading, dient deze niet meer op deze plek opgenomen te worden
define(["app/controller/TodoController", "app/controller/GebruikerSelectieController"],
    function (TodoController, GebruikerSelectieController) {

        // Object met configuratie voor de history states
        var historyState = {
            todos: {
                id: 'todos'
            },
            gebruikers: {
                id: 'gebruikers'
            },
            gebruikerselectie: {
                id: 'gebruikerselectie'
            }
        };

        function loadController(historyState, doSetState) {
            if (doSetState) {
                history.pushState(historyState, null, '#' + historyState.id);
            }
            switch (historyState.id) {
                case 'todos':
                    TodoController.init();
                    break;
                case 'gebruikers':
                    // OPDRACHT-2: Lazy loading met AMD
                    // Require GebruikersController, waardoor deze pas wordt ingeladen als deze de eerste keer nodig is, bij klikken op het "Gebruikers" menu
                    require(["app/controller/GebruikersController"], function(GebruikersController) {
                        GebruikersController.init();
                    });
                    break;
                case 'gebruikerselectie':
                    GebruikerSelectieController.init();
                    break;
            }
        }

        return {
            historyState: historyState,
            loadController: loadController
        }
    });