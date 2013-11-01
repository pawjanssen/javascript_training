/**
 * Globale applicatie settings definitie.
 */
define(["app/controller/TodoController", "app/controller/GebruikersController", "app/controller/GebruikerSelectieController"],
    function(TodoController, GebruikersController, GebruikerSelectieController){

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
                GebruikersController.init();
                break;
            case 'gebruikerselectie':
                GebruikerSelectieController.init();
                break;
        }
    };

   return {
       historyState: historyState,
       loadController: loadController
   }
});